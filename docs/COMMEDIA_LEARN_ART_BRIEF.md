# Commedia dell'Arte — the Learn page: brief for the owner

The page is built: three modules, wide alternating landscape cards, the
lesson pips, the continue button, the kickers, the rail panels and the
dashed route with its medallions are all in code and working.

**Every card has a picture on it right now**, using plates already in the
repo — see "The stand-ins" below. Nothing is blank and nothing is waiting
on you to be usable. What follows is what would make it *yours* rather
than assembled from the mask chapters.

Context: Commedia became its own course on 2026-11-02 and split into
three modules. You sent the Learn-page mockup the same day. This brief is
that mockup, costed out in files.

## DELIVERED 2026-11-02 — the three paintings are in

You sent all three the same day and they are installed:

| Module | File | |
|---|---|---|
| 1. Where It Comes From | `img/ui/commedia-card-cm-roots.jpg` | 1400x933, 273KB |
| 2. Playing to a Form | `img/ui/commedia-card-cm-form.jpg` | 1400x933, 275KB |
| 3. The Mask and the Cast | `img/ui/commedia-card-cm-cast.jpg` | 1400x933, 278KB |

Three notes on what was done to them:

* **Converted from WEBP to baseline JPEG.** They arrived as `.webp` and
  `tools/build_artifact.py` ships `.jpg/.png/.svg/.json` only, so a
  `.webp` would have sat in git and never reached the live site. This is
  the rule at the top of this file and it caught a real case.
* **Sized to 1400 wide, quality tuned to land under 300KB.** They display
  at about 350px, so 1400 is still generous on a 3x screen.
* **1400x933 is 3:2 to three decimal places**, which is the card's
  aspect exactly — nothing is cropped at any width.
* **The lettering on card 3 was proof-read before install**, as this
  file requires: Pantalone, Arlecchino, Colombina, Il Capitano, Il
  Dottore are all correct.

The three engraved plates that stood in here for an hour are back to
being only what the mask chapters use.

## What the app needs, for every file here

* **PNG or JPEG out of the generator. Not WEBP.** `tools/build_artifact.py`
  ships `.jpg/.png/.svg/.json` only, so a `.webp` lands in git and never
  reaches the live site. This has bitten before.
* **Generate on a warm parchment ground (`#efe9dc`), not white.** Among
  full-bleed painted cards a white tile reads as a hole where an image
  failed to load. The Shakespeare `language` card arrived on white and had
  to be multiplied onto the page colour afterwards.
* **Baseline JPEG q90**, around 250KB each. The repo is near the ~1GB
  GitHub Pages soft limit, so weight is real.
* **Ids are storage and never change.** The three module ids are
  `cm-roots`, `cm-form`, `cm-cast`. Use them in the filenames exactly.
* **No gate in this repo can read a picture.** A misspelling inside a JPEG
  ships silently. Anything with lettering has to be proof-read by eye
  before it is installed — see the warnings on items 4 and 5.

## 1-3. The three module cards — **DONE, kept here as the spec for replacements**

`img/ui/commedia-card-cm-roots.jpg`
`img/ui/commedia-card-cm-form.jpg`
`img/ui/commedia-card-cm-cast.jpg`

* **1600 x 800, which is 2:1 landscape.** Shipped at 1200 x 600.
* They display about **426px wide** on a desktop and full-width on a
  phone. Two or three figures and one action; a busy picture turns to
  mush at that size.
* **Framing: keep everything that matters inside the middle 80%, both
  ways.** Faces in the upper half. The card crops to its box if the
  column ever changes width.

**Module 1 needs repainting, and that is the one cost of this layout.**
`character-card-commedia.jpg` already exists and is the right picture —
the three players in your mockup's first card are exactly it. But it is
600x800, 3:4 **portrait**, and the cards are now 3:2 landscape, which
keeps only the middle half of its height and cuts the figures off at the
waist. There is no focus point that saves it. It is still in `img/ui/`
and goes straight back on `cm-roots` the moment there is a wide version —
one line in `js/data/learn-scenes.js`, nothing else changes.

The subjects below are read straight off your mockup.

**1. `cm-roots` — Where It Comes From.** Three masked players rehearsing
in a sunlit room: a stooped Pantalone in a red cap leaning on a stick, a
harlequin in a diamond-patterned costume mid-step, and a strutting
Capitano in red with a feathered hat, hand on a prop sword. Leather
half-masks. Stools, an easel, plants at the window. This is the picture
you already have — the same scene, re-composed wide.

**2. `cm-form` — Playing to a Form.** A company building a play from one
page. A masked zanni in white leaping across a table; two seated men
watching, one in black, one in a red cap; a woman in a white blouse and
brown bodice standing at the left with a cup. Papers and a jug on the
table, a travelling trunk in the foreground, masks hanging on the wall
behind, warm light from a window.

**3. `cm-cast` — The Mask and the Cast.** A row of six leather commedia
masks on a worn wooden table, lit by a candle at the left — long-nosed,
dark and red and cream. A workshop, not a stage.
**Drop the labelled character plates from your mockup version.** Five
handwritten names pinned above the masks will not survive: at 426px wide
they are a few pixels tall, and generated lettering misspells silently
with nothing in the repo able to catch it. The masks alone carry it, and
the module already names the characters in text on the card beside it.

## 4. The map ground — **BUILT, not an ask**

`img/ui/commedia-ground.svg` is drawn and on the page: hill towns and
cypresses down the left margin, the dotted road down the right with
VENEZIA, FIRENZE and ROMA, and a hill line behind the heading.

It is **generated line art**, about 7KB of SVG — the same approach as the
articulation diagrams and the tree scenery, not a picture. That means it
costs nothing, rescales to any width, and is one ink colour that follows
the theme. The geometry lives in the git history if it ever needs
regenerating.

Swap it for a painted version any time: it is one line in
`js/data/learn-scenes.js`. If you do paint one, **1600 x 1200 or wider,
very low contrast** — it sits at 50% opacity behind the whole pane and
has to lose to the text in front of it.

## What I am NOT asking you for

* **The troupe masks. You already made them.** The "Your troupe" panel is
  built and filled from `img/lessons/commedia/pantalone-mask.jpg`,
  `arlecchino-mask.jpg` and `capitano-mask.jpg` — three of the ten mask
  close-ups already in the repo, and the same three players the opening
  module is painted from. No new files. If you want different masks in
  that panel, it is a one-line change and there are ten to choose from.
## 6. The medallion mask face — the one piece of your mockup I did NOT build

Your mockup draws each route number as a gold medallion with a pale mask
face behind the digit. The discs are there, in the right place and the
right gold; **the face is not.**

I tried it in CSS and took it out. At 34px the face either disappeared or
fought the numeral, and the numeral is the part that has to survive. The
attempt also knocked all three medallions out of the rail gutter and into
the tops of the cards before I caught it, which is a fair warning about
how fiddly that element is.

It wants either a real drawn glyph from you — **a single pale mask,
96x96, PNG with transparency, flat and very simple, no shading** — or an
SVG I draw properly and check at size. Your call which. It is the last
visible gap between the page and your mockup apart from the paintings.
* **Lesson thumbnails.** The "Current lesson" rail panel reuses the
  module card art, scaled down. It is empty for `cm-form` and `cm-cast`
  until those two paintings land, which is the same empty state as the
  cards themselves.
