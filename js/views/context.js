// Course and workspace context: who you are working as, and in which course
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { COURSE, TRACKS } from '../data/dialect-course.js';
import { speechPublished } from '../data/speech/reviews.js';
import { app, record } from '../ui.js';

export const unitById = Object.fromEntries(COURSE.map(u => [u.id, u]));

// THE LAST UNIT OF EACH TRACK, so a course can end on its own final.
// No unit belongs to two tracks - checked - so "last unit of its track"
// is a property of the unit and this map can hold it.
const TRACK_FINAL_UNITS = new Set(TRACKS.map(t => t.unitIds[t.unitIds.length - 1]));

// Mini-game checkpoints woven between lessons: after every 2 lessons in
// a unit, a short review game covering everything the unit taught so far.
//
// EXCEPT AFTER THE LAST LESSON OF A COURSE (2026-11-10). The rule fires on
// every even-numbered lesson with no sense of where it is, so a unit with
// an EVEN lesson count got a review game after its final one. Where that
// unit ended a track, the course ended on a generated game sitting after
// its own last lesson - the mastery final in nam, rp and aus, the round-up
// in core (r-4) and shift (sh-4). nam-final's copy reads "Pass this and
// Neutral American is yours - the course is complete." It then wasn't.
//
// It read worse than it looked: `mastered` is done === total over the whole
// chain, so passing the final exam showed "Lesson complete!" and the
// trailing game got "Course complete!". Five tracks ended this way - nam,
// rp, aus, core and shift. ssbe and cockney never did, purely because their
// last unit holds three lessons and the even rule never fired.
//
// A REGRESSION FROM THE 2026-11-06 REGROUP, not an old bug. Mastery used to
// be a unit of ONE lesson, so `unit.lessons.length > 1` was false and no
// accent course could end on a game. Folding Mastery into "Putting It to
// Work" made that unit four lessons and tripped the rule.
//
// SCOPED TO THE TRACK-ENDING CASE ON PURPOSE (owner's call). A checkpoint
// after an even-numbered unit MID-course is a stage review and still fires;
// only the one that would follow a course's last lesson is suppressed.
// Because it only ever removes a track's final node, no lesson's unlock
// dependency moves: isUnlocked keys on the PREVIOUS node, and nothing
// follows this one.
export function expandUnit(unit) {
  const out = [];
  const covered = [];
  unit.lessons.forEach((l, i) => {
    out.push(l);
    covered.push(l);
    const endsTheCourse = i === unit.lessons.length - 1 && TRACK_FINAL_UNITS.has(unit.id);
    if ((i + 1) % 2 === 0 && unit.lessons.length > 1 && !endsTheCourse) {
      const phonemes = [...new Set(covered.flatMap(x => x.phonemes ?? []))];
      const types = [...new Set(covered.flatMap(x => x.types ?? []))];
      const accent = covered.find(x => x.accent)?.accent;
      const shiftTo = covered.find(x => x.shiftTo)?.shiftTo;
      // sprinkle in extra game-y types that fit the material
      const extras = accent || shiftTo ? ['fillBlank'] : ['match', 'fillBlank', 'gapBuild'];
      // Standard British and Cockney checkpoints always carry idiom material
      // — meaning questions early, register questions too (deterministic via
      // rotation).
      //
      // COCKNEY JOINED ON 2026-11-10 and should have been here from the
      // start. docs/BUILD_COCKNEY_COURSE.md §6 shipped a 60-entry Cockney
      // set in Phase B and its Stage 3 plan asks for "expressions in
      // sentences, register" — then no cockney lesson or checkpoint ever
      // asked for one, so all 60 reviewed entries sat unread.
      //
      // Both generators are accent-driven: genIdiom reads idiomPool(accent)
      // and genIdiomRegister reads idiomFor(accent), so each course draws
      // its OWN register. The sets are never pooled, because a Cockney clip
      // must be Bob or Lizzie — the same voice-bound reason §6 gives for
      // re-authoring the overlapping terms instead of cross-referencing them.
      if ((accent ?? shiftTo) === 'ssbe' || (accent ?? shiftTo) === 'cockney') {
        extras.push('idiom', 'idiomRegister');
      }
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
// Reading storage can THROW, not merely return null: Safari refuses the
// localStorage property itself when cookies are blocked. This runs on
// nearly every render, so an unreadable course falls back exactly as an
// absent one does. Same guard as activeWorkspace below.
export const activeCourse = () => {
  let c = null;
  try { c = localStorage.getItem('speechcraft-course'); } catch { /* fresh */ }
  return visibleCourses().some(x => x.id === c) ? c : 'nam';
};
// ── Workspaces ────────────────────────────────────────────────
// One app, several connected work areas. The sidebar sections keep their
// names; their CONTENTS follow the active workspace. The selection is
// remembered locally; nothing about courses, progress or projects is
// duplicated or erased by switching.
//
// THIS ARRAY IS THE DISPLAY ORDER. The workspace switcher renders
// liveWorkspaces() straight through, so the order here is the order on
// screen. Owner order 2026-09-25: Acting, Building a Character,
// Shakespeare, Voice & Speech, Accents & Dialects — the work first, the
// instrument and the accents after it.
//
// AMENDED 2026-11-06: Rhetoric and Theatre History moved to the END, in
// that order, by owner order. See the comment above them.
export const WORKSPACES = [
  { id: 'acting', icon: '🎭', img: 'img/ui/scenes.png', label: 'Acting',
    context: 'Scene study, character, text and rehearsal' },
  // CROPPED TO HEAD AND WAIST FROM A FULL-LENGTH DRAWING, and the crop is
  // the point. The owner supplied a standing mannequin; at the 32px the
  // switcher rows render, a full figure measured 42% wide against 96% tall,
  // aspect 0.44 and 44% ink. A square icon box gives a tall thin figure
  // nowhere to go, so it rendered at roughly half the visual weight of the
  // masks and the head beside it. Head to waist keeps the blank mannequin
  // head, the waistcoat, the sash and the hand on the hip — everything that
  // says "a character being built" — and comes out aspect 0.79 and 51% ink,
  // in family with its neighbours. Same artwork, no regeneration.
  { id: 'character', icon: '🧍', img: 'img/ui/building-character.png', label: 'Building a Character',
    context: 'Inventing a person and building a cast role' },
  // COMMEDIA LEFT BUILDING A CHARACTER ON 2026-11-02 and the line above
  // changed with it: that course's context promised commedia dell'arte,
  // and promising it in two places would make one of them wrong.
  { id: 'commedia', icon: '🃏', img: 'img/ui/commedia.png', label: 'Commedia dell’Arte',
    context: 'The ready-made characters, and what every character is made of' },
  // MUSICAL THEATRE, from the owner's handoff of 2026-11-03. It sits here
  // beside Commedia because both are courses about where the work came
  // from rather than about a technique: a tradition and its history, and
  // one genre's repertoire.
  //
  // THEATRE HISTORY ARRIVED WITH IT AND HAS SINCE MOVED to the end of
  // this array, with Rhetoric (owner order, 2026-11-06). Its own comment
  // went down there with it.
  //
  // NO `img` YET. A workspace with no artwork falls back to its emoji,
  // which is honest and ugly; the owner makes the chips and this one is
  // still waiting for its.
  { id: 'musical', icon: '🎼', label: 'Musical Theatre',
    context: 'The book musical, and a repertoire organised so you can find your song' },
  // SCREEN ACTING, from his handoff of 2026-11-03. It sits next to Acting
  // rather than with the history courses, because it is a craft course:
  // the same job as Acting & Scene Work, done for a lens instead of a room.
  // No `img` yet either — see docs/WORKSPACE_CHIP_BRIEF.md, which now owes
  // three chips rather than two.
  { id: 'screen', icon: '🎥', label: 'Screen Acting',
    context: 'Acting for the lens: scale, stillness, listening and the self-tape' },
  // THE PORTRAIT, NOT THE SKULL-HOLDER (owner decision 2026-10-14). It
  // pointed at soliloquy.png so that the commissioned lavender respin would
  // improve the chip and the shelf tile together; the owner chose the face
  // instead, and it is also the better icon at this size. Rendered at 20, 24
  // and 32px side by side, the portrait holds at every one — a pale face
  // against dark hair and a cream ruff keeps a focal point — while the
  // skull-holder is two similar pale ovals on red and goes soft by 20px.
  //
  // It does mean the bust now appears four times across this workspace: the
  // chip, the Shakespeare 101 shelf, and the covers of folio.png and
  // shakespeare-dictionary.png. That is the trade, and it buys a chip that is
  // legible at phone size. soliloquy.png keeps the Soliloquies shelf, so the
  // respin still has somewhere to land.
  { id: 'shakespeare', icon: '🪶', img: 'img/ui/shakespeare.png', label: 'Shakespeare',
    context: 'The language, the verse, and text that is harder to read than it is to play' },
  // ── ONE WORKSPACE, SIX COURSES (owner order 2026-11-03) ──────
  //
  // Voice & Speech and Accents & Dialects were two workspaces until
  // today, and the split was never about the work: both are the same
  // instrument, and the only real difference was that this one pinned
  // itself to IPA Foundations while the other let you pick among the
  // five accents. The owner merged them — "one workspace, with the
  // option to pick accents and dialects in it" — so the course selector
  // now offers all SIX and the instrument and the accents share a roof.
  //
  // THE ID STAYS 'ipa' AND THE RETIRED ID IS 'accents'. Ids are storage;
  // this one was already a label that does not match its id (renamed to
  // Voice & Speech by owner order 2026-09-03, "the id never moved"), and
  // keeping it means the surviving workspace adds no SECOND id/label
  // mismatch to a project whose own instructions call that the easiest
  // mistake here. A stored 'accents' migrates in activeWorkspace()
  // below, the way a stored 'speech' falls back to 'acting'; 'accents'
  // is retired and is never reused.
  //
  // globe.png is NOT orphaned by this. It was named for an object rather
  // than for "accents" precisely so it could serve twice — see
  // docs/PRACTICE_ICON_BRIEF.md, which specs the same small globe for the
  // Name the Accent game. The switcher row it used to fill is gone; the
  // game tile still renders it. instrument.png wins the merged row
  // because the workspace is the instrument, accents included.
  { id: 'ipa', icon: 'ʃə', img: 'img/ui/instrument.png', label: 'Voice & Speech',
    context: 'The instrument, the sounds and the accents — IPA Foundations and the five accent courses inside' },
  // ── RHETORIC, THEN THEATRE HISTORY, LAST (owner order 2026-11-06) ──
  //
  // His words: "put rhetoric and theatre history as the last 2 in the
  // workspaces in that order."
  //
  // This supersedes the 2026-09-25 ordering at the top of the array FOR
  // THESE TWO ONLY. Rhetoric sat after Shakespeare and before the
  // instrument, on the reasoning that the work came first and then the
  // instrument; Theatre History sat beside Commedia with Musical Theatre,
  // as one of the courses about where the work came from. The rest of
  // that order is untouched.
  //
  // THEY ARE THE LAST TWO A LEARNER SEES even though `speech` is below
  // them, because `speech` is withdrawn behind SPEECH_LIVE and
  // liveWorkspaces() never returns it.
  { id: 'rhetoric', icon: '🏛️', img: 'img/ui/rhetoric.png', label: 'Rhetoric',
    context: 'How speech changes what people think and do, built on purpose rather than by luck' },
  // NO `img` YET — see docs/WORKSPACE_CHIP_BRIEF.md, which owes this one
  // a chip along with Musical Theatre and Screen Acting.
  { id: 'theatre', icon: '🏺', label: 'Theatre History',
    context: 'Where the form came from, and what each stage asked of a performer' },
  // Withdrawn behind SPEECH_LIVE and therefore never rendered, so its
  // position is moot until that flag flips. Kept at the very end rather
  // than deleted: the kill switch is a flag, not a removal.
  { id: 'speech', icon: '🗣', label: 'Speech',
    context: 'Clarity, confidence, persuasion and vocal freedom' },
];
// ── Kill switch (2026-08-19, owner decision) ──────────────────
// The Speech workspace is withdrawn from the learner-facing app "for
// now": its content is thin next to Acting, and the full Speech build
// is deferred. NOTHING is deleted — every renderer, record, review and
// practice surface stays. The Speechcraft Textbook and Rhetoric &
// Oratory shelve in the Acting Library meanwhile. Flip to true and the
// Speech workspace returns whole.
export const SPEECH_LIVE = false;
// Building a Character LAUNCHED 2026-09-23 on the owner's editorial
// approval, once four modules existed and the course could stand alone
// (the lesson the Speech withdrawal taught). Every record carries an
// owner-approved entry in js/data/speech/reviews.js; specialist review
// by a named acting teacher or coach is still outstanding and tracked.
// The #character-preview link remains, and now only suppresses the
// influence tags on module titles.
export const CHARACTER_LIVE = true;
export const CHARACTER_PREVIEW_KEY = 'speechcraft-character-preview';
export const characterPreview = () => {
  try { return localStorage.getItem(CHARACTER_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const characterOpen = () => CHARACTER_LIVE || characterPreview();
// Shakespeare is the fifth workspace (owner decision 2026-09-24: its own
// course, not a module inside Acting). It was hidden behind this flag
// while it was written — the lesson the Speech withdrawal taught and the
// route Building a Character took.
//
// LAUNCHED 2026-09-27 on the owner's order, and it can stand alone: seven
// modules and forty lessons, every one carrying its own publication entry
// in js/data/speech/reviews.js, plus the eight scene analyses (all
// approved), the 277-entry lexicon and the seventeen rhetorical figures.
// Nothing renders as a locked shelf, which is the failure the Character
// launch taught us to check for before flipping rather than after.
//
// WHAT LAUNCHING DOES NOT MEAN: it publishes on the OWNER'S EDITORIAL
// approval alone. No Shakespeare scholar, verse teacher or acting
// professional has reviewed any of the forty, awaitingSpecialist() is
// true for every one, and the pages say so where a reader will see it.
// Do not let a later edit imply a sign-off that never happened.
//
// The preview key stays. It costs nothing and it is how the next course
// gets read before it launches.
// COMMEDIA, lifted out of Building a Character on 2026-11-02.
//
// IT SHIPPED GATED FOR ABOUT AN HOUR AND THAT WAS A MISTAKE. Those
// lessons were already published — nine of them live inside Building a
// Character — and the split removed them from that course while this
// one was shut. Content a learner could read in the morning was
// reachable nowhere by the afternoon. Gating a NEW course is right;
// gating a course made of already-published lessons is a withdrawal,
// and withdrawals here are deliberate and flagged, not a side effect of
// moving a file.
export const COMMEDIA_LIVE = true;
export const COMMEDIA_PREVIEW_KEY = 'speechcraft-commedia-preview';
export const commediaPreview = () => {
  try { return localStorage.getItem(COMMEDIA_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const commediaOpen = () => COMMEDIA_LIVE || commediaPreview();
// A lesson shows when it is published, exactly as in the course it came
// from — the approvals are keyed on ids that did not move.
export const commediaVisible = l => commediaPreview() || speechPublished(l.id);

// ── THEATRE HISTORY, from the owner's handoff of 2026-11-03 ────
//
// GATED, and this one is the ordinary case rather than the Commedia
// case. Commedia shipped open because its lessons were ALREADY
// published and shutting the course would have withdrawn them. Nothing
// here has ever been published: twenty-two lessons of supplied draft,
// and the handoff says in its own words that they are "editorial
// drafts, not a publication-ready scholarly edition" whose historical
// claims want verifying first. So it opens the way Character,
// Shakespeare and Rhetoric all opened — behind a flag, with a preview
// key so the owner can read it before a learner can.
//
// Flipping this needs two things, not one: an owner editorial entry per
// lesson in js/data/speech/reviews.js, and the knowledge that the
// specialist this material asks for is a theatre historian.
//
// OPENED 2026-11-03 ON OWNER ORDER, with the first of those two in hand
// and the second still outstanding. All twenty-two records carry an
// 'owner-approved' entry as of that date, so nothing renders as a draft
// gate — but they came from ONE blanket approval of three courses, not
// twenty-two readings, and no theatre historian has read a word. The
// historical claims the handoff asked to verify are still unverified;
// awaitingSpecialist() is true for every record and the page says so.
// See the forty-four-entry block in js/data/speech/reviews.js.
export const THEATRE_LIVE = true;
export const THEATRE_PREVIEW_KEY = 'speechcraft-theatre-preview';
export const theatrePreview = () => {
  try { return localStorage.getItem(THEATRE_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const theatreOpen = () => THEATRE_LIVE || theatrePreview();
export const theatreVisible = l => theatrePreview() || speechPublished(l.id);

// ── MUSICAL THEATRE, same handoff, same day ───────────────────
//
// GATED FOR A SECOND REASON ON TOP OF THE FIRST, and that second reason
// has since expired. It read "two written lessons and eight catalogue
// pages" — the Speech test of 2026-08, content too thin to stand alone.
// MEASURED 2026-11-03, after the content work of that morning: FIVE
// prose lessons of 495 to 984 words, a repertoire guide, and the eight
// catalogue pages. That is the same order as Screen Acting's eight, so
// thinness is no longer what holds it shut.
//
// OPENED 2026-11-03 ON OWNER ORDER. All fourteen records carry an
// 'owner-approved' entry, from the same blanket approval of three
// courses described in js/data/speech/reviews.js — one editorial
// judgement, not fourteen readings. The theatre historian these
// claims want has still not read them, and awaitingSpecialist() stays
// true for all fourteen. It remains the thinnest of the three.
export const MUSICAL_LIVE = true;
export const MUSICAL_PREVIEW_KEY = 'speechcraft-musical-preview';
export const musicalPreview = () => {
  try { return localStorage.getItem(MUSICAL_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const musicalOpen = () => MUSICAL_LIVE || musicalPreview();
export const musicalVisible = l => musicalPreview() || speechPublished(l.id);

// ── SCREEN ACTING, same handoff, same day ─────────────────────
//
// It asks for an ACTING professional rather than a theatre historian —
// the claims in it are craft claims about scale, eyelines and listening,
// not historical ones — which is the same reviewer Acting and Building a
// Character are still waiting on.
//
// OPENED 2026-11-03 ON OWNER ORDER, one day after it was written. All
// eight chapters carry an 'owner-approved' entry from the blanket
// approval described in js/data/speech/reviews.js, so none renders as a
// draft gate; no acting teacher or coach has reviewed any of it, and
// awaitingSpecialist() stays true for all eight.
//
// It is also the course with the most to lose from a careless edit: its
// eighth chapter teaches one named twentieth-century tradition, and the
// chapter says so in a content note rather than presenting it as how
// acting works. See the header of js/data/screen/screen-course.js.
export const SCREEN_LIVE = true;
export const SCREEN_PREVIEW_KEY = 'speechcraft-screen-preview';
export const screenPreview = () => {
  try { return localStorage.getItem(SCREEN_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const screenOpen = () => SCREEN_LIVE || screenPreview();
export const screenVisible = l => screenPreview() || speechPublished(l.id);

export const SHAKESPEARE_LIVE = true;
export const SHAKESPEARE_PREVIEW_KEY = 'speechcraft-shakespeare-preview';
export const shakespearePreview = () => {
  try { return localStorage.getItem(SHAKESPEARE_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const shakespeareOpen = () => SHAKESPEARE_LIVE || shakespearePreview();
// The course flag. NOT the same thing as RHETORIC_LIVE in js/main.js,
// which hides a reading pathway of three Plato dialogues and predates
// this by months. Two different features, two different names, and the
// distinction is worth the longer name.
//
// Hidden while it is written, the route Character and Shakespeare both
// took. Module 1 is written; modules 2 to 6 are outlined and empty, so
// the course cannot stand alone yet and must not reach a learner.
export const RHETORIC_COURSE_LIVE = true;

// The saved eight-part worksheet, Take a Speech Apart. WITHDRAWN by owner
// order 2026-09-29, the same day it was built, and withdrawn rather than
// deleted because the kill switch in this app is a flag: the questions,
// the store mode, the picker and the screen are all whole behind it, and
// flipping this one line brings the door back.
//
// The data layer stays live on purpose and is safe either way. The key
// shape for existing dissections is untouched, and the delete cascade
// covering every mode is a fix worth keeping whether or not a learner can
// ever write a rhetoric worksheet.
export const RHETORIC_WORKSHEET_LIVE = false;
export const RHETORIC_PREVIEW_KEY = 'speechcraft-rhetoric-preview';
export const rhetoricPreview = () => {
  try { return localStorage.getItem(RHETORIC_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const rhetoricOpen = () => RHETORIC_COURSE_LIVE || rhetoricPreview();

// THE LEARN SEQUENCE (owner request 2026-10-15), preview only for now.
// The book courses render Learn as a grid of module tiles, which is the
// same set the Library shelves and the same component, so the two pages
// read as one page twice. The thing only Learn can show, where you are in
// an order, was a single line of text under a progress bar.
//
// This flag swaps that grid for the lesson sequence itself.
//
// IT IS A ROUTE AND A GATE NOW, AND THIS PARAGRAPH USED TO DENY IT. Until
// 2026-10-22 it read "nothing locks, nothing is a prerequisite… the winding
// path with locked nodes stays where it belongs, on IPA and Accents". The
// owner's order that day ("it should function like Duolingo") chained the
// book courses too, so locked nodes are no longer an accent-only thing.
//
// The promise it cites is still kept, and still in those words, but it
// belongs to the LIBRARY: every chapter is free to read there in any order,
// and a lesson locked on the path opens in full from its shelf. Gating
// READING would walk straight back into what the hearts removal took out on
// 2026-10-05; sequencing a route past an always-visible free-play switch
// does not. The switch is the load-bearing half — see the statsbar padlock.
export const LEARN_SEQUENCE_PREVIEW_KEY = 'speechcraft-learn-sequence-preview';
export const learnSequencePreview = () => {
  try { return localStorage.getItem(LEARN_SEQUENCE_PREVIEW_KEY) === 'on'; } catch { return false; }
};
export const liveWorkspaces = () => WORKSPACES.filter(w =>
  (SPEECH_LIVE || w.id !== 'speech')
  && (w.id !== 'character' || characterOpen())
  && (w.id !== 'commedia' || commediaOpen())
  && (w.id !== 'theatre' || theatreOpen())
  && (w.id !== 'musical' || musicalOpen())
  && (w.id !== 'screen' || screenOpen())
  && (w.id !== 'shakespeare' || shakespeareOpen())
  && (w.id !== 'rhetoric' || rhetoricOpen()));
// Workspaces that are about the work, not about an accent — they show
// no accent chip and no accent selector.
export const ACCENTLESS_WORKSPACES = ['speech', 'acting', 'character', 'commedia',
  'theatre', 'musical', 'screen', 'shakespeare', 'rhetoric'];
export const WORKSPACE_KEY = 'speechcraft-workspace';
export const activeWorkspace = () => {
  try {
    const v = localStorage.getItem(WORKSPACE_KEY);
    if (v === 'speech' && !SPEECH_LIVE) return 'acting';
    if (v === 'character' && !characterOpen()) return 'acting';
    if (v === 'theatre' && !theatreOpen()) return 'acting';
    if (v === 'musical' && !musicalOpen()) return 'acting';
    if (v === 'screen' && !screenOpen()) return 'acting';
    if (v === 'shakespeare' && !shakespeareOpen()) return 'acting';
    if (v === 'rhetoric' && !rhetoricOpen()) return 'acting';
    // 'accents' IS A RETIRED ID as of the 2026-11-03 merge: its workspace
    // and Voice & Speech are one, and the accent courses are six rows in
    // that workspace's course menu. Anyone whose last workspace was
    // Accents & Dialects lands in Voice & Speech on the course they were
    // already in, because the course is stored separately and untouched.
    // Same shape as the 'speech' fallback above, and for the same reason:
    // an id is storage, so it is redirected, never renamed or reused.
    if (v === 'accents') return 'ipa';
    if (WORKSPACES.some(w => w.id === v)) return v;
    // Migration from the retired page-level tabs, then inference from
    // the stored course — existing users land exactly where they were.
    if (localStorage.getItem('speechcraft-learn-mode') === 'speech'
      || localStorage.getItem('speechcraft-practice-mode') === 'speech')
      return SPEECH_LIVE ? 'speech' : 'acting';
    // Both arms of this used to be reachable — 'ipa' for the core course,
    // 'accents' for an accent one. One workspace now holds both courses,
    // so the inference has nothing left to infer.
    return 'ipa';
  } catch { return 'ipa'; }
};
export const setWorkspace = w => { try { localStorage.setItem(WORKSPACE_KEY, w); } catch {} };
// The course a workspace works in — now simply the stored one, which is
// the whole point of the 2026-11-03 merge.
//
// IT USED TO BE TWO RULES AND A REMAP. Voice & Speech pinned itself to
// 'core' and ignored the stored value; everything else took the stored
// value but remapped 'core' to 'nam', because 'core' belonged to a
// workspace you were not in. One workspace holds all six courses now, so
// 'core' is an ordinary selectable course here and the remap would
// silently refuse the one it was written to exclude.
//
// `activeCourse()` already validates against visibleCourses() and falls
// back to 'nam', so an unreadable or retired stored value cannot arrive
// here. The find therefore cannot miss, and the book workspaces that pass
// through here get a course object they ignore, exactly as before.
//
// `ws` is now UNUSED and is kept on purpose: every caller passes it, the
// answer simply no longer depends on it, and a signature change here
// would touch call sites for no behavioural gain.
export const workspaceCourse = ws =>
  COURSES.find(x => x.id === activeCourse());

// ── The merge's one-time course migration (2026-11-03) ────────
//
// A learner in the old Voice & Speech was ALWAYS in IPA Foundations,
// whatever `speechcraft-course` said: the workspace pinned 'core' and the
// stored value sat underneath holding whichever accent they last picked
// in the other workspace. Drop the pin and that buried value surfaces, so
// a reader who was three lessons into IPA Foundations would open the app
// in Neutral American instead — nothing lost, but silently relocated.
//
// This runs ONCE, keyed, and only for the people that describes: stored
// workspace 'ipa'. Anyone arriving from 'accents' already has the right
// course stored and is left alone. Nothing is deleted and nothing is
// overwritten for anyone else, so the merge stays reversible.
export const MERGE_KEY = 'speechcraft-ipa-accents-merged';
export const migrateMergedWorkspace = () => {
  try {
    if (localStorage.getItem(MERGE_KEY)) return false;
    const was = localStorage.getItem(WORKSPACE_KEY);
    localStorage.setItem(MERGE_KEY, '1');
    if (was !== 'ipa') return false;
    localStorage.setItem('speechcraft-course', 'core');
    return true;
  } catch { return false; }   // storage unreadable: nothing to migrate
};
export const setCourse = c => { try { localStorage.setItem('speechcraft-course', c); } catch {} };
export const trackFor = d => TRACKS.find(t => t.id === d);
// Acting content the learner may read: every acting lesson authored in
// this build is a prepared draft until a qualified acting teacher or
// coach reviews it (js/data/speech/reviews.js is the shared ledger).
// Published for preview by owner editorial approval; specialist
// review remains outstanding and is tracked separately.
export const actingVisible = l => speechPublished(l.id);
// Building a Character follows the same ledger once it launches. In the
// owner preview every written lesson shows, because the whole workspace
// is invisible to learners until then.
export const characterVisible = l => characterPreview() || speechPublished(l.id);
// Shakespeare uses the same ledger and the same preview rule. While the
// workspace is hidden the owner sees every written lesson; when it goes
// live, each lesson needs its own publication entry like every other.
export const shakespeareVisible = l => shakespearePreview() || speechPublished(l.id);
// Rhetoric follows the same rule: the owner sees every written lesson
// while the course is hidden, and once it launches each lesson needs its
// own publication entry like every other.
export const rhetoricVisible = l => rhetoricPreview() || speechPublished(l.id);
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
