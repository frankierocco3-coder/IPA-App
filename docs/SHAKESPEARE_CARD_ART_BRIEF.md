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
* **No text anywhere in the picture.** No signage, no lettering, no titles,
  and no readable writing on any page, board or book. This one bites here
  more than it did on the other two courses, because half of this course's
  subject matter *is* text — so every idea below is built to work with the
  words unreadable.

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

The picture is the switch itself — a person crossing a line mid-sentence.

> One actor caught mid-stride stepping across the straight edge of a
> patterned rug, as if crossing a boundary on the floor. The half of the
> body still behind the line is upright and formal, chin level, one hand
> raised and measured; the half already across has loosened — shoulder
> dropped, other hand coming out of a pocket. A second actor at the edge
> of the frame has just noticed and is starting to smile.

### 4. `metre` — Iambic Pentameter
*The pulse under the line, what happens when it bends, and why an
irregular line is information rather than a mistake.*

No metronome — Tempo-Rhythm already has one. The picture is five.

> Two actors sitting side by side on a closed flight case. One speaks
> from memory, counting the five beats off on the spread fingers of one
> raised hand, three fingers already folded down. The other beats the
> same pulse out on the lid of the case with a flat open palm, arm
> relaxed. Both faces are up and alert, caught on the same beat.

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
