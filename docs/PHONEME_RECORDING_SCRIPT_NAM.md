# Neutral American phoneme recording script (pilot)

Sixteen recordings: ten vowels, three sustained consonants, three syllable
demonstrations. Frankie records these himself; this page is the script to
read from. Generated from `tools/phoneme_manifest_nam.json` — if the two
ever disagree, the manifest wins.

## Before you start

* **Quiet room, one sitting.** Same mic, same distance, same level for all
  sixteen. Consistency between the clips matters more than any single one.
* **A word first, then the sound.** Say the word under your breath to find
  the vowel, then produce the sound alone. Do not record the word.
* **Hold each one about a second**, at a steady pitch, at a comfortable
  speaking loudness. No fade, no swell, no falling pitch at the end.
* **Nothing before or after.** No little vowel after a consonant, no breath
  at the end, no lip smack at the start. Leave a second of silence around
  each take so it can be trimmed cleanly.
* **One take per file.** Try a sound as often as you like, but keep only
  the take you are happy with. A file holding two or more sounds is
  refused by the prep tool rather than imported.
* **File names are the slug, exactly as written below** (`kit_vowel`). Any
  format your recorder makes is fine: m4a, wav, aiff or mp3.

## The ten vowels

### 1. `kit_vowel`  ·  /ɪ/  ·  KIT

Steady /ɪ/ as in kit, held ~0.7-1s at stable pitch. Lax — do not drift toward /iː/.

### 2. `dress_vowel`  ·  /e/  ·  DRESS

Steady /e/ as in dress, ~0.7-1s. Keep it a monophthong — no FACE glide.

### 3. `trap_vowel`  ·  /æ/  ·  TRAP

Open /æ/ as in trap, ~0.7-1s. No nasal raising — not the man/dance quality.

### 4. `strut_vowel`  ·  /ʌ/  ·  STRUT

Relaxed /ʌ/ as in but, ~0.7-1s. Distinct from schwa: this one is stressed and fuller.

### 5. `schwa`  ·  /ə/  ·  commA (weak)

Neutral unstressed schwa, short side of ~0.7s, low energy — the colourless 'uh'.

### 6. `american_lot_palm`  ·  /ɑ/  ·  LOT/PALM

Open unrounded /ɑ/ as in lot/father, ~0.7-1s. No rounding — not British /ɒ/.

### 7. `fleece_vowel`  ·  /iː/  ·  FLEECE

Tense /iː/ as in fleece, ~1s, steady — resist any onglide.

### 8. `goose_vowel`  ·  /uː/  ·  GOOSE

Back rounded /uː/ as in goose, ~1s, steady rounding throughout.

### 9. `price_diphthong`  ·  /aɪ/  ·  PRICE

Complete audible glide /aɪ/ — start open, land near /ɪ/. The whole journey, ~1s.

### 10. `american_nurse`  ·  /ɝ/  ·  NURSE

R-coloured /ɝ/ as in nurse, ~1s. The r-colour is the point — sustain it evenly.

## The three sustained consonants

These are the consonants that can be held. Everything else that can be
held (f, v, sh, n, l) follows the same idea if you want to add them later.

### 1. `s`  ·  /s/

Controlled voiceless sustain /sss/, ~1s. No vowel before or after.

### 2. `z`  ·  /z/

Voiced sustain /zzz/, ~1s, buzz audible throughout. No added vowel.

### 3. `m`  ·  /m/

Hummed /mmm/, ~1s, lips closed the whole time. No vowel release.

## The three syllable demonstrations

A stop cannot be said on its own — p, t and k are a release into something.
So these are recorded as syllables ON PURPOSE, and the app labels them as
syllable demonstrations, never as pure isolated sounds. The frame is the
open vowel either side: /ɑ_ɑ/.

### 1. `p_syllable`  ·  /p/

Syllable demo (stops cannot be sustained): a clean /ɑpɑ/ — closure and crisp release, never a standalone 'puh'.

### 2. `t_syllable`  ·  /t/

Syllable demo: /ɑtɑ/ with a true alveolar /t/ — no tapping, no 'tuh'.

### 3. `k_syllable`  ·  /k/

Syllable demo: /ɑkɑ/ — clean velar closure and release, no 'kuh'.

## Handing them over

1. Put every file in one folder, each named by its slug (`kit_vowel.m4a`).
2. Tell me the folder. I trim the silence, level them against each other,
   check each one is a real recording and not a stray file, and import
   them with `tools/import_phonemes.py`, which never overwrites and never
   makes anything learner-facing on its own.
3. You listen at `#audit` and mark each one Good or Bad. **Only the ones
   you mark Good ever reach a learner** — approval is exact to the
   dialect, voice and slug.
4. Nothing about the other three courses changes until you record them
   too. Approving Neutral American does not affect RP, Standard British or
   Australian.

Conversion is handled: ffmpeg is installed (from pip, 2026-09-20), so
`tools/prep_phonemes.py` turns whatever the recorder made into levelled,
trimmed MP3 before import. It can also split ONE continuous take of all
sixteen sounds (in this order, a clear pause between each) if that is
easier on the day, and it refuses to write anything if the count of
sounds it hears does not match the list.
