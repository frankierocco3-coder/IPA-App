// Speech-system persistence — localStorage ONLY, by explicit design.
//
// The owner order forbids new IndexedDB stores or database-version
// changes without a storage-gate stop. Nothing here needs one: the
// speaking goal, lesson completion, practice history and reflections
// are small, bounded, device-local records. Malformed or missing
// values always fall back safely. Deleting a Studio project needs no
// cascade here — history entries reference texts by TITLE SNAPSHOT,
// never by live project pointer, so nothing dangles.

const GOAL_KEY = 'speechcraft-speech-goal';
const DONE_KEY = 'speechcraft-speech-done';
const HISTORY_KEY = 'speechcraft-speech-history';
const HISTORY_CAP = 200;

// ── Speaking goal (Phase 3 — optional, never hides/locks/ranks) ──
export const SPEECH_GOALS = [
  { id: 'everyday', icon: '💬', label: 'Everyday confidence and clarity' },
  { id: 'public', icon: '🎤', label: 'Public speaking and presentations' },
  { id: 'acting', icon: '🎭', label: 'Acting and text work' },
  { id: 'accents', icon: '🌍', label: 'Accents and dialects' },
];

export function speechGoal() {
  try {
    const v = localStorage.getItem(GOAL_KEY);
    return SPEECH_GOALS.some(g => g.id === v) ? v : null;   // malformed → safely none
  } catch { return null; }
}

export function setSpeechGoal(id) {
  try {
    if (SPEECH_GOALS.some(g => g.id === id)) localStorage.setItem(GOAL_KEY, id);
    else localStorage.removeItem(GOAL_KEY);
  } catch { /* storage unavailable — the goal is optional by design */ }
}

// ── Lesson completion (curriculum tracking, not evaluation) ──────
function readDone() {
  try {
    const v = JSON.parse(localStorage.getItem(DONE_KEY));
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch { return {}; }
}

export const speechLessonDone = id => !!readDone()[id];

export function markSpeechLessonDone(id) {
  try {
    const d = readDone();
    if (d[id]) return false;               // already complete — no double XP
    d[id] = Date.now();
    localStorage.setItem(DONE_KEY, JSON.stringify(d));
    return true;
  } catch { return false; }
}

export const speechDoneCount = ids => {
  const d = readDone();
  return ids.filter(id => d[id]).length;
};

// ── Practice history + private reflections (Phase 11/12) ────────
// Entries: { at, kind: 'routine'|'game', ref, title, textTitle,
//            skill, attempt, reflections?: [ids], note?: string }
// Reflections are SELF-OBSERVATION, private to this device — never a
// recording, never an evaluation, never an improvement percentage.
export function speechHistory() {
  try {
    const v = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(v) ? v.filter(e => e && typeof e === 'object') : [];
  } catch { return []; }
}

export function recordSpeechPractice(entry) {
  try {
    const h = speechHistory();
    const prior = h.filter(e => e.ref === entry.ref).length;
    h.push({ at: Date.now(), attempt: prior + 1, ...entry });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(-HISTORY_CAP)));
    return true;
  } catch { return false; }
}

export function attachSpeechReflection(reflections, note) {
  try {
    const h = speechHistory();
    if (!h.length) return false;
    const last = h[h.length - 1];
    if (Array.isArray(reflections) && reflections.length) last.reflections = reflections.slice(0, 8);
    if (typeof note === 'string' && note.trim()) last.note = note.trim().slice(0, 2000);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
    return true;
  } catch { return false; }
}

// The fixed private reflection choices (Phase 11 — verbatim).
export const REFLECTION_CHOICES = [
  { id: 'clearer-thought', label: 'The thought became clearer.' },
  { id: 'words-available', label: 'The words felt more available.' },
  { id: 'noticed-effort', label: 'I noticed unnecessary effort.' },
  { id: 'clearer-objective', label: 'My objective became clearer.' },
  { id: 'circumstances-delivery', label: 'The circumstances affected my delivery.' },
  { id: 'another-choice', label: 'I discovered another possible choice.' },
  { id: 'try-again', label: 'I would like to try this again.' },
];

// Wipe hook for Privacy → delete-everything flows.
export function wipeSpeechData() {
  try {
    localStorage.removeItem(GOAL_KEY);
    localStorage.removeItem(DONE_KEY);
    localStorage.removeItem(HISTORY_KEY);
  } catch { /* best effort */ }
}
