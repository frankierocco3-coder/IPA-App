# Manual test checklist

There is no test runner in this repo (it is a zero-build static site), so
this is the checklist to walk before shipping a change. Tick the regression
block at minimum; run the feature blocks when you touch that area.

Run locally with `python3 serve.py` and open <http://localhost:4173>.

## Recording (Perform)

- [ ] Press **Record** — the browser asks for microphone permission only at
      that moment, not on page load.
- [ ] Allow the microphone — the button turns into **Stop**, pulses, and the
      elapsed timer counts up.
- [ ] Deny the microphone — a plain-English message appears and the rest of
      the page still works.
- [ ] Press **Stop** — the take appears with Play / Compare / Delete.
- [ ] **Play mine** plays your take.
- [ ] **Compare** plays the model first, then your take, back to back.
- [ ] Pressing Record twice quickly does not start two recordings.
- [ ] Leave a recording running past the 2-minute cap — it stops itself and
      says so.
- [ ] Save a take with a rating and a note — it appears under Saved takes.
- [ ] Reload the page — the saved take is still there.
- [ ] Delete a take — it asks first, then it's gone.
- [ ] Mark a take **Best Take** — it's highlighted; tapping again unsets it.
- [ ] Record from inside a project — the take is listed under that project
      and not under other texts.
- [ ] Rehearse at all three levels: a line, a word, a single sound.
- [ ] After stopping, the browser's recording indicator turns off (the mic
      stream was released).

## Projects (My Texts)

- [ ] Create a project; it opens on the Text tab.
- [ ] Fill in title / source / character / dialect / status / text and save.
- [ ] Duplicate a project — the copy has "(copy)" and no recordings.
- [ ] Delete a project — it warns that recordings go too.
- [ ] Search by title, character or source.
- [ ] Sort by each option.
- [ ] Set status to Archived and confirm it still lists.
- [ ] Export a project — a `.speechcraft.json` file downloads.
- [ ] Import that file back — it validates and creates a project.
- [ ] Import a malformed/unrelated JSON file — it is rejected with a readable
      message and nothing is created.
- [ ] Change a project's text so the line count differs — a warning appears
      before saving, and saving does not delete existing takes or notes.
- [ ] **Migration:** with an old `customText` in localStorage and no
      migration marker, load the app once — a project is created from it and
      the original localStorage value is left untouched.

## Analytics

- [ ] Answer some exercises correctly and incorrectly; Weak Sounds fills in.
- [ ] A symbol with fewer than 5 attempts reads "Not enough data".
- [ ] 5–9 attempts reads "Early estimate".
- [ ] 10+ attempts shows a plain percentage.
- [ ] Repeatedly choosing the wrong symbol of a pair surfaces it under
      "Commonly confused".
- [ ] Today's Rehearsal appears on the home screen once there is data, lists
      3–5 items, and each says why it was chosen.
- [ ] **Start rehearsal** opens a real practice lesson (infinite hearts).
- [ ] Reset practice analytics — analytics clear, but XP, streak, completed
      lessons, projects and recordings all survive.

## Pronunciation overrides

- [ ] In any IPA view, tapping a word opens the editor.
- [ ] Save "this occurrence only" — only that instance changes.
- [ ] Save "all matching words in this project" — every instance in the
      project changes, other projects unaffected.
- [ ] Save to the personal dictionary — it applies across the app in that
      dialect.
- [ ] The same word in a different dialect is unaffected.
- [ ] A multi-word phrase (e.g. "New York") can be saved.
- [ ] Capitalisation and trailing punctuation still match ("Either," =
      "either").
- [ ] **Reset to generated** removes the override.
- [ ] The transcription updates immediately on save, without a reload.
- [ ] Overrides survive a page refresh.
- [ ] Empty IPA is rejected; odd-but-plausible IPA is saved with a warning
      rather than blocked.
- [ ] Personal Dictionary: search, filter by dialect, edit, delete (with
      confirmation), export, import (merge and replace).

## Accessibility

- [ ] Tab through Perform — every control is reachable and has a visible
      focus ring.
- [ ] A screen reader announces recording started / stopped / saved /
      deleted / permission denied.
- [ ] In the word editor: Escape closes it, Tab is trapped inside, and focus
      returns to the word you opened it from.
- [ ] Status is never conveyed by colour alone (Best Take has a ★ and a
      label; ratings have text).
- [ ] With "reduce motion" on, the record button does not pulse.

## Responsive

- [ ] 375px wide: Record/Stop are full width and easy to reach.
- [ ] Take cards stack vertically.
- [ ] The word-editor dialog fits in the viewport and scrolls internally.
- [ ] No horizontal page scrolling anywhere.
- [ ] IPA under words stays legible (not shrunk below ~12px).

## Regression (run every time)

- [ ] A lesson opens, plays, scores and awards XP.
- [ ] Hearts still deduct on a wrong answer in a normal lesson, and don't in
      practice/Arcade.
- [ ] All 14 Arcade modes open and play.
- [ ] Handbook: 55 chart sounds, articulation diagrams, Your Instrument, the
      Vowel Map.
- [ ] All 7 Text & Delivery entries open (Sonnets, Chekhov, O'Neill, Wilde,
      Pirandello, Ibsen, Train Any Text).
- [ ] Sonnet 18 scans as 10/10/10 (verse framing), Chekhov scans as prose.
- [ ] Existing audio playback works (narrated clips + device fallback).
- [ ] XP, streak and lesson completion persist across reload.
- [ ] Back button walks the navigation stack correctly.
- [ ] No console errors on any screen.
