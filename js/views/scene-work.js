// Scene Work rendered: the per-text analysis over one scene.
//
// Shared by the learner surface (the Scene Work tab on a scene page)
// and the owner's #review page, which is why it lives here rather than
// in main.js: a view module imports ui.js and data, never the shell, so
// both callers can have it without a cycle.
//
// The gate is NOT in here. main.js asks sceneWorkApproved() before it
// offers the tab, and #review deliberately renders drafts.

import { PLAYABLE_ACTIONS } from '../data/playable-actions.js';
import { esc } from '../ui.js';

// Where a beat's action IS one of the twelve, the library's own verb is
// named beside it. Flat text, not a control: a chip that looks tappable
// and is not would be worse than nothing, and the Playable Actions page
// is one shelf away in the same Library.
const actionVerb = id => PLAYABLE_ACTIONS.find(a => a.id === id)?.verb ?? null;

// Objectives, obstacles and stakes are Acting's vocabulary, used here on
// one text. The labels are phrased as the questions they answer, so a
// reader who has not done that module still gets something out of the
// column.
const PERSON_ROWS = [
  ['between', 'Who they are to each other, right now'],
  ['want', 'What they want in this scene'],
  ['obstacle', 'What is in the way'],
  ['stake', 'What it costs to lose'],
];

const beatHtml = (b, i) => `
  <section class="sw-beat">
    <h3 class="sw-beat-h"><span class="sw-beat-n">${i + 1}</span>${esc(b.title)}</h3>
    <p class="sw-cue">From “${esc(b.cue)}”</p>
    <p class="guide-text">${esc(b.what)}</p>
    <ul class="sw-actions">
      ${b.actions.map(a => `<li><b>${esc(a.who)}</b> ${esc(a.verb)}${
        actionVerb(a.action) ? ` <span class="sw-linked">Playable Actions: ${esc(actionVerb(a.action))}</span>` : ''}</li>`).join('')}
    </ul>
    <p class="sw-ops"><span class="sw-label">Operative words</span>${
      b.operative.map(w => `<span class="sw-word">${esc(w)}</span>`).join('')}</p>
    <p class="sw-ask"><span class="sw-label">Ask yourself</span>${esc(b.ask)}</p>
  </section>`;

export function sceneWorkHtml(work, { heading = true } = {}) {
  if (!work) return '';
  return `
    ${heading ? `<p class="pane-note">🎬 <b>Scene Work</b>. One reading of this scene, written down so you have something to argue with. The counts, rhymes and repetitions are checkable on the page. Everything about what these people want is a reading, and yours is allowed to be better.</p>` : ''}

    <h2 class="guide-heading">What is true in the room</h2>
    <p class="guide-text">${esc(work.circumstances)}</p>
    <p class="pane-note">${esc(work.form)}</p>

    <h2 class="guide-heading">The two of them</h2>
    <div class="sw-people">
      ${work.people.map(p => `
        <div class="sw-person">
          <h3 class="sw-who">${esc(p.who)}</h3>
          ${PERSON_ROWS.map(([k, label]) => `
            <p class="sw-row"><span class="sw-label">${esc(label)}</span>${esc(p[k])}</p>`).join('')}
        </div>`).join('')}
    </div>

    <h2 class="guide-heading">The scene in beats</h2>
    ${work.beats.map(beatHtml).join('')}

    <h2 class="guide-heading">Patterns worth naming</h2>
    ${work.patterns.map(p => `
      <p class="guide-text"><b>${esc(p.name)}.</b> ${esc(p.what)}</p>`).join('')}

    <h2 class="guide-heading">What the verse is doing</h2>
    <p class="pane-note">Everything here can be checked on the Scan tab. If a count below disagrees with the one on screen, trust the screen and tell somebody.</p>
    ${work.metre.map(m => `
      <div class="sw-metre">
        <p class="sw-quote">${esc(m.line)}</p>
        <p class="guide-text">${esc(m.what)}</p>
      </div>`).join('')}

    ${work.contested ? `
      <h2 class="guide-heading">The reading this scene usually gets</h2>
      <p class="pane-note pane-caveat">${esc(work.contested)}</p>` : ''}

    <p class="pane-note">The notes are a place to start from, not a result to reproduce. Nothing here is the performance.</p>`;
}
