# Security checklist

Run before merging anything that touches rendering, imports, storage, the
microphone, or a workflow.

## Automated (must pass)

```bash
python3 tools/security_audit.py          # exits non-zero on a real problem
```
```js
// browser console, app running
import('./tests/security.test.js').then(m => m.run());   // expect 0 failed
```

## Per-change review

### Rendering
- [ ] Every interpolation of user data goes through `esc()`.
- [ ] No `innerHTML` built from a project field, note, dictionary entry,
      filename or imported value without escaping.
- [ ] No `eval`, `new Function`, `document.write`, string `setTimeout`.
- [ ] No inline `on*=` handlers in template strings.
- [ ] New user-facing text added to the XSS payload test if it's a new field.

### Imports
- [ ] New fields added to the schema in `js/validate.js` with a length limit.
- [ ] Enumerated values validated with `oneOf`.
- [ ] Nothing spread/`Object.assign`ed from parsed JSON into app state.
- [ ] Ids regenerated, never taken from the file.
- [ ] A destructive import still shows a summary and asks first.

### Storage
- [ ] Nothing secret written to localStorage or IndexedDB.
- [ ] Deletion removes metadata **and** blobs.
- [ ] Object URLs revoked when replaced or deleted.
- [ ] Data read back from storage is treated as untrusted.

### Microphone
- [ ] `getUserMedia` only inside an explicit user action.
- [ ] All tracks stopped on stop, cancel, error and unload.
- [ ] State announced via `aria-live`.

### Workflows
- [ ] Every `uses:` pinned to a 40-char commit SHA with a version comment.
- [ ] SHA verified against the official repo (do not copy from a blog).
- [ ] Job has the minimum `permissions` and a `timeout-minutes`.
- [ ] No `pull_request_target`, no self-hosted runner, no piping remote scripts to a shell.

### Network
- [ ] No new external origin — the app must stay fully self-hosted.
- [ ] No new fonts, CDNs, analytics or crash reporting.

## Known accepted weaknesses

| Item | Why it stays | What would fix it |
|---|---|---|
| `style-src-attr 'unsafe-inline'` | Dynamic CSS variables (`--track-color`, `--dx`, progress widths) are set via `style=""`. Values are always app-generated numbers/palette colours, never user input. | Pre-generate a CSS class per track colour and per path offset, then drop the directive. Medium-sized refactor of `renderTrack`/`renderHome`. |
| No `frame-ancestors` / `X-Frame-Options` | GitHub Pages cannot send custom headers, and meta CSP ignores `frame-ancestors`. Mitigated by a JS frame-buster. | Host on Cloudflare Pages or Netlify using `deploy/` configs. |
| No `Permissions-Policy` | Same header limitation. | Same. |
| Local data unencrypted | No accounts, so there is no key to encrypt with. | A user passphrase + WebCrypto; changes the product. |
| Escaping is a hand-written `esc()` | It is applied consistently and verified by test; replacing every template with DOM construction would be a full rewrite of `main.js`. | Incrementally move high-risk views to `textContent`/`createElement`. |
