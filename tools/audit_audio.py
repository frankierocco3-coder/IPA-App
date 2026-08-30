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
WORD_DIALECTS = ["rp", "nam", "aus", "ssbe", "cockney"]

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

    # Voice keys are course-bound: named speakers for ssbe, f/m elsewhere.
    COURSE_VOICES = {"rp": {"f", "m"}, "nam": {"f", "m"}, "aus": {"f", "m"},
                     "ssbe": {"alyx", "peach"}, "cockney": {"bob", "lizzie"}}

    # 1 + 5: index entries exist, never reach into phonemes/, and only use
    # that course's own approved voice keys (no silent cross-course voices)
    for d, variants in index.items():
        if d not in WORD_DIALECTS:
            fail("index.json: unexpected dialect key '%s'" % d)
            continue
        for v in variants:
            if v not in COURSE_VOICES[d]:
                fail("index.json: %s uses a voice key that is not that course's: %s" % (d, v))
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

    # 3b: the candidate phoneme index matches the files on disk
    pidx_path = AUDIO / "phonemes-index.json"
    if pidx_path.exists():
        pidx = json.loads(pidx_path.read_text(encoding="utf-8"))
        for d, voices in pidx.items():
            for v, slugs in voices.items():
                for slug in slugs:
                    if not (AUDIO / "phonemes" / d / v / (slug + ".mp3")).is_file():
                        fail("phonemes-index lists missing file: %s/%s/%s" % (d, v, slug))
        for f in (AUDIO / "phonemes").rglob("*.mp3") if (AUDIO / "phonemes").is_dir() else []:
            d, v = f.parts[-3], f.parts[-2]
            if f.stem not in set(pidx.get(d, {}).get(v, [])):
                fail("phoneme file on disk missing from phonemes-index: %s" % f.relative_to(ROOT))

    # 4 + 5: approved phonemes exist under audio/phonemes/ only
    for entry in approved:
        p = AUDIO / "phonemes" / (entry + ".mp3")
        if not p.is_file():
            fail("APPROVED_PHONEMES entry has no file: audio/phonemes/%s.mp3" % entry)
        if (AUDIO / (entry + ".mp3")).is_file():
            fail("approved phoneme id collides with a word path: %s" % entry)

    # 6: STRICT course coverage — a strict course promises real clips for
    # everything its controls can speak, so every speakable text must exist
    # in BOTH of its voices. This keeps the no-TTS rule honest forever.
    sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
    from generate_voices import words as all_words, idiom_texts, clip_name
    STRICT = {"ssbe": ("alyx", "peach"), "cockney": ("bob", "lizzie")}
    for course, voices in STRICT.items():
        speakable = set(all_words(course)) | set(idiom_texts().get(course, []))
        for v in voices:
            have = set(index.get(course, {}).get(v, []))
            missing = sorted(t for t in speakable if clip_name(t) not in have)
            for t in missing[:10]:
                fail("strict %s coverage: no %s clip for '%s'" % (course, v, t))
            if len(missing) > 10:
                fail("strict %s coverage: ...and %d more missing for %s"
                     % (course, len(missing) - 10, v))

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
