# Threat model — Speechcraft

Last reviewed: 2026-07-27 · Branch: `security-hardening`

Speechcraft is a **static, local-first web app** on GitHub Pages. There is no
backend, no database, no accounts, no analytics and no third-party runtime
code. That removes most of the usual web attack surface — and concentrates
the remaining risk in three places: **the repository and its deploy pipeline**,
**data the user imports**, and **data at rest on the user's own device**.

Nothing here claims the app is unhackable. It documents realistic risks, what
was done about them, and what is still true afterwards.

## Assets

| Asset | Where it lives | Why it matters |
|---|---|---|
| GitHub account | GitHub | Compromise ⇒ arbitrary code served to every user |
| Repository | GitHub (public) | Source of the deployed app |
| Pages deployment | GitHub Pages | What users actually execute |
| Actions permissions | `.github/workflows` | Path to repo/deploy compromise |
| ElevenLabs API key | `tools/.elevenlabs_key` (gitignored), local only | Billable; never ships |
| Microphone access | Browser permission | Highly sensitive capability |
| Audio recordings | IndexedDB (`blobs`) | The user's own voice |
| Rehearsal projects | IndexedDB (`projects`) | Personal creative work |
| Imported JSON | User-chosen file | Untrusted input |
| Exported project data | User's filesystem | Could leak if it carried too much |
| IndexedDB data | Browser profile | Readable by anyone at the device |
| localStorage progress | Browser profile | XP, streak, analytics, dictionary |
| IPA / pronunciation dictionaries | `js/data/*` (static) | Integrity of taught content |
| Application source | Repository | Integrity of everything |

## Trust boundaries

1. **GitHub → user's browser.** Whatever is on `main` is executed by users.
   This is the highest-value boundary; account and workflow security *is*
   application security here.
2. **File system → app.** Imported JSON is fully attacker-controlled.
3. **Browser storage → app.** localStorage/IndexedDB can be edited with
   devtools, so data read back out is treated as untrusted.
4. **App → network.** Deliberately empty: the app makes no external requests.

## Findings

Severity reflects realistic risk for *this* app, not a generic web app.

---

### F-01 · ElevenLabs credential exposure — **High** (pre-existing controls held)
* **Files:** `tools/.elevenlabs_key`, `.gitignore`, `tools/generate_*.py`
* **Scenario:** the paid API key is committed, or leaks into browser code, and
  a third party spends the account's credits.
* **Likelihood:** Medium (keys near a public repo often leak) · **Impact:** High (billing)
* **Fix:** key is gitignored, read only from `ELEVENLABS_API_KEY` or the ignored
  file, never printed in errors, never referenced by any shipped file. All
  generation is offline; the deployed app has no API code path at all. Added a
  scanner (`tools/security_audit.py`) that fails CI if a key-shaped string
  appears. **A full-history scan of 356 text blobs across all refs found no
  credential in any commit.**
* **Implemented:** Yes · **Remaining risk:** the key exists on the developer's
  machine and was pasted into a chat transcript during development — see
  *Manual actions* in the audit report. Rotation is a human step.

### F-02 · Unpinned GitHub Actions (supply chain) — **High**
* **File:** `.github/workflows/deploy.yml`
* **Scenario:** `actions/checkout@v4` is a mutable tag. If an action repo or a
  maintainer account is compromised, the tag can be repointed at malicious
  code that runs with the deploy token and rewrites the published site.
* **Likelihood:** Low–Medium · **Impact:** Critical (arbitrary code to all users)
* **Fix:** every action pinned to a verified full 40-character commit SHA, with
  the release version in a trailing comment. Dependabot watches for updates.
* **Implemented:** Yes · **Remaining risk:** a pinned SHA is only as good as
  the commit it names; Dependabot PRs must actually be reviewed.

### F-03 · Over-broad workflow permissions — **Medium**
* **File:** `.github/workflows/deploy.yml`
* **Scenario:** the whole workflow held `pages: write` + `id-token: write`, so
  any compromised step inherited publish rights.
* **Likelihood:** Low · **Impact:** High
* **Fix:** default `permissions: contents: read`; write scopes granted only to
  the `deploy` job. Added `persist-credentials: false`, `fetch-depth: 1`, job
  timeouts, explicit shell, and a blocking `audit` job that must pass first.
* **Implemented:** Yes · **Remaining risk:** none material.

### F-04 · No Content Security Policy — **Medium**
* **File:** `index.html`
* **Scenario:** any injection or a compromised file could load remote script
  or exfiltrate data, with nothing to stop it.
* **Likelihood:** Low · **Impact:** High
* **Fix:** strict CSP derived from an actual load inventory. All fetch
  directives `'self'`; `object-src`/`base-uri`/`form-action`/`frame-src` set to
  `'none'`; no `unsafe-inline` for scripts and **no `unsafe-eval` anywhere**.
* **Implemented:** Yes · **Remaining risk:** `style-src-attr 'unsafe-inline'`
  is still required for dynamic CSS variables (documented in
  `docs/SECURITY_CHECKLIST.md`). `frame-ancestors` cannot be enforced from a
  meta tag — see F-05.

### F-05 · Clickjacking — **Low** (partially mitigated)
* **Files:** `index.html`, `js/main.js`
* **Scenario:** the app is framed by a hostile page to trick a user into
  clicking destructive controls (Delete all data) or granting the microphone.
* **Likelihood:** Low · **Impact:** Medium
* **Fix:** JS frame-buster, because **GitHub Pages cannot send
  `X-Frame-Options` or `frame-ancestors`**. Real headers are provided for
  optional hosts in `deploy/`.
* **Implemented:** Partially · **Remaining risk:** a frame-buster is bypassable
  by a sandboxed iframe. **Full protection requires moving to a host that
  sends headers.** This is the single biggest thing GitHub Pages cannot fix.

### F-06 · Prototype pollution via imported JSON — **Medium**
* **Files:** `js/main.js` (old importer), now `js/validate.js`
* **Scenario:** an imported project's `overrides` object was stored **wholesale**.
  A crafted file could carry `__proto__` / `constructor` keys into stored state,
  which later spreads (`{...o.words}`) could act on.
* **Likelihood:** Low (requires the user to import a hostile file) · **Impact:** Medium
* **Fix:** `sanitize()` rebuilds every imported value, dropping `__proto__`,
  `prototype`, `constructor` and all accessor properties; the validator then
  rebuilds overrides key by key. Verified: `Object.prototype` stays clean and
  no dangerous key survives.
* **Implemented:** Yes · **Remaining risk:** none known for this path.

### F-07 · Unbounded imports (resource exhaustion) — **Medium**
* **File:** `js/validate.js`
* **Scenario:** a huge or deeply nested JSON file hangs the tab or fills the
  origin's storage quota.
* **Likelihood:** Low · **Impact:** Medium (denial of service, local only)
* **Fix:** explicit limits on file size, depth, counts and every field length
  (see the audit report). Depth check also rejects circular structures.
* **Implemented:** Yes · **Remaining risk:** a user can still create large data
  by hand; the browser's own quota is the backstop.

### F-08 · Imported file claiming existing audio — **Low**
* **File:** `js/validate.js`
* **Scenario:** a crafted file sets `bestTakeId` / recording ids matching
  another project's blobs, mislabelling someone's recording as its own.
* **Likelihood:** Low · **Impact:** Low
* **Fix:** imported records always get fresh ids; `bestTakeId` forced to `null`;
  recording entries are counted and reported but never become playable records.
* **Implemented:** Yes · **Remaining risk:** none.

### F-09 · Stored/reflected XSS from user content — **Medium** (already sound)
* **File:** `js/main.js`
* **Scenario:** a project title, note, dictionary entry or imported field
  containing `<img src=x onerror=…>` executes when rendered.
* **Likelihood:** Medium (self-inflicted or via a shared file) · **Impact:** High
* **Fix:** all interpolated user data passes through `esc()`. Verified
  empirically: 11 hostile payloads were written into **every** user-controlled
  field, then every screen was rendered — **0 handlers fired, 0 elements
  created**, payloads displayed as inert text. Automated in
  `tests/security.test.js`.
* **Implemented:** Yes (verified, not just asserted) · **Remaining risk:** a
  future contributor could interpolate without `esc()`. Mitigation: CSP blocks
  external script, and the test suite must be run on change.

### F-10 · Microphone misuse — **Medium**
* **File:** `js/perform.js`
* **Scenario:** the app prompts on load, records silently, or leaves the mic
  open after navigation.
* **Likelihood:** Low · **Impact:** High (privacy)
* **Fix / verified:** `getUserMedia` is called **only** inside the Record
  handler — measured 0 calls before an explicit press; exactly one stream at a
  time (a second start is refused); tracks stopped on stop, cancel, error and
  `pagehide`; hard 2-minute cap; state announced via `aria-live`.
* **Implemented:** Yes · **Remaining risk:** the OS/browser indicator is the
  user's ultimate assurance, not our code.

### F-11 · Recording upload / data exfiltration — **Low**
* **Scenario:** audio or project text is sent off-device.
* **Fix:** the app makes **no external requests at all** — confirmed by
  resource inventory. CSP `connect-src 'self'` blocks it at the browser level,
  and a dev-only guard logs any attempt. The audit script fails the build if an
  external origin appears in shipped code.
* **Implemented:** Yes · **Remaining risk:** none while CSP holds.

### F-12 · Local data exposure on a shared device — **Medium** (accepted, documented)
* **Scenario:** anyone with access to the device/browser profile reads
  recordings, projects and notes.
* **Likelihood:** Medium · **Impact:** Medium
* **Fix:** this is inherent to local-first storage with no accounts.
  **Not silently accepted:** the Privacy screen states plainly that browser
  storage is not encrypted, and provides two-step "Delete all local data"
  controls that separate content from course progress.
* **Implemented:** Documented + deletion controls · **Remaining risk:** real
  and unavoidable without accounts/encryption, which the brief excludes.
  Encrypting at rest would need a passphrase the app has no way to store.

### F-13 · Export leaking more than intended — **Low**
* **Fix:** export is an explicit allow-list of fields — no internal database
  ids, no blob ids, no object URLs, no device or browser information. Audio is
  never included, and the file says so.
* **Implemented:** Yes · **Remaining risk:** the export still contains the
  user's own text and notes, which is its purpose.

### F-14 · Repository/account takeover — **Critical** (human controls only)
* **Scenario:** a stolen GitHub credential lets an attacker push malicious code
  that is served to every user of the app.
* **Likelihood:** Low · **Impact:** Critical
* **Fix in-repo:** least-privilege workflows, pinned actions, CodeQL, a
  blocking audit job, and Dependabot. **The decisive controls are account-level
  and cannot be set from inside the repository** — see *Manual actions*.
* **Implemented:** Partially (repo side) · **Remaining risk:** entirely
  dependent on 2FA, key hygiene and branch protection being enabled.

### F-15 · Content-type confusion / unsafe object URLs — **Low**
* **Fix:** blob URLs are created only from locally recorded audio, revoked on
  delete/replace/unload; no `URL.createObjectURL` is ever called on imported
  data; `X-Content-Type-Options: nosniff` is set in the optional host configs
  (GitHub Pages already serves correct types for these extensions).
* **Implemented:** Yes · **Remaining risk:** low.

### F-16 · Accidental API billing — **Medium**
* **Scenario:** a script loop or a leaked key burns ElevenLabs credits.
* **Fix:** generation is manual, offline, and `--dry-run` reports cost before
  spending; the tool exits cleanly with a clear message when quota is
  exhausted rather than retrying blindly.
* **Implemented:** Yes · **Remaining risk:** spending limits are an account
  setting — see *Manual actions*.

## Explicitly out of scope

* Encrypting local data at rest (needs a passphrase and key management the
  brief rules out).
* Server-side controls of any kind.
* Protecting against a fully compromised device or malicious browser extension —
  an extension with page access can read anything the page can.
