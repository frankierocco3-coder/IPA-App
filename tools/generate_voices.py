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
ACCENTS = ["rp", "nam", "aus", "ssbe"]

# ── Contemporary British review batch ─────────────────────────
# Per the SSBE spec: a small diagnostic set is generated and EAR-APPROVED
# by the owner (#audit) before any full asset generation for this course.
# The rp lines exist so RP-vs-Contemporary comparisons use a real RP voice
# on the RP side — never Alyx-vs-Peach passed off as RP-vs-SSBE.
REVIEW_BATCH = {
    "ssbe": [
        # course sample sentence (also the voice-selector sample line)
        "Alright? Welcome to Standard British - let's get you sounding like Britain now.",
        # diagnostic vowel words
        "bath", "trap", "strut", "lot", "thought", "goose", "goat", "face",
        "car", "near", "square",
        # consonant behaviour: glottal t and yod-coalescence
        "better", "water", "butter", "tune", "Tuesday",
        # connected speech
        "I got a bottle of water at the station.",
        "It's quite a little theatre, isn't it?",
        "See you on Tuesday - I'll sort the tickets.",
        "My parents were there on the opening night.",
        "That's better than I thought it would be.",
        # contemporary idioms, bare
        "sorted", "knackered", "gutted", "chuffed", "buzzing",
        "skint", "dodgy", "cheeky", "sound", "mate",
        # idioms in sentences
        "Tickets? Sorted.",
        "I'm absolutely knackered after that shift.",
        "He was gutted when the show closed early.",
        "Fancy a cheeky pint after work?",
        "Don't worry about Tom, he's sound.",
        # comparison lines (same text generated for rp below)
        "Better get some water before the tour starts.",
        "My daughter's at university in the north.",
        "I'll see you by the square on Tuesday.",
    ],
    "rp": [
        "Better get some water before the tour starts.",
        "My daughter's at university in the north.",
        "I'll see you by the square on Tuesday.",
    ],
}


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
    # Transient network failures (connection resets, timeouts) get three
    # retries with backoff — a 35-minute batch should not die at minute 20
    # because one socket hiccuped. Real API errors still stop the run.
    import time
    last = None
    for attempt in range(4):
        req = urllib.request.Request(f"{API}{path}", data=data)
        req.add_header("xi-api-key", api_key())
        if data:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                body = resp.read()
            return body if raw else json.loads(body)
        except urllib.error.HTTPError as err:
            detail = err.read().decode("utf-8", "replace")[:400]
            sys.exit(f"ElevenLabs {err.code} on {path}: {detail}")
        except (urllib.error.URLError, OSError) as err:
            last = err
            wait = 2 ** attempt
            print(f"  ! network hiccup ({err}); retrying in {wait}s")
            time.sleep(wait)
    sys.exit(f"Could not reach ElevenLabs after retries: {last}")


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
    voices = {
        k: v for k, v in json.loads(VOICES_JSON.read_text()).items()
        if not k.startswith("_")  # allow comment keys in the config
    }
    unknown = [a for a in voices if a not in ACCENTS]
    if unknown:
        sys.exit(f"Unknown accent(s) in voices.json: {', '.join(unknown)}")
    return voices


def words(accent=None):
    """Every distinct word the app can speak (WORDS + phoneme examples).

    With `accent`, WORDS entries tagged for a DIFFERENT accent are
    excluded — a course only ever surfaces its own and the untagged
    reference words, so its strict-coverage promise stops there.
    Phoneme examples are untagged reference material and always count.
    """
    src = PHONEMES_JS.read_text()
    found = set()
    for line in src.splitlines():
        m = re.search(r"word:\s*'([^']+)'", line)
        if m:
            tag = re.search(r"accent:\s*'(\w+)'", line)
            if accent is None or tag is None or tag.group(1) == accent:
                found.add(m.group(1))
        for block in re.findall(r"examples:\s*\[([^\]]+)\]", line):
            found.update(re.findall(r"'([^']+)'", block))
    return sorted(found)


def clip_name(word):
    return re.sub(r"[^a-z0-9]+", "_", word.lower())


IDIOM_JS = ROOT / "js" / "data" / "idiom.js"


def idiom_texts():
    """{accent: [texts]} — every idiom term and example, per its own dialect.

    Each entry is only ever spoken in the dialect it belongs to. Flagged
    (vulgar/dated) terms are included: they exist because scripts use them,
    and the reference pages have listen buttons; drills still never use them.
    """
    src = IDIOM_JS.read_text()
    # Parse only the IDIOM array — the authored exercise banks further down
    # the file have term: fields with no dialect:/example: and skew counts.
    start = src.index("export const IDIOM = [")
    end = src.index("\n];", start)
    src = src[start:end]
    field = r"'((?:[^'\\]|\\.)*)'"
    dialects = re.findall(r"dialect:\s*" + field, src)
    terms = re.findall(r"term:\s*" + field, src)
    examples = re.findall(r"example:\s*(?:" + field + r"|null)", src)
    if not (len(dialects) == len(terms) == len(examples)):
        sys.exit("idiom.js parse mismatch — dialect/term/example counts differ")
    unescape = lambda s: s.replace("\\'", "'").replace("\\\\", "\\")
    out = {a: set() for a in ACCENTS}
    for d, t, e in zip(dialects, terms, examples):
        out[d].add(unescape(t))
        if e:
            out[d].add(unescape(e))
    return {a: sorted(v) for a, v in out.items()}


# Isolated words read better with high stability — expressive swing makes a
# single word sound performed rather than modelled. Override per accent in
# voices.json by using an object instead of a bare id, e.g.
#   "aus": {"id": "<voice id>", "stability": 0.85, "style": 0.0}
DEFAULT_SETTINGS = {"stability": 0.8, "similarity_boost": 0.75, "style": 0.0}


def voice_variants(value):
    """An accent's value -> {voice key: spec}.

    Accepts a single voice (string id, or an object with "id") for accents
    with one voice, or a map like {"m": ..., "f": ...} for several.
    """
    if isinstance(value, str):
        return {"m": value}
    if "id" in value or "voice_id" in value:
        return {"m": value}
    return {k: v for k, v in value.items() if not k.startswith("_")}


def voice_entry(value):
    """Accept either "<id>" or {"id": ..., <voice settings>}."""
    if isinstance(value, str):
        return value, dict(DEFAULT_SETTINGS)
    value = dict(value)
    vid = value.pop("id", None) or value.pop("voice_id", None)
    settings = dict(DEFAULT_SETTINGS)
    settings.update({k: v for k, v in value.items() if not k.startswith("_")})
    return vid, settings


def synthesize(text, voice_id, settings):
    payload = json.dumps(
        {"text": text, "model_id": MODEL, "voice_settings": settings}
    ).encode()
    return request(f"/text-to-speech/{voice_id}", data=payload, raw=True)


def write_index() -> None:
    """audio/index.json = {accent: {voice key: [words]}}"""
    index = {}
    total = 0
    for accent in ACCENTS:
        folder = AUDIO / accent
        if not folder.is_dir():
            continue
        variants = {}
        for sub in sorted(folder.iterdir()):
            if sub.is_dir():
                clips = sorted(p.stem for p in sub.glob("*.mp3"))
                if clips:
                    variants[sub.name] = clips
                    total += len(clips)
        if variants:
            index[accent] = variants
    AUDIO.mkdir(exist_ok=True)
    (AUDIO / "index.json").write_text(json.dumps(index, indent=1))
    shape = ", ".join(f"{a}({'+'.join(v)})" for a, v in index.items())
    print(f"\nWrote audio/index.json — {total} clip(s): {shape}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--list-voices", action="store_true", help="show account voices and exit")
    ap.add_argument("--accent", choices=ACCENTS, help="generate one accent only")
    ap.add_argument("--limit", type=int, help="stop after N clips (trial run)")
    ap.add_argument("--force", action="store_true", help="regenerate existing clips")
    ap.add_argument("--index-only", action="store_true", help="just rebuild index.json")
    ap.add_argument("--idioms", action="store_true",
                    help="generate idiom terms + examples (each in its own dialect only)")
    ap.add_argument("--review-batch", action="store_true",
                    help="generate the SSBE diagnostic review set (owner ear-check gate)")
    ap.add_argument("--idiom-pilot", action="store_true",
                    help="generate the 19-idiom Standard British pilot (review content)")
    ap.add_argument("--dry-run", action="store_true",
                    help="report clip counts and character cost; spend nothing")
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
    per_accent = idiom_texts() if args.idioms else (REVIEW_BATCH if args.review_batch else None)
    if args.review_batch:
        targets = [a for a in targets if a in REVIEW_BATCH]
    if args.idiom_pilot:
        # Review content for the Standard British idiom pilot: the 19
        # agreed terms plus their example sentences, Alyx and Peach only.
        PILOT = ["innit", "mate", "cheers", "proper", "sorted", "knackered",
                 "gutted", "chuffed", "buzzing", "skint", "dodgy", "cheeky",
                 "Are you taking the piss?", "You having a laugh?",
                 "It\u2019s doing my head in", "git", "prat", "muppet", "slag"]
        src = IDIOM_JS.read_text()
        start = src.index("export const IDIOM = [")
        src_i = src[start:src.index("\n];", start)]
        field = r"'((?:[^'\\]|\\.)*)'"
        un = lambda x: x.replace("\\'", "'").replace("\\\\", "\\")
        pairs = {}
        for m in re.finditer(r"dialect: 'ssbe', term: " + field + r", meaning: " + field
                             + r", example: (?:" + field + r"|null)", src_i):
            pairs[un(m.group(1))] = un(m.group(3)) if m.group(3) else None
        chosen = []
        for term in PILOT:
            t = term.encode().decode("unicode_escape")
            if t not in pairs:
                print("! pilot term not found in idiom data: %s" % t)
                continue
            chosen.append(t)
            if pairs[t]:
                chosen.append(pairs[t])
        per_accent = {"ssbe": sorted(set(chosen))}
        targets = ["ssbe"]
    # The Alyx/Peach review batch and idiom pilot were EAR-APPROVED by the
    # owner on 2026-07-30 — the earlier structural hold on ssbe bulk
    # generation is lifted.
    made = skipped = 0
    dry_chars = 0
    for accent in targets:
        raw = voices.get(accent)
        if not raw:
            print(f"! no voice for '{accent}', skipping")
            continue
        texts = per_accent[accent] if per_accent is not None else all_words
        for vkey, spec in voice_variants(raw).items():
            voice_id, settings = voice_entry(spec)
            if not voice_id:
                print(f"! no voice id for '{accent}/{vkey}', skipping")
                continue
            folder = AUDIO / accent / vkey
            if args.dry_run:
                todo = [t for t in texts
                        if args.force or not (folder / f"{clip_name(t)}.mp3").exists()]
                chars = sum(len(t) for t in todo)
                dry_chars += chars
                print(f"{accent}/{vkey}: {len(todo)} clip(s) to make, {chars} characters")
                continue
            folder.mkdir(parents=True, exist_ok=True)
            print(f"\n{accent}/{vkey}: {len(texts)} clip(s) → {folder.relative_to(ROOT)}")
            for text in texts:
                if args.limit is not None and made >= args.limit:
                    print("  (limit reached)")
                    break
                dest = folder / f"{clip_name(text)}.mp3"
                if dest.exists() and not args.force:
                    skipped += 1
                    continue
                dest.write_bytes(synthesize(text, voice_id, settings))
                made += 1
                print(f"  ✓ {text}")

    if args.dry_run:
        print(f"\nDRY RUN — nothing generated. Total: ~{dry_chars} characters "
              f"(≈ {dry_chars} ElevenLabs credits at 1/char).")
        return

    print(f"\nGenerated {made} clip(s); skipped {skipped} already present.")
    write_index()


if __name__ == "__main__":
    main()
