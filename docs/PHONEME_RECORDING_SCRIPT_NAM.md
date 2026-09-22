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

---

## Batch 2 — the rest of Neutral American (26)

The pilot's sixteen were recorded, all marked Good and approved on
2026-09-22. These twenty-six complete the course. Same room, same phone,
same distance as the pilot, so the batch matches it. The pilot's quiet
sounds came in quiet (`s` needed +8 dB), so for the soft ones below —
marked **(soft)** — lean in a little closer and give them a touch more
air. The tool refuses a take the room noise nearly covers.

Stops, affricates and glides cannot be held alone, so they are recorded
as syllable demos, exactly like `p`, `t` and `k` in the pilot. Their
"isolated" rows at #audit stay empty forever; that is correct.

### Held consonants (11) · hold each 1–2 seconds, nothing before or after

| Slug | Sound | Find it in |
|---|---|---|
| `f` | /f/ **(soft)** | fun |
| `v` | /v/ | van, with the buzz |
| `theta` | /θ/ **(soft)** | think, tongue between the teeth, no voice |
| `eth` | /ð/ | this, same place, voiced |
| `esh` | /ʃ/ | she |
| `ezh` | /ʒ/ | the middle of measure |
| `h` | /h/ **(soft)** | a clean breathy exhale, no vowel after it |
| `n` | /n/ | no, tongue tip up, hum |
| `eng` | /ŋ/ | the end of sing, held, no g released |
| `l` | /l/ | love, tongue tip up, voiced |
| `r` | /r/ | red, the American r, held, no vowel |

### Vowels (4) · steady, about a second

| Slug | Sound | Find it in |
|---|---|---|
| `foot_vowel` | /ʊ/ | foot, short and lax, not goose |
| `thought_vowel` | /ɔː/ | law, rounded; do not slide into father |
| `happy_vowel` | /i/ | the end of happy, bright but short |
| `american_letter` | /ɚ/ | the end of letter, r-coloured, brief and unstressed |

### Diphthongs (4) · the whole glide, start to finish

| Slug | Sound | Find it in |
|---|---|---|
| `face_diphthong` | /eɪ/ | face |
| `choice_diphthong` | /ɔɪ/ | choice |
| `mouth_diphthong` | /aʊ/ | mouth |
| `american_goat` | /oʊ/ | go, the American glide |

### Syllable demos (7) · say the frame once, naturally

| Slug | Say |
|---|---|
| `b_syllable` | "aba" |
| `d_syllable` | "ada" (a true d, not the tap in ladder) |
| `g_syllable` | "aga" |
| `ch_syllable` | "acha" |
| `j_syllable` | "aja" |
| `w_syllable` | "awa" |
| `yod_syllable` | "aya" |

Hand-over is the same as the pilot: one file per sound, named by its slug,
your best take only, all in one folder (the Desktop is fine).
