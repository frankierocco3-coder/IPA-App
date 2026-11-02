// ── Commedia dell'Arte: its own course (owner order, 2026-11-02) ────
//
// It was module 1 of Building a Character and had outgrown the slot:
// twenty-two written lessons against seven, five, five and eight for the
// other four. A third of that course's writing sat behind one card.
//
// THE PROSE STILL LIVES IN character-course.js AND THAT IS DELIBERATE.
// Those twenty-two lessons are reviewed text; moving them between files
// would gain tidiness and risk a transcription error in material that
// has been through approval. This file takes the slice instead, using
// the same `_ALL` + filter idiom that course already uses for ROLE_LIVE.
// Relocating the prose is a separate mechanical commit if it is ever
// wanted, and nothing here changes when it happens.
//
// NO ID MOVES. Every lesson keeps its `ch-cm-*` id, because ids are
// storage in this repo: progress, review records and audio flags are all
// keyed on them. A learner who finished six commedia lessons inside
// Building a Character has finished six lessons of this course, with no
// migration and no backup path, because nothing was written.

import { CHARACTER_MODULES_ALL, CHARACTER_LESSONS_ALL } from '../character/character-course.js';

export const COMMEDIA_MODULE_ID = 'commedia';

// THE PRINCIPLE IS THE MODULE'S OWN BLURB, less its first clause. It
// read "The course starts here: complete, ready-made characters…",
// which was true of module 1 and is not true of a course. The rest is
// the owner's approved wording, unchanged. Nothing here is new writing.
export const COMMEDIA_PRINCIPLE =
  'Complete, ready-made characters that show you what every character is made of. Learn each form, then find your own life inside it.';

const SOURCE_MODULE = CHARACTER_MODULES_ALL.find(m => m.id === COMMEDIA_MODULE_ID);

// ONE MODULE FOR NOW, carrying every lesson. The owner may split these
// twenty-two into several later; that is a change to this array and to
// each lesson's `module` field, and it needs no other file to move.
export const COMMEDIA_MODULES = SOURCE_MODULE
  ? [{ n: 1, id: COMMEDIA_MODULE_ID, title: SOURCE_MODULE.title, blurb: COMMEDIA_PRINCIPLE }]
  : [];

export const COMMEDIA_LESSONS =
  CHARACTER_LESSONS_ALL.filter(l => l.module === COMMEDIA_MODULE_ID);

export const COMMEDIA_COLLECTIONS = COMMEDIA_MODULES.map(m => ({
  id: m.id, icon: '🃏', img: 'img/ui/commedia.png', title: m.title,
  lessons: COMMEDIA_LESSONS.filter(l => l.module === m.id && !l.reference)
    .sort((x, y) => x.order - y.order).map(l => l.id),
}));
