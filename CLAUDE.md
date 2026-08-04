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
python3 tools/scan_secrets.py --worktree --history # credential scan
python3 tools/build_artifact.py _site              # exactly what Pages publishes

# audio generation (offline, spends money — ALWAYS --dry-run first)
python3 tools/generate_sonnets.py --source ibsen --dialect rp --all --dry-run
python3 tools/generate_voices.py --idioms --dry-run  # idiom clips, ~15k credits pending
```

In the browser console, with the app running:
```js
import('./tests/security.test.js').then(m => m.run());   // expect 20/20
```

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
**Learn / Practice / Library / Progress / More** (same five on the mobile
bottom nav; Shop and Profile live under More but are still shell sections;
LEGACY_SECTIONS maps old saved 'textbook'/'quests' states). You are always
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
