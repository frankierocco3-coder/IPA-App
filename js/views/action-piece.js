// One Dialect in Action piece, rendered for a learner or a reviewer
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { IDIOM } from '../data/idiom.js';
import { esc, openModal } from '../ui.js';
import { dialectName } from './context.js';

// [[term|ID]] markers become highlighted, tappable expression chips that
// open the matching Words & Expressions entry.
function actionLineHtml(text) {
  return esc(text).replace(/\[\[([^\]|]+)\|([A-Z]+-\d+)\]\]/g,
    (_, term, id) => `<button class="xp-term" data-xp="${id}" type="button"
      aria-label="Expression: ${esc(term)} — open its definition">${esc(term)}</button>`);
}
export function actionPieceHtml(piece) {
  return `
    <div class="piece-meta">
      <h1 class="piece-title">${esc(piece.title)}</h1>
      <p class="piece-source">${esc(piece.setting)}</p>
      <p class="piece-scene">${esc(piece.speakerDescription)}</p>
      <div class="piece-tags">
        <span class="tag">${piece.type === 'dialogue' ? 'Dialogue' : 'Monologue'}</span>
        <span class="tag tag-dialect">🗣 ${esc(dialectName(piece.courseId))}</span>
        <span class="tag">${esc(piece.register)}</span>
      </div>
      ${piece.situation ? `<p class="guide-text piece-situation"><b>The situation:</b> ${esc(piece.situation)}</p>` : ''}
      <p class="pane-note">${esc(piece.region)}. Highlighted words are this course’s Words &amp; Expressions — tap one for its meaning.</p>
      ${piece.audio ? '' : '<p class="pane-note">🎙 No recording exists for this piece yet — audio arrives only when an approved recording in this exact dialect does.</p>'}
    </div>
    <div class="sonnet-lines action-lines">
      ${piece.lines.map(l => `
        <p class="guide-text action-line">${l.speaker ? `<b class="action-speaker">${esc(l.speaker)}:</b> ` : ''}${actionLineHtml(l.text)}</p>`).join('')}
    </div>`;
}
export function wireActionPiece(root) {
  root.querySelectorAll('.xp-term').forEach(b =>
    b.addEventListener('click', () => {
      const entry = IDIOM.find(e => e.id === b.dataset.xp);
      if (!entry) return;
      openModal({
        title: `“${entry.term}”`,
        body: `
          <p class="idiom-meaning">${esc(entry.meaning)}</p>
          ${entry.example ? `<p class="idiom-example">“${esc(entry.example)}”</p>` : ''}
          ${entry.note ? `<p class="idiom-note">${esc(entry.note)}</p>` : ''}
          <p class="pane-note">From ${esc(dialectName(entry.dialect))} Words &amp; Expressions.</p>`,
        actions: '<button class="btn btn-primary" id="xp-close" type="button">Done</button>',
        onMount: (rootEl, close) => rootEl.querySelector('#xp-close').addEventListener('click', close),
      });
    }));
}
