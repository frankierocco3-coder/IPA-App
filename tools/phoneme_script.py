#!/usr/bin/env python3
"""Generate a booth recording script from a phoneme manifest.

The manifest is the source of truth: it carries the slugs, the order, the
articulatory guidance and the share rule. This turns one into a page a
performer can read from, without retyping anything.

    python3 tools/phoneme_script.py --dialect cockney          # write the doc
    python3 tools/phoneme_script.py --all                      # all four accents
    python3 tools/phoneme_script.py --dialect rp --stdout      # preview
    python3 tools/phoneme_script.py --all --check              # fail if stale

WHY ORDER IS NEVER REGROUPED HERE. tools/prep_phonemes.py --split cuts one
continuous take into named files BY MANIFEST ORDER. If this script listed
the sounds grouped by category, a performer reading top to bottom would
record in a different order from the one the splitter assumes and every
clip would be misnamed. General Australian is the live example: its
entries run shared-vowels, two centring diphthongs, then its own
australian_* set, so a category sort really would move things. The list
below is therefore strictly manifest order, and the overview table is
labelled as orientation only.

nam is deliberately NOT generated. Its manifest holds the 16-sound pilot
only, while docs/PHONEME_RECORDING_SCRIPT_NAM.md covers all 42 across a
hand-written pilot and a hand-written Batch 2. Generating it would throw
away 26 sounds' worth of prose.
"""

import argparse
import json
import os
import re
import sys
import textwrap

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DIALECTS = ("rp", "ssbe", "aus", "cockney")
WRAP = 78

NAMES = {
    "rp": "Traditional RP",
    "ssbe": "Standard British",
    "aus": "General Australian",
    "cockney": "Cockney",
}

# Readme paragraphs we place deliberately. Anything we do not recognise is
# still emitted (under "Also from the manifest"), so a note added to a
# manifest later can never be silently dropped from the script.
ANCHORS = (
    ("workflow", "Workflow:"),
    ("general", "General guidance:"),
    ("order", "Entry order follows"),
    ("frame", "Syllable-demo frame:"),
    ("cast", "Cast "),
    ("share", "SHARE RULE."),
    ("specific", "Accent-specific in"),
)


def read_json(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def approved_slugs(dialect):
    """Slugs already approved for a dialect, read from the shipped flags."""
    path = os.path.join(ROOT, "js", "data", "audio-flags.js")
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    return set(re.findall(r"'" + re.escape(dialect) + r"/reference/([^']+)'", text))


def kind_of(entry):
    if entry["type"] == "syllable":
        return "syllable"
    if "lexicalSet" not in entry:
        return "consonant"
    core = entry["symbol"].replace("ː", "")
    return "diphthong" if len(core) > 1 else "vowel"


KIND_LABEL = {
    "consonant": "held consonants",
    "vowel": "vowels",
    "diphthong": "diphthongs",
    "syllable": "syllable demonstrations",
}


def join_lines(lines):
    """Join hard-wrapped manifest lines back into one paragraph.

    A line ending in a hyphen after a word character is a wrapped word
    ("Gimson-" + "era"), so it joins with no space; everything else joins
    with one.
    """
    out = ""
    for line in lines:
        piece = line.strip()
        if not out:
            out = piece
        elif re.search(r"\w-$", out):
            out = out + piece
        else:
            out = out + " " + piece
    return out


def paragraphs(readme):
    """Split a manifest _readme into paragraphs, keyed where recognised.

    Returns a list of (key, text). key is None for prose we did not anchor
    - the booth-risk notes, which differ per accent.

    The sentence-boundary split is STATEFUL on purpose: it only applies
    while we are inside the free-prose region (the casting notes), never
    inside an anchored paragraph. Without that, "SHARE RULE." loses its
    last sentence to a split and that orphan sentence then surfaces in the
    casting section, which is where it went wrong first time round.
    """
    starts = []
    current = "intro"
    for i, line in enumerate(readme):
        key = None
        for name, prefix in ANCHORS:
            if line.startswith(prefix):
                key = name
                break
        if key:
            starts.append((i, key))
            current = key
        elif (current in (None, "cast") and i
              and re.search(r'[.!?"]$', readme[i - 1].rstrip())
              and re.match(r"[A-Z]", line)):
            starts.append((i, None))
            current = None
    if not starts or starts[0][0] != 0:
        starts.insert(0, (0, "intro"))
    out = []
    for n, (i, key) in enumerate(starts):
        stop = starts[n + 1][0] if n + 1 < len(starts) else len(readme)
        out.append((key, join_lines(readme[i:stop])))
    # Merge a short orphan back into the free prose it trails. A one-line
    # follow-up ("Spot-check those two takes first.") is part of the note
    # above it, not a paragraph of its own.
    merged = []
    for key, text in out:
        if (key is None and merged and merged[-1][0] in (None, "cast")
                and len(text) < 80):
            merged[-1] = (merged[-1][0], merged[-1][1] + " " + text)
        else:
            merged.append((key, text))
    return merged


def polish(text):
    """Manifest prose -> markdown prose.

    Spaced ASCII hyphens become em dashes, and tokens markdown would
    mangle (anything with an underscore, tool paths, flags, placeholders)
    get backticks.
    """
    text = text.replace(" - ", " \u2014 ")
    # ONE pass, paths BEFORE bare slugs. Two passes tick the slug inside a
    # path first and yield docs/`PHONEME_RECORDING_LIST`.md.
    pattern = (r"(?:tools|docs|js)/[A-Za-z0-9_./-]+"
               r"|<[A-Za-z]+>(?:\.[A-Za-z0-9]+)?"
               r"|--[a-z][a-z-]*"
               r"|[A-Za-z0-9]+(?:_[A-Za-z0-9]+)+")
    return re.sub(pattern, lambda m: "`" + m.group(0) + "`", text)


def wrap(text, indent=""):
    return textwrap.fill(
        text, width=WRAP, initial_indent=indent, subsequent_indent=indent,
        break_long_words=False, break_on_hyphens=False,
    )


def wrap_item(text):
    """Wrap a numbered list item, hanging the continuation under its text."""
    return textwrap.fill(
        text, width=WRAP, subsequent_indent="   ",
        break_long_words=False, break_on_hyphens=False,
    )


def classify(entries, done):
    """Split entries into what this session must perform, and what it need not.

    - own: the accent's spec names a departure, so it records its own take
    - fresh: a shared sound nobody has recorded yet (one take serves every
      course that shares it)
    - copy: a shared sound the Neutral American session already covers
    """
    own, fresh, copy = [], [], []
    for n, entry in entries:
        if entry.get("take") == "accent-specific":
            own.append((n, entry))
        elif entry["slug"] in done:
            copy.append((n, entry))
        else:
            fresh.append((n, entry))
    return own, fresh, copy


def fresh_map():
    """Which unrecorded shared sounds each accent wants.

    A shared sound is recorded ONCE and copied into every course that uses
    it, so the four scripts overlap. Without this, adding up the four
    "needs performing" counts gives 43 takes for a session that is really
    29, and a sound could be performed twice for nothing.
    """
    done = approved_slugs("nam")
    out = {}
    for dialect in DIALECTS:
        manifest = read_json(
            os.path.join(HERE, "phoneme_manifest_%s.json" % dialect))
        _, fresh, _ = classify(
            list(enumerate(manifest["entries"], 1)), done)
        out[dialect] = set(e["slug"] for _, e in fresh)
    return out


def session_total():
    """(new shared sounds, accent-specific takes, naive per-script sum).

    The first two add up to the real session. The third is what you get by
    adding the four scripts' own counts, which double-counts every shared
    sound that more than one course wants - quoted in the scripts so that
    nobody plans a session around it.
    """
    done = approved_slugs("nam")
    shared, own, naive = set(), 0, 0
    for dialect in DIALECTS:
        manifest = read_json(
            os.path.join(HERE, "phoneme_manifest_%s.json" % dialect))
        o, f, _ = classify(list(enumerate(manifest["entries"], 1)), done)
        own += len(o)
        naive += len(o) + len(f)
        shared |= set(e["slug"] for _, e in f)
    return len(shared), own, naive



def render(dialect):
    manifest = read_json(os.path.join(HERE, "phoneme_manifest_%s.json" % dialect))
    entries = list(enumerate(manifest["entries"], 1))
    readme = manifest.get("_readme", [])
    paras = paragraphs(readme)
    got = dict((k, v) for k, v in paras if k)
    name = NAMES.get(dialect, dialect)
    nam_done = approved_slugs("nam")
    own, fresh, copy = classify(entries, nam_done)

    counts = {}
    for _, entry in entries:
        k = kind_of(entry)
        counts[k] = counts.get(k, 0) + 1
    tally = ", ".join(
        "%d %s" % (counts[k], KIND_LABEL[k])
        for k in ("vowel", "diphthong", "consonant", "syllable")
        if counts.get(k)
    )

    L = []
    add = L.append
    add("# %s phoneme recording script" % name)
    add("")
    add(wrap(
        "%d recordings: %s. **%d of them actually need performing in this "
        "session** — see below; the rest are sounds this accent shares "
        "with a course already recorded." % (len(entries), tally, len(own) + len(fresh))
    ))
    add("")
    add(wrap(
        "Generated by `tools/phoneme_script.py` from "
        "`tools/phoneme_manifest_%s.json`. If the two ever disagree the "
        "manifest wins — do not hand-edit this file, change the manifest "
        "and regenerate." % dialect
    ))
    add("")

    # ---- what to record -------------------------------------------------
    add("## What this session has to record")
    add("")
    add(wrap(
        "Most sounds are identical across the courses, so one take is "
        "recorded and copied into each. Where this accent's own published "
        "spec names a departure, it records its own. That makes three piles:"
    ))
    add("")

    if own:
        add("### Its own take — %d, because the spec says so" % len(own))
        add("")
        add(wrap(
            "These must be performed for %s. Never reuse another course's "
            "file for one of them: the clip is teaching this accent's "
            "realization, not the bare phoneme." % name
        ))
        add("")
        add("| # | Slug | Sound | Why it diverges |")
        add("|---|---|---|---|")
        for n, e in own:
            add("| %d | `%s` | /%s/ | %s |" % (
                n, e["slug"], e["symbol"], e.get("takeWhy", "spec departure")))
        add("")
    else:
        add("### Its own take — none")
        add("")
        add(wrap(
            "Every sound %s uses is either shared with another course or one "
            "that another accent diverges on. There is nothing here that only "
            "this accent can record." % name
        ))
        add("")

    if fresh:
        add("### New shared sounds — %d, recorded once for everyone" % len(fresh))
        add("")
        add(wrap(
            "Nobody has recorded these yet. One good take serves every course "
            "that shares the sound, so they are worth the most care in the "
            "room."
        ))
        add("")
        add("| # | Slug | Sound | Set | Also serves |")
        add("|---|---|---|---|---|")
        shares = fresh_map()
        for n, e in fresh:
            also = [NAMES[o] for o in DIALECTS
                    if o != dialect and e["slug"] in shares.get(o, ())]
            add("| %d | `%s` | /%s/ | %s | %s |" % (
                n, e["slug"], e["symbol"], e.get("lexicalSet", "—"),
                ", ".join(also) if also else "— only this course"))
        add("")
        add(wrap(
            "\"Also serves\" means that take is copied into those courses "
            "too, so record it once here and their scripts get shorter."
        ))
        add("")

    add("### Already covered — %d" % len(copy))
    add("")
    add(wrap(
        "These %d are shared sounds the Neutral American session recorded and "
        "approved on 2026-09-22. They still need a copy under "
        "`%s/reference/` before the course can play them, but that is a "
        "tooling step, not a booth one — see Handing them over. No new "
        "performance needed." % (len(copy), dialect)
    ))
    add("")

    shared_n, own_n, naive_n = session_total()
    add("### How this fits the other three accents")
    add("")
    add(wrap(
        "Across all four accent courses there are %d new shared sounds and "
        "%d accent-specific takes \u2014 **%d performances in total**, not "
        "the %d you get by adding up the four scripts. The difference is "
        "the shared sounds, which more than one course wants and which are "
        "recorded once. Record the accents in any order; each one you "
        "finish shortens the lists of the ones left."
        % (shared_n, own_n, shared_n + own_n, naive_n)
    ))
    add("")


    # ---- preparation ----------------------------------------------------
    add("## Before you start")
    add("")
    if "general" in got:
        add(wrap(polish(got["general"])))
        add("")
    add(wrap(
        "**Hold each one about a second**, steady pitch, comfortable speaking "
        "loudness. No fade, no swell, no falling pitch at the end."
    ))
    add("")
    add(wrap(
        "**A word first, then the sound.** Say the word under your breath to "
        "find the vowel, then produce the sound alone. Do not record the word."
    ))
    add("")
    add(wrap(
        "**One take per file.** Try a sound as often as you like, keep only "
        "the take you are happy with. A file holding two or more sounds is "
        "refused by the prep tool rather than imported."
    ))
    add("")
    add(wrap(
        "**File names are the slug, exactly as written below** "
        "(`kit_vowel.m4a`). Any format the recorder makes is fine: m4a, wav, "
        "aiff or mp3."
    ))
    add("")
    if "order" in got:
        add(wrap("**Record in the order printed here.** " + polish(got["order"])))
        add("")
    if "frame" in got:
        add("### The syllable frame")
        add("")
        add(wrap(polish(got["frame"])))
        add("")

    # ---- casting --------------------------------------------------------
    loose = [t for k, t in paras if k is None]
    if "cast" in got or loose:
        add("## Casting and what to listen for")
        add("")
        if "cast" in got:
            add(wrap(polish(got["cast"])))
            add("")
        for text in loose:
            add(wrap(polish(text)))
            add("")

    # ---- the list -------------------------------------------------------
    add("## The recording list")
    add("")
    add(wrap(
        "In this order. The numbers are the manifest's own, and "
        "`tools/prep_phonemes.py` run with `--split` uses them to name "
        "files when it cuts a single continuous take \u2014 so the order is "
        "load-bearing, not presentational."
    ))
    add("")

    runs = []
    for n, e in entries:
        k = kind_of(e)
        if not runs or runs[-1][0] != k:
            runs.append([k, n, n])
        else:
            runs[-1][2] = n
    add("At a glance (orientation only — do not record in this order):")
    add("")
    add("| Group | Entries |")
    add("|---|---|")
    for k, lo, hi in runs:
        add("| %s | %s |" % (
            KIND_LABEL[k].capitalize(),
            "%d–%d" % (lo, hi) if hi > lo else str(lo)))
    add("")
    seen = {}
    for k, _, _ in runs:
        seen[k] = seen.get(k, 0) + 1
    if any(v > 1 for v in seen.values()):
        add(wrap(
            "A group appears twice because this accent lists the sounds it "
            "SHARES with the other courses first, then its own distinctly "
            "named set. That is the manifest's order and the splitter's "
            "order, so it is kept rather than tidied into one run per "
            "group."
        ))
        add("")


    marks = {}
    for n, _ in own:
        marks[n] = "**Records its own take**"
    for n, _ in fresh:
        marks[n] = "**New shared sound** — one take serves every course that uses it."
    for n, _ in copy:
        marks[n] = ("**No new take needed** — the Neutral American "
                    "recording covers this one; it is copied in, not re-performed.")

    for n, e in entries:
        head = "### %d. `%s`  ·  /%s/" % (n, e["slug"], e["symbol"])
        if e.get("lexicalSet"):
            head += "  ·  %s" % e["lexicalSet"]
        add(head)
        add("")
        add(wrap(polish(e["guidance"])))
        add("")
        note = marks.get(n, "")
        if e.get("take") == "accent-specific" and e.get("takeWhy"):
            # the marker and the reason are one sentence, so the marker
            # must not already be terminated
            note = note.rstrip(".") + " — %s" % e["takeWhy"]
        if note and not note.rstrip().endswith("."):
            note += "."
        add(wrap(note))
        add("")
        if e.get("takeNote"):
            add(wrap("*%s.*" % polish(e["takeNote"])))
            add("")

    # ---- hand-over ------------------------------------------------------
    add("## Handing them over")
    add("")
    add(wrap_item(
        "1. Put every file you recorded in one folder, each named by its slug."
    ))
    add(wrap_item(
        "2. Tell me the folder. The prep tool trims the silence, levels the "
        "takes against each other, checks each file is a real recording, and "
        "writes MP3."
    ))
    add(wrap_item(
        "3. The %d already-covered sounds are copied from the Neutral "
        "American set into the same folder under their own slug names, so "
        "import sees one complete course." % len(copy)
    ))
    add(wrap_item(
        "4. You listen at `#audit` and mark each one Good or Bad. **Only the "
        "ones you mark Good ever reach a learner** — approval is exact to "
        "the dialect, voice and slug."
    ))
    add(wrap_item(
        "5. Nothing about the other courses changes. Approving %s leaves "
        "every other accent exactly as it was." % name
    ))
    add("")
    if "workflow" in got:
        add("The commands, from the manifest:")
        add("")
        add("```bash")
        for line in readme:
            if line.strip().startswith("python3"):
                add(line.strip())
        add("```")
        add("")
    if "share" in got:
        add(wrap(polish(got["share"])))
        add("")

    extra = [(k, t) for k, t in paras
             if k not in (None, "intro", "workflow", "general", "order",
                          "frame", "cast", "share", "specific")]
    if extra:
        add("## Also from the manifest")
        add("")
        for _, text in extra:
            add(wrap(polish(text)))
            add("")

    return "\n".join(L).rstrip() + "\n"


def doc_path(dialect):
    return os.path.join(
        ROOT, "docs", "PHONEME_RECORDING_SCRIPT_%s.md" % dialect.upper())


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dialect", choices=DIALECTS + ("nam",))
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--stdout", action="store_true", help="print, do not write")
    ap.add_argument("--check", action="store_true",
                    help="exit 1 if a doc on disk differs from the manifest")
    args = ap.parse_args()

    if args.dialect == "nam":
        print("REFUSED: nam is not generated, and --all skips it.\n")
        print("Its manifest holds the 16-sound pilot only, while")
        print("docs/PHONEME_RECORDING_SCRIPT_NAM.md covers all 42 across a")
        print("hand-written pilot and a hand-written Batch 2. Generating it")
        print("would throw away 26 sounds' worth of prose, so this tool will")
        print("not write that file. Edit it by hand, or extend the nam")
        print("manifest to all 42 entries first and then remove this guard.")
        return 1
    if args.all:
        targets = list(DIALECTS)
    elif args.dialect:
        targets = [args.dialect]
    else:
        ap.error("pass --dialect <d> or --all")

    stale = []
    for dialect in targets:
        text = render(dialect)
        path = doc_path(dialect)
        rel = os.path.relpath(path, ROOT)
        if args.stdout:
            sys.stdout.write(text)
            continue
        if args.check:
            have = ""
            if os.path.exists(path):
                with open(path, encoding="utf-8") as fh:
                    have = fh.read()
            if have != text:
                stale.append(rel)
                print("STALE  %s" % rel)
            else:
                print("ok     %s" % rel)
            continue
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(text)
        print("wrote  %s  (%d entries, %d lines)"
              % (rel, len(read_json(os.path.join(
                  HERE, "phoneme_manifest_%s.json" % dialect))["entries"]),
                 text.count("\n")))

    if args.check:
        if stale:
            print("\nFAILED: %d script(s) out of step with their manifest."
                  % len(stale))
            print("Run: python3 tools/phoneme_script.py --all")
            return 1
        print("\nPASSED: every script matches its manifest.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
