// Rehearsal projects: a saved role — its text, dialect, notes, difficult
// words, pronunciation overrides and recorded takes.
//
// A project is the unit an actor actually works in ("Stanley audition"),
// which is why the old single "Train Any Text" scratchpad becomes one.
// That migration runs once, on first load, and never discards the old value.

import { STORES, idbAll, idbGet, idbPut, idbDelete, uid, metaGet, metaSet } from './db.js';
import { store } from './state.js';

export const STATUSES = ['Not Started', 'In Rehearsal', 'Performance Ready', 'Archived'];

// What kind of material a Studio project holds. 'lyrics' is first-class:
// pasted song lyrics use the same text/IPA tools (spoken diction reference —
// the app never pretends to sing).
export const CONTENT_TYPES = [
  ['monologue', 'Monologue'],
  ['scene', 'Scene'],
  ['speech', 'Speech'],
  ['lyrics', 'Song Lyrics'],
  ['other', 'Other'],
];
export const contentTypeLabel = t =>
  (CONTENT_TYPES.find(([v]) => v === t) ?? [null, 'Text'])[1];

export const DATA_VERSION = 1;

/** A blank project. `lines` is derived from `text` on save. */
export function emptyProject(patch = {}) {
  const now = Date.now();
  return {
    id: uid('proj'),
    title: '',
    source: '',          // play / film / speech title
    author: '',
    character: '',
    scene: '',
    contentType: 'other', // monologue | scene | speech | lyrics | other
    accent: 'rp',        // dialect id: nam | rp | ssbe | aus
    text: '',
    lines: [],
    notes: '',
    difficultWords: [],  // [{ word, note }]
    pronunciationNotes: '',
    overrides: {},       // see overrides.js — project-scope IPA overrides
    status: 'Not Started',
    bestTakeId: null,
    createdAt: now,
    updatedAt: now,
    rehearsedAt: null,
    dataVersion: DATA_VERSION,
    ...patch,
  };
}

/**
 * Split pasted text into speakable lines.
 * Blank-line-separated or single-newline text keeps its own line breaks;
 * a single long paragraph is split into sentences so each is tappable.
 */
export function splitLines(text) {
  const raw = String(text ?? '').split(/\n+/).map(l => l.trim()).filter(Boolean);
  if (raw.length > 1) return raw;
  const one = raw[0] ?? '';
  if (!one) return [];
  const parts = one
    .split(/(?<!\bMr)(?<!\bMrs)(?<!\bDr)(?<!\bSt)(?<=[.!?…])\s+(?=[“"A-Z[])/)
    .map(s => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [one];
}

export async function listProjects() {
  const all = await idbAll(STORES.projects);
  return all.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
}

export const getProject = (id) => idbGet(STORES.projects, id);

export async function saveProject(project) {
  const p = { ...project, updatedAt: Date.now() };
  p.lines = splitLines(p.text);
  if (!p.dataVersion) p.dataVersion = DATA_VERSION;
  await idbPut(STORES.projects, p);
  return p;
}

export async function createProject(patch = {}) {
  return saveProject(emptyProject(patch));
}

export async function duplicateProject(id) {
  const src = await getProject(id);
  if (!src) return null;
  const now = Date.now();
  // Recordings and best-take deliberately do NOT come along: they are takes
  // of the original, and silently attaching them to a copy would be a lie.
  return saveProject({
    ...src,
    id: uid('proj'),
    title: `${src.title || 'Untitled'} (copy)`,
    bestTakeId: null,
    createdAt: now,
    rehearsedAt: null,
  });
}

export const deleteProject = (id) => idbDelete(STORES.projects, id);

/** Stamp "last rehearsed" — called when a project's Perform tab is used. */
export async function touchRehearsed(id) {
  const p = await getProject(id);
  if (!p) return null;
  p.rehearsedAt = Date.now();
  await idbPut(STORES.projects, p);
  return p;
}

export function sortProjects(list, mode) {
  const by = {
    rehearsed: (a, b) => (b.rehearsedAt ?? 0) - (a.rehearsedAt ?? 0),
    updated: (a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0),
    created: (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
    title: (a, b) => (a.title || '').localeCompare(b.title || ''),
    character: (a, b) => (a.character || '').localeCompare(b.character || ''),
  };
  return [...list].sort(by[mode] ?? by.rehearsed);
}

export function searchProjects(list, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return list;
  return list.filter(p =>
    [p.title, p.source, p.author, p.character, p.scene, p.status]
      .some(v => (v || '').toLowerCase().includes(needle)));
}

// ── Migration ─────────────────────────────────────────────────
// The old app kept one scratch text in localStorage under `customText`.
// Turn it into a real project once, keep the original key untouched as a
// backup, and record that we've done it so it never runs twice.

export async function migrateLegacyCustomText() {
  try {
    if (await metaGet('migrated.customText')) return null;
    const legacy = store.customText;
    if (!legacy || !String(legacy.body ?? '').trim()) {
      await metaSet('migrated.customText', { at: Date.now(), created: false });
      return null;
    }
    const p = await createProject({
      title: legacy.title?.trim() || 'My first text',
      accent: legacy.accent || 'rp',
      text: legacy.body,
      notes: 'Imported from your earlier pasted-text draft.',
    });
    await metaSet('migrated.customText', { at: Date.now(), created: true, projectId: p.id });
    return p;
  } catch (err) {
    // A failed migration must never stop the app loading. The old value is
    // still in localStorage, so nothing is lost and we can retry next time.
    console.warn('customText migration deferred:', err);
    return null;
  }
}
