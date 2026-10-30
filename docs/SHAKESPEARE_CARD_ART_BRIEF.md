# Shakespeare — module title cards: brief for the owner

Six pictures, one per module, rendering as the thumbnail on the left of
each module's title card on the Shakespeare Learn page — the same slot the
four Acting and five Character cards already fill.

**One is done.** `context` landed 2026-10-28. Five remain, and they are
the only thing between this course's Learn page and shipping: the folds,
the lesson counts, the rail and the parchment ground are all built. The
course sits behind `light: true` with no `live`, so until the set is
complete it changes nothing a learner sees. See `js/data/learn-scenes.js`.

## What the app needs

* **1086 x 1448, which is 3:4 portrait.** Same as the Acting and Character
  sets. Shipped at 600 x 800, baseline JPEG q90, about 250KB each.
* **PNG or JPEG out of the generator.** Not WEBP — `tools/build_artifact.py`
  ships `.jpg/.png/.svg/.json` only, so a .webp lands in git and never
  reaches the live site.
* **File names** `img/ui/shakespeare-card-<id>.jpg`, using the module ids
  below. Ids are storage in this repo and never change.
* **The no-text rule is SUSPENDED for this course** (owner's call,
  2026-10-29). It still holds for Acting and Character. It was written
  here on the assumption that lettering would be unreadable at card size,
  and that assumption was measured and found wrong: "prithee wherefore"
  reads cleanly at 92px. This course's subject is words on a page, so
  cards that *are* words are not a compromise — they are the subject.
  Modules 2 and 3 are typographic. **Modules 4, 5 and 6 below are still
  written as paintings and need rewriting if the whole set goes that way.**
* **Generated lettering must be proof-read before it is installed.** No
  gate in this repo can read a picture, so a misspelling inside a JPEG
  ships silently. Short phrases survive generation; long passages often
  do not.
* **Generate on a warm parchment ground (#efe9dc), not white.** The
  `language` card arrived on white and had to be multiplied onto the page
  colour — among full-bleed painted cards a white tile reads as a hole
  where an image failed to load.

## THE FRAMING RULE

Keep everything that matters inside the middle 80% vertically, and put
faces in the upper half. A picture whose subject runs from the very top to
the very bottom has no safe crop if the container ever changes. Learned on
Tempo-Rhythm, whose faces sit in the upper third and whose metronome sits
in the lower half — no crop keeps both.

At the size these display — 132px wide on a desktop, 92px on a phone — one
clear idea reads and a busy one turns to mush. Two or three figures, one
action.

## The house style

Identical to the Acting and Character sets. Same company, same room, same
light. What moves is the **evidence on the table**: Acting and Character
keep their props on bodies in a room, and this course's props lean toward
the page and the playhouse — books, pages, the blackboard, the chairs set
out as a house.

Paste this in front of each prompt:

> Detailed digital painting in warm storybook realism, crisp linework with
> soft cel-shaded rendering, editorial book-illustration feel. Golden
> afternoon light through a tall multi-pane window, ivy and green foliage
> framing the edges. Earthy saturated palette: teal, olive green, rust
> terracotta, warm ochre, deep maroon, cream. A theatre rehearsal room
> with worn wooden chairs, flight cases, a patterned rug and a stage lamp.
> Portrait, 3:4. Faces clear and in the upper half. No text, no lettering,
> no signage, and no readable writing on any page, book or board.

## Avoiding the nine that already exist

Each prompt below was written to stay clear of a picture already in the
set. Worth knowing if you re-roll any of them:

| already taken | by |
|---|---|
| two people at a desk with marked-up scripts | acting/text |
| a metronome on a table | acting/rhythm |
| two actors facing each other on chairs | acting/listening |
| two standing close, face to face, speaking | character/vocal |
| one actor walking the room while another watches | character/physical |
| one actor alone in a chair, imagining | character/piece |

## The five

### 2. `language` — The Language
*Why it feels hard, what actually changed, and how to find the plain
sentence without flattening the line you have to speak.*

The picture is the gap between the knot and the plain version.

> One actor stands holding a single loose page up toward the window light,
> head tilted back and brow furrowed, working out a difficult sentence.
> A second actor leans on the back of a wooden chair nearby, saying it
> back in plain words with an easy open hand and a half-shrug. One is
> tangled and one is relaxed, and that contrast is the subject. The page
> is held edge-on to us so nothing on it can be read.

### 3. `form` — Verse and Prose
*Which one you are in, why he moves between them, and what the crossing
tells you about the person speaking.*

**TYPOGRAPHIC, not a painting.** The lesson writes this card's brief
itself: *"In a well-set edition you can tell which one you are in from
across the room, without reading anything."* So the card IS that test —
two blocks of text whose shapes differ, and the shape is the whole
teaching. Words legible close up, shapes legible at 92px.

**BOTH QUOTES ARE ONE MAN IN ONE SCENE.** An earlier draft paired The
Balcony against Kill Claudio — two plays, two characters — which showed
the *distinction* and nothing else. But three of this module's four
lessons are about the **move** between forms, not telling them apart, and
`sh-whymove` makes its case on exactly this character: *"Hamlet is a
prince and speaks a great deal of prose."*

So both come from **The Nunnery Scene**, already on the Scenes shelf.
Hamlet opens it in verse and is in prose with Ophelia minutes later. One
speaker, one scene, the form changing under him — which is the module.
Text verbatim from `js/data/scenes.js`.

Verse — two true pentameter lines, capital at each line start:

> To be, or not to be, that is the question:
> Whether ’tis nobler in the mind to suffer

Prose — one sentence that wraps into a justified block:

> Get thee to a nunnery. Why wouldst thou be a breeder of sinners?

> Two blocks of hand-lettered antique type on a warm parchment ground,
> nothing else in the frame — no illustration, no border, no ornament,
> no page edges. The upper block is two separate lines, each beginning
> with a capital, lettered in warm antique gold with fine engraved
> hatching, and its right-hand edge is conspicuously uneven — the two
> lines end at clearly different points, with a visible step between
> them. Below it, across a wide band of empty parchment, a second block
> in the same lettering style but in dark sepia-brown ink, set as a
> solid justified paragraph of three lines that forms a clean rectangle,
> both left and right edges perfectly straight and flush. The upper
> shape is ragged and the lower shape is a solid brick, and that
> contrast is the entire subject. Portrait, 3:4.

**Exaggerate the two shapes.** Natural typesetting does not make the
ragged-versus-flush contrast read at 92px; the prompt has to ask for it
outright, which is why it says "conspicuously uneven", "a visible step"
and "perfectly straight and flush".

**Two colours on purpose.** At 92px two gold blocks merge into one grey
mass; gold against sepia reads instantly as two different things.

**The empty band between them is the switch**, so it should be wide
enough to feel like a turn rather than a paragraph break.

**Known overlap, accepted:** "To be, or not to be" is a soliloquy, and
module 6 is soliloquies. Using it here is still right — the card is about
the form, not the address, and keeping both quotes inside one scene buys
more than the overlap costs.

**THE RISK ON THIS ONE: generators misspell text.** Two words came back
perfect on `language`; thirty will not reliably. Misquoted Shakespeare
inside a JPEG in a Shakespeare course is invisible to every gate in this
repo — `dialect_lint` cannot read a picture. **Check every word against
the quotes above before it is installed.** If the generator will not
hold the spelling, set the card in type instead; the words are then
exact by construction.

### 4. `metre` — Iambic Pentameter
*The pulse under the line, what happens when it bends, and why an
irregular line is information rather than a mistake.*

**TYPOGRAPHIC, AND STACKED — THE FRAME DECIDED THIS.** Two drafts put one
pentameter line horizontally across the card. Measured at 92x123, that
fails: a full line strung edge to edge in a PORTRAIT frame forces tiny
type and leaves about 80% of the card empty, so it renders as a blank
parchment tile with a thread across it. It is the most elegant card in
the set at 2x and the only illegible one at the size that ships.

The fix is not a different treatment, it is a different layout. **One
foot per row, five rows down the frame.** The type gets large, the
portrait shape is filled, and the count of five is readable at a glance
as five bands.

**THE LINE CHANGED FOR THIS, and it is a better line anyway.** Sonnet
18's "Shall I compare thee to a summer's day?" splits "compare" and
"summer's" across foot boundaries — true scansion, but stacked it gives
rows reading "a sum" and "mer's day", which is ugly and hard to read.

Sonnet 12 opens with ten monosyllables:

> When I do count the clock that tells the time,

Every foot breaks at a word boundary, so every row is two whole words
and nothing is split. It is also a line about counting time, which is
what metre is. Verbatim from `js/data/sonnets.js`.

> An antique letterpress plate on a warm parchment ground (#efe9dc).
> Nothing else in the frame — no border, no ornament, no illustration,
> nothing modern or diagrammatic.
>
> A single line of verse is set as five stacked rows, one metrical foot
> per row, the column large enough to fill the frame from top to bottom
> with generous margins. The rows read, in order:
>
> When I
> do count
> the clock
> that tells
> the time
>
> Every row is two whole words. In each row the FIRST word is small,
> pale and sepia-brown, and the SECOND is large, heavy and warm antique
> gold with fine engraved hatching: "When" small and "I" large; "do"
> small and "count" large; "the" small and "clock" large; "that" small
> and "tells" large; "the" small and "time" large.
>
> The rows sit in one centred column with a hairline rule between each,
> so the five are countable at a glance.
>
> Portrait, 3:4.

**Why not the bouncing ball or the footprints.** Both were better ideas
about rhythm than letter-weight alone, and both are rejected on the same
grounds: the ball's dotted arc is a sing-along cartoon device and reads
as an infographic beside the engraved gold-and-sepia of `language` and
`form`; the footprints are period-correct but add a second register of
imagery to a set that had just settled into pure type. Stacking keeps
the set's own idiom and solves the size problem, which neither of the
other two was actually required to solve.

**PROOF-READ THE ROWS.** Five rows, not four or six; two whole words
each; the heavy word second every time. The division is the scansion,
so a wrong row is false scansion on a scansion card, invisible to every
gate here.

**No metronome.** Acting's Tempo-Rhythm card already has one.

### 5. `folio` — The First Folio and Textual Clues
*Where the plays came from, why two editions of one play disagree, and
how much of what looks like instruction is somebody else at the printing
house.*

The picture is the size difference. A folio is big and a quarto is small,
and that single fact carries the whole module without one readable word.

> A large heavy leather-bound book lies open on a table beside a small
> thin pamphlet-sized one, both clearly the same kind of object at wildly
> different scale. An actor stands over them with a hand flat on each,
> looking between the two with an eyebrow up, plainly finding that they
> disagree. A second person leans in over their shoulder to see. The
> pages are angled away so no writing is legible.

### 6. `soliloquy` — Soliloquies and Monologues
*Who you are talking to, what it costs to include the audience, and how
to think a speech rather than recite it.*

Not an actor alone — Character's `piece` card has that. The picture is
the audience as scene partner.

> One actor stands at the front of the room speaking directly out to three
> company members seated in a short row of wooden chairs facing them. It
> is plainly address, not performance: the speaker's hand is open in a
> genuine question and the eyes are working mid-thought. One of the three
> is leaning forward and meeting the look, caught up in it rather than
> watching politely. Chairs set out as a small house.

## When they arrive

1. Drop the files anywhere; they get converted to 600 x 800 JPEG q90 and
   installed in `img/ui/`. **Convert each file by name, one `sips` call
   per file** — zsh does not word-split an unquoted parameter, so a
   `for x in $var` loop runs once and writes every image into one name.
   That happened on the Acting set.
2. Each one goes into Shakespeare's `moduleCard` in
   `js/data/learn-scenes.js`, keyed by module id, with real alt text
   describing the picture.
3. When all six are in, the course can take `live: true` — the same
   single predicate the other courses go through, `learnSceneLive()`.
4. `sw.js` VERSION bump. New files at new paths do not strictly need one,
   but the renderer and styles that reference them are
   staleWhileRevalidate, so without a bump the first load shows the old
   page with the new art fetching behind it.

Until then the page shows plain headings where the pictures go — the
correct empty state in this repo, never a broken image and never a promise
that art is coming.
