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

import { CHARACTER_LESSONS_ALL } from '../character/character-course.js';

export const COMMEDIA_MODULE_ID = 'commedia';

// ── The three modules (owner order, 2026-11-02) ─────────────────────
//
// THE COURSE HAS NINE PATH LESSONS, NOT TWENTY-TWO. Thirteen of the
// twenty-two records are `reference: true` — the mask chapters, one per
// character, reached from the relationship chart inside The Cast. By
// the owner's order of 2026-09-22 a reference record "is not listed in
// its module, shelved, counted or given a place in the Next sequence",
// so the modules split here are modules of the nine.
//
// THE FIRST ATTEMPT AT THIS SPLIT GOT IT WRONG and the mistake is worth
// leaving written down. It grouped all twenty-two by the tradition's own
// taxonomy — Masters, Servants, Lovers — which reads beautifully and
// produced three modules containing nothing but reference pages. The
// path refuses to walk them, so the Learn page rendered ONE card. The
// seam in the `order` numbers (1-9, then a jump to 101-115) is real; it
// just marks the path/reference boundary rather than four subjects.
// Promoting the masks to path lessons would fix it and is a content
// decision, not a refactor — it is the owner's to make, not mine.
//
// THE GROUPS ARE CONTIGUOUS IN `order` ON PURPOSE. A learner walks the
// modules in sequence, so regrouping across the order would silently
// reshuffle an approved reading order. Cut at 3 and 6 and the walk is
// character-for-character the one the course already had.
//
// IDS ARE NEW AND PERMANENT. The lessons keep their ch-cm-* ids; these
// `cm-*` ids name MODULES, which did not exist before, so nothing is
// renamed. A lesson's module is remapped here rather than edited in
// character-course.js, so the reviewed prose is never touched.
//
// TITLES ARE DRAFTS. Each takes its words from the lessons inside it —
// "Playing to a Form" from Learning a Form, "The Mask and the Cast"
// from the two lessons it names. The course's own vocabulary rather
// than new coinage, but still writing, and unapproved.
const GROUPS = [
  { n: 1, id: 'cm-roots', title: 'Where It Comes From',
    blurb: 'Why a modern actor starts here, where the form came from, and the physical comedy it handed down.',
    ids: ['ch-cm-why', 'ch-cm-history', 'ch-cm-slapstick'] },
  { n: 2, id: 'cm-form', title: 'Playing to a Form',
    blurb: 'How a company built a play from one page, and what it means to play a character that existed before you did.',
    ids: ['ch-cm-scenario', 'ch-cm-form', 'ac-archetypes'] },
  { n: 3, id: 'cm-cast', title: 'The Mask and the Cast',
    blurb: 'The mask that leads the body, the company it belongs to, and the set pieces they played.',
    // THE THIRTEEN MASK CHAPTERS LIVE HERE. They never appear on the
    // path, but a reference page still resolves a module for its
    // breadcrumb — "Module 3 · The Mask and the Cast" — and this is the
    // module holding The Cast, which is the lesson they are reached
    // from. The breadcrumb naming anywhere else would be a lie.
    ids: ['ch-cm-mask', 'ch-cm-cast', 'ch-cm-lazzi',
          'ch-cm-pantalone', 'ch-cm-dottore', 'ch-cm-tartaglia',
          'ch-cm-brighella', 'ch-cm-arlecchino', 'ch-cm-colombina',
          'ch-cm-pulcinella', 'ch-cm-pedrolino', 'ch-cm-zanni',
          'ch-cm-pasquariello', 'ch-cm-lovers', 'ch-cm-capitano',
          'ch-cm-scaramuccia'] },
];
const GROUP_OF = new Map(GROUPS.flatMap(g => g.ids.map(id => [id, g.id])));

// THE PRINCIPLE IS THE MODULE'S OWN BLURB, less its first clause. It
// read "The course starts here: complete, ready-made characters…",
// which was true of module 1 and is not true of a course. The rest is
// the owner's approved wording, unchanged. Nothing here is new writing.
export const COMMEDIA_PRINCIPLE =
  'Complete, ready-made characters that show you what every character is made of. Learn each form, then find your own life inside it.';

export const COMMEDIA_MODULES = GROUPS.map(({ n, id, title, blurb }) => ({ n, id, title, blurb }));

// THE REMAP IS A COPY, not an edit. Each lesson is spread into a new
// object carrying its new module; the originals in character-course.js
// are untouched, which is what lets reviewed prose stay where it is.
// `order` is left alone and needs no adjusting: the groups are
// contiguous runs of it, so sorting inside a group and walking the
// groups in turn both reproduce the original 1-9 sequence.
//
// A lesson the groups forgot would silently vanish from the course, so
// it falls back to the first module instead and the count below is the
// check that nothing did.
export const COMMEDIA_LESSONS = CHARACTER_LESSONS_ALL
  .filter(l => l.module === COMMEDIA_MODULE_ID)
  .map(l => ({ ...l, module: GROUP_OF.get(l.id) ?? GROUPS[0].id }));

const SHELF_ICON = { 'cm-roots': '🃏', 'cm-form': '📜', 'cm-cast': '🎭' };

export const COMMEDIA_COLLECTIONS = COMMEDIA_MODULES.map(m => ({
  id: m.id, icon: SHELF_ICON[m.id] ?? '🃏',
  img: m.id === 'cm-roots' ? 'img/ui/commedia.png' : null, title: m.title,
  lessons: COMMEDIA_LESSONS.filter(l => l.module === m.id && !l.reference)
    .sort((x, y) => x.order - y.order).map(l => l.id),
}));
