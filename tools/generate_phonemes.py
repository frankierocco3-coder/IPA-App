#!/usr/bin/env python3
"""Generate CANDIDATE isolated-phoneme clips (plus syllable demos).

Every clip this produces is a CANDIDATE: nothing reaches learners until the
owner approves it by ear at #audit (APPROVED_PHONEMES in audio-flags.js).
TTS is word-oriented, so sounds are coaxed with respellings — vowels and
sustainable consonants come out usably often; stops and affricates get
SYLLABLE demonstrations only (aCa frames), because a true isolated stop
with no vowel is not something TTS can say. The app labels syllable demos
as syllable demos, never as pure isolated sounds.

Paths: audio/phonemes/<dialect>/<voice>/<slug>.mp3 (+ _syllable variant).
Also writes audio/phonemes-index.json (candidate inventory for #audit).

Usage:
    python3 tools/generate_phonemes.py --dry-run
    python3 tools/generate_phonemes.py
"""

import argparse
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from generate_voices import synthesize, voice_map, voice_variants, voice_entry

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = ROOT / "audio"
DATA = ROOT / "js" / "data"
DIALECTS = ["nam", "rp", "aus", "ssbe"]

# Coax text per symbol: how to trick a word-oriented voice into producing
# something close to the bare sound. syllable=None means no syllable demo;
# iso=None means the sound is syllable-demo only (stops, affricates, w/j, ʔ).
COAX = {
    'ɪ': ('ih', None), 'e': ('eh', None), 'æ': ('aah', None), 'ʌ': ('uh', None),
    'ʊ': ('uuh', None), 'ɒ': ('o', None), 'ə': ('uh', None), 'iː': ('ee', None),
    'ɑː': ('ah', None), 'ɔː': ('aw', None), 'uː': ('oo', None), 'ɜː': ('er', None),
    'i': ('ee', None), 'ɛː': ('ehh', None), 'ɑ': ('ah', None), 'ɝ': ('er', None),
    'ɚ': ('er', None), 'ɐ': ('uh', None), 'ɐː': ('ah', None), 'ʉː': ('oo', None),
    'eɪ': ('ay', None), 'aɪ': ('eye', None), 'ɔɪ': ('oy', None), 'əʊ': ('oh', None),
    'aʊ': ('ow', None), 'ɪə': ('eeuh', None), 'eə': ('ehuh', None), 'ʊə': ('oouh', None),
    'oʊ': ('oh', None), 'æɪ': ('ay', None), 'ɑɪ': ('eye', None), 'æɔ': ('ow', None),
    'əʉ': ('oh', None),
    'f': ('ffff', None), 'v': ('vvvv', None), 'θ': ('thh', None), 'ð': ('thhh', None),
    's': ('ssss', None), 'z': ('zzzz', None), 'ʃ': ('shhh', None), 'ʒ': ('zhhh', None),
    'h': ('hhh', None), 'm': ('mmmm', None), 'n': ('nnnn', None), 'ŋ': ('nng', None),
    'l': ('llll', None), 'r': ('rrr', None),
    'p': (None, 'apa'), 'b': (None, 'aba'), 't': (None, 'ata'), 'd': (None, 'ada'),
    'k': (None, 'aka'), 'g': (None, 'aga'), 'tʃ': (None, 'acha'), 'dʒ': (None, 'aja'),
    'w': (None, 'awa'), 'j': (None, 'aya'), 'ʔ': (None, 'uh-oh'),
}

SETTINGS = {"stability": 0.9, "similarity_boost": 0.75, "style": 0.0}


def phoneme_names():
    src = (DATA / "phonemes.js").read_text(encoding="utf-8")
    return dict(re.findall(r"^\s*'([^']+)': \{ type: '\w+', name: '([^']+)'", src, re.M))


def inventory():
    """Per-dialect symbol inventory, replicating engine.js poolFor."""
    eng = (ROOT / "js" / "engine.js").read_text(encoding="utf-8")
    foreign = {}
    block = re.search(r"const ACCENT_FOREIGN = \{(.*?)\n\};", eng, re.S).group(1)
    for m in re.finditer(r"(\w+): \[([^\]]*)\]", block):
        foreign[m.group(1)] = set(re.findall(r"'([^']+)'", m.group(2)))
    src = (DATA / "phonemes.js").read_text(encoding="utf-8")
    words = []
    for m in re.finditer(r"\{ word: '(?:[^'\\]|\\.)+', ipa: \[([^\]]*)\](?:, accent: '(\w+)')?", src):
        words.append((re.findall(r"'([^']+)'", m.group(1)), m.group(2)))
    inv = {}
    for d in DIALECTS:
        syms = set()
        for ipa, acc in words:
            if acc and acc != d:
                continue
            if not acc and any(p in foreign.get(d, set()) for p in ipa):
                continue
            syms.update(ipa)
        inv[d] = sorted(syms)
    return inv


def slug_of(names, sym):
    return re.sub(r"[^a-z0-9]+", "_", names[sym].lower())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    names = phoneme_names()
    inv = inventory()
    voices = voice_map()
    jobs = []
    for d in DIALECTS:
        for vkey, spec in voice_variants(voices[d]).items():
            vid, _ = voice_entry(spec)
            for sym in inv[d]:
                if sym not in COAX or sym not in names:
                    continue
                iso, syl = COAX[sym]
                slug = slug_of(names, sym)
                if iso:
                    jobs.append((d, vkey, vid, slug, iso))
                if syl:
                    jobs.append((d, vkey, vid, slug + "_syllable", syl))

    todo = [(d, v, vid, s, t) for d, v, vid, s, t in jobs
            if not (AUDIO / "phonemes" / d / v / (s + ".mp3")).exists()]
    chars = sum(len(t) for _, _, _, _, t in todo)
    print(f"{len(todo)} candidate clip(s) to make (~{chars} characters)")
    if args.dry_run:
        return

    made = 0
    for d, v, vid, slug, text in todo:
        folder = AUDIO / "phonemes" / d / v
        folder.mkdir(parents=True, exist_ok=True)
        (folder / (slug + ".mp3")).write_bytes(synthesize(text, vid, SETTINGS))
        made += 1
        if made % 50 == 0:
            print(f"  … {made}/{len(todo)}")
    print(f"Generated {made} candidate clip(s).")

    # Candidate index for #audit (existence ≠ approval).
    index = {}
    for d in DIALECTS:
        index[d] = {}
        base = AUDIO / "phonemes" / d
        if base.is_dir():
            for sub in sorted(base.iterdir()):
                if sub.is_dir():
                    index[d][sub.name] = sorted(p.stem for p in sub.glob("*.mp3"))
    (AUDIO / "phonemes-index.json").write_text(json.dumps(index, indent=1))
    print("Wrote audio/phonemes-index.json")


if __name__ == "__main__":
    main()
