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
**Learn / Practice / Library / Studio / Progress / More** (same six on
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

VERTICAL SLICE (2026-08-05, committed locally — NOT pushed): four new
review-gated systems, all data-driven, nothing fake. (1) DIALECT IN
ACTION (js/data/action.js): 8 original draft pieces (dialogue+monologue
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
message shapes. (3) BUILD C — Playable Actions: js/data/playable.js
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
