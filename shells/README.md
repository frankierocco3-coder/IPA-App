# Native shells — iOS and Android

Hand-written, by owner decision 2026-10-04, over Capacitor. Capacitor
would have needed Node and npm in the repository, which collides with
hard constraint 1 (zero build step, no `package.json`, no
`node_modules`). For an app that is entirely static files, a shell is
little more than a window, and writing the window directly costs less
than maintaining a toolchain the app does not otherwise use.

Both shells are windows onto one directory: the payload built by
`tools/build_shell_payload.py`. Neither contains any product behaviour.
If something needs to change about how Speechcraft works, it changes in
the web layer and both shells get it.

---

## What is verified, and what is not

Said plainly, because this is the part that is easy to overclaim.

**Verified on this machine (2026-10-04):**

- The payload builds: **108.4 MB** — 32.8MB app, 75.6MB course audio.
- Served at a root, **the app boots and the shell renders**.
- `AUDIO_BASE` resolves to `/IPA-Audio/` **with no app code change**, a
  real clip fetches `200 audio/mpeg`, and `index.json` resolves.
- Narration is absent (`404`) **and unclaimed** — coverage reads
  `nam 0, rp 0, aus 0, ssbe 0`, so the reader badges nothing it lacks.
- The Swift sources **parse** (`swiftc -parse`, Swift 6.3.3).

**Verified 2026-10-05, once Xcode 27 was installed:**

- The iOS shell **type-checks** against the real iOS 27 Simulator SDK —
  not just syntax this time, so `UIKit` and `WebKit` genuinely resolve.
- It **compiles, installs, launches and renders** on an iPhone 17
  simulator (iOS 27). The first-run wall draws in the right type and the
  right colours, Continue advances, Back appears: routing, the nav stack
  and the module graph all run over the custom scheme from the bundle.
- The first build wanted exactly one correction, and it was a real one —
  see below.

**THE CORRECTION THE FIRST BUILD FORCED.** The shell built its `UIWindow`
in `AppDelegate`, the pre-iOS-13 single-window shape. Against the iOS 27
SDK that does not warn: the app **traps at launch** inside
`__UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption`, before
one line of Speechcraft runs. On screen it was a blank white page —
indistinguishable from the failure the Safari audit was about, and nothing
to do with the web layer. `SceneDelegate.swift` now owns the window, the
`UIApplicationSceneManifest` names it, and Apple requires submissions to
be built against a recent SDK, so there was never a version of shipping
that avoided this.

**STILL NOT verified:**

- **The Android shell has never been compiled.** There is no Java, Gradle,
  Android SDK or Android Studio on this machine.
- No physical device has opened either shell, and **audio has not been
  heard** — `BundleSchemeHandler`'s `206` range support is exercised by
  playback, which needs an ear, not a simulator.
- Nothing is signed. Signing needs the Apple developer account.

---

## Build the payload first

```bash
python3 tools/build_shell_payload.py build/payload
```

It assembles the app artifact (an allow-list, so nothing stray rides into
a binary), emits the course audio beside it, and regenerates
`audio-coverage.js` against that tree so the reader cannot badge
narration the bundle does not carry. The repository's own generated files
are restored afterwards.

Pass `--copy` when the output will be zipped or crosses a volume; the
default hard-links and costs no extra disk.

**Layout, and why:**

```
build/payload/index.html, js/, css/, img/, sw.js, privacy.html
build/payload/IPA-Audio/index.json, nam/, rp/, aus/, ssbe/, cockney/, phonemes/
```

`js/audio.js` resolves clips with `new URL('../../IPA-Audio/',
import.meta.url)`. Served from the payload root that module is at
`/js/audio.js`, so the base resolves to `/IPA-Audio/` — the same answer it
gets on Pages. The relative URL was written in 2026-09 for the
sibling-Pages-site move and happens to be exactly what a bundle needs.

---

## iOS

Files: `AppDelegate.swift`, `SceneDelegate.swift`, `ViewController.swift`,
`BundleSchemeHandler.swift`.

In Xcode: new iOS App, Swift, **no storyboard** (delete
`Main.storyboard` and the `UIKit Main Storyboard` key in Info.plist), add
the four files, then drag `build/payload` in as a **folder reference**
named `www` — blue folder, not yellow. A group flattens the tree and the
app will not find `js/main.js`.

Keep the template's `UIApplicationSceneManifest` and point its
`UISceneDelegateClassName` at `SceneDelegate` (`$(PRODUCT_MODULE_NAME).SceneDelegate`).
Without the manifest the app traps at launch on iOS 13 and later — see the
correction note above.

**A simulator build needs no developer account**, which is how this was
first run. Without an Xcode project at all:

```bash
SDK=$(xcrun --sdk iphonesimulator --show-sdk-path)
xcrun swiftc -sdk "$SDK" -target arm64-apple-ios15.0-simulator \
  -module-name Speechcraft -o Speechcraft.app/Speechcraft shells/ios/*.swift
cp -R build/payload Speechcraft.app/www       # plus a hand-written Info.plist
xcrun simctl install booted Speechcraft.app && xcrun simctl launch booted com.frankierocco.speechcraft
```

Hand-writing the `Info.plist` means `$(PRODUCT_MODULE_NAME)` is not
substituted: write the module name literally (`Speechcraft.SceneDelegate`)
and pass `-module-name Speechcraft` so the two agree.

**Why a custom scheme and not `loadFileURL`.** Speechcraft is vanilla ES
modules. A module script fetched from `file://` is blocked by CORS,
because a `file://` page has an opaque origin and module loading is
CORS-governed. Loading the bundle as files does not misbehave, it fails
to boot — the same blank screen the Safari audit was about, reached from
the other end. A custom scheme gives the page a real origin.

**What that costs.** A custom scheme is not http(s), so **service workers
do not register**. Checked and safe: the app registers `sw.js` inside a
`.catch()` and only warns, and a bundled app has nothing to cache because
every file is already local. It does mean a future narration download
cannot reuse `sw.js` and needs its own storage.

**Range requests are not optional.** `<audio>` asks for every clip with a
`Range` header, not only when seeking, and Safari will not play a `200`
handed back to a range request. `sw.js` learned this in 2026-09;
`BundleSchemeHandler` implements `206` for the same reason.

---

## Android

Files: `MainActivity.kt`, `AndroidManifest.xml`, `build.gradle`.

Put the payload at `app/src/main/assets/` (so `assets/index.html` and
`assets/IPA-Audio/...`).

**The manifest expects two resources this directory does not contain:**
`@mipmap/ic_launcher` and `@style/Theme.Speechcraft`. A new Android Studio
project provides both, so create the project first and add these files to it;
copying the three files into a bare module fails to build with a resource
error that does not say why.

**SYSTEM BARS ARE THE APP'S PROBLEM AT `targetSdk 35`.** Android 15 draws
edge-to-edge by default at that target, so an unpadded WebView runs under the
clock and the gesture bar. `MainActivity` applies the insets as padding and
paints the WebView the app's background colour.

This cannot be fixed in the web layer. `css/style.css` reads
`env(safe-area-inset-bottom)` for the nav bar, but `env()` only reports real
values when the viewport meta carries `viewport-fit=cover`, and `index.html`
deliberately does not — adding it would change the live site for every
browser user to suit a shell that is not shipped. iOS has the same correction
for the same reason, in `ViewController.swift`.

Android is the easier half. `WebViewAssetLoader` serves over a real
**https** origin, so modules load, fetch is same-origin, **and service
workers register** — `sw.js` works exactly as it does on Pages and the
app's offline caching comes along for free.

The handler is mounted at `/`, not the usual `/assets/`, so the payload's
own layout is preserved. Under `/assets/` the app would sit at
`/assets/js/audio.js` and send the clip lookup to `/IPA-Audio/`, outside
the handler, where nothing answers.

**No INTERNET permission is declared**, deliberately. Everything is served
from the APK and the app makes no external requests. An app that cannot
reach the network cannot leak anything, and the Play privacy declaration
becomes simple and true. Add it only when narration becomes a real
download, and say so in the listing.

---

## The back button

**Done 2026-10-04** (option 2 of the three that were on the table; the
owner chose the hook over pushing real history entries, which would have
changed back behaviour on the web too).

Routing in Speechcraft is **function-based, not URL-based**: the back
stack is a JavaScript array of thunks in `js/ui.js` and nothing is pushed
to browser history, so `WebView.canGoBack()` is always false and the
system button would leave the app from any screen.

`js/ui.js` exports **`shellBack()`**, exposed as `window.__shellBack`.
It works innermost outwards and returns whether it handled the press:

1. an open dialog closes;
2. otherwise the notebook dock closes;
3. otherwise one page pops;
4. otherwise it answers **false**, and the shell leaves the app.

Each layer is closed through its own control rather than by synthesising
an Escape key — both already close on Escape, but one synthetic Escape
reaches both listeners and would shut a dialog and the notebook on a
single press.

`MainActivity` calls it through `evaluateJavascript` inside an
`OnBackPressedCallback` and calls `finish()` on anything but `"true"`,
which also covers the window before the page has booted, when the hook
does not exist and the result is `"null"`.

**The trap, recorded because a source-only check could not see it.** Home
is NOT on the stack: `goBack()` falls through to `homeHandler()` when it
pops the last entry, so **one** entry is already a real page with
somewhere to return to. A first draft tested `navStack.length > 1` and
would have exited the app from every single-level page. Driven checks in
the suite now pin all four outcomes.

iOS needs none of this: there is no system back button, and the
edge-swipe gesture is disabled (`allowsBackForwardNavigationGestures =
false`) because there is no history to swipe through.

---

## Still open, from docs/STORE_PLAN.md

- A **custom domain**, which would solve Android's Digital Asset Links if
  a Trusted Web Activity is ever preferred to this bundled WebView, and
  reads better on a listing than a github.io URL.
- **Narration on demand**: 212.9MB, and on iOS it cannot use `sw.js`.
- Icons, screenshots, age ratings, and the two developer accounts.
