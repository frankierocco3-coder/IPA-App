# Building the Android shell

Written 2026-10-06, after the iOS shell compiled and ran. **The Android shell
has still never been compiled.** This is the walkthrough for the first time,
and the first build will want corrections — iOS wanted one and it was a real
one.

**You run this.** It needs Android Studio, which is yours to install.

---

## Before you start

**Disk: 44 GB free.** Android Studio is about 1.2 GB to download and roughly
10 GB installed, the SDK adds a few GB, and an emulator system image is
another ~1.5 GB. That fits, but not with room to spare — Xcode already took
its share today. If it gets tight, `~/Downloads` still holds about 11 GB of
installers and duplicate video.

**There is no Android device in the house**, so the emulator is the only way
to see this run before submission. Worth knowing honestly: nobody will have
seen it on real hardware.

---

## 1 · Install Android Studio

<https://developer.android.com/studio>. Take the defaults; they include the
JDK, Gradle, the SDK and the emulator, none of which exist on this Mac.

---

## 2 · Create the project — the template choice matters

**New Project → "Empty Views Activity".** NOT "Empty Activity", which is the
Compose template and drags in a UI toolkit this app has no use for: the whole
Android app is one WebView.

| Field | Value |
| --- | --- |
| Name | Speechcraft |
| Package name | `com.speechcraft.app` |
| Language | Kotlin |
| Minimum SDK | API 24 |

**The package name must match exactly.** `build.gradle` sets
`namespace 'com.speechcraft.app'` and `MainActivity.kt` declares that
package; a mismatch fails to build.

This step exists because the three files in `shells/android/` are not a
project. They reference `@mipmap/ic_launcher` and `@style/Theme.Speechcraft`,
which the template generates. Copying them into a bare module fails with a
resource error that does not explain itself.

---

## 3 · Drop the shell files in

- `shells/android/MainActivity.kt` → `app/src/main/java/com/speechcraft/app/`
  (replace the generated one)
- `shells/android/AndroidManifest.xml` → `app/src/main/`
  (replace; keep the template's `android:roundIcon` line if it has one)
- `shells/android/build.gradle` → `app/build.gradle` (replace)

Delete the generated `activity_main.xml` layout. `MainActivity` builds its
view in code and never inflates one.

---

## 4 · Build the payload and put it in assets

```bash
python3 tools/build_shell_payload.py build/payload
```

Copy the **contents** of `build/payload` into `app/src/main/assets/`, so you
end up with `assets/index.html` and `assets/IPA-Audio/…`, not
`assets/payload/…`.

**117 MB**, of which 83 MB is course audio: 4,082 mp3 files and 138 images,
all already compressed. `build.gradle` sets `noCompress` for those extensions
so Gradle does not waste build time re-compressing them for nothing.

Expect the first build to be slow. It is copying 117 MB.

---

## 5 · Run it on an emulator

Device Manager → Create Device → any recent phone → a system image at **API
35**, matching `targetSdk`. The edge-to-edge behaviour below only appears at
API 35, so an older image would hide the exact thing worth checking.

---

## What to look at first, and why

**1 · Does it boot at all?** A blank screen is the failure mode both shells
are built to avoid. On Android the payload is served over a real https origin
by `WebViewAssetLoader`, so modules load and `sw.js` registers — this half is
genuinely easier than iOS.

**2 · The system bars.** The workspace chip must sit *below* the clock, and
the bottom nav *above* the gesture bar. `MainActivity` applies the insets as
padding, added 2026-10-06 — Android 15 draws edge-to-edge by default at
`targetSdk 35`, and without this the app would run under both. iOS had the
identical bug and it looked exactly like a blank-screen failure.

**3 · Audio.** Tap a sound page and a word chip. This is the first time the
`noCompress` assets have been played from an APK.

**4 · The hardware back button.** From a lesson it should go back one page.
From the home screen it should leave the app. It calls `window.__shellBack()`
in `js/ui.js`, which closes a dialog, then the notebook, then pops a page,
and answers false only at the root.

**5 · Background and return.** Press home mid-audio. It should stop, not
carry on over whatever you open next. `onPause`/`onResume` were added
2026-10-06 for this.

---

## Size, for the Play listing

The APK will be roughly 120 MB. Google Play wants an **AAB** rather than an
APK for new apps, and an AAB's download size limit is comfortably above this,
so bundling the course audio is fine. The 213 MB of sonnet narration is
deliberately **not** in the payload — it downloads on request, which is the
whole reason `INTERNET` is declared.

---

## Signing

The `release` build type currently uses `signingConfigs.debug`, marked
`REPLACE before publishing` in `build.gradle`. A debug-signed build cannot be
uploaded to Play. Generating an upload key is yours and should happen after
the first successful run, not before.

---

## What this does not settle

- **Nothing has run on real Android hardware.** The emulator is a good
  rehearsal and not the performance.
- **No voice has been ear-checked** on Android, same as everywhere else.
- The Play **data safety** answers are in `docs/STORE_LISTING.md`: nothing
  collected, nothing sent, with the one outbound request being narration the
  reader asked to keep.
