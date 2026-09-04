// Shared UI helpers — the vocabulary every view is built from.
//
// Extracted from js/main.js (2026-08-17) as the first step of the
// module split. Nothing here knows about any workspace: views import
// from this file, never the reverse, so the split cannot introduce a
// cycle through the helpers.
//
// No behaviour change: every function keeps its name and its body.

import { stopSpeech } from './audio.js';
import { store } from './state.js';

// Shell-owned navigation state. navStack is MUTATED, never
// reassigned, so importers share one array.
export const app = document.getElementById('app');
export const navStack = [];
let navRestoring = false;
export function resetNav() { navStack.length = 0; navRestoring = false; }

// The shell registers how to get home. Keeping this a callback is what
// prevents ui.js -> main.js -> ui.js; ui.js imports no view module.
let homeHandler = () => {};
export function setHomeHandler(fn) { homeHandler = fn; }

// Page-scoped media teardown (try-it object URLs, live capture). Owned
// by the shell; registered here so ui.js imports no view module.
let teardownHooks = [];
export function setTeardownHooks(...fns) { teardownHooks = fns; }
const tearDownPage = () => { for (const f of teardownHooks) { try { f(); } catch { /* best effort */ } } };

// The brand button markup, shared by every sub-page header.
export const EMBLEM = `<svg viewBox="0 0 100 104" class="emblem" aria-hidden="true">
  <circle cx="50" cy="45" r="32" fill="none" stroke="#2f3a2e" stroke-width="2"/>
  <line x1="50" y1="20" x2="50" y2="70" stroke="#2f3a2e" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="50" cy="17" r="4.6" fill="#a99bc4"/>
  <path d="M49 31 C40 25 30 27 24 33 C33 33 41 35 49 39 Z" fill="#8d997d"/>
  <path d="M51 31 C60 25 70 27 76 33 C67 33 59 35 51 39 Z" fill="#8d997d"/>
  <path d="M49 40 C42 36 34 37 29 41 C37 41 43 43 49 46 Z" fill="#8d997d" opacity="0.72"/>
  <path d="M51 40 C58 36 66 37 71 41 C63 41 57 43 51 46 Z" fill="#8d997d" opacity="0.72"/>
  <path d="M50 44 C44 49 56 54 50 59 C44 64 56 68 50 72" fill="none" stroke="#6f8657" stroke-width="2" stroke-linecap="round"/>
  <path d="M50 64 C42 58 30 58 22 62 L22 84 C30 80 42 80 50 86 C58 80 70 80 78 84 L78 62 C70 58 58 58 50 64 Z" fill="#f6f1e8" stroke="#2f3a2e" stroke-width="2" stroke-linejoin="round"/>
  <line x1="50" y1="64" x2="50" y2="86" stroke="#2f3a2e" stroke-width="1.6"/>
</svg>`;
export const BRAND_BTN = `<button class="brand brand-btn" id="brand-home">${EMBLEM}<span class="brand-text"><span class="brand-name">Speechcraft</span><span class="brand-sub">Speak · Learn · Connect</span></span></button>`;

export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Speechcraft emblem — winged staff + open book, encircled. Brand mark.

export function record(thunk) {
  stopSpeech();                                  // leaving/entering a page stops any reading
  tearDownPage();                                // practice recordings + live capture die with the page
  if (navRestoring) { navRestoring = false; return; }
  if (navStack[navStack.length - 1] === thunk) return; // ignore same-page re-render
  navStack.push(thunk);
}

export function goBack() {
  stopSpeech();
  navStack.pop();                                // drop the current page
  const prev = navStack[navStack.length - 1];
  navRestoring = true;                           // prev's record() shouldn't re-push
  if (prev) prev(); else homeHandler();
}

// Standard header for a sub-page: back + brand (→ home) + centered title.
// No XP chip (owner order 2026-09-03): sub-pages are reading and
// reference surfaces where progress numbers are noise; XP lives on the
// shell stats bar and the lesson screens. The empty stats div stays as
// the flex spacer that keeps the title centered.
export function pageTopbar(title, color) {
  return `
    <header class="topbar">
      <button class="backbtn" id="nav-back" aria-label="Back" title="Back">‹</button>
      ${BRAND_BTN}
      <div class="track-title" style="color:${color}">${title}</div>
      <div class="stats"></div>
    </header>`;
}

export function wireBrandHome() {
  document.getElementById('brand-home')?.addEventListener('click', () => homeHandler());
  document.getElementById('nav-back')?.addEventListener('click', goBack);
}

// Each track has its own unlock chain, independent of the others.

// One renderer for every course hero's progress, so a workspace can
// never show a bare bar with no numbers.
export function courseProgressHtml(done, total) {
  const pct = total ? Math.round(done / total * 100) : 0;
  return `
        <div class="bar" role="img" aria-label="Course progress: ${done} of ${total} lessons complete"><i style="width:${pct}%"></i></div>
        <span class="cc-meta">Course progress · ${done} of ${total}</span>`;
}

// ── The routine runner (self-paced steps; before/after; reflection) ──
// ══ Shared sequential-exercise runner ═════════════════════════
// One step on screen at a time. Advancing REPLACES the instruction in
// place — completed and future steps are never visible, so a learner
// cannot read ahead. Used by every step-based exercise; ordinary
// chapters and reference pages are untouched.
//
// Exercises stay optional and exploratory: no correct answers, no
// scoring, no penalty for skipping, and nothing is marked complete
// until the learner presses Finish.
export function runStepSequence({ mount, steps, onFinish }) {
  const total = steps.length;
  let at = 0;
  const skipped = new Set();

  mount.innerHTML = `
    <p class="step-count" id="step-count"></p>
    <section class="step-panel" aria-live="polite">
      <h2 class="step-h" id="step-h" tabindex="-1"></h2>
      <p class="step-text" id="step-text"></p>
    </section>
    <div class="practice-row step-nav">
      <button class="btn-lite" id="step-prev" type="button">‹ Previous</button>
      <button class="btn-lite" id="step-skip" type="button">Skip this step</button>
      <button class="btn btn-primary" id="step-next" type="button">Next ›</button>
    </div>`;

  const countEl = mount.querySelector('#step-count');
  const headEl = mount.querySelector('#step-h');
  const textEl = mount.querySelector('#step-text');
  const prevBtn = mount.querySelector('#step-prev');
  const skipBtn = mount.querySelector('#step-skip');
  const nextBtn = mount.querySelector('#step-next');

  const draw = (moveFocus = true) => {
    const s = steps[at];
    countEl.textContent = `Step ${at + 1} of ${total}`;
    headEl.textContent = s.label ?? `Step ${at + 1}`;
    textEl.textContent = s.text;                       // inert, always
    prevBtn.disabled = at === 0;
    nextBtn.textContent = at === total - 1 ? 'Finish exercise' : 'Next ›';
    skipBtn.hidden = at === total - 1;
    if (moveFocus) headEl.focus({ preventScroll: true });
  };

  const go = d => {
    const to = at + d;
    if (to < 0) return;
    if (to >= total) return onFinish?.({ skipped: [...skipped] });
    at = to;
    draw();
  };

  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  skipBtn.addEventListener('click', () => { skipped.add(at); go(1); });
  draw(false);
}

// A collection/module tile. `emoji` is optional and belongs ONLY at the
// collection level — chapter and lesson tiles never carry one.
export function tileHtml({ key, tone, emoji, title, meta, badge, progress, wide }) {
  const pct = progress && progress.total
    ? Math.round(progress.done / progress.total * 100) : null;
  return `
    <button class="tile ${tone ?? ''} ${wide ? 'tile-wide' : ''}" data-tile="${esc(key)}" type="button">
      <span class="tile-body">
        <span class="tile-title">${emoji ? `<span class="tile-emoji" aria-hidden="true">${emoji}</span>` : ''}${esc(title)}</span>
        ${badge ? `<span><span class="badge ${badge.cls}">${esc(badge.label)}</span></span>` : ''}
        ${meta ? `<span class="tile-meta">${esc(meta)}</span>` : ''}
        ${pct === null ? '' : `<span class="bar" role="img"
           aria-label="${progress.done} of ${progress.total} complete"><i style="width:${pct}%"></i></span>`}
      </span>
      <span class="tile-chev" aria-hidden="true">›</span>
    </button>`;
}

// A chapter/lesson tile: title-led, quiet sequence label, one chevron,
// no emoji and no oversized number.
export function itemTileHtml({ key, seq, title, note, state }) {
  return `
    <button class="item-tile ${state ?? ''}" data-item="${esc(key)}" type="button">
      <span class="item-body">
        ${seq ? `<span class="item-seq">${esc(seq)}</span>` : ''}
        <span class="item-title">${esc(title)}</span>
        ${note ? `<span class="item-note">${esc(note)}</span>` : ''}
      </span>
      <span class="tile-chev" aria-hidden="true">›</span>
    </button>`;
}

export function reviewStripHtml(id, count, noun) {
  return `
    <button class="review-strip" id="${id}" type="button">
      <b>${count}</b>
      <span>${esc(noun)}</span>
      <span class="tile-chev" aria-hidden="true">›</span>
    </button>`;
}

// Status for a module-like group, derived from real progress.
export function groupStatus({ available, done, prepared }) {
  if (!available) return { cls: 'is-pending', label: 'Review pending' };
  if (done === 0) return { cls: 'is-ready', label: 'Not started' };
  if (done >= available) return { cls: 'is-complete', label: 'Complete' };
  return { cls: 'is-progress', label: 'In progress' };
}

// Page header + focusable heading, so focus lands correctly on arrival.
export function workspacePage(topbar, headingHtml, bodyHtml) {
  app.innerHTML = `${topbar}<main class="track-list ws-page">${headingHtml}${bodyHtml}</main>`;
  wireBrandHome();
  app.querySelector('.page-h')?.setAttribute('tabindex', '-1');
  app.querySelector('.page-h')?.focus();
}

// ══ ONE Library component for every workspace ═════════════════
// Card grid + search + a count on every card + "<Workspace> Library".
// Cards are plain data: { key, tone, emoji, title, count, unit, badge,
// keywords, wide, go }. Counts follow ONE grammar — "N unit" — with any
// qualifier moved onto the collection page or a badge, never the count.
