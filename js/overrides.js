// User corrections to generated pronunciation.
//
// The built-in dictionary is never modified. Overrides live separately and
// are resolved in this order, most specific first:
//
//   1. this occurrence   (project + line + word index)
//   2. this project      (project + normalised word/phrase, per dialect)
//   3. personal dictionary (across the whole app, per dialect)
//   4. built-in dictionary
//   5. the app's existing fallback transcription
//
// Project-scoped overrides live inside the project record (IndexedDB).
// The personal dictionary is small and read while rendering, so it lives in
// localStorage alongside the app's other settings.

const DICT_KEY = 'speechcraft-personal-dict-v1';

// ── Normalisation ─────────────────────────────────────────────
// Match "Either," / "either" / "EITHER" as the same word, while leaving
// contractions and hyphenated compounds intact.

export function normWord(w) {
  return String(w ?? '')
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")            // curly → straight apostrophe
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}'-]+$/gu, '')
    .trim();
}

/** Strip decorative slashes/brackets — we store the bare IPA. */
export function cleanIpa(v) {
  return String(v ?? '')
    .trim()
    .replace(/^[/[]+/, '')
    .replace(/[/\]]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Deliberately permissive: IPA has a long tail of valid symbols and blocking
// them would be worse than letting an odd one through. We only flag input
// that is obviously not a transcription.
const OBVIOUSLY_WRONG = /[0-9@#$%^&*()_=+{}<>?,;:"\\|]/;

export function validateIpa(value) {
  const ipa = cleanIpa(value);
  if (!ipa) return { ok: false, error: 'Enter a pronunciation.' };
  if (ipa.length > 60) return { ok: false, error: 'That looks too long for one entry.' };
  if (OBVIOUSLY_WRONG.test(ipa)) {
    return { ok: true, ipa, warning: 'That contains characters not usually seen in IPA — saved anyway.' };
  }
  if (/[a-zA-Z]{6,}/.test(ipa)) {
    return { ok: true, ipa, warning: 'That looks like spelling rather than IPA — saved anyway.' };
  }
  return { ok: true, ipa };
}

// ── Personal dictionary (localStorage) ────────────────────────
// Shape: { "<accent>::<normalised word>": { word, accent, ipa, note, at } }

function loadDict() {
  try {
    const raw = JSON.parse(localStorage.getItem(DICT_KEY));
    return raw && typeof raw === 'object' ? raw : {};
  } catch { return {}; }
}

function saveDict(d) {
  try { localStorage.setItem(DICT_KEY, JSON.stringify(d)); return true; }
  catch { return false; }
}

const dictKey = (word, accent) => `${accent}::${normWord(word)}`;

export function listPersonal() {
  return Object.values(loadDict()).sort((a, b) => (b.at ?? 0) - (a.at ?? 0));
}

export function getPersonal(word, accent) {
  return loadDict()[dictKey(word, accent)] ?? null;
}

export function setPersonal({ word, accent, ipa, note = '' }) {
  const d = loadDict();
  const entry = { word: normWord(word), display: String(word), accent, ipa: cleanIpa(ipa), note, at: Date.now() };
  d[dictKey(word, accent)] = entry;
  saveDict(d);
  return entry;
}

export function deletePersonal(word, accent) {
  const d = loadDict();
  delete d[dictKey(word, accent)];
  saveDict(d);
}

export function exportPersonal() {
  return {
    format: 'speechcraft-dictionary',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    entries: listPersonal(),
  };
}

/** Validate and merge an imported dictionary. Returns how many were added. */
export function importPersonal(data, { replace = false } = {}) {
  if (!data || typeof data !== 'object') throw new Error('Not a JSON object.');
  if (data.format !== 'speechcraft-dictionary') throw new Error('This is not a Speechcraft dictionary file.');
  if (!Array.isArray(data.entries)) throw new Error('No entries found.');
  const d = replace ? {} : loadDict();
  let n = 0;
  for (const e of data.entries) {
    if (!e || typeof e.word !== 'string' || typeof e.ipa !== 'string') continue;
    const accent = ['rp', 'nam', 'aus'].includes(e.accent) ? e.accent : 'rp';
    d[dictKey(e.word, accent)] = {
      word: normWord(e.word),
      display: String(e.display ?? e.word),
      accent,
      ipa: cleanIpa(e.ipa),
      note: String(e.note ?? '').slice(0, 200),
      at: Number(e.at) || Date.now(),
    };
    n++;
  }
  if (!n) throw new Error('No valid entries in the file.');
  saveDict(d);
  return n;
}

export function clearPersonal() {
  try { localStorage.removeItem(DICT_KEY); } catch { /* ignore */ }
}

// ── Project-scoped overrides ──────────────────────────────────
// Stored on the project as:
//   overrides.words      { "<accent>::<word>": { ipa, note } }
//   overrides.occurrence { "<lineIndex>:<wordIndex>": { ipa, note } }

export function projectWordOverride(project, word, accent) {
  return project?.overrides?.words?.[dictKey(word, accent)] ?? null;
}

export function occurrenceOverride(project, lineIdx, wordIdx) {
  return project?.overrides?.occurrence?.[`${lineIdx}:${wordIdx}`] ?? null;
}

export function setProjectWordOverride(project, { word, accent, ipa, note = '' }) {
  const o = project.overrides ?? {};
  o.words = { ...(o.words ?? {}), [dictKey(word, accent)]: { ipa: cleanIpa(ipa), note, word: normWord(word) } };
  return { ...project, overrides: o };
}

export function setOccurrenceOverride(project, { lineIdx, wordIdx, ipa, note = '' }) {
  const o = project.overrides ?? {};
  o.occurrence = { ...(o.occurrence ?? {}), [`${lineIdx}:${wordIdx}`]: { ipa: cleanIpa(ipa), note } };
  return { ...project, overrides: o };
}

export function clearOverridesFor(project, { word, accent, lineIdx, wordIdx }) {
  const o = { words: { ...(project.overrides?.words ?? {}) }, occurrence: { ...(project.overrides?.occurrence ?? {}) } };
  if (lineIdx != null && wordIdx != null) delete o.occurrence[`${lineIdx}:${wordIdx}`];
  if (word) delete o.words[dictKey(word, accent)];
  return { ...project, overrides: o };
}

/**
 * Resolve one word to its pronunciation, applying the override chain.
 * `base` is what the built-in dictionary produced (may be null).
 * Returns { ipa, source, note, approx } — `source` says which rule won,
 * so the UI can show the user where a pronunciation came from.
 */
export function resolvePronunciation({ word, accent, project = null, lineIdx = null, wordIdx = null, base = null }) {
  if (project && lineIdx != null && wordIdx != null) {
    const occ = occurrenceOverride(project, lineIdx, wordIdx);
    if (occ?.ipa) return { ipa: occ.ipa, source: 'occurrence', note: occ.note ?? '', approx: false };
  }
  if (project) {
    const pw = projectWordOverride(project, word, accent);
    if (pw?.ipa) return { ipa: pw.ipa, source: 'project', note: pw.note ?? '', approx: false };
  }
  const personal = getPersonal(word, accent);
  if (personal?.ipa) return { ipa: personal.ipa, source: 'personal', note: personal.note ?? '', approx: false };

  if (base?.ipa) return { ipa: base.ipa, source: 'dictionary', note: '', approx: !!base.approx };
  return null;
}
