#!/usr/bin/env python3
"""Pre-generate ElevenLabs audio for the sonnets, one MP3 per line.

Clips land in audio/sonnets/<dialect>/<n>-<lineIndex>.mp3 (lineIndex 1-based).
The app tries these first and falls back to the device voice if a file is
missing, so partial generation is fine — generate a few, hear them, generate
the rest later.

The API key is read from tools/.elevenlabs_key (gitignored) or the
ELEVENLABS_API_KEY env var — it never ships in the app.

Usage:
  python3 tools/generate_sonnets.py --dialect rp --only 18,29,116   # pilot
  python3 tools/generate_sonnets.py --dialect rp --all              # full run
  python3 tools/generate_sonnets.py --dialect rp --all --dry-run    # count cost
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
    """First voice id + settings for a dialect from voices.json."""
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


def parse_sonnets():
    """Pull [(n, [lines])] out of js/data/sonnets.js without executing it."""
    src = open(os.path.join(ROOT, "js", "data", "sonnets.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r"\{\s*n:\s*(\d+),\s*lines:\s*\[(.*?)\]\s*\}", src, re.S):
        n = int(m.group(1))
        lines = [json.loads(s) for s in re.findall(r'"(?:[^"\\]|\\.)*"', m.group(2))]
        out.append((n, lines))
    return out


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
    ap.add_argument("--dialect", required=True, help="rp | nam | aus")
    ap.add_argument("--only", help="comma-separated sonnet numbers")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--dry-run", action="store_true", help="count lines + characters, generate nothing")
    args = ap.parse_args()

    sonnets = parse_sonnets()
    if args.only:
        want = {int(x) for x in args.only.split(",")}
        sonnets = [(n, ls) for n, ls in sonnets if n in want]
    elif not args.all and not args.dry_run:
        sys.exit("Pass --only <nums> or --all")

    total_lines = sum(len(ls) for _, ls in sonnets)
    total_chars = sum(len(l) for _, ls in sonnets for l in ls)
    print(f"{len(sonnets)} sonnets · {total_lines} lines · {total_chars} characters "
          f"· dialect {args.dialect}")
    if args.dry_run:
        return

    key = read_key()
    vid, settings = voice_for(load_voices(), args.dialect)
    out_dir = os.path.join(ROOT, "audio", "sonnets", args.dialect)
    os.makedirs(out_dir, exist_ok=True)

    made = skipped = failed = 0
    for n, lines in sonnets:
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
            except Exception as e:  # noqa: BLE001
                failed += 1
                print(f"  !! {n}-{i} failed: {e}", file=sys.stderr)
                if "401" in str(e) or "429" in str(e):
                    sys.exit("Auth/quota error — stopping.")
    print(f"done: {made} made, {skipped} skipped, {failed} failed → {out_dir}")


if __name__ == "__main__":
    main()
