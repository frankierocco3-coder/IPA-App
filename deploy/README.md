# Optional hardened hosting

The app runs correctly on GitHub Pages today. **These files are not used by
GitHub Pages** and change nothing unless you deliberately move hosts.

## Why you might

GitHub Pages cannot send custom response headers. That means three protections
are simply unavailable there, no matter what the app does:

| Protection | Effect of its absence | Current mitigation |
|---|---|---|
| `frame-ancestors` / `X-Frame-Options` | the app can be framed (clickjacking) | JS frame-buster — bypassable by a sandboxed iframe |
| `Permissions-Policy` | no browser-enforced cap on camera/geolocation/etc. | the app never requests them |
| `X-Content-Type-Options`, `Referrer-Policy` as headers | weaker defaults | `<meta name="referrer">` covers referrer; Pages serves correct MIME types |

Moving to Cloudflare Pages or Netlify closes those gaps. Both keep the app
static and free, and neither requires a backend.

## Files

* `_headers` — Cloudflare Pages / Netlify format.
* `netlify.toml` — equivalent, if you prefer TOML.

## Deliberately NOT included

`Cross-Origin-Embedder-Policy: require-corp` and
`Cross-Origin-Opener-Policy: same-origin` were considered and **left out**.
They are frequently recommended, but COEP in particular breaks blob URLs and
media loading patterns in some browsers, and this app depends on both for
recording playback. They buy nothing here (no `SharedArrayBuffer`, no
cross-origin isolation requirement) and risk breaking the core feature.
Do not add them without testing recording, playback, Compare and downloads in
Chrome, Firefox and Safari.

## If you migrate

1. Point the host at this repository; build command: *none*; output: `/`.
2. Verify **every** item in `TESTING.md`, especially recording and playback.
3. Confirm headers landed: `curl -sI https://your-domain/ | sort`.
4. Then you may delete the frame-buster in `js/main.js` — the header supersedes it.
