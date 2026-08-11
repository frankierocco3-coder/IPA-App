// Local database for the things that are too big or too structured for
// localStorage: rehearsal projects, recorded takes, and the audio blobs
// themselves. Everything stays on the device — there is no backend.
//
// localStorage keeps what it already kept (XP, streak, completed lessons,
// settings) so existing progress is never touched by anything in here.
//
// Stores
//   projects    — keyPath 'id'; index 'updatedAt', 'title'
//   recordings  — keyPath 'id'; index 'projectId', 'createdAt'
//   blobs       — keyPath 'id' (same id as the recording); { id, blob }
//   meta        — keyPath 'key'; small internal bookkeeping (migrations etc.)
//   dissections — keyPath 'id'; index 'targetKey' (v2, Build B — Speech
//                 Dissection Quick; unbounded user-authored analysis text,
//                 which is why it lives here and never in localStorage)
//
// Audio blobs live in their own store so listing takes never has to pull
// megabytes of audio into memory.
//
// VERSION HISTORY — every step is purely additive; no migration has ever
// read, rewritten or deleted existing records, so downgrade-readers stay
// safe and recordings/projects are untouched by upgrades.
//   1  projects / recordings / blobs / meta
//   2  + dissections (new store only — nothing else touched)

const DB_NAME = 'speechcraft';
const DB_VERSION = 2;

export const STORES = {
  projects: 'projects',
  recordings: 'recordings',
  blobs: 'blobs',
  meta: 'meta',
  dissections: 'dissections',
};

let dbPromise = null;

export function dbSupported() {
  return typeof indexedDB !== 'undefined' && indexedDB !== null;
}

// Schema steps, one per version. Every step is ADDITIVE ONLY: no step has
// ever read, rewritten or deleted an existing record or store, so an
// upgrade can never lose user data. Exported (with openRaw) so the test
// suite can run real upgrades against scratch databases.
export const SCHEMA_STEPS = {
  1: (db) => {
    const projects = db.createObjectStore(STORES.projects, { keyPath: 'id' });
    projects.createIndex('updatedAt', 'updatedAt');
    projects.createIndex('title', 'title');

    const recordings = db.createObjectStore(STORES.recordings, { keyPath: 'id' });
    recordings.createIndex('projectId', 'projectId');
    recordings.createIndex('createdAt', 'createdAt');

    db.createObjectStore(STORES.blobs, { keyPath: 'id' });
    db.createObjectStore(STORES.meta, { keyPath: 'key' });
  },
  2: (db) => {
    // Build B: Speech Dissection records — one new store, nothing else.
    const dissections = db.createObjectStore(STORES.dissections, { keyPath: 'id' });
    dissections.createIndex('targetKey', 'targetKey');
  },
  // Future: 3: (db) => { ... }
};

export function applySchema(db, from, to) {
  for (let v = from + 1; v <= to; v++) SCHEMA_STEPS[v]?.(db);
}

/**
 * Open a named database at a version, running any needed upgrade.
 * Never hangs silently: a blocked upgrade (an older tab holding the
 * database open) rejects with an UpgradeBlockedError carrying the
 * user-facing instruction; an older build opening newer data rejects
 * with the browser's VersionError and the data stays untouched.
 */
export function openRaw(name, version, { onClosed } = {}) {
  return new Promise((resolve, reject) => {
    let req;
    try {
      req = indexedDB.open(name, version);
    } catch (err) {
      reject(err);
      return;
    }
    req.onupgradeneeded = ev => applySchema(req.result, ev.oldVersion, version);
    req.onsuccess = () => {
      const db = req.result;
      // If another tab opens a newer version, step out of its way so THAT
      // tab's upgrade is never blocked by this one.
      db.onversionchange = () => { db.close(); onClosed?.(); };
      resolve(db);
    };
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(Object.assign(
      new Error('Speechcraft is open in another tab from an older session, which is blocking a storage upgrade. Close other Speechcraft tabs, then reload this page. Nothing has been lost.'),
      { name: 'UpgradeBlockedError' }));
  });
}

/** The user-facing line for a failed database open. Always honest about
 *  the data: nothing in these paths deletes or resets anything. */
export function dbErrorMessage(err) {
  if (err?.name === 'UpgradeBlockedError') return err.message;
  if (err?.name === 'VersionError')
    return 'This copy of Speechcraft is older than the data saved on this device. Reload the page to get the current version — your saved work is untouched.';
  return 'Speechcraft could not open its local storage. Your saved work is untouched — reload the page to try again.';
}

/** Open (and upgrade) the app database. Safe to call repeatedly. */
export function openDB() {
  if (dbPromise) return dbPromise;
  if (!dbSupported()) return Promise.reject(new Error('IndexedDB unavailable'));
  dbPromise = openRaw(DB_NAME, DB_VERSION, { onClosed: () => { dbPromise = null; } })
    .catch(err => { dbPromise = null; throw err; });
  return dbPromise;
}

// The stores holding user CONTENT (as opposed to course progress, which
// lives in localStorage). Privacy's "delete local data" clears exactly this
// list — a store missing from it would silently survive a full wipe.
export const CONTENT_STORES = [STORES.blobs, STORES.recordings, STORES.dissections,
  STORES.projects, STORES.meta];

/** Run `fn(store)` in a transaction and resolve with its request result. */
async function withStore(name, mode, fn) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(name, mode);
    const store = tx.objectStore(name);
    let out;
    try {
      out = fn(store);
    } catch (err) {
      reject(err);
      return;
    }
    tx.oncomplete = () => resolve(out && 'result' in out ? out.result : out);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export const idbGet = (store, key) => withStore(store, 'readonly', s => s.get(key));
export const idbPut = (store, value) => withStore(store, 'readwrite', s => s.put(value));
export const idbDelete = (store, key) => withStore(store, 'readwrite', s => s.delete(key));
export const idbClear = (store) => withStore(store, 'readwrite', s => s.clear());

export const idbAll = (store) => withStore(store, 'readonly', s => s.getAll());

/** All records whose `index` equals `value`. */
export const idbAllBy = (store, index, value) =>
  withStore(store, 'readonly', s => s.index(index).getAll(value));

/** Put several records in one transaction (all-or-nothing). */
export const idbPutMany = (store, values) =>
  withStore(store, 'readwrite', s => { values.forEach(v => s.put(v)); });

/** Delete several keys in one transaction. */
export const idbDeleteMany = (store, keys) =>
  withStore(store, 'readwrite', s => { keys.forEach(k => s.delete(k)); });

/**
 * One readwrite transaction across SEVERAL stores — all-or-nothing.
 * `fn` receives {storeName: objectStore}. Used so a recording's metadata
 * and its audio blob commit or fail together: a half-write would leave an
 * invisible orphan blob eating storage.
 */
export async function idbAcross(names, fn) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(names, 'readwrite');
    const stores = {};
    for (const n of names) stores[n] = tx.objectStore(n);
    try {
      fn(stores);
    } catch (err) {
      try { tx.abort(); } catch { /* already dead */ }
      reject(err);
      return;
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export const metaGet = async (key, fallback = null) =>
  (await idbGet(STORES.meta, key))?.value ?? fallback;

export const metaSet = (key, value) => idbPut(STORES.meta, { key, value });

/** Rough storage usage, when the browser will tell us. */
export async function storageEstimate() {
  try {
    if (navigator.storage?.estimate) {
      const { usage, quota } = await navigator.storage.estimate();
      return { usage, quota };
    }
  } catch { /* not supported — fine */ }
  return null;
}

export const uid = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
