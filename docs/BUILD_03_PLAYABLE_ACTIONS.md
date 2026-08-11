# Build order 03 — Playable Actions

Content: `docs/ACTION_LIBRARY_v1.md` — **verbatim**, twelve entries in six contrast pairs.
Context: `docs/SPEECH_DISSECTION_SPEC.md` §7.

Branch off build 02's branch. **Do not commit, push, merge, or deploy.**

## Scope

A reference section in **Library**, plus one link from a Quick Dissection. Nothing else.

## Placement

**Library**, as a card alongside the existing reference cards. Title **Playable Actions**,
subtitle "What you're doing to the other person." No new top-level navigation, no change
to `SECTIONS`.

## Data

`js/data/actions.js`, following the conventions of the other `js/data/` modules. Shape is
in `ACTION_LIBRARY_v1.md`. Twelve entries, `pairId` linking each pair.

## The view

- The governing question and the emotion-vs-action distinction at the top, verbatim from
  the content doc. They are the point of the section, not decoration.
- Grouped by category. **Only render categories that have entries** — no empty headings,
  no "coming soon."
- Each entry shows verb, objective, resistance, coaching, and its contrast.
- **The pair is the feature.** An entry must make its partner one tap away, and the shared
  practice line must be visibly shared — same words, two actions. If a user can read one
  entry without noticing its opposite exists, the section has failed.
- Speak the practice line using the existing speech-synthesis path with
  `dialectLang(activeCourse())`. No recorded audio exists and none should be generated.
- Search across verb, objective, and coaching, matching the existing reference-card pattern.

## Link from Dissection

In a Quick Dissection, the `quick.doing` question ("What is the speaker doing to change
them?") gets a quiet link into Playable Actions. Do not build action *selection* or store
an action on the dissection record — the spec reserves `actions[]` for later. A link only.

## Non-negotiable

Zero build step, no dependencies, no backend, no external origin, no new `fetch`, CSP
preserved. `esc()` on everything rendered. Reuse existing CSS vocabulary. `record()` at
the top of any new view.

## Verify

```bash
python3 tools/security_audit.py && python3 tools/scan_secrets.py --worktree
python3 tools/launch_lint.py
```

Plus `TESTING.md` and the browser suites. Consider pinning the twelve verbs and their
practice lines in `launch_lint.py` the way the threshold lines are pinned, so the content
can't drift silently.

By hand: every entry reachable, every pair navigable in both directions, no empty
category, search works, speak works, the dissection link lands correctly. Mobile width.
Keyboard only. No new network requests.

## Report

Files changed, any CSS invented, how the pair navigation works, test results, and whether
you pinned the content in launch lint.
