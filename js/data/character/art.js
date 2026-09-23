// Building a Character figures. The commedia collection is owner-supplied
// (intake 2026-09-22, from the owner's character image reference); the spec
// it was made to, with file names, sizes, style rules and slot plans, is
// docs/COMMEDIA_IMAGE_SPEC.md. Shipped as baseline JPEG q90 at 1536x864,
// like every other drawing here.
//
// Each principal commedia character has three slots, referenced from its
// chapter by { fig } blocks:
//   'cm-<mask>-mask'    the mask study, or a face study for the unmasked
//   'cm-<mask>-stance'  the full-body base stance
//   'cm-<mask>-walk'    the walk, as a row of separate keyframes
// The Lovers are two performers, so that chapter carries both sets:
// 'innamorata' and 'innamorato'. A slot with no entry here renders
// NOTHING, never a broken image, so an entry is added only when its file
// ships in img/lessons/commedia/.
//
// Generated artwork is a teaching interpretation, not historical
// evidence; every caption says so. Captions are learner copy (house
// style); alt text describes what is in the picture, and the keyframe
// counts in it are the counts actually drawn.

const DIR = 'img/lessons/commedia/';

const CLOSE = 'A teaching interpretation, not a historical record.';
const fig = (title, file, alt, caption) =>
  ({ title, file, alt, caption: `${caption} ${CLOSE}`, w: 1536, h: 864 });

export const CHARACTER_FIGURES = {
  // ── Pantalone ──────────────────────────────────────────────
  'cm-pantalone-mask': fig(
    'Pantalone: the mask',
    'pantalone-mask.jpg',
    'A reddish-brown leather half mask shown on its own against a warm background. It has a long hooked nose curving down past where the mouth would be, deep carved wrinkles across the forehead, heavy dark eyebrows and narrow eye openings, with a dark buckled strap at the side.',
    'The mask on its own. The nose arrives before the man does.'),
  'cm-pantalone-stance': fig(
    'Pantalone: the base stance',
    'pantalone-stance.jpg',
    'A performer as an old merchant in a red cap, red jacket and red tights under a long black gown. His knees are bent and his back is rounded, his masked head juts forward, and both hands clutch a leather purse held against his belly.',
    'The base stance. Knees bent, spine curved, the purse guarded, and the nose reaching out ahead of the body.'),
  'cm-pantalone-walk': fig(
    'Pantalone: the walk',
    'pantalone-walk.jpg',
    'Three figures of the same red-costumed old merchant, left to right: bent far forward over the purse he holds in both hands, then standing more upright with the purse still gripped, then hurrying forward in mid-stride with his black gown trailing behind him.',
    'The walk, in three moments. Small quick steps, and the purse never leaves his hands.'),

  // ── Il Dottore ─────────────────────────────────────────────
  'cm-dottore-mask': fig(
    'Il Dottore: the mask',
    'dottore-mask.jpg',
    'A dark brown leather half mask shown on its own. Thick rolls of wrinkles cross the forehead above narrow eye openings, and a broad hooked nose hangs over rounded cheeks.',
    'The mask on its own. A face built out of learning and appetite.'),
  'cm-dottore-stance': fig(
    'Il Dottore: the base stance',
    'dottore-stance.jpg',
    'A scholar in a black cap and a black gown with a wide white lace collar over red, standing with his weight back and his belly carried forward. A book is clamped under one arm while the other sweeps upward with the palm open, and his masked face is tilted up.',
    'The base stance. Weight back, belly leading, one hand always ready to make a point.'),
  'cm-dottore-walk': fig(
    'Il Dottore: the walk',
    'dottore-walk.jpg',
    'Three figures of the same black-gowned scholar, left to right: strolling with one finger raised and his book under his arm, then sweeping an open hand out wide in mid-stride, then leaning further into the stride with his gown swinging behind him.',
    'The walk. A slow roll from the heels, and the argument keeps going whatever the feet are doing.'),

  // ── The Lovers: the innamorata ─────────────────────────────
  'cm-innamorata-mask': fig(
    'The innamorata: the face',
    'innamorata-mask.jpg',
    'The unmasked face and shoulders of a young woman with dark curls dressed with pearls and a deep red ribbon. She wears a pearl drop earring and a blue and cream gown trimmed with gold, and she gazes upward and away with a slight smile.',
    'The lovers wear no mask. The whole face is the instrument, and everything it feels shows.'),
  'cm-innamorata-stance': fig(
    'The innamorata: the base stance',
    'innamorata-stance.jpg',
    'A young woman in a full blue and red brocade gown, standing tall with one foot forward. She holds a folded letter against her chest with one hand while the other arm reaches up and out, and her eyes follow it upward.',
    'The base stance. Lifted chest, open arms, and a letter held like a treasure.'),
  'cm-innamorata-walk': fig(
    'The innamorata: the walk',
    'innamorata-walk.jpg',
    'Five figures of the same young woman in a blue and red gown, left to right: clasping a letter to her chest, flinging one arm out in delight, turning with her skirt swinging, pausing with a stricken look, and moving away with a glance back over her shoulder.',
    'The walk. Every feeling arrives at full size, and then the next one does.'),

  // ── The Lovers: the innamorato ─────────────────────────────
  'cm-innamorato-mask': fig(
    'The innamorato: the face',
    'innamorato-mask.jpg',
    'The unmasked face and shoulders of a young man with dark shoulder-length curls, wearing a lace collar and a blue, green and red doublet trimmed with gold. He looks upward and away with his lips parted.',
    'No mask here either. The audience reads him straight off his face.'),
  'cm-innamorato-stance': fig(
    'The innamorato: the base stance',
    'innamorato-stance.jpg',
    'A young man in a gold-trimmed doublet, red breeches and white stockings with a red cloak over one shoulder. He stands with one foot forward, a sealed letter held against his chest, and the other arm extended with the palm open.',
    'The base stance. Turned out like a dancer, weight lifted, one hand always offering something.'),
  'cm-innamorato-walk': fig(
    'The innamorato: the walk',
    'innamorato-walk.jpg',
    'Five figures of the same young man in a gold-trimmed doublet, left to right: reaching out with the letter held to his chest, striding forward, turning to look back, offering the letter with the other palm open, and walking on with it held at his side.',
    'The walk. A glide rather than a march, and the letter is always in play.'),

  // ── Il Capitano ────────────────────────────────────────────
  'cm-capitano-mask': fig(
    'Il Capitano: the mask',
    'capitano-mask.jpg',
    'A reddish-brown leather half mask shown on its own, with a long pointed nose jutting forward and down, heavy carved brows over narrow eye openings, and a buckled strap at the side.',
    'The mask on its own. The nose goes first, and the rest of him follows at a distance.'),
  'cm-capitano-stance': fig(
    'Il Capitano: the base stance',
    'capitano-stance.jpg',
    'A soldier in red and gold slashed finery with a black cape and a wide black hat carrying a large ostrich plume. His feet are planted wide, his chest is thrust out, a sword hangs at his hip, and one arm sweeps out with the palm open while his masked face turns upward.',
    'The base stance. Everything pushed outward and upward, taking as much room as possible.'),
  'cm-capitano-walk': fig(
    'Il Capitano: the walk',
    'capitano-walk.jpg',
    'Five figures of the same plumed soldier, left to right: posing with his chest out, striding forward, lunging with one arm flung out to point, flinching backward with a hand pulled in, and crouching low behind his own sword.',
    'The walk. The swagger is the whole performance, and it collapses the moment anything answers back.'),

  // ── Brighella ──────────────────────────────────────────────
  'cm-brighella-mask': fig(
    'Brighella: the mask',
    'brighella-mask.jpg',
    'An olive-green leather half mask shown on its own, with a hooked nose, heavy ridged brows and narrow slanted eye openings above a buckled strap.',
    'The mask on its own. Green leather, and an expression that has already worked out what you want.'),
  'cm-brighella-stance': fig(
    'Brighella: the base stance',
    'brighella-stance.jpg',
    'A servant in cream livery trimmed with green braid, a green cap and a green cloak, with a leather purse and a ring of keys at his belt. He crouches low with his weight settled, one hand reaching forward and his masked face turned sharply to the side.',
    'The base stance. Low, balanced, and already closer to you than you noticed.'),
  'cm-brighella-walk': fig(
    'Brighella: the walk',
    'brighella-walk.jpg',
    'Five figures of the same green-trimmed servant, left to right: standing with his hands at his purse, leaning in with a hand cupped beside the mask, stepping forward with an open palm, drawing back with the palm raised, and pointing away with the arm fully extended.',
    'The walk. Stillness, then one sudden economical move, then stillness again.'),

  // ── Arlecchino ─────────────────────────────────────────────
  'cm-arlecchino-mask': fig(
    'Arlecchino: the mask',
    'arlecchino-mask.jpg',
    'A dark brown leather half mask shown on its own, with a rounded bump standing up on the forehead, arched carved brows and a short blunt nose that curves downward.',
    'The mask on its own, bump and all. Somewhere between a cat and a monkey.'),
  'cm-arlecchino-stance': fig(
    'Arlecchino: the base stance',
    'arlecchino-stance.jpg',
    'A servant in a costume of stitched coloured patches with a matching cap and a wooden bat tucked into his belt. His knees are deeply bent, his arms are held out from his body, and his masked head is turned sharply to one side.',
    'The base stance. Low, sprung, and ready to go in any direction.'),
  'cm-arlecchino-walk': fig(
    'Arlecchino: the walk',
    'arlecchino-walk.jpg',
    'Seven figures of the same patchwork servant, left to right: crouched low with arms spread, reaching forward, touching the mask’s forehead with one finger raised, throwing both hands up, lifting a knee with the fists ready, springing off the ground, and running away with the bat swinging at his hip.',
    'The walk. Feet first, thought second, and a full stop that arrives before the body does.'),

  // ── Colombina ──────────────────────────────────────────────
  'cm-colombina-mask': fig(
    'Colombina: the face',
    'colombina-mask.jpg',
    'The unmasked face and shoulders of a young woman in a white ruffled cap, with dark curls, a green laced bodice and a cream chemise with full sleeves. She looks off to one side with a level, amused expression.',
    'Colombina wears no mask. She is the one who looks straight out and tells the audience what is really going on.'),
  'cm-colombina-stance': fig(
    'Colombina: the base stance',
    'colombina-stance.jpg',
    'A maidservant in a green laced bodice, a rust-coloured skirt and a cream apron, with a large key hanging at her waist. One hand gathers her skirt while the other is raised flat with the palm out, and she looks away past the raised hand.',
    'The base stance. Upright, grounded, and perfectly able to stop a man in the middle of a sentence.'),
  'cm-colombina-walk': fig(
    'Colombina: the walk',
    'colombina-walk.jpg',
    'Five figures of the same maidservant, left to right: standing with a hand on her skirt and a glance over her shoulder, raising a flat palm while holding a key, striding forward with the key in her hand, holding the palm out to stop someone, and standing square again with a look out front.',
    'The walk. Brisk and direct, and it goes exactly where it is going.'),

  // ── Pulcinella ─────────────────────────────────────────────
  'cm-pulcinella-mask': fig(
    'Pulcinella: the mask',
    'pulcinella-mask.jpg',
    'A dark brown leather half mask shown on its own, with a long hooked nose like a beak, a furrowed brow and a buckled strap at the side.',
    'The mask on its own. The beak of a bird that has learned to survive anything.'),
  'cm-pulcinella-stance': fig(
    'Pulcinella: the base stance',
    'pulcinella-stance.jpg',
    'A performer in a loose cream smock and trousers with a tall soft conical hat and a brown sash, a wooden spoon and a small bundle at his waist. His back is rounded and his belly is forward, one hand rests against it while the other reaches out, and his beaked mask pushes forward on the neck.',
    'The base stance. Round, low and heavy, with the head pushed out in front.'),
  'cm-pulcinella-walk': fig(
    'Pulcinella: the walk',
    'pulcinella-walk.jpg',
    'Five figures of the same white-clad figure in a beaked mask, left to right: crouching with a bundle clutched to his chest, scurrying forward, lunging with one hand grasping ahead, pointing off to the side, and running away still holding the bundle.',
    'The walk. Heavy and slumped until it is suddenly very fast.'),

  // ── Pedrolino ──────────────────────────────────────────────
  'cm-pedrolino-mask': fig(
    'Pedrolino: the face',
    'pedrolino-mask.jpg',
    'The unmasked face and shoulders of a young man in a soft white cap, with dark curls, a cream shirt and a brown patched jerkin. His face is lightly whitened and he looks upward with raised brows and an open, hopeful expression.',
    'Pedrolino shows everything. Nothing stands between the feeling and the audience.'),
  'cm-pedrolino-stance': fig(
    'Pedrolino: the base stance',
    'pedrolino-stance.jpg',
    'A servant in a cream shirt and breeches with a brown patched jerkin and a sash, holding a daisy against his chest with one hand while the other opens outward. He stands tall and loose, looking upward with a small smile.',
    'The base stance. Open chest, loose arms, nothing defended.'),
  'cm-pedrolino-walk': fig(
    'Pedrolino: the walk',
    'pedrolino-walk.jpg',
    'Five figures of the same servant holding a daisy, left to right: cradling it in both hands, walking with it held out and the other palm open, lifting it up to look at it, drawing it in against his chest with his head lowered, and walking away with a glance back.',
    'The walk. Slow, open, and easily stopped by whatever he notices.'),
};

export const characterFigure = key =>
  (CHARACTER_FIGURES[key] ? { ...CHARACTER_FIGURES[key], src: DIR + CHARACTER_FIGURES[key].file } : null);
