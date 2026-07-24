#!/usr/bin/env python3
"""Generate Speechcraft voice clips with ElevenLabs.

Clips are generated once, offline, and committed as static files — the API
key never ships in the app (the repo is public).

Setup
-----
1. Make a free ElevenLabs account and copy your API key from
   Profile → API Keys.
2. Save it somewhere this script can read it, either:
       export ELEVENLABS_API_KEY=sk_...
   or put the key alone in  tools/.elevenlabs_key  (gitignored).
3. Pick a voice per accent:
       python3 tools/generate_voices.py --list-voices
   Copy the ids you want into tools/voices.json, e.g.
       {"rp": "<voice id>", "nam": "<voice id>", "aus": "<voice id>"}
4. Generate:
       python3 tools/generate_voices.py            # only missing clips
       python3 tools/generate_voices.py --force    # regenerate everything
       python3 tools/generate_voices.py --accent rp
       python3 tools/generate_voices.py --limit 5  # cheap trial run

Existing clips are skipped, so re-running is safe and costs nothing extra.
"""

import argparse
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
TOOLS = ROOT / "tools"
AUDIO = ROOT / "audio"
PHONEMES_JS = ROOT / "js" / "data" / "phonemes.js"
VOICES_JSON = TOOLS / "voices.json"
KEY_FILE = TOOLS / ".elevenlabs_key"

API = "https://api.elevenlabs.io/v1"
MODEL = "eleven_multilingual_v2"
ACCENTS = ["rp", "nam", "aus"]


def api_key():
    key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not key and KEY_FILE.exists():
        key = KEY_FILE.read_text().strip()
    if not key:
        sys.exit(
            "No API key. Set ELEVENLABS_API_KEY or put the key in "
            f"{KEY_FILE.relative_to(ROOT)} (see the header of this file)."
        )
    return key


def request(path, *, data=None, raw=False):
    req = urllib.request.Request(f"{API}{path}", data=data)
    req.add_header("xi-api-key", api_key())
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read()
    except urllib.error.HTTPError as err:
        detail = err.read().decode("utf-8", "replace")[:400]
        sys.exit(f"ElevenLabs {err.code} on {path}: {detail}")
    except urllib.error.URLError as err:
        sys.exit(f"Could not reach ElevenLabs: {err.reason}")
    return body if raw else json.loads(body)


def list_voices() -> None:
    voices = request("/voices").get("voices", [])
    if not voices:
        print("No voices on this account.")
        return
    print(f"{len(voices)} voice(s) — copy the ids you want into tools/voices.json\n")
    for v in voices:
        labels = v.get("labels") or {}
        tags = ", ".join(f"{k}={val}" for k, val in labels.items() if val)
        print(f"  {v.get('name','?'):<24} {v.get('voice_id','?')}")
        if tags:
            print(f"  {'':<24} {tags}")
    print(
        "\nPick voices whose accent matches: British for rp, American for nam, "
        "Australian for aus."
    )


def voice_map() -> dict:
    if not VOICES_JSON.exists():
        sys.exit(
            f"Missing {VOICES_JSON.relative_to(ROOT)}. Run --list-voices, then "
            'create it like: {"rp": "<id>", "nam": "<id>", "aus": "<id>"}'
        )
    voices = json.loads(VOICES_JSON.read_text())
    unknown = [a for a in voices if a not in ACCENTS]
    if unknown:
        sys.exit(f"Unknown accent(s) in voices.json: {', '.join(unknown)}")
    return voices


def words():
    """Every distinct word the app can speak (WORDS + phoneme examples)."""
    src = PHONEMES_JS.read_text()
    found = set()
    for line in src.splitlines():
        m = re.search(r"word:\s*'([^']+)'", line)
        if m:
            found.add(m.group(1))
        for block in re.findall(r"examples:\s*\[([^\]]+)\]", line):
            found.update(re.findall(r"'([^']+)'", block))
    return sorted(found)


def clip_name(word):
    return re.sub(r"[^a-z0-9]+", "_", word.lower())


def synthesize(text, voice_id):
    payload = json.dumps(
        {
            "text": text,
            "model_id": MODEL,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
        }
    ).encode()
    return request(f"/text-to-speech/{voice_id}", data=payload, raw=True)


def write_index() -> None:
    index = {}
    for accent in ACCENTS:
        folder = AUDIO / accent
        if folder.is_dir():
            index[accent] = sorted(p.stem for p in folder.glob("*.mp3"))
    AUDIO.mkdir(exist_ok=True)
    (AUDIO / "index.json").write_text(json.dumps(index, indent=1))
    total = sum(len(v) for v in index.values())
    print(f"\nWrote audio/index.json — {total} clip(s) across {len(index)} accent(s).")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--list-voices", action="store_true", help="show account voices and exit")
    ap.add_argument("--accent", choices=ACCENTS, help="generate one accent only")
    ap.add_argument("--limit", type=int, help="stop after N clips (trial run)")
    ap.add_argument("--force", action="store_true", help="regenerate existing clips")
    ap.add_argument("--index-only", action="store_true", help="just rebuild index.json")
    args = ap.parse_args()

    if args.list_voices:
        return list_voices()
    if args.index_only:
        return write_index()

    voices = voice_map()
    targets = [args.accent] if args.accent else [a for a in ACCENTS if a in voices]
    if not targets:
        sys.exit("No accents to generate — add voice ids to tools/voices.json.")

    all_words = words()
    made = skipped = 0
    for accent in targets:
        voice_id = voices.get(accent)
        if not voice_id:
            print(f"! no voice id for '{accent}', skipping")
            continue
        folder = AUDIO / accent
        folder.mkdir(parents=True, exist_ok=True)
        print(f"\n{accent}: {len(all_words)} word(s) → {folder.relative_to(ROOT)}")
        for word in all_words:
            if args.limit is not None and made >= args.limit:
                print("  (limit reached)")
                break
            dest = folder / f"{clip_name(word)}.mp3"
            if dest.exists() and not args.force:
                skipped += 1
                continue
            dest.write_bytes(synthesize(word, voice_id))
            made += 1
            print(f"  ✓ {word}")

    print(f"\nGenerated {made} clip(s); skipped {skipped} already present.")
    write_index()


if __name__ == "__main__":
    main()
