# Speechcraft — pre-release punch list

Inspected at `67a63e1` on branch `threshold-before-you-speak`, running on `localhost:4174`.
All four workspaces are kept. Nothing here proposes removing Speech, Acting, IPA, or
Accents & Dialects.

**The finding that reframes everything else:** the four workspaces are not four products
with thin content. They are one product wearing four different interfaces. Learn, Library,
and the right-hand rail are each built differently depending on which workspace you're in.
That inconsistency — not the breadth — is what will read as unfinished.

Priorities: **P0** blocks release · **P1** is what makes four workspaces feel like one app ·
**P2** is content · **P3** is code · **P4** is docs.

---

# P0 — Release blockers

### P0-1 · The app's name says it's an IPA trainer

`index.html:32` — `<title>Speechcraft — learn the IPA</title>`
`manifest.json:2` — `"name": "Speechcraft — learn the IPA"`

IPA is now one workspace of four. This string is the browser tab, the bookmark, the
installed-PWA name, and the search-result title. Two lines.

Suggested: `Speechcraft — speech, accents and text for actors` (or whatever the four
workspaces genuinely add up to). `short_name` "Speechcraft" is already correct.

### P0-2 · "Ready" is a progress state wearing a content label

`main.js:2858` — `if (done === 0) return { cls: 'is-ready', label: 'Ready' };`

Every Acting module shows **Ready** because none has been started. To a new user that reads
as *this content is ready* — a claim about the product, not about their progress. Given how
much of this app is legitimately draft-gated, that's the one wrong word to have on screen.

Fix: `Not started`. Keep the class name if the styling is doing work.

### P0-3 · The Acting hero shows an empty progress bar with no numbers

`main.js:1091` renders `Course progress · ${doneCount} of ${seq.length}`, but the Acting
hero renders a bare bar with the label and no count. An empty bar with no numbers reads as
broken rather than as zero. Use the same renderer both places.

### P0-4 · Verify the epigraph attribution and the lint pins agree

`main.js:3816` now reads `— Socrates, Book II (377a–b)`; `THRESHOLD_COPY.md` says
`— Plato, Republic 377a–b`, and `launch_lint.py` pins six threshold lines verbatim.
Socrates is the speaker in *Republic*, so the change may be a deliberate improvement — but
confirm it was intentional and that the pins were updated, or a deploy will fail on a line
nobody remembers editing.

### P0-5 · Cross-browser, still outstanding

Firefox, Safari desktop, iOS Safari, iPadOS — all **NOT TESTED**. Safari `MediaRecorder`
especially. Unchanged from the planning report and still the largest untested risk in a
product whose core loop is recording.

### P0-6 · No voice has been ear-checked

Unchanged, and undelegatable. This gates *production*, not beta.

---

# P1 — Make four workspaces feel like one app

This is the substance of the polish pass. Each item is a divergence I can see on screen.

### P1-1 · Library screens are three different designs

| Workspace | Heading | Search | Layout | Counts | Section label |
|---|---|---|---|---|---|
| Speech | "Speech Library" | **Yes** | 2-col cards | "21 chapters in four parts" | COLLECTIONS |
| Acting | "Acting Library" | No | 2-col cards | "10 chapters" | COLLECTIONS |
| Accents & Dialects | **"Library"** | No | **Full-width rows + icon tiles** | **None** | **None** |

Three layouts, two heading conventions, two counting conventions, search in one of three.
Pick one Library component and let the content differ. This single fix does more for
perceived finish than anything else on this list.

Recommend: the card grid, search everywhere, `"<Workspace> Library"` everywhere, a count on
every card.

### P1-2 · The right-hand rail is a different feature per workspace

- Speech / Acting: **"Next step"** with a working-text panel (`main.js:583`)
- Accents & Dialects: **"Daily Quests"** with XP/gem/heart progress

Two unrelated widgets in the same slot. Decide what the rail *is*. If it's "what to do
next," quests are one kind of next step and should render inside it, not replace it.

### P1-3 · The game economy exists in one workspace only

Accents & Dialects shows streak 🔥1, gems 💎10, hearts ❤️5, plus a lock chip and Daily
Quests. Speech and Acting show none of it.

That's a real product question, not a styling one: **is progress global or per-workspace?**
A learner who spends an hour in the Acting course and earns nothing, then switches to
Accents and sees a streak, will read the Acting work as not counting. Either extend the
economy across all four or scope it explicitly to dialect drills and say so.

### P1-4 · The working-text panel follows you into the Library

"Next step / The envelope / Practice this text" renders on the Acting Library screen, where
it points away from the content. It looks like a Learn-side widget mounted globally. Scope
it to Learn, or make it collapse outside Learn.

### P1-5 · Two conventions for cross-workspace content

- Acting Library: "Speech for Actors — **7 shared Speech chapters**"
- Accents Library: "Rhetoric & Oratory **(shared Speech resource)**"

Same idea, two labels. Also decide the behavior: does a shared chapter render in place, or
navigate you into the owning workspace with a visible transition? Right now a reader can be
in the Acting Library reading a Speech chapter with no signal about where they are.

### P1-6 · Two dropdowns in one workspace, one in the others

Accents & Dialects has a workspace selector **and** a course selector (Standard British).
Correct — it's the only workspace with courses — but the two chips are visually identical
and read as peers. Differentiate them, or nest the course inside the workspace chip.

### P1-7 · Thin top-level cards

- **Acting Glossary — 6 terms.** Too thin for a top-level card.
- **Dialects in Speech — 1 topic.** Same.

Either grow them before release or fold them into the collection they belong to. A card
that says "1 topic" is an honest label on an unfinished thing — the honesty is right, the
top-level placement isn't.

### P1-8 · Count-label grammar

"10 chapters" · "9 chapters" · "4 introductions" · "6 terms" · "3 dialogues · Jowett
translation" · "7 shared Speech chapters" · "4 shared references" · "1 topic" · "21 chapters
in four parts" · and one card with prose instead of a count. Pick one pattern.

---

# P2 — Content review triage

**87 items are currently invisible to learners because they are `draft`:**

| Source | Drafts |
|---|---|
| `js/data/bridge.js` | **73** |
| `js/data/action.js` | 8 |
| `js/data/recasts.js` | 6 |

Plus two empty approval gates: `APPROVED_PHONEMES = []`, `ARTICULATION_VIDEOS = []`.

The bridge backlog grew from 8 comparisons to 73 today. **This is now the critical path to
release, and it is not an engineering task.**

**Proposed triage, before any more authoring:**

1. **Sort the 73 bridge comparisons into three piles** — ships at release, cut, or defer.
   Only the first pile needs review effort now.
2. **Set a per-workspace minimum.** Since all four workspaces stay, each needs a defensible
   floor: at least one complete route or collection with zero drafts visible, so no
   workspace is entirely gated content.
3. **Review in dialect batches, not by feature.** One reviewer per accent covering that
   accent's bridge routes + Dialect in Action piece + transposition is one sitting; the same
   work sliced by feature is four.
4. **Record the reviewer's name per item.** Per your own standard: batch approval without
   per-item review does not count. That mistake has already been made once and reversed.

---

# P3 — Code restructure, scoped as build orders

### B-R1 · Split `js/main.js` — **L**, do it before release, not after

**Problem.** 8,913 lines; **71% of all app JS** (8,913 of 12,472); 84 `render*` functions;
79 top-level constants. Every change to any screen touches one file, so the review surface
for a one-line fix is the entire app. `CLAUDE.md` still says "~2.5k lines" — off by 3.5×.

**Scope.** Mechanical extraction along the seam your own IA already defines:

```
js/main.js          shell, SECTIONS, WORKSPACES, routing, navStack, record(), esc(), boot
js/views/speech.js      Speech learn / library / practice
js/views/acting.js      Acting learn / library / practice
js/views/dialect.js     Accents & Dialects learn / library / practice
js/views/studio.js      Studio + project tabs
js/views/reference.js   IPA chart, sound pages, guidebook, vowel map
js/views/dissect.js     dissection textbook + worksheet views
js/views/admin.js       #audit and #review owner pages
```

**Non-goals.** No behavior change, no CSS change, no data change, no renames beyond moving
functions. Every extracted function keeps its name.

**Why now.** You have a 111-check suite that will catch a bad move, and the file grows ~4,000
lines a day at current pace. This is the cheapest it will ever be.

**Risk.** Circular imports between views and shell helpers. Mitigate by extracting shared
helpers (`esc`, `record`, `pageTopbar`, `focusHeading`) into `js/ui.js` first, in its own
commit.

**Rollback.** One revert; no data or storage involved.

### B-R2 · Disambiguate colliding module names — **S**

- Three files named `course.js`: `data/course.js`, `data/speech/course.js`,
  `data/acting/course.js` → `dialect-course.js`, `speech-course.js`, `acting-course.js`
- Two unrelated "action" modules: `data/action.js` (Dialect in Action) and `data/playable.js`
  (Playable Actions) → `dialect-in-action.js`, `playable-actions.js`
- Two dialect modules: `data/dialects.js` (Accuracy Standard) and `data/speech/dialects.js`
  (facet map) → the second is better named `dialect-facets.js`

In a stack trace or a grep, these are currently indistinguishable.

### B-R3 · Fix the shadowed constant — **S**

`main.js:284` `const SECTIONS` is the nav config. `main.js:6133` `const SECTIONS` is a local
array of dissection question headings. Same name, same file, 5,800 lines apart. Rename the
local one (`DISSECT_SECTIONS`). This will bite during B-R1.

### B-R4 · Delete vestigial abstractions — **S**

- `main.js:300` `const NO_LEARN_WORKSPACES = [];` — an empty config array
- `main.js:301` `const sectionsFor = () => SECTIONS;` — a function that ignores its purpose
- `main.js:304` `const defaultSectionFor = () => 'learn';` — same

Each is scaffolding for flexibility that was never needed. Either use them or remove them;
right now they imply per-workspace nav behavior that doesn't exist.

### B-R5 · Split `css/style.css` — **M**, optional before release

1,626 lines, single file. Lower priority than the JS split because CSS conflicts are visible
immediately rather than silently. Defer unless it's actively slowing you down.

### B-R6 · Stale code comment — **S**

`main.js:311` — `// ── Workspaces (2026-08-13 IA): Speech · IPA · Accents & Dialects ──`
lists **three**; `WORKSPACES` has **four**. The comment is already a day stale.

---

# P4 — Documentation

### B-D1 · One true document — **S**, highest leverage per hour

The 15 conflicts from the planning report are all still open, and two got worse today:

- `CLAUDE.md` says `main.js` is "~2.5k lines". It's 8,913.
- `docs/ROADMAP.md` (mine) asserts a nav that hasn't existed since July 30 and a workspace
  model that no longer applies at all.
- The **phoneme voice-key tables still say `f/m` and `alyx/peach`** while the real convention
  is a single `reference` voice. Someone could record 57 files against the wrong path. **Fix
  this one before any recording session.**

Also now untracked and unreconciled: `docs/CHATGPT_REVIEW_PROMPT.md`,
`docs/REVIEW_PENDING_CONTENT.md`, `docs/SPEECH_REVIEW.md`.

### B-D2 · Write the four missing specs — **S**

Accent Bridge, Dialect in Action, the Shakespeare editions, and now the Speech and Acting
workspaces have their only specification inside source-file header comments. Those headers
are genuinely spec-grade — lift them into `docs/` so a reviewer can find them and a
refactor can't delete them.

---

# Suggested order

```
1.  P0-1, P0-2, P0-3, P0-6 comment fixes   ── an afternoon, all visible
2.  B-R3, B-R4, B-R6                       ── same afternoon, clears the way
3.  B-D1                                   ── before anyone records anything
4.  P1-1, P1-2, P1-4                       ── the consistency pass; biggest perceived gain
5.  P1-3                                   ── needs your decision first (see below)
6.  B-R1                                   ── the main.js split, while tests still cover it
7.  P2 triage                              ── in parallel; it's human-bound, not code-bound
8.  P0-5 cross-browser                     ── last, on the real build
```

# Release gate, per workspace

Since all four stay, each needs the same floor before release:

- A Learn hero with real progress numbers
- A Library using the shared component, with a count on every card
- **At least one complete, zero-draft collection or route** so the workspace is not entirely
  gated content
- An explicit, honest statement of what's still in development — in the workspace, not
  buried in release notes
- No card whose count is "1"

# The two decisions only you can make

1. **Is the economy global or dialect-only?** (P1-3.) This changes whether Acting and Speech
   lessons award XP, and it's the one item on this list that alters product behavior rather
   than presentation.
2. **Do shared chapters render in place or navigate?** (P1-5.) This decides whether the
   Library component needs a "you are now in Speech" transition state.
