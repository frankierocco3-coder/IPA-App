# Security — current state

*Audit date: 2026-07-28 · Branch: `security-hardening`*

Companion documents:
* [`THREAT_MODEL.md`](THREAT_MODEL.md) — 16 findings with severity and residual risk
* [`CREDENTIAL_POLICY.md`](CREDENTIAL_POLICY.md) — the zero-keys-in-browser rule
* [`SECURITY_CHECKLIST.md`](SECURITY_CHECKLIST.md) — per-change review list
* [`INCIDENT_RESPONSE.md`](INCIDENT_RESPONSE.md) — runbooks
* [`../SECURITY.md`](../SECURITY.md) — how to report a vulnerability

## Where credentials are stored

**One credential exists in this project: an ElevenLabs API key**, used only by
offline developer tools. It is never deployed.

| Location | Purpose | Protection |
|---|---|---|
| `tools/.elevenlabs_key` | local dev file | gitignored, `chmod 600`, never tracked |
| `ELEVENLABS_API_KEY` env var | preferred alternative | never written to disk by the app |

**Not stored anywhere:** no credential in browser JavaScript, HTML, CSS, JSON,
manifests, comments, localStorage, IndexedDB, exported files, or the deploy
artifact. The deployed app has **no API code path at all** — it plays static
MP3s and falls back to the browser's own speech synthesis.

**Verified:** a scan of all 7,895 git objects across every branch, plus
unreachable/dangling blobs, found **no credential has ever been committed**.

## Environment variables

| Name | Used by | Required? |
|---|---|---|
| `ELEVENLABS_API_KEY` | `tools/generate_sonnets.py`, `tools/generate_voices.py` | Only to generate new audio. **The app runs fine without it.** |

`.env.example` documents the name with an empty value. `.env` and `.env.*` are
gitignored (`.env.example` deliberately excepted). **No environment variable is
compiled into browser code** — there is no build step that could do so.

## Access controls

There are **no application-level access controls, because there are no
accounts**. Every user is anonymous; all data is local to their browser.

Repository access control is the real boundary:

| Control | State |
|---|---|
| Default workflow permissions | `contents: read` |
| `pages: write` + `id-token: write` | deploy job only |
| `security-events: write` | CodeQL job only |
| PAT usage | none — built-in `GITHUB_TOKEN` only |
| `persist-credentials` | `false` on every checkout |
| `pull_request_target` | not used |
| Self-hosted runners | not used |

**Account-level controls (2FA, branch protection, secret-scanning push
protection) are yours to enable — see the checklist in `CREDENTIAL_POLICY.md`.**

## Rate limits

The app has no server, so there is nothing to rate-limit and no abuse surface.
Limits exist where money can be spent — the offline ElevenLabs tools:

* `--dry-run` — reports cost, makes zero calls
* Prints exact call count + character total before spending
* `--max-calls` hard ceiling (default 2500)
* `--confirm-threshold` (default 200) prompts before large batches
* Refuses large unattended runs without explicit `--yes`
* **No automatic retries** — a retried call is a billed call
* Aborts on 401/403/429, quota errors, or 3 consecutive failures
* Endpoint pinned to `api.elevenlabs.io`; any other host aborts

Browser-side, imports are bounded (5 MB file, depth 12, 200 projects, 5000
dictionary entries, per-field length caps) to prevent local resource
exhaustion.

## Secret scanning

Four enforcement points, all local Python with no third-party service:

| Layer | Command | When |
|---|---|---|
| Pre-commit hook | `scan_secrets.py --staged` | every commit |
| CI scan | `--worktree --history` | push, PR, weekly, manual |
| Deploy gate | `--artifact _site` | before every publish |
| Static audit | `security_audit.py` | pre-commit CI + deploy |

Coverage: 28 credential patterns (ElevenLabs, OpenAI, Anthropic, GitHub, AWS,
Google, Firebase, Stripe, Supabase, Slack, Discord, npm, SendGrid, Twilio,
private keys, JWTs, auth headers, credentials in URLs, tokens in query
strings) plus Shannon-entropy and base64-decode heuristics for obfuscated
keys. All output redacted; nothing is ever transmitted or authenticated.

`--history` walks unreachable objects too: a key that was staged and then
unstaged still lives in the object store until `git gc`.

Install the hook: `bash tools/install-hooks.sh`

**Also enable GitHub-native secret scanning + push protection** (free for
public repos) — it blocks the push itself.

## Dependency security

**There are no runtime dependencies.** No `package.json`, no `node_modules`,
no bundler, no third-party JavaScript, no CDN, no remote fonts. The supply
chain is: the browser, and code in this repository.

The remaining supply chain is **GitHub Actions**:

* Every action pinned to a verified 40-character commit SHA with a version
  comment. SHAs were fetched from each official repository and verified.
* **Dependabot** watches `github-actions` weekly so pinned SHAs still receive
  update PRs.
* **CodeQL** scans JavaScript and Python weekly with `security-and-quality`.
* CI fails on any action not pinned to a SHA.

Python tools use only the standard library.

## Known risks

Ordered by realistic severity. Full analysis in `THREAT_MODEL.md`.

| Risk | Status |
|---|---|
| **Repository/account takeover** ⇒ arbitrary code to every user | Repo-side hardened; **account controls are manual and unverified** |
| **Clickjacking** | Only partially mitigated — GitHub Pages cannot send `frame-ancestors`/`X-Frame-Options`. A JS frame-buster is in place but is bypassable by a sandboxed iframe. Real headers available in `deploy/` for another host |
| **Local data is unencrypted** | Accepted and documented. Anyone with the device/browser profile, or devtools, can read projects, notes and recordings. No accounts ⇒ no key to encrypt with |
| **Hand-written `esc()` for output encoding** | Applied consistently and verified by test, but a future contributor could omit it |
| **`style-src-attr 'unsafe-inline'`** | Required for dynamic CSS variables. Values are always app-generated, never user input. Removal path documented |
| **Browser coverage** | Chromium only. **Firefox and Safari untested**, Safari especially for MediaRecorder |
| **Voice content unverified** | Nobody has ear-checked the narrators against the taught IPA |
| **ElevenLabs key was pasted into a chat transcript** during development | Never entered git, but **should be rotated** |

## Incident response

Full runbooks: [`INCIDENT_RESPONSE.md`](INCIDENT_RESPONSE.md), covering account
compromise, key leak, unexpected Actions runs, unauthorised changes,
unexpected billing, malicious deployed code, and secrets found in history.

### Credential revocation — the short version

**Revoke first, investigate second. A live leaked key is a running meter.**

1. **ElevenLabs:** <https://elevenlabs.io/app/settings/api-keys> → **delete the key.**
2. Create a replacement with *Restrict Key* on, enabling only **Text to Speech**
   and **Voices**.
3. Store it in `tools/.elevenlabs_key` (`chmod 600`) or `ELEVENLABS_API_KEY`.
4. Verify the repo is clean:
   ```bash
   python3 tools/scan_secrets.py --worktree --history
   ```
5. Check billing for usage you did not run.

**If a key is found in git history:** removing it from the latest commit is
**not sufficient** — anyone who cloned already has it, and the blob persists
until garbage collection. Revoke first; only then consider history rewriting,
on a mirror clone, never force-pushed automatically. See
`INCIDENT_RESPONSE.md` §2 steps 7–9.

**History rewriting does not make an old key safe again. Only revocation does.**
