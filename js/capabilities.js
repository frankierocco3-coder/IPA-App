// Build-controlled product capabilities — the single feature boundary.
//
// `learnerSpeaking` gates every surface that asks the learner to produce
// or record sound (Try It Yourself, Perform recording, Compare Your Take,
// self-ratings, any speaking prompt). Model playback is NOT gated: the
// model producing sound stays in scope; the learner being recorded is
// deferred until the future speaking audit (see docs/ROADMAP.md).
//
// IMMUTABLE BY CONSTRUCTION: this is a frozen constant that nothing ever
// writes, and no code path derives it from localStorage, sessionStorage,
// URL parameters, hashes, user settings, IndexedDB or remote content.
// Flipping it is a code change in this file — a build decision, never a
// runtime one. There is deliberately no developer-facing toggle.
//
// Tests exercise the enabled state by INJECTING a caps argument into the
// functions that accept one (they default to this constant); the flag
// itself is never mutated.

export const CAPABILITIES = Object.freeze({
  learnerSpeaking: false,
});
