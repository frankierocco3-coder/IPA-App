# Launch readiness report — Speechcraft Beta

Date: 2026-07-30 · Prepared after the launch sprint (word swaps, phoneme
candidates, try-it recorder, launch extras).

## Changes in this sprint
- Example-word swaps (owner's ear, safe variants agreed): strut→but,
  car→bar, war→saw; cup retained. Lexical-set NAMES (STRUT, THOUGHT…)
  unchanged by design. New words recorded in both voices of all four
  courses. The What-Is-IPA accent comparison now uses "bar".
- 350 isolated-phoneme CANDIDATE clips generated (vowels/fricatives/
  nasals/l/r as coaxed isolated productions; stops/affricates/w/j/glottal
  as labelled SYLLABLE demos — aCa frames, "uh-oh" for /ʔ/). Indexed in
  audio/phonemes-index.json. ZERO are learner-visible: every clip awaits
  owner ear-approval at #audit (APPROVED_PHONEMES gate). The "Isolated
  sound coming soon" state disappears per-sound as approvals land.
- "Try it yourself" recorder on every sound page and Words & Expressions:
  record → automatic playback → compare with the model. Ephemeral takes;
  My Texts remains the save-takes workspace. Honest mic-permission and
  unsupported-browser states.
- Launch extras: saved-data schema version (v2 stamp, forward-safe
  loader, no wipe-on-unknown); "steps" label where checkpoints are
  counted; scroll reset on section switch; iPhone safe-area padding on
  the bottom nav; IPA transcription wrap protection; Privacy wipe now
  clears every Speechcraft key added since launch prep.

## Validation run
audit_audio (index↔files↔flags, course-bound voices, strict ssbe
coverage, candidate index) PASSED · launch_lint (names, icons, W&E,
deterministic checkpoint idioms, coverage-driven reader, TTS regression)
PASSED · security audit PASSED · browser suites 20/20 audio + 20/20
security · console clean · desktop + 390px smoke.

## Audio coverage (playable = ear-cleared, both-or-either voice)
- Words & expressions: nam 344/346*, rp 335/335, aus 368/368,
  ssbe 565/565. (*nam strut/car respell candidates on disk, quarantined
  pending owner ear; the words no longer appear as teaching examples.)
- Isolated phonemes: 0 — the TTS candidates were withdrawn by the owner
  after listening; human recordings planned (docs/PHONEME_RECORDING_PLAN
  has the workflow). Sound pages show a decorative symbol; word audio
  carries every page. No fake or dead controls.
- Long-form: sonnets nam 154/154, rp 154/154, aus 59/154, ssbe 0/154;
  all five monologue libraries 0 (manifest:
  docs/LONGFORM_RECORDING_MANIFEST.md, 22 rows).

## Awaiting owner action (the launch-critical human steps)
1. Ear-review the 350 phoneme candidates at #audit (kind=phoneme filter)
   — approvals turn on "Hear the sound" per symbol. Rejects go to the
   human-recording list.
2. Re-listen to the 4 quarantined nam respell candidates (strut/car) —
   or leave quarantined; they are no longer teaching examples.
3. Review the 15 Sonnets Recast adaptations (docs/RECAST_REVIEW.md).

## Remaining production needs (money/plan-level, not blockers)
- Australian sonnets 95 texts (~1,306 lines); Standard British sonnets;
  five monologue libraries (~169k credits total) — storage plan needed
  first (repo ~560MB vs Pages ~1GB soft limit).

## Assessment
**Ready for beta.** Isolated phonemes are deliberately absent (human
recordings are post-launch content work, not a launch blocker) — every
visible control still plays exactly what it claims. No dishonest control exists anywhere:
everything playable plays exactly what it claims in the course it claims.
Recommended manual smoke: one lesson per course, one W&E
try-it, one sonnet (badges + Recast), Privacy wipe on a throwaway
profile, Feedback link.
