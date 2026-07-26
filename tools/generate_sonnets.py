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
}


def synth(text, voice_id, settings, key):
    payload = json.dumps({"text": text, "model_id": MODEL, "voice_settings": settings or {}}).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
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

    made = skipped = failed = 0
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
                if e.code in (401, 403, 429):
                    sys.exit(f"Auth/rate error (HTTP {e.code}) — stopping.")
            except Exception as e:  # noqa: BLE001
                failed += 1
                print(f"  !! {n}-{i} failed: {e}", file=sys.stderr)
    print(f"done: {made} made, {skipped} skipped, {failed} failed → {out_dir}")


if __name__ == "__main__":
    main()
