#!/usr/bin/env python3
"""Credential scanner for Speechcraft.

One scanner, four scopes — used by the pre-commit hook, CI, the deploy gate
and by hand:

    python3 tools/scan_secrets.py --staged      # only staged changes (pre-commit)
    python3 tools/scan_secrets.py --worktree    # files on disk now
    python3 tools/scan_secrets.py --history     # EVERY object in git, all refs
    python3 tools/scan_secrets.py --artifact .  # exactly what ships to Pages
    python3 tools/scan_secrets.py --all         # worktree + history + artifact

Exit codes: 0 clean · 1 probable credential found · 2 scanner error.

Values are ALWAYS redacted (sk_abcd…wxyz). The scanner never authenticates,
transmits or validates anything it finds.

Design notes
------------
This app is a static site with no backend, so *any* credential reachable from
browser-delivered code is exposed by definition. The `--artifact` scope is
therefore the strictest: it treats a high-entropy literal in shipped
JavaScript as a finding, not a curiosity.

False alarms are the enemy of a scanner anyone actually runs, so allow-listing
is deliberate and narrow: specific known-safe literals, not whole directories.
"""
from __future__ import annotations

import argparse
import base64
import math
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── What ships to the browser (the strictest scope) ──────────
SHIPPED_EXT = {'.html', '.js', '.mjs', '.css', '.json', '.webmanifest', '.map', '.svg'}
# Directories excluded from *content* scanning, with reasons:
#   .git       – object store is scanned separately by --history
#   audio      – binary mp3; metadata is scanned separately
#   node_modules – not used by this project
SKIP_DIRS = {'.git', 'node_modules', '__pycache__', '.pytest_cache'}
TEXT_EXT = SHIPPED_EXT | {'.py', '.sh', '.bash', '.zsh', '.yml', '.yaml', '.md',
                          '.txt', '.toml', '.ini', '.cfg', '.env', '.example',
                          '.lock', '.gitignore', '.gitattributes'}

# ── Credential patterns ──────────────────────────────────────
# name, regex, severity ('critical' blocks everything)
PATTERNS: list[tuple[str, re.Pattern, str]] = [
    ('ElevenLabs API key',      re.compile(r'\bsk_[A-Za-z0-9]{32,}'), 'critical'),
    ('OpenAI API key',          re.compile(r'\bsk-(?:proj-)?[A-Za-z0-9_\-]{20,}'), 'critical'),
    ('Anthropic API key',       re.compile(r'\bsk-ant-[A-Za-z0-9_\-]{20,}'), 'critical'),
    ('GitHub PAT (classic)',    re.compile(r'\bgh[pousr]_[A-Za-z0-9]{30,}'), 'critical'),
    ('GitHub PAT (fine)',       re.compile(r'\bgithub_pat_[A-Za-z0-9_]{40,}'), 'critical'),
    ('AWS access key id',       re.compile(r'\b(?:AKIA|ASIA|ABIA|ACCA)[0-9A-Z]{16}\b'), 'critical'),
    ('AWS secret key',          re.compile(r'\baws_secret_access_key\s*[:=]\s*["\']?[A-Za-z0-9/+=]{40}'), 'critical'),
    ('Google API key',          re.compile(r'\bAIza[0-9A-Za-z\-_]{35}\b'), 'critical'),
    ('Google OAuth secret',     re.compile(r'\bGOCSPX-[A-Za-z0-9_\-]{20,}'), 'critical'),
    ('Firebase key',            re.compile(r'["\']apiKey["\']\s*:\s*["\']AIza[0-9A-Za-z\-_]{35}'), 'critical'),
    ('Stripe secret key',       re.compile(r'\b[rs]k_(?:live|test)_[A-Za-z0-9]{20,}'), 'critical'),
    ('Supabase service key',    re.compile(r'\bservice_role["\']?\s*[:=]\s*["\']eyJ[A-Za-z0-9_\-]{20,}'), 'critical'),
    ('Slack token',             re.compile(r'\bxox[baprse]-[A-Za-z0-9-]{10,}'), 'critical'),
    ('Slack webhook',           re.compile(r'https://hooks\.slack\.com/services/[A-Za-z0-9/+]{20,}'), 'critical'),
    ('Discord bot token',       re.compile(r'\b[MNO][A-Za-z0-9_\-]{23}\.[A-Za-z0-9_\-]{6}\.[A-Za-z0-9_\-]{27}\b'), 'critical'),
    ('npm token',               re.compile(r'\bnpm_[A-Za-z0-9]{36}\b'), 'critical'),
    ('SendGrid key',            re.compile(r'\bSG\.[A-Za-z0-9_\-]{22}\.[A-Za-z0-9_\-]{43}\b'), 'critical'),
    ('Twilio key',              re.compile(r'\bSK[0-9a-fA-F]{32}\b'), 'critical'),
    ('Private key block',       re.compile(r'-----BEGIN (?:RSA |DSA |EC |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----'), 'critical'),
    ('PuTTY private key',       re.compile(r'PuTTY-User-Key-File-\d'), 'critical'),
    ('JWT (3-part)',            re.compile(r'\beyJ[A-Za-z0-9_\-]{10,}\.eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}'), 'high'),
    ('Authorization header',    re.compile(r'[Aa]uthorization["\']?\s*[:=]\s*["\']?(?:Bearer|Basic|Token)\s+[A-Za-z0-9._\-+/=]{12,}'), 'critical'),
    ('xi-api-key literal',      re.compile(r'xi-api-key["\']?\s*[:=]\s*["\'][A-Za-z0-9_\-]{16,}'), 'critical'),
    ('api key assignment',      re.compile(r'\b(?:api[_-]?key|apikey|access[_-]?token|auth[_-]?token|secret[_-]?key|client[_-]?secret)\s*[:=]\s*["\'][^"\'\s]{16,}["\']', re.I), 'high'),
    ('password assignment',     re.compile(r'\b(?:password|passwd|pwd)\s*[:=]\s*["\'][^"\'\s]{8,}["\']', re.I), 'high'),
    ('credential in URL',       re.compile(r'\bhttps?://[A-Za-z0-9._%-]+:[^@/\s"\']{6,}@'), 'critical'),
    ('token in query string',   re.compile(r'[?&](?:api_?key|access_?token|auth|token|key)=[A-Za-z0-9._\-]{16,}', re.I), 'high'),
]

# Narrow, explicit allow-list. Each entry is a literal that is provably not a
# secret. Deliberately NOT directory-wide.
ALLOW_LITERALS = {
    'ELEVENLABS_API_KEY=',                 # the empty assignment in .env.example
    'ELEVENLABS_API_KEY',                  # the env var *name*
    'tools/.elevenlabs_key',               # the ignored path, referenced in docs
    'SECURITY_CONTACT_EMAIL_PLACEHOLDER',
    'THE_LEAKED_VALUE',                    # placeholder in the runbook
}
# Files whose *purpose* is to describe credential patterns. Their contents are
# still scanned for real values; only the pattern definitions are exempt.
PATTERN_DEFINING_FILES = {'tools/scan_secrets.py', 'tools/security_audit.py'}

# High-entropy heuristics (only applied to shipped executable code)
ENTROPY_MIN_LEN = 24
ENTROPY_THRESHOLD = 4.2
B64_RE = re.compile(r'\b[A-Za-z0-9+/]{24,}={0,2}\b')
HEX_RE = re.compile(r'\b[0-9a-fA-F]{40,}\b')
# Things that legitimately look high-entropy in this repo.
ENTROPY_SAFE = re.compile(
    r'^(?:[0-9a-f]{40})$'                      # git SHAs (pinned actions)
    r'|^(?:data:|blob:|https?://)'             # URLs / data URIs
    r'|^[A-Za-z0-9+/]{0,23}$'                  # too short to matter
)


def shannon(s: str) -> float:
    if not s:
        return 0.0
    counts = {c: s.count(c) for c in set(s)}
    n = len(s)
    return -sum((c / n) * math.log2(c / n) for c in counts.values())


def redact(value: str) -> str:
    v = value.strip()
    if len(v) <= 10:
        return v[:2] + '…'
    return f'{v[:4]}…{v[-4:]}'


class Finding:
    def __init__(self, severity, kind, location, sample, note=''):
        self.severity, self.kind = severity, kind
        self.location, self.sample, self.note = location, sample, note

    def __str__(self):
        tag = {'critical': 'CRITICAL', 'high': 'HIGH', 'medium': 'MEDIUM'}[self.severity]
        base = f'  [{tag}] {self.kind}\n         at: {self.location}\n         value: {self.sample}'
        return base + (f'\n         note: {self.note}' if self.note else '')


def is_allowed(line: str) -> bool:
    return any(a in line for a in ALLOW_LITERALS)


def scan_text(text: str, location: str, *, entropy: bool = False) -> list[Finding]:
    out: list[Finding] = []
    defining = any(location.endswith(p) for p in PATTERN_DEFINING_FILES)

    for name, pat, sev in PATTERNS:
        for m in pat.finditer(text):
            value = m.group(0)
            line_start = text.rfind('\n', 0, m.start()) + 1
            line_end = text.find('\n', m.end())
            line = text[line_start: line_end if line_end != -1 else len(text)]
            if is_allowed(line):
                continue
            # A file that defines these regexes will match its own patterns.
            if defining and ('re.compile' in line or 'ALLOW_LITERALS' in line):
                continue
            lineno = text.count('\n', 0, m.start()) + 1
            out.append(Finding(sev, name, f'{location}:{lineno}', redact(value)))

    if entropy:
        for regex, label in ((B64_RE, 'high-entropy base64-like literal'),
                             (HEX_RE, 'high-entropy hex literal')):
            for m in regex.finditer(text):
                value = m.group(0)
                if ENTROPY_SAFE.match(value):
                    continue
                if len(value) < ENTROPY_MIN_LEN or shannon(value) < ENTROPY_THRESHOLD:
                    continue
                line_start = text.rfind('\n', 0, m.start()) + 1
                line = text[line_start: text.find('\n', m.end())]
                if is_allowed(line):
                    continue
                note = ''
                # Does it base64-decode to something key-shaped?
                try:
                    dec = base64.b64decode(value + '===')[:64].decode('utf-8', 'ignore')
                    if re.search(r'sk_|sk-|ghp_|AKIA|BEGIN .*PRIVATE', dec):
                        note = 'base64 decodes to a credential-shaped string'
                except Exception:
                    pass
                lineno = text.count('\n', 0, m.start()) + 1
                out.append(Finding('high' if note else 'medium', label,
                                   f'{location}:{lineno}', redact(value),
                                   note or 'review: unexplained high-entropy value in shipped code'))
    return out


def iter_files(base: str, *, only_shipped: bool = False):
    for dirpath, dirnames, filenames in os.walk(base):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            path = os.path.join(dirpath, fn)
            ext = os.path.splitext(fn)[1].lower()
            if only_shipped:
                if ext in SHIPPED_EXT:
                    yield path
            elif ext in TEXT_EXT or fn.startswith('.env') or fn in {'.gitignore', 'Makefile'}:
                yield path


def read(path: str) -> str:
    try:
        with open(path, 'rb') as fh:
            return fh.read().decode('utf-8', 'ignore')
    except OSError:
        return ''


def rel(p: str) -> str:
    try:
        return os.path.relpath(p, ROOT)
    except ValueError:
        return p


def git(*args, binary=False):
    r = subprocess.run(['git', *args], cwd=ROOT, capture_output=True)
    if r.returncode != 0:
        return b'' if binary else ''
    return r.stdout if binary else r.stdout.decode('utf-8', 'ignore')


# ── Scopes ───────────────────────────────────────────────────

def scan_staged() -> list[Finding]:
    names = [n for n in git('diff', '--cached', '--name-only', '--diff-filter=ACM').splitlines() if n]
    findings = []
    for name in names:
        ext = os.path.splitext(name)[1].lower()
        if ext and ext not in TEXT_EXT and not os.path.basename(name).startswith('.env'):
            continue
        blob = git('show', f':{name}')
        findings += scan_text(blob, f'(staged) {name}', entropy=ext in SHIPPED_EXT)
        # A staged credential *file* is a finding regardless of content.
        if re.search(r'(^|/)\.env($|\.)|\.elevenlabs_key$|\.(pem|key|p12|pfx)$|credentials?\.json$|secrets?\.json$', name):
            findings.append(Finding('critical', 'credential file staged for commit',
                                    f'(staged) {name}', '(file)',
                                    'unstage it: git restore --staged ' + name))
    return findings


def scan_worktree() -> list[Finding]:
    findings = []
    for path in iter_files(ROOT):
        r = rel(path)
        if r.startswith('.git/'):
            continue
        findings += scan_text(read(path), r,
                              entropy=os.path.splitext(path)[1].lower() in SHIPPED_EXT)
    return findings


def scan_history() -> list[Finding]:
    """Every object reachable from any ref, plus unreachable/dangling ones."""
    findings, seen = [], set()
    listing = git('rev-list', '--objects', '--all')
    entries = []
    for line in listing.splitlines():
        parts = line.split(maxsplit=1)
        if len(parts) == 2:
            entries.append((parts[0], parts[1]))
    # dangling blobs (deleted, never gc'd) — a leaked key often lives here
    for line in git('fsck', '--lost-found', '--no-progress', '--unreachable').splitlines():
        m = re.match(r'(?:dangling|unreachable) blob ([0-9a-f]{40})', line)
        if m:
            entries.append((m.group(1), '(unreachable object)'))

    for sha, path in entries:
        if sha in seen:
            continue
        seen.add(sha)
        if re.search(r'\.(mp3|png|jpg|jpeg|gif|ico|woff2?|zip|pdf)$', path, re.I):
            continue
        content = git('cat-file', '-p', sha)
        if not content:
            continue
        findings += scan_text(content, f'(history) {path} @ {sha[:10]}')
    return findings


def scan_artifact(base: str) -> list[Finding]:
    """The exact files GitHub Pages will serve."""
    findings = []
    for path in iter_files(base, only_shipped=True):
        r = rel(path)
        if r.startswith('.git/'):
            continue
        findings += scan_text(read(path), f'(artifact) {r}', entropy=True)

    # Forbidden files must never exist in the published tree.
    for dirpath, dirnames, filenames in os.walk(base):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            r = rel(os.path.join(dirpath, fn))
            # .env.example is deliberately tracked and holds no value — it is
            # the documented template. Any OTHER .env* is a finding.
            if fn == '.env.example':
                continue
            if re.search(r'(^|/)\.env($|\.)', r) or re.search(
                    r'\.(pem|key|p12|pfx)$|\.elevenlabs_key$|credentials?\.json$|secrets?\.json$', fn):
                findings.append(Finding('critical', 'credential file present in deploy artifact',
                                        f'(artifact) {r}', '(file)',
                                        'this file would be publicly downloadable'))
            if fn.endswith('.map'):
                findings.append(Finding('medium', 'source map in deploy artifact',
                                        f'(artifact) {r}', '(file)',
                                        'source maps can leak local paths and config'))

    # A paid API endpoint referenced from browser code is a finding on its own:
    # a static site has no safe way to authenticate to one.
    PAID = re.compile(r'https?://(?:api\.elevenlabs\.io|api\.openai\.com|api\.anthropic\.com'
                      r'|api\.stripe\.com|generativelanguage\.googleapis\.com)', re.I)
    for path in iter_files(base, only_shipped=True):
        if os.path.splitext(path)[1].lower() not in {'.js', '.mjs', '.html'}:
            continue
        body = read(path)
        for m in PAID.finditer(body):
            lineno = body.count('\n', 0, m.start()) + 1
            findings.append(Finding('critical', 'paid API endpoint referenced in browser code',
                                    f'(artifact) {rel(path)}:{lineno}', m.group(0),
                                    'browser code cannot hold a credential safely'))
    return findings


# ── Main ─────────────────────────────────────────────────────

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--staged', action='store_true')
    ap.add_argument('--worktree', action='store_true')
    ap.add_argument('--history', action='store_true')
    ap.add_argument('--artifact', metavar='DIR',
                    help='scan a BUILT artifact dir (see tools/build_artifact.sh)')
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--quiet', action='store_true')
    args = ap.parse_args()

    if not any([args.staged, args.worktree, args.history, args.artifact, args.all]):
        args.all = True

    scopes: list[tuple[str, list[Finding]]] = []
    try:
        if args.staged:
            scopes.append(('staged changes', scan_staged()))
        if args.worktree or args.all:
            scopes.append(('working tree', scan_worktree()))
        if args.history or args.all:
            scopes.append(('git history (all refs + unreachable objects)', scan_history()))
        if args.artifact:
            if not os.path.isdir(args.artifact):
                print(f'artifact directory not found: {args.artifact}\n'
                      f'Build it first:  python3 tools/build_artifact.py _site', file=sys.stderr)
                return 2
            scopes.append((f'deploy artifact ({args.artifact})', scan_artifact(args.artifact)))
        elif args.all:
            built = os.path.join(ROOT, '_site')
            if os.path.isdir(built):
                scopes.append(('deploy artifact (_site)', scan_artifact(built)))
            else:
                print('\nnote: no built artifact found — run '
                      '`python3 tools/build_artifact.py _site` to scan exactly '
                      'what would be published.')
    except Exception as exc:                                   # noqa: BLE001
        print(f'scanner error: {exc}', file=sys.stderr)
        return 2

    print('Speechcraft credential scan')
    print('=' * 60)

    total_blocking = 0
    for name, findings in scopes:
        blocking = [f for f in findings if f.severity in ('critical', 'high')]
        advisory = [f for f in findings if f.severity == 'medium']
        total_blocking += len(blocking)
        status = 'CLEAN' if not blocking else f'{len(blocking)} BLOCKING'
        print(f'\n{name}: {status}'
              + (f' ({len(advisory)} advisory)' if advisory else ''))
        for f in blocking + (advisory if not args.quiet else []):
            print(f)

    print('\n' + '=' * 60)
    if total_blocking:
        print(f'FAILED — {total_blocking} probable credential finding(s).')
        print('\nIf any is a real key:')
        print('  1. REVOKE it at the provider now. Removing it from git does not un-leak it.')
        print('  2. Issue a replacement and store it outside the repo.')
        print('  3. Only then consider history rewriting — see docs/INCIDENT_RESPONSE.md §2.')
        return 1
    print('PASSED — no probable credentials found in any scanned scope.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
