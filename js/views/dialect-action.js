// Dialect in Action: the shelf, the pending notice and a piece's page
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { stopSpeech } from '../audio.js';
import { actionDrafts, actionFor } from '../data/dialect-in-action.js';
import { app, esc, pageTopbar, record, wireBrandHome, workspacePage } from '../ui.js';
import { actionPieceHtml, wireActionPiece } from './action-piece.js';
import { dialectName, trackFor } from './context.js';
import { fillSound } from './ipa-tools.js';

export function renderDialectAction(d) {
  const pieces = actionFor(d);
  // Never render a shelf with nothing on it: any caller that reaches here
  // with no approved pieces gets the honest pending page instead. The
  // delegation precedes record() so the back stack holds the page shown.
  if (!pieces.length) return renderDialectActionPending(d);
  record(() => renderDialectAction(d));
  app.innerHTML = `
    ${pageTopbar('🎭 Dialect in Action', trackFor(d).color)}
    <main class="track-list">
      <p class="track-blurb">${esc(dialectName(d))}’s words, expressions and rhythm inside believable speech — a scene and a story, not a vocabulary list.</p>
      ${pieces.map((p, i) => `
        <button class="track-card" data-i="${i}" type="button" style="--track-color:${trackFor(d).color}">
          <div class="track-glyph">${p.type === 'dialogue' ? '💬' : '🎤'}</div>
          <div class="track-info"><h2>${esc(p.title)}</h2><p>${esc(p.setting)} · ${esc(p.register)}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => renderActionPiece(d, pieces[+b.dataset.i].id)));
}
// Honest state for an accent whose Dialect in Action pieces are written
// but not yet through dialect review — the card is never silently
// missing, and no other accent's material is shown in its place.
export function renderDialectActionPending(d) {
  record(() => renderDialectActionPending(d));
  stopSpeech();
  const drafts = actionDrafts().filter(p => p.courseId === d).length;
  workspacePage(
    pageTopbar('🎭 Dialect in Action', trackFor(d).color),
    `<div class="ws-head">
       <h1 class="page-h">Dialect in Action</h1>
       <p class="ws-sub">${esc(dialectName(d))}</p>
     </div>`,
    `<p class="pane-note">${drafts} piece(s) for this accent are written and awaiting review by a qualified dialect reviewer. They appear here the moment a named reviewer approves them — and only this accent's material will ever appear on this page.</p>`);
}
function renderActionPiece(d, id) {
  record(() => renderActionPiece(d, id));
  const piece = actionFor(d).find(p => p.id === id);
  if (!piece) return renderDialectAction(d);
  app.innerHTML = `
    ${pageTopbar('🎭 ' + esc(piece.title), trackFor(d).color)}
    <main class="guide sonnet-view">
      ${actionPieceHtml(piece)}
      <p><button class="btn-lite" id="action-ipa" type="button" aria-expanded="false">≈ Show approximate IPA</button></p>
      <div id="action-ipa-pane" hidden></div>
    </main>`;
  wireBrandHome();
  wireActionPiece(app);
  // Line-by-line IPA through the EXISTING derivation system (the same one
  // the Studio uses) — dictionary-backed for Neutral American, rule-derived
  // and marked ≈ elsewhere. Honest or absent; never hand-invented here.
  const ipaBtn = document.getElementById('action-ipa');
  const ipaPane = document.getElementById('action-ipa-pane');
  ipaBtn.addEventListener('click', () => {
    const open = !ipaPane.hidden;
    ipaPane.hidden = open;
    ipaBtn.setAttribute('aria-expanded', String(!open));
    ipaBtn.textContent = open ? '≈ Show approximate IPA' : 'Hide IPA';
    if (!open && !ipaPane.dataset.filled) {
      ipaPane.dataset.filled = '1';
      const plain = piece.lines.map(l =>
        (l.speaker ? l.speaker + ': ' : '') + l.text.replace(/\[\[([^\]|]+)\|[A-Z]+-\d+\]\]/g, '$1'));
      fillSound(plain, d, ipaPane);
    }
  });
}
