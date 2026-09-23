# Speechcraft — project instructions

Loads automatically every session. Keep it accurate; it is the working memory
for this repository. Deeper detail lives in `docs/`.

## What this is

A **speech, acting and dialect trainer** — three live workspaces (Acting,
IPA, Accents & Dialects), four accent courses, and a rehearsal workspace for
real text. A fourth workspace, Speech, is fully built but WITHDRAWN behind
SPEECH_LIVE=false in js/main.js (owner order 2026-08-19: content too thin to
stand alone; full build deferred). Its Speechcraft Textbook (21 chapters) and
Rhetoric & Oratory shelve in the Acting Library as Shared cards meanwhile; a
stored workspace of 'speech' falls back to 'acting'. Flip the flag and Speech
returns whole.

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
3. **No external runtime requests.** No CDN, fonts, analytics, telemetry, or
   third-party scripts. The app makes exactly two same-origin `fetch` calls.
   CI fails if an external origin appears in shipped code.
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

python3 tools/security_audit.py                    # static checks
python3 tools/audit_audio.py                       # audio index/files/flags integrity
python3 tools/dialect_lint.py                      # inventories, transcription systems, notation
python3 tools/scan_secrets.py --worktree --history # credential scan
python3 tools/build_artifact.py _site              # exactly what Pages publishes

# audio generation (offline, spends money — ALWAYS --dry-run first)
python3 tools/generate_sonnets.py --source ibsen --dialect rp --all --dry-run
python3 tools/generate_voices.py --idioms --dry-run  # idiom clips, ~15k credits pending

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
import('./tests/security.test.js').then(m => m.run());     // expect 20/20
import('./tests/audio.test.js').then(m => m.run());        // expect 20/20
import('./tests/regression.test.js').then(m => m.run());   // ~490 checks
```
Or open `tests/run-all.html` on the dev server — it hosts the app in a
same-origin iframe (allowed by the clickjacking guard) and prints one
PASSED/FAILED verdict for all three suites. tests/ never ships (artifact
excludes it).

## Layout

```
index.html          CSP lives here (meta tag, must stay first in <head>)
js/main.js          the shell, routing, boot, and the views not yet
                    extracted (~9.0k lines). Views are render*() fns.
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
js/engine.js        16 exercise generators
js/state.js         localStorage progress (XP, streak, lessons)
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
* **Analytics only observes.** It must never change scoring, hearts or XP.
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

**Working:** Duolingo-style shell (Speechcraft skin): left sidebar
**Learn / Practice / Studio / Library / Progress / More** (same six on
the mobile bottom nav, both rendered from the ONE `SECTIONS` array; Shop
and Profile live under More but are still shell sections;
LEGACY_SECTIONS maps old saved 'textbook'/'quests' states). You are always
"in" one course — 🇺🇸/🇬🇧/🇦🇺/ʃə Foundations — switched via the course chip.
First run: the "BEFORE YOU SPEAK" THRESHOLD (Build 01, branch
threshold-before-you-speak) — 8 screens: verbatim panels 1–6 from
docs/THRESHOLD_COPY.md (launch_lint pins spot lines; NEVER paraphrase) →
the kept course picker with 🔊 samples → the choice (Learn the Craft →
Learn, Use the Tools → Studio; equal weight; lands where it says). NO
XP, no LEARN track (Frankie's locked decisions). Replaces the old
4-step onboarding: welcome+goal steps DELETED (GOALS gone; Preferences
lost its goal picker — stored goal values remain, read nowhere), course
picker kept verbatim, diagnostic moved to a Learn offer card that
retires on onboarding.diagnostic ('taken'/'declined') + a PERMANENT
Practice row (hub-diagnostic). store.threshold = {version, completedAt,
choice, source: first-run|grandfathered, lastReplayedAt, lastChoice};
completeThreshold NEVER overwrites; replay (About Speechcraft,
Preferences rerun, invite card) navigates without rewriting choice.
Grandfathering: priorUseSignals() (onboarding.done primary — do not
rename — plus xp/streak/intros/dictionary/customText/nav keys) + a
150ms-bounded IndexedDB probe; grandfathered users get the one-time
dismissible invite card in Learn (store.thresholdInviteSeen), NEVER the
wall. skipCourseIntroOnce suppresses the ssbe intro modal for exactly
the landing render (cleared in renderShell). Esc: back-a-panel on the
wall, exit on replay. Dots only, no counter. Users with prior progress
are auto-grandfathered; revisit via More → Preferences ("Run setup
again", course preselected on replay). Until the first
lesson pays out (store.hasEarnedAnything) the stats bar shows only the
course chip and the rail hides quests.
Learn = "Continue learning" card (next lesson, type, ~min, primary action)
above the winding path; desktop nodes carry side labels (title · type ·
~min · XP); tapping a locked node opens a popover naming the prerequisite.
Practice = Quick Practice (weak-sound rehearsal when analytics has data,
honest mixed review otherwise) + Today's Rehearsal + mixed review + games
grouped Listening / Reading IPA / Transcription / Accent & Vocabulary, with
~min and 🎧-audio badges. Practice never costs hearts.
Library = IPA (course inventory), Native Idioms (dialects only, dialect's
flag, listen buttons per card; 224 entries, flagged hidden by default and
NEVER drilled), Texts & Speeches, Your Instrument, The Vowel Map, Personal
Dictionary. Idiom filters reset to All on every visit.
Progress = stats, daily quests (claiming), top weak sounds + full report,
achievements. Profile is just name/avatar now.
Lesson guides are STEPPED (guideSteps/renderGuide: overview → one sound per
step → words → ready; Back/Continue, step count, focus lands on each step's
h1). Each sound step ends in a one-tap symbol check (wiiQuestion helpers,
answers persist across Back/Continue); the words step is grouped by target
sound with show-more disclosures. Results screen shows accuracy, covered
symbols, missed symbols (s.missedSyms), and a Next-lesson button.
"What Is IPA?" (openWhatIsIpa, 7 steps + completion, 5 scored questions) is
the beginner intro module — reachable from Library → IPA pages, the
Foundations Learn view, and core lesson guides; NEVER a required step and
deliberately pays no XP/gems (store.whatIsIpa badge only) so first-lesson
Progress activation stays true. Progress shows a purposeful starter state
until store.hasEarnedAnything. Locked path nodes open a focus-managed
dialog popover (what it teaches, why locked); mobile shows compact title
pills under upcoming nodes. Practice's top is ONE Quick Practice card
(mixed or weak-sound rehearsal) with a renamed full-course mixed link only
when they differ.
Spoken audio ALWAYS follows the dialect context (Frankie's rule — inside a
course, only that dialect's voices are heard); the symbol-based lang guess
survives only for the Foundations full chart. speak() takes an `accent`
option because rp and ssbe share en-GB — lang alone cannot pick the clip
folder. Idiom clips EXIST for rp/nam/aus (856 generated 2026-07-30) — the
listen buttons play real native voices there.
COURSE #5: Standard British (internal id 'ssbe' — that name NEVER appears
learner-facing, nor do Contemporary British / SSBE / Standard Southern /
"educated southern"; RP's label is now Traditional RP). First-class course
separate from Traditional RP: 4-stage track (ssbe-0 'Hear Standard
British' is a real lesson; the course INTRO is a one-time overlay on first
Learn visit — store.introsSeen — revisitable via Library → About Standard
British). Copy labels features honestly: Core target / Common contemporary
/ Relaxed-speech option / Variable. Inventory adds /ɛː/ /ʔ/ /i/; rp-tagged
words power RP↔SSBE shifts. NO voice selector: playback picks Alyx/Peach
randomly PER ACTIVATION (stale speechcraft-voice-prefs key is ignored).
Idiom exercises are DETERMINISTIC course content: 'idiom' in ssbe-3,
'idiomSituation' in ssbe-6, 'idiomRegister' in ssbe-s2 + all ssbe
checkpoints, 'idiomDialogue'+'idiomLiteral' in the final — authored banks
(30 dialogues, 14 situations, 10 literal pairs) live in js/data/idiom.js;
register derives from flags (flagged terms appear ONLY there, recognition
not celebration). ssbe idiom page defaults era=Contemporary. Audio state:
Frankie EAR-APPROVED the review batch + pilot (2026-07-30); bulk ssbe
words + all 181 idioms generated in both voices. ssbe is a STRICT course
(STRICT_ACCENTS in audio.js): no device-TTS fallback ever — missing clip
= silent + console.warn, and tools/audit_audio.py FAILS THE DEPLOY if any
speakable ssbe text lacks clips in both Alyx and Peach. Explicit
device:true readings (sonnets/custom text) stay allowed everywhere.
tools/audit_audio.py also enforces course-bound voice keys.
Deep-page topbar titles stay short — long ones wrap beside the brand. The
standalone Accent Shift Drills track stays removed (Frankie's call); Stage
3 shift lessons and the two shift games remain.
Economy: gems (lessons +10/+15, quest claims), persistent 5 hearts (regen
1/4h, mixed review earns one, gems refill), streak freezes (max 2), 15-min
double-XP boost — all in js/state.js; daily quests in js/quests.js hook
onLessonFinished() in renderResults. No leaderboards (no accounts — decided,
not forgotten).
A11y: global :focus-visible ring, reduced-motion support, aria-labels on
icon-only controls (guidebook/speaker/freeplay), aria-live lesson feedback,
#shell-main is a <main>, 48px bottom-nav targets.
Plus: 5 tracks / 77 lessons, 16+1 exercise generators, 332 curated pieces,
Perform mode, rehearsal projects, analytics, pronunciation overrides.

Audio model: WORDS (speak(), audio/<d>/<v>/, TTS fallback) and ISOLATED
PHONEMES (playPhoneme(), audio/phonemes/, NO fallback of any kind) are
separate and never cross-substituted; speak() refuses bare-IPA text.
js/data/audio-flags.js is the quality gate: KNOWN_BAD clips are skipped by
playback (nam/f/strut and nam/f/car quarantined by Frankie's ear,
2026-07); phoneme clips play ONLY when in APPROVED_PHONEMES. Since
2026-09-22 that holds Frankie's OWN recordings (voice key `reference`):
ALL 42 General American sounds (16-sound pilot + batch 2 of 26, both
scripted in docs/PHONEME_RECORDING_SCRIPT_NAM.md), every one
ear-approved. OWNER DECISION 2026-09-22: General American is the ONLY
course with isolated phonemes for now — do not queue or suggest
recordings for the other courses; their sound pages keep word audio. Pipeline: takes → tools/prep_phonemes.py
(noise-floor-relative trim; sub-0.25s clicks dropped and reported; two
real sounds refused) → import_phonemes.py into IPA-Audio → #audit →
APPROVED_PHONEMES. Unrecorded sounds keep explicit,
labelled word controls ("Hear it in 'strut'"), never dead buttons. The
owner ear-checks clips at #audit (hash-gated grid, exports a fresh flags
file); tools/audit_audio.py enforces index↔files↔flags integrity in the
deploy gate; tests/audio.test.js (browser) covers the contract.

LAUNCH PASS (2026-07-30): Words & Expressions is the only learner-facing
name for the idiom section. Icons: Traditional RP 🎩, Standard British 🇬🇧.
Audio is UNIVERSALLY STRICT now (all courses): speak() plays a real clip
or stays silent (returns 'clip'|'tts'|'silent'); resolveAudio() is the
central resolver; device TTS ONLY behind explicit device:true (labelled
readings). Generators filter to playable words; unavailable words render
.is-off chips (nam strut/car are the two gaps — quarantined both voices).
Sound-detail hero: "Hear the sound" only with an approved phoneme clip,
else a non-interactive "Isolated sound coming soon" (+optional syllable
demo via slug_syllable approvals). Long-form audio claims come ONLY from
generated js/data/audio-coverage.js (tools/longform_coverage.py — rerun
after any narration batch): sonnets nam 151/154, rp 153/154, aus 59,
ssbe 0; libraries 0. Reader shows recorded-audio badges + labelled device
reading. Featured Texts = Recast pilot sonnets with verified nam+rp.
Sonnets Recast (BETA, js/data/recasts.js): 18/29/73/116/130 × Original /
Plain Meaning / nam+ssbe+aus creative adaptations (NEVER called
translations or accent performances; review gate docs/RECAST_REVIEW.md).
More: About / Feedback (GitHub Issues link — allow-listed navigation-only
exception in security_audit) / Privacy / Sources & Credits.
tools/launch_lint.py (in deploy gate): banned names, icons, W&E naming,
checkpoint determinism, coverage-driven reader, no-TTS regression.

SPRINT (2026-07-30 late): example words swapped by owner's ear — strut→
but, car→bar, war→saw (cup stays; lexical-set NAMES unchanged); new words
recorded everywhere. 350 isolated-phoneme CANDIDATES generated
(tools/generate_phonemes.py; audio/phonemes-index.json; syllable demos
for stops/affricates/ʔ) — ALL awaiting Frankie's ear at #audit; approvals
flip sound-page heroes from "coming soon" to "Hear the sound". Try-it
recorder (tryItHtml/wireTryIt, ephemeral) on sound pages + W&E cards.
Save schema v2 stamp; steps label; scroll reset per section; safe-area
bottom nav; Privacy wipe covers all speechcraft-* keys. Release report:
docs/launch-readiness-report.md (conditionally ready for beta).

DIALECT ACCURACY PASS (2026-08-04): js/data/dialects.js is the shared
Dialect Accuracy Standard — per-course target/period/context, feature
tiers (core/common/variable), connected speech, convention, plain-text
sources. It drives ALL FOUR About cards (renderAboutCourse; ssbe's
bespoke card replaced) and the inventory pages' "Common realizations &
connected speech" section. Notation contract: /…/ phonemic, […]
realizations; /ʔ/ is NO LONGER counted as a phoneme — PHONEMES['ʔ'] has
`allophone: 't'`, ssbe WORDS entries drilling it are `narrow: true` and
display in [brackets] (engine wrapIpa keeps brackets consistent across a
choice set so they never leak the answer). Weak vowels (ə, i, ɚ:
`weak: true`) group separately; inventory counts exclude allophones.
AUSTRALIAN uses HCE/revised symbols now: /ɔ oː eː ɑe oɪ/ replace
ɒ/ɔː/eə/ɑɪ/ɔɪ course-wide (WORDS, course.js, ACCENT_FOREIGN/ERRORS,
diagram.js, pron.js toAus, phonemeSlug-safe); old symbols remain for
rp/core. CURE /ʊə/ kept in aus as rare/receding (Library + guidebook now
agree). New nam words (better/water/city/ladder/tune/duty/man) teach
tapping/yod-dropping/raising — clips already existed. RP: honest
history (no butlers, no Shakespeare-spoke-RP), rp-3 is "Transcribe
Traditional RP". NAM intro: regionally-unmarked target, cot–caught as
labelled variation, /iː uː ɔː/ documented as broad convention. R stays
/r/ in broad transcription with [ɹ] taught (Frankie's call, matches
dictionaries); sources are plain-text citations, NO new external links
(allow-list still just GitHub Issues). tools/dialect_lint.py (in deploy
gate) fails on: unknown lesson symbols, wrong-system symbols in
lessons/WORDS, allophones in broad entries, missing DIALECT_INFO,
duplicate track ids. launch_lint bans the retired copy ("every butler",
"Transcribe like the BBC", "hold their places", "gets measured against").

SPEECHCRAFT STUDIO Phase 1 (2026-08-05): top-level Studio section =
the PROMOTED rehearsal-projects system (js/projects.js — NOT a parallel
store). studioMain landing (cards: contentType/dialect/status/preview/
edited; search/sort/import/export/duplicate/confirmed-delete) +
renderNewProject wizard (title/type/text/dialect; saves NOTHING on
cancel; empty-create guarded). Model gained contentType
(monologue/scene/speech/lyrics/other — CONTENT_TYPES in projects.js;
additive, no migration needed; export/import whitelisted in validate.js,
which also finally accepts accent 'ssbe'). paneText/paneNotes AUTOSAVE
(wireAutosave: 800ms debounce, Saving…/Saved ✓ status, storage-error
message, never re-renders mid-edit); notes labelled Acting Notes /
Pronunciation Notes. Project IPA tab is "Transcribe to IPA" (never
"Translate"); dictionary misses say names/invented words need your ear.
pron.js gained toSsbe (toRP + eə→ɛː, approx ≈) so ssbe projects no
longer show American IPA as exact; word-editor alternates now offer all
4 dialects. LIBRARY: "Scripts & Speeches" (curated only — My Texts card
GONE, Train Any Text feature DELETED incl. renderReader's editor param;
legacy store.customText data untouched, its one-time migration already
ran); a "Your own text" pointer card jumps to Studio. About Speechcraft
carries the product statement ("helps actors understand speech, prepare
their text and rehearse it in a chosen accent") + Learn/Prepare/Rehearse
framing + Studio privacy line — IMPERSONAL by Frankie's choice (no
founder story). launch_lint bans "My Texts"/"Train Any Text"/"Texts &
Speeches"/"Translate to IPA". Roadmap (incl. the no-backend Phase 3
honesty gate for ElevenLabs TTS — no stub interface ships):
docs/SPEECHCRAFT_STUDIO_ROADMAP.md.

LAUNCH-TIGHTENING BATCH (2026-08-05, committed locally — NOT pushed, per
Frankie's instruction): nav order is Learn/Practice/Library/Studio/
Progress/More, both surfaces rendered from the ONE `SECTIONS` array (the
bottom nav's separate id list is gone — they cannot drift). Recording
lifecycle hardened: `teardownAV()` (main.js) runs on every record()/
renderShell()/reader-mode-switch/pagehide — cancels live capture, revokes
take URLs, and drops the Perform pane's unsaved pending take via the
`performCleanup` hook; saveTake/deleteTake now commit metadata+blob in ONE
IndexedDB transaction (`idbAcross` in db.js — no orphan blobs), and
deleteTake's best-take-pointer cleanup reads the meta BEFORE deleting
(the old code only worked by accident of a backwards guard).
pron.js is now WORD-AWARE: conservative LOT/THOUGHT/BATH word lists undo
the American mergers (not→/nɒt/, dance→/dɑːns/, caught→/kɔːt/), centring-
diphthong rules give NEAR/SQUARE/CURE their glides (near→/nɪə/,
square→/skweə/ rp //skwɛː/ ssbe //skweː/ aus), lone /ɔ/→/ɔː/ (water→
/wɔːtə/), all still marked ≈. audio.js clip-index fetch is module-relative
(was document-relative — 404'd from any non-root page).
tests/regression.test.js (33 checks: nav both surfaces + drift, 21 IPA
cases, recording persistence/atomic delete/best-take cleanup/per-project
isolation — only touches records IT creates, never user data;
deleteAllTakes deliberately not exercised). tests/run-all.html+run-all.js
= local runner, hosts the app in a same-origin iframe and prints one
PASSED/FAILED verdict; the clickjacking guard now permits SAME-origin
frames (cross-origin still busts/refuses, and the app no longer
half-boots into a gutted document when refusing — that was a live crash).
All gates + artifact build pass; runner verdict PASSED 73/73.

GUIDEBOOK NAV + HUMAN PHONEME PREP (2026-08-05, committed locally — NOT
pushed): sound pages have Prev/Next through `inventoryOrder(accent)` (the
exact displayed inventory order; compact ‹ › by the heading + labelled
bottom row; disabled at bounds, no looping; excluded symbols unreachable).
Prev/Next REPLACES the page in navStack (pop before re-render) so ONE
Back press returns to the inventory; record()'s teardownAV handles
audio/mic/try-it cleanup on switch; scroll-to-top always, focus moves to
#sound-title on step. Human isolated phonemes: neutral voice key
`reference` confirmed working end-to-end (phonemeVariantsFrom in audio.js
is voice-key-agnostic — exported pure for tests); NAM pilot manifest =
tools/phoneme_manifest_nam.json (13 isolated + 3 syllable demos, per-
sound guidance, never deployed); tools/import_phonemes.py = safe offline
import (slug/dialect/voice validation, size+magic checks, dupe detection,
no overwrite without --replace, --dry-run, rebuilds phonemes-index.json,
NEVER touches APPROVED_PHONEMES; --self-test 11/11). #audit phoneme rows
now derive voice keys from the candidate index (reference rows appear on
import; fallback keys keep the to-record checklist) and show the internal
slug + isolated-vs-syllable-demo label. launch_lint pins the syllable-
demo labelling. tests/regression.test.js grew to 48 (reference-key
resolution, quarantine, cross-dialect/slug exactness, word-can't-satisfy-
phoneme, and a runner-only driven nav flow: boundaries, order, replace-
history Back, focus). Runner verdict PASSED 88/88. TTS candidates remain
withdrawn and were NOT approved; no audio generated.

VERTICAL SLICE (2026-08-05, committed locally — NOT pushed): four new
review-gated systems, all data-driven, nothing fake. (1) DIALECT IN
ACTION (js/data/dialect-in-action.js): 8 original draft pieces (dialogue+monologue
× 4 courses) with [[term|ID]] expression markers that open the real W&E
entry; actionFor() returns ONLY approved pieces — Library card absent
until something is approved; dialect_lint validates every ref exists +
matches the course. (2) SONNET LEARNING EDITIONS: recasts.js gained
TRANSPOSITION_REVIEW + approvedTranspositions(); the reader's "In
Today's Voice" tab (creative-transposition labelling, TRANSPOSITION_
LABELS) appears ONLY for approved dialect versions — all 15 are draft,
so no learner change yet; Plain Meaning untouched. (3) ARTICULATION
VIDEO (js/data/media-videos.js): typed manifest (EMPTY — no fake
videos) + approval-gated player component in main.js (poster, captions
track, loop + half-speed, LTJV list); honest ABSENCE when unapproved
(Frankie's no-coming-soon taste); storage plan + sibling-repo same-
origin hosting recommendation in docs/MEDIA_HOSTING.md. (4) ACCENT
BRIDGE (js/data/bridge.js): self-selected from/to (never diagnosed;
prefs in speechcraft-bridge), pilot route nam→rp with 8 approved
comparisons (they restate the shipped Dialect Accuracy Standard — new
claims beyond curriculum must start draft); A/B word audio only when
BOTH exact clips exist (the contract caught quarantined 'car' → example
is 'bar'); Library card on every course. OWNER GATE #review (like
#audit, boot+hashchange): renders all 23 written drafts exactly as
learners would see them; approval = editing reviewStatus /
TRANSPOSITION_REVIEW in the data files. dialect_lint checks 9-11
(manifests, action refs, transposition statuses — all proven non-
vacuous). Regression suite 67 checks; runner PASSED 107/107.

B03 — LEARNER SPEAKING IS PAUSED (binding product decision, 2026-08-12;
uncommitted on branch threshold-before-you-speak alongside B01):
js/capabilities.js exports frozen CAPABILITIES.learnerSpeaking=false —
build-controlled ONLY, nothing derives it from storage/URL/settings, no
toggle; tests INJECT a caps param, never mutate. TWO enforcement levels:
(1) js/record-ui.js is the sole source of capture UI (tryItHtml,
performCaptureHtml — both return '' when disabled, both DI-testable and
proven to still render when caps injected true); (2)
startRecording(options, caps=CAPABILITIES) throws FeatureDisabledError
BEFORE getUserMedia (throwing is deliberate — resolving would fake
capture-started; micErrorMessage maps it to honest copy).
stopRecording/cancelRecording unguarded (mic release must always work);
teardownAV unchanged. Perform tab → '🎬 Takes' view: play/download/
confirmed-delete only, rating/note/★Best shown READ-ONLY; tab appears
when takesPresence() says 'has' OR 'error' (2s timeout; uncertainty
REVEALS with a recovery message pointing at Privacy → Manage
Recordings, the permanent backstop) — only confirmed-empty hides it.
Take identity: projectId (indexed) XOR scopeId ('sonnet:N' /
'<libKey>:<pieceId>', scan+filter). W&E Try-it gated. touchRehearsed
only stamps when actually recording. DB_VERSION stays 1 (test-pinned).
Copy audit done (About Rehearse line, Studio empty state, What-Is-IPA
recorder line, reader chip labels, bridge 'Study this sound', Privacy
3-sentence disclosure — launch_lint pins the disclosures + frozen flag,
NO global word bans). Speaking game removed from the active sequence;
reintroduction requires the future speaking audit (docs/ROADMAP).
Regression suite: 92 checks incl. getUserMedia spy at ZERO across all
driven journeys, dual-state renders, guard behavior, seeded-take
preservation. Firefox/Safari/mobile passes of non-speaking journeys are
Frankie's to run; MediaRecorder certification moved to the speaking
audit.

B04 FIXES (2026-08-12, approved, uncommitted with B01/B03): bug #1 —
analytics.rehearsalTargets(picks, isValid) derives drill targets (pair →
both symbols, single → sym; never assumes a `phonemes` field, which
dailyRehearsal never returned — the targeted Quick Practice and Today's
Rehearsal CTAs had been silently dead); startDailyRehearsal validates
and, with no drillable phoneme target (picks can be whole-word
transcription pairs from accent exercises — by analytics design), shows
an honest alert instead of returning silently. Bug #2 — state.js
freePlay getter/setter RESTORED ("Remove Quest Mode", July 22, deleted
persistence while the UI kept the toggle); boolean-strict both ways, so
missing/legacy/malformed values read false. Regression suite → 123
checks (pair/single/mixed/empty targets; free-play default, malformed
values, enable/disable persistence at storage level AND through the real
UI across iframe reloads + a course switch; CTA never-silent contract
with a deterministic seeded launch + driven completion; analytics key
snapshot-restored so tests leave no trace; mic spy still zero).

BUILD A (2026-08-11, committed locally, NOT pushed): scope change made
the roadmap active — twelve features now in build order A–G, six things
stay deferred (isolated phoneme recordings, mouth/tongue videos,
lyrics/sheet-music, interface languages, additional accents, learner
speaking — never reintroduce indirectly). Local checkpoint commits are
now permitted as tested restore points; push/merge/deploy still
forbidden. Checkpoint 428f570 preserved accepted B01–B04, then Build A:
the threshold became the "Why Speech Matters" preface — seven panels +
kept course picker + kept choice (nine dots, computed from
THRESHOLD_PANELS.length + 2). Copy source is now
docs/WHY_SPEECH_MATTERS_COPY.md (supersedes THRESHOLD_COPY.md for
panels 1–7; that file stays untouched as B01 history). Kept verbatim:
Plato quote + attribution, "Speech reveals thought…", the
feeling/truth line, both choice-screen lines. New pins in launch_lint
6c/6d: "Why Speech Matters", "Speech is not decoration. It is
action.", "ear first, then text, then performance", "no score, no
points", Jowett credit + the US-scoped PD statement ("public domain in
the United States" / "check the copyright law where they live" —
NEVER claim worldwide PD; corrected 2026-08-11) + "Rhetoric &amp;
Oratory". Preface ends in reflection ("Before You Choose") — no quiz,
no XP (locked). About/invite/Preferences copy renamed to match; the
threshold storage record, key names and grandfathering signal are
UNCHANGED (state.js comment says so). New Library card "Rhetoric &
Oratory" → renderReadingPathway: three Plato dialogues
(Gorgias/Phaedrus/Republic II–III & X) with for-actors notes, Benjamin
Jowett 1892 credit, PD statement, plain-text Project Gutenberg pointer,
NO external links (house sources policy), explicitly not an ebook
shelf. IPA sound-page Prev/Next already satisfied Build A's nav spec
(shipped earlier; section-6 tests cover it). Regression suite → 139
checks (section 10: six pathway checks incl. link-free page and
reading order; ten preface checks — full replay walk through all nine
screens, panel-title sequence, no quiz apparatus, picker preselected,
Esc exit, record immutability, no XP; section re-acquires the live
iframe document because section 9 reloads the frame). Suite total
179/179; all five gates pass.

TEXT-FIRST RULE (2026-08-11, binding, supersedes conflicting audio
requirements in the build order): Speechcraft completes the full
WRITTEN product first. All written content, interfaces, explanations
and text tools are active (preface, rhetoric excerpts, Speech
Dissection, Playable Actions, written Dialect in Action, written
Accent Bridge, Shakespeare editions, W&E connections, document
import/OCR, Studio tools, the 23-draft review workflow). ALL new audio
and media are deferred — isolated-phoneme recordings, A/B recordings,
narration of any kind, articulation/mouth videos, learner recording,
speaking exercises, audio scoring. Isolated-phoneme recordings are NOT
blockers anywhere (PHONEME_RECORDING_PLAN.md now says so). Existing
approved audio: keep, don't regenerate or restructure; playback stays
where it already works; never create new audio for current builds,
never make a written feature depend on audio, never show a playback
button without an approved file, no "audio coming soon" clutter, no
speech synthesis substitution, preserve audio-contract regression
coverage. Build A corrections under this rule: the Rhetoric & Oratory
page now carries VERBATIM Jowett excerpts (verified 2026-08-11 against
Project Gutenberg #1672/#1636/#1497), pinned in launch_lint 6d and
regression section 10.

BUILD B (2026-08-11, committed locally, NOT pushed): Speech Dissection
Quick mode, per docs/BUILD_02_DISSECT_QUICK.md + SPEECH_DISSECTION_SPEC
§1/§3/§8/§11. New js/dissect.js (six QUICK_QUESTIONS with stable ids
quick.happening/wants/resisting/doing/change/after — NEVER rename;
newDissection in the exact §8 shape with reserved
annotations/speakers/interpretations/userQuestions/history arrays;
saveAnswer derives answered/blank from text unless an explicit
'unknown'/'na' status is passed — marks always KEEP typed text;
coverageOf/coverageLine words-not-scores). Storage: DB_VERSION 1→2,
additive-only migration creating store 'dissections' (keyPath id,
index targetKey) — nothing existing touched; regression pins v2 and
proves takes survive the live upgrade. UI: '🔍 Dissect This' tab on
the Studio project view → paneDissect accordion (one question open at
a time, real <label>s, 800ms debounced autosave with visible
Saving…/Saved ✓, one-tap "I don't know yet"/"Not relevant" as
first-class answers, lazy record creation so browsing writes nothing,
delete-dissection separate from delete-project with its own confirm).
Project deletion now cascades deleteDissectionsFor beside
deleteTakesFor and SAYS so in the confirm. XSS: stored answers are the
app's highest user-authored-text surface — values enter the DOM only
via textarea .value, esc() everywhere else; regression stores a live
payload and asserts inertness. Guided/Full modes and the Action
Library deliberately absent (no controls for unbuilt modes). launch_lint
6e pins the one-tap controls. Regression suite → 159 checks / 199
total; five gates pass. Section-11 test drive creates and deletes its
own project; leaves no trace.

A/B GAP CLOSURE (2026-08-11, committed locally, NOT pushed; A-corrections
and B provisionally accepted): (1) Dissection navigation restored to the
approved spec — '🔍 Dissect This' is an ACTION on the project view (with
a quiet coverage note when a record exists), opening renderDissect's
focused screen; normal Back returns to the project; the Studio tab strip
is back to five; launch_lint fails if a dissect tab reappears.
(2) Export/import: exportProject carries the project's dissection
(allow-listed fields, no ids/targetKeys); validate.js validateDissection
returns clean {materialType, createdAt, answers} or NULL (invalid/
oversized/unsupported → project imports without it; pre-dissection files
unchanged — backward compatible); import rebinds via
dissect.attachImportedDissection around the NEW project id; six-answer
values/statuses preserved; nothing from the file becomes id/key/HTML.
(3) Privacy: 'Text dissections' disclosure row; wipe now iterates
db.CONTENT_STORES (blobs/recordings/DISSECTIONS/projects/meta — the old
hardcoded list orphaned dissections on full wipe: real bug, fixed);
wipe button + confirm name dissections; Manage Recordings notes say
dissections survive recording deletion; stale 'Perform tab' → 'Takes
tab'; stale Preferences 'Your goal' blurb fixed. (4) db.js: SCHEMA_STEPS
+ applySchema + openRaw(name, version, {onClosed}) exported for real
scratch-DB upgrade tests; onblocked rejects with UpgradeBlockedError
carrying the visible 'Close other Speechcraft tabs, then reload'
instruction (never hangs — 4s-raced in tests); onversionchange closes
so future builds are never blocked; older build vs newer data →
VersionError, data untouched; dbErrorMessage(err) maps all three
honestly and is rendered by studioMain/renderDissect/fillRecording-
Manager catches. (5) Autosave: dissect.createSaver — debounced,
strictly serialized, newest queued job supersedes, failed write NEVER
announces 'Saved ✓'; MAX_ANSWER_LEN=20000 (matches LIMITS.notes)
enforced by textarea maxlength (visible, never silent) + saveAnswer
clamp + import clamp; malformed Unicode (lone surrogates) round-trips
via structured clone; in-app navigation during a pending debounce still
lands the write (timer + closure survive; tested). Suite → 222 checks
(regression 182), five gates pass.

HONESTY CORRECTIONS + BUILD C (2026-08-11, committed locally, NOT
pushed; A/B accepted): (1) PD wording — "public domain worldwide" is
GONE everywhere; the pathway credit now reads verbatim "Project
Gutenberg identifies this Benjamin Jowett edition as public domain in
the United States. Readers elsewhere should check the copyright law
where they live." (pinned in 6d + WHY_SPEECH_MATTERS_COPY.md; never
reintroduce a worldwide claim). (2) Import warning — validate.js
validateProjectBundle now sets `dissectionDropped` when a dissection
was PRESENT but unusable (absent files stay quiet — backward
compatible); importProjectFile returns {count, droppedDissections};
the studio import alert uses validate.importResultMessage(), whose
warning line is lint-pinned; regression covers absent/valid/invalid ×
message shapes. (3) BUILD C — Playable Actions: js/data/playable-actions.js
holds the twelve entries + six pairs VERBATIM from
docs/ACTION_LIBRARY_v1.md (house typographic quotes are the only
normalization; wording/punctuation otherwise untouched — do not
rewrite or extend; lint 6g pins all 12 verbs, 6 pair relationships,
6 practice lines ×3 occurrences, governing question, pairId count).
Library card '🎯 Playable Actions' ("What you're doing to the other
person.") → renderPlayableActions (governing question + distinction +
pair lesson, search via module-level playableQuery so Back restores
the exact list state, category headings only where entries exist,
honest no-match state with Clear) → renderPlayableAction (Objective/
Likely resistance/Coaching/Contrast, shared practice line as TEXT,
↔-opposite and prev/next-pair navigation both using the sound-page
replace-history pattern so one Back always returns to the list).
Dissection quick.doing carries an 'Explore Playable Actions' doorway —
navigation only: no answer analysis, no recommendation, nothing
stored, no migration. Regression section 13 (17 checks: data
integrity incl. contrast symmetry both directions, verbatim spot
pins, search safety; drive covers open/search/clear/detail/both-
direction pair nav/prev-next/edge/Back-state/Library-return/doorway
round-trip/no-audio sweep). Suite → 246 checks total.

BUILD D (2026-08-11, committed locally, NOT pushed): written Accent
Bridge + Dialect in Action completion, text-first. BRIDGE: 4 accent
courses (core excluded) → 12 ordered routes; nam→rp stays the only
APPROVED route (its 8 comparisons byte-unchanged); 11 NEW routes ×
5–7 comparisons each, EVERY comparison reviewStatus 'draft' —
routeFor() returns null until a route has an approved comparison, so
drafts never reach learners; routeStatus() distinguishes
approved/draft/same/missing for honest empty states (same-accent →
#bridge-same message; draft → #bridge-pending 'awaiting review by a
qualified dialect reviewer'). Renderer adds a source-notes line built
from DIALECT_INFO About titles (the existing dialect-reference
system). All claims restate the Accuracy Standard, phrased
'typically'; BATH incidence (dance/castle regional in aus),
CURE variability, glottal/tap as REALIZATIONS of /t/ all carried
honestly. bridgeDrafts() feeds #review. ACTION: the 8 pieces gained
`situation` (situation+objective) and `review: {literary, dialect}`
per-piece reviewer fields (status/reviewer/date — Claude never a
reviewer); renderActionPiece gained an on-demand '≈ Show approximate
IPA' toggle that pipes markup-stripped lines through the EXISTING
fillSound derivation (dormant until a piece is approved — all 8 stay
draft). #review restructured: 'The original 23-item queue' (8 pieces
+ 15 transpositions, identifiable) + separately 'Accent Bridge routes
— 11 new draft route(s)' with reviewer-type requirements; no
batch-approve. launch_lint 6h pins the 12-route coverage,
approved-count==8 (an approval sweep in code fails the gate), route
labels ('Standard British' everywhere, banned labels blocked), the
honesty copy, and 6h2 re-bans the 17 removed period-NAM expressions
in idiom/action DATA (comments exempt). Regression section 14: 26
checks (coverage/shape/typicality/draft-visibility/label separation/
removed-expression scan/piece completeness/expression-link
resolution/45–90s monologues/UI drive incl. same-accent, pending,
source notes, mobile-width no-h-scroll, one-Back, review separation,
zero mic). Suite → 272 checks; five gates pass.

BUILDS E+F (2026-08-11/12, committed locally, NOT pushed): E =
docs/REVIEW_PACKET_v1.md — 34 items (8 pieces + 15 transpositions +
11 bridge routes) each with ID/complete text/benefit/dialects/
reviewer types/source support/concerns/stereotype flags/register
assumptions/checklists/blank verdict fields; bridge claims cited
CLAIM-BY-CLAIM (Wells, Cruttenden/Gimson, Roach, Lindsey,
Hillenbrand, Cox & Fletcher, Macquarie); no statuses changed. F =
THE COMPLETE WRITTEN SONNET CATALOG: all 154 sonnets have Plain
Meaning + In Today's Voice for nam/ssbe/aus. NO Traditional RP
vocabulary adaptation exists BY DOCUMENTED DECISION (RP is a
pronunciation target; its course shows Original + Plain Meaning) —
lint fails if an rp: adaptation ever appears. Architecture:
js/data/editions/ = 11 lazy chunk modules (dynamic import per opened
sonnet; shell never parses the catalog) + index.js manifest/loader
(EDITION_CATALOG_COMPLETE=true; pilots 18/29/73/116/130 served from
recasts.js — never duplicated; the 15 pilot transpositions remain
the original 23 queue) + js/data/edition-reviews.js approval ledger
(absence = draft; plain needs literary review, voices need literary
AND dialect; Claude never a reviewer; no batch approval).
renderSonnet shows Plain/Today tabs ONLY for approved texts — today
that means the reader looks unchanged except pilot Plain Meanings;
#review has a lazy per-sonnet edition inspector. launch_lint 6i:
sonnets.js byte-locked (sha256 pin c0daa026…), chunk/manifest
cross-check per kind, rp:/No-Fear bans, 149-new cap + complete-flag
consistency. Regression section 15 incl. strict 154-of-every-kind
check. 11 batch commits ccb74ba→…; suite 283/283 at completion; all
five gates pass every batch. 616 draft texts await human review.

PERMANENT ENTRIES (2026-08-12, committed locally, NOT pushed;
written-content-only): (1) More shelf gained a permanent '✨ Why
Speech Matters' card (moreMain, between Preferences and About) opening
renderThreshold(0,{replay:true}) — the About "Read it again" button
and Preferences rerun both remain; replay writes only
lastReplayedAt/lastChoice, Back/Esc returns to the invoking page via
navStack. (2) Library shelf gained a permanent '🔍 Speech Dissection'
card → renderDissectHub: full method explainer (what/why, the six
QUICK_QUESTIONS each with a what-it-discovers line, three answer
states, an original worked example incl. one 'unknown' and one 'na',
privacy note, how-to), project selector (up to 12, most-recent first,
opens renderDissect with saved answers untouched) or empty-state
create path, plus an always-present '＋ New Studio project' button →
renderNewProject. Opening the hub NEVER writes to IndexedDB (record
creation stays lazy in paneDissect). Per-project 🔍 Dissect This
button unchanged. Regression: section 10 reworked to enter via the
More card (permanence, Esc-returns-to-origin, replay-resets-nothing
incl. onboarding+lessons); new section 16 (14 checks: hub
readability, no-record-on-read, both profile states, saved-dissection
round trip, wizard journey, Back chain, mobile width, no audio, zero
mic). Suite → 297 checks; five gates pass.

TEXTBOOK/WORKSHEET SPLIT (2026-08-12, committed locally, NOT pushed):
strict separation of the two Dissection surfaces. Library → 'Speech
Dissection' card = renderDissectTextbook, a READ-ONLY textbook
carrying the owner-supplied copy VERBATIM (intro + six numbered
sections each with lead line, Ask-list and close, + 'Keep Returning
to the Text' — 84 bullets total, count test-pinned; section 4 was cut to a
SINGLE ask, 'Which action best describes what I am trying to accomplish?',
2026-08-21 by owner order — the twenty 'Am I …?' tactic prompts and the two
follow-ups are gone; do not restore them). The textbook
imports NOTHING from dissect.js, contains no
textarea/marks/autosave/coverage/example/selector/create-button, and
never touches IndexedDB; its only actions are the written 'Explore
Playable Actions' link (section 4) and Back → Library. ALL
interactivity remains exclusively in Studio → project → 'Dissect
This' (paneDissect unchanged; Back → same project). The former hub's
worked example, project selector and create-from-page button are
GONE by order — do not reintroduce them on the textbook. Section 16
rewritten (16 checks: card, six headings, full 106-bullet inventory,
verbatim frame copy, zero controls, no example/selector, no IDB
record on read, Playable link round-trip, mobile width, Studio
worksheet retention + Back-to-project, zero mic). driveSession in
section 9 now uses a 180s wall-clock budget instead of a step count
(step budgets starve under background-tab timer throttling). Suite →
299 checks; five gates pass.

IA REVISION (2026-08-12, committed locally, NOT pushed): the
information architecture is now hub-based and title-only. Sidebar +
bottom nav (one SECTIONS array): Learn, Practice, Studio, Library,
Progress, More; a stale saved section falls back to Learn (test-
pinned via reload). Accent Library = EXACTLY 6 primary cards in
order: IPA, Words & Expressions, Dialect in Action (always listed;
unapproved pieces count the drafts and carry an "In review" badge
that opens renderDialectActionPending — stable courseId filtering,
zero cross-dialect leakage), Rhetoric & Oratory, Your Instrument,
Vowel Map. There is NO About-the-Accent card or page (removed
2026-08-17): DIALECT_INFO survives as the Dialect Accuracy Standard
behind the IPA inventory, dialect_lint and Sources & Credits, but
has no learner-facing page and no aboutTitle field. Studio = hub of EXACTLY 4
title-only cards: Scripts & Speeches (all text collections,
renderTextsPage), Playable Actions, Custom Work, Personal Dictionary.
Question Everything (the dissection textbook) moved to the ACTING
Library on 2026-08-19 (tile key 'col:question', 6 sections) — it is
reading, so it shelves. The old Studio landing is
now renderCustomWork()/customWorkPane() — same project area, NO OCR
claims. Featured Texts shelf REMOVED without deleting content.
Accent Bridge moved to Practice (#hub-bridge row). Learn suppresses
the continue card when done === 0 (Stage 1 · Orientation + START
node is the sole entry on an unstarted course); it returns with
progress. Why Speech Matters stays under More. LEARNER-FACING RENAME
'Speech Dissection' → 'Question Everything' (textbook page + Studio
card + validate.js import warnings, which now say plain
'dissection(s)'); the project ACTION stays 'Dissect This'; internal
IndexedDB stores/fields/question IDs/migration names are NEVER
renamed (lint 6j pins the new title, bans the old on learner
surfaces and bans Featured Texts). Tests: sections 1/8/10/11/13/14/
15/16 rerouted (Studio hop through Custom Work card; bridge via
Practice), new section 17 (exact hub orders, title-only proof,
retired-card absence, collections preserved, no-OCR, course-switch
continue-card rule with progress preservation, stale-section
fallback, zero mic). Verified as part of the consolidated 2026-08-12
build below.

CONSOLIDATED REVISION (2026-08-12, committed locally, NOT pushed) —
one owner order consolidating and superseding the IA, preface and
Practice prompts. THREE parts. (1) PREFACE: THREE content panels — Why
Speech Matters / Speech Is Action / Speech Reveals Thought — in TWO
verbatim variants (docs/WHY_SPEECH_MATTERS_COPY.md): INTRO = concise
first-time opening (short paragraphs, no goals list, no long accent
disclaimer, Continue above the fold); FULL = expanded permanent
section via More/About replay (keeps the 11-item "for anyone" list +
honesty constraints). Both keep the verified Jowett epigraph with
complete attribution "— Plato, Republic 377a–b, translated by Benjamin
Jowett" (lint-pinned). "Speech Reveals Thought" is ORIGINAL Speechcraft
copy — never quoted, never attributed. "Why Actors Train This Way" and
"The Journey" are REMOVED and lint-BANNED. Progress dots count ONLY
the 3 panels; picker + choice are functional screens, dotless.
Audience language audited inclusive (About lead, More blurb, pathway
row label, Custom Work empty state) — actors stay one named audience.
(2) PRACTICE: heading "Quick Practice" (lint-pinned; "Recommended for
you" lint-banned), Mixed Review beneath, diagnostic + old bridge
pill shortcuts REMOVED (Learn's offer card is now the diagnostic's
only doorway). Order: Quick Practice / Listening (Listen & Choose,
Minimal Pairs, Accent Bridge) / Reading IPA (Matching, Decode first) /
existing categories. (3) ACCENT BRIDGE = a real Listening exercise:
renderBridgeSetup (start-accent select offering ONLY approved playable
routes into the CURRENT course; same-accent structurally impossible;
snaps back invalid values) → bridgeLesson (practice+arcade, fixedQueue,
never duplicated) → renderBridgeRound (labelled Starting/Target clip
buttons playing existing approved recordings ONLY — no synthesis, no
fallback, no substitution; two-IPA choice; reveal = both IPAs + what
changes + what stays + reviewed guidance; Continue focused) →
practice-convention results (+5/+7 XP, no hearts, Replay / Return to
Practice). Gating: bridge.js playableComparisons/playableRoutesInto
(injectable hasClip; app passes hasWordClip incl. quarantine).
Currently playable: nam→rp ONLY (all 8 comparisons, f+m clips both
accents); the card is HIDDEN on nam/ssbe/aus/core — drafts stay in
#review. The old renderBridge written browser is replaced by the setup
screen + per-round written reveals (route data intact). Old #hub-bridge
/ #hub-diagnostic / #bridge-same / #bridge-pending ids are GONE — lint
6h re-pinned ("review by a qualified dialect reviewer", "part of the
original 23"). Tests: section 10 rewritten (replay = FULL variant, 3
dots, attribution, no-Plato-on-panel-3), section 14 rewritten (playable
gating data checks + full 8-round session drive w/ course switch,
same-accent snap-back, XP/hearts proof, Replay/Return labels), new
section 18 LAST (snapshots + clears the profile, drives the REAL
first-run concise wall, restores). NOTE: tests/run-all.html does NOT
seed a profile — the suite needs onboarding completed once in that
browser profile (section 18 leaves it restored). Suite: 3 suites ·
352 checks · 0 failures (Security 20, Audio contract 20, Launch
regression 312); five gates pass.

SPEECH SYSTEM (2026-08-13, UNCOMMITTED BY OWNER ORDER — do not commit,
push, merge or deploy this work without explicit instruction): the
written Speech learning + practice system. Data layer:
js/data/speech/{course,glossary,approaches,routines,arcade,texts,
reviews,store,dialects}.js + docs/SPEECH_REVIEW.md. Learn and Practice
each fork via a remembered segmented control (default IPA; keys
speechcraft-learn-mode / speechcraft-practice-mode) — IPA experiences
untouched underneath. Learn → Speech: optional goal (4 options,
localStorage only, never hides/locks/ranks — it only picks which
application tab opens first), 21-lesson course (Start Here 5 / Stage 1
Foundation 7 / Stage 2 Shaping Meaning 5 / Stage 3 Whole Speaker 4),
15-term glossary as in-place dialogs (no history writes), Explore →
Approaches to Acting (4 drafts) + Dialects in Speech (two entrances
over EXISTING dialect records — zero duplication). REVIEW MODEL
(docs/SPEECH_REVIEW.md): professional-tier bodies (Stage-1
anatomy/health → voice professional/SLP; Approaches → acting teacher)
are NEVER learner-facing while draft (honest awaiting pages; full
drafts in #review); editorial-tier content may show while pending
(Playable Actions precedent). Speech Practice: Guided Practice (8
subjects × Prepare·Train·Apply = 24 records; ONLY the 8 batch-1 Train
routines run; 16 drafts #review-only), Speechcraft Arcade (4 groups —
Build Fluency 3 / Shape the Thought 4 / Change the Circumstances 3 /
Change the Action 1; Context Shift built but hidden until Speaking in
Context exists), Practice My Text. 22 original practice texts
(provenance recorded). Studio: Practice This Text on every project
(passage picker → routine/game → returns to the SAME project); scenes
parsed only via strict NAME: lines (never guessed), character chosen
manually. Reflection: 7 fixed private choices + optional note —
self-observation, never evaluation. Scoring: objective recall games
may tally; interpretive work is completion-only (+5 XP, no hearts
ever, no percentages). Persistence: localStorage ONLY
(speechcraft-speech-goal/-done/-history, capped 200; wipeSpeechData in
the Privacy wipe + disclosure row) — NO IndexedDB change, so no
storage gate was tripped. History references text by TITLE SNAPSHOT —
project deletion dangles nothing. Lint 6l pins: the two central
practice statements, 'autonomic' ban, alphabet-experiment steps +
no-attribution, 8 subjects / 24 routines / 8-batch, 3 practice
choices, 4 arcade groups, Context Shift hidden, deferred-feature and
media-API bans, verbatim safety line. Tests: section 19a data
invariants + 19b full drive (fork integrity, goal non-locking, tab
separation, glossary/Back, draft gates, routine run + reflection +
history, arcade grouping + Unicode first-letter + pause invariance,
Studio XSS-inert flow + cue association + return + deletion, zero
mic). Deferred (roadmap ONLY, no placeholders): Body Language, 5-step
formula, Build a Character, Speaking in Context, Context Shift,
Delivery in Action, case studies, video essays, YouTube, Build Fluency
pathway, method Studio courses, Vocal Performance, Musical Theatre,
Improv.

THREE-WORKSPACE IA (2026-08-13, UNCOMMITTED with the Speech system —
same owner hold): the page-level Learn/Practice tabs are replaced by a
PERSISTENT WORKSPACE SELECTOR in the stats bar (#ws-chip → #ws-menu),
available on every section. Workspaces: **Speech** (no accent context
at all — no flag, no course chip), **IPA** (static "IPA Foundations"
chip, accent-neutral, no selector), **Accents & Dialects** (the
existing accent selector, four accent courses only; IPA Foundations
moved to its own workspace). Stored at speechcraft-workspace with
migration: retired learn/practice-mode keys → speech, else inferred
from the stored course (core → ipa, otherwise accents). Switching
never touches speechcraft-course, progress or projects. Sections keep
their names; learnMain/practiceMain/libraryMain dispatch on the
workspace. SPEECH LIBRARY = four collections — Speechcraft Principles,
Your Speaking Instrument, Meaning Intention & Urgency, Presence &
Integration — plus Further Study (Approaches to Acting, Dialects in
Speech). "Stage 1/2/3" labels are RETIRED and lint-banned (internal
stage ids remain; SPEECH_COLLECTIONS maps them). SPEECH LEARN is the
ordered pathway over the SAME records: per-lesson objective, the
reading, a link to its Library collection, an understanding check ONLY
where an answer is objectively correct (interpretive work is never
scored), and "Practice this skill" → the mapped routine/game.
MY WORKING TEXT (speechcraft-working-text): requested only when an
exercise needs text, four sources (provided Speechcraft texts /
Scripts & Speeches / a Studio project / Custom Work), stored as a
REFERENCE and re-resolved live — Studio records are never duplicated;
an unavailable reference falls back to the honest prompt. REVIEW
TRANSPARENCY: speechCensus() computes every displayed count from the
records ("14 available · 7 prepared and awaiting professional review"
today); the count is a button opening a read-only page showing each
prepared item's title, collection, complete copy, status, required
reviewer, why review is required, concerns, source file + id and
learner visibility, badged "Prepared draft — awaiting professional
review" — never "missing" or "coming soon". "What are you working
toward?" moved out of the curriculum into Preferences (answer
preserved, still gates nothing). Deferred "Put It Together /
Performance Lab" is documented in docs/SPEECH_REVIEW.md and lint-
banned from the UI. Lint 6m pins all of it. Tests: suite pins the
accents workspace for sections 1–18 and restores; section 19 drives
workspace switching, persistence-across-reload, per-workspace headers,
the four collections, no-Stage-labels, the review page, the
working-text reference rule and the Preferences move.

SPEECH REFINEMENT (2026-08-13, UNCOMMITTED with the rest of the Speech
work): Learn and Library now answer different questions from ONE set of
records. LEARN = guided course, heading "Speech Course": Continue-
learning card → next available lesson, "N of M lessons completed", a
compact status card, and four COLLAPSIBLE numbered MODULES (1
Foundations, 2 The Speaking Instrument, 3 Shaping Meaning, 4
Integrating the Skills — never "stages"); only the active module is
expanded. Numbering is derived (lessonNumber → 1.1–1.5, 2.1–2.7,
3.1–3.5, 4.1–4.4) so gaps are impossible. A module with nothing
available yet (Module 2 today) renders as ONE summary — "7 chapters
prepared · awaiting professional review" + badged titles + View
prepared drafts — instead of scattering draft cards through the
sequence. Further Study is GONE from Learn (one "Continue exploring in
the Speech Library" link remains). A Learn lesson = Objective → Read
(card opening the Library chapter) → Try → Apply → Check → Complete
and continue; Try/Apply appear only where a real exercise is mapped,
and the full chapter text is never duplicated into Learn. LIBRARY =
textbook: "Browse the complete Speechcraft reference by topic", a
labelled search over titles/collections/headings/glossary terms
(lessonKeywords), the four collections + Further Study, and a chapter
route with full copy, semantic lists, dl term lists, source notes,
in-collection Previous/Next and "Study this in Learn" — and NO check,
mark-as-read, XP, completion control, lock or game. REVIEW AREA
redesigned: filterable inventory table (title/collection/status/
visibility/Open draft) grouped by category, then one draft at a time
with clean reading copy and identifiers inside a collapsed "Review
details". Counts come from speechReviewCategories(): today 7 course
chapters (voice/SLP) + 4 acting approaches (acting teacher) = 11 —
no discrepancy found. Learner-facing governance language is neutral
("AI-assisted educational drafts require approval from a named,
qualified human reviewer"); visibility reads "Draft copy is review-
only. Learners can see its title and review status." STUDIO gains a
compact My Working Text card (title/source/Open project/Change text/
Practice this text, or Choose a text when empty) over the unchanged
five cards. SPEECH PROGRESS is its own pane — lessons completed,
practice sessions, skills practised, working texts explored, topics
revisited, per-module progress, recent practice — with NO weak sounds,
IPA symbols or percentage scores; IPA/accent progress is untouched in
their workspaces. Free Play is hidden in Speech (it gates lessons the
Speech course does not use). The Speech rail is a contextual "Next
step" panel that never points at review work.

SEPTEMBER 2026 WAVE (2026-09-15 → 09-17, pushed through e8fdf0d; the
2026-09-17 batch after it is staged): SCENES SYSTEM — 27 verbatim
public-domain two-handers in js/data/scenes.js across ten authors,
corrected-reprint policy (mechanical printing errors fixed, every fix
logged per-record in `corrections`; text must equal source + exactly
those fixes), reading pages carry NO citation apparatus (provenance in
data + Sources & Credits), scene parser js/scene-parse.js feeds the
role-based tools (Flash Cards asks which part is yours on every
scene). PWA — sw.js offline layer (module-graph runtime caching, no
precache manifest; registration production-only, dev opt-in
speechcraft-sw-dev; runner sheds workers; wipe covers caches).
ACTING — chapters Finding the Objective (2.8) and Working the
Two-Hander (6.3); 47 path lessons / 55 records / 59 published;
Listening & Responding collection (every collection maps one module);
Beat Builder rename; renames Let the Information Affect You /
Repetition / Play the Objective, Not the Emotion / Putting It
Together; partner-work chapters carry Scenes-shelf doorways; the
Warmup leads Acting Practice — since 2026-09-20 a body-and-voice warmup
in FOUR MOVEMENTS (body 7, breath 3, voice 5, words 5 steps; copy
source docs/WARMUP_COPY.md, owner-approved) on a chooser: any movement
alone, or "the whole thing" (all twenty, ~12 min). A finished movement
offers "Next:" the following one. +5 XP per run, safety line, history
kind 'warmup' ref 'warmup-v2:<id>' skill 'Acting'. The original
nine-step warmup is retired. ARCADE — passage step on long texts,
exercise-first layout. PICKERS — Speeches/Scenes doors everywhere.
TWISTERS & SENTENCES — js/data/twisters.js, 60 original feature-
targeted drills (6+6 per accent course) on each accent Library with
per-line ≈IPA (fillSound) and real-clip audio: word chips + full-line
Hear it buttons, 124 clips generated in all ten course voices
(cockney respell layer applied; two lines rebuilt to owner ear:
glottal twister uses better/butter only, h-drop twister uses
hammer/horse/hair + hand→and recipe; 'water' recipe awaiting
re-audition). IA — the VOWEL MAP is REMOVED (sound-page diagrams
carry it); RHETORIC & ORATORY is WITHDRAWN behind RHETORIC_LIVE=false
in main.js (flag, not deletion — pathway + pinned Jowett copy whole);
tile counts show ONLY on material shelves (Monologues 178, Scenes 27,
W&E, Twisters; curricular tiles are title-only — suite pins the
rule). Accent Library now: IPA for This Accent / Words & Expressions /
Twisters & Sentences / Your Instrument.

PAGE TRANSITIONS (2026-09-17, staged): `navTo(render, dir)` in js/ui.js
hands a render to the native View Transitions API — no library, no
dependency, nothing added to the build (there is no build). Rendering is
unchanged: the render runs as written, inside the API's callback, so the
wiring inside each view still runs in its usual order and the DOM lands
within a frame or two. Two silent ways out, both render directly: a
browser without `document.startViewTransition`, and a reader who has
asked for reduced motion. Wired at the structural joints only —
goBack (every Back press), goSection + renderHome, the hub/module/scene
tile handlers, and every replace-history Prev/Next (chapters, IPA sound
pages, Playable Actions pairs), plus chapter jumps and Next lesson —
NOT at every render call site. The rule for new work: a page turn
animates, an in-place state change does not. Flash-card flips, script
mode and highlight-colour switches and rhythm-card deals stay instant,
because a reader firing them in quick succession should never wait.
`dir` writes `data-nav` on `<html>` so Back animates the opposite way to
Forward; css/style.css carries the four keyframes (180ms), a second
reduced-motion lock, and `view-transition-name` on .side-nav /
.bottom-nav / .topbar so the furniture holds still while the page moves
through it. Two elements sharing one name would kill every transition at
once, so the suite pins name-uniqueness in the live app (section 28).

AUDIO REPOSITORY (2026-09-21): the audio moved out of this repository
into `frankierocco3-coder/IPA-Audio`, published as its own Pages site at
`/IPA-Audio/`. Every Pages site under one account is the SAME origin, so
the strict CSP and the no-external-request rule hold with no exception —
this was the plan recorded in docs/MEDIA_HOSTING.md since August. Why:
every app push re-published ~305MB of unchanged audio (deploys climbed
from ~2 to ~8 minutes and one was cancelled at the 10-minute limit). The
app artifact is now ~24MB. Mechanics:
  * `js/audio.js` exports `AUDIO_BASE` (resolved against the module:
    `../../IPA-Audio/`) and `audioUrl(rel)`. EVERY clip, index and
    narration path goes through it — never write `audio/...` again.
  * Local layout is two sibling checkouts: `Agent-Workspace/ipa-trainer`
    and `Agent-Workspace/IPA-Audio`. `serve.py` maps `/IPA-Audio/` to the
    sibling (realpath-guarded against `../`), so local and live use the
    same URLs. `SPEECHCRAFT_AUDIO_DIR` overrides the location.
  * Every offline tool imports `AUDIO` from `tools/audio_root.py` — one
    answer to "where is the audio". Generators now write into IPA-Audio,
    so a new batch means a commit + push in THAT repo (its own allow-listed
    Pages workflow publishes only .mp3 and .json).
  * CI: the app's audit job clones IPA-Audio LAST, after every scanner has
    run, and runs `audit_audio.py` against it. The app deploy never ships
    audio (`build_artifact.py` dropped it). `/audio/` is gitignored here.
  * Service worker sc-v4: the audio URLs changed, so the old media cache
    was orphaned; the bump drops it. Requests to /IPA-Audio/ from the app
    are still caught by the app's worker (same origin, cache-first).
  * History: the old audio stays in this repo's git history (~349MB);
    nothing was rewritten. Growth stops here.

LESSON FIGURES (2026-09-21): acting chapters can carry pictures. A body
block `{ fig: '<key>' }` names an entry in js/data/acting/art.js
(ACTING_FIGURES: title, file, alt, caption; `actingFigure(key)` resolves
the src under img/lessons/). This mirrors the Speech chapters'
voice-art.js exactly, rather than inventing a second pattern.
actingChapterBlocks renders a <figure class="sp-fig"> with the alt text,
a caption (.sp-figcap), fixed 1536x1024 dimensions and loading="lazy";
an unknown key renders nothing, never a broken image. Owner-supplied art
ships as baseline JPEG q90 at 1536x1024, like every other drawing here.
First use: Using the Fourth Wall (ac-fourthwall), the theatre then the
room, straight after the opening paragraph. Alt text describes the
picture, not the lesson's conclusion; captions are learner copy in house
style. The suite checks every key resolves, every file ships, captions
keep house style, and the chapter renders both figures.

BUILDING A CHARACTER (2026-09-22): a fourth workspace, HIDDEN behind
CHARACTER_LIVE=false (js/views/context.js); the owner reads it through
the `#character-preview` link (sets localStorage
speechcraft-character-preview; `#character-preview-off` clears it).
Three kinds of character work: from scratch, a given role, and Commedia
dell’Arte. Commedia comes FIRST (owner decision): its ready-made characters
teach what any character is made of before the learner builds their own;
the course opens with "Why We Start With Commedia". Plan and launch checklist: docs/CHARACTER_COURSE_OUTLINE.md.
Data: js/data/character/character-course.js, same record shape as Acting;
lesson ids `ch-…`. Acting's lesson, chapter, module and collection
screens serve BOTH courses through the `BOOKS` layer in main.js (a
lesson id resolves its own course; Acting renders exactly as before).
Every commedia mask's facts, including the owner's physical-performance
framework, are ONE record (COMMEDIA_MASKS), shown by `{ mask }` (the
sheet) and `{ profile }` (the full breakdown) body blocks, Mask Cards and
The Masks at a Glance; `{ steps }` renders a numbered sequence. Character
pictures are three `{ fig }` slots per mask (cm-<id>-mask/-stance/-walk,
registry js/data/character/art.js, spec docs/COMMEDIA_IMAGE_SPEC.md); an
empty slot renders nothing. The collection ARRIVED WHOLE 2026-09-22: 30
owner-supplied pictures in img/lessons/commedia/, baseline JPEG q90 at
1536x864 — NOT the usual 1536x1024, so a registry entry may carry its own
w/h and actingFigureHtml believes it, keeping the reserved space equal to
the file. The Lovers are two performers, so that chapter carries six
(cm-innamorata-*, cm-innamorato-*) and cm-innamorati-* is retired. Walk
sheets hold 3, 5 or 7 keyframes depending on the character, and alt text
states the count actually drawn. Intake notes head the spec.
Commedia (18 lessons) is written; the other
modules follow the outline. Seven lessons of Acting's Module 4
(the improvise-alone loop, where characters come from, and archetypes) are
in the course as `ch-` copies carrying `movesFrom`; Through Analysis went
back to Acting, which owns text analysis; Acting keeps its copies
until the course is built, then its Module 4 moves over (plan in the
outline).
Suite section 29 pins hidden-by-default, whole records, no id clash, and
house style on every line.

MY CHARACTERS (2026-09-22, owner order): the Building a Character
workspace's Studio. js/characters.js holds storage (meta store, keys
`characters:index` + `character:<id>`, no schema change; every write
goes through one queue so concurrent saves never drop a field) and the
worksheet (CHARACTER_SECTIONS: the same breakdown as the commedia
records). Three kinds: from scratch (+ people observed), a role you have
been cast in (+ given circumstances, what others say; linked by title to
a Studio project or a Scenes-shelf scene), a commedia mask (the
tradition's answer shown beside each field, read from COMMEDIA_MASKS,
never copied). UI in main.js: characterStudioPane, renderNewCharacter,
renderCharacterSheet. Autosaves, private, never scored. Privacy lists
Notebooks always and Characters while the course is open; both wipes
clear them (meta is in CONTENT_STORES). Suite section 31.

THE NOTEBOOK (js/notebook.js; regrouped 2026-09-22 by owner order): a
dock outside #app. Top row: Acting, IPA, Building a Character (only while
that course is open), the learner's own notebooks, +. IPA is ONE tab that
opens a second row: General IPA, Neutral American, Traditional RP,
Standard British, Australian (IPA_BOOKS). Those ids ARE the storage keys
of the old flat row (meta store, `notebook:<id>`), so never rename them;
suite section 30 pins it. It opens on the notebook for the current
workspace (notebookForContext). On phones the tabs wrap under the
controls instead of scrolling sideways.

THE main.js SPLIT (B-R1, begun 2026-09-18, staged): main.js is being
taken apart along the seams the IA already defines. Three rules hold it
together. (1) NO CYCLES: a view may import ui.js, views/context.js and
its sibling views, never main.js. Where a view needs the shell — going
home, tearing down media — it goes through a callback ui.js owns
(`goHome`, `goSection`, `setTeardownHooks`), which is the same trick
that has kept
ui.js cycle-free since August. The shell's own implementation of
goSection is now the private `showSection`, registered through
`setSectionHandler` — the PUBLIC name and behaviour are unchanged for
all 35 call sites. (2) NOTHING IS REWRITTEN: every moved
declaration keeps its name and its body, so a move is reviewable as a
move. (3) THE GRADERS READ THE LAYER, NOT THE FILE: tools/launch_lint.py
reads main.js plus every js/views/*.js as one text (`views_js`), and the
suite does the same through `viewSource()`, which derives the module
list from main.js's own imports — so a new view module joins the checks
by existing. Pins about shipped copy keep their exact meaning; banned
copy is now banned across the whole layer, which is stronger.

The moves are scripted, not hand-edited, and the script REFUSES any set
whose code still needs a name left behind in main.js — that refusal is
how the acyclic rule is enforced rather than hoped for. Two traps cost
real time and are worth knowing: a declaration-boundary scanner must
understand regex literals (`/\[\[([^\]|]+)\|...\]\]/g` silently
truncated a function and left a stray brace behind), and an alias like
`KNOWN_BAD as KNOWN_BAD_LIST` must be re-emitted WITH its alias. Verify
every move by loading each module in the browser — there is no Node
here, so the browser's parser is the only ground truth.

**Incomplete — do not present as finished:**
* Australian sonnet audio ~39% (quota ran out). Other libraries have **no**
  narrated audio yet (~169k ElevenLabs credits needed); they use device voice.
* RP/Australian IPA is rule-derived from General American, marked "≈".
  Only General American is dictionary-exact.
* **No voice has been ear-checked** against the taught IPA. Claude cannot hear
  audio — any new voice needs Frankie to listen before it is trusted.
* Only tested in Chromium. Firefox and Safari untested (Safari especially for
  MediaRecorder).
* Recording exists in text/projects only — lessons never ask the user to speak.
  This is the biggest product gap; spec in the vault.

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

Deploy is automatic on push to `main` (audit job gates it). Work on a branch
for anything substantial.
