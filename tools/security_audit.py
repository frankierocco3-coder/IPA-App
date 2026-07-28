#!/usr/bin/env python3
"""Local security audit. Exits non-zero on a serious violation.

Runs in CI before every Pages deploy, and is worth running before a push:

    python3 tools/security_audit.py

Checks, in order of severity:
  1. credential-looking strings in files that would be published
  2. external script/style/font origins in shipped code
  3. unsafe JS constructs (eval, new Function, document.write, inline handlers)
  4. GitHub Actions pinned to a mutable tag instead of a commit SHA
  5. .gitignore actually covers the credential paths
  6. no key material reachable from the browser bundle

Deliberately narrow so it does not cry wolf: it only flags things that would
be real problems in a static, backend-free, no-dependency app.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files that actually ship to GitHub Pages.
SHIPPED_EXT = {'.html', '.js', '.css', '.json', '.webmanifest', '.svg'}
SKIP_DIRS = {'.git', 'node_modules', 'audio', '.github', 'docs', 'deploy', 'tools', 'tests'}

errors, warnings = [], []


def shipped_files():
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]
        for f in files:
            if os.path.splitext(f)[1].lower() in SHIPPED_EXT:
                yield os.path.join(base, f)


def rel(p):
    return os.path.relpath(p, ROOT)


def read(p):
    try:
        with open(p, encoding='utf-8', errors='ignore') as fh:
            return fh.read()
    except OSError:
        return ''


def redact(s):
    s = s.strip()
    return s[:6] + '…' + s[-4:] if len(s) > 14 else s[:3] + '…'


# ── 1. credentials ────────────────────────────────────────────
CREDENTIALS = [
    ('ElevenLabs key',      re.compile(r'\bsk_[A-Za-z0-9]{32,}')),
    ('OpenAI-style key',    re.compile(r'\bsk-[A-Za-z0-9]{20,}')),
    ('GitHub PAT',          re.compile(r'\bgh[pousr]_[A-Za-z0-9]{30,}')),
    ('GitHub fine-grained', re.compile(r'\bgithub_pat_[A-Za-z0-9_]{40,}')),
    ('AWS access key',      re.compile(r'\bAKIA[0-9A-Z]{16}\b')),
    ('Google API key',      re.compile(r'\bAIza[0-9A-Za-z\-_]{35}\b')),
    ('Slack token',         re.compile(r'\bxox[baprs]-[A-Za-z0-9-]{10,}')),
    ('Private key block',   re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----')),
    ('Bearer/Basic header', re.compile(r'[Aa]uthorization\s*[:=]\s*["\']?(?:Bearer|Basic)\s+[A-Za-z0-9._\-+/=]{12,}')),
    ('xi-api-key literal',  re.compile(r'xi-api-key["\']?\s*[:=]\s*["\'][A-Za-z0-9_\-]{16,}')),
]

# Scan everything a commit could carry, not just shipped files.
def all_text_files():
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', 'audio'}]
        for f in files:
            if os.path.splitext(f)[1].lower() in (
                    SHIPPED_EXT | {'.py', '.sh', '.md', '.yml', '.yaml', '.txt'}):
                yield os.path.join(base, f)


for path in all_text_files():
    body = read(path)
    for name, pat in CREDENTIALS:
        for m in pat.findall(body):
            val = m if isinstance(m, str) else m[0]
            errors.append(f'{name} in {rel(path)} -> {redact(val)}')

# ── 2. external origins in shipped code ───────────────────────
EXTERNAL = re.compile(r'''(?:src|href)\s*=\s*["'](https?://[^"']+)''', re.I)
FETCH_EXT = re.compile(r'''(?:fetch|XMLHttpRequest|importScripts)\s*\(\s*["'](https?://[^"']+)''', re.I)
ALLOWED_ORIGINS = set()          # this app is intentionally fully self-hosted

for path in shipped_files():
    body = read(path)
    for m in list(EXTERNAL.findall(body)) + list(FETCH_EXT.findall(body)):
        origin = re.match(r'https?://[^/]+', m).group(0)
        if origin not in ALLOWED_ORIGINS:
            errors.append(f'external origin in {rel(path)} -> {m[:80]}')

# ── 3. unsafe JS constructs ───────────────────────────────────
UNSAFE = [
    ('eval(',              re.compile(r'(?<![\w.])eval\s*\(')),
    ('new Function(',      re.compile(r'new\s+Function\s*\(')),
    ('document.write',     re.compile(r'document\s*\.\s*write')),
    ('string setTimeout',  re.compile(r'setTimeout\s*\(\s*["\']')),
    ('string setInterval', re.compile(r'setInterval\s*\(\s*["\']')),
    ('javascript: URL',    re.compile(r'["\']javascript:')),
    ('srcdoc',             re.compile(r'\bsrcdoc\s*=')),
]
# HTML inline handlers, e.g. onclick="..." — but not DOM property assignment
# (el.onclick = fn) and not IndexedDB handlers (req.onerror = fn).
INLINE_HANDLER = re.compile(r'''<[^>]*\son(?:click|error|load|mouseover|focus|submit|change|input)\s*=\s*["']''', re.I)

for path in shipped_files():
    if not path.endswith(('.js', '.html')):
        continue
    body = read(path)
    for name, pat in UNSAFE:
        if pat.search(body):
            errors.append(f'unsafe construct {name} in {rel(path)}')
    if INLINE_HANDLER.search(body):
        errors.append(f'inline HTML event handler in {rel(path)}')

# ── 4. Actions pinned to SHAs ─────────────────────────────────
USES = re.compile(r'^\s*(?:-\s*)?uses:\s*([^\s#]+)', re.M)
wf_dir = os.path.join(ROOT, '.github', 'workflows')
if os.path.isdir(wf_dir):
    for f in os.listdir(wf_dir):
        if not f.endswith(('.yml', '.yaml')):
            continue
        for ref in USES.findall(read(os.path.join(wf_dir, f))):
            if '@' not in ref:
                errors.append(f'unpinned action in .github/workflows/{f} -> {ref}')
                continue
            version = ref.split('@', 1)[1]
            if not re.fullmatch(r'[0-9a-f]{40}', version):
                errors.append(f'action not pinned to a commit SHA in .github/workflows/{f} -> {ref}')

# ── 5. .gitignore covers credential paths ─────────────────────
gitignore = read(os.path.join(ROOT, '.gitignore'))
for needed in ['tools/.elevenlabs_key', '.env']:
    if needed not in gitignore:
        errors.append(f'.gitignore is missing {needed}')

# ── 6. nothing key-shaped reachable from the browser ──────────
for path in shipped_files():
    if not path.endswith('.js'):
        continue
    body = read(path)
    if re.search(r'\b(?:api[_-]?key|apiKey|xi-api-key|secret|access[_-]?token)\s*[:=]\s*["\'][^"\']{8,}', body, re.I):
        errors.append(f'key-shaped literal in shipped script {rel(path)}')

# ── report ────────────────────────────────────────────────────
print('Speechcraft security audit')
print('=' * 46)
if warnings:
    print(f'\n{len(warnings)} warning(s):')
    for w in warnings:
        print('  ! ' + w)
if errors:
    print(f'\n{len(errors)} problem(s) found:\n')
    for e in errors:
        print('  ✗ ' + e)
    print('\nFAILED')
    sys.exit(1)
print('\nAll checks passed:')
print('  ✓ no credential patterns in any scanned file')
print('  ✓ no external origins in shipped code')
print('  ✓ no eval / new Function / document.write / inline handlers')
print('  ✓ every GitHub Action pinned to a commit SHA')
print('  ✓ .gitignore covers credential paths')
print('  ✓ no key-shaped literals in browser code')
sys.exit(0)
