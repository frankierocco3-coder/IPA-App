# Build order 02 — Speech Dissection, Quick mode

Reference: `docs/SPEECH_DISSECTION_SPEC.md`. Read §1, §3, §8, §11 before planning.
The rest of that document is future scope — do not build from it.

Branch off build 01's branch. **Do not commit, push, merge, or deploy.**

## Scope

**Quick Dissection only.** Six questions, one integration point, saved locally, revisable.
Guided and Full modes are not in this build and must not appear as controls. No Action
Library — that is build 03.

## Integration point

**One Studio project.** Studio is where an actor's real work lives, and a project already
has an id, a title, and text to analyze. Add a `Dissect This` action to the project view.
Do not retrofit Library pieces in this build.

## The six questions

Stable ids. Never rename one — a renamed id orphans a saved answer.

| id | Question |
|---|---|
| `quick.happening` | What is happening? |
| `quick.wants` | What does the speaker want? |
| `quick.resisting` | What is the listener resisting? |
| `quick.doing` | What is the speaker doing to change them? |
| `quick.change` | Where does the exchange change? |
| `quick.after` | What is different at the end? |

## Data

IndexedDB, per §8 of the spec — never localStorage; these are unbounded user text.
New store `dissections`, keyPath `id`, index on `targetKey`. Use the record shape in §8
exactly, including the reserved fields (`annotations`, `speakers`, `interpretations`,
`userQuestions`, `history`) declared empty so later work needs no migration.

`schemaVersion: 1`. Any migration must be versioned, narrow, and backward-compatible.
Follow the existing `db.js` migration pattern.

## Behavior

- Autosave, with a save state the user can see. Never lose an unfinished thought.
- Every question supports three states: answered, **I don't know yet**, **Not relevant**.
  Both non-answers are one tap and are first-class — not empty states, not skipped.
- Completion is never "all six answered." Show coverage, never a score or a percentage
  that implies failure.
- Answers are revisable at any time.
- Deleting a dissection is separate from deleting the project. Confirm before either.
  Deleting the project may take its dissection with it — match whatever project deletion
  already does, and say which you chose.
- Real `<label>` elements. Placeholders are not labels.
- Progressive disclosure — six textareas stacked on one screen is a form, not a tool.

## Non-negotiable

Zero build step, no dependencies, no backend, no external origin, no new `fetch`, CSP
preserved. Nothing leaves the device. **Every stored answer is untrusted on read** — it
round-trips through IndexedDB and gets rendered as HTML. `esc()` without exception; this
is the first feature in the app where the user authors long free text, so it is the
highest XSS surface you have shipped. Reuse existing CSS vocabulary. `record()` at the
top of any new view.

## Verify

```bash
python3 tools/security_audit.py && python3 tools/scan_secrets.py --worktree
python3 tools/launch_lint.py
```

Plus `TESTING.md`, the browser suites, and focused tests for: record creation, the three
answer states, persistence across reload, revision, and deletion isolation.

By hand: create a dissection, answer two questions, mark one "I don't know yet" and one
"Not relevant", leave two blank, reload, confirm all five states survive. Then revise an
answer and reload again. Mobile width. Keyboard only. No new network requests.

## Report

Files changed, storage and migration details, how deletion is scoped, the XSS surface and
how it's handled, test results, anything deferred.
