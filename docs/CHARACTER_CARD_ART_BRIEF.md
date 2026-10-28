# Building a Character — module title cards: brief for the owner

Five pictures, one per live module. They render as the thumbnail on the
left of each module's title card on the Character Learn page, the way the
four Acting cards already do.

Everything structural is already built and waiting: the Learn page folds,
counts its lessons, draws the rail and sits on parchment. The artwork is
the only thing between it and shipping. See `js/data/learn-scenes.js`.

## What the app needs

* **1086 x 1448, which is 3:4 portrait.** Same as the Acting set. Shipped
  at 600 x 800, baseline JPEG q90, about 250KB each.
* **PNG or JPEG out of the generator.** Not WEBP — `tools/build_artifact.py`
  ships `.jpg/.png/.svg/.json` only, so a .webp lands in git and never
  reaches the live site.
* **File names** `img/ui/character-card-<id>.jpg`, using the module ids
  below. Ids are storage in this repo and never change.
* **No text anywhere in the picture.** No signage, no lettering, no titles.
  The card carries its own words beside the art.

## THE FRAMING RULE, learned the hard way on Tempo-Rhythm

The Acting set taught this and it is the one thing worth repeating.
Tempo-Rhythm's faces are in the upper third and its metronome is in the
lower half, so any crop tight enough to keep the faces loses the
metronome. We got away with it by keeping the supplied 3:4 and cropping
nothing — but only because the ratio happened to match.

**So: keep everything that matters inside the middle 80% vertically, and
put faces in the upper half.** A picture whose subject is spread from the
very top to the very bottom has no safe crop if the container ever
changes.

At the size these actually display — 132px wide on a desktop, 92px on a
phone — a single clear idea reads and a busy one turns to mush. Two or
three figures, one action.

## The house style

Match the four Acting cards in `img/ui/acting-card-*.jpg`. They are:

* Detailed digital painting, warm storybook realism, crisp linework with
  soft cel-shaded rendering. Editorial book-illustration feel.
* Golden afternoon light from a tall multi-pane window, ivy and green
  foliage framing the edges.
* Earthy saturated palette — teal, olive green, rust terracotta, warm
  ochre, deep maroon, cream. No cool blues, no grey.
* A theatre rehearsal room: worn wooden chairs, flight cases, a patterned
  rug, a stage lamp on a stand, mugs, scripts.
* Real people mid-action, faces clear and expressive. Nobody posing at
  the viewer.

A style preamble to paste in front of each prompt below:

> Detailed digital painting in warm storybook realism, crisp linework with
> soft cel-shaded rendering, editorial book-illustration feel. Golden
> afternoon light through a tall multi-pane window, ivy and green foliage
> framing the edges. Earthy saturated palette: teal, olive green, rust
> terracotta, warm ochre, deep maroon, cream. A theatre rehearsal room
> with worn wooden chairs, flight cases, a patterned rug and a stage lamp.
> Portrait, 3:4. Faces clear and in the upper half. No text, no lettering,
> no signage anywhere.

## The five

### 1. `commedia` — Commedia dell'Arte
*The course starts here: complete, ready-made characters that show you what
every character is made of.*

> Three commedia dell'arte players rehearsing together in the room: a
> hunched elderly Pantalone in a red cap and long dark coat leaning on a
> stick; a nimble Arlecchino in a diamond-patterned costume caught
> mid-step with knees bent; a strutting Capitano, chest out, one hand on a
> prop sword. All three wear traditional leather half-masks with
> exaggerated noses and brows, mouths and chins bare. They are plainly
> rehearsing in a modern room, not performing on a stage.

### 2. `physical` — The Physical Character
*Centre, imagined body, weight, tempo, space, walk, animal.*

> One actor walking the length of the room in a transformed physicality —
> weight dropped low, chest leading, a heavy deliberate tread — while a
> second actor watches closely from a wooden chair, leaning forward with
> an elbow on one knee. The walker's whole body is visible and doing the
> work; the watcher's attention is the other half of the picture.

### 3. `vocal` — The Vocal Character
*The voice as a consequence of the body rather than a decision taken
separately.*

> Two actors facing each other, one speaking with a hand flat on their own
> ribs feeling the breath move, the other listening with their head
> tilted, one hand raised slightly as if about to stop them. Mouths and
> throats clearly visible. The speaker's posture obviously belongs to
> somebody other than themselves.

### 4. `status` — Status
*What raises or lowers a person, second by second, in the body, the voice
and the room.*

> Two actors in the same room at plainly different heights of status: one
> standing easily with space around them, shoulders open, taking their
> time; the other perched on the edge of a chair, drawn in, looking up.
> Nothing cruel — it reads as an exercise, and a third person at the edge
> of the frame is watching and making a note.

### 5. `piece` — From Within
*Where the people you invent come from, and how improvising alone turns
them into a character and a piece.*

> A single actor alone in the room, mid-improvisation, caught between two
> characters — one hand and shoulder committed to one posture while the
> face has already turned into somebody else. Empty chairs around them.
> Late warm light, long shadows, the room clearly theirs for the evening.

## Not needed

* **`role` — Playing the Role** is withdrawn behind `ROLE_LIVE` and
  renders nowhere. Leaving it without art is what lets it come back whole.
* **A stage band** is optional. Acting has one (`acting-stage-house.jpg`,
  841 x 872, nearly square) that sits across the top of its Learn page;
  Character currently draws the code-drawn stick-figure stage instead,
  which read as acceptable on the old dark ground and reads as a dark box
  on parchment. One picture fixes it if you want parity.

## When they arrive

1. Drop the files anywhere; they get converted to 600 x 800 JPEG q90 and
   installed in `img/ui/`.
2. `moduleCard` goes into Character's entry in `js/data/learn-scenes.js`,
   keyed by module id, each with real alt text describing the picture.
3. The Learn gate opens for Character — one condition, currently
   `B.ws === 'acting' || learnSequencePreview()` in two places that must
   change together (js/main.js, the Learn pane and the lesson layout).
4. `sw.js` VERSION bump, because new files at new paths still need the
   shell that references them.

Until then the page is reachable with the owner preview key and shows
plain headings where the pictures go — which is the correct empty state in
this repo, never a broken image and never a promise that art is coming.
