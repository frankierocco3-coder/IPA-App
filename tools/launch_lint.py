#!/usr/bin/env python3
"""Launch lint: learner-facing language, icons and structural guarantees.

Zero-dependency static checks that fail the deploy when:
  1. "Native Idioms" survives anywhere learner-facing.
  2. A forbidden course name appears in shipped JS/HTML strings
     (Contemporary British / Standard Southern / SSBE-as-display /
     "educated southern" / No Fear Shakespeare).
  3. Traditional RP does not use 🎩, or Standard British does not use 🇬🇧,
     or both courses share an icon.
  4. Standard British checkpoints lose their deterministic Words &
     Expressions material (the expandUnit extras line).
  5. The sonnet reader stops deriving voices from the generated coverage
     manifest (hardcoded narration claims are how we lied last time).
  6. speak() regains a silent device-TTS fallback for course audio.

Sound-level guarantees (course isolation, exact-asset resolution) live in
tools/audit_audio.py and tests/audio.test.js.
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
fails = []


def fail(msg):
    fails.append(msg)


def main():
    main_js = (ROOT / "js" / "main.js").read_text(encoding="utf-8")
    course_js = (ROOT / "js" / "data" / "course.js").read_text(encoding="utf-8")
    shipped = ""
    for p in list((ROOT / "js").rglob("*.js")) + [ROOT / "index.html"]:
        shipped += p.read_text(encoding="utf-8") + "\n"

    # 1 + 2: banned learner-facing strings (strip line comments first)
    no_comments = re.sub(r"^\s*//.*$", "", shipped, flags=re.M)
    for banned in ["Native Idioms", "Contemporary British", "Standard Southern",
                   "Educated Southern", "educated southern", "No Fear Shakespeare",
                   "Recast beta", "Sonnets Recast", "coming soon\u201d recast",
                   # dialect-accuracy pass: retired inaccurate copy stays retired
                   "every butler", "Transcribe like the BBC", "hold their places",
                   "gets measured against",
                   # Studio pass: retired names, and IPA is transcription not translation
                   "My Texts", "Train Any Text", "Texts & Speeches",
                   "Texts &amp; Speeches", "Translate to IPA"]:
        if banned in no_comments:
            line = next(l for l in no_comments.splitlines() if banned in l)
            fail("banned learner-facing string %r — %s" % (banned, line.strip()[:90]))
    # SSBE as a display word (allow the internal id 'ssbe')
    if re.search(r"[>'\"]SSBE[<'\"\s]", no_comments):
        fail("'SSBE' appears as display text")

    # 3: icons
    if not re.search(r"id: 'rp', icon: '🎩'", main_js):
        fail("Traditional RP course icon is not 🎩 in COURSES")
    if not re.search(r"id: 'ssbe', icon: '🇬🇧'", main_js):
        fail("Standard British course icon is not 🇬🇧 in COURSES")
    if "title: 'Traditional RP',\n    icon: '🎩'" not in course_js:
        fail("Traditional RP track icon is not 🎩")
    if "title: 'Standard British',\n    icon: '🇬🇧'" not in course_js:
        fail("Standard British track icon is not 🇬🇧")

    # 3c: lesson ids are unique across all courses (units/tracks may share
    # names with each other; lessons may not collide with anything)
    ids = []
    for block in re.findall(r"lessons: \[(.*?)\n    \]", course_js, re.S):
        ids += re.findall(r"\bid: '([^']+)'", block)
    dupes = sorted({i for i in ids if ids.count(i) > 1})
    for d_ in dupes:
        fail("duplicate lesson id in course.js: %s" % d_)
    if len(ids) < 40:
        fail("lesson-id audit parsed suspiciously few lessons (%d)" % len(ids))

    # 4: deterministic Words & Expressions in ssbe checkpoints
    if "extras.push('idiom', 'idiomRegister')" not in main_js:
        fail("ssbe checkpoints lost their deterministic idiom extras")

    # 5: reader voices must come from the generated coverage manifest
    if "LONGFORM_COVERAGE.sonnets" not in main_js:
        fail("sonnet reader no longer derives voices from LONGFORM_COVERAGE")
    if re.search(r"SONNET_NARRATED\s*=", main_js):
        fail("hardcoded SONNET_NARRATED narration claim has returned")

    # 6d: the speaking pause — targeted surface pins, NOT global word bans
    # ("Perform"/"Record" stay legal in history, function names and saved-
    # take management). The capability flag must default to disabled, the
    # Privacy copy must carry the three required disclosures, and the
    # capture UI must come only from the gated builders.
    caps_js = (ROOT / "js" / "capabilities.js").read_text(encoding="utf-8")
    if "learnerSpeaking: false" not in caps_js:
        fail("CAPABILITIES.learnerSpeaking no longer defaults to disabled")
    if "Object.freeze" not in caps_js:
        fail("CAPABILITIES is no longer frozen")
    for pin in ["New recording is temporarily unavailable",
                "saved recordings remain on this device",
                "play, download and delete"]:
        if pin not in main_js:
            fail("Privacy recording-pause disclosure missing: %r" % pin)
    record_ui = (ROOT / "js" / "record-ui.js").read_text(encoding="utf-8")
    for guard in ["if (!caps.learnerSpeaking) return ''"]:
        if record_ui.count(guard) < 2:
            fail("a capture-UI builder in record-ui.js lost its capability gate")

    # 6c: the preface copy stays VERBATIM (spot pins from
    # docs/WHY_SPEECH_MATTERS_COPY.md, which supersedes THRESHOLD_COPY.md
    # for panels 1-7 — if one of these drifts, someone paraphrased)
    for pin in ["Why Speech Matters",
                "— Plato, <i>Republic</i> 377a–b",
                "especially in the case of a young and tender thing",
                "Speech is not decoration. It is action.",
                "Speech reveals thought. It reveals what we understand",
                "The strength of a feeling does not determine the truth of a claim.",
                "ear first, then text, then performance",
                "no score, no points",
                "Both take you into the same app. You can change your mind at any time.",
                "The guided path stays available whenever you want it."]:
        if pin not in main_js:
            fail("preface copy drifted from docs/WHY_SPEECH_MATTERS_COPY.md: missing %r" % pin[:60])

    # 6d: the reading pathway stays a credited public-domain pathway, not
    # an ebook shelf — translator credit and PD statement are pinned
    for pin in ["Benjamin Jowett",
                "public domain worldwide",
                "Rhetoric &amp; Oratory"]:
        if pin not in main_js:
            fail("reading-pathway credit/PD statement missing: %r" % pin)

    # 6b: syllable demonstrations stay labelled as demonstrations, never
    # passed off as pure isolated sounds
    if "🔊 In a syllable" not in main_js or "syllable demonstration" not in main_js:
        fail("syllable-demo labelling weakened on the sound pages")

    # 6: no silent device fallback in course audio
    audio_js = (ROOT / "js" / "audio.js").read_text(encoding="utf-8")
    if "deviceSpeak(text, { rate, lang });\n  return 'tts';" in audio_js \
       and "if (device) {" not in audio_js:
        fail("speak() appears to fall back to device TTS without an explicit device request")

    if fails:
        print("LAUNCH LINT FAILED — %d problem(s):" % len(fails))
        for f_ in fails:
            print("  ✗ " + f_)
        sys.exit(1)
    print("Launch lint PASSED")


if __name__ == "__main__":
    main()
