"""Isolated-phoneme AI pilot, round 2 (owner ear-check, 2026-08-30).

The July 2026 TTS candidates were rejected wholesale by the owner's ear.
This pilot re-tests a 10-sound sample with the steering discipline learned
on the Cockney voices: multiple respelling variants per sound, verdicts
per variant, survivors become recipes, failures fall to human recording.

Voice: River (ElevenLabs SAz9YHcvj6GT2YYXdXww) — neutral American,
neutral gender: a candidate for the app's single 'reference' phoneme
voice key (docs/PHONEME_RECORDING_PLAN.md convention).

Output: tools/phoneme-pilot/ — NEVER deployed, never in audio/, so the
app and the audit gate see nothing until recipes are proven and a real
generation run is approved.

    python3 tools/phoneme_pilot.py --dry-run
    python3 tools/phoneme_pilot.py
"""

import pathlib
import sys

TOOLS = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
from generate_voices import synthesize, clip_name

VOICE_ID = "SAz9YHcvj6GT2YYXdXww"   # River — neutral American, neutral gender
SETTINGS = {"stability": 0.9, "similarity_boost": 0.75, "style": 0.0}

# (slug, spoken variant, label). Fricatives/nasals sustain; vowels risk
# glides and schwas; stops are SYLLABLE DEMOS by design (a true isolated
# stop is unsayable) and the app labels them as demos, never pure sounds.
PILOT = [
    ("f", "ffff", "fricative-a"), ("f", "fff", "fricative-b"),
    ("s", "ssss", "fricative-a"), ("s", "sss", "fricative-b"),
    ("v", "vvvv", "fricative-a"), ("v", "vvv", "fricative-b"),
    ("m", "mmmm", "nasal-a"), ("m", "mmm", "nasal-b"),
    ("ng", "nng", "nasal-a"), ("ng", "ngg", "nasal-b"),
    ("ee", "ee", "vowel-a"), ("ee", "eee", "vowel-b"),
    ("ah", "ah", "vowel-a"), ("ah", "aah", "vowel-b"),
    ("trap_a", "aa", "vowel-a"), ("trap_a", "aaa", "vowel-b"),
    ("b_syllable", "aba", "syllable-a"), ("b_syllable", "buh", "syllable-b"),
    ("t_syllable", "ata", "syllable-a"), ("t_syllable", "tuh", "syllable-b"),
]

OUT = TOOLS / "phoneme-pilot"


def main():
    dry = "--dry-run" in sys.argv
    chars = sum(len(s) for _, s, _ in PILOT)
    print(f"{len(PILOT)} clips, ~{chars} characters (~{chars} credits), one voice (River)")
    if dry:
        print("DRY RUN — nothing generated.")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    made = 0
    for slug, spoken, label in PILOT:
        dest = OUT / f"{slug}__{clip_name(spoken)}__{label}.mp3"
        if dest.exists():
            print(f"  = {slug}: {spoken} (already present)")
            continue
        dest.write_bytes(synthesize(spoken, VOICE_ID, SETTINGS))
        made += 1
        print(f"  ✓ {slug} as “{spoken}”")
    print(f"\nGenerated {made} clip(s) into {OUT.relative_to(TOOLS.parent)}/")


if __name__ == "__main__":
    main()
