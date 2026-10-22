// What each course's Learn page looks like (owner direction 2026-10-20).
//
// Learn was ONE page rendered four times. Acting, Building a Character,
// Shakespeare and Rhetoric shared a module grid whose only per-course
// difference was the tile tone, and two of the four used the same tone, so
// Character and Shakespeare were pixel-identical. You could not tell which
// course you were in from the page you were looking at.
//
// A scene fixes that in a way a colour cannot. Each course gets a drawing
// made of its own governing idea, in two bands: what the work looks like
// from outside, and the work itself underneath it. The lessons live in the
// lower band, because that is the honest place for them — they are what you
// do, not what anybody sees.
//
// ONE DRAWING, FOUR COURSES (owner direction 2026-10-20). An earlier pass
// gave each course its own metaphor — a canopy, a playhouse, an assembling
// figure, a colonnade — and that was wrong, because four pictures said
// four things when the true thing is the same for all of them: every
// course here ends with somebody standing up in front of people. So the
// upper band is an actor on a stage in all four, and what this file
// carries is the part that genuinely differs.
//
// THE SCENE IS DRAWN IN CODE, NOT SUPPLIED. Every shape is positioned from
// the lesson count, so it grows with its course and a new lesson needs no
// new art. This is deliberate: the art registries in this repo wait on
// owner-supplied files and render NOTHING until one lands, which is right
// for a photograph of a mask and wrong for the frame of a page somebody
// opens every day.
//
// THE PALETTE IS PART OF THE SCENE, NOT A TINT. An earlier pass tried a
// per-course wash over the shared layout and it read as a page that had
// failed to load its background rather than as a design. A colour only
// works here because it is the colour OF something — the dark of a house,
// the warm of a stage light. (js/data/acting/path-theme.js held that
// reasoning and the art-file rules; it was deleted on 2026-10-20 once this
// file carried both, and it is in git if the long version is wanted.)
//
// WORDS CHANGE WITH THE PICTURE. 'Cultivated' belongs to a tree and would be
// nonsense under a printing press, so each scene carries its own verb for a
// finished lesson and its own two band labels. They are learner copy and
// follow house style.

// Acting's constants, kept as the baseline every other scene is measured
// against: the first scene built, and the one the owner judged.
export const SCENE_SKY = 232;   // upper band height
export const SCENE_STEP = 84;   // vertical gap between lessons
export const SCENE_TOP = 92;    // first lesson, clear of the band label
export const SCENE_SIDES = [-1, 1];

// THE ART SLOT. `art: null` IS A REAL STATE, NOT A PLACEHOLDER. With no
// file the band renders the code-drawn stage and looks deliberate, which
// is the same rule every art registry here follows: an empty slot renders
// the fallback, never a broken image and never a promise that something is
// coming. Nothing in the UI says artwork is on its way, because launch
// lint bans that across the whole view layer.
//
// When a file lands, set art to its path and the renderer takes over: it
// drops the drawn stage, lays the picture in the band, and keeps a wash
// between the picture and the band label so white text holds its contrast.
// Photographic backgrounds are where text contrast goes to die, and this
// app darkened its own muted grey for WCAG AA in September rather than let
// that slide.
//
// FILE RULES, learned the hard way in this repo:
//   * JPEG or PNG. tools/build_artifact.py ships img as .jpg/.png/.svg/
//     .json and WEBP IS NOT IN THAT LIST, so a .webp lands in git and
//     never reaches the live site.
//   * Wide, not tall. The band is a fixed 232px high and stretches to the
//     column, so the picture is cover-cropped FROM THE SIDES. Anything
//     load-bearing belongs in the middle.
//   * The bottom centre stays dark and empty. The generated roots descend
//     from exactly there.
//   * The roots are NOT in the picture and cannot be. A module holds
//     anywhere from four to eleven lessons, so the lower band's height
//     changes with the count and every root has to end on its own pill.
export const LEARN_SCENES = {
  // "Behavior and dialogue arise from the situation." What the audience
  // sees is the canopy; the situation, the want and the obstacle are roots.
  acting: {
    // The ROUTE's name, not the course's. The course is called Acting &
    // Scene Work everywhere else and keeps that name; this is what the
    // walk through it is called, which is a different thing and reads as
    // one. This is the only home for that string — it lived in
    // js/data/acting/path-labels.js as ACTING_PATH_TITLE until 2026-10-21,
    // which left two sources of truth and one of them unread.
    title: 'The Actor’s Journey',
    art: 'img/ui/acting-stage-house.jpg',
    // The full house, 841x872. Nearly square, so the band takes its height
    // from this ratio rather than the default fixed strip — see
    // sceneStageHtml. Cover-cropping it into the old 232px band cut the
    // ceiling and the stage floor off and left two actors from the
    // shoulders to the knees.
    artRatio: '841 / 872',
    // SUPERSEDED 2026-10-22. `journeyArt` was one tall painted world sampled
    // at five focus points behind a single winding path, and `journeyFocus`
    // chose the five samples. The owner's module artwork replaced it: each
    // band now carries its own pair of painted margins (see `moduleArt`),
    // which is a better fit for a course whose modules hold anywhere from
    // five to nine lessons — a sampled band stretched or squashed with the
    // count, and the margins do not. Both fields and the 692KB painting
    // went with the renderer that read them.
    // LIGHT PAGE (owner mockups, 2026-10-22). The Learn view is a scoped
    // dark surface by default — it was built when this course's page WAS a
    // night scene end to end. The mockups put the theatre back where it
    // belongs, inside its own picture, and set the page itself on warm
    // parchment with the module bands illustrated in ink and leaf.
    //
    // Opt-in rather than a change to .tr-view, because Character,
    // Shakespeare and Rhetoric still use the dark surface and have no
    // mockups of their own yet. They keep it until they get one.
    light: true,
    // THE MODULE MARGINS (owner artwork, 2026-10-22). Each band is framed
    // by two painted strips and the lesson cards run down the paper
    // between them.
    //
    // They are STRIPS, not full-width plates, and that is deliberate. The
    // owner's artwork arrived as finished page mockups with the cards and
    // the node rail painted into the middle of them. Painting over that
    // channel to reuse the whole picture smeared the card edges into
    // horizontal streaks; cutting the channel out instead leaves the real
    // page background showing between the strips, which is what the
    // mockups show anyway and costs 452KB rather than three full plates.
    //
    // All five modules are painted (owner artwork completed 2026-10-22).
    // A module with no entry would render as a plain band — never a broken
    // image, the same rule figures follow — but none is missing now.
    moduleArt: {
      text:        { l: 'img/ui/acting-mod-text-l.jpg',        r: 'img/ui/acting-mod-text-r.jpg' },
      work:        { l: 'img/ui/acting-mod-work-l.jpg',        r: 'img/ui/acting-mod-work-r.jpg' },
      listening:   { l: 'img/ui/acting-mod-listening-l.jpg',   r: 'img/ui/acting-mod-listening-r.jpg' },
      rhythm:      { l: 'img/ui/acting-mod-rhythm-l.jpg',      r: 'img/ui/acting-mod-rhythm-r.jpg' },
      performance: { l: 'img/ui/acting-mod-performance-l.jpg', r: 'img/ui/acting-mod-performance-r.jpg' },
    },
    done: 'cultivated',
    above: 'WHAT THE AUDIENCE SEES',
    below: 'WHAT THE ACTOR CULTIVATES',
    palette: {
      '--tr-sky': '#17120e', '--tr-soil': '#21170f', '--tr-soil-2': '#0f0c09',
      '--tr-leaf': '#d2a04b', '--tr-bark': '#754a29', '--tr-gold': '#e1aa4c',
      '--tr-dim': '#c6a16b', '--tr-accent': '#bc6738',
    },
  },

  // "You can invent that person, build one a writer created, or learn one
  // the tradition already made." Three roads to one person, so the figure
  // above assembles as the parts below are made.
  character: {
    title: 'The Person You Build',
    art: null,
    done: 'built',
    above: 'WHO STANDS UP',
    below: 'WHAT YOU BUILD',
    palette: {
      '--tr-sky': '#33262c', '--tr-soil': '#4c3a33', '--tr-soil-2': '#3b2c27',
      '--tr-leaf': '#c98f6e', '--tr-bark': '#8c6550', '--tr-gold': '#e0a96d',
      '--tr-dim': '#c3a893', '--tr-accent': '#cf8f7a',
    },
  },

  // "The verse is not a constraint on the acting. It is information about
  // the acting, written down by somebody who expected actors to read it."
  // Marks set on the page; the house they turn into.
  shakespeare: {
    title: 'From the Page to the House',
    art: null,
    done: 'set',
    above: 'WHAT HAPPENS IN THE HOUSE',
    below: 'WHAT IS SET ON THE PAGE',
    palette: {
      '--tr-sky': '#2a3038', '--tr-soil': '#3e3a33', '--tr-soil-2': '#2f2c27',
      '--tr-leaf': '#c6b183', '--tr-bark': '#8f7f63', '--tr-gold': '#e3c87f',
      '--tr-dim': '#b9b09c', '--tr-accent': '#9fb4c4',
    },
  },

  // "It makes your reasons available while leaving them able to examine
  // those reasons." The room is above and free to look; the reasons are
  // columns you raise one at a time.
  rhetoric: {
    title: 'The Reasons You Raise',
    art: null,
    done: 'raised',
    above: 'WHAT THE ROOM MAY EXAMINE',
    below: 'WHAT YOU RAISE',
    palette: {
      '--tr-sky': '#2c3237', '--tr-soil': '#413b35', '--tr-soil-2': '#322d29',
      '--tr-leaf': '#cfc6b4', '--tr-bark': '#8e8477', '--tr-gold': '#dcc07a',
      '--tr-dim': '#bdb5a6', '--tr-accent': '#b9a37c',
    },
  },
};

/** The scene for a workspace, or null where a course has none. A course
 *  with no scene keeps the module grid, which is why this returns null
 *  rather than falling back to Acting's tree: a printing house drawn in
 *  soil and leaves would be worse than no scene at all. */
export const learnScene = ws => LEARN_SCENES[ws] ?? null;

/** The CSS custom properties a scene sets, as an inline style string. */
export const scenePaletteStyle = scene => (scene
  ? Object.entries(scene.palette).map(([k, v]) => `${k}:${v}`).join(';')
  : '');
