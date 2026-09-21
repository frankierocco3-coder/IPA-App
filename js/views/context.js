// Course and workspace context: who you are working as, and in which course
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { COURSE, TRACKS } from '../data/dialect-course.js';
import { speechPublished } from '../data/speech/reviews.js';
import { app, record } from '../ui.js';

export const unitById = Object.fromEntries(COURSE.map(u => [u.id, u]));
// Mini-game checkpoints woven between lessons: after every 2 lessons in
// a unit, a short review game covering everything the unit taught so far.
export function expandUnit(unit) {
  const out = [];
  const covered = [];
  unit.lessons.forEach((l, i) => {
    out.push(l);
    covered.push(l);
    if ((i + 1) % 2 === 0 && unit.lessons.length > 1) {
      const phonemes = [...new Set(covered.flatMap(x => x.phonemes ?? []))];
      const types = [...new Set(covered.flatMap(x => x.types ?? []))];
      const accent = covered.find(x => x.accent)?.accent;
      const shiftTo = covered.find(x => x.shiftTo)?.shiftTo;
      // sprinkle in extra game-y types that fit the material
      const extras = accent || shiftTo ? ['fillBlank'] : ['match', 'fillBlank', 'gapBuild'];
      // Standard British checkpoints always carry idiom material — meaning
      // questions early, register questions too (deterministic via rotation).
      if ((accent ?? shiftTo) === 'ssbe') extras.push('idiom', 'idiomRegister');
      out.push({
        id: `chk-${unit.id}-${(i + 1) / 2}`,
        title: 'Checkpoint game',
        checkpoint: true,
        phonemes,
        types: [...new Set([...types, ...extras])],
        accent,
        shiftTo,
        count: 5,
      });
    }
  });
  return out;
}
export const UNIT_EXPANDED = Object.fromEntries(COURSE.map(u => [u.id, expandUnit(u)]));
export const TRACK_LESSONS = Object.fromEntries(TRACKS.map(t => [
  t.id,
  t.unitIds.flatMap(uid => UNIT_EXPANDED[uid].map(l => ({ ...l, unit: unitById[uid], track: t }))),
]));
export const ALL_LESSONS = Object.values(TRACK_LESSONS).flat();
// Cockney is a strict-audio course (Bob and Lizzie). Launched by owner
// order 2026-08-29 after the full ear-gated audio pipeline (review batch,
// bulk, recipe book in tools/respell.json). Exported so the regression
// suite can assert visibility matches the flag.
export const COCKNEY_LIVE = true;
export const COURSES = [
  { id: 'nam', icon: '🇺🇸', label: 'Neutral American' },
  { id: 'rp', icon: '🎩', label: 'Traditional RP' },
  { id: 'ssbe', icon: '🇬🇧', label: 'Standard British' },
  { id: 'cockney', icon: '🚕', label: 'Cockney' },
  { id: 'aus', icon: '🇦🇺', label: 'Australian' },
  { id: 'core', icon: 'ʃə', label: 'IPA Foundations' },
];
export const visibleCourses = () => COURSES.filter(c => COCKNEY_LIVE || c.id !== 'cockney');
// Every workspace carries the same six sections. Learn is an OPTIONAL
// guided pathway over the Library's records — never a prerequisite for
// reading them.
export const activeCourse = () => {
  const c = localStorage.getItem('speechcraft-course');
  return visibleCourses().some(x => x.id === c) ? c : 'nam';
};
// ── Workspaces: Speech · Acting · IPA · Accents & Dialects ──
// One app, three connected work areas. The sidebar sections keep their
// names; their CONTENTS follow the active workspace. The selection is
// remembered locally; nothing about courses, progress or projects is
// duplicated or erased by switching.
export const WORKSPACES = [
  { id: 'speech', icon: '🗣', label: 'Speech',
    context: 'Clarity, confidence, persuasion and vocal freedom' },
  { id: 'acting', icon: '🎭', label: 'Acting',
    context: 'Scene study, character, text and rehearsal' },
  // Renamed from 'IPA' by owner order (2026-09-03): Voice & Speech is
  // the conservatory class name. The internal id stays 'ipa' (stored
  // values, lint pins); the IPA Foundations course chip stays inside.
  { id: 'ipa', icon: 'ʃə', label: 'Voice & Speech',
    context: 'The instrument, the sounds and the alphabet of speech — IPA Foundations inside' },
  { id: 'accents', icon: '🌍', label: 'Accents & Dialects',
    context: 'Accent and dialect courses' },
];
// ── Kill switch (2026-08-19, owner decision) ──────────────────
// The Speech workspace is withdrawn from the learner-facing app "for
// now": its content is thin next to Acting, and the full Speech build
// is deferred. NOTHING is deleted — every renderer, record, review and
// practice surface stays. The Speechcraft Textbook and Rhetoric &
// Oratory shelve in the Acting Library meanwhile. Flip to true and the
// Speech workspace returns whole.
export const SPEECH_LIVE = false;
export const liveWorkspaces = () => WORKSPACES.filter(w => SPEECH_LIVE || w.id !== 'speech');
// Workspaces that are about the work, not about an accent — they show
// no accent chip and no accent selector.
export const ACCENTLESS_WORKSPACES = ['speech', 'acting'];
export const WORKSPACE_KEY = 'speechcraft-workspace';
export const activeWorkspace = () => {
  try {
    const v = localStorage.getItem(WORKSPACE_KEY);
    if (v === 'speech' && !SPEECH_LIVE) return 'acting';
    if (WORKSPACES.some(w => w.id === v)) return v;
    // Migration from the retired page-level tabs, then inference from
    // the stored course — existing users land exactly where they were.
    if (localStorage.getItem('speechcraft-learn-mode') === 'speech'
      || localStorage.getItem('speechcraft-practice-mode') === 'speech')
      return SPEECH_LIVE ? 'speech' : 'acting';
    return activeCourse() === 'core' ? 'ipa' : 'accents';
  } catch { return 'accents'; }
};
export const setWorkspace = w => { try { localStorage.setItem(WORKSPACE_KEY, w); } catch {} };
// The course a workspace works in. IPA is always the accent-neutral
// core course; Accents & Dialects uses the stored dialect course (the
// stored value is preserved even while other workspaces are active).
export const workspaceCourse = ws => {
  if (ws === 'ipa') return COURSES.find(c => c.id === 'core');
  const c = activeCourse();
  return COURSES.find(x => x.id === (c === 'core' ? 'nam' : c));
};
export const setCourse = c => { try { localStorage.setItem('speechcraft-course', c); } catch {} };
export const trackFor = d => TRACKS.find(t => t.id === d);
// Acting content the learner may read: every acting lesson authored in
// this build is a prepared draft until a qualified acting teacher or
// coach reviews it (js/data/speech/reviews.js is the shared ledger).
// Published for preview by owner editorial approval; specialist
// review remains outstanding and is tracked separately.
export const actingVisible = l => speechPublished(l.id);
// Dialects you can read/scan/transcribe any text in.
export const TEXT_DIALECTS = [
  { id: 'nam', label: 'Neutral American', lang: 'en-US', flag: '🇺🇸' },
  { id: 'rp', label: 'Traditional RP', lang: 'en-GB', flag: '🎩' },
  { id: 'ssbe', label: 'Standard British', lang: 'en-GB', flag: '🇬🇧' },
  // Cockney joins the Studio dialect pickers only when its course is live —
  // a hidden course must never leak through a project screen.
  ...(COCKNEY_LIVE ? [{ id: 'cockney', label: 'Cockney', lang: 'en-GB', flag: '🚕' }] : []),
  { id: 'aus', label: 'Australian', lang: 'en-AU', flag: '🇦🇺' },
];
export const dialectName = id => (TEXT_DIALECTS.find(d => d.id === id) || {}).label || '';
