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
    // LIVE since 2026-10-22, the first course to get this page.
    live: true,
    art: 'img/ui/acting-stage-house.jpg',
    // The full house, 841x872. Nearly square, so the band takes its height
    // from this ratio rather than the default fixed strip — see
    // sceneStageHtml. Cover-cropping it into the old 232px band cut the
    // ceiling and the stage floor off and left two actors from the
    // shoulders to the knees.
    artRatio: '841 / 872',
    // SUPERSEDED TWICE, and the reason held both times. `journeyArt` was one
    // tall painted world sampled at five focus points behind a single winding
    // path, with `journeyFocus` choosing the samples; both fields and the
    // 692KB painting went on 2026-10-22 with the renderer that read them.
    // What replaced it was a pair of painted margins per band (`moduleArt`),
    // and what replaced THOSE on 2026-10-25 is one title card per module
    // (`moduleCard`, below).
    //
    // The constant across both moves: art on this page must not be sized by
    // the lesson count. Modules here hold five to nine lessons, so a sampled
    // band stretched or squashed with the count, and a margin strip ran out
    // of picture before the band ran out of height. A fixed-ratio card is
    // the first version of this that does not care how long a module is.
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
    // THE MODULE TITLE CARDS (owner artwork + written handoff, 2026-10-25).
    // One painting per module, shown as a thumbnail to the LEFT of the
    // module's number, title and blurb. The owner's handoff asks for
    // exactly that and is explicit about the rest: preserve the art, the
    // characters, the colours and the natural proportions; do not stretch
    // and do not regenerate; keep crops honest so faces and key
    // storytelling details stay visible.
    //
    // SUPERSEDES `moduleArt`, the two painted margin strips that flanked
    // each band from 2026-10-22. The margins were cut from finished page
    // mockups because the cards and the node rail were painted into the
    // middle of them, and they carried a list of problems a fixed-ratio
    // card simply does not have — see the retired block in css/style.css.
    // The ten acting-mod-*.jpg files they used (628KB) were deleted in the
    // same commit, by owner order. They are in git if they are ever wanted.
    //
    // 3:4, AND THE RATIO IS LOAD-BEARING. All four paintings are 1086x1448
    // and are shipped at 600x800. Tempo-Rhythm is the one that proves the
    // rule: its two faces are in the upper third and its metronome — the
    // detail the handoff names specifically — is in the lower half, so any
    // crop tight enough to keep the faces loses the metronome. At the
    // supplied ratio nothing has to be chosen. A card at another ratio is
    // cover-cropped from the edges rather than stretched.
    //
    // ALT TEXT DESCRIBES THE PICTURE, which is this repo's rule for every
    // figure: what is in it, not what the module wants you to conclude.
    //
    // A module with no entry renders as a plain heading — never a broken
    // image, the same rule figures follow. 'performance' has no card and
    // needs none: it is withdrawn behind PERFORMANCE_LIVE.
    moduleCard: {
      text: { src: 'img/ui/acting-card-text.jpg',
        alt: 'A woman in a maroon shirt and an older man in an olive jacket sit side by side at a cluttered desk, each reading marked-up script pages. A plaster mask, stacked books and a window hung with ivy are behind them.' },
      work: { src: 'img/ui/acting-card-work.jpg',
        alt: 'In a vaulted library reading room, a young woman leans across a desk to whisper behind her hand to an older woman in a green cardigan, who raises her own hand to reply. An open book lies between them under a brass lamp.' },
      listening: { src: 'img/ui/acting-card-listening.jpg',
        alt: 'Two actors sit facing each other on wooden chairs in a sunlit rehearsal room, a stage lamp behind them. The older woman speaks with an open hand; the young man sits with his hands clasped, watching her.' },
      rhythm: { src: 'img/ui/acting-card-rhythm.jpg',
        alt: 'A large wooden metronome stands on a rehearsal-room table with its pendulum mid-swing. Behind it a woman holding script pages watches an older man who is gesturing with both hands as he speaks.' },
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
    // LIVE 2026-10-28, once all five module paintings were in and
    // the stage band stopped drawing a dark box on parchment.
    live: true,
    art: null,
    // LIGHT, like Acting. The dark surface was never Character's own
    // decision — it is what .tr-view does by default, and the note above
    // said the other scenic courses keep it "until they get mockups of
    // their own". This is that, one step at a time: the page is on warm
    // parchment now, and the module paintings land when they are drawn.
    light: true,
    // THE MODULE TITLE CARDS, arriving one at a time (owner artwork, first
    // on 2026-10-27). The brief is docs/CHARACTER_CARD_ART_BRIEF.md.
    //
    // FOUR OF THE FIVE ARE STILL MISSING AND THAT IS A REAL STATE, not a
    // gap to be papered over: a module with no entry renders as a plain
    // heading, the same rule every art registry here follows. Nothing in
    // the UI says a picture is coming, because launch_lint bans that
    // across the whole view layer.
    //
    // 'role' will never have one. It is withdrawn behind ROLE_LIVE, and
    // leaving it without art is part of what lets it come back whole.
    moduleCard: {
      commedia: { src: 'img/ui/character-card-commedia.jpg',
        alt: 'Three commedia dell’arte players rehearsing in a sunlit room: a stooped Pantalone in a red cap leaning on a stick, a harlequin in a diamond-patterned costume caught mid-step with both arms wide, and a captain in red with a plumed hat and a sword. All three wear leather half-masks with long curved noses.' },
      physical: { src: 'img/ui/character-card-physical.jpg',
        alt: 'A rehearsal room with a patterned rug and a stage lamp. One actor in a rust cardigan and olive corduroy trousers walks slowly across the floor in a transformed physicality: hunched forward, weight low in the hips, one hand reaching down. A second actor sits on a wooden chair a few feet away watching her closely, chin resting on his hand.' },
      vocal: { src: 'img/ui/character-card-vocal.jpg',
        alt: 'Two actors standing close and facing each other in a rehearsal room. One, in a maroon t-shirt and olive trousers, speaks with her mouth open and her chin lifted, one hand laid flat on her breastbone and the other on her belly, feeling where the sound is coming from. The other, in a teal cardigan, leans in to listen with his head tilted and one hand half-raised.' },
      // THE SECOND ATTEMPT AT THIS ONE, and the reason is worth keeping.
      // The first came back with a gold crown, a carved throne and the
      // other actor kneeling with his hands clasped — a picture of RANK,
      // sitting directly above a blurb that reads "Status as behaviour
      // rather than rank". It would have taught the opposite of its own
      // chapter. The re-run keeps the height difference, which is what
      // made the first one read, and strips every badge of office.
      status: { src: 'img/ui/character-card-status.jpg',
        alt: 'A status exercise in a rehearsal room. One actor sprawls back in a worn teal armchair with one arm along its back and her legs crossed, chin level, looking down with mild amusement and filling the whole chair. Another kneels on the rug beside her, shoulders rounded, elbows in, hands fidgeting in his lap, chin tipped up to meet her eyes. A third actor watches from behind with a notebook on her knee.' },
      // THE ONLY ONE WITH A DEVICE IN IT, and the only one with nobody
      // else in the room. Both earn their place: this is the chapter about
      // where invented people come from, so the picture shows the
      // invention itself rather than somebody rehearsing it. The thought
      // bubble is also the one place in this app a crown belongs — it is
      // explicitly imagination, which is the opposite of the rank the
      // Status card had to be re-run to get rid of.
      //
      // Owner choice, 2026-10-28, over a first version of an actor talking
      // to an empty chair at sunset. That one never shipped and is in the
      // intake folder if it is ever wanted.
      piece: { src: 'img/ui/character-card-piece.jpg',
        alt: 'An actor sprawls in a wooden chair in a rehearsal room, in a maroon t-shirt and olive trousers, one hand raised as she imagines. Above her, in a thought bubble, the same woman appears as a queen in a jewelled gown and fur-trimmed robe, seated on a gilded throne in a great hall.' },
    },
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
    // LIGHT, the third course to come off the default dark ground. Still
    // owner-preview only — `live` is not set — so this changes nothing a
    // learner sees until the six module paintings land.
    light: true,
    // THE MODULE TITLE CARDS, arriving one at a time (owner artwork, first
    // on 2026-10-28). Five of the six are still missing, which renders as a
    // plain heading — the same rule every art registry here follows.
    //
    // THIS COURSE'S SUBJECTS ARE TEXTUAL, so the props move toward the page
    // and the playhouse where Acting's and Character's stay on bodies in a
    // room. Same company, same light, same palette; different evidence on
    // the table.
    moduleCard: {
      // The chalk portrait is the FOLIO ENGRAVING, drawn on a board by the
      // teacher — one of only two likenesses with a real claim, and the
      // subject of module 5. A framed authoritative portrait would quarrel
      // with this module's own argument about how little is documented; a
      // teaching aid does not.
      context: { src: 'img/ui/shakespeare-card-context.jpg',
        alt: 'A teacher in an olive cardigan stands at a blackboard in a rehearsal room, one hand open as she explains and the other holding a ruler against a large chalk drawing of Shakespeare in a high collar. Flight cases, a stage lamp, wooden chairs and a stack of books are around her, with ivy at a sunlit window.' },
    },
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

/** Does this course's scened Learn page go to LEARNERS, or only to the
 *  owner behind the preview key?
 *
 *  ONE PREDICATE, THREE CALL SITES, AND THAT IS THE WHOLE POINT. This was
 *  `learnScene(B.ws) && (B.ws === 'acting' || learnSequencePreview())`
 *  written out twice, plus a third test of `B.ws === 'acting'` deciding the
 *  preview banner. They have to agree and they did not: on 2026-10-23 the
 *  Learn pane and the lesson layout disagreed and shipped real learners the
 *  new path with the old lesson page. Hard-coding a workspace id in three
 *  places is what made that possible, so a course now declares `live` on
 *  its own scene record and nothing in the renderer names a course at all.
 *
 *  `preview` is PASSED IN rather than read here. The flag it comes from
 *  lives in js/views/context.js, and nothing under js/data imports from
 *  js/views — all 73 files in there import only each other. Taking it as
 *  an argument keeps that true. */
export const learnSceneLive = (ws, preview = false) => {
  const s = learnScene(ws);
  return !!s && (s.live === true || preview);
};

/** The CSS custom properties a scene sets, as an inline style string. */
export const scenePaletteStyle = scene => (scene
  ? Object.entries(scene.palette).map(([k, v]) => `${k}:${v}`).join(';')
  : '');
