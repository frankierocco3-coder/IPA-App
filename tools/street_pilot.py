"""Street British voice pilot — respelling steer test (owner ear-check).

Tests whether Bob and Lizzie (candidate Street British voices, decision
2026-08-28) can be steered into the target features by respelling the
synthesized text while keeping the real word in the filename:

  th-fronting   another -> anuva, brother -> bruvva
  glottal /t/   butter  -> bu'ah, buh-uh   (two attempts)
  liquid U      Tuesday -> Tyoozday (conservative) / Chewsday (London)
                tune    -> tyoon / chewn

Output goes to tools/street-pilot/<voice>/ — tools/ never deploys and
audio/ is untouched, so the clip index and the audit gate never see these.

Spend: 8 texts x 2 voices, ~96 characters. Owner-approved 2026-08-28.

    python3 tools/street_pilot.py --dry-run   # count only, no spend
    python3 tools/street_pilot.py             # generate
"""

import pathlib
import sys

TOOLS = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
from generate_voices import synthesize, clip_name, DEFAULT_SETTINGS

# Candidate voices are deliberately NOT in voices.json — keeping them there
# made every future ssbe batch spend four voices. IDs recorded here and in
# the voices.json comment block.
VOICES = {
    "bob": "DfE5EkknFF950NR6OMui",
    "lizzie": "EQx6HGDYjkDpcli6vorJ",
}

# (real word, spoken respelling, feature label, voices or None for both)
# Recipes are PER-VOICE (Frankie's ear, 2026-08-28, three rounds):
#   BOTH    Chewsday (Tuesday), chewn (tune)
#   BOB     buh-uh (butter), anuvva (another); brother still unsolved
#   LIZZIE  buh-ah (butter); another and brother still unsolved
# Rejected and deleted: anuva, bruvva, brudda, tyoon, Tyoozday, bu'ah,
# anuver (both), bruva (both), bruvver (both), anuvva (lizzie),
# buh-ah (bob), buh-uh (lizzie).
PILOT = [
    ("Tuesday", "Chewsday", "liquid-u-london", None),
    ("tune", "chewn", "liquid-u-london", None),
    ("butter", "buh-uh", "glottal-b", ["bob"]),
    ("butter", "buh-ah", "glottal-c", ["lizzie"]),
    # Round 6: every isolated th respelling failed (anuva, bruvva, brudda,
    # anuvva, anuver, bruvver, bruva, bruh-vah, anuhvah, brava). New
    # hypothesis: the failure is the isolated-nonword READ, not the
    # phonology — test the words inside flowing sentences, plus a
    # natural-spelling control to hear the voices' own connected speech.
    ("brother-sentence", "Me bruvva works down the market.", "th-in-context", None),
    ("another-sentence", "That's anuvva story, innit.", "th-in-context", None),
    ("control-sentence", "My brother told me another story.", "th-natural-control", None),
    # Round 6 verdict: the sentences WORKED for both voices. Frankie's
    # register trick: end the line with "innit" to hold the street read.
    # Round 7 RULE (owner, 2026-08-28): context is NOT trusted for the
    # liquid U — Tuesday is ALWAYS respelled Chewsday in generated text,
    # sentences included. The respelling dictionary applies to all text
    # before synthesis, not just isolated words.
    ("tuesday-sentence", "It's Chewsday, innit.", "liquid-u-respelled-context", None),
    # Round 8 (Cockney course, owner-approved spend): isolated-word
    # candidates for the drilled Cockney bank. Closed syllables this time,
    # unlike the failed vowel-final round-1 spellings. Survivors enter
    # tools/respell.json; failures become phrase-only drills.
    ("think", "fink", "th-isolated", None),
    ("thing", "fing", "th-isolated", None),
    ("three", "free", "th-isolated", None),
    ("with", "wiv", "th-isolated", None),
    ("bath", "barf", "th-isolated", None),
    ("hair", "air", "h-drop", None),
    ("better", "beh-uh", "glottal-b", ["bob"]),
    ("better", "beh-ah", "glottal-c", ["lizzie"]),
    # Round 8 verdicts (owner ear): fink, fing, free, wiv, barf, air,
    # beh-uh, beh-ah PASSED. Failed: ammer (→ try ama), orse (read
    # "horse-a"), ouse (read "housey"), mouf, nuffink (→ nuffing per
    # owner), waw-uh/waw-ah. Round 9 candidates:
    ("hammer", "ama", "h-drop", None),
    ("mouth", "mowf", "th-isolated", None),
    ("nothing", "nuffing", "th-isolated", None),
    ("water", "wor-uh", "glottal-b", ["bob"]),
    # Round 9 verdicts: ama, mowf, nuffing, wor-uh, wor-ah PASSED.
    # awss (read oddly) and owss failed. Round 10 — two spellings each.
    # Round 10 verdicts: orss PASSED both voices; 'ouse PASSED for Bob
    # only; owse and aws failed. Round 11: ous PASSED for Lizzie.
    # RECIPE BOOK COMPLETE 2026-08-28 — tools/respell.json holds every
    # proven recipe; brother/mother remain phrase-only (isolated
    # respelling proven impossible in rounds 1-5).
    ("house", "'ouse", "h-drop-a", ["bob"]),
    ("horse", "orss", "h-drop-a", None),
    ("house", "ous", "h-drop-c", ["lizzie"]),
    # Round 12: Lizzie's water — waw-ah (r8) and wor-ah (r9, failed on
    # re-listen at review) are out. Verdict: wau-ah PASSED. Book closed
    # again 2026-08-28; every drilled word has an ear-proven recipe.
    ("water", "wau-ah", "glottal-f", ["lizzie"]),
]
# Round 4 verdicts: anuvva rejected for Bob (another open for BOTH voices
# again); boo-ah rejected and deleted; Bob's buh-uh reconfirmed.

SETTINGS = dict(DEFAULT_SETTINGS)
SETTINGS["stability"] = 0.85  # tame delivery drift; phonology comes from the respelling

OUT = TOOLS / "street-pilot"


def main():
    dry = "--dry-run" in sys.argv
    jobs = [(vkey, vid, w, s, f) for vkey, vid in VOICES.items()
            for w, s, f, only in PILOT if only is None or vkey in only]
    chars = sum(len(s) for _, _, _, s, _ in jobs)
    print(f"{len(jobs)} clips, ~{chars} characters (~{chars} credits)")
    if dry:
        print("DRY RUN — nothing generated.")
        return
    made = 0
    for vkey, vid, word, spoken, feature in jobs:
        folder = OUT / vkey
        folder.mkdir(parents=True, exist_ok=True)
        dest = folder / f"{clip_name(word)}__{clip_name(spoken)}__{feature}.mp3"
        if dest.exists():
            print(f"  = {vkey}: {spoken} (already present)")
            continue
        dest.write_bytes(synthesize(spoken, vid, SETTINGS))
        made += 1
        print(f"  ✓ {vkey}: {word} spoken as “{spoken}”")
    print(f"\nGenerated {made} clip(s) into {OUT.relative_to(TOOLS.parent)}/")


if __name__ == "__main__":
    main()
