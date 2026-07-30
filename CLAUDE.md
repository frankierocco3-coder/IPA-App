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
python3 tools/scan_secrets.py --worktree --history # credential scan
python3 tools/build_artifact.py _site              # exactly what Pages publishes

# audio generation (offline, spends money — ALWAYS --dry-run first)
python3 tools/generate_sonnets.py --source ibsen --dialect rp --all --dry-run
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
(Learn/Practice/Text Book/Quests/Shop/Profile/More; bottom nav on mobile), stats
bar (course chip + 🔥/💎/❤️), right rail (quests + today's rehearsal). You are
always "in" one course — 🇺🇸/🇬🇧/🇦🇺/ʃə Foundations — switched via the course
chip menu. Learn = the course's path with per-unit 📘 Guidebooks. Practice = Today's
Rehearsal + mixed review + the games ONLY. Text Book = the reference shelf,
course-aware, in this order: IPA (the course's sound inventory), Native
Idioms (dialects only, card wears the dialect's flag; 224 entries in
js/data/idiom.js — flagged terms hidden by default and NEVER drilled),
Texts & Speeches (full page; no longer a sidebar item), Your Instrument,
The Vowel Map. Idiom filters reset to All on every visit (Frankie's call —
a persisted filter reads as missing content). Deep-page topbar titles stay
short ("🗣 Native Idioms", "📖 IPA") — long ones wrap badly beside the
brand. The standalone Accent Shift Drills track is removed from the UI
(Frankie's call); Stage 3 shift lessons inside each course and the two
shift games remain.
Economy: gems (lessons +10/+15, quest claims), persistent 5 hearts (regen
1/4h, mixed review earns one, gems refill), streak freezes (max 2), 15-min
double-XP boost — all in js/state.js; daily quests in js/quests.js hook
onLessonFinished() in renderResults. No leaderboards (no accounts — decided,
not forgotten). More = IPA chart / Weak Sounds (the full report lives here —
its analytics still feed Today's Rehearsal) / My Texts / dictionary / privacy.
Plus: 5 tracks / 77 lessons, 16+1 exercise generators, 332 curated pieces,
Perform mode, rehearsal projects, analytics, pronunciation overrides.

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
