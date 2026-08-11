# Build order 01 — Before You Speak

**Revised.** An earlier draft of this file said Speechcraft had no Studio and no
onboarding flow. Both statements were wrong — they were written from the deployed Pages
build, which is three commits behind local. Trust the code in front of you, not this
paragraph and not `CLAUDE.md`.

Implement the Before You Speak threshold. **This slice is the threshold only.** Speech
Dissection and the Action Library are specified in `docs/SPEECH_DISSECTION_SPEC.md` and
are explicitly **not** in this build. Do not start them.

Create a dedicated branch off current `HEAD`. The working branch is `security-hardening`
and local is ahead of `origin/main`. **Do not commit, push, merge, or deploy.**

---

## What already exists — extend it, do not rebuild it

Read these before planning anything:

**A four-step onboarding flow.** `renderOnboarding(step, sel)` in `js/main.js` (~line
1235 onward). Steps are: welcome → goal → first course → how to start. It has an
established visual vocabulary — `.ob-dots`, `.ob-dot`, `.ob-emblem`, `.ob-lede`,
`.ob-options`, `.ob-option`, `.ob-opt-icon`, `.ob-opt-text`, `.ob-actions`,
`.ob-actions-col`, `.ob-back`. Reuse all of it. Do not invent a parallel panel system.

**Grandfathering, already solved.** `needsOnboarding()` does this:

```js
if (store.onboarding.done) return false;
if (store.hasEarnedAnything) {            // predates onboarding
  store.saveOnboarding({ done: true });
  return false;
}
return true;
```

That is the pattern for existing users, and it is the right one. **Use
`store.hasEarnedAnything` — do not write a new detector.** Existing users are silently
marked complete and never see the threshold, exactly as they never saw onboarding.

**Replay, already solved.** More → Preferences re-runs the welcome flow: "Runs the
welcome flow again. Your progress is untouched." Extend that, don't build a second
replay entry point.

**An approved-manifest video system.** `js/data/media-videos.js` exports `videoFor(acc,
sym, kind)`, and `articulationVideoHtml()` renders **only** when an approved manifest
entry exists. That is the honest pattern for media, and it already works. No threshold
video exists in the manifest, so no video renders here — no `<video>` element, no player
chrome, no "coming soon" placeholder. If one is approved later it goes through
`media-videos.js` like everything else.

**Studio is real.** Nav id `studio`, `renderStudio()`, Speechcraft Studio holds private
rehearsal projects (`js/projects.js`). The deployed site doesn't show it yet; the code
does.

Also note there are five onboarding course options — `nam`, `rp`, `ssbe`, `aus`, `core` —
not three dialects. Don't assume otherwise anywhere in this work.

---

## Architecture constraints — non-negotiable

Zero build step. No `package.json`, no dependencies, no bundler. No backend, no accounts.
No external origin of any kind — no CDN, font, API, analytics, telemetry, media host. No
new `fetch`. Preserve the CSP. Nothing leaves the device.

Every user-controlled or stored value passes `esc()`. Reuse existing CSS tokens and
classes; add new CSS only where nothing existing fits, and report each case. Call
`record()` at the top of any new view so back works.

---

## Copy

Verbatim from `docs/THRESHOLD_COPY.md`. Seven panels.

**Do not paraphrase, shorten, or rewrite a single line.** Not the Plato quotation, not
the attribution (`— Plato, *Republic* 377a–b`), not the body text. It reads "Speech
reveals thought," not "can reveal." The professional examples are actor, teacher, leader,
and all of us — do not add a fifth.

The copy doc also contains a grandfathered-user invitation card. **Skip it.** The existing
`hasEarnedAnything` precedent marks such users complete silently, and matching the
established behavior beats introducing a new one. Offer the threshold in Preferences
instead, beside the existing replay control.

---

## Sequencing — report before you build

Seven threshold panels in front of the existing four onboarding steps is **eleven screens
before a new user reaches the app.** That is very likely too many, and it is a product
decision, not an implementation detail.

Do not just concatenate them. In your report, propose a sequence and say why. Two
candidates worth weighing:

- Threshold panels 1–6, then the threshold's choice panel *replaces* the existing welcome
  screen (it already does the same job — orient and invite), then goal → course → start.
  Nine screens.
- Threshold as a distinct sequence with its own dots, handing off to onboarding as it
  exists. Cleaner separation, eleven screens.

Whatever you propose: the `.ob-dots` counter must not read "Step 1 of 11." An opening
should not look like a form.

---

## Behavior

**Storage** — extend the existing onboarding record via `store.saveOnboarding()`; do not
create a parallel top-level key:

```js
onboarding: {
  done, goal, accent,          // existing — do not disturb
  threshold: {
    version: 1,
    completedAt: <iso>,
    choice: 'craft' | 'tools',
    source: 'first-run' | 'grandfathered' | 'replay',
    lastReplayedAt: <iso|null>,
  },
}
```

Versioned so a future materially-revised threshold can be handled deliberately. Read
defensively — every existing user's record lacks `threshold` entirely. Do not overwrite
or migrate any existing user data.

**Destinations.** *Learn the Craft* → the most appropriate existing LEARN destination.
*Use the Tools* → the most appropriate existing practical destination (Studio is the
strong candidate now that it exists). Use what exists; do not invent navigation. Both
choices complete the threshold and enter the same app, and both get equal visual weight —
no primary/secondary styling, no nudge toward *Learn the Craft*.

**Replay** must not reset progress, must not change the original `choice`, and must not
re-block.

---

## Accessibility

Match what onboarding already does — it has `role="radiogroup"`, `aria-checked`,
`aria-label`, and a labelled dots indicator. Semantic headings in order. Focus moves to
each panel heading on advance, visibly ringed. Full keyboard navigation forward and back.
Screen reader announces panel changes. Respect `prefers-reduced-motion`. Usable at mobile
widths. No autoplay of anything. No pledge, no quiz, no agreement checkbox.

---

## Verify

```bash
python3 tools/security_audit.py && python3 tools/scan_secrets.py --worktree
```

Then the `TESTING.md` regression block, and in the console with `python3 serve.py`
running:

```js
import('./tests/security.test.js').then(m => m.run());   // expect 20/20
```

Add focused tests where the existing approach supports it. Split long browser chains —
they exceed the 30s tool limit.

Test by hand: fresh state shows the threshold then onboarding · a user with
`hasEarnedAnything` sees **neither** · both choices land somewhere real · replay from
Preferences works and preserves progress · reload after completion doesn't re-show ·
existing users' onboarding records survive untouched · keyboard only, start to finish ·
mobile width · reduced motion · no new network requests.

---

## Report

What existed before you started. Your proposed sequencing and why. Files changed. Storage
added. Accessibility work, and what you could not verify without a real screen reader.
Audit and test results. Anywhere `CLAUDE.md` disagrees with the code. Any CSS class you
had to invent. Anything deferred, and anything needing owner review.

Do not commit, push, merge, deploy, or make a paid API call.
