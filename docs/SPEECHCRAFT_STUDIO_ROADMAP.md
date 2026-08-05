# Speechcraft Studio — roadmap

The Studio is where the courses' skills meet the actor's own text:
**Learn** (IPA, speech production, dialects) → **Prepare** (import, edit,
transcribe, mark up) → **Rehearse** (listen, repeat, record, run scenes).

Product statement: *Speechcraft helps actors understand speech, prepare
their text and rehearse it in a chosen accent.*

Everything a user pastes into the Studio is private to their device.
Nothing is uploaded, published or shared, and private projects never mix
into the public Library.

## Phase 1 — Paste and Prepare  ✅ SHIPPED

- Private Studio projects (IndexedDB, versioned schema, explicit deletion
  with confirmation; recordings deleted with their project)
- Top-level Studio section; guided New Project flow (title, content type,
  pasted text, dialect) that saves nothing on cancel
- Content types: Monologue, Scene, Speech, Song Lyrics, Other — lyrics are
  first-class and use the same text/IPA tools (any playback is a spoken
  diction reference, never synthetic singing)
- Dialect selection from the app's central course definitions (never
  duplicated in Studio code)
- Word-aligned interlinear IPA in the selected dialect ("Transcribe to
  IPA" — transcription, not translation): Neutral American is
  dictionary-exact (CMUdict); Traditional RP, Standard British and
  Australian are rule-derived and marked ≈; dictionary misses (names,
  invented words) are flagged for review, never guessed confidently
- Per-word corrections with three scopes: this occurrence, all matching
  words in the project, or Save to Personal Dictionary
- Acting Notes and Pronunciation Notes (separate fields, autosaved)
- Debounced autosave with visible saving/saved state everywhere
- Export/import of projects as validated JSON (audio never travels)

## Phase 2 — Import and Scan

- Text-based PDF and document import
- Image and scanned-PDF OCR; camera scanning with cropping and page
  detection; an OCR-correction screen before anything is trusted
- Script-layout detection: characters, dialogue, stage directions
- Candidate approach: local, in-browser OCR (e.g. Tesseract.js,
  github.com/naptha/tesseract.js) so scanned sides never leave the device
  — consistent with the zero-backend architecture

## Phase 3 — Listen and Rehearse

**Architectural gate, stated honestly:** speaking *arbitrary* user text
in a course voice requires calling a TTS provider at runtime. Speechcraft
currently ships with **no backend and no client-side API path** — that is
a deliberate security decision (the ElevenLabs key exists only in offline
tooling; see docs/CREDENTIAL_POLICY.md). Phase 3 therefore requires a
decision to add a secure backend or serverless proxy with a restricted
key or supported temporary tokens (see the ElevenLabs authentication
docs). Until that decision is made, no TTS interface, stub or fake
playback control ships in the client. Studio text whose words match
existing recorded clips can already play them; everything else offers the
clearly-labelled device voice, same contract as the reader.

Planned once gated:
- Secure ElevenLabs integration (streaming; Dialogue mode for scenes)
- Line, selection and full-scene playback; per-character voice assignment
- Scene Partner Mode: automatic cueing, repeat-cue, pause controls,
  hide/reveal the actor's lines, "give me my first word"

## Phase 4 — Record and Compare

- Native voice vs actor recording, A/B playback (line-level exists today
  in Perform; this phase extends it Studio-wide)
- Local temporary recordings with explicit save; unsaved recordings
  auto-deleted
- Accent preparation lists; sound-by-sound feedback; coach collaboration
  (sharing is opt-in and explicit — never automatic)

## Songs expansion

- Lyric-document upload; sheet-music image/PDF upload
- Lyric extraction from sheet music with the original score preserved
  beside the editable lyrics
- Syllable-to-note alignment, sustained-vowel planning, consonant timing,
  breath marks, stress and singing-diction notes
- Multilingual singing diction

## Explicitly out of scope until their phase

Camera scanning, OCR, sheet-music recognition, multi-character ElevenLabs
dialogue, Scene Partner Mode, automatic acting analysis, sound-by-sound
scoring, coach collaboration, public sharing, AI-generated Plain Meaning,
and Dialect Transpositions. None of these get placeholder buttons — a
control only exists once it works.
