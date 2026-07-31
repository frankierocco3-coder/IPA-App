#!/usr/bin/env python3
"""Audio integrity checks (zero-dependency, Python 3.9).

Validates the relationship between the audio tree, audio/index.json, and
js/data/audio-flags.js:

  1. Every clip listed in the index exists on disk.
  2. Every word mp3 on disk is listed in the index (no drift).
  3. Every KNOWN_BAD entry points at a real file (no stale quarantine).
  4. Every APPROVED_PHONEMES entry has a real file under audio/phonemes/.
  5. Word index entries never point into audio/phonemes/, and approved
     phoneme ids never name a word directory.

This cannot judge whether a clip SOUNDS right — only the owner's ear can
(see docs/AUDIO_RECORDING_SPEC.md and the in-app #audit page).
"""

import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = ROOT / "audio"
FLAGS = ROOT / "js" / "data" / "audio-flags.js"
WORD_DIALECTS = ["rp", "nam", "aus", "ssbe"]

failures = []


def fail(msg):
    failures.append(msg)


def parse_flags():
    src = FLAGS.read_text(encoding="utf-8")

    def block(name):
        m = re.search(name + r"\s*=\s*\[(.*?)\]", src, re.S)
        if not m:
            fail("audio-flags.js: missing " + name)
            return []
        return re.findall(r"'([^']+)'", m.group(1))

    return block("KNOWN_BAD"), block("APPROVED_PHONEMES")


def main():
    index = json.loads((AUDIO / "index.json").read_text(encoding="utf-8"))
    known_bad, approved = parse_flags()

    # 1 + 5: index entries exist and never reach into phonemes/
    for d, variants in index.items():
        if d not in WORD_DIALECTS:
            fail("index.json: unexpected dialect key '%s'" % d)
            continue
        for v, clips in variants.items():
            for clip in clips:
                if "phonemes" in clip:
                    fail("index lists a phoneme-like path as a word: %s/%s/%s" % (d, v, clip))
                p = AUDIO / d / v / (clip + ".mp3")
                if not p.is_file():
                    fail("index lists missing file: %s" % p.relative_to(ROOT))

    # 2: on-disk word clips are all indexed
    for d in WORD_DIALECTS:
        folder = AUDIO / d
        if not folder.is_dir():
            continue
        for sub in folder.iterdir():
            if not sub.is_dir():
                continue
            listed = set(index.get(d, {}).get(sub.name, []))
            for mp3 in sub.glob("*.mp3"):
                if mp3.stem not in listed:
                    fail("file on disk missing from index: %s" % mp3.relative_to(ROOT))

    # 3: quarantine entries are real files (word tree or phoneme tree)
    for entry in known_bad:
        word_path = AUDIO / (entry + ".mp3")
        phon_path = AUDIO / "phonemes" / (entry + ".mp3")
        if not word_path.is_file() and not phon_path.is_file():
            fail("KNOWN_BAD entry has no file (stale?): %s" % entry)

    # 4 + 5: approved phonemes exist under audio/phonemes/ only
    for entry in approved:
        p = AUDIO / "phonemes" / (entry + ".mp3")
        if not p.is_file():
            fail("APPROVED_PHONEMES entry has no file: audio/phonemes/%s.mp3" % entry)
        if (AUDIO / (entry + ".mp3")).is_file():
            fail("approved phoneme id collides with a word path: %s" % entry)

    print("Audio integrity: %d word clips indexed, %d quarantined, %d phonemes approved"
          % (sum(len(c) for vs in index.values() for c in vs.values()), len(known_bad), len(approved)))
    if failures:
        print("\nFAILED — %d problem(s):" % len(failures))
        for f_ in failures:
            print("  ✗ " + f_)
        sys.exit(1)
    print("PASSED")


if __name__ == "__main__":
    main()
