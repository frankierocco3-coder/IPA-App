# Speech system — content governance and review guide

Created 2026-08-13 for the written Speech learning and practice system.
Companion to `js/data/speech/reviews.js` (the ledger — absence means
draft) and the in-app protected review area (`#review`).

## The rule

Claude drafts; humans approve. No Speech content record is ever marked
approved by the model that wrote it, and approvals land in
`js/data/speech/reviews.js` one entry at a time with reviewer name,
type and date.

## Reviewer types and what awaits them

| Reviewer type | Records awaiting | Where |
|---|---|---|
| Voice professional / SLP | 7 Stage-1 Foundation lessons (`sp-f-*`) — anatomy, breath, effort, jaw/tongue/neck (incl. TMD/bruxism info), voice/resonance, articulation, vocal health | `js/data/speech/course.js` |
| Acting teacher/coach | 4 Approaches to Acting sections (Stanislavski, Adler, Meisner, Chekhov) | `js/data/speech/approaches.js` |
| Editorial | Start Here (5), Stage 2 (5), Stage 3 (4) lessons; 24 practice routines; 20 practice texts; glossary (15 terms); arcade copy | `course.js`, `routines.js`, `texts.js`, `glossary.js`, `arcade.js` |
| Dialect | none new — Dialects in Speech reuses existing review-governed dialect records without duplication | `js/data/speech/dialects.js` (structure only) |
| Rhetoric | none new — Rhetoric & Oratory pathway unchanged in the Library | — |

## Learner-facing policy (matches accepted precedent)

- **Professional-tier records** (voice-professional, acting-professional,
  dialect): bodies are NEVER learner-facing while draft. Learners see
  the title with an honest awaiting-review state; the full draft is
  inspectable only in `#review`.
- **Editorial-tier records**: may render learner-facing while editorial
  review is pending (the Playable Actions / preface precedent), and
  remain listed in `#review` until reviewed.
- **Routines**: additionally gated by batch — only the eight
  `reviewBatch: 1` Train routines may be learner-facing at all. The
  sixteen Prepare/Apply drafts are `#review`-only.
- **Context Shift** (arcade): roadmap-approved, fully hidden — no card,
  no placeholder — until a Speaking in Context pathway exists.

## Safety and honesty invariants (lint-guarded)

- The two central practice statements are verbatim and pinned.
- "Automatic"/"automaticity"/"second nature" for memory; **"autonomic"
  is banned** in Speech content.
- The alphabet experiment carries no personal attribution.
- The safety line is verbatim wherever exertion appears: "Stop if you
  experience pain, burning, dizziness or increasing strain. Persistent
  hoarseness or vocal difficulty should be evaluated by a qualified
  professional."
- No treatment prescriptions, no universal posture/support/tongue
  position, no throat pressing/massage instructions, no claim that the
  tongue supplies airflow, no claim that suppressing speech universally
  causes tongue-root tension.
- Interpretive practice is completion-only — never a quality score,
  never an "improvement percentage." Objective recall games may mark
  correct/incorrect.
- Written-and-interactive only: no audio, synthesis, recording,
  microphone, playback, video or external AI anywhere in the Speech
  system.

## The Acting workspace (added 2026-08-13)

Acting is a peer workspace, not a Speech course. Its content lives in
`js/data/acting/` (`course.js`, `approaches.js`, `practice.js`,
`store.js`) and is governed by the SAME ledger
(`js/data/speech/reviews.js` — absence means draft).

| Group | Count | Required reviewer |
|---|---|---|
| Acting lessons (`ac-*`) | 28 | Qualified acting teacher or coach |
| Acting approach introductions | 4 | Qualified acting teacher or coach |

Every acting lesson authored in this build is a **prepared draft
awaiting acting-professional review** and none is learner-facing.
The four approach introductions moved here from the Speech
classification and no longer count as Speech drafts; Speech's own
count is now the 7 anatomy/vocal-health chapters only.

**Storage:** no IndexedDB change. Question Everything continues to use
the existing `dissections` store unchanged; Scene Study notes are
localStorage (`speechcraft-scene-study`, keyed by working-text id);
Playable Actions are browsed from their existing shared record, with
no action↔project association written to the database — so DB_VERSION
stays at 2 and no migration exists to run.

## Deferred concept: "Put It Together" / Performance Lab

Documented 2026-08-13, **not built and not navigable**. The eventual
combined Speech-and-Dialect experience would let a learner:

1. Choose a working text (the My Working Text system already exists and
   would supply it unchanged).
2. Choose a Speech skill (a Guided Practice subject or an Arcade game).
3. Optionally apply an accent or dialect (an approved course target,
   and only where reviewed material exists).
4. Practise the combination, with the written reveals of both systems.

Constraints already decided for whenever it is built:

- Existing dialect speeches stay in **Accents & Dialects**. They are
  never copied into Speech to populate it; a combined exercise would
  reference the one record.
- No audio, recording or evaluation enters through this door either.
- Accent application follows the existing review gates: an unreviewed
  route or piece cannot appear, exactly as today.
- Nothing about it may ship as a placeholder, teaser or "coming soon"
  card until the feature genuinely exists.

## Deferred (roadmap only — no placeholders anywhere in the app)

Body Language pathway · mandatory five-step exercise formula
(Notice → Isolate → Add Language → Integrate → Reflect) · Build a
Character · Speaking in Context · Context Shift (built, hidden) ·
Delivery in Action · real-person/fictional case studies · video
essays · YouTube · Build Fluency as a separate pathway ·
method-specific Studio courses · Vocal Performance · Musical
Theatre · Improv and Spontaneous Speech.
