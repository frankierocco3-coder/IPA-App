# Deployment

*Audit date: 2026-07-28 · Branch: `security-hardening`*

**Production:** <https://frankierocco3-coder.github.io/IPA-App/>
**Repo:** `frankierocco3-coder/IPA-App` (public)

There is no build step, no bundler and no dependency install. The repository
*is* the application.

## Local setup

Requirements: **Python 3.9+** and a modern browser. Nothing else — no Node, no
npm, no package install.

```bash
git clone git@github.com:frankierocco3-coder/IPA-App.git
cd IPA-App
bash tools/install-hooks.sh      # pre-commit credential scan (do this once)
python3 serve.py                 # http://localhost:4173
```

`serve.py` is a ~17-line static file server with caching disabled so edits
appear on reload. **It is a development tool and is never deployed.**

> **Why a server at all?** The app uses ES modules and `fetch`, which browsers
> block over `file://`. Opening `index.html` directly will not work.

### Optional: generating audio

Only needed to add new narrated audio. **The app runs fine without a key.**

```bash
cp .env.example .env             # then fill in ELEVENLABS_API_KEY
# or: echo "sk_..." > tools/.elevenlabs_key && chmod 600 tools/.elevenlabs_key

python3 tools/generate_sonnets.py --source ibsen --dialect rp --all --dry-run
```

Always `--dry-run` first: it reports the exact call count and character cost
and makes zero API calls. See `docs/CREDENTIAL_POLICY.md` for the billing
guards.

### Before pushing

```bash
python3 tools/security_audit.py                      # static checks
python3 tools/scan_secrets.py --worktree --history   # credential scan
```
Plus, with the app running, in the browser console:
```js
import('./tests/security.test.js').then(m => m.run());   // expect 20/20
```
And walk the regression block in `TESTING.md`.

## Staging

**There is no staging environment.** This is a single-environment project:
`main` → production.

The closest equivalents, in increasing fidelity:

1. **Local** — `python3 serve.py` (what you develop against).
2. **Artifact preview** — build and serve exactly what would be published:
   ```bash
   python3 tools/build_artifact.py _site
   cd _site && python3 -m http.server 4199
   ```
   This is the highest-fidelity check available. It catches "works locally,
   broken in production" problems caused by files that are not published.
3. **A branch deploy** — if a real staging target is ever wanted, point
   Cloudflare Pages or Netlify at a branch using the configs in `deploy/`.
   That would also gain the security headers GitHub Pages cannot send.

**Recommendation:** run step 2 before any release that touches file layout,
the build allow-list, or asset paths.

## Production

Automatic on push to `main`, via `.github/workflows/deploy.yml`.

```
push to main  (or manual: Actions → Deploy to GitHub Pages → Run workflow)
   │
   ├─ job: audit                      timeout 5m,  permissions: contents:read
   │    ├─ checkout (SHA-pinned, fetch-depth 1, persist-credentials false)
   │    ├─ python3 tools/security_audit.py
   │    └─ python3 tools/scan_secrets.py --worktree --history
   │         ↳ ANY finding fails here and the deploy never runs
   │
   └─ job: deploy   needs: audit      timeout 10m
        permissions: contents:read, pages:write, id-token:write
        ├─ checkout (SHA-pinned)
        ├─ configure-pages
        ├─ python3 tools/build_artifact.py _site     ← allow-list build
        ├─ python3 tools/scan_secrets.py --artifact _site
        ├─ upload-pages-artifact  (path: _site)
        └─ deploy-pages           → GitHub Pages
```

**What actually gets published:** only `index.html`, `manifest.json`, the two
icons, and `css/ js/ audio/` with approved extensions. `tools/`, `docs/`,
`tests/`, `.github/`, `serve.py`, `voices.json` and every dotfile are excluded
by the allow-list — verified by serving the artifact and confirming they 404.

Every action is pinned to a verified full commit SHA. Two other workflows run
independently: `credential-scan.yml` (push, PR, weekly) and `codeql.yml`
(push, PR, weekly).

Expected time from push to live: **1–3 minutes.**

### Verifying a deploy

```bash
gh run list --workflow=deploy.yml --limit 3
curl -sI https://frankierocco3-coder.github.io/IPA-App/ | head -3
```
Then load the site and confirm: home screen renders, a lesson runs, an audio
clip plays, and the console is clean.

## Rollback

Pick by urgency.

### Fast — stop serving (seconds)
Repo → **Settings → Pages → Source: None.**
Users immediately stop receiving the bad build. Use this first if deployed
code is actively harmful; investigate afterwards.

### Standard — revert the commit (1–3 min)
```bash
git revert <bad-sha>     # creates a new commit; history stays honest
git push origin main     # redeploys automatically
```
Preferred: it is auditable and cannot lose work.

### Re-run a known-good deploy
Actions → **Deploy to GitHub Pages** → open the last good run →
**Re-run all jobs.** Useful when the code is fine and the deploy itself failed.

### Multiple bad commits
```bash
git revert --no-commit <oldest-bad-sha>^..<newest-bad-sha>
git commit -m "Revert <range>: <reason>"
git push origin main
```

### Last resort — reset `main`
```bash
git reset --hard <good-sha>
git push --force-with-lease origin main
```
**Rewrites history.** `--force-with-lease` (not `--force`) so a concurrent push
is not silently destroyed. Prefer `revert` unless the bad commits contain
something that must not remain in history — and note that even then, a
committed secret must be **revoked**, not just removed.

### After any rollback
1. Confirm the live site serves the expected commit.
2. Run `python3 tools/security_audit.py` on the deployed commit.
3. If malicious code reached production, follow
   `docs/INCIDENT_RESPONSE.md` §6 — including the user-notification question,
   since deployed JS could have read every visitor's local data.

## Deployment risks

* **No staging** means `main` is production. The `audit` job is the only gate.
* **~480 MB of audio in git** makes clones and checkouts slow.
* **GitHub Pages cannot send security headers** — no `frame-ancestors`,
  `X-Frame-Options` or `Permissions-Policy`. Configs for a host that can are in
  `deploy/`.
* **A soft 1 GB Pages limit** exists; the repo is approaching it. Generating
  the remaining dialect audio would push it further. Git LFS or external asset
  hosting is the eventual fix.
