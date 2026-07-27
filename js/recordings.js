// Saved takes: metadata in one store, audio blob in another, plus the
// object-URL bookkeeping that stops a long rehearsal session leaking memory.
//
// A take belongs to a project (or to a piece of curated text, via a scopeId)
// and to a target — the phoneme, word or line that was being rehearsed —
// so the same screen can hold takes at all three levels.

import { STORES, idbGet, idbPut, idbDelete, idbAllBy, idbAll, uid } from './db.js';
import { getProject, saveProject } from './projects.js';

export const RATINGS = [
  { id: 'again', label: 'Again', hint: 'Needs another pass' },
  { id: 'close', label: 'Close', hint: 'Nearly there' },
  { id: 'nailed', label: 'Nailed It', hint: 'Performance ready' },
];

export const LEVELS = ['sound', 'word', 'line'];

// Object URLs we've handed out, so we can revoke them precisely.
const urls = new Map();   // recordingId -> objectURL

export function releaseUrl(id) {
  const url = urls.get(id);
  if (url) { URL.revokeObjectURL(url); urls.delete(id); }
}

export function releaseAllUrls() {
  urls.forEach(url => URL.revokeObjectURL(url));
  urls.clear();
}

/** A playable URL for a take's audio, created on demand and cached. */
export async function takeUrl(id) {
  if (urls.has(id)) return urls.get(id);
  const rec = await idbGet(STORES.blobs, id);
  if (!rec?.blob) return null;
  const url = URL.createObjectURL(rec.blob);
  urls.set(id, url);
  return url;
}

/**
 * Persist a take.
 * `target` describes what was rehearsed: { level, ref, label }
 *   level: 'sound' | 'word' | 'line'
 *   ref:   phoneme symbol, word, or line index
 *   label: what to show in the takes list
 */
export async function saveTake({ projectId = null, scopeId = null, target, blob, mimeType, durationMs, rating = null, note = '' }) {
  const id = uid('take');
  const meta = {
    id,
    projectId,
    scopeId,                       // e.g. 'sonnet:18' for curated text
    level: target?.level ?? 'line',
    ref: target?.ref ?? null,
    label: target?.label ?? '',
    mimeType,
    durationMs,
    rating,
    note,
    createdAt: Date.now(),
  };
  await idbPut(STORES.blobs, { id, blob });
  await idbPut(STORES.recordings, meta);
  return meta;
}

export async function updateTake(id, patch) {
  const meta = await idbGet(STORES.recordings, id);
  if (!meta) return null;
  const next = { ...meta, ...patch };
  await idbPut(STORES.recordings, next);
  return next;
}

export async function deleteTake(id) {
  releaseUrl(id);
  await idbDelete(STORES.recordings, id);
  await idbDelete(STORES.blobs, id);
  // If it was a project's best take, clear that pointer too.
  const meta = await idbGet(STORES.recordings, id);
  if (!meta) {
    const all = await idbAll(STORES.projects);
    const owner = all.find(p => p.bestTakeId === id);
    if (owner) { owner.bestTakeId = null; await saveProject(owner); }
  }
}

export async function listTakes({ projectId = null, scopeId = null } = {}) {
  let all;
  if (projectId) all = await idbAllBy(STORES.recordings, 'projectId', projectId);
  else {
    all = await idbAll(STORES.recordings);
    all = all.filter(t => t.scopeId === scopeId);
  }
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

/** Delete every take belonging to a project (used when the project goes). */
export async function deleteTakesFor(projectId) {
  const takes = await idbAllBy(STORES.recordings, 'projectId', projectId);
  for (const t of takes) await deleteTake(t.id);
  return takes.length;
}

export async function setBestTake(projectId, takeId) {
  const p = await getProject(projectId);
  if (!p) return null;
  p.bestTakeId = p.bestTakeId === takeId ? null : takeId;   // tapping again clears it
  return saveProject(p);
}

/** Play a URL to completion. Resolves when it ends (or errors). */
export function playUrl(url, audioEl) {
  return new Promise(resolve => {
    if (!url) { resolve(); return; }
    const el = audioEl ?? new Audio();
    el.src = url;
    const done = () => { el.removeEventListener('ended', done); el.removeEventListener('error', done); resolve(); };
    el.addEventListener('ended', done, { once: true });
    el.addEventListener('error', done, { once: true });
    el.play().catch(done);
  });
}
