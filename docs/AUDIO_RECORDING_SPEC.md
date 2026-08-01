# Audio recording spec

How Speechcraft clips must be produced and approved. The flags file
(`js/data/audio-flags.js`) is the single gate: **a clip a human has not
listened to never reaches a learner.** The owner reviews clips at
`<app URL>#audit` and exports a fresh flags file from there.

## The two kinds of audio — never interchangeable

| Kind | Lives in | Played by | Fallback |
| --- | --- | --- | --- |
| Word | `audio/<dialect>/<f\|m>/<word>.mp3` | `speak()` | device TTS (words only) |
| Isolated phoneme | `audio/phonemes/<dialect>/<f\|m>/<slug>.mp3` | `playPhoneme()` | **none** — unavailable is shown honestly |

A word is never a stand-in for a phoneme. A raw IPA string is never sent
to device TTS (`isWordText()` refuses it). Phoneme slugs derive from the
phoneme's display name: "STRUT vowel" → `strut_vowel`.

## Isolated phoneme clip requirements

Production is the **next milestone** (nothing has been produced yet).
Every clip, however produced, is a *candidate* until the owner approves it
by ear in `#audit`.

* **Vowels** — a stable isolated vowel, natural onset, ~500–1000 ms of
  usable sound. No consonant colouring.
* **Diphthongs** — the complete glide, first target moving to the second.
* **Fricatives** — sustained where physically possible (/ʃ/, /s/, /f/…).
* **Nasals & approximants** — sustained, with **no added vowel**.
* **Stops** — clean closure and release; no trailing schwa ("puh", "tuh",
  "kuh" are rejects).
* **Affricates** — the full stop-plus-fricative sequence.
* **American /r/** — alveolar/postalveolar approximant. A trill or a
  uvular (French-style) R is a reject.
* Each dialect records **its own inventory** (see `phonemesForAccent`) —
  RP and Neutral American are not interchangeable.
* Normalise loudness across clips; trim leading/trailing silence.
* Ordinary word-oriented TTS is **not acceptable** for isolated phonemes.

## Word clip requirements

* The word, once, natural pace, in the target dialect.
* Neutral American: rhotic (`car` = /kɑr/ with an American approximant).
* RP: non-rhotic (`car` = /kɑː/, no post-vocalic R).
* The vowel must be the dialect's actual vowel (`strut` = /strʌt/ — the
  2026-07 reject sounded like "stroot").

## Regeneration queue (owner-confirmed rejects)

| Clip | Problem | Required |
| --- | --- | --- |
| `audio/nam/f/strut.mp3` | vowel drifts toward "stroot" | /strʌt/ |
| `audio/nam/f/car.mp3` | uvular/French-sounding R | /kɑr/, American approximant |
| `audio/nam/f/care.mp3` | rejected in the 2026-07-30 ear-check | /ker/ |
| `audio/nam/f/was.mp3` | rejected in the 2026-07-30 ear-check | /wʌz/ |
| `audio/nam/m/law.mp3` | rejected in the 2026-07-30 ear-check | /lɔː/ |
| `audio/nam/m/strut.mp3` | rejected in the 2026-07-30 ear-check | /strʌt/ |
| `audio/nam/m/car.mp3` | rejected in the 2026-07-30 ear-check | /kɑr/, American approximant |

**Both** Neutral American voices fail "strut" and "car" — the words, not a
single voice, are the problem, so regeneration for these should use
pronunciation-guided synthesis (phonetic respelling / SSML-style hints),
not a plain retry. Until then those two words fall back to the device's
US voice — the explicit, documented word-level fallback ("care" and "was"
still play the male clip; "law" the female).

## Standard British (ssbe) status — approved 2026-07-30

The owner ear-approved the full review batch and the 19-idiom pilot (Alyx
and Peach). Consequences, all enforced in code:

* Bulk generation is unblocked (`generate_voices.py`, gate lifted).
* Standard British is a **strict course** (`STRICT_ACCENTS` in
  `js/audio.js`): course audio never falls back to device TTS — a missing
  clip stays silent and logs a warning instead of misrepresenting a voice.
* `tools/audit_audio.py` fails the deploy if any speakable Standard
  British text (word pool + idiom terms/examples) lacks a clip in BOTH
  Alyx and Peach — the strict rule can never silently rot.
* Explicit `device: true` readings (running text: sonnets, monologues,
  custom text) are a labelled device-voice feature, not a fallback, and
  remain available in every course.

## Approval workflow

1. Produce candidates (generation script or human recording).
2. Owner opens `#audit`, filters, listens, marks Good/Bad.
3. Export from `#audit` → replace `js/data/audio-flags.js` → commit.
4. `python3 tools/audit_audio.py` in CI/pre-commit verifies the flags
   refer to real files and the index has not drifted.

Files existing is not verification. Only a listened verdict is.
