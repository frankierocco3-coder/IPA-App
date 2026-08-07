# Speechcraft — project instructions

Loads automatically every session. Keep it accurate; it is the working memory
for this repository. Deeper detail lives in `docs/`.

## What this is

A **speech and dialect trainer for actors** — IPA teaching, three stage
dialects, and a rehearsal workspace for real text with record-and-compare.

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
```

In the browser console, with the app running:
```js
import('./tests/security.test.js').then(m => m.run());     // expect 20/20
import('./tests/audio.test.js').then(m => m.run());        // expect 20/20
import('./tests/regression.test.js').then(m => m.run());   // expect 33/33
```
Or open `tests/run-all.html` on the dev server — it hosts the app in a
same-origin iframe (allowed by the clickjacking guard) and prints one
PASSED/FAILED verdict for all three suites. tests/ never ships (artifact
excludes it).

## Layout

```
index.html          CSP lives here (meta tag, must stay first in <head>)
js/main.js          ALL views + routing (~2.5k lines). Views are render*() fns
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
js/diagram.js       articulation diagrams (inline SVG)
js/pron.js          lazy-loads the 2.8MB pronunciation dictionary
js/data/            course, phonemes, 6 text libraries, pron.json
audio/              12,638 pre-generated MP3s (~480MB)
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
**Learn / Studio / Practice / Library / Progress / More** (same six on
the mobile bottom nav; Shop and Profile live under More but are still
shell sections; LEGACY_SECTIONS maps old saved 'textbook'/'quests'
states). You are always
"in" one course — 🇺🇸/🇬🇧/🇦🇺/ʃə Foundations — switched via the course chip.
First run: 4-step onboarding (welcome → goal → accent with 🔊 samples →
begin-or-diagnostic); prefs in store.onboarding; users with prior progress
are auto-marked done; revisit via More → Preferences. Until the first
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
2026-07); phoneme clips play ONLY when in APPROVED_PHONEMES (none exist
yet — production is the next milestone, spec in
docs/AUDIO_RECORDING_SPEC.md). Until then, symbol controls are explicit,
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
