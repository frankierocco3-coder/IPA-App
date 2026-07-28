# Product — Speechcraft

*Audit date: 2026-07-28 · Branch: `security-hardening` · Status: current state, not a roadmap*

## What it currently does

Speechcraft is a **speech and dialect trainer for actors**. It teaches the
International Phonetic Alphabet, drills three stage dialects, and gives an
actor a place to rehearse real text — with their own recordings alongside a
model reading.

It is a **static web app**. Everything runs in the browser; there is no
account, no server and no network dependency after first load.

Live: <https://frankierocco3-coder.github.io/IPA-App/>

## Who it is for

* **Primary:** working and training actors who need a reliable dialect and a
  disciplined way to prepare text.
* **Secondary:** acting schools and voice teachers (the intended eventual
  paying customer — see *Not built*).
* **Incidental:** anyone learning the IPA.

Design bias throughout is toward the rehearsal room, not a language-learning
gamification loop: the vocabulary is *rehearse*, *take*, *best take*,
*performance ready*.

## Completed features

### Course
* **5 tracks** — IPA Foundations, Neutral American, RP, Australian, Accent
  Shift Drills — across **77 lessons** with a Duolingo-style unlock chain.
* **16 exercise generators** (listen-and-choose, minimal pairs, build a
  transcription, sight-read IPA, accent-shift drills, ear training…).
* Hearts, XP, streaks, checkpoint games, mastery finals.
* Accent-aware word pooling: a dialect never serves a transcription from a
  foreign accent.

### Arcade
* **14 single-mode games**, endless, no hearts lost, playable in Core IPA or
  any of the three dialects.

### The IPA Handbook
* Full chart of the **55-phoneme inventory** (18 vowels, 13 diphthongs,
  24 consonants), each with an articulation diagram.
* *Your Instrument* — labelled vocal-tract anatomy (original SVG).
* *The Vowel Map* — every vowel on the quadrilateral.
* *Personal Dictionary* and *Privacy & Data* screens.

### Text & Delivery
* **332 curated public-domain pieces**: Shakespeare's Sonnets (154), Chekhov
  (35), O'Neill (35), Wilde (36), Pirandello (36), Ibsen (36).
* Each opens four ways: **Listen** (model audio), **Scan** (verse-aware
  scansion), **IPA** (full transcription), **Perform** (record & compare).
* **Train Any Text** — paste any speech and get the same four tools.

### Perform mode
* Record at three levels: a line, a word, or a single sound.
* Play model, play your take, **Compare** (model then take, back to back).
* Self-rating (*Again / Close / Nailed It*), notes, **Best Take**.
* Takes persist in IndexedDB and survive a refresh.

### My Texts (rehearsal projects)
* Full CRUD, search, sort, status (*Not Started → In Rehearsal →
  Performance Ready → Archived*), duplicate, export/import JSON.
* Per-project notes, difficult words, pronunciation overrides, recordings.

### Weak Sounds & Today's Rehearsal
* Analytics derived from real exercise results — never alters scoring.
* Confidence tiers: <5 attempts *"Not enough data"*, 5–9 *"Early estimate"*,
  10+ a plain percentage.
* Confusion-pair detection (`/θ/` vs `/ð/`), and a daily card that picks 3–5
  priorities **and explains why each was chosen**.

### Pronunciation overrides
* Any word in an IPA view is editable, with three scopes: this occurrence,
  this project, or a personal dictionary across the app.
* ~126k-word General American dictionary (CMUdict-derived), lazy-loaded.

### Audio
* **12,638 pre-generated MP3s (~480 MB)** from ElevenLabs, committed as static
  files. Drill words in two voices per dialect; narrated readings for the
  sonnets and prose libraries.
* Falls back to the browser's own speech synthesis for anything not recorded.

## Incomplete or experimental

| Area | State | Note |
|---|---|---|
| **Australian sonnet audio** | ~39% (849/2155 lines) | Ran out of ElevenLabs quota mid-run; remaining lines use the device voice |
| **Chekhov / O'Neill / Wilde / Pirandello / Ibsen audio** | **Not generated** | Wired and ready; ~169k credits needed. Currently device voice |
| **RP/Australian IPA** | Rule-derived, marked "≈" | Only General American is dictionary-exact; other dialects are transformed by rule and cannot know lexical-set history |
| **Scansion** | Heuristic | ~78% of regular verse lines land on exactly 10 syllables; the rest are flagged, which is pedagogically useful but not authoritative |
| **Voice quality** | **Unverified** | Nobody has ear-checked the current narrators against the taught IPA. Flagged repeatedly; needs a human listener |
| **Perform in lessons** | Not built | Recording exists in text/projects only — a lesson never asks you to speak |
| **Browser coverage** | Chromium only | Firefox and Safari untested, Safari especially for MediaRecorder |

## Deliberately not built

* **No accounts, no sync, no backend.** Progress is per-device.
* **No teacher/class features** — the schools story has nothing to sell yet.
* **No pronunciation scoring.** Perform gives A/B comparison and honest
  self-assessment. Real phoneme scoring needs a paid API and a server.
* **No spaced repetition.** Completing a lesson marks it done forever.
* **No email, messaging or notification system of any kind.**
