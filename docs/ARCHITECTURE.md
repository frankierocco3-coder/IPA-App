# Architecture

*Audit date: 2026-07-28 · Branch: `security-hardening`*

## Shape, in one line

**A static, zero-build, dependency-free browser app.** No backend, no
database server, no accounts, no external runtime services.

```
GitHub repo ──(Actions)──► GitHub Pages ──(HTTPS)──► browser
                                                      ├─ ES modules (no bundler)
                                                      ├─ IndexedDB  (projects, recordings, audio blobs)
                                                      ├─ localStorage (progress, analytics, dictionary)
                                                      └─ MediaRecorder / SpeechSynthesis
```

## Frontend

Vanilla ES modules loaded directly by the browser — **no framework, no
bundler, no transpiler, no `node_modules`.** This is deliberate: the dev
machine has no Node, and it keeps the supply chain at zero third-party
runtime dependencies.

| Module | Lines | Responsibility |
|---|---:|---|
| `js/main.js` | 2539 | All views and routing. The app's single UI layer |
| `js/engine.js` | 523 | Exercise generation — 16 generators |
| `js/analytics.js` | 266 | Observes results; weak-sound ranking, daily rehearsal |
| `js/validate.js` | 259 | Import validation and sanitisation (untrusted input) |
| `js/audio.js` | 228 | Clip playback + speech-synthesis fallback |
| `js/diagram.js` | 196 | Articulation diagrams (inline SVG) |
| `js/overrides.js` | 187 | Pronunciation override chain + personal dictionary |
| `js/projects.js` | 151 | Rehearsal project CRUD + legacy migration |
| `js/scan.js` | 140 | Syllabification and scansion |
| `js/db.js` | 136 | IndexedDB wrapper, schema, migrations |
| `js/recordings.js` | 125 | Takes, blob storage, object-URL lifecycle |
| `js/perform.js` | 131 | MediaRecorder lifecycle |
| `js/state.js` | 65 | localStorage progress (XP, streak, lessons) |
| `js/pron.js` | 54 | Lazy-loads the pronunciation dictionary |

**Routing** is function-based, not URL-based: each view is a `render*()`
function that replaces `#app`'s contents. A `navStack` of thunks powers the
back button. **There are no routes** — the app is always at `/`, which is why
no private data can leak into a URL, query string or history entry.

**Rendering** is template strings assigned to `innerHTML`, with all
user-controlled values passed through `esc()`. Verified by test: hostile
payloads in every user field render as inert text.

## Backend

**None.** There is no server, no API, no serverless function, no edge worker.
`serve.py` is a 17-line local static file server for development only and is
never deployed.

## Authentication

**None, by design.** No login, no accounts, no sessions, no tokens, no
password handling, no OAuth of any kind. Every user is anonymous and every
install is independent.

Consequence: data is per-device and cannot be recovered if the browser's
storage is cleared.

## Storage

### IndexedDB — `speechcraft`, version 1
Structured and binary data (`js/db.js`).

| Store | Key | Contents |
|---|---|---|
| `projects` | `id` | Rehearsal projects; indexes on `updatedAt`, `title` |
| `recordings` | `id` | Take metadata; indexes on `projectId`, `createdAt` |
| `blobs` | `id` | Audio blobs — separate store so listing takes never loads audio |
| `meta` | `key` | Migration markers and internal bookkeeping |

Upgrades are versioned and additive in `onupgradeneeded`.

### localStorage
Small, synchronously-read state.

| Key | Contents |
|---|---|
| `ipa-trainer-v1` | XP, streak, completed lessons, free-play, legacy custom text |
| `speechcraft-analytics-v1` | Per-symbol/word/type/dialect counters, confusion table, bounded history |
| `speechcraft-personal-dict-v1` | Personal pronunciation dictionary |

**No credential, token, or payment data is ever written to either store.**

### Static assets
* `js/data/pron.json` — 2.8 MB, ~126k words, CMUdict-derived. Lazy-loaded on
  first use of an IPA view, then cached in memory.
* `js/data/*.js` — course, phoneme inventory, and six text libraries.
* `audio/` — 12,638 MP3s, ~480 MB, pre-generated offline.

## External services

**At runtime: none.** The app makes exactly two network calls, both
same-origin:

```
js/audio.js:47   fetch('audio/index.json')
js/pron.js:14    fetch('./data/pron.json')
```

No CDN, no fonts, no analytics, no telemetry, no crash reporting, no
third-party scripts. CSP `connect-src 'self'` enforces this at the browser
level, and CI fails if an external origin appears in shipped code.

**At build/authoring time (developer machine only):**

| Service | Used by | Purpose |
|---|---|---|
| ElevenLabs API | `tools/generate_sonnets.py`, `tools/generate_voices.py` | Generate MP3s offline; output committed as static files |
| GitHub Actions | `.github/workflows/` | Build, scan, deploy |
| GitHub Pages | hosting | Serves the static site |

The ElevenLabs credential **never reaches the browser** and the deployed app
contains no API code path — see `docs/CREDENTIAL_POLICY.md`.

## Deployment flow

```
push to main
   │
   ├─► audit job        security_audit.py  +  scan_secrets.py --worktree --history
   │                    (blocks the deploy on any finding)
   │
   └─► deploy job       build_artifact.py → _site   (allow-list: only the app)
                        scan_secrets.py --artifact _site
                        upload-pages-artifact
                        deploy-pages  ──► GitHub Pages
```

Every action is pinned to a verified 40-character commit SHA. Default
permissions are `contents: read`; `pages: write` + `id-token: write` are
granted only to the deploy job. Full detail in `docs/DEPLOYMENT.md`.

## Important data flows

### 1. Recording a take
```
user presses Record
  → getUserMedia()            ← the ONLY point a mic permission is requested
  → MediaRecorder (format detected: webm/opus or mp4)
  → stop → Blob
  → blobs store (IndexedDB)  +  recordings store (metadata)
  → object URL for playback, revoked on delete/replace/unload
```
The blob never leaves the device. No upload path exists.

### 2. Transcribing text to IPA
```
word
  → occurrence override?      (project + line + word index)
  → project word override?    (project + normalised word, per dialect)
  → personal dictionary?      (per dialect)
  → built-in dictionary       (pron.json, General American)
  → dialect transform         (RP / Australian, rule-based, marked "≈")
```
Most specific wins. The built-in dictionary is never modified.

### 3. Practice analytics
```
answer submitted
  → showFeedback()            ← existing scoring, unchanged
  → recordAttempt()           ← observation only, wrapped in try/catch
       symbols, word, exercise type, dialect, response time,
       confusion pair (correct answer vs chosen answer)
  → localStorage counters
  → Weak Sounds + Today's Rehearsal read from these
```
Analytics can never change whether an answer was correct or affect hearts/XP.

### 4. Import (untrusted)
```
file
  → size / extension / MIME checks
  → JSON.parse
  → checkDepth()   (nesting + circular)
  → sanitize()     (drops __proto__, prototype, constructor, accessors)
  → validate*Bundle()  → freshly constructed plain objects, new ids
  → user confirmation summary
  → saveProject()
```
Nothing parsed is ever spread or merged into existing state.

## Known architectural constraints

* **`js/main.js` is 2539 lines** and holds every view. It follows one
  consistent pattern, but it is the obvious candidate for splitting.
* **No build step** means no minification, no tree-shaking, and the 2.8 MB
  dictionary ships uncompressed (GitHub Pages gzips it in transit).
* **~480 MB of audio in git** makes clones slow. Git LFS or an external asset
  host would fix it, at the cost of the current "everything is one repo,
  nothing external" simplicity.
* **Per-device data** with no export/import of recordings is a real user
  limitation, accepted because adding sync means adding a backend.
