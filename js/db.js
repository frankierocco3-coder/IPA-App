// Local database for the things that are too big or too structured for
// localStorage: rehearsal projects, recorded takes, and the audio blobs
// themselves. Everything stays on the device — there is no backend.
//
// localStorage keeps what it already kept (XP, streak, completed lessons,
// settings) so existing progress is never touched by anything in here.
//
// Stores
//   projects   — keyPath 'id'; index 'updatedAt', 'title'
//   recordings — keyPath 'id'; index 'projectId', 'createdAt'
//   blobs      — keyPath 'id' (same id as the recording); { id, blob }
//   meta       — keyPath 'key'; small internal bookkeeping (migrations etc.)
//
// Audio blobs live in their own store so listing takes never has to pull
// megabytes of audio into memory.

const DB_NAME = 'speechcraft';
const DB_VERSION = 1;

export const STORES = {
  projects: 'projects',
  recordings: 'recordings',
  blobs: 'blobs',
  meta: 'meta',
};

let dbPromise = null;

export function dbSupported() {
  return typeof indexedDB !== 'undefined' && indexedDB !== null;
}

/** Open (and upgrade) the database. Safe to call repeatedly. */
export function openDB() {
  if (dbPromise) return dbPromise;
  if (!dbSupported()) return Promise.reject(new Error('IndexedDB unavailable'));

  dbPromise = new Promise((resolve, reject) => {
    let req;
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (err) {
      reject(err);
      return;
    }

    // Schema upgrades live here. Each version step is additive so a user on
    // an older version keeps their data.
    req.onupgradeneeded = ev => {
      const db = req.result;
      const from = ev.oldVersion;

      if (from < 1) {
        const projects = db.createObjectStore(STORES.projects, { keyPath: 'id' });
        projects.createIndex('updatedAt', 'updatedAt');
        projects.createIndex('title', 'title');

        const recordings = db.createObjectStore(STORES.recordings, { keyPath: 'id' });
        recordings.createIndex('projectId', 'projectId');
        recordings.createIndex('createdAt', 'createdAt');

        db.createObjectStore(STORES.blobs, { keyPath: 'id' });
        db.createObjectStore(STORES.meta, { keyPath: 'key' });
      }
      // Future: if (from < 2) { ... }
    };

    req.onsuccess = () => {
      const db = req.result;
      // If another tab opens a newer version, step out of its way.
      db.onversionchange = () => { db.close(); dbPromise = null; };
      resolve(db);
    };
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('IndexedDB upgrade blocked by another tab'));
  }).catch(err => { dbPromise = null; throw err; });

  return dbPromise;
}

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
