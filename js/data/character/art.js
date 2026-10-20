// Building a Character figures. The commedia collection is owner-supplied;
// the spec it was made to, with file names, sizes, style rules and slot
// plans, is docs/COMMEDIA_IMAGE_SPEC.md.
//
// REPLACED WHOLE ON 2026-10-19 (second intake, 'Speechcraft-Commedia-for-
// Claude'). All thirty pictures from the 2026-09-22 intake were swapped for
// engraved-plate studies matching the cast chart, and Zanni gained the
// three he never had. The old art is in git and nothing else about the slot
// system changed, so reverting is a file swap.
//
// TWO THINGS MOVED WITH THEM AND BOTH MATTER. The new files are 1536x1024,
// not the 1536x864 of the first intake, so fig() reserves that box instead;
// leaving 864 there would letterbox every picture on load. And every walk
// in this intake is SIX keyframes, where the old ones held three, five or
// seven, so every walk's alt text was rewritten rather than carried over.
// Shipped as baseline JPEG q90, like every other drawing here.
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
// evidence, and every caption says so — with ONE named exception,
// 'cm-cast-tree', which carries no caption at all by owner order
// (2026-10-19). The exemption is spelled out by key in the suite, so it
// covers that figure and nothing else. Captions are learner copy (house
// style); alt text describes what is in the picture, and the keyframe
// counts in it are the counts actually drawn.

const DIR = 'img/lessons/commedia/';

const CLOSE = 'A teaching interpretation, not a historical record.';
const fig = (title, file, alt, caption) =>
  ({ title, file, alt, caption: `${caption} ${CLOSE}`, w: 1536, h: 1024 });

export const CHARACTER_FIGURES = {
  // ── The company as a whole ─────────────────────────────────
  // The one portrait figure here, and the one that is a diagram rather
  // than a character study, so it carries its own dimensions and its own
  // illustrated style. It maps POSITIONS, not this course's cast: it
  // names Magnifico and a root Zanni, which have no chapters, and folds
  // Pulcinella and Pedrolino into that Zanni node. The caption does that
  // reconciling, because the picture and the roster below it would
  // otherwise appear to disagree.
  'cm-cast-tree': {
    title: 'The company and the lines between them',
    file: 'cast-tree.jpg',
    // REPLACED 2026-10-19. The previous art was portrait medallions at
    // 1199x1312; this is full figures at 1024x1536, and the dimensions live
    // here rather than in the renderer because the hotspots on the clickable
    // version are percentages of this box. Leaving the old numbers in place
    // skewed the box and pulled every hotspot off its figure.
    w: 948, h: 1659,
    alt: 'A chart of twelve commedia characters drawn as full figures on aged paper, joined by thin red lines. Magnifico stands robed in red and gold at the top. Below him the unmasked lovers, Innamorata in red and cream and Innamorato in blue. In the middle row the masked old men Pantalone in red and Il Dottore in black flank Colombina, who stands unmasked in a green dress and white apron at the centre with lines running to almost everyone. Below them Brighella in cream and green and Arlecchino in coloured diamonds, then Il Capitano in a plumed hat and red and yellow stripes. Lower still, Pulcinella hunched in white with a tall pointed hat and a beaked mask, and Pedrolino unmasked in a loose white blouse with large buttons. At the foot a masked Zanni in a wide brown hat stands in a low wide stance, with lines rising from him to every servant above.',
    // NO CAPTION, and it is the ONLY figure in this file without one
    // (owner order 2026-10-19, reaffirmed after the consequence was put to
    // him). Four explanatory sentences went first, then the house
    // disclaimer with them.
    //
    // THIS IS A NAMED EXCEPTION, NOT A RELAXED RULE. Every other picture
    // here still carries 'A teaching interpretation, not a historical
    // record.', the fig() helper still appends it automatically, and the
    // suite still fails any figure that drops it — the exemption is spelled
    // out by key in the check, so a NEW figure cannot quietly inherit it.
    // Set a caption here again and nothing else needs changing.
    caption: null,
  },

  // ── Pantalone ──────────────────────────────────────────────
  'cm-pantalone-mask': fig(
    'Pantalone: the mask',
    'pantalone-mask.jpg',
    'A reddish-brown leather half mask shown on its own against aged paper, seen from a three-quarter angle. Its nose is long and hooked, curving down well past where the mouth would be, over heavy carved brows and narrow eye openings, with a leather strap and a stud at the side.',
    'The mask on its own. The nose arrives before the man does.'),
  'cm-pantalone-stance': fig(
    'Pantalone: the base stance',
    'pantalone-stance.jpg',
    'An old man in a red cap, red doublet and red hose under a long black cloak, wearing a hook-nosed mask over a white beard. His knees are bent and his back is rounded, he leans forward from the hips, and a leather purse hangs at his belt under one guarding hand.',
    'The base stance. Knees bent, spine curved, the purse guarded, and the nose reaching out ahead of the body.'),
  'cm-pantalone-walk': fig(
    'Pantalone: the walk',
    'pantalone-walk.jpg',
    'Six figures of the same red and black old man, left to right: hunched over the purse, stepping out with one hand raised, straightening to stroke his beard, leaning in with a hand reaching, hurrying with the cloak swinging behind him, and striding away with one arm stretched ahead.',
    'The walk. Small quick steps, and the purse never leaves his hands.'),

  // ── Il Dottore ─────────────────────────────────────────────
  'cm-dottore-mask': fig(
    'Il Dottore: the mask',
    'dottore-mask.jpg',
    'A dark brown leather mask shown on its own, covering the forehead and nose only. It is smooth and rounded, with a short bulbous nose, a deep crease between heavy brows, wide oval eye openings and a strap and stud at one side.',
    'The mask on its own. A face built out of learning and appetite.'),
  'cm-dottore-stance': fig(
    'Il Dottore: the base stance',
    'dottore-stance.jpg',
    'A stout scholar in a flat black cap and a long black gown with a wide white ruff, wearing a half mask over his brow and nose. He stands with his weight back and his belly forward, one hand raised beside his head with the index finger pointing up.',
    'The base stance. Weight back, belly leading, one hand always ready to make a point.'),
  'cm-dottore-walk': fig(
    'Il Dottore: the walk',
    'dottore-walk.jpg',
    'Six figures of the same gowned scholar, left to right: standing with one hand tucked behind him, stepping off with a finger raised, opening one hand to explain, turning with both hands out, walking on still talking, and striding away with the gown swinging wide.',
    'The walk. A slow roll from the heels, and the argument keeps going whatever the feet are doing.'),

  // ── The Lovers ─────────────────────────────────────────────
  // Two performers, so this chapter carries six slots rather than three.
  'cm-innamorata-mask': fig(
    'The innamorata: the face',
    'innamorata-mask.jpg',
    'The unmasked head and shoulders of a young woman in three-quarter view, with curled auburn hair dressed with red and white flowers. She wears a red and cream gown with a lace-trimmed neckline, and she looks upward and away with her lips parted.',
    'The lovers wear no mask. The whole face is the instrument, and everything it feels shows.'),
  'cm-innamorata-stance': fig(
    'The innamorata: the base stance',
    'innamorata-stance.jpg',
    'A young woman in a red and cream flowered gown with lace at the elbows, stepping forward onto the ball of one foot. One arm reaches out and up, the other is drawn in toward her chest, and her head is lifted and turned toward the reaching hand.',
    'The base stance. Lifted chest, open arms, and the whole body reaching toward what it wants.'),
  'cm-innamorata-walk': fig(
    'The innamorata: the walk',
    'innamorata-walk.jpg',
    'Six figures of the same young woman in a red and cream gown, left to right: reaching upward with both hands, turning away with one arm extended, hurrying with the skirt swinging, spinning with her back to us, stepping forward with one hand open, and standing still with both hands pressed to her chest.',
    'The walk. Every feeling arrives at full size, and then the next one does.'),
  'cm-innamorato-mask': fig(
    'The innamorato: the face',
    'innamorato-mask.jpg',
    'The unmasked head and shoulders of a young man in three-quarter view, with dark curls under a blue cap carrying a tall white plume. He wears a blue doublet with gold braid and a broad white lace collar, and he looks upward and away.',
    'No mask here either. The audience reads him straight off his face.'),
  'cm-innamorato-stance': fig(
    'The innamorato: the base stance',
    'innamorato-stance.jpg',
    'A young man in a blue doublet and blue hose with gold trim, a blue cloak, a plumed cap and a sword at his hip. He stands turned out with his weight lifted, one hand at his chest and the other extended open toward somebody off to the side.',
    'The base stance. Turned out like a dancer, weight lifted, one hand always offering something.'),
  'cm-innamorato-walk': fig(
    'The innamorato: the walk',
    'innamorato-walk.jpg',
    'Six figures of the same young man in blue, left to right: standing with a hand on his hip, pressing one hand to his chest, flinging an arm wide, turning back with a hand raised, walking on with the cloak swinging, and pausing with a hand lifted toward somebody behind him.',
    'The walk. A glide rather than a march, and every turn is made for somebody watching.'),

  // ── Il Capitano ────────────────────────────────────────────
  'cm-capitano-mask': fig(
    'Il Capitano: the mask',
    'capitano-mask.jpg',
    'A dark brown leather half mask shown on its own, with a very long nose curving down and out to a blunt point. A moustache is carved into the leather curling up at either side, over arched brows and narrow eye openings, with a strap and stud at the side.',
    'The mask on its own. The nose goes first, and the rest of him follows at a distance.'),
  'cm-capitano-stance': fig(
    'Il Capitano: the base stance',
    'capitano-stance.jpg',
    'A soldier in an orange and red vertically striped doublet and breeches with a red sash, tall boots, a sword at his hip and a wide dark hat carrying a red plume. His feet are planted wide apart and both arms are opened out and up, his masked face raised.',
    'The base stance. Everything pushed outward and upward, taking as much room as possible.'),
  'cm-capitano-walk': fig(
    'Il Capitano: the walk',
    'capitano-walk.jpg',
    'Six figures of the same striped soldier, left to right: marching with a hand on his hip, striding with his chest thrown out, opening both hands to explain, flinching back with a palm raised, shrinking with both hands drawn to his chest, and running away with the sword swinging at his side.',
    'The walk. The swagger is the whole performance, and it collapses the moment anything answers back.'),

  // ── Brighella ──────────────────────────────────────────────
  'cm-brighella-mask': fig(
    'Brighella: the mask',
    'brighella-mask.jpg',
    'A brown leather half mask shown on its own, tinged green across the brow, with a heavy hooked nose, a curl of moustache carved beneath it, ridged brows and narrow slanted eye openings, with a strap and stud at the side.',
    'The mask on its own. An expression that has already worked out what you want.'),
  'cm-brighella-stance': fig(
    'Brighella: the base stance',
    'brighella-stance.jpg',
    'A servant in a cream shirt and breeches trimmed with green braid, green stockings and a green cap, wearing a hook-nosed mask, with a wooden slapstick pushed through his belt. He leans forward with his knees bent and one finger raised beside his head.',
    'The base stance. Low, balanced, and already closer to you than you noticed.'),
  'cm-brighella-walk': fig(
    'Brighella: the walk',
    'brighella-walk.jpg',
    'Six figures of the same green-trimmed servant, left to right: upright with a finger raised, stooping forward to look, creeping with both hands ready, straightening to listen, striding out with purpose, and hurrying away with one hand lifted.',
    'The walk. Stillness, then one sudden economical move, then stillness again.'),

  // ── Arlecchino ─────────────────────────────────────────────
  'cm-arlecchino-mask': fig(
    'Arlecchino: the mask',
    'arlecchino-mask.jpg',
    'A brown leather half mask shown on its own, with a rounded bump standing up on the forehead, arched carved brows, a short blunt nose that curves downward and a wide buckled strap at the side.',
    'The mask on its own, bump and all. Somewhere between a cat and a monkey.'),
  'cm-arlecchino-stance': fig(
    'Arlecchino: the base stance',
    'arlecchino-stance.jpg',
    'A servant in a suit of red, yellow, blue and green patches with a matching cap and a black mask, a wooden slapstick at his belt. His knees are deeply bent, his weight is low and wide, and both hands are spread open at his sides.',
    'The base stance. Low, sprung, and ready to go in any direction.'),
  'cm-arlecchino-walk': fig(
    'Arlecchino: the walk',
    'arlecchino-walk.jpg',
    'Six figures of the same patched servant, left to right: crouching low with both hands open, stooping forward to peer at something, touching the top of his head with one hand raised, backing off with both palms up, springing off the ground with his knees tucked, and running away with the slapstick at his hip.',
    'The walk. Feet first, thought second, and a full stop that arrives before the body does.'),

  // ── Colombina ──────────────────────────────────────────────
  'cm-colombina-mask': fig(
    'Colombina: the face',
    'colombina-mask.jpg',
    'The unmasked head and shoulders of a young woman in three-quarter view, wearing a white lace cap over dark curls and a green bodice with white puffed sleeves and a lace-trimmed neckline. She looks up and to the side with a slight smile.',
    'No mask on her either. Everything she thinks of them is on her face.'),
  'cm-colombina-stance': fig(
    'Colombina: the base stance',
    'colombina-stance.jpg',
    'A maidservant in a green dress with a white apron, white puffed sleeves and a lace cap. She stands square with her weight even on both feet, both hands resting on her hips, her head tilted and her chin slightly raised.',
    'The base stance. Planted, unhurried, and entirely unimpressed.'),
  'cm-colombina-walk': fig(
    'Colombina: the walk',
    'colombina-walk.jpg',
    'Six figures of the same maidservant in green and white, left to right: standing with her hands on her hips, turning away with the skirt swinging, hurrying with one hand lifting the apron, stopping with a hand to her mouth, walking on with both hands at her waist, and pointing off to the side.',
    'The walk. Brisk and direct, and it stops dead the moment she sees something worth seeing.'),

  // ── Pulcinella ─────────────────────────────────────────────
  'cm-pulcinella-mask': fig(
    'Pulcinella: the mask',
    'pulcinella-mask.jpg',
    'A dark brown leather half mask shown on its own, with a long beaked nose curving down to a point, a lumpy ridged brow, round eye openings and a strap and stud at the side.',
    'The mask on its own. A beak, and very little else to read.'),
  'cm-pulcinella-stance': fig(
    'Pulcinella: the base stance',
    'pulcinella-stance.jpg',
    'A figure in a loose white shirt and breeches with a red sash and a tall soft white cone of a cap, wearing a black beaked mask. He is hunched forward with his knees bent and both hands held loose and low in front of him.',
    'The base stance. Slumped, soft, and heavier than it needs to be.'),
  'cm-pulcinella-walk': fig(
    'Pulcinella: the walk',
    'pulcinella-walk.jpg',
    'Six figures of the same white-clad figure in a beaked mask, left to right: trudging forward with his head down, stopping with a hand to his chin, stepping out with both hands open, startled with one palm raised, hurrying with both hands reaching ahead, and running off with his back turned.',
    'The walk. Heavy and slumped until it is suddenly very fast.'),

  // ── Pedrolino ──────────────────────────────────────────────
  'cm-pedrolino-mask': fig(
    'Pedrolino: the face',
    'pedrolino-mask.jpg',
    'The unmasked head and shoulders of a young man in three-quarter view, with dark curls under a soft white pointed cap. He wears a white blouse with a wide ruffled collar and two large black buttons, and he looks upward with raised brows and an open, hopeful expression.',
    'Pedrolino shows everything. Nothing stands between the feeling and the audience.'),
  'cm-pedrolino-stance': fig(
    'Pedrolino: the base stance',
    'pedrolino-stance.jpg',
    'A servant in a loose white suit with a soft pointed white cap, a ruffled collar and large black buttons down the front. He stands tall and loose with his weight even, both arms opened outward and his head tilted to one side.',
    'The base stance. Open chest, loose arms, nothing defended.'),
  'cm-pedrolino-walk': fig(
    'Pedrolino: the walk',
    'pedrolino-walk.jpg',
    'Six figures of the same white-clad servant, left to right: standing with both arms hanging, stepping forward with one hand raised, reaching out with both hands, pausing with a hand at his chest, turning away with his head lowered, and standing still again with both hands open.',
    'The walk. Slow, open, and easily stopped by whatever he notices.'),

  // ── Zanni ──────────────────────────────────────────────────
  // NEW on 2026-10-19 with the second intake. His chapter was written on
  // the same day and had no pictures at all until these arrived, which
  // made him the only character in the module a reader never saw.
  'cm-zanni-mask': fig(
    'Zanni: the mask',
    'zanni-mask.jpg',
    'A brown leather half mask shown on its own, with a long straight nose angling down to a point, a low heavy brow, small round eye openings and a strap and stud at the side.',
    'The mask on its own. The longest nose in the company, and the simplest face behind it.'),
  'cm-zanni-stance': fig(
    'Zanni: the base stance',
    'zanni-stance.jpg',
    'A servant in a loose cream shirt and breeches with a red sash and a wide brown hat, wearing a long-nosed black mask. His feet are planted very wide, his knees are deeply bent, and both hands hang loose and ready in front of him.',
    'The base stance. Wide, low, and waiting to be sent somewhere.'),
  'cm-zanni-walk': fig(
    'Zanni: the walk',
    'zanni-walk.jpg',
    'Six figures of the same masked servant in cream and red, left to right: crouching low with both hands open, stooping forward with his weight back, running with one arm stretched ahead, stopping short with a hand raised, shielding his face with both hands, and running off with his knees high.',
    'The walk. Hunger at the front, and the legs catching up behind it.'),
};

export const characterFigure = key =>
  (CHARACTER_FIGURES[key] ? { ...CHARACTER_FIGURES[key], src: DIR + CHARACTER_FIGURES[key].file } : null);

// ── Card portraits (owner direction 2026-10-19) ────────────────────────
// One figure per mask, for the roster cards on The Cast. They are CUT FROM
// THE SIXTEEN-FIGURE ENGRAVED PLATE the owner supplied, so the thirteen
// agree with each other by construction: one artist, one sitting, one
// paper. Generating thirteen separate portraits would not have.
//
// These are NOT the three breakdown slots (cm-<mask>-mask/-stance/-walk).
// Those are the teaching pictures inside a character's own chapter and
// carry captions; these are identification at a glance, 340x440, and a
// card has nowhere to put a caption. The page's disclaimer rides the
// chart's figcaption directly above them.
//
// THIS IS THE ONLY ART THE FOUR NEWEST MASKS HAVE. Zanni, Tartaglia,
// Scaramuccia and Pasquariello were written on 2026-10-19 with no
// pictures at all, and three of them are not on the relationship chart
// either, so without these cards they are the only characters in the
// module a reader never sees.
//
// Scapino and Truffaldino are on the plate and deliberately absent here:
// their records were deleted the same day, and their job is Brighella's
// and Arlecchino's.
const CARDS = {
  pantalone: 'An old man in a red doublet and hose under a long black cloak, with a red cap, a white beard and a hooked-nose mask, leaning forward with one hand reaching out.',
  dottore: 'A stout old man in a black academic gown and flat black cap with a wide white ruff, both arms opened wide, wearing a black half mask across his brow and nose.',
  innamorati: 'Two unmasked young people side by side: a woman in a red and cream gown with flowers in her curled hair, and a man in a blue doublet, cloak and plumed hat, each with a hand raised to the chest.',
  capitano: 'A soldier in a slashed orange and yellow doublet with a red-plumed hat, a cape and a sword at his hip, striding with one hand on the hilt.',
  brighella: 'A servant in a loose cream suit trimmed with green, green stockings and an olive half mask, leaning in with one finger raised.',
  arlecchino: 'A servant mid-stride in a suit of red, yellow and blue diamond patches with a white cap, a black mask and a wooden bat at his belt.',
  colombina: 'A maidservant in a green dress and a white apron and cap, unmasked, standing square with her hands at her waist.',
  pulcinella: 'A hunched figure in loose white clothes with a tall pointed white cap and a black beaked mask, his belly thrust forward.',
  pedrolino: 'A young man in a loose white suit with a soft white cap and a ruffed collar, unmasked, both arms opened outward.',
  zanni: 'A servant in loose cream shirt and breeches with a broad brown hat and a red sash, wearing a black mask with a long pointed nose, crouched forward with his knees bent.',
  tartaglia: 'A stout man in a long olive coat with a fur collar, holding a sheaf of papers, wearing a dark half mask with spectacles set over it.',
  scaramuccia: 'A figure dressed entirely in black with a black plumed hat, a white ruff, a cape and a sword, standing with one hand on his hip.',
  pasquariello: 'A servant in a loose cream shirt with a red sash and a black half mask, one arm thrown out to the side.',
};

export const characterCard = id =>
  (CARDS[id] ? { src: `${DIR}cast-${id}.jpg`, alt: CARDS[id], w: 340, h: 440 } : null);
