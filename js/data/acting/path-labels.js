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
//
// The ROUTE's name is not here. ACTING_PATH_TITLE lived in this file until
// 2026-10-21, when every course got its own Learn scene and the heading
// started coming from `scene.title`. The export stayed behind, still
// imported by main.js and read by nothing — so editing it changed no
// pixel. The name is now in js/data/learn-scenes.js under `acting:`,
// which is the file that draws the page.

export const ACTING_PATH_LABELS = {
  // 1 · Where Behavior Comes From
  'ac-offbook': 'Off Book',
  'ac-behavior': 'Behavior',
  'ac-circumstances': 'Circumstances',
  'ac-objective': 'Objective',
  'ac-obstacle': 'Obstacle',
  'ac-stakes': 'Stakes',
  'ac-urgency': 'Urgency',
  'ac-physicalscore': 'Physical Score',
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
  'ac-physicalscore': 'drill',
  'ac-repetition': 'drill', 'ac-rehearsal': 'drill',
  'ac-integrating': 'drill', 'ac-applying': 'drill',
  // perform: it meets an audience
  'ac-monologue': 'perform', 'ac-fourthwall': 'perform',
  'ac-house': 'perform', 'ac-performance': 'perform',
};

export const actingPathKind = id => ACTING_PATH_KINDS[id] ?? null;

// ONE DRAWING PER LESSON (owner mockups, 2026-10-22). The seven kind
// glyphs above still say what sort of work a lesson is, and the badge on
// the card still carries that; but ACTING_PATH_KINDS deliberately marks a
// whole module the same way, so the path drew the identical picture on
// all six Tempo-Rhythm nodes and all six Listening nodes. The mockups
// draw a different one on every node, and on a route you are reading at
// a glance the picture is how you tell one stop from the next.
//
// Inner paths only, on the same 24-unit grid as LP_ICONS, stroked with
// currentColor so a node state colours its own glyph. A lesson with no
// drawing falls back to its kind glyph and then to its number, so a new
// lesson is plain rather than empty and nothing here can 404.
export const ACTING_LESSON_ICONS = {
  // 1 · Script Analysis
  'ac-fourlists': '<circle cx="4.8" cy="5.2" r="1.2"/><circle cx="4.8" cy="9.8" r="1.2"/><circle cx="4.8" cy="14.4" r="1.2"/><circle cx="4.8" cy="19" r="1.2"/><path d="M8.8 5.2h10.4M8.8 9.8h10.4M8.8 14.4h10.4M8.8 19h10.4"/>',
  'ac-analysis': '<path d="M2.6 15.4c3.6 0 3.2-8 6.8-8s3.2 8 6.8 8c2 0 2.8-2.2 2.8-2.2"/><path d="M17.2 10.6l2.4 2.2-2.6 2"/>',
  'ac-markup': '<path d="M4 20l1-4.2L16.1 4.7a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19 4 20z"/><path d="M14.6 6.2l3.2 3.2"/>',
  'ac-ownmarks': '<ellipse cx="7.4" cy="7.8" rx="2.5" ry="3.6"/><ellipse cx="16.2" cy="14.4" rx="2.5" ry="3.6"/><path d="M5.4 12.8c1.3 1 2.7 1 4 0"/><path d="M14.2 19.4c1.3 1 2.7 1 4 0"/>',
  'ac-question': '<path d="M20.4 14.2a2.6 2.6 0 0 1-2.6 2.6H9.2l-4.4 3.4v-3.4a2.6 2.6 0 0 1-2.6-2.6V6.4a2.6 2.6 0 0 1 2.6-2.6h13a2.6 2.6 0 0 1 2.6 2.6z"/><path d="M9.8 8.4a2.2 2.2 0 1 1 2.9 2.1c-.6.3-.9.8-.9 1.5"/><circle cx="11.8" cy="14.2" r=".7"/>',
  // 2 · Where Behavior Comes From
  'ac-offbook': '<path d="M3.6 5.4h6a3 3 0 0 1 3 3v10a2.5 2.5 0 0 0-2.5-2.5h-6.5z"/><path d="M12.6 8.4a3 3 0 0 1 3-3h4.8"/><path d="M14.6 17.4l2.2 2.2 3.8-4"/>',
  'ac-behavior': '<circle cx="14.8" cy="4.6" r="2"/><path d="M12.2 20.6l1.8-4.8-3-2.4.8-4.2 3.4-1.4 2.6 2.6 3 .8"/><path d="M11.8 13.4l-3.6 1.2-1.8 3.6"/>',
  'ac-circumstances': '<path d="M12 21.4s6.4-6.4 6.4-10.6a6.4 6.4 0 0 0-12.8 0C5.6 15 12 21.4 12 21.4z"/><circle cx="12" cy="10.6" r="2.4"/>',
  'ac-objective': '<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.3"/>',
  'ac-obstacle': '<rect x="3.4" y="6.6" width="17.2" height="11" rx="1.2"/><path d="M3.4 10.3h17.2M3.4 13.9h17.2M9.2 6.6v3.7M15.2 6.6v3.7M6.3 10.3v3.6M12.2 10.3v3.6M18 10.3v3.6M9.2 13.9v3.7M15.2 13.9v3.7"/>',
  'ac-stakes': '<path d="M12 4.2v15.2M7.6 19.4h8.8"/><path d="M4 8.8h16"/><path d="M4 8.8l-2.2 4.6a3 3 0 0 0 4.4 0z"/><path d="M20 8.8l2.2 4.6a3 3 0 0 1-4.4 0z"/>',
  'ac-urgency': '<path d="M13.6 2.6L5.4 13.6h5.4l-1 7.8 8.2-10.8h-5.4z"/>',
  'ac-physicalscore': '<circle cx="12" cy="4.4" r="2.2"/><path d="M12 6.8v7"/><path d="M6.8 9.6l5.2 1.6 5.2-1.6"/><path d="M12 13.8l-3 7.4M12 13.8l3 7.4"/>',
  // 3 · Listening and Responding
  'ac-attention': '<path d="M2.4 12s3.7-6.4 9.6-6.4S21.6 12 21.6 12s-3.7 6.4-9.6 6.4S2.4 12 2.4 12z"/><circle cx="12" cy="12" r="2.8"/>',
  'ac-receiving': '<path d="M3.6 9.4c-1.1 3.7.7 7.5 4.2 9"/><path d="M20.4 9.4c1.1 3.7-.7 7.5-4.2 9"/><path d="M8.4 18.6h7.2"/><path d="M12 2.8v7.6M8.6 6.6L12 2.8l3.4 3.8"/>',
  'ac-moment': '<circle cx="12" cy="12" r="8.6"/><path d="M10 8.8v6.4M14 8.8v6.4"/>',
  'ac-newinfo': '<circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="12" r="5.6"/><circle cx="12" cy="12" r="9"/>',
  'ac-repetition': '<path d="M4 12.8a8 8 0 1 1 .9 4.6"/><path d="M3.4 18.4v-5.6H9"/>',
  'ac-playing': '<circle cx="8.2" cy="8.4" r="3"/><circle cx="16.6" cy="9.4" r="2.4"/><path d="M2.8 19.4c0-3 2.4-5 5.4-5s5.4 2 5.4 5"/><path d="M16.2 14.6c2.6.2 4.4 2.1 4.4 4.8"/>',
  // 4 · Tempo-Rhythm
  'ac-dials': '<circle cx="7.6" cy="14.2" r="5"/><path d="M7.6 11.6v2.6l1.8 1.4"/><path d="M6 7.8h3.2"/><circle cx="17.6" cy="14.6" r="4"/><path d="M17.6 12.2v2.4"/><path d="M16.2 9.2h2.8"/>',
  'ac-feeling': '<path d="M2.4 12.4h3.8l2-4.6 3.2 9.2 2.4-6.2 1.8 3.4h6"/>',
  'ac-tworhythms': '<path d="M2.6 8.6c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M2.6 16.6c1.2-2.4 2.4-2.4 3.6 0s2.4 2.4 3.6 0 2.4-2.4 3.6 0 2.4 2.4 3.6 0 2.4-2.4 3.6 0"/>',
  'ac-harmony': '<path d="M2.6 12c2.6-6 5.2-6 7.8 0s5.2 6 7.8 0"/><path d="M2.6 12c2.6 6 5.2 6 7.8 0s5.2-6 7.8 0"/>',
  'ac-rests': '<rect x="7" y="5.4" width="3.4" height="13.2" rx="1.3"/><rect x="13.6" y="5.4" width="3.4" height="13.2" rx="1.3"/>',
  'ac-speeds': '<path d="M3.4 17.6a9 9 0 1 1 17.2 0"/><path d="M12 17.2l4.6-5.8"/><circle cx="12" cy="17.6" r="1.4"/>',
  // 5 · Preparing the Performance
  'ac-actions': '<circle cx="11" cy="13" r="7.4"/><circle cx="11" cy="13" r="3"/><path d="M14.6 9.4l6-6"/><path d="M17.6 3.2h3.4v3.4"/>',
  'ac-monologue': '<rect x="9" y="2.8" width="6" height="10.4" rx="3"/><path d="M5.4 11.4a6.6 6.6 0 0 0 13.2 0"/><path d="M12 18v3.2M8.6 21.2h6.8"/>',
  'ac-scene': '<circle cx="7.4" cy="7.6" r="2.8"/><path d="M2.6 19c0-2.8 2.2-4.8 4.8-4.8s4.8 2 4.8 4.8"/><circle cx="16.8" cy="8.6" r="2.4"/><path d="M13.2 19c0-2.4 1.6-4.2 3.6-4.2s3.6 1.8 3.6 4.2"/>',
  'ac-twohander': '<path d="M9.4 4.6a3.4 3.4 0 0 0 0 6.6"/><path d="M9.4 11.2c-2.6 0-4.6 2-4.6 4.6v4.2"/><path d="M14.6 4.6a3.4 3.4 0 0 1 0 6.6"/><path d="M14.6 11.2c2.6 0 4.6 2 4.6 4.6v4.2"/>',
  'ac-rehearsal': '<path d="M20 11.2a8 8 0 1 0-.9 4.6"/><path d="M20.6 5.6v5.6H15"/>',
  'ac-integrating': '<path d="M2.8 12h6.4M9.2 12L6.6 9.4M9.2 12l-2.6 2.6"/><path d="M21.2 12h-6.4M14.8 12l2.6-2.6M14.8 12l2.6 2.6"/><path d="M12 5.6v12.8"/>',
  'ac-applying': '<path d="M3.8 14.2l4.8 4.8"/><path d="M8.6 19L20.2 7.4"/><path d="M14.8 6.6h5.8v5.8"/>',
  'ac-fourthwall': '<rect x="3.2" y="5" width="17.6" height="14" rx="1.4"/><path d="M6.8 9.4v5.6M12 8.6v7.2M17.2 9.4v5.6"/>',
  'ac-performance': '<path d="M7.4 4.4h9.2l2 5.6H5.4z"/><path d="M12 10v4"/><path d="M8 20.8l4-6.6 4 6.6"/>',
  // Written but not shipped — see the note above ACTING_PATH_LABELS.
  'ac-house': '<path d="M3.4 10.4L12 3.6l8.6 6.8"/><path d="M5.6 12v8.4h12.8V12"/><path d="M9.6 20.4v-5.2h4.8v5.2"/>',
};

/** The lesson's own glyph, or null to fall back to its kind. */
export const actingLessonIcon = id => ACTING_LESSON_ICONS[id] ?? null;
