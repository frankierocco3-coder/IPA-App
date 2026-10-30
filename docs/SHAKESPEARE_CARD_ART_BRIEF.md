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

## The house style: ENGRAVED EMBLEMS

**Settled 2026-10-29, and it supersedes both earlier directions.** This
course's cards are neither paintings (Acting, Character) nor lettering
(the two drafts before this). They are **single engraved emblems**, one
object per module, in the manner of a seventeenth-century printed book.

Four rounds of lettering taught the lesson that chose this. Quotes are
beautiful at 2x and illegible at 92x123, which is the only size that
ships; the Iambic Pentameter card rendered as a blank parchment tile
with a thread across it. **One bold object reads at any size.** An
hourglass is an hourglass at 92px. A sentence is not a sentence.

Paste this in front of each emblem below:

> A single engraved emblem centred on a warm parchment ground (#efe9dc).
> Antique copperplate etching, fine hatched line work in dark
> sepia-brown ink, the way an emblem is printed in a seventeenth-century
> book. One object only, centred, large, filling the middle of the frame
> with generous empty parchment around it. No colour beyond the sepia
> ink and the parchment. No text, no lettering, no border, no frame.
> Portrait, 3:4.

### THE TWO INSTALLED CARDS GET REPLACED

`context` (the painted teacher at a blackboard) and `language` (the
"prithee wherefore" lettering) are both live in the registry and both
go. A set of six wants one idiom. Both files stay in git history, so
this is reversible if the emblems disappoint.

### 1. `context` — Shakespeare 101

> The Globe playhouse seen from outside: a tall round timber-framed
> theatre with a thatched roof, a flag flying from the roof turret, and
> small figures at the door.

**Not a portrait, deliberately.** A portrait head and the skull on
module 6 are both head-shaped objects and would collide at 92px. The
Globe also covers the module better than a likeness does — three of its
seven lessons are about the playhouse and its conditions, and the
module's own argument is how little about the man is documented.

### 2. `language` — The Language

> A tall quill pen standing upright in a squat inkwell, a few loose
> sheets beneath it, a small sprig of leaves at the base.

### 3. `form` — Verse and Prose

> An open book lying flat, both pages visible. The left-hand page holds
> only four short separate lines, well spaced, their right-hand ends at
> conspicuously different points, leaving most of that page empty
> parchment. The right-hand page is filled corner to corner with one
> dense dark block of close-set lines, both margins straight, no gaps.
> One page reads light and broken, the other reads as a solid dark
> rectangle. The writing itself is fine and indistinct, texture rather
> than words.

**PUSHED TO CARICATURE ON PURPOSE, and this was measured.** A first
sketch set the two pages as ordinary verse and ordinary prose. At 1.8x
the difference was lovely; at 92x123 both pages read as "a page" and the
emblem said nothing but "a book". Light-versus-dark survives the
downscale where ragged-versus-flush does not, so the left page is now
nearly empty and the right nearly solid.

**It is still the weakest emblem in the set**, because module 5 is also
books. At card size an open book lying flat and two volumes standing
upright are distinguishable, but they are the only pair that has to be
told apart rather than simply recognised. If one of the six gets
re-rolled, make it this one.

### 4. `metre` — Iambic Pentameter

> An hourglass standing upright, the sand half run through, a fine
> stream falling from the upper bulb to the lower.

**Time measured, which is what metre is.** It is also nothing like
Tempo-Rhythm's metronome, and unlike the four drafts before it, it
reads at card size.

### 5. `folio` — The First Folio and Textual Clues

> Two bound books standing upright side by side, leaning slightly
> together: one a large heavy leather folio, the other a small thin
> quarto barely half its height. The difference in scale between them is
> the subject.

**Two books, not one.** The size difference carries the whole module —
two editions of one play, disagreeing — without a word. A single volume
would only say "a book", and `form` already has one.

### 6. `soliloquy` — Soliloquies and Monologues

> A human skull resting on a closed book, three-quarter view, with a
> guttered candle stub beside it.

**The candle earns its place.** It separates the silhouette from the
Globe on module 1 at small size, and a skull alone is the most
over-used Shakespeare image there is; the objects around it make it a
still life rather than a cliché.

## Proof-reading an emblem

Far less to check than lettering, which is most of the point, but not
nothing:

* **No text crept in.** Generators love adding a title to a book spine
  or a banner under an emblem. Any lettering at all is a reject —
  nothing in this repo can read a picture, so a misspelling ships
  silently.
* **The object is the right one and there is only one of it.**
* **It reads at 92px.** Open the card at true size before installing.
  That check is what rejected four drafts in a row.

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
