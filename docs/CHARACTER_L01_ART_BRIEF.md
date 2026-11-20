# Your Own Body First — lesson art: brief for the owner

Six pictures for `ch-ph-own`, the first lesson of Building a Character's
Physical Character module, so it reads like the Commedia lessons rather
than like 3,390 pixels of unbroken text.

**Everything structural already exists and is waiting.** The lesson block
vocabulary supports a `hero`, a `thumb`, and a `fig` on every card and
every step; `js/data/character/art.js` is where figures are declared and
`character-course.js` is where a lesson points at them. The artwork is
the only thing missing. When the files land it is about fifteen lines of
data and no new code.

## What the lesson actually is

Measured: **two images on the whole page** today, and one of them is
borrowed (see the sprig note at the end). The Commedia lesson it should
sit beside carries **twenty**.

Its spine is an inventory. The learner stands still and observes four
things about their own body: **where the weight sits, what the hands do,
what leads the walk, and where the tension lives.** Those four are the
pictures. The first and last steps are instructions rather than
observations, and they need no drawing.

## What the app needs

* **PNG with transparency**, out of the generator. Not WEBP —
  `tools/build_artifact.py` ships `.jpg/.png/.svg/.json` only, so a .webp
  lands in git and never reaches the live site.
* **File names** exactly as given below, in a new folder
  `img/lessons/character/`. The commedia set lives in
  `img/lessons/commedia/` and this mirrors it.
* **Sizes are the commedia set's own**, so the two lessons sit at the
  same weight. They are listed per picture.
* **No text, no lettering** anywhere in any of them.

## The house style, which splits in two

The commedia lesson uses **two different kinds of picture**, and copying
that split is most of what makes this work.

**The hero is painted.** Full colour, warm storybook realism, soft
cel-shaded rendering, golden light. One wide image at the top.

**Everything inside the lesson is a PEN DRAWING.** Line only, one ink,
no colour and no shading block — look at `img/lessons/commedia/`'s
`l01-complete.png`, `l01-workings.png` and `l01-bridge.png`. They are
single figures, clean contour, generous white space, and they read at
145px because there is almost nothing in them. This is the part to get
right: a shaded miniature turns to mud at that size, and the lesson needs
four of these in a row that look like one set.

A preamble for the four pen drawings:

> A single figure in clean pen-and-ink line drawing, one ink colour on a
> fully transparent background, contour line only with no shading, no
> hatching and no fill. Calm, observed, anatomical rather than cartooned.
> Generous empty space around the figure. Portrait, roughly 145 by 160.
> No text, no lettering, no background scene, no props beyond those named.

And for the hero:

> Detailed digital painting in warm storybook realism, crisp linework
> with soft cel-shaded rendering, editorial book-illustration feel.
> Golden afternoon light through a tall window. Earthy saturated palette:
> olive green, warm ochre, rust terracotta, cream. A theatre rehearsal
> room. Wide banner format, roughly 646 by 228. No text anywhere.

## The six

### 1. `ph01-hero.png` — 646 × 228, painted
*The lesson opens on a body that already has opinions.*
> A single actor standing alone and still in the middle of an empty
> rehearsal room, arms at their sides, not posing and not performing,
> simply being looked at. Morning light from a tall window. A mirror or a
> bare wall behind them, chairs pushed back to the edges. The stillness is
> the subject: everyone else has gone and they are finding out what their
> body does when nobody has asked it to do anything.

### 2. `ph01-weight.png` — 145 × 160, pen
*Where is your weight: forward over the toes, back on the heels, even?*
> A standing figure seen in profile, weight visibly settled back onto the
> heels, pelvis slightly forward, the line of the body leaning a few
> degrees off true. Full figure, feet included. The tilt is the whole
> point, so draw it clearly enough to read at thumbnail size.

### 3. `ph01-hands.png` — 145 × 160, pen
*What are your hands doing? Where do they go when you stop thinking?*
> A figure from the chest down to the thighs, cropped, with both hands
> caught in an unconscious default: one loosely holding the other wrist in
> front of the body. No face needed. The hands are the subject and should
> fill the upper half of the frame.

### 4. `ph01-walk.png` — 145 × 160, pen
*Walk the length of the room. What part of you arrives first?*
> A figure mid-stride in profile, chest and chin clearly leading the rest
> of the body, one foot leaving the ground behind. Full figure. A sense of
> forward travel without any motion lines.

### 5. `ph01-tension.png` — 145 × 160, pen
*Notice where you hold tension. Jaw, shoulders, lower back, hands.*
> Head, neck and shoulders only, three-quarter view, shoulders drawn up
> toward the ears and the jaw set. Everything else relaxed, so the held
> places are the only thing the drawing says.

### 6. `ch-sprig.png` — 76 × 49, pen
*The ornament beside a section heading.*
> A small leaf spray in the same single ink, to sit beside headings the way
> the commedia one does.

**This last one is not only for this lesson.** `COURSE_SPRIG` in
`js/main.js` holds an entry for Rhetoric alone, and every other course,
Building a Character and Acting and Shakespeare included, falls back to
`cm-l01-sprig` — Commedia's leaf spray, cropped from your own commedia
rendering. So a Character lesson is currently decorated with a Commedia
ornament. One file fixes that for the whole course.

## When they arrive

Drop them in `img/lessons/character/` with those names and tell me. I
declare the six in `js/data/character/art.js` with a `ch01()` helper
beside the existing `l01()`, add `hero:` to the lesson and a `fig:` to
four of its inventory steps, and register the sprig in `COURSE_SPRIG`.

**Nothing is wired before the files exist**, deliberately: an unknown
figure id renders nothing at all and is harmless, but a declared figure
whose file is missing renders a broken image on a live lesson.
