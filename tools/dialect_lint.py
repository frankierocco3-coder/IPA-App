#!/usr/bin/env python3
"""Dialect Accuracy Standard lint — static cross-checks of the dialect data.

Zero-dependency (Python 3.9). Fails the deploy when:
  1. A lesson lists a symbol that does not exist in PHONEMES.
  2. A lesson in accent X lists a symbol foreign to X (wrong transcription
     system — e.g. an RP LOT /ɒ/ inside the Australian course).
  3. A WORDS entry tagged for accent X contains a symbol foreign to X
     (quiz answer keys in the wrong system).
  4. An allophone symbol (a realization like [ʔ]) appears in a WORDS entry
     that is not flagged `narrow: true` — allophones must never sit in
     broad transcriptions, and are never counted as phonemes.
  5. A WORDS entry contains a symbol missing from PHONEMES entirely.
  6. Duplicate track or unit ids (duplicate lesson ids: launch_lint).
  7. A dialect course is missing its DIALECT_INFO record (About page data).
  8. A practice-sentence word has no untagged reference transcription.

Every failure names the course/accent, the lesson or word, and the symbol.
Nothing is deleted or rewritten — this tool only reports.

Audio-side guarantees (clips bound to the right course voice, no
playable-looking controls without audio) live in tools/audit_audio.py and
the engine's playable-word filters; they are not re-checked here.
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "js" / "data"
fails = []


def fail(msg):
    fails.append(msg)


def parse_phonemes(src):
    """{symbol: {'type':…, 'weak':bool, 'allophone':bool}} from phonemes.js."""
    out = {}
    for m in re.finditer(r"^\s*'([^']+)': \{ type: '(\w+)'(.*)$", src, re.M):
        sym, typ, rest = m.group(1), m.group(2), m.group(3)
        out[sym] = {
            "type": typ,
            "weak": "weak: true" in rest,
            "allophone": "allophone:" in rest,
        }
    return out


def parse_words(src):
    """[{'word':…, 'ipa':[…], 'accent':str|None, 'narrow':bool}]"""
    out = []
    for m in re.finditer(r"\{ word: '([^']+)', ipa: \[([^\]]*)\]([^}]*)\}", src):
        word, ipa_raw, rest = m.group(1), m.group(2), m.group(3)
        acc = re.search(r"accent: '(\w+)'", rest)
        out.append({
            "word": word,
            "ipa": re.findall(r"'([^']+)'", ipa_raw),
            "accent": acc.group(1) if acc else None,
            "narrow": "narrow: true" in rest,
        })
    return out


def parse_foreign(src):
    """ACCENT_FOREIGN from engine.js: {accent: set(symbols)}."""
    block = re.search(r"const ACCENT_FOREIGN = \{(.*?)\n\};", src, re.S)
    if not block:
        fail("engine.js: could not locate ACCENT_FOREIGN")
        return {}
    out = {}
    for m in re.finditer(r"(\w+): \[([^\]]*)\]", block.group(1)):
        out[m.group(1)] = set(re.findall(r"'([^']+)'", m.group(2)))
    return out


def main():
    phonemes_src = (DATA / "phonemes.js").read_text(encoding="utf-8")
    course_src = (DATA / "course.js").read_text(encoding="utf-8")
    engine_src = (ROOT / "js" / "engine.js").read_text(encoding="utf-8")
    dialects_src = (DATA / "dialects.js").read_text(encoding="utf-8")

    phonemes = parse_phonemes(phonemes_src)
    words = parse_words(phonemes_src)
    foreign = parse_foreign(engine_src)

    if not phonemes:
        fail("phonemes.js: parsed no PHONEMES entries")
    if len(words) < 100:
        fail("phonemes.js: parsed suspiciously few WORDS entries (%d)" % len(words))

    # 1 + 2: lesson symbol checks (lessons are one line each in course.js)
    lessons_seen = 0
    for line in course_src.splitlines():
        m = re.search(r"\{ id: '([^']+)'", line)
        phs = re.search(r"phonemes: \[([^\]]*)\]", line)
        if not m or not phs:
            continue
        lessons_seen += 1
        lid = m.group(1)
        acc = re.search(r"accent: '(\w+)'", line)
        shift = re.search(r"shiftTo: '(\w+)'", line)
        target = (acc or shift).group(1) if (acc or shift) else None
        for sym in re.findall(r"'([^']+)'", phs.group(1)):
            if sym not in phonemes:
                fail("course %s / lesson %s: symbol %r is not in PHONEMES"
                     % (target or "core", lid, sym))
            elif target and sym in foreign.get(target, set()):
                fail("course %s / lesson %s: symbol %r belongs to another "
                     "accent's transcription system" % (target, lid, sym))
    if lessons_seen < 40:
        fail("course.js: parsed suspiciously few lessons (%d)" % lessons_seen)

    # 3 + 4 + 5: WORDS transcription-system and notation checks
    for w in words:
        scope = "%s word %r" % (w["accent"] or "reference", w["word"])
        for sym in w["ipa"]:
            info = phonemes.get(sym)
            if info is None:
                fail("%s: segment %r is not in PHONEMES" % (scope, sym))
                continue
            if w["accent"] and sym in foreign.get(w["accent"], set()):
                fail("%s: segment %r belongs to another accent's system"
                     % (scope, sym))
            if not w["accent"] and sym in foreign.get("rp", set()):
                fail("%s: reference (untagged) entry uses non-RP segment %r"
                     % (scope, sym))
            if info["allophone"] and not w["narrow"]:
                fail("%s: realization %r in a broad transcription — flag the "
                     "entry `narrow: true` or use the phoneme" % (scope, sym))

    # 6: duplicate unit ids (within COURSE) and track ids (within TRACKS).
    # A unit and a track may legitimately share an id ('nam' is both);
    # collisions are only illegal within each list.
    course_block = re.search(r"export const COURSE = \[(.*?)\n\];", course_src, re.S)
    unit_ids = re.findall(r"^    id: '([^']+)',$", course_block.group(1), re.M) \
        if course_block else []
    if len(unit_ids) < 10:
        fail("course.js: parsed suspiciously few unit ids (%d)" % len(unit_ids))
    for u in sorted({u for u in unit_ids if unit_ids.count(u) > 1}):
        fail("course.js COURSE: duplicate unit id %r" % u)
    tracks = re.search(r"export const TRACKS = \[(.*?)\n\];", course_src, re.S)
    track_ids = re.findall(r"id: '([^']+)'", tracks.group(1)) if tracks else []
    if len(track_ids) < 4:
        fail("course.js: parsed suspiciously few track ids (%d)" % len(track_ids))
    for t in sorted({t for t in track_ids if track_ids.count(t) > 1}):
        fail("course.js TRACKS: duplicate track id %r" % t)

    # 7: every dialect course has About data
    for d in ("nam", "rp", "ssbe", "aus"):
        if not re.search(r"^  %s: \{" % d, dialects_src, re.M):
            fail("dialects.js: missing DIALECT_INFO record for course %r" % d)

    # 8: practice sentences only use reference-transcribed words
    ref_words = {w["word"] for w in words if not w["accent"]}
    sent_block = re.search(r"export const SENTENCES = \[(.*?)\n\];", phonemes_src, re.S)
    if sent_block:
        for sw in set(re.findall(r"'([^']+)'", sent_block.group(1))):
            if sw not in ref_words:
                fail("SENTENCES: %r has no untagged reference transcription" % sw)

    if fails:
        print("DIALECT LINT FAILED — %d problem(s):" % len(fails))
        for f_ in fails:
            print("  ✗ " + f_)
        sys.exit(1)
    print("Dialect lint PASSED — %d phonemes, %d words, %d lessons checked"
          % (len(phonemes), len(words), lessons_seen))


if __name__ == "__main__":
    main()
