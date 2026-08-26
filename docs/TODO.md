# Speechcraft — to-do

Rewritten at `93b9b9d`. Every number below was measured against the working
tree or read out of the running app, not carried over from the previous
version of this file. Where the old list was wrong, the correction is stated
rather than quietly dropped.

---

## Next up — the programme's next part

**BUILDING A CHARACTER (owner order, 2026-08-20) — built 2026-08-26.** Two new
Acting modules in `js/data/acting/course.js`: Module 4 Building a Character
(7 lessons: the Four Lists as entry, then improvisation-based character work,
recording on the learner's own phone, off-app by design) and Module 5
Tempo-Rhythm (6 lessons). Preparing the Performance moved from module 4 to 6;
lesson ids did not change, so nothing stored breaks. All 13 lessons are
`requiredReviewer: 'acting-professional'` and were owner-approved on 2026-08-26
(same editorial decision as the original 28 Acting lessons; specialist review is
still owed and the ledger notes say so). They are live in the Acting Library.

Copy sources: docs/BUILD_CHARACTER_COPY.md and docs/BUILD_TEMPO_RHYTHM_COPY.md.
House rule held: no practitioner named in any lesson; the Sources & Credits
addition proposed at the end of BUILD_CHARACTER_COPY.md still needs owner
sign-off. Design history in docs/BUILD_CHARACTER_BOGOSIAN.md and
docs/BUILD_TEMPO_RHYTHM.md.

Still open from the design: the two tools (two-track rhythm marking on the
script rail; rhythm cards in Acting Practice), and four regression pins that
still assert the old four-module shape.

---

## What is switched off right now

Four surfaces are hidden behind kill switches. Nothing is deleted; each is one
flag away from returning. Verified in the running app, not just in source.

| Surface | Flag | File | Content behind it |
|---|---|---|---|
| Accent Bridge | `BRIDGE_LIVE = false` | `js/data/bridge.js` | 12 routes, 81 comparisons, 73 unapproved |
| Dialect in Action | `DIALECT_ACTION_LIVE = false` | `js/data/action.js` | 8 pieces, 8 draft |
| Speech workspace | `SPEECH_LIVE = false` | `js/main.js` | textbook now shared into Acting |
| Scene Study | `SCENE_STUDY_LIVE = false` | `js/main.js` | — |

The Bridge switch sits at the single function every entry point calls
(`playableRoutesInto`), so the Practice card, the listener that would open it
and the Dialects-in-Speech facet all go together. Confirmed by driving the app:
no Accent Bridge card appears in the Listening group for any dialect.
`bridgeDrafts()` still feeds the owner review tool, which is intended.

---

## Content review — the critical path, human-bound

**798 items await a named human reviewer.** Full breakdown by reviewer, with
what each one covers, is in `docs/WHAT_NEEDS_REVIEW.md`.

| What | Items | Reviewer | Learner-visible now? |
|---|---:|---|---|
| Sonnet learning editions (`js/data/editions/`) | 616 | literary; plus dialect for the voice versions | No |
| Accent Bridge comparisons (`js/data/bridge.js`) | 73 | dialect, per accent | No |
| Articulation guides (`js/data/articulation.js`) | 62 | voice professional or SLP | **Yes**, badged draft |
| Speech chapters (`js/data/speech/reviews.js`) | 39 | voice professional or SLP; acting teacher | **Yes**, owner-approved |
| Dialect in Action pieces (`js/data/action.js`) | 8 | literary AND dialect | No |

An earlier version of this file gave the queue as 89 items and then 148. Both
were wrong: they missed the sonnet editions entirely, and counted the recast
transpositions as 5 when there are 15 (five sonnets by three dialects) which are
themselves inside the 616. The 616 is 154 sonnets by four versions each, and
`js/data/edition-reviews.js` is empty, so every one reads as draft.

**101 of these are already in front of learners.** The 62 articulation guides
carry a draft badge; the 39 Speech chapters are published under owner approval
and still await a specialist. Reviewing those two blocks validates content
already in use. The other 697 are invisible until approved, so reviewing them
unlocks content instead.

If only one reviewer can be found, make it the voice professional: they cover
the 62 guides and most of the 39 chapters, which is everything currently live.

Two gates are still empty, and both are audio/video rather than text:
`APPROVED_PHONEMES = []` (`js/data/audio-flags.js`), `ARTICULATION_VIDEOS = []`
(`js/data/media-videos.js`).

- [ ] **Line up reviewers.** A voice professional or SLP first, then dialect
      reviewers for NAM, RP, SSBE and AUS, then a literary reviewer for the
      sonnet editions. Unresolved, and it blocks everything below it.
- [ ] Decide the Bridge's fate: review the 73 and bring it back, or cut it. It
      has been off since 2026-08-17 and the drafts have not moved. Approving
      them does not by itself surface them; `BRIDGE_LIVE` is still false.
- [ ] Review in dialect batches. One reviewer takes that accent's bridge
      comparisons, action piece and sonnet voices together, not feature by
      feature.
- [ ] Record the reviewer's name and date per item. Batch approval does not
      count and an unnamed reviewer does not count.
- [ ] Set a per-workspace floor: at least one complete zero-draft collection in
      each workspace before launch.

---

## Articulation artwork — complete

**All 62 sounds have hand-drawn artwork**, plus three overview charts on the IPA
chart. The generated diagram in `js/diagram.js` is now a fallback that nothing
reaches; it stays as the safety net if a file ever goes missing.

Delivered in two batches: 44 (`93b9b9d`) covering the general inventory, then 18
covering the accent-specific and allophonic sounds. The second batch shipped
without a manifest, so every symbol was read off its own image's header bar and
cross-checked against the app inventory before wiring — never inferred from the
filename. Both batches are recorded in `img/articulation/manifest.json`.

Storage: baseline JPEG q90 at the delivered pixel dimensions, 11.9 MB for 65
files. Baseline specifically — progressive JPEGs decode fine but do not paint.

**Written guidance now covers all 62 sounds**: a one-line summary, three steps
you can act on, a contrast against the nearest confusable sound, and a watch-out
note. Every entry is badged draft awaiting a qualified voice professional,
because it tells a learner what to do with their body.

Two deliberate choices in the writing, recorded so a reviewer knows they were
choices. Every step is something to do or feel, not a description to read
(pinch your nose, hold a hand in front of your mouth, say bed then bad). And the
watch-out line usually says "that is normal" rather than "do not do that":
terminal devoicing, dark /l/, monophthongal FACE, h-dropping and /ŋg/ are real
English, and calling them errors would be wrong.

`cues` is no longer written. It placed leader labels on the generated diagram,
which nothing reaches now that all 62 have artwork.

Three sounds used to render nothing at all: `/ɛː/`, `/i/` and `/ʔ/` were missing
from the diagram tables, so the fallback returned an empty string and those pages
had no picture area whatsoever. Fixed by adding them to `VOWELS` and `CONS`.

---

## Open now — small and visible

| # | Item | Where |
|---|---|---|
| 1 | Rename shadowed `const SECTIONS` — nav config vs dissection headings | `js/main.js:245` |
| 2 | Disambiguate duplicate module basenames: three `course.js`, two `dialects.js`, two `store.js` | `js/data/` |
| 3 | Scope the working-text panel to Learn; it follows the user into the Library and points away from the content | `js/main.js` |

Items 1, 3, 7 and 8 from the previous version of this file are **done**: the app
is renamed, the "Ready" badge is gone, and `NO_LEARN_WORKSPACES` /
`defaultSectionFor` are deleted. The Build 01 IndexedDB `r(false)` fix has also
landed — the old list called it outstanding, and it is not.

---

## Consistency pass — makes four workspaces feel like one app

| # | Item |
|---|---|
| 4 | **One Library component.** Speech has search + card grid + counts; Acting has grid + counts, no search; Accents has full-width rows, no search, no counts |
| 5 | **One right-hand rail.** Speech/Acting show "Next step"; Accents shows "Daily Quests" — two unrelated widgets in one slot |
| 6 | One convention for shared content: "7 shared Speech chapters" vs "(shared Speech resource)" |
| 7 | Differentiate the two chips in Accents — workspace selector and course selector look like peers |
| 8 | Fix thin top-level cards: Acting Glossary (6 terms), Dialects in Speech (1 topic) |
| 9 | One count-label grammar — currently nine patterns across cards |
| 10 | Chapter-level Library search, lost when the libraries were unified |

---

## Code restructure

**Splitting `js/main.js` is now overdue and getting worse.**

| | Then | Now |
|---|---|---|
| `js/main.js` | 8,913 lines | **9,434** |
| `js/ui.js` | — | 213 lines |
| `css/style.css` | 1,626 | 1,804 |

Stage 3a landed: shared vocabulary lives in `js/ui.js`. Stage 3b did not —
`js/views/` does not exist. The plan stands: `views/speech.js`,
`views/acting.js`, `views/dialect.js`, `views/studio.js`, `views/reference.js`,
`views/dissect.js`, `views/admin.js`, moved while the 441-check suite still
covers the behaviour.

Splitting `css/style.css` is optional before release. CSS conflicts surface
immediately; JS ones do not.

---

## Documentation

| # | Item | Note |
|---|---|---|
| 11 | `docs/ROADMAP.md` is stale | Asserts a nav and workspace model that no longer exists |
| 12 | Reconcile the 15 conflicts from the planning report | None resolved |
| 13 | Lift header-comment specs into `docs/` | Accent Bridge, Dialect in Action, Shakespeare editions, Speech and Acting workspaces are specced only inside source files |

Three items are now **resolved**: `CLAUDE.md` states the real `main.js` size and
records `img/articulation/`; the phoneme voice-key tables in
`docs/PHONEME_RECORDING_PLAN.md` now state the single `reference` convention and
explicitly warn against the `f`/`m`/`alyx`/`peach` path, and the three
"untracked" review docs are all tracked.

---

## Blocked or human-only

| Item | Blocked on |
|---|---|
| Cross-browser: Firefox, Safari, iOS, iPadOS | Your devices. **Still not tested.** Safari MediaRecorder is the biggest untested risk |
| Owner audio ear-check | You only. Gates production |
| Isolated phoneme audio | Human recording (16-slug NAM pilot), then a per-slug ear verdict. `APPROVED_PHONEMES` stays `[]` until then |
| Articulation video | Filming, articulation review, and a repo-size decision |
| A voice professional for the articulation guides | The three written guides cannot lose their draft badge without one |
| Studio Phase 3 (scene partner / TTS) | An explicit backend decision. No stub ships before it |
| **The speaking exercise** | Needs an approved spec. Still the largest product gap: 73+ lessons, 14 games, and none asks the user to make a sound |

---

## The decisions only you can make

1. **Is the economy global or dialect-only?** Streak, gems and hearts appear
   only in Accents. An hour in Acting earns nothing.
2. **Do shared chapters render in place or navigate?** Decides whether the
   Library component needs a "you are now in Speech" transition.
3. **Does the Accent Bridge come back?** 73 unreviewed comparisons are waiting
   on the answer, and it has been off since 2026-08-17.

---

## Corrections to the previous version of this file

Kept deliberately, so the same mistakes are not re-reported.

- It listed the app rename, the "Ready" badge, the vestigial constants and the
  Build 01 IndexedDB fix as open. All four are done.
- It gave the review backlog as "87 items" with bridge at 73 drafts, action at
  8 and recasts at 6. Measured: bridge has **73 unapproved comparisons across
  81**, action **8 of 8**, recasts **5 of 5**. The recast figure in the old
  file was wrong.
- It described the Accent Bridge as having "grown to 74 comparisons". There are
  **12 routes and 81 comparisons**, and the surface has been switched off since
  2026-08-17.
- Counting the string `'draft'` in a source file is not a review count. Several
  numbers in the old file appear to have come from that, and it overcounts —
  comments and unrelated fields match. Read the module's own accessor instead
  (`bridgeDrafts()`, `actionDrafts()`, `approvedTranspositions()`).
