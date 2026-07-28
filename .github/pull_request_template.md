## What changed

## Security checklist

Tick what applies; delete what does not. Full list in `docs/SECURITY_CHECKLIST.md`.

- [ ] `python3 tools/security_audit.py` passes
- [ ] `tests/security.test.js` passes with 0 failures
- [ ] No new external origin (no CDN, font, analytics, remote script)
- [ ] User data rendered through `esc()` — no raw interpolation into HTML
- [ ] New imported fields validated in `js/validate.js` with a length limit
- [ ] No secret added to code, storage, or a committed file
- [ ] Any new GitHub Action pinned to a full commit SHA with a version comment
- [ ] Microphone code still releases every track on stop/cancel/error/unload
- [ ] Destructive actions still confirm first
- [ ] Regression block in `TESTING.md` walked
