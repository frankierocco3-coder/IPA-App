// Short labels for the Learn path (owner direction 2026-10-15).
//
// A path node is a circle with a pill beside it, so it carries about one or
// two words. Lesson TITLES are written to be read on a shelf and are far too
// long for that: "Behavior Comes From the Situation" in a pill would look
// nothing like the design, and "Taking the Work Into Performance" would wrap
// three times.
//
// So a lesson gets a second, shorter name used ONLY on the path. It is not a
// rename: the lesson keeps its title everywhere else, the ids are untouched,
// and nothing stored moves. A lesson with no entry here falls back to its
// title, which is ugly rather than broken, so a new lesson never crashes the
// path and the gap is visible immediately.
//
// They are verbs and nouns an actor would say out loud, not summaries. The
// path is read at a glance while moving; the title is read when choosing.
// The path's own name, as the design has it. The course is called Acting &
// Scene Work everywhere else and keeps that name; this is what the route
// through it is called, which is a different thing and reads as one.
export const ACTING_PATH_TITLE = 'The Actor’s Journey';

export const ACTING_PATH_LABELS = {
  // 1 · The Situation at Hand
  'ac-offbook': 'Off Book',
  'ac-behavior': 'Behavior',
  'ac-circumstances': 'Circumstances',
  'ac-objective': 'Objective',
  'ac-obstacle': 'Obstacle',
  'ac-stakes': 'Stakes',
  'ac-urgency': 'Urgency',
  // 2 · Script Analysis
  'ac-fourlists': 'Four Lists',
  'ac-analysis': 'Through-Line',
  'ac-markup': 'Mark Up',
  'ac-ownmarks': 'Your Marks',
  'ac-question': 'Question',
  // 3 · Listening and Responding
  'ac-attention': 'Attention',
  'ac-receiving': 'Receive',
  'ac-moment': 'Moment',
  'ac-newinfo': 'Let It Land',
  'ac-repetition': 'Repetition',
  'ac-playing': 'Play It',
  // 4 · Tempo-Rhythm
  'ac-dials': 'Two Dials',
  'ac-feeling': 'Feeling',
  'ac-tworhythms': 'Two Rhythms',
  'ac-harmony': 'Harmony',
  'ac-rests': 'Rests',
  'ac-speeds': 'Speeds',
  // 5 · Preparing the Performance
  'ac-actions': 'Actions',
  'ac-monologue': 'Monologue',
  'ac-scene': 'Scene',
  'ac-twohander': 'Two-Hander',
  'ac-rehearsal': 'Rehearsal',
  'ac-integrating': 'Together',
  'ac-applying': 'Apply',
  'ac-fourthwall': 'Fourth Wall',
  // 'ac-house' is a lesson that is WRITTEN BUT NOT SHIPPED: Speaking to
  // the House is held out of acting-course.js until the owner approves it
  // in js/data/speech/reviews.js, because an unpublished lesson in a live
  // course renders as 'Review pending' to every learner. The label and
  // kind stay here so that landing the lesson is a one-file change. An
  // entry with no lesson is simply never looked up.
  'ac-house': 'The House',
  'ac-performance': 'Perform',
};

/** The path label, or the full title when none is written. */
export const actingPathLabel = (id, title) => ACTING_PATH_LABELS[id] ?? title;

// WHAT THE LESSON ASKS OF YOU (owner decision 2026-10-16), which is what
// the node icon shows. Seven kinds, reused across the course, rather than
// 34 separate pictograms: the point of the icon is to tell you what sort
// of work is coming, and that is a small set.
//
// Repetition inside a module is deliberate and not a failure of the
// scheme. All six Tempo-Rhythm lessons carry the same mark because the
// whole module is one kind of work, and seeing six of them in a row is
// the section announcing its character.
//
// A lesson with no kind falls back to its number, which is honest and
// makes a missing entry visible instead of silently picking something.
export const ACTING_PATH_KINDS = {
  // read: take in what the text or the idea gives you
  'ac-offbook': 'read', 'ac-behavior': 'read', 'ac-circumstances': 'read',
  'ac-fourlists': 'read', 'ac-analysis': 'read', 'ac-question': 'read',
  // decide: name a choice in playable terms
  'ac-objective': 'decide', 'ac-obstacle': 'decide', 'ac-stakes': 'decide',
  'ac-urgency': 'decide', 'ac-actions': 'decide', 'ac-playing': 'decide',
  // mark: get it onto the page
  'ac-markup': 'mark', 'ac-ownmarks': 'mark',
  // partner: the live half, with somebody opposite
  'ac-attention': 'partner', 'ac-receiving': 'partner', 'ac-moment': 'partner',
  'ac-newinfo': 'partner', 'ac-scene': 'partner', 'ac-twohander': 'partner',
  // time: how it moves
  'ac-dials': 'time', 'ac-feeling': 'time', 'ac-tworhythms': 'time',
  'ac-harmony': 'time', 'ac-rests': 'time', 'ac-speeds': 'time',
  // drill: repeat it until it runs unsupervised
  'ac-repetition': 'drill', 'ac-rehearsal': 'drill',
  'ac-integrating': 'drill', 'ac-applying': 'drill',
  // perform: it meets an audience
  'ac-monologue': 'perform', 'ac-fourthwall': 'perform',
  'ac-house': 'perform', 'ac-performance': 'perform',
};

export const actingPathKind = id => ACTING_PATH_KINDS[id] ?? null;
