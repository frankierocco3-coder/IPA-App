// The notebook — always there, never in the way.
//
// A dock that opens over the BOTTOM half of the screen while the page you
// were on stays live in the top half. You can push it to full screen, pull
// it back to half, or close it. It is reachable from every page in the app
// because it lives OUTSIDE #app: main.js replaces #app.innerHTML on every
// navigation, so anything mounted inside it would be destroyed constantly.
//
// Storage: IndexedDB, via the existing `meta` store — notes are unbounded
// user-authored text, which this project never puts in localStorage. One
// record per notebook plus one for the tab list, so writing a long note
// never rewrites the others. No schema change: `meta` is a keyed store
// that already exists.
//
// Nothing here is scored, counted or reported. It is a notebook.

import { metaGet, metaSet, dbSupported } from './db.js';
import { esc } from './ui.js';

const TABS_KEY = 'notebook:tabs';
const noteKey = id => `notebook:${id}`;

// The notebooks that always exist, one per place a learner works. A
// custom notebook can be added alongside them and deleted again; these
// cannot be deleted, because they are where the app files things by
// default.
const BUILT_IN = [
  { id: 'acting', label: 'Acting' },
  { id: 'ipa', label: 'IPA' },
  { id: 'nam', label: 'Neutral American' },
  { id: 'rp', label: 'Traditional RP' },
  { id: 'ssbe', label: 'Standard British' },
  { id: 'aus', label: 'Australian' },
];

let tabs = [...BUILT_IN];
let active = 'acting';
let saveTimer = null;
let els = null;

/** Which notebook belongs to where the learner currently is. */
export function notebookForContext(workspace, course) {
  if (workspace === 'acting') return 'acting';
  if (workspace === 'ipa') return 'ipa';
  if (workspace === 'accents' && tabs.some(t => t.id === course)) return course;
  return 'acting';
}

const loadTabs = async () => {
  const saved = await metaGet(TABS_KEY, null).catch(() => null);
  const custom = Array.isArray(saved) ? saved.filter(t => t && t.custom) : [];
  tabs = [...BUILT_IN, ...custom];
};

const saveTabs = () => metaSet(TABS_KEY, tabs.filter(t => t.custom)).catch(() => {});

const readNote = id => metaGet(noteKey(id), '').catch(() => '');
const writeNote = (id, text) => metaSet(noteKey(id), text).catch(() => {});

function drawTabs() {
  els.tabs.innerHTML = tabs.map(t => `
    <button class="nb-tab ${t.id === active ? 'on' : ''}" data-nb-tab="${esc(t.id)}"
            type="button" role="tab" aria-selected="${t.id === active}">${esc(t.label)}</button>`).join('')
    + '<button class="nb-tab nb-add" id="nb-add" type="button" aria-label="New notebook">+</button>';

  els.tabs.querySelectorAll('[data-nb-tab]').forEach(b =>
    b.addEventListener('click', () => openTab(b.dataset.nbTab)));
  els.tabs.querySelector('#nb-add').addEventListener('click', addNotebook);
}

async function openTab(id) {
  await flush();
  active = id;
  const t = tabs.find(x => x.id === id);
  els.area.value = await readNote(id);
  els.area.setAttribute('aria-label', `${t?.label ?? 'Notebook'} notes`);
  els.del.hidden = !t?.custom;
  els.state.textContent = '';
  drawTabs();
}

async function addNotebook() {
  const label = (prompt('Name this notebook') ?? '').trim();
  if (!label) return;
  const id = 'nb-' + Date.now().toString(36);
  tabs.push({ id, label: label.slice(0, 40), custom: true });
  await saveTabs();
  openTab(id);
}

async function deleteNotebook() {
  const t = tabs.find(x => x.id === active);
  if (!t?.custom) return;
  if (!confirm(`Delete the notebook “${t.label}” and its notes?\n\nThis cannot be undone.`)) return;
  tabs = tabs.filter(x => x.id !== t.id);
  await writeNote(t.id, '');
  await saveTabs();
  openTab('acting');
}

/** Commit any pending edit immediately — before switching tabs or closing. */
async function flush() {
  if (!saveTimer) return;
  clearTimeout(saveTimer);
  saveTimer = null;
  await writeNote(active, els.area.value);
  els.state.textContent = 'Saved ✓';
}

function setMode(mode) {              // 'closed' | 'half' | 'full'
  document.body.classList.toggle('nb-half', mode === 'half');
  document.body.classList.toggle('nb-full', mode === 'full');
  els.dock.hidden = mode === 'closed';
  els.fab.setAttribute('aria-expanded', String(mode !== 'closed'));
  // Both size buttons are always present and always enabled; the active
  // one is marked. Hiding one of them left no visible way back.
  els.half.setAttribute('aria-pressed', String(mode === 'half'));
  els.grow.setAttribute('aria-pressed', String(mode === 'full'));
  els.half.classList.toggle('on', mode === 'half');
  els.grow.classList.toggle('on', mode === 'full');
  if (mode !== 'closed') els.area.focus({ preventScroll: true });
}

/** Mount the dock once, outside #app so navigation never destroys it. */
export async function mountNotebook() {
  if (els || !dbSupported()) return;

  const fab = document.createElement('button');
  fab.id = 'nb-fab';
  fab.type = 'button';
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-label', 'Open your notebook');
  fab.innerHTML = '<span aria-hidden="true">📓</span>';

  const dock = document.createElement('section');
  dock.id = 'nb-dock';
  dock.hidden = true;
  dock.setAttribute('aria-label', 'Notebook');
  dock.innerHTML = `
    <header class="nb-head">
      <div class="nb-tabs" role="tablist" aria-label="Notebooks"></div>
      <div class="nb-controls">
        <button class="nb-btn" id="nb-del" type="button" hidden>Delete</button>
        <button class="nb-btn" id="nb-half" type="button" aria-pressed="true">Half</button>
        <button class="nb-btn" id="nb-grow" type="button" aria-pressed="false">Full</button>
        <button class="nb-btn nb-min" id="nb-close" type="button">Minimize</button>
      </div>
    </header>
    <textarea id="nb-area" class="nb-area" spellcheck="true"
      placeholder="Notes, reminders, things to try…"></textarea>
    <p class="nb-state" id="nb-state" role="status" aria-live="polite"></p>`;

  document.body.append(fab, dock);
  els = {
    fab, dock,
    tabs: dock.querySelector('.nb-tabs'),
    area: dock.querySelector('#nb-area'),
    state: dock.querySelector('#nb-state'),
    del: dock.querySelector('#nb-del'),
    grow: dock.querySelector('#nb-grow'),
    half: dock.querySelector('#nb-half'),
  };

  await loadTabs();

  fab.addEventListener('click', async () => {
    if (!dock.hidden) { await flush(); setMode('closed'); return; }
    // Open on the notebook for wherever you are.
    const ws = localStorage.getItem('speechcraft-workspace');
    const course = localStorage.getItem('speechcraft-course');
    await openTab(notebookForContext(ws, course));
    setMode('half');
  });
  dock.querySelector('#nb-close').addEventListener('click', async () => {
    await flush(); setMode('closed');
  });
  els.grow.addEventListener('click', () => setMode('full'));
  els.half.addEventListener('click', () => setMode('half'));
  els.del.addEventListener('click', deleteNotebook);

  els.area.addEventListener('input', () => {
    els.state.textContent = 'Saving…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      saveTimer = null;
      await writeNote(active, els.area.value);
      els.state.textContent = 'Saved ✓';
    }, 500);
  });

  // Never lose an edit to a reload or a tab switch.
  window.addEventListener('pagehide', () => {
    if (saveTimer) { clearTimeout(saveTimer); writeNote(active, els.area.value); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !dock.hidden) { flush(); setMode('closed'); fab.focus(); }
  });

  drawTabs();
}
