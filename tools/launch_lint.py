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
    # docs/WHY_SPEECH_MATTERS_COPY.md — the 2026-08-12 three-panel
    # rewrite: Why Speech Matters / Speech Is Action / Speech Reveals
    # Thought; if one of these drifts, someone paraphrased)
    for pin in ["Why Speech Matters",
                "— Plato, <i>Republic</i> 377a–b, translated by Benjamin Jowett",
                "especially in the case of a young and tender thing",
                # concise first-time opening (INTRO variant)
                "Training does not erase who you are. It gives you more choices.",
                "Strong speech begins with knowing what you want your words to do.",
                "It shows what we understand, value, question or avoid.",
                # expanded permanent section (FULL variant, More/About)
                "Speech is not decoration. It is action.",
                "understand, strengthen or expand the way they speak",
                "adding choice and flexibility",
                "taking responsibility for its effect",
                "Speech reveals thought. It reveals what we understand",
                "relationship between thought and expression",
                "Both take you into the same app. You can change your mind at any time.",
                "The guided path stays available whenever you want it."]:
        if pin not in main_js:
            fail("preface copy drifted from docs/WHY_SPEECH_MATTERS_COPY.md: missing %r" % pin[:60])
    # The removed panels stay removed — under any name.
    for gone in ["Why Actors Train This Way", "The Journey"]:
        if gone in main_js:
            fail("a removed preface panel resurfaced: %r" % gone)

    # 6d: the reading pathway stays a credited public-domain pathway, not
    # an ebook shelf — translator credit, PD statement and the verbatim
    # Jowett excerpts (verified against Project Gutenberg) are pinned
    for pin in ["Benjamin Jowett",
                "public domain in the United States",
                "check the copyright law where they live",
                "Rhetoric &amp; Oratory",
                "persuades the judges in the courts",
                "create forgetfulness in the learners",
                "the beginning is the most important part of any work"]:
        if pin not in main_js:
            fail("reading-pathway credit/PD/excerpt missing: %r" % pin)

    # 6e: Speech Dissection stays a thinking tool — the one-tap honest
    # answers and the separate-from-project delete are pinned
    for pin in ["I don’t know yet",
                "Not relevant",
                "Delete this dissection",
                "The project and its text are untouched."]:
        if pin not in main_js:
            fail("Speech Dissection lost a first-class control: %r" % pin)
    # …and stays OFF the Studio tab strip (approved spec: an action and a
    # focused screen, never another tab)
    if "'dissect', '🔍 Dissect This'" in main_js or '"dissect", "🔍' in main_js:
        fail("Dissect This crept back into the Studio tab strip")
    # Privacy must disclose dissection storage and include it in the wipe
    for pin in ["Text dissections",
                "Delete projects, dissections, recordings"]:
        if pin not in main_js:
            fail("Privacy lost its dissection disclosure: %r" % pin)

    # 6e2: a present-but-unusable dissection in an import is REPORTED,
    # never silently dropped
    validate_js = (ROOT / "js" / "validate.js").read_text(encoding="utf-8")
    for pin in ["could not be imported because that section was invalid or from an unsupported version",
                "dissectionDropped"]:
        if pin not in validate_js:
            fail("import lost its dropped-dissection warning: %r" % pin[:60])

    # 6g: Playable Actions stays exactly the approved twelve — verbs, pair
    # relationships and shared practice lines pinned to ACTION_LIBRARY_v1
    playable_js = (ROOT / "js" / "data" / "playable.js").read_text(encoding="utf-8")
    for verb in ["To Reassure", "To Dismiss", "To Confess", "To Justify",
                 "To Confront", "To Draw Out", "To Command", "To Appeal To",
                 "To Warn", "To Intimidate", "To Forgive", "To Punish"]:
        if "verb: '%s'" % verb not in playable_js:
            fail("Playable Actions lost or renamed an entry: %r" % verb)
    for pair in ["actions: ['reassure', 'dismiss']",
                 "actions: ['confess', 'justify']",
                 "actions: ['confront', 'draw-out']",
                 "actions: ['command', 'appeal-to']",
                 "actions: ['warn', 'intimidate']",
                 "actions: ['forgive', 'punish']"]:
        if pair not in playable_js:
            fail("Playable Actions pair relationship drifted: %r" % pair)
    for line in ["Nothing is going to happen to you tonight.",
                 "I did it.",
                 "Tell me what happened.",
                 "Sit down.",
                 "You don’t want to do that.",
                 "It’s all right. I understand."]:
        if playable_js.count(line) < 3:      # pair table + both entries
            fail("a shared practice line drifted or lost a pair member: %r" % line)
    if "What are you doing to the other person through these words?" not in playable_js:
        fail("Playable Actions lost its governing question")
    if playable_js.count("pairId:") != 12:
        fail("Playable Actions must have exactly twelve pair-carrying entries")

    # 6h: Accent Bridge (Build D) — twelve ordered routes, review-gated
    bridge_js = (ROOT / "js" / "data" / "bridge.js").read_text(encoding="utf-8")
    accents = ["nam", "rp", "ssbe", "aus"]
    for a in accents:
        for b in accents:
            if a == b:
                if "id: '%s-%s'" % (a, b) in bridge_js:
                    fail("a same-accent bridge route exists: %s-%s" % (a, b))
            elif "id: '%s-%s'" % (a, b) not in bridge_js:
                fail("missing bridge route %s→%s (all N×(N−1) pairings required)" % (a, b))
    approved = bridge_js.count("reviewStatus: 'approved'")
    if approved != 8:
        fail("bridge approved-comparison count changed (%d ≠ the 8 reviewed nam→rp entries) — "
             "approval happens one review at a time, never in code sweeps" % approved)
    for banned in ["Educated Southern British", "SSBE", "Contemporary British"]:
        if banned in bridge_js.replace("'ssbe'", "").replace("ssbe-", "").replace("-ssbe", ""):
            fail("bridge data shows a banned course label: %r" % banned)
    if bridge_js.count("Standard British") < 6:
        fail("bridge routes must label ssbe as 'Standard British' in every title")
    # (2026-08-12: the bridge became a Practice listening exercise. Same-
    # accent selection is now structurally impossible — the start selector
    # never offers the target — so the old same-accent message is gone.)
    for pin in ["review by a qualified dialect reviewer",
                "part of the original 23"]:
        if pin not in main_js:
            fail("bridge/review honesty copy missing: %r" % pin)

    # 6h2: the removed period-American expressions stay removed from the
    # learner-facing data (comments documenting the removal are fine)
    import re as _re
    def _strip_comments(src):
        src = _re.sub(r"/\*.*?\*/", "", src, flags=_re.S)
        return _re.sub(r"^\s*//.*$", "", src, flags=_re.M)
    idiom_code = _strip_comments((ROOT / "js" / "data" / "idiom.js").read_text(encoding="utf-8"))
    action_code = _strip_comments((ROOT / "js" / "data" / "action.js").read_text(encoding="utf-8"))
    removed = ["jake", "copacetic", "the berries", "horsefeathers", "hooey",
               "bunk", "palooka", "take a powder", "sawbuck", "simoleons",
               "kale", "hooch", "giggle water", "flapper", "dead soldiers",
               "on the level", "the brush off", "the brush-off",
               "shoot the breeze"]
    for term in removed:
        for src, name in ((idiom_code, "idiom.js"), (action_code, "action.js")):
            if _re.search(r"\b" + _re.escape(term) + r"\b", src, _re.I):
                fail("removed NAM expression resurfaced in %s: %r" % (name, term))

    # 6j: information architecture (2026-08 revision) — the learner-facing
    # textbook is titled "Question Everything"; the old "Speech Dissection"
    # label is retired from every learner surface (internal store, field
    # and question-ID names keep their historical "dissect…" spelling and
    # are NEVER renamed). Featured Texts stays removed as a shelf.
    if "Question Everything" not in main_js:
        fail("the Question Everything textbook title is missing from main.js")
    if "Speech Dissection" in _strip_comments(main_js):
        fail("a learner surface still says 'Speech Dissection' — the learner-facing "
             "title was renamed Question Everything (comments are fine)")
    if "Featured Texts" in _strip_comments(main_js):
        fail("the Featured Texts shelf returned — every text lives unpromoted "
             "in its collection")

    # 6k: the Practice revision (2026-08-12) — the section heading is
    # "Quick Practice"; the "Recommended for you" framing is retired from
    # every learner surface, and the bridge exercise never synthesizes:
    # its rounds come only from playableComparisons (both-clips rule).
    if "Quick Practice" not in main_js:
        fail("the Quick Practice heading is missing from Practice")
    if "Recommended for you" in _strip_comments(main_js):
        fail("'Recommended for you' returned to a learner surface")
    if "playableComparisons" not in main_js:
        fail("the bridge exercise no longer routes through the both-clips gate")

    # 6i: the Build F sonnet-edition catalog
    import hashlib as _hl
    sonnets_sha = _hl.sha256((ROOT / "js" / "data" / "sonnets.js").read_bytes()).hexdigest()
    if sonnets_sha != "c0daa0262d2dda6eb74697dbd83abe1abf9a55c8e553f2e73a3a218d82e4e844":
        fail("js/data/sonnets.js changed — the original Shakespeare text is "
             "byte-locked; if an edit was DELIBERATE, update this pin in the "
             "same commit and say why (got sha256 %s)" % sonnets_sha[:16])
    ed_dir = ROOT / "js" / "data" / "editions"
    ed_index = (ed_dir / "index.js").read_text(encoding="utf-8")
    ed_chunks = _re.findall(
        r"\{ file: '(sonnets-\d+-\d+)', from: (\d+), to: (\d+), expect: (\d+) \}", ed_index)
    declared_new = 0
    for fname, _frm, _to, expect in ed_chunks:
        src = (ed_dir / (fname + ".js")).read_text(encoding="utf-8")
        for key in ("plain: `", "nam: `", "ssbe: `", "aus: `"):
            cnt = src.count(key)
            if cnt != int(expect):
                fail("editions/%s.js has %d %r entries, manifest expects %s"
                     % (fname, cnt, key.split(':')[0], expect))
        if "rp: `" in src:
            fail("a Traditional RP vocabulary adaptation appeared in editions/%s.js — "
                 "RP is a pronunciation target; its course shows Original + Plain "
                 "Meaning only (documented decision)" % fname)
        if "No Fear" in src:
            fail("third-party guide label in editions/%s.js" % fname)
        declared_new += int(expect)
    if "EDITION_CATALOG_COMPLETE = true" in ed_index and declared_new != 149:
        fail("catalog marked complete but chunks hold %d of the 149 new sonnets"
             % declared_new)
    if declared_new > 149:
        fail("edition chunks declare %d new sonnets — more than the 149 that exist "
             "outside the five pilots" % declared_new)
    if "No Fear" in main_js:
        fail("'No Fear' label must never appear on a learner surface")

    # 6f: a blocked storage upgrade must carry the visible instruction,
    # and the wipe list must stay centralized with dissections in it
    db_js = (ROOT / "js" / "db.js").read_text(encoding="utf-8")
    for pin in ["Close other Speechcraft tabs, then reload this page.",
                "UpgradeBlockedError"]:
        if pin not in db_js:
            fail("db.js lost the honest upgrade-blocked instruction: %r" % pin)
    if "STORES.dissections,\n  STORES.projects" not in db_js.replace("  ", " ") \
       and "STORES.dissections" not in db_js.split("CONTENT_STORES")[-1][:200]:
        fail("CONTENT_STORES no longer includes dissections — a full wipe would orphan them")

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
