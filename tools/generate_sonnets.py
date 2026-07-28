#!/usr/bin/env python3
"""Pre-generate ElevenLabs audio for a text library, one MP3 per line.

Sources:
  sonnets  → audio/sonnets/<dialect>/<n>-<line>.mp3       (n = sonnet number)
  chekhov  → audio/chekhov/<dialect>/<CHEK-nnn>-<line>.mp3

The app tries these first and falls back to the device voice if a file is
missing, so partial generation is fine — generate a few, hear them, generate
the rest later. Existing files are skipped, so a run resumes cleanly.

Stage directions in [brackets] are stripped before synthesis: they are shown
on screen but never spoken.

The API key is read from tools/.elevenlabs_key (gitignored) or the
ELEVENLABS_API_KEY env var — it never ships in the app.

Usage:
  python3 tools/generate_sonnets.py --dialect rp --only 18,29,116
  python3 tools/generate_sonnets.py --source chekhov --dialect rp --all
  python3 tools/generate_sonnets.py --source chekhov --dialect rp --all --dry-run
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL = "eleven_multilingual_v2"


def read_key():
    env = os.environ.get("ELEVENLABS_API_KEY")
    if env:
        return env.strip()
    path = os.path.join(ROOT, "tools", ".elevenlabs_key")
    if os.path.exists(path):
        return open(path).read().strip()
    sys.exit("No API key — set ELEVENLABS_API_KEY or create tools/.elevenlabs_key")


def load_voices():
    return json.load(open(os.path.join(ROOT, "tools", "voices.json")))


def voice_for(voices, dialect):
    """Voice id + settings for a dialect's sonnet narration.

    Prefers a dedicated narrator under "_sonnets" (separate from the drill
    voices), else falls back to the dialect's first voice.
    """
    override = ((voices.get("_narrators") or voices.get("_sonnets") or {})).get(dialect)
    if override:
        if isinstance(override, str):
            return override, {}
        vid = override.get("id")
        settings = {k: override[k] for k in ("stability", "similarity_boost", "style", "speed") if k in override}
        return vid, settings
    entry = voices.get(dialect)
    if not entry:
        sys.exit(f"No voice configured for dialect '{dialect}' in voices.json")
    for key, v in entry.items():
        if key.startswith("_"):
            continue
        if isinstance(v, str):
            return v, {}
        vid = v.get("id")
        settings = {k: v[k] for k in ("stability", "similarity_boost", "style", "speed") if k in v}
        return vid, settings
    sys.exit(f"No usable voice under dialect '{dialect}'")


def strip_stage(text):
    """Stage directions are shown on screen but never spoken."""
    return re.sub(r"\s+", " ", re.sub(r"\[[^\]]*\]", " ", text)).strip()


def parse_sonnets():
    """Pull [(n, [lines])] out of js/data/sonnets.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "sonnets.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r"\{\s*n:\s*(\d+),\s*lines:\s*\[(.*?)\]\s*\}", src, re.S):
        n = int(m.group(1))
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((str(n), lines))
    return out


def parse_oneill():
    """Pull [(id, [lines])] out of js/data/oneill.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "oneill.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r'id: "(ONEILL-\d+)".*?lines: \[(.*?)\n    \],', src, re.S):
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((m.group(1), lines))
    return out


def parse_wilde():
    """Pull [(id, [lines])] out of js/data/wilde.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "wilde.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r'id: "(WILDE-\d+)".*?lines: \[(.*?)\n    \],', src, re.S):
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((m.group(1), lines))
    return out


def parse_pirandello():
    """Pull [(id, [lines])] out of js/data/pirandello.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "pirandello.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r'id: "(PIRANDELLO-\d+)".*?lines: \[(.*?)\n    \],', src, re.S):
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((m.group(1), lines))
    return out


def parse_ibsen():
    """Pull [(id, [lines])] out of js/data/ibsen.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "ibsen.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r'id: "(IBSEN-\d+)".*?lines: \[(.*?)\n    \],', src, re.S):
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((m.group(1), lines))
    return out


def parse_chekhov():
    """Pull [(id, [lines])] out of js/data/chekhov.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "chekhov.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r'id: "(CHEK-\d+)".*?lines: \[(.*?)\n    \],', src, re.S):
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((m.group(1), lines))
    return out


SOURCES = {
    "sonnets": parse_sonnets,
    "chekhov": parse_chekhov,
    "oneill": parse_oneill,
    "wilde": parse_wilde,
    "pirandello": parse_pirandello,
    "ibsen": parse_ibsen,
}


# The only endpoint this tool may ever call. If a future edit points it
# somewhere else, abort rather than send text (and credits) to a new host.
ALLOWED_API_HOST = "api.elevenlabs.io"


def synth(text, voice_id, settings, key):
    payload = json.dumps({"text": text, "model_id": MODEL, "voice_settings": settings or {}}).encode()
    url = f"https://{ALLOWED_API_HOST}/v1/text-to-speech/{voice_id}"
    if urllib.parse.urlparse(url).hostname != ALLOWED_API_HOST:
        sys.exit(f"Refusing to call an unexpected host: {url}")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"xi-api-key": key, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", default="sonnets", choices=sorted(SOURCES),
                    help="which text library to voice (default: sonnets)")
    ap.add_argument("--dialect", required=True, help="rp | nam | aus")
    ap.add_argument("--only", help="comma-separated ids (sonnet numbers, or CHEK-001)")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--dry-run", action="store_true", help="count lines + characters, generate nothing")
    ap.add_argument("--max-calls", type=int, default=2500,
                    help="hard ceiling on API calls this run (default 2500)")
    ap.add_argument("--yes", action="store_true",
                    help="skip the confirmation prompt (for unattended runs)")
    ap.add_argument("--confirm-threshold", type=int, default=200,
                    help="ask before generating more than this many clips (default 200)")
    args = ap.parse_args()

    pieces = SOURCES[args.source]()
    if args.only:
        want = {x.strip().upper() for x in args.only.split(",")}
        pieces = [(pid, ls) for pid, ls in pieces if pid.upper() in want]
        if not pieces:
            sys.exit(f"No {args.source} pieces matched --only {args.only}")
    elif not args.all and not args.dry_run:
        sys.exit("Pass --only <ids> or --all")

    # Speech text only — stage directions are never voiced.
    pieces = [(pid, [strip_stage(l) for l in ls]) for pid, ls in pieces]
    pieces = [(pid, [l for l in ls if l]) for pid, ls in pieces]

    total_lines = sum(len(ls) for _, ls in pieces)
    total_chars = sum(len(l) for _, ls in pieces for l in ls)
    print(f"{len(pieces)} {args.source} · {total_lines} lines · {total_chars} characters "
          f"(≈ credits) · dialect {args.dialect}")
    if args.dry_run:
        return

    key = read_key()
    vid, settings = voice_for(load_voices(), args.dialect)
    out_dir = os.path.join(ROOT, "audio", args.source, args.dialect)
    os.makedirs(out_dir, exist_ok=True)

    # How many calls will this ACTUALLY make? Existing files are skipped, so
    # quote the real number, not the total.
    todo = [(n, i, line)
            for n, lines in pieces
            for i, line in enumerate(lines, 1)
            if not os.path.exists(os.path.join(out_dir, f"{n}-{i}.mp3"))]
    todo_chars = sum(len(line) for _, _, line in todo)

    if not todo:
        print("Nothing to generate — every clip already exists.")
        return

    print(f"\nAbout to make {len(todo)} API call(s), ~{todo_chars:,} characters "
          f"(≈ credits), voice {vid[:8]}…, into {os.path.relpath(out_dir, ROOT)}")

    if len(todo) > args.max_calls:
        sys.exit(f"Refusing: {len(todo)} calls exceeds --max-calls={args.max_calls}. "
                 f"Raise it deliberately, or narrow the run with --only.")

    if len(todo) > args.confirm_threshold and not args.yes:
        # Interactive confirmation for anything large. Non-interactive runs
        # must pass --yes explicitly, so a stray cron can't spend silently.
        if not sys.stdin.isatty():
            sys.exit("Large batch and no TTY — re-run with --yes if this is intended.")
        reply = input(f"Generate {len(todo)} clips (~{todo_chars:,} credits)? [y/N] ").strip().lower()
        if reply not in ("y", "yes"):
            sys.exit("Cancelled — nothing was generated and no credits were spent.")

    made = skipped = failed = 0
    consecutive_failures = 0
    for n, lines in pieces:
        for i, line in enumerate(lines, 1):
            path = os.path.join(out_dir, f"{n}-{i}.mp3")
            if os.path.exists(path):
                skipped += 1
                continue
            try:
                data = synth(line, vid, settings, key)
                open(path, "wb").write(data)
                made += 1
                consecutive_failures = 0
                if made >= args.max_calls:
                    print(f"\nReached --max-calls={args.max_calls}; stopping.")
                    print(f"\nGenerated {made} clip(s); skipped {skipped}; failed {failed}.")
                    return
                print(f"  {n}-{i}  {line[:48]}")
                time.sleep(0.2)
            except urllib.error.HTTPError as e:  # noqa: PERF203
                # ElevenLabs returns 401 for BOTH a bad key and an exhausted
                # quota — the difference is only in the body, so read it.
                body = ""
                try:
                    body = e.read().decode("utf-8", "replace")
                except Exception:  # noqa: BLE001
                    pass
                failed += 1
                print(f"  !! {n}-{i} failed: HTTP {e.code} {body[:200]}", file=sys.stderr)
                if "quota_exceeded" in body:
                    sys.exit("QUOTA EXHAUSTED — top up or wait for the monthly reset, "
                             "then re-run; existing clips are skipped.")
                if e.code in (401, 403):
                    sys.exit(f"Auth error (HTTP {e.code}) — stopping. No retry: a repeated "
                             f"call could be billable.")
                if e.code == 429:
                    sys.exit("Rate limited (HTTP 429) — stopping rather than retrying. "
                             "Re-run later; existing clips are skipped.")
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    sys.exit("Three consecutive failures — stopping to avoid burning credits.")
            except Exception as e:  # noqa: BLE001
                failed += 1
                print(f"  !! {n}-{i} failed: {e}", file=sys.stderr)
    print(f"done: {made} made, {skipped} skipped, {failed} failed → {out_dir}")


if __name__ == "__main__":
    main()
