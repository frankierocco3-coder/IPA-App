# Speechcraft — project instructions

Loads automatically every session. Keep it accurate; it is the working memory
for this repository. Deeper detail lives in `docs/`.

## What this is

A **speech, acting and dialect trainer** — SEVEN workspaces, SIX of them
live: Acting & Scene Work, Building a Character, Shakespeare, Rhetoric,
Voice & Speech, Accents & Dialects. FIVE accent courses (Neutral American,
Traditional RP, Standard British, Cockney, Australian) plus the
accent-neutral IPA Foundations, and a rehearsal workspace for real text.

TWO NAMES THAT LOOK LIKE EACH OTHER AND ARE NOT: the WORKSPACE with id
'ipa' is labelled **Voice & Speech** (renamed by owner order 2026-09-03;
the id never moved). **IPA Foundations** is the COURSE with id 'core'.
Writing one for the other is the mistake this paragraph made on 2026-10-20.

The seventh, Speech, is fully built and WITHDRAWN behind SPEECH_LIVE=false
in js/views/context.js (owner order 2026-08-19: content too thin to stand
alone; full build deferred). Its Speechcraft Textbook (25 chapters) shelves
in the Acting Library as a Shared card meanwhile; a stored workspace of
'speech' falls back to 'acting'. Flip the flag and Speech returns whole.

Rhetoric & Oratory does NOT shelve anywhere, despite what older notes say.
Its only live-code card sits in the ACCENT library behind `RHETORIC_LIVE`,
which is false, so it is reachable nowhere in the running app.

COUNT THE LIVE WORKSPACES FROM liveWorkspaces(), NOT FROM THIS PARAGRAPH.
It read "three live workspaces" from 2026-09-27 to 2026-10-20, through the
launches of Character, Shakespeare and Rhetoric, so a session could reason
about this app without knowing three of its courses existed.

Live: <https://frankierocco3-coder.github.io/IPA-App/>
Repo: `frankierocco3-coder/IPA-App` (public). Owner: Frankie.
Audience: working actors and, eventually, acting schools.

## Hard constraints — do not break these

1. **Zero build step.** Vanilla ES modules loaded straight by the browser.
   No framework, no bundler, no transpiler, no `package.json`, no
   `node_modules`. This machine has no Node — that is *why*. Do not introduce
   one without being asked explicitly.
2. **No backend, no accounts, no auth.** Everything is client-side and
   per-device. `serve.py` is a local dev server only, never deployed.
3. **No external runtime requests, with ONE named exception.** No CDN,
   fonts, analytics, telemetry, or third-party scripts — ever. CI fails if
   an external origin appears in shipped code.
   **AMENDED 2026-10-04 by Frankie's explicit decision**, the first time
   this rule has moved: `js/narration.js` may fetch sonnet readings from
   the audio site. A store bundle ships without the 212.9MB of narration
   and has no same-origin copy, so this is the only way it can ever be
   offered. The exception is deliberately tiny and the gates hold it there:
   * ONE origin, and `security_audit.py` allows it in **`js/narration.js`
     alone** — naming it in any other shipped file fails the deploy;
   * it buys **`connect-src` only**. Readings are stored and played from
     `blob:` URLs, so `media-src` stays `'self' blob:` and no remote URL is
     ever handed to an `<audio>` element;
   * **same-origin is always tried first** (one HEAD probe per download);
     on the web nothing external happens at all;
   * it is for narration the learner asked to keep. Nothing is collected,
     nothing is sent, and there is still no telemetry of any kind.
4. **No credential ever reaches the browser.** The ElevenLabs key is used only
   by offline scripts in `tools/`. The deployed app has no API code path and
   runs fine with no key present. See `docs/CREDENTIAL_POLICY.md`.
5. **Never delete or migrate user data** without a versioned migration and a
   backup path. Progress is per-device and irreplaceable.
6. **Preserve the visual identity.** Warm editorial theme, serif headings,
   the existing CSS vocabulary. Match it; do not introduce a new design system.

## Commands

```bash
python3 serve.py                                   # dev server → localhost:4173
bash tools/install-hooks.sh                        # pre-commit secret scan (once)

# WHAT IS ACTUALLY TRUE RIGHT NOW — run this before writing any count,
# flag state or "X is live" claim into a file or a message.
python3 tools/project_facts.py                     # workspaces, flags, counts, review
python3 tools/project_facts.py --write             # refresh CLAUDE.md's facts block
python3 tools/project_facts.py --check             # fail if that block is stale

# the five deploy gates
python3 tools/launch_lint.py                       # banned copy, pins, facts-block freshness
python3 tools/security_audit.py                    # static checks
python3 tools/audit_audio.py                       # audio index/files/flags integrity
python3 tools/dialect_lint.py                      # inventories, transcription systems, notation
python3 tools/scan_secrets.py --worktree --history # credential scan
python3 tools/build_artifact.py _site              # exactly what Pages publishes

# audio generation (offline, spends money — ALWAYS --dry-run first)
python3 tools/generate_sonnets.py --source ibsen --dialect rp --all --dry-run
python3 tools/generate_voices.py --idioms --dry-run  # idiom clips, ~21k credits pending

# owner phoneme recordings (offline, free) — prep then import
python3 tools/prep_phonemes.py takes/ --out prepped/ --dry-run   # trim, level, → mp3
#   ONE take per file (owner rule 2026-09-21): a file with a second sound is refused
python3 tools/import_phonemes.py prepped/ --dialect nam --voice reference --dry-run
```

**ffmpeg** is NOT a system install here: there is no Homebrew on this Mac,
and installing it needs a password Claude cannot type. It comes from pip
instead — `python3 -m pip install --user imageio-ffmpeg` — and
`tools/prep_phonemes.py` finds it on PATH first, then falls back to that
package. macOS `afconvert` can DECODE mp3 but cannot encode it, which is
why the pip binary is needed at all.

In the browser console, with the app running:
```js
import('./tests/security.test.js').then(m => m.run());
import('./tests/audio.test.js').then(m => m.run());
import('./tests/regression.test.js').then(m => m.run());   // ~780 checks
```
Or open `tests/run-all.html` on the dev server — it hosts the app in a
same-origin iframe (allowed by the clickjacking guard) and prints one
PASSED/FAILED verdict for all three suites. tests/ never ships (artifact
excludes it).

**RUN IT IN A REAL BROWSER, NOT IN AN AGENT'S EMBEDDED ONE** (owner-verified
2026-10-14). The same clean tree gave **824 checks / 0 failures in Chrome**
and 730–763 checks with 41–78 failures in the embedded browser Claude drives,
across five attempts. The embedded failures are always the same shape: the
`precondition: the app under test is in the Accents workspace` check reports
`freeplay=false`, the nav checks come back empty, and sections 1–18 cascade.

**THE CHECK COUNT IS THE TELL, NOT THE FAILURE COUNT.** A full run is 824. A
run reporting 730 or 763 skipped sections and is not comparable even if its
failure count looks small — a green run with a short count is not a green run.

Underneath it is an intermittent boot failure that is worth fixing on its own:
on some page loads every module fetches 200, `main.js` imports without
throwing, the DB opens in 0ms, the window is top-level so the clickjacking
guard is not involved — and `#app` stays empty with `readyState: complete`.
Re-importing `main.js` in that same page renders the shell instantly. If that
ever happens outside an embedded browser a user sees a blank screen with no
error and no recovery but a reload.

Six causes were proposed and refuted on 2026-10-14 — do not re-chase them:
the Shakespeare preview flag, a wiped profile, a second tab blocking the IDB
upgrade, a stale `speechcraft-workspace`, the dev server, and a stale `navDoc`
after the precondition's frame reload (a detached document still returns its
content, so it cannot produce the empty results seen).

## Layout

```
index.html          CSP lives here (meta tag, must stay first in <head>)
js/main.js          the shell, routing, boot, and the views not yet
                    extracted (12.4k lines — project_facts.py prints the
                    real number; it grew 38% while this said 9.0k). Views
                    are render*() fns.
                    The B-R1 split is UNDER WAY — see below.
js/ui.js            shared UI vocabulary: app, navStack, record, goBack,
                    navTo, goHome, esc, openModal, phonemeSlug, topbars,
                    tiles, runStepSequence. Imports NO view module, which
                    is what keeps the graph free of cycles.
js/views/           modules extracted from main.js (the 2026-09 split):
  context.js          course + workspace context, and the maps keyed off
                      them (shared by every view; not a screen)
  reference.js        the IPA chart, the sound pages, What Is IPA?, and
                      the shared bits they own (wordChip, speakableWord,
                      wireTryIt, the wii* question helpers)
  ipa-tools.js        fillSound (≈IPA derivation), openWordEditor,
                      stripStage
  dialect-action.js   the Dialect in Action shelf, pending notice and page
  action-piece.js     one Dialect in Action piece, for learner or reviewer
  admin.js            the owner-only #audit and #review pages
  lexicon-mark.js     marking Shakespeare lexicon terms in running text
  script-analysis.js  the per-scene Script Analysis tab, shared with
                      admin.js
js/engine.js        16 exercise generators
js/state.js         localStorage progress (completed lessons)
js/db.js            IndexedDB wrapper + schema/migrations
js/projects.js      rehearsal project CRUD + legacy migration
js/recordings.js    takes, blobs, object-URL lifecycle
js/perform.js       MediaRecorder lifecycle
js/analytics.js     observes results → weak sounds, daily rehearsal
js/overrides.js     pronunciation override chain + personal dictionary
js/validate.js      import validation/sanitisation (untrusted input)
js/audio.js         clip playback + speech-synthesis fallback
js/scan.js          syllabification / scansion
js/diagram.js       generated articulation diagrams (inline SVG) — now a
                    fallback only; all 62 sounds have real artwork
img/articulation/   65 hand-drawn diagrams + 3 overview charts (baseline
                    JPEG q90; registry js/data/articulation-art.js maps
                    symbol -> file, sourced from the pack manifest)
js/pron.js          lazy-loads the 2.8MB pronunciation dictionary
js/data/            course, phonemes, 6 text libraries, pron.json
../IPA-Audio/       the audio — its OWN repository since 2026-09-21 (~9.2k
                    MP3s, ~305MB), checked out BESIDE this one; see below
tools/              offline scripts — NEVER deployed
docs/               product, architecture, security, deployment, threat model
tests/              security.test.js (browser-run)
```

## Conventions

* **Routing is function-based**, not URL-based. `render*()` replaces `#app`
  contents. `navStack` (thunks) powers the back button. Call `record(fn)` at the
  top of a view so back works. Home is the stack root and remembers its active
  tab/sub-tab in localStorage (`speechcraft-home-tab`, `speechcraft-hub-sub`),
  so goBack() from a deep page lands on the tab you left.
* **Rendering is template strings → `innerHTML`.** Every user-controlled value
  MUST pass through `esc()`. Treat project titles, notes, IPA, filenames,
  dictionary entries, imported fields, localStorage and IndexedDB as untrusted.
* **New views go in `main.js`** and reuse existing CSS classes (`.track-card`,
  `.son-tab`, `.pane-note`, `.btn`, `.tag`, `.stat-row`, `.input-text`).
* **localStorage for small synchronous state; IndexedDB for anything large or
  binary.** Never put a blob in localStorage.
* **Analytics only observes.** It must never change scoring or progress.
  Hook point is `showFeedback()` in `main.js`, wrapped in try/catch.
* Use real `<button>` elements, labelled controls, visible focus, and
  `aria-live` for recording state.

## Gotchas that have bitten before

* **Lesson screens have no `#brand-home`** — they use the `#quit` ✕ button.
  Test navigation accordingly.
* **A 404 on an `Audio` element fires BOTH `error` and a `play()` rejection.**
  Guard fallbacks with a `handled` flag or they run twice.
* **`speechSynthesis` needs a user-gesture unlock** and stalls without a
  `resume()` nudge. Do not `cancel()` an idle engine — it jams Chrome.
* **MediaRecorder format differs by browser** (Chrome webm/opus, Safari mp4).
  Detect with `isTypeSupported()`; never hardcode.
* **Always release mic tracks** on stop/cancel/error/unload, or the browser
  recording indicator stays lit.
* **`scanLine()` is heuristic.** ~78% of regular verse lines hit exactly 10
  syllables. Prose must use `verse: false` so it doesn't claim pentameter.
* **Stage directions `[like this]`** are displayed but must be stripped before
  speaking and excluded from IPA (`stripStage()`).
* Python here is **3.9** — no `X | None` type syntax, no `match`.
* Long chained browser tests exceed the 30s tool limit; split them.

## Current state

**The numbers in this section are GENERATED. Do not hand-edit them, and do
not trust a count you remember.**

```bash
python3 tools/project_facts.py          # workspaces, flags, counts, review
```

This section used to be 1,383 lines of dated entries, each describing the
app as of its own date and none ever reconciled. On 2026-10-20 an audit
checked 848 claims in it and found 127 wrong — 56 of them badly enough to
send a session down a wrong path. The entries moved to `docs/HISTORY.md`
unchanged, because the REASONING in them is worth keeping; the numbers
moved here, where a script computes them.

If you are about to write a count or a flag state into this file, run the
script instead and paste its block.

<!-- facts:begin -->
<!-- generated by tools/project_facts.py — do not hand-edit -->

### Workspaces

- Acting (acting)            **LIVE**
- Building a Character (character) **LIVE**
- Shakespeare (shakespeare)  **LIVE**
- Rhetoric (rhetoric)        **LIVE**
- Voice & Speech (ipa)       **LIVE**
- Accents & Dialects (accents) **LIVE**
- Speech (speech)            withdrawn

6 of 7 live.

### Accent courses

- Neutral American (nam)     live
- Traditional RP (rp)        live
- Standard British (ssbe)    live
- Cockney (cockney)          live
- Australian (aus)           live
- IPA Foundations (core)     live

### Lessons, and whether they publish

- Acting & Scene Work           42 records  <- 1 UNPUBLISHED: ac-physicalscore
- Building a Character          47 records  (4 more in the withdrawn role module, behind ROLE_LIVE)
- Shakespeare                   37 records
- Rhetoric                      36 records
- Speech                        25 records  <- 13 UNPUBLISHED: sp-start-parts, sp-start-fluency, sp-start-alphabet, sp-start-offbook, sp-m-pace, sp-m-emphasis  WORKSPACE WITHDRAWN

An unpublished lesson in a live course renders as a draft gate to
every learner. Ship its js/data/speech/reviews.js entry in the same commit.

### Every X_LIVE switch

- BRIDGE_LIVE              false  js/data/bridge.js:1687
- CHARACTER_LIVE           true   js/views/context.js:167
- COCKNEY_LIVE             true   js/views/context.js:53
- COINAGE_LIVE             false  js/main.js:305
- DIALECT_ACTION_LIVE      false  js/data/dialect-in-action.js:276
- RHETORIC_COURSE_LIVE     true   js/views/context.js:207
- RHETORIC_LIVE            false  js/main.js:278
- RHETORIC_WORKSHEET_LIVE  false  js/views/context.js:219
- ROLE_LIVE                false  js/data/character/character-course.js:65
- SCENE_STUDY_LIVE         false  js/main.js:9450
- SHAKESPEARE_LIVE         true   js/views/context.js:193
- SPEECH_LIVE              false  js/views/context.js:159

### Reference shelves

- Shakespeare lexicon        277
- Idioms                     645
- Stratagems                 38
- Scenes                     27
- Commedia masks             13
- Commedia figures           34

### Size

- js/main.js                12562 lines
- js/views/                 8 modules: action-piece.js, admin.js, context.js, dialect-action.js, ipa-tools.js, lexicon-mark.js, reference.js, script-analysis.js
- regression check() sites  839

### Review

- 181 ledger entries, 0 with specialist sign-off.
  Every published lesson rests on the owner editorial verdict alone.
  The awaiting-review badges say so; do not describe them as reviewed.
<!-- facts:end -->

### What is switched off, and why that matters

Seven features are built, shipped and WITHDRAWN behind a flag. They are not
unfinished and not broken — a flag is this project's reversible withdrawal,
used instead of deleting, every time. **Do not describe any of them as
working, and do not "fix" one by flipping its flag.**

| Flag | Withdraws |
|---|---|
| `SPEECH_LIVE` | the whole Voice & Speech workspace (content too thin, 2026-08-19) |
| `BRIDGE_LIVE` | Accent Bridge — nothing is playable on any course |
| `DIALECT_ACTION_LIVE` | the Dialect in Action card, everywhere it appeared |
| `ROLE_LIVE` | Building a Character's `role` module (4 lessons) |
| `SCENE_STUDY_LIVE` | scene study |
| `COINAGE_LIVE` | the Words First Recorded in Shakespeare shelf |
| `RHETORIC_LIVE` | the old Rhetoric & Oratory card in the ACCENT library |
| `RHETORIC_WORKSHEET_LIVE` | the Rhetoric worksheet |

`RHETORIC_LIVE` and `RHETORIC_COURSE_LIVE` are DIFFERENT FLAGS with
opposite values. The first is the retired shelf (false); the second is the
Rhetoric workspace (true, live since 2026-09-28). Confusing them is the
single easiest mistake to make in this file.

### Publication is not review

Every published lesson carries the OWNER'S EDITORIAL verdict and nothing
stronger. Not one record in any course has specialist sign-off, the
awaiting-review badges say so on the page, and `awaitingSpecialist()` is
true throughout. Never describe this content as reviewed, and never write
an approval naming a reviewer who has not read it.

**A lesson in a live course with no ledger entry renders as a draft gate to
every learner** — "Prepared draft, awaiting review". Ship the
`js/data/speech/reviews.js` entry in the SAME commit as the lesson. This is
invisible in development if an owner preview key is set in localStorage,
which is exactly how four commedia chapters shipped gated on 2026-10-19.

### Rules that are load-bearing

* **The economy is gone.** Hearts, streaks, freezes, gems, the Shop and XP
  were all removed (owner decisions, 2026-10-05). What remains is completed
  lessons and two daily targets that award nothing. SEVEN stored values
  survive and are DELIBERATELY NEVER READ — `heartsV2`, `streak`,
  `lastPlayed`, `freezes`, `gems`, `boostUntil`, `xp`. Nothing was migrated
  and nothing was deleted, which is what made the removals reversible. If
  you find XP in a doc, the doc is stale.
* **Audio is universally strict.** `speak()` plays a real clip or stays
  silent. There is no device-TTS fallback for words; device voice happens
  only behind an explicit `device: true` for labelled readings. An
  unplayable word renders as PLAIN TEXT, never a faded control and never a
  promise — nothing in this app says "coming soon".
* **The audio is a SIBLING REPO** (`frankierocco3-coder/IPA-Audio`, checked
  out beside this one). Every clip, index and narration path goes through
  `audioUrl()` / `AUDIO_BASE` in `js/audio.js`. Never write `audio/...`.
* **Ids are never renamed.** Lesson ids, IndexedDB stores, question ids and
  localStorage keys are storage. Renaming one silently moves a learner's
  progress. Retired ids stay retired and are never reused.
* **Figures** are `{ fig: '<key>' }` body blocks resolved against a per-course
  art registry. A slot with no entry renders NOTHING, never a broken image.
  Alt text describes the picture; captions are learner copy and carry the
  interpretation disclaimer.
* **Page turns animate, in-place changes do not.** `navTo()` wraps a render
  in the View Transitions API at the structural joints only — Back, section
  changes, tile opens, prev/next. A flip, a mode switch or a filter stays
  instant.
* **The `js/views/` split (B-R1) is under way.** A view may import `ui.js`,
  `views/context.js` and its siblings, never `main.js`; where it needs the
  shell it goes through a callback `ui.js` owns. Nothing is rewritten in a
  move. `launch_lint.py` and the suite read `main.js` PLUS every
  `js/views/*.js` as one text, so a new view module joins the checks by
  existing.
* **Verify JavaScript in a browser.** There is no Node on this machine, so
  the browser's parser is the only ground truth for a syntax question.

### Where the detail went

`docs/HISTORY.md` holds the dated build entries verbatim — what was built,
in what order, and why. Read it for reasoning. Do not take a count, a flag
state or a "not pushed" note from it.

Other references: `docs/ROADMAP.md` (what is unbuilt, ranked),
`docs/COMMEDIA_IMAGE_SPEC.md`, `docs/SPEECH_REVIEW.md`,
`docs/SHAKESPEARE_COURSE_OUTLINE.md`, `TESTING.md`.

**Incomplete — do not present as finished:**
* Australian sonnet audio ~39% (quota ran out). Other libraries have **no**
  narrated audio yet (~169k ElevenLabs credits needed); they use device voice.
* RP/Australian IPA is rule-derived from General American, marked "≈".
  Only General American is dictionary-exact.
* **Generated voices have never been ear-checked wholesale** against the
  taught IPA. What HAS been approved by ear is specific and small: 42
  isolated General American phonemes (`APPROVED_PHONEMES` in
  js/data/audio-flags.js, voice key `reference`, Frankie's own recordings)
  plus the ssbe review batch, with 7 clips quarantined as KNOWN_BAD.
  Everything outside that list is unverified. Claude cannot hear audio, so
  any new voice needs Frankie before it is trusted.
* Only tested in Chromium. Firefox and Safari untested (Safari especially for
  MediaRecorder).
* **Nothing in the app ever asks the learner to speak.**
  `CAPABILITIES.learnerSpeaking` is `false` and build-controlled: a learner
  can finish every lesson in every course by tapping, typing and listening.
  Recording exists in Studio only, off the main loop. This is the biggest
  product gap and the top item on `docs/ROADMAP.md`.
* **No content in any course has specialist review.** 181 ledger entries,
  all owner-editorial, none naming a qualified acting teacher, coach, verse
  specialist, voice professional or rhetoric reader. The badges say so on
  the page. Do not describe this material as reviewed.
* Several written systems are complete and WITHDRAWN behind flags rather
  than unbuilt — see the flag table above before reporting one as missing.

**Accepted security limitations:** clickjacking only partly mitigated (Pages
cannot send `frame-ancestors`); browser storage is unencrypted; repo nearing
the ~1GB Pages soft limit.

## Money and risk

* **ElevenLabs generation costs real money.** Always `--dry-run` first, report
  the character/credit cost, and get explicit approval before a large batch.
  `--max-calls` and `--confirm-threshold` guards exist — do not bypass them.
* **Never print, test, transmit or validate the API key.**
* Confirm before anything destructive or outward-facing: deleting data,
  force-pushing, spending credits, publishing.

## Before you commit

```bash
python3 tools/security_audit.py && python3 tools/scan_secrets.py --worktree
```
Plus the regression block in `TESTING.md`. The pre-commit hook blocks staged
credentials; do not `--no-verify` around it without saying why.

If the commit changes shipped code, stamp the build AFTERWARDS, as its own
commit. `stamp_build.py` names the commit it was cut FROM, so it cannot be
folded into the one it describes, and running it before you commit leaves
the stamp pointing at the previous build:

```bash
python3 tools/stamp_build.py && git commit -am "chore: stamp the build"
```

Deploy is automatic on push to `main` (audit job gates it). Work on a branch
for anything substantial.
