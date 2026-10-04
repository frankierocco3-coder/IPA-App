# Store plan — App Store and Google Play

Written 2026-10-03, on the owner's direction to ship Speechcraft to both
stores. Everything under **Measured** was taken off this machine today.
Everything under **Unknown** is marked as unknown on purpose: this repo
does not claim what it has not checked.

Nothing here has been built. This is the decision document that comes
first.

---

## The short version

The app is 33MB and entirely static, which makes it unusually easy to
package. The audio is 305MB, which is the whole problem — and **223MB of
that is sonnet narration**, not course material. Split those two apart and
the problem mostly dissolves.

The two stores want genuinely different things, so they get different
routes. Android is nearly free. iOS is where the work is.

---

## Measured

Exact per-file totals from `tools/split_audio.py` (2026-10-04). The
folder-level `du` estimates this document first carried were high, because
`du` counts block allocation rather than bytes.

| Set | Files | Size | In a store build |
| --- | --- | --- | --- |
| App artifact (`build_artifact.py`) | | **33 MB** | bundled |
| **COURSE** audio | **4,084** | **75.6 MB** | **bundled** |
| **NARRATION** audio | **5,159** | **212.9 MB** | downloaded on demand |
| Audio total | 9,243 | 288.5 MB | |

COURSE is the five dialects, the 42 phoneme recordings and both indexes.
NARRATION is per-line sonnet readings. The tool proves the two sets are
disjoint, cover the tree, and that **every one of the 4,040 clips the app
can ask for by name is in the course set** — so the bundle is sufficient
offline, not merely plausible.

**App + course audio ≈ 109 MB.** Apple's over-the-air limit is around
200MB, above which a first download is wifi-only. 109MB sits under it with
room to spare. Bundling everything would be 321MB and does not.

Also measured:

- `AUDIO_BASE = new URL('../../IPA-Audio/', import.meta.url)` — resolves
  relative to the module, which is why it works from Pages, from
  `serve.py` and from the test runner alike.
- CSP is `connect-src 'self'; media-src 'self' blob:` — strict, and a
  remote audio origin would require changing it.

---

## Decision 1 — the audio (the real one)

**DONE 2026-10-04, as far as it can go without a packager.**
`tools/split_audio.py` partitions the tree, verifies the partition and can
materialise either half. It moves nothing: IPA-Audio is a published Pages
site that the live app resolves against with a relative URL, so physically
restructuring it would break every clip for every existing user to serve a
bundler that does not exist yet.

```bash
python3 tools/split_audio.py                                  # classify and verify
python3 tools/split_audio.py --emit course --out build/audio  # the bundle set
```

Hard-links by default, so emitting a 200MB set costs no extra disk
(`--copy` when the output crosses volumes or gets zipped).

**THE ONE WAY TO SHIP A LIE, and it is now proven closed.**
`js/data/audio-coverage.js` is generated from what is on disk and is the
single truth source for which voices the reader presents as recorded. A
bundle without narration that kept the existing coverage file would show
recorded-audio badges for narration it does not have, and because playback
is strict, tapping one would be silent. Regenerating against a course-only
tree takes the claims to **nam 0, rp 0, aus 0, ssbe 0** — the reader then
badges nothing and claims nothing. Verified end to end on 2026-10-04.

```bash
SPEECHCRAFT_AUDIO_DIR=<course tree> python3 tools/longform_coverage.py
```

**Not wired into the deploy gate, deliberately.** An unclassified folder is
an error inside the tool, but failing the *web* deploy over a *packaging*
classification is the wrong scope: the web build bundles nothing. The
check fails loudly wherever a bundler runs it, which is where it matters.

**Recommendation stands: bundle the 75.6MB of course audio, make the
212.9MB of sonnet narration an optional in-app download.**

Why this is the right cut and not a compromise:

- Course audio is what the product *is*. A dialect trainer that needs a
  network to play a vowel is broken.
- Sonnet narration is a reader enhancement on one shelf. It is already
  incomplete and says so (nam 151/154, rp 153/154, aus 59, ssbe 0).
- It keeps the binary under Apple's cellular limit.
- `AUDIO_BASE` resolving against the module means that if `IPA-Audio/`
  sits beside the app root inside the bundle, **the existing URL resolution
  may work unchanged**. That needs proving (see Unknowns), but the code was
  written in a way that gives it a real chance.

The alternatives, honestly:

- **Bundle everything (338MB).** Allowed — Apple's ceiling is 4GB — but
  wifi-only first install, a slow download, and 223MB of it is narration
  most users will never open.
- **Stream all audio from Pages.** Smallest binary, no offline audio, and
  it needs the CSP opened up. It also makes the app depend on a GitHub
  Pages site staying up, which is fine for a beta link and poor for a paid
  store listing.

---

## Decision 2 — packaging, and the Node question

**This is the one that touches a stated hard constraint.** Rule 1 in
CLAUDE.md is zero build step, no `package.json`, no `node_modules`, and it
says not to introduce one without being asked explicitly. Going to the
stores forces the question.

**Capacitor** is the conventional answer and needs Node and npm. It would
not change how the app is written — it copies a static web directory — but
it puts npm tooling in the repo.

**Hand-written shells** need no Node at all. For an app that is pure
static files, each shell is genuinely small: a WKWebView on iOS loading
bundled local files, a WebView on Android doing the same.

**Recommendation: hand-written shells.** The constraint is worth keeping,
and Capacitor's value is its plugin ecosystem, which this app barely
touches — no camera, no push, no native storage. What it needs is a
window. Writing that window directly costs less than maintaining a
toolchain the app does not otherwise use.

**This is still your call, because it is your rule.** If you would rather
have Capacitor's conveniences — icon and splash generation, one project
for both platforms — say so and the constraint gets amended deliberately
rather than eroded.

---

## Decision 3 — the Android route

Android has a path iOS does not: a **Trusted Web Activity**, which is
Google's official, supported way to put a PWA on Play. It wraps the *live*
site, so there is no audio to bundle and no CSP to change, and the
existing service worker keeps offline working because a TWA runs on
Chrome.

That would make Google Play close to free. The catch is that a TWA must
prove it owns the domain through Digital Asset Links, a file at
`frankierocco3-coder.github.io/.well-known/assetlinks.json`. That is the
*user* site root, not this project site, so it means creating a
`frankierocco3-coder.github.io` repository. Without verified links the app
shows a browser URL bar, which is a poor store experience.

**Recommendation: try the TWA, with a bundled WebView as the fallback.**
And note that a **custom domain** would solve the asset-links question
cleanly and look better on a store listing than a github.io URL. Worth
considering regardless.

---

## What the stores want

Both, and we have most of it:

- Icons and screenshots at several device sizes — the visual identity
  exists; the screenshots do not.
- **A privacy policy at a public URL.** We have a Privacy *page*, but
  routing here is function-based, not URL-based, so **there is no link that
  opens it**. This needs a small static `privacy.html` beside `index.html`.
  Same for Terms. Small, real, and currently missing.
- A support contact. The Feedback page points at GitHub Issues, which is
  allow-listed already and should satisfy it.
- Age rating and content questionnaires.
- Apple's privacy "nutrition label" — genuinely easy, because the honest
  answer throughout is *collects nothing, no accounts, no analytics, no
  third-party anything*. That is a selling point, not a chore.

---

## What shipping fixes, and what it breaks

**Fixes:** a packaged app's storage is not subject to WebKit's seven-day
eviction. **S2 largely dissolves for store users.** It does not dissolve
for anyone using the web version.

**Breaks:** a store app and the web app have **separate storage**. Someone
who has been using the Pages site and installs from a store **arrives at
an empty app**. There is no migration path and there cannot easily be one.
Export and import is the only bridge — which is exactly why test 4.1 in
[DEVICE_TEST_IPHONE.md](DEVICE_TEST_IPHONE.md), *does Export actually
produce a file on iOS*, is now a gating question rather than a curiosity.

---

## Costs

| Item | Cost |
| --- | --- |
| Apple Developer Program | **$99 / year** |
| Google Play Console | **$25 once** |
| Xcode | free, but **~10GB** and your Apple ID |
| Custom domain (optional) | ~$10-15 / year |

---

## Blockers only you can clear

1. **Xcode is not on this Mac** — Command Line Tools only, checked
   2026-10-02 when looking for a simulator. iOS cannot be built or
   submitted without it.
2. **Both developer accounts** need your identity and your card.
3. **Decision 2** is a change to your own hard constraint.
4. **Signing and submission** are yours throughout. Certificates, review
   replies, store listings.

---

## Recommended sequence

1. **Run the device test first.** It is written and waiting. On iOS every
   webview is WebKit, so whatever it finds in Safari is what the shipped
   app does. Answer 4.1 especially — it decides whether migration is
   possible at all.
2. **Add `privacy.html` and `terms.html`.** Small, needed by both stores,
   and useful on the web regardless.
3. **Split the audio** into course (~82MB) and narration (223MB), and
   prove the bundled path resolves.
4. **Google Play**, via TWA if asset links work, bundled WebView if not.
   Cheap, fast, low rejection risk, and it proves the packaging.
5. **iOS**, once Android is through and Xcode is installed.

---

## Unknown — needs a test, not an opinion

Listed because guessing at these is how a plan becomes wrong.

- **Does `AUDIO_BASE` resolve correctly inside a packaged bundle?** The
  relative-URL design gives it a good chance. Unproven.
- **Do service workers run in the iOS shell?** They work in Safari and in
  Chrome-backed TWAs. In a plain WKWebView with bundled local files they
  historically do not, and the app's offline audio caching lives in
  `sw.js`. If they do not run, offline audio on iOS needs another
  mechanism. **This is the biggest unknown in the plan.**
- **Apple Guideline 4.2.** Bundling assets locally is the accepted answer
  to "this is just a website", but review outcomes are not predictable.
- **Does Export work on iOS at all** (device test 4.1).
- **Does the silent switch mute course audio** (device test 3.1). If it
  does, it matters more in a store app than on a web page.

---

## One thing worth saying once

Nothing in the course content has been reviewed by a named specialist:
137 lesson records, 645 Words & Expressions entries, 36 Rhetoric chapters,
the sonnets. Every surface says so honestly, and that honesty is why it
has been fine to ship as a beta link.

A store listing is a different context. It is not a rejection risk and it
does not block anything here. It is simply worth deciding, deliberately
and once, that you are content to publish it in that state — because the
store is where it stops being something you sent people and becomes
something strangers find.
