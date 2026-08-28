# Build: the Cockney course

Status: PHASE A INSTALLED (2026-08-28) behind `COCKNEY_LIVE = false` in
js/main.js — data layer live in source, invisible to learners until the
audio exists and the owner flips the switch. Owner decisions locked
2026-08-28: the spine is **Cockney** (Frankie's word, chosen over Estuary
and MLE), the voices are **Bob** (`DfE5EkknFF950NR6OMui`) and **Lizzie**
(`EQx6HGDYjkDpcli6vorJ`), and the voice-steering pilot is complete and
ear-approved (tools/street_pilot.py).

Name **Cockney**, internal id `cockney`, icon 🚕 (proposed by Tess, not
vetoed).

Phase A shipped: DIALECT_INFO.cockney (Accuracy Standard), 32-entry
cockney word bank (narrow realizations over the shared broad system),
ACCENT_FOREIGN/ACCENT_NAMES/ACCENT_ERRORS in engine.js, four-stage track
(ck-0 through ck-final, 10 lessons), COURSES/TRACK_ACCENT/ACCENT_LANG
registration, dialect_lint check 7 extended, and an accent-aware
`words(accent)` in generate_voices.py so strict-ssbe coverage stops
demanding Alyx/Peach clips for cockney-only words. Latent engine bug
fixed en route: genFillBlank crashed on an accent with an empty playable
pool; it now returns null like its siblings. Audio-dependent exercise
types honestly return null until clips exist; reading-based lessons
already generate.

Phase B remaining: idiom set (everyday + rhyming slang), pron.js
toCockney, respelling layer in the generator, audio batches (review →
ear-check → bulk → ear-check), #audit filter, validate.js accent,
regression pins, launch flip.

The earlier working title "Street British" is superseded by the spine
decision. Course copy names Cockney honestly and never calls it slang-only,
lazy, or incorrect English — same respect standard the AUS idiom set got.

---

## 1 · What the course teaches (the honesty statement)

Contemporary broad London Cockney: the working-class London accent with its
full feature set — th-fronting, glottal replacement, h-dropping,
l-vocalization, the diphthong shift, yod-coalescence — plus its lexicon,
including rhyming slang. Target speaker: a Londoner you would hear on a
market, on EastEnders, in Guy Ritchie's London. Period: contemporary, with
traditional features labelled where they are receding.

For actors this is a first-class audition dialect. The About card says so.

## 2 · Voices and the steering recipes (pilot results, ear-approved)

| Feature | Bob | Lizzie |
|---|---|---|
| Liquid U / yod-coalescence | ALWAYS respell: Chewsday, chewn — even inside sentences | same |
| Glottal /t/ (isolated words) | respell `buh-uh` | respell `buh-ah` |
| th-fronting | native in flowing sentences; IMPOSSIBLE in isolated words | same |
| Register | end lines with an "innit"-style tag to hold the street read | same |

Hard design consequences:

1. **th words are never drilled as bare-word clips.** Any exercise touching
   /θ/→[f] or /ð/→[v] uses phrases or sentences. The generator cannot make
   these voices say "bruvva" in isolation; ten spellings failed.
2. **The generator gains a respelling layer**: a per-voice pronunciation
   map applied to ALL text before synthesis (display text and filename keep
   the real spelling). This is new tooling — see §7.
3. Recipes are per-voice. The map is keyed `{voice: {word: respelling}}`.
4. Every clip is gated by Frankie's ear at #audit before approval — the
   pilot proved the mechanism, not any specific future clip.

## 3 · Phonology: realization layer, not a new phoneme system

Cockney shares Standard British's underlying phoneme system; what differs
is realization and incidence. So the course does NOT invent a new inventory.
It reuses the ssbe phoneme set and teaches Cockney as **realizations in
narrow brackets**, exactly the convention the app already established when
/ʔ/ became "the [ʔ] realization of /t/" (Dialect Accuracy Pass, 2026-08-04).
Notation contract holds: /…/ phonemic, […] realizations.

### Core target (defines the accent; drilled)

| Feature | Realization | Example |
|---|---|---|
| th-fronting | /θ/ → [f]; /ð/ → [v] medially and finally | think → [fɪŋk], brother → [ˈbrʌvə] |
| Glottal replacement | /t/ → [ʔ] intervocalically and finally | butter → [ˈbʌʔə], what → [wɒʔ] |
| H-dropping | /h/ → ∅ in content words | house → [aʊs] |
| L-vocalization | dark /l/ → [o]-like vowel | milk → [mɪok], well → [weo] |
| Yod-coalescence | /tj dj/ → [tʃ dʒ] | Tuesday → [ˈtʃuːzdeɪ], duty → [ˈdʒuːʔi] |
| Diphthong shift | FACE [æɪ], PRICE [ɑɪ], GOAT [æʊ] | face → [fæɪs], price → [prɑɪs], go → [gæʊ] |
| MOUTH monophthong | MOUTH → [æː] | mouth → [mæːf] |

### Common contemporary (taught, labelled)

- Word-initial /ð/ → [d] or dropped in function words (the, them)
- Final -er → [ɐ] (dinner → [ˈdɪnɐ])
- me for my (me bruvva) — grammar note, taught in expressions not drills
- ain't, innit as tags — expressions territory

### Variable / traditional (recognized, never required)

- MOUTH [æː] vs retained [aʊ] in younger speakers
- Full rhyming slang in live use (recognition content, see §6)
- Hypercorrect h-insertion

Feature-tier labels reuse the exact ssbe vocabulary: Core target / Common
contemporary / Relaxed-speech option / Variable — dialect_lint and the About
card machinery expect them.

### Incidence notes

BATH stays broad /ɑː/ (bath [bɑːf] — fronted TH, same vowel as ssbe). No
rhoticity change (non-rhotic like all British courses). No new phonemes, so
`phonemesForAccent('cockney')` = the ssbe set; narrow-bracket drills follow
the ssbe `narrow: true` mechanism.

## 4 · Course structure (ssbe is the template)

Track `cockney`, 4 stages + checkpoints, lesson ids `ck-*`:

- **ck-0 · Hear Cockney** — real listening lesson: Bob and Lizzie sentences,
  learner just listens and identifies features. One-time course INTRO
  overlay on first Learn visit (introsSeen), revisitable via Library.
- **Stage 1 · The Big Four** — th-fronting, glottal /t/, h-dropping,
  l-vocalization. Phrase-based drills for th (pilot constraint), word drills
  where the steer works.
- **Stage 2 · The Vowel Shift** — FACE/PRICE/GOAT chain, MOUTH, final [ɐ].
  Contrast drills against Standard British (fice/face, proice/price).
- **Stage 3 · Sounding Local** — connected speech, innit tags, me/my,
  expressions in sentences, register (when to go full broad vs mild).
- **Shift drills**: SSBE ↔ Cockney (the natural modern pair) and
  RP ↔ Cockney (the classic actor pair — Eliza Doolittle territory, though
  no copyrighted text and no practitioner names in learner copy).

Word bank: new `WORDS` entries tagged for cockney teaching each feature,
reusing existing recorded words where the ssbe text matches is NOT possible
here — Cockney clips must be Bob/Lizzie, so every drilled word/phrase is a
new recording in both voices.

## 5 · Strictness and audio model

`cockney` joins STRICT_ACCENTS: real clip or silence, no device TTS ever —
same audit_audio coverage rule as ssbe (every speakable cockney text must
have clips in BOTH bob and lizzie). COURSE_VOICES gains
`"cockney": {"bob", "lizzie"}`. Voice keys are speaker names, precedent
ssbe. Playback picks Bob/Lizzie randomly per activation.

## 6 · Words & Expressions: the Cockney set

Two registers in one dialect set (schema unchanged, `dialect: 'cockney'`):

1. **Everyday Cockney** — mate, sorted, gutted... overlap with the ssbe set
   is real; entries are re-authored for cockney (same term, its own clip in
   Bob/Lizzie) rather than cross-referenced, because audio is voice-bound.
2. **Rhyming slang** — dog and bone (phone), plates of meat (feet), trouble
   and strife (wife), porky pies (lies), have a butcher's (look)... each
   entry teaches the full form, the clipped form (butcher's), and the
   meaning. Recognition-first: flagged-style handling for dated terms;
   vulgar rhymes behind the existing flag toggle, never drilled.

Existing MLE reference collection stays where it is (it belongs to ssbe's
library as a labelled reference); the Cockney course gets its own set.

## 7 · Tooling: the respelling layer

`tools/generate_voices.py` (or a sibling `tools/generate_cockney.py`) gains:

- `RESPELL = {"bob": {...}, "lizzie": {...}, "*": {...}}` — word → spoken
  respelling, applied to all synthesized text for cockney; `*` applies to
  both voices (Chewsday), voice keys carry the per-voice glottal spellings.
- Filenames and the clip index ALWAYS use the real spelling — the app never
  sees a respelling.
- The map lives in a data file the pilot verdicts seed:
  `{"*": {"Tuesday": "Chewsday", "tune": "chewn"}, "bob": {"butter": "buh-uh"},
  "lizzie": {"butter": "buh-ah"}}` — and grows word by word as the word
  bank is authored, each addition ear-checked.
- Every batch: --dry-run first, cost reported, owner approval, then
  generate; every clip through #audit before the course ships.

## 8 · Cost envelope (estimate, not a quote)

Word bank ~120 words + ~80 phrases/sentences (th lives in phrases) + slang
set ~60 entries with examples. Rough characters: words ~800, phrases
~4,000, slang ~4,500 → ~9,300 chars per voice, **~19k credits both voices**,
in the same range as the ssbe bulk was. Authored list gets an exact dry-run
before any approval is requested. Generation happens in ear-gated batches
(review batch → bulk), never one shot.

## 9 · Integration checklist (every gate that will trip)

- [ ] `js/data/dialects.js` — DIALECT_INFO.cockney (Accuracy Standard:
      target/period/context, tiers, connected speech, convention, plain-text
      sources; dialect_lint fails without it)
- [ ] `js/data/phonemes.js` — phonemesForAccent('cockney') = ssbe set;
      narrow entries for realization drills
- [ ] `js/data/course.js` — track, stages, lessons, TRACK_ACCENT, COURSES
      entry (name Cockney, icon 🚕)
- [ ] `js/data/idiom.js` — cockney dialect set incl. rhyming slang
- [ ] `js/audio.js` — STRICT_ACCENTS + ACCENT_LANG ('en-GB')
- [ ] `tools/audit_audio.py` — COURSE_VOICES cockney {bob, lizzie};
      strict coverage loop covers cockney
- [ ] `tools/generate_voices.py` / sibling — ACCENTS + respelling layer
- [ ] `tools/voices.json` (local, gitignored) — cockney {bob, lizzie}
- [ ] `js/validate.js` — accept accent 'cockney' in imports
- [ ] `js/pron.js` — toCockney derivation (≈-marked) for Studio IPA
- [ ] Onboarding course picker, Preferences, workspace course chip,
      #audit dialect filter
- [ ] `tools/dialect_lint.py` — inventory/system checks extended
- [ ] `tools/launch_lint.py` — pins for the new names/copy once authored
- [ ] `tests/regression.test.js` — course pins (module counts, picker,
      strictness, no-TTS)
- [ ] Review model: every lesson/expression enters the ledger as draft or
      owner-approved with the standard NOT-specialist note; dialect
      reviewer ultimately owed, same as every course

## 10 · Sources (plain text, house policy: no external links)

Wells, Accents of English 2: The British Isles (Cockney chapter); Sivertsen,
Cockney Phonology; Matthews, Cockney Past and Present; Lindsey, English
After RP; Wright, Cockney Dialect and Slang. Rhyming slang entries
cross-checked against at least two published glossaries before authoring.
