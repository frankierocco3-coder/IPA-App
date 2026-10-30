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

**TYPOGRAPHIC.** Don't describe the pulse — make the line pulse. One
famous line, lettered so the stressed syllables are heavy and gold and
the unstressed are small and faint, so the alternation is visible as
texture even at 92px where no word can be read.

The line is Sonnet 18's opening, verbatim from `js/data/sonnets.js` and
the textbook-perfect pentameter every teacher reaches for.

> A single line of antique hand-lettering across the middle of a warm
> parchment ground (#efe9dc), nothing else in the frame — no
> illustration, no border, no ornament, and no accent marks, breves,
> slashes or notation of any kind.
>
> The line reads: Shall I compare thee to a summer’s day?
>
> It is lettered syllable by syllable in two alternating weights so the
> line visibly pulses. LARGE, heavy, warm antique gold with fine
> engraved hatching: the word "I"; the second syllable of "compare";
> the word "to"; the first syllable of "summer's"; the word "day".
> SMALL, light, pale sepia-brown: the word "Shall"; the first syllable
> of "compare"; the word "thee"; the word "a"; the second syllable of
> "summer's". The alternation runs strictly light-heavy, light-heavy
> the whole way across.
>
> Five faint vertical rules divide the line into its five equal pairs,
> one rule between each pair, so the eye counts five.
>
> Portrait, 3:4, with generous empty parchment above and below the line.

**No scansion marks, deliberately.** The module teaches reading a scan,
so breves and ictus marks are tempting — but a generator aligning tiny
marks over specific syllables will misalign them, and misaligned
scansion on a scansion card is a factual error that no gate here can
see. Weight carries the same information and cannot be subtly wrong.

**No metronome.** Acting's Tempo-Rhythm card already has one.

Eight words, which is the lowest garble risk of any card in the set.

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
