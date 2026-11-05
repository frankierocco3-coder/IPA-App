# Shakespeare Learn page — art brief for the owner

Rewritten 2026-11-05, for the **cards** layout. This file previously
specified 3:4 engraved emblems for a layout that no longer exists, and
before that a shelf; taking the old spec and drawing to it would produce
art no registry reads. Everything below is current.

**The page ships and works now.** Nothing here is blocking — the layout is
live with the paintings that already exist. This is the list of what would
make it match the mockup exactly.

## What is already there, and good

Six painted module scenes, one per module, shipped and registered in
`js/data/learn-scenes.js` under `moduleCard`:

| Module | id | File | What it shows |
|---|---|---|---|
| 1 | `context` | `img/ui/shakespeare-scene-context.jpg` | Shakespeare in a lace collar, ivy, green drape, books |
| 2 | `language` | `img/ui/shakespeare-scene-language.jpg` | Quill in an inkwell on a written page |
| 3 | `form` | `img/ui/shakespeare-scene-form.jpg` | Open book lying flat, lit candle, red drape |
| 4 | `metre` | `img/ui/shakespeare-scene-metre.jpg` | Hourglass on books, red drape, ivy |
| 5 | `folio` | `img/ui/shakespeare-scene-folio.jpg` | Gold-tooled First Folio on loose pages |
| 6 | `soliloquy` | `img/ui/shakespeare-scene-soliloquy.jpg` | Ivy-wreathed skull on old books |

**These had never been visible to anyone.** They were registered on
2026-10-30 and the playhouse map that landed the next day hid the whole
card grid behind one CSS rule, at every screen width. They are on the page
now for the first time.

The subjects are right and the set hangs together. Do not re-invent them.

## 1. The six cards want redrawing at the new shape — the main ask

They are **782 x 380, a 2.06:1 band**, because they were drawn for a
layout that ran them across the full width of a card. The cards layout
stands the picture up the full height of the card at its left, so the app
crops them to **5:4** with `object-fit: cover` and takes the middle 61% of
each.

Every subject is centred, so nothing essential is lost — but the outer
thirds go, and the clearest casualty is the stack of books at the left of
the `context` portrait. They are also 2x upscales of ~391px originals, so
a cropped 5:4 slot is running on roughly 190px of real detail where Acting
and Character ship 600 x 800.

**What to draw:** the same six subjects, recomposed for a **5:4 upright-ish
rectangle** rather than a wide band. Target **1000 x 800** source, shipped
at that size, baseline JPEG q90, around 250KB each.

Keep the file names exactly as they are. Overwriting in place is correct,
and it needs a service-worker bump (see Installing, below).

## 2. A clean wide Globe for the heading

The mockup opens with a landscape Globe illustration bleeding off the
right edge behind the title. **There is no file that can do this job.**

`img/ui/shakespeare-globe.jpg` is 864 x 852 — square, not landscape — and
more to the point it has the six module labels, the numbered roundels, a
CURRENT chip and the dashed arrows **painted into the picture**. Every
horizontal slice between 14% and 70% of its height has lettering in it, so
there is no clean band to crop. The painted CURRENT chip would also sit on
module 1 for ever.

**What to draw:** the same playhouse, **wide** — around **2000 x 800** —
with **no lettering of any kind**: no module names, no roundels, no CURRENT
chip, no arrows. Compose it so the building sits right of centre and the
left third is quiet, because the title sits over that side and the right
edge is cropped off.

Ship it at a **new path**, `img/ui/shakespeare-hero.jpg`, rather than
replacing the old plate. The old one stays recoverable and no cache bump
is needed for a new path.

The heading reads perfectly well without it, which is why this is second
on the list and not first.

## 3. The vine margin — probably not artwork at all

The mockup draws vine and leaf down the far-left margin and across the
bottom. The app already has a slot for exactly this — `ground` on a scene
record, which draws a decorative layer behind the whole pane at low
opacity, bleeding past the text column into the margins.

Commedia's is `img/ui/commedia-ground.svg`: **drawn in code**, 7.6KB, one
ink colour, and it rescales and re-themes for free. A raster strip down a
margin of unknown height tiles badly, which is the failure
`docs/LEARN_BAND_IMAGE_SPEC.md` records.

**Recommendation: say the word and this gets drawn as an SVG, no artwork
needed from you.** If you would rather draw it, it has to be a full-pane
decorative layer, not a strip.

The small leaf on the rule between the banner and the cards is already
drawn in code and needs nothing.

## What is NOT needed

**The resume banner's painting.** The mockup shows a still life of books, a
gold mask and laurel beside "Why He Still Matters to Actors". The banner
uses **the module's own painting** instead — whichever module the lesson
you are resuming belongs to — so it changes as you move through the course
and no new file is required. If you would rather have a fixed still life
there, that is a separate ask.

**The book glyph, the chevron, the gold CURRENT pill and the numbered
roundels.** All CSS and inline SVG. No files.

## House rules any new file has to follow

* **Baseline JPEG q90** for anything with its own background. PNG only for
  a cutout on transparency. **Never WEBP** — `tools/build_artifact.py`
  ships `.jpg/.png/.svg/.json` only, so a .webp lands in git and 404s on
  the live site.
* **Generate on warm parchment `#efe9dc`, not white.** A white tile among
  full-bleed painted cards reads as a hole where an image failed to load.
  The `language` card arrived on white once and had to be multiplied onto
  the page colour.
* **Weight is real.** The repo is near the ~1GB Pages soft limit. Around
  250KB each is the house figure.
* **Lettering is allowed in this course** — it is the one place the no-text
  rule is suspended — but **no gate in this repo can read a picture**, so a
  misspelling inside a JPEG ships silently. Proof-read by eye. For the hero
  the rule is the opposite: no lettering at all.
* **Module ids are storage and never change**: `context`, `language`,
  `form`, `metre`, `folio`, `soliloquy`.

## Installing

Convert **one `sips` call per file, by name**. Do not loop over a variable
— zsh does not word-split an unquoted parameter, so `for x in $var` runs
once and writes every image into one name. That happened to the Acting set.

```bash
sips -s format jpeg -s formatOptions 90 in.png --out img/ui/shakespeare-scene-context.jpg
```

Then:

* a new file at a **new** path (the hero) → add it to the scene record in
  `js/data/learn-scenes.js`;
* a file replacing one at an **existing** path (the six cards) → **bump
  `VERSION` in `sw.js`**. Media is cacheFirst and never revalidates, so
  without a bump every installed copy keeps the old picture for ever. This
  has already caught this project out once.

An unregistered key renders **nothing** — never a broken image and never a
"coming soon". That is the rule across the whole app, and it is why the
page is honest with the hero slot empty today.
