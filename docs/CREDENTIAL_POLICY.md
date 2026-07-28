# Credential policy

**Rule: no credential ever reaches the browser.** This is a static site on
GitHub Pages — every file served is public. There is no such thing as a
"hidden" key in frontend code.

## Why obfuscation is not an option

Encoding, minifying, splitting across files, XOR-ing, or fetching a key at
runtime from another file on the same origin are all equivalent to publishing
it: anyone can open devtools, read the network tab, or `curl` the file. A
build-time environment variable compiled into a bundle is **not secret** — it
is a public string with extra steps.

If a feature ever genuinely needs a private API key at runtime, the only safe
answer is a **server-side proxy** that holds the key and enforces its own rate
limits. That is out of scope here and must not be added casually.

## The safe ElevenLabs flow

```
  developer machine                          repository            browser
  ────────────────                           ──────────            ───────
  ELEVENLABS_API_KEY  ──►  generate_sonnets.py  ──►  audio/*.mp3  ──►  <audio>
  (env var or ignored file)   (offline, manual)      (committed)      (no key)
```

1. The key lives in `ELEVENLABS_API_KEY` or `tools/.elevenlabs_key` (gitignored, `chmod 600`).
2. A local script calls ElevenLabs and writes MP3s into `audio/`.
3. Only the generated audio is committed and deployed.
4. **The deployed app contains no API code path at all** — it plays local files
   and falls back to the browser's own speech synthesis.
5. The app works perfectly with no key present anywhere.

## Automated enforcement

| Layer | Command | When |
|---|---|---|
| Pre-commit hook | `tools/scan_secrets.py --staged` | every `git commit` |
| CI credential scan | `--worktree --history` | push, PR, weekly, manual |
| Deploy gate | `--artifact _site` | before every Pages publish |
| Static audit | `tools/security_audit.py` | pre-commit CI + deploy |
| Build allow-list | `tools/build_artifact.py` | every deploy |

Install the hook once: `bash tools/install-hooks.sh`

The build is an **allow-list**: only `index.html`, `manifest.json`, the icons,
and `css/ js/ audio/` with approved extensions are published. `tools/`,
`docs/`, `tests/`, `.github/` and every dotfile are structurally excluded, so a
local key file cannot be published even by a manual deploy.

## Billing-abuse protections (implemented)

`tools/generate_sonnets.py`:

* `--dry-run` — counts work and cost, makes **zero** API calls
* prints the exact call count and character total **before** spending
* `--max-calls` (default 2500) — hard ceiling per run
* `--confirm-threshold` (default 200) — asks before large batches
* refuses large unattended runs unless `--yes` is passed explicitly
* **no automatic retries** — a retried call is a billed call
* aborts on auth (401/403), rate limit (429), or quota errors
* aborts after 3 consecutive failures
* endpoint pinned to `api.elevenlabs.io`; refuses any other host
* the key is never logged, never in an exception, never in a filename

## Manual account-side protections — you must enable these

The repository cannot set these. They are the difference between a leak that
costs nothing and one that costs money.

### ElevenLabs
- [ ] **Restrict key permissions** — *Text to Speech* + *Voices* only. Never
      `user_read`, never billing scopes.
- [ ] **Set a hard spending limit / disable overage billing** if the plan
      offers it.
- [ ] **Enable usage alerts** at, say, 50% and 80% of quota.
- [ ] **Rotate the key** on any suspicion, and on a schedule (quarterly).
- [ ] Use a **separate key per machine** so one can be revoked in isolation.
- [ ] Know the revocation path: Settings → API Keys → delete. Delete first,
      investigate second.

### GitHub
- [ ] **2FA enabled** on the account.
- [ ] **Secret scanning + push protection** on (Settings → Code security).
      This is GitHub-native and free for public repos — it blocks a push
      containing a recognised credential.
- [ ] **Branch protection** on `main`: require a PR, require the credential
      scan to pass.
- [ ] **Actions → Workflow permissions** set to *Read repository contents*.
- [ ] No long-lived PATs; if one exists, scope it minimally and expire it.

### Rotation procedure
1. Create the new key first (so nothing breaks).
2. Write it to `tools/.elevenlabs_key`; `chmod 600`.
3. Verify: `python3 tools/generate_sonnets.py --source ibsen --dialect rp --only IBSEN-001 --dry-run`
4. **Delete the old key at the provider.**
5. Confirm the repo is still clean: `python3 tools/scan_secrets.py --worktree --history`

### Immediate revocation (suspected leak)
Delete the key at the provider **first** — before investigating, before
cleaning history, before anything else. A live leaked key is a running meter.
Then follow `docs/INCIDENT_RESPONSE.md` §2.
