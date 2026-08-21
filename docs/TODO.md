# Speechcraft — to-do

Current as of `67a63e1`, verified against the working tree — not carried over from
older notes. Items marked ⚠ are ones I previously reported wrongly and have corrected.

---

## Next up — the programme's next part

**BUILDING A CHARACTER** (owner order, 2026-08-20). The next part of the
programme to be added. The Four Lists shipped on the same day as its first
piece — the five read-throughs and the four inventories a character is built
from — and lives on a script's own rail. What follows it is still to be
scoped: the work that turns those lists into a played character.

---

## Open now — small, visible, do first

| # | Item | Where | Size |
|---|---|---|---|
| 1 | Rename app to "Speechcraft — Find your voice" | `index.html:32`, `manifest.json:2` | 2 lines |
| 2 | **The Build 01 IndexedDB fix never landed** — still `r(false)`, still fails closed and walls users with projects but no localStorage | `js/main.js:4621` | 1 char + test |
| 3 | "Ready" badge reads as a content claim; means `done === 0`. Change to "Not started" | `js/main.js:2858` | 1 line |
| 4 | Acting hero shows an empty progress bar with no numbers; the renderer with counts already exists | `js/main.js:1091` vs Acting hero | small |
| 5 | Confirm the epigraph change to "— Socrates, Book II (377a–b)" was intentional and the launch-lint verbatim pins match | `js/main.js:3816`, `tools/launch_lint.py` | check |
| 6 | Rename shadowed `const SECTIONS` (nav config at :284 vs dissection headings at :6133) | `js/main.js` | small |
| 7 | Delete vestigial abstractions: `NO_LEARN_WORKSPACES = []`, `sectionsFor = () => SECTIONS`, `defaultSectionFor = () => 'learn'` | `js/main.js:300-304` | small |
| 8 | Code comment lists three workspaces; there are four | `js/main.js:311` | 1 line |

---

## Consistency pass — makes four workspaces feel like one app

| # | Item | Detail |
|---|---|---|
| 9 | **One Library component** | Speech has search + card grid + counts; Acting has card grid + counts, no search; Accents has full-width rows, no search, no counts, and is titled just "Library" |
| 10 | **One right-hand rail** | Speech/Acting show "Next step"; Accents shows "Daily Quests". Two unrelated widgets in one slot |
| 11 | **Decide: is the economy global or dialect-only?** | Streak/gems/hearts appear only in Accents. An hour in Acting earns nothing. **Product decision — yours** |
| 12 | Scope the working-text panel to Learn | It currently follows the user into the Library and points away from the content |
| 13 | One convention for shared content | "7 shared Speech chapters" vs "(shared Speech resource)" — and decide whether shared chapters render in place or navigate |
| 14 | Differentiate the two chips in Accents | Workspace selector and course selector look like peers |
| 15 | Fix thin top-level cards | Acting Glossary (6 terms), Dialects in Speech (1 topic) — grow or fold in |
| 16 | One count-label grammar | Currently 9 different patterns across cards |

---

## Content review — the critical path, human-bound

**87 items are invisible to learners because they are `draft`:**

| Source | Drafts |
|---|---|
| `js/data/bridge.js` | **73** |
| `js/data/action.js` | 8 |
| `js/data/recasts.js` | 6 |

Plus two empty gates: `APPROVED_PHONEMES = []`, `ARTICULATION_VIDEOS = []`.

- [ ] Triage the 73 bridge comparisons: ships / cut / defer
- [ ] Set a per-workspace floor — at least one complete zero-draft collection each
- [ ] Review in dialect batches (one reviewer covers that accent's bridge + action piece + transposition), not feature by feature
- [ ] Record the reviewer's name per item — batch approval doesn't count
- [ ] Line up native-speaker reviewers for NAM, RP, SSBE, AUS — **still unresolved, still blocking**

---

## Code restructure

| # | Item | Size | Note |
|---|---|---|---|
| 17 | **Split `js/main.js`** — 8,913 lines, 71% of app JS, 84 render functions | L | Split by workspace: `views/speech.js`, `views/acting.js`, `views/dialect.js`, `views/studio.js`, `views/reference.js`, `views/dissect.js`, `views/admin.js`. Extract shared helpers to `js/ui.js` first, in its own commit. Do it while the 111-check suite still covers the behavior |
| 18 | Disambiguate module names | S | Three `course.js`; `action.js` (Dialect in Action) vs `playable.js` (Playable Actions); `dialects.js` vs `speech/dialects.js` |
| 19 | Split `css/style.css` (1,626 lines) | M | Optional before release — CSS conflicts surface immediately, JS ones don't |

---

## Documentation

| # | Item | Note |
|---|---|---|
| 20 | **Fix the phoneme voice-key tables** | Still say `f/m` and `alyx/peach`; the real convention is a single `reference` voice. **57 files could be recorded to the wrong path.** Do before any recording session |
| 21 | `CLAUDE.md` says `main.js` is "~2.5k lines" | It's 8,913 |
| 22 | `docs/ROADMAP.md` (mine) is stale | Asserts a nav and workspace model that no longer exist |
| 23 | Reconcile the 15 conflicts from the planning report | None resolved yet |
| 24 | Reconcile three new untracked docs | `CHATGPT_REVIEW_PROMPT.md`, `REVIEW_PENDING_CONTENT.md`, `SPEECH_REVIEW.md` |
| 25 | Lift the header-comment specs into `docs/` | Accent Bridge, Dialect in Action, Shakespeare editions, Speech and Acting workspaces — all specced only inside source files |

---

## Blocked or human-only

| Item | Blocked on |
|---|---|
| Cross-browser: Firefox, Safari, iOS, iPadOS | Your devices. **NOT TESTED.** Safari MediaRecorder is the biggest untested risk |
| Owner audio ear-check | You only. Gates production |
| Isolated phoneme audio | Human recording (16-slug NAM pilot), then per-slug ear verdict |
| Articulation video | Filming + articulation review + a repo-size decision (589 MB against a ~1 GB limit) |
| Studio Phase 3 (scene partner / TTS) | An explicit backend decision. No stub may ship before it |
| The speaking exercise | Needs an approved spec. Still the biggest product gap — 73+ lessons, 14 games, none ask the user to make a sound |

---

## Done since this session started

- Before You Speak / Why Speech Matters preface — shipped, revised to 3 panels with a fuller replay variant
- ⚠ **Speech Dissection — shipped** (I earlier reported it as not in code; it's built, and the textbook is now titled "Question Everything")
- ⚠ **Playable Actions — shipped** and wired, including an `action-swap` practice deck
- ⚠ **"Why Speech Matters" — shipped** (I earlier reported the name existed nowhere)
- Sonnet learning editions — catalog complete, all 154, lazy-loaded in 10 chunks
- IndexedDB v2 with the `dissections` store — migration is additive-only, project deletion cascades correctly
- Four-workspace IA — Speech, Acting, IPA, Accents & Dialects
- Words & Expressions — 388 idiom entries plus false friends, U/non-U, MLE, dialogues, situations
- Accent Bridge — grew from 1 route to 74 comparisons (73 awaiting review)

---

## The two decisions only you can make

1. **Is the economy global or dialect-only?** Changes whether Acting and Speech award XP.
2. **Do shared chapters render in place or navigate?** Decides whether the Library component needs a "you are now in Speech" transition.
