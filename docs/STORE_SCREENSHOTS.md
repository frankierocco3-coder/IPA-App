# Store screenshots

Chosen by the owner 2026-10-05 from 22 candidates. These are **photographs of
the real app running on iOS**, not mockups and not the web version resized:
the shell was compiled, installed on an iPhone 18 Pro Max simulator and driven
screen by screen.

Final set: `build/store-upload/`. That directory is gitignored, because it is
regenerable and the payload beside it is 108MB.

## Size

**1320 x 2868**, Apple's 6.9-inch iPhone requirement, captured natively rather
than scaled up from a smaller device. App Store Connect accepts one iPhone size
and scales down for the rest, so this set is sufficient alone. Up to ten are
allowed; six is a complete argument.

## The set, in upload order

The order is the argument.

**1. `1-the-walk.png` — Pantalone, the walk in three moments.** The hook. A
drawn figure mid-stride across three keyframes, with the base stance above it.
It lands with no reading at all, and nothing else in the category looks like
it. Carries its own caption: *a teaching interpretation, not a historical
record.*

**2. `2-ipa-course.png` — IPA Foundations.** Answers what the first image
raises: this is a structured course, not a picture book. 30 steps, Unit 1 Short
Vowels, a path with checkpoints.

**3. `3-five-accents.png` — the accent courses.** Neutral American, Traditional
RP, Standard British, Cockney, Australian, each with its step count. Scope, in
one screen.

**4. `4-reader-modes.png` — six ways into one text.** Listen, Scan, IPA, Plain
Meaning, Side by Side, In Today's Voice, on a single row of tabs over
Shakespeare. The tooling.

**5. `5-text-library.png` — the material.** 154 sonnets, a 160-word
Shakespeare dictionary, Chekhov, O'Neill, Wilde, Pirandello, Ibsen, each with
its provenance and translator named.

**6. `6-words-expressions.png` — the detail.** 246 entries with definitions,
example lines, and usage notes that say when a sense is period-only.

## What is deliberately not in them

- **No first-run wall.** "Why Speech Matters" is the right opening for a
  learner and the wrong one for a listing that has about a second to say what
  the app is.
- **No fabricated progress.** Every capture is a genuine fresh install, so
  counters read zero. Dressing them up would be inventing a user.
- **No captions or device frames.** Apple accepts bare screenshots. Marketing
  overlay is a separate decision, easier to add later than to undo.

## A defect these caught

The first capture attempt showed the workspace chip **drawn underneath the
status bar**, with the clock on top of it. `css/style.css` reads
`env(safe-area-inset-bottom)` for the nav bar but never the top one, because in
a browser Safari's own chrome supplies that gap and the page never needs it. A
full-screen `WKWebView` has none.

Fixed in `shells/ios/ViewController.swift` by pinning the webview's top to the
safe area, **not** in the web layer: the page is correct for a browser, and
adding `viewport-fit=cover` to `index.html` would have changed the live site
for every existing user to suit a shell that is not shipped yet.

## Regenerating

```bash
python3 tools/build_shell_payload.py build/payload
SDK=$(xcrun --sdk iphonesimulator --show-sdk-path)
xcrun swiftc -sdk "$SDK" -target arm64-apple-ios15.0-simulator \
  -module-name Speechcraft -o build/Speechcraft.app/Speechcraft shells/ios/*.swift
cp -R build/payload build/Speechcraft.app/www
xcrun simctl boot    "iPhone 18 Pro Max"
xcrun simctl install "iPhone 18 Pro Max" build/Speechcraft.app
xcrun simctl launch  "iPhone 18 Pro Max" com.frankierocco.speechcraft
xcrun simctl io      "iPhone 18 Pro Max" screenshot <name>.png
```

The `Info.plist` is hand-written for this path; `shells/README.md` carries it,
and the reason `-module-name` must match the scene delegate class name.

**Finding the commedia art again:** it is in `ch-cm-pantalone`, whose blocks run
mask → at a glance → relationships → physical breakdown → **stance → walk** →
find it. The same three-slot pattern (`cm-<id>-mask/-stance/-walk`) repeats for
all ten characters, so any other face is one lesson-picker tap away.

## Still outstanding for the listing

**Icons.** Only `icon-180.png` and `icon-512.png` exist. App Store Connect
wants **1024x1024, no alpha, no rounded corners**, and it cannot be upscaled
from 512 without looking it. This needs the source artwork and is a genuine
submission blocker.

**An iPad set**, only if the app is ever submitted for iPad. It declares
`UIDeviceFamily = [1]`, iPhone only, so this set is complete as it stands.
