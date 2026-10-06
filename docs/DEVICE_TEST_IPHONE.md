# Device test — iPhone

Written 2026-10-02, after the Safari audit. **Frankie runs this. Nobody
else can.**

## Why this exists

This machine has no Node and no Safari. Chromium is the only browser and
the only JavaScript parser here, so every Safari claim in the audit was
proved as a property of the source, never by watching the app run. That is
the strongest thing one engine can say about another, and it is not the
same as knowing.

It is also the standing gap in the repo: *"Only tested in Chromium.
Firefox and Safari untested."* This run closes the Safari half of it.

**Time:** about 40 minutes, plus a seven-day wait at the end.
**Bring:** the iPhone, and somewhere to type answers.

---

## Before you start — record these

These decide what the run actually proves, so fill them in first.

```
Device:            (e.g. iPhone 13 mini)
iOS version:       (Settings → General → About → Software Version)
Last opened app:   (roughly how long since you last used Speechcraft)
Installed?:        (is it already on your home screen, or Safari only)
```

---

## Part 0 — make sure you are testing the new build (2 min)

The service worker serves JavaScript and CSS **stale-while-revalidate**:
the first load after a deploy runs the OLD code and downloads the new one
in the background, and the SECOND load runs the new one. Nothing in the
interface shows a version number, so two loads is the only guarantee.

**0.1** Open <https://frankierocco3-coder.github.io/IPA-App/>

**0.2** Force-quit Safari completely (swipe up from the bottom, flick the
Safari card away). If the app is already on your home screen, force-quit
that too.

**0.3** Open it again.

> Everything below is only valid after 0.3. If you skip this you will be
> testing the build from before the fixes.

---

## Part 1 — does it work at all (5 min)

**1.1 — the one that matters most.** The app opens.

- **Expect:** the normal screen — course chip at the top, the Learn path,
  a bottom bar with six items (Learn, Practice, Studio, Library, Progress,
  More).
- **A blank white screen is the failure this whole audit was about.**
- Saw: `____________________`

**1.2** Tap all six bottom-bar items in turn.

- **Expect:** each one renders something. None blank, none frozen.
- Saw: `____________________`

**1.3** Your progress is intact.

- **Expect:** your course, your completed lessons and your Studio work are
  what you left them as — not back at the first-run walkthrough.
- The economy was removed on 2026-10-05, so there is no streak, no gems,
  no hearts and no XP to compare any more. **Progress → Statistics** is the
  place to look: *lessons done*, *days practised*, *answers given*.
- **If it is reset,** write down how long it had been since you last
  opened it. That is Part 5 happening to you already.
- Saw: `____________________`

---

## Part 2 — the three fixes from 2026-10-02 (10 min)

**2.1 — modals fit on screen (S4).** Learn → tap a **locked** node further
down the path.

- **Expect:** the popover sits fully on screen, nothing cut off at the
  bottom, and you can reach its close button without fighting it.
- Saw: `____________________`

**2.2 — overlays fit on screen (S4).** More → **Why Speech Matters**.
Walk through the panels.

- **Expect:** the Continue button is reachable on every panel, not hidden
  under the Safari toolbar.
- Saw: `____________________`

**2.3 — the notebook dock (S4).** Tap the notebook button (bottom right,
above the nav bar). Put it to half height, then full.

- **Expect at full:** the dock fills the visible screen exactly.
- **Known, already found, not fixed:** at HALF height the page behind it
  does not actually shrink — a CSS rule that has never done anything. Tell
  me how it looks and whether it bothers you. It is a one-line fix but it
  changes how a shipped screen behaves, so it is your call.
- Saw: `____________________`

**2.4 — scroll behaviour. This is the one risk MY fix introduced.** Scroll
the Learn path hard, up and down, several times.

- **Expect:** smooth.
- **Watch for:** the page height *jumping* or stuttering as the Safari
  toolbar shrinks and grows. The fix changed `100vh` to `100dvh`, and
  `dvh` follows the toolbar — which is correct for fitting, but it does
  move during a scroll.
- **If it jitters:** the remedy is one word, `svh` instead of `dvh` on the
  two `min-height` rules, because `svh` never changes while you scroll.
  Say so and I will change it the same day.
- Saw: `____________________`

**2.5 — blocked storage (S3). Optional, and reversible.** Settings →
Safari → Advanced → **Block All Cookies** ON. Reload the app.

- **Expect:** the app still opens. It may show no saved progress, which is
  correct and expected — it cannot read storage. Before the fix, this was
  a blank screen.
- **Turn Block All Cookies back OFF afterwards.**
- Saw: `____________________`

---

## Part 3 — things only a phone can show (15 min)

**3.1 — the silent switch. ANSWERED FOR THE SHELL 2026-10-06, STILL OPEN FOR
THE WEB.**

**The shell half needed no test, only a read.** Neither shell configured an
audio session, so both inherited `AVAudioSession`'s default `.soloAmbient` —
which obeys the ring switch. The answer was therefore yes: a silenced phone
gave a silent app. `shells/ios/AppDelegate.swift` now sets **`.playback`**,
which overrides the switch, and the owner kept it.

**The cost, recorded because it is a real trade and not a free win:**
`.playback` without `.mixWithOthers` also stops whatever else was playing, so
somebody studying over music loses the music. The alternative keeps their
music and mixes two streams during close listening, which is the exercise
itself. One line either way, in `configureAudioSession()`.

Verified by type-check against the iOS 27 SDK, a rebuild, and a launch on an
iPhone 18 Pro Max simulator: it renders, no crash, and the session's only
failure path logs nothing. A failure there falls back to the old behaviour
rather than refusing to start.

**THE WEB HALF IS STILL YOURS AND STILL UNANSWERED.** Safari owns its own
audio session; the shell fix does nothing for anyone using the site. So the
original test stands for the web version only:

Flip the ring/silent switch to **silent**. Then Library → IPA → open a sound
page → **Hear the sound**. (Neutral American sounds are your own recordings,
so you will know immediately whether it played.) Then flip it off and play
again.

- **Why it still matters:** the app is strict about audio by design — a
  missing clip is silence, never a substitute voice and never a message. A
  web user with that switch flipped would get an app that appears to have no
  audio at all and says nothing about why.
- Saw, silent: `__________`  Saw, not silent: `__________`

**3.2 — audio generally.** Library → Words & Expressions → a listen
button. Then Twisters & Sentences → **Hear it** on a full line.

- **Expect:** a real recorded voice.
- Note the exact word or line if anything is silent.
- Saw: `____________________`

**3.3 — the bottom of the screen.** Look at the six-item nav bar against
the home indicator.

- **Expect:** all six comfortably tappable, nothing sitting under the
  indicator bar.
- Saw: `____________________`

**3.4 — the keyboard.** Studio → open a project → edit its text.

- **Expect:** you can see what you are typing, the `Saving… / Saved ✓`
  status is visible, and the layout does not lurch when the keyboard
  opens or closes.
- Saw: `____________________`

**3.5 — rotation.** Turn the phone landscape on the Learn path and on a
lesson.

- **Expect:** readable, nothing clipped.
- Saw: `____________________`

**3.6 — offline.** Airplane mode ON. Force-quit the app. Open it again.

- **Expect:** it opens and pages work. Audio plays only for clips you have
  already played on this device, which is the honest shape of it.
- Airplane mode OFF afterwards.
- Saw: `____________________`

---

## Part 4 — the backup path, and the big unknown (10 min)

**4.1 — CRITICAL. Export actually works.** Studio → a project row →
**Export**.

- **Why this is critical:** export is the *only* backup path this app has.
  There is no backend and no account. If export does not work on iPhone,
  then there is no backup on iPhone, and the storage risk in Part 5 has no
  remedy at all.
- The app builds a file and triggers a download, which iOS Safari has
  historically handled badly.
- **Write down exactly what happens:** a share sheet? a file in Files?
  the JSON opening as text in a new tab? nothing at all?
- Saw: `____________________`

**4.1b — the other half of the bridge, and the half more likely to fail.**
Studio → **Import** → try to select the file you just exported.

- **Export alone is not a migration path.** A file you can produce and
  cannot read back carries nothing. This step was missing from the first
  version of this script, which was a real hole: 4.1 passed on
  2026-10-04 and proved only half of what it was there to prove.
- The importer uses a hidden `<input type="file" accept="application/json">`.
  iOS maps MIME types to its own UTIs inconsistently, and the file has a
  **double extension** (`.speechcraft.json`), so the picker may grey it
  out. If it does, that is an `accept` problem and a small fix.
- **Expect:** the file is selectable, imports, and the project appears in
  the list with its text intact.
- Saw: `____________________`

**4.2** Library → Personal Dictionary → **Export**. Same question.

- Saw: `____________________`

**4.3 — CRITICAL, and the single most important unknown in this run.**

**Write these down from Safari FIRST**, or there is nothing to compare
against. Progress → Statistics:

```
lessons done:    ____     days practised: ____     answers given: ____
Studio projects: ____     (any notebooks or characters? ____)
```

Then Share → **Add to Home Screen**, and open the app from the new icon.

- **The question:** are those same numbers there, or is it empty?
- **Why it matters so much:** installing to the home screen is the *only*
  defence against the seven-day storage wipe in Part 5 — it is the remedy
  we would tell every iPhone user to apply. But iOS has historically given
  home-screen web apps storage **separate from Safari**. If that is still
  true, then following our own advice would show the user an empty app and
  look exactly like losing everything.
- If it IS empty: do not panic, your Safari copy is untouched. Say so and
  the install instructions have to carry an export-and-import step.
- Saw: `____________________`

---

## Part 5 — the seven-day test (set up now, check later)

This is the one that decides whether we write the install prompt at all.

WebKit deletes all script-writable storage after **seven days without
interaction** for sites that are not installed to the home screen.
Installed web apps are supposed to be exempt. Nobody here has watched it
happen.

**Set up today:**

- **A — Safari copy.** Leave the app in a Safari tab. Do not open it again.
- **B — installed copy.** The home-screen icon from 4.3. Do not open it
  again either.
- First, make sure both show real progress worth losing. Note the
  *lessons done* and *answers given* figures here:
  `____________________`
- **Date set up:** `____________`  **Check after:** `____________` (+8 days)

**On the day, open A first, then B.**

- **A — expect:** everything gone, back to a first run. That is S2, and
  seeing it confirms the problem is real on your device and your iOS.
- **B — expect:** progress intact. That confirms installing is a real
  remedy and the prompt is worth writing.
- A gone, B intact: `____________________`

If A survives, the seven-day rule does not bite the way the documentation
says, and we should not frighten users about it. If B *also* dies, then
installing is not a remedy and export becomes the only honest answer.

---

## What this run does NOT prove

Worth being straight about.

- **If your iPhone runs iOS 17 or newer, step 1.1 does not prove the S1
  fix.** That crash only ever hit iOS 15 and early 16. On a modern phone
  1.1 proves no regression, which is worth having, but the fix itself is
  only truly provable on an old device or in a simulator.
- **No voice has ever been ear-checked** against the taught IPA. That is a
  separate pass and this is not it.
- **Android and Firefox are untouched.** Same gap, different engines.

---

## What to send back

Paste the whole thing back with the `Saw:` lines filled in, plus the
device block from the top. Anything that turns out to be a one-word fix
(`svh`, a safe-area inset, a dock rule) I will do the same day.

The three answers I most want: **4.3** (does the installed app keep your
progress), **4.1 + 4.1b** (does export AND import work — either alone
proves nothing), and **3.1** (does the silent switch kill the audio).

## RESULTS — 2026-10-05

**4.1 Export — PASS, after a fix.** The file was always correct; the
delivery was not. Tapping Export opened the JSON in **Quick Look**: a
screenful of raw text, and keeping it meant finding a share button in the
preview. It now goes to the share sheet, with **Save to Files** first.

**The finding worth keeping: iOS will not share `application/json`.**
`navigator.canShare()` answers false for it, so the first attempt at this
fell straight back to the download and changed nothing — the feature was
correct and useless. Offering the same bytes as **`text/plain` under the
same filename** works, and import still reads them because it matches on
the name rather than the MIME.

Diagnosed by elimination, not guesswork: the build marker confirmed the
new code was running, which ruled out a stale cache and left the type.

**4.1b Import — PASS.** The exported file can be selected and read back.
**Export and import both work, so the migration path is real.** That one
answer unblocked three things: carrying progress into a store build,
surviving a move to a custom domain, and recovering from WebKit's
seven-day eviction. All three depended on it.

**Still open: 4.3** (does the installed home-screen app keep your
progress) and **3.1 for the web** (see below).

## RESULTS — 2026-10-06

**3.1 the silent switch — ANSWERED FOR THE SHELL, by reading rather than
testing.** Neither shell configured an audio session, so both inherited
`.soloAmbient`, which obeys the ring switch: a silenced phone gave a silent
app. `shells/ios/AppDelegate.swift` now sets `.playback`. The trade is that
it stops other audio; the owner kept it, because a tool whose whole subject
is listening should play when the learner taps "Hear the sound". **Safari
owns its own session, so this does nothing for the web version and 3.1
remains open there.**

**What the iOS simulator has now covered, and what it has not.** The shell
was compiled and run on iOS 27 (iPhone 17 and iPhone 18 Pro Max): it boots,
renders in the right type and colours, navigates, and the nav bar sits
correctly after the safe-area fix. That is the substance of **1.1, 1.2 and
3.3** on a current OS — but on a simulator, not your hardware, and it says
nothing about a physical switch, a real keyboard, rotation in the hand, or
whether any voice is right.

**Two parts have lost their point since the store decision.** **4.3** and
**Part 5** are about WebKit's seven-day eviction and whether installing to
the Home Screen is a remedy. **A packaged store app is not subject to it at
all** — its storage is not script-writable browser storage. Both still matter
for people using the web version; neither gates the launch any more.

**Still worth your hands:** **2.4** (does the `100dvh` fix make scrolling
jitter — the one change that could have introduced a new problem, remedy is
one word, `svh`), **3.2** and **3.6** (audio generally, and offline), and
**3.1 for the web**.
