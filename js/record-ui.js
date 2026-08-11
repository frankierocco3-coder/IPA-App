// Learner-recording UI builders, behind the capability boundary.
//
// These templates are the ONLY sources of learner-facing capture controls
// (Try It Yourself, the Perform record button, Save Take, self-ratings,
// Compare Your Take). Each takes an explicit `caps` argument defaulting to
// the frozen build constant and returns '' when learner speaking is
// disabled — so the disabled build renders no control, live or dead,
// while the implementation stays whole and testable: tests inject
// { learnerSpeaking: true } to confirm the former controls still render.
// Wiring lives with the callers in main.js and only runs when the
// elements exist.

import { CAPABILITIES } from './capabilities.js';
import { recordingSupported, MAX_RECORDING_MS } from './perform.js';
import { RATINGS } from './recordings.js';

// Minimal escaper for the label interpolations below (static, in-repo
// strings — escaped anyway on principle).
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** The "Try it yourself" widget (sound pages, Words & Expressions). */
export function tryItHtml(label = 'Record yourself, then compare with the model.', caps = CAPABILITIES) {
  if (!caps.learnerSpeaking) return '';
  if (!recordingSupported()) return '';
  return `
  <section class="tryit" aria-label="Try it yourself">
    <span class="cc-stage">🎙 Try it yourself</span>
    <div class="tryit-row">
      <button class="btn btn-record" data-tryit="rec" type="button">⏺ Record</button>
      <button class="btn btn-lite" data-tryit="model" type="button">🔊 Model</button>
      <audio controls hidden data-tryit="play" aria-label="Your recording"></audio>
    </div>
    <p class="pane-note" data-tryit="status" role="status">${esc(label)}</p>
    <p class="tryit-ephemeral">Practice only — not saved. Keep takes in the 🎬 Studio.</p>
  </section>`;
}

/** The Perform pane's capture block: record button, timer, error slot and
 *  the pending-take box (play/compare/discard, self-rating, note, save). */
export function performCaptureHtml(caps = CAPABILITIES, { canRecord = recordingSupported() } = {}) {
  if (!caps.learnerSpeaking) return '';
  return `
    <div class="perform-controls perform-capture">
      <button class="btn btn-record" id="perf-rec" type="button" ${canRecord ? '' : 'disabled'}>⏺ Record</button>
      <span class="perform-timer" id="perf-timer" hidden aria-hidden="true">00:00</span>
    </div>
    <p class="pane-note perform-limit">Recordings stop automatically at ${Math.round(MAX_RECORDING_MS / 60000)} minutes.</p>
    <p class="perform-error" id="perf-error" role="alert" hidden></p>

    <div class="perform-take" id="perf-take" hidden>
      <h3 class="guide-heading">Your take</h3>
      <div class="perform-controls">
        <button class="btn btn-lite" id="perf-play" type="button">▶ Play mine</button>
        <button class="btn btn-lite" id="perf-compare" type="button">⇄ Compare</button>
        <button class="btn btn-lite btn-danger" id="perf-discard" type="button">Delete</button>
      </div>
      <fieldset class="rating-set">
        <legend class="field-label">Self-rating</legend>
        ${RATINGS.map(r => `<button class="btn btn-lite rating" type="button" data-rating="${r.id}" aria-pressed="false">${r.label}</button>`).join('')}
      </fieldset>
      <label class="field-label" for="perf-note">Notes</label>
      <input class="input-text" id="perf-note" type="text" maxlength="140" placeholder="e.g. dropped the final consonant">
      <button class="btn btn-primary" id="perf-save" type="button">Save take</button>
    </div>`;
}
