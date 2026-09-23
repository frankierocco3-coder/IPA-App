# Commedia character images: spec for the owner

## Intake: the collection arrived 2026-09-22

Thirty pictures came in from the owner's character image reference and
ship in `img/lessons/commedia/`, registered in `js/data/character/art.js`.
Every slot the chapters reserve now resolves. What shipped differs from
the spec below in four ways, and the app was fitted to the pictures rather
than the pictures cropped to the spec:

* **Size is 1536 x 864 (16:9), not 1536 x 1024.** Cropping to 3:2 would
  have cut into off-centre figures. The registry carries each picture's
  real `w`/`h` and the figure renderer reserves that space, so nothing
  jumps as a picture loads.
* **Walk sheets carry three, five or seven keyframes, not four.**
  Pantalone and Il Dottore have three, Arlecchino has seven, the rest
  have five. Alt text states the count actually drawn.
* **The Lovers are two performers**, so that chapter carries six
  pictures: `cm-innamorata-*` and `cm-innamorato-*`. The single
  `cm-innamorati-*` slot is retired.
* **Il Dottore's mask study and his worn mask are not the same object**
  (a brown hooked-nose half mask on its own, a smaller black one in the
  stance and walk). Alt text describes each picture as it is rather than
  claiming they match. Worth re-generating the mask study if the
  collection is ever revisited.

The alt text drafted below was replaced by descriptions written from the
delivered pictures. The rest of this file stands as the brief for any
future re-shoot.


The Building a Character course has three picture slots for each of the nine
principal commedia characters: 27 images in one coherent collection. The
chapters already reserve every slot; a slot shows nothing until its image
arrives. Send the files (any format) and they get converted, registered in
`js/data/character/art.js` with the alt text below, and shipped.

Generated pictures are **teaching interpretations, not historical evidence**.
Every caption says so, and history stays in the chapter text.

## The three images per character

| Slot | File | What it shows |
|---|---|---|
| Mask study | `<id>-mask.jpg` | A large three-quarter view of the mask on its own, and if the composition allows, a smaller view of it worn, the performer's eyes visible through it and the head angled toward someone. If only one view fits, show it WORN. Unmasked characters (Colombina, Pedrolino, the Lovers) get a face and head study instead. |
| Base stance | `<id>-stance.jpg` | One performer, full body, head to feet, in the character's base stance (listed in the chapter's breakdown). |
| Walk | `<id>-walk.jpg` | Four keyframes of the SAME performer, evenly spaced left to right like animation frames, bodies clearly separated and never overlapping. |

Character ids: `arlecchino`, `brighella`, `colombina`, `pulcinella`,
`pedrolino`, `pantalone`, `dottore`, `innamorati`, `capitano`.

## Rules for the whole collection

* **Size:** 1536 × 1024 landscape (3:2), the same as every other lesson
  picture. Keep the subject inside the middle two-thirds so it survives a
  phone screen.
* **One look:** the same painterly realism, the same plain warm backdrop
  (a bare stage floor against a muted warm wall), the same soft light from
  the upper left, and costume of the late 1500s to 1600s.
* **Consistency:** each character's mask, costume, body proportions and
  performer identical across all three of their images.
* **Nothing written in the picture:** no text, labels, logos or watermarks.
  No modern objects.
* **Real bodies:** every pose anatomically possible for a trained
  performer. No merged limbs, extra fingers or duplicate props, and no
  supernatural distortion.
* **No stereotypes:** a character is never reduced to body type,
  disability, age, ethnicity or accent. Pantalone's age is theatrical, not
  medical.
* **Movement in mechanics, not labels:** describe what the body does
  ("knees bent, nose reaching forward, hands over the purse"), not just
  what the character is like. The movement principle can steer the image,
  but tell the generator never to write it in the picture.

## A prompt template

> Painterly realistic illustration, 3:2 landscape, plain warm stage
> background, soft light from upper left, late-1500s Italian costume, no
> text, no logos, no watermark, no modern objects, anatomically correct.
> A commedia dell'arte performer as [CHARACTER]. [MASK AND COSTUME from the
> chapter's breakdown.] [SLOT: the stance details, or the four keyframes
> below.] Direction for the pose, NOT to be written in the image: [MOVEMENT
> PRINCIPLE]. For keyframes: four separate full-body figures of the same
> performer, evenly spaced, not overlapping, identical costume and mask.

## Per character

The full mask, costume, stance and walk descriptions are in each
character's breakdown in the app (and in `COMMEDIA_MASKS` in
`js/data/character/character-course.js`). What follows is the walk
keyframe plan and the draft alt text.

### Pantalone (the full specification)

* **Mask:** dark brown, reddish-brown or black leather half mask, long
  hooked nose, deep forehead and eye wrinkles, heavy raised brows, narrow
  suspicious eye openings, weathered moulded leather; a pointed grey beard
  as costume. NOT a plague doctor, bird, demon or horror figure.
* **Stance must show:** old-master status, ownership, suspicion, a body
  contracted in protection, forward-reaching appetite, and the potential
  for sudden movement. Knees bent, feet close, pelvis guarded, upper spine
  contracted, head and nose reaching out, hands near the purse.
* **Walk keyframes:** 1 guarded base stance; 2 nose and head discover an
  opportunity; 3 a rapid small step with the purse still protected; 4 the
  full reach, beginning to contract or retreat.
* Alt text:
  * mask: "A dark brown leather half mask with a long hooked nose, deep wrinkles and narrow eye openings, shown on its own and worn by a grey-bearded performer who peers sideways through it."
  * stance: "An old merchant in red tights and jacket under a long black gown, knees bent and back rounded, his hooked-nosed mask reaching forward while both hands guard the purse at his belt."
  * walk: "Four figures of the same red-costumed old merchant, left to right: standing guarded, then craning his nose toward something, then taking a quick small step with one hand over his purse, then reaching out while the rest of his body pulls back."

### Arlecchino

* **Walk keyframes:** 1 low springy stance; 2 the head snaps toward a sound; 3 a bouncing mid-step, feet leading; 4 a dead stop, body still arriving.
* Alt text:
  * mask: "A small black leather half mask with a snub nose, round eye holes and a bump on the forehead, shown on its own and worn by a performer who tilts his head like a bird."
  * stance: "A servant in a costume of coloured diamond patches, knees bent and heels lifted, a wooden bat at his belt, his black-masked head turned sharply to one side."
  * walk: "Four figures of the same patchwork servant, left to right: crouched and ready, head snapping round, bouncing forward in mid-step, and stopped dead with his body still leaning on."

### Brighella

* **Walk keyframes:** 1 grounded and watchful; 2 eyes find something, body still; 3 a sudden quick step; 4 smooth again, as if nothing happened.
* Alt text:
  * mask: "An olive-coloured half mask with a hooked nose and a knowing, heavy-lidded look, shown on its own and worn by a moustached performer glancing sideways."
  * stance: "A servant in white trimmed with green, weight low and settled, hands slightly forward, a purse and knife at his belt, his eyes fixed on something off to the side."
  * walk: "Four figures of the same green-and-white servant, left to right: standing still and watchful, eyes darting to one side, a sudden quick step, and a smooth unhurried stride again."

### Colombina

* **Slot 1 is a face study** (unmasked or a small eye mask).
* **Walk keyframes:** 1 hands on hips, level look; 2 a brisk step; 3 a quick turn on one foot; 4 already moving off to the next task.
* Alt text:
  * mask: "A young maidservant's face and shoulders, wearing a small half mask around the eyes, giving a level, amused look."
  * stance: "A maidservant in a neat dress and apron, standing upright with her hands on her hips and her head slightly tilted."
  * walk: "Four figures of the same maidservant, left to right: hands on hips, a brisk step forward, turning on one foot, and walking briskly away."

### Pulcinella

* **Walk keyframes:** 1 slumped and heavy; 2 the head pecks forward; 3 a sudden scurry; 4 settling back into the slump.
* Alt text:
  * mask: "A black half mask with a long hooked nose like a beak and a furrowed brow, shown on its own and worn by a performer thrusting his head forward."
  * stance: "A figure in a loose white smock and tall soft conical hat, back rounded and belly forward, head pushed out on the neck."
  * walk: "Four figures of the same white-clad figure, left to right: slumped and heavy, head pecking forward, scurrying on quick feet, and slumping back again."

### Pedrolino

* **Slot 1 is a face study:** unmasked, face whitened.
* **Walk keyframes:** 1 open and still; 2 a slow step; 3 stopped, taking something in; 4 a hand drifting to the heart.
* Alt text:
  * mask: "A gentle, unmasked face whitened with powder, eyebrows raised and eyes wide and open."
  * stance: "A servant in loose white clothes, arms hanging loose and chest open, his whitened face tilted a little as he listens."
  * walk: "Four figures of the same white-clad servant, left to right: standing open and still, taking a slow step, stopped and taking something in, and resting a hand on his heart."

### Il Dottore

* **Walk keyframes:** 1 weight back, belly first; 2 a slow rolling step; 3 stopped, finger raised; 4 both hands drawing a large circle in the air.
* Alt text:
  * mask: "A small black mask covering only the forehead and nose, shown on its own and worn by a red-cheeked performer with his chin raised."
  * stance: "A scholar in a black gown and cap with a wide white collar, belly forward and weight back on his heels, one finger raised to make a point."
  * walk: "Four figures of the same black-gowned scholar, left to right: leaning back with his belly first, taking a slow rolling step, stopped with one finger raised, and sweeping both hands in a wide circle."

### The Lovers (innamorati)

* **Slot 1 is a face study of a pair,** unmasked. The stance and walk can show one lover, or the pair, clearly separated.
* **Walk keyframes:** 1 a poised, dance-like stance; 2 a gliding step; 3 a hand to the heart in a declaration; 4 a swoon, still on the feet.
* Alt text:
  * mask: "The unmasked faces of a young man and a young woman in fine clothes, gazing past each other with dreamy expressions."
  * stance: "A young lover in fashionable clothes, standing tall with chest lifted and one foot forward as if about to dance, a hand near the heart."
  * walk: "Four figures of the same young lover, left to right: poised as if at a dance, gliding forward, pausing with a hand pressed to the heart, and swooning backward while still on his feet."

### Il Capitano

* **Walk keyframes:** 1 feet wide, chest out, hand on sword; 2 a swaggering stride; 3 startled, beginning to shrink; 4 fully cringing, looking for the exit.
* Alt text:
  * mask: "A half mask with a long, prominent nose and a fierce moustache, shown on its own and worn by a performer with his chin held high."
  * stance: "A soldier in Spanish-style finery with a feathered hat and cape, feet planted wide, chest thrust out and one hand on a huge sword."
  * walk: "Four figures of the same swaggering soldier, left to right: posing with his chest out, striding boldly, startled and starting to shrink, and cringing low as he looks for a way out."

## Captions

Every caption ends with the same honesty line, in house style:
"A teaching interpretation, not a historical record."
