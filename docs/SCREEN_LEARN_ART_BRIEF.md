# The four banded Learn pages — art notes

Written 2026-11-06, when Acting, Building a Character, Musical Theatre and
Screen Acting moved to the **banded** Learn layout from the owner's
`Speechcraft-Learn-Claude` handoff.

**All four pages ship and work.** Nothing here blocks anything. This
records what the art actually is, so nobody has to re-derive it.

## What went in

Eighteen bands, from `art/` in the handoff, converted to baseline JPEG q90
and installed as `img/ui/<course>-band-<module id>.jpg`. 676KB for the set.

| Course | Bands | Source size | Aspect |
|---|---|---|---|
| Acting | 4 | 427 × 134 | 3.19:1 |
| Building a Character | 4 | 478 × 215 | 2.22:1 |
| Musical Theatre | 2 | 548 × 268 | 2.05:1 |
| Screen Acting | 8 of 9 | 455 × 62 to 455 × 54 | ~7.8:1 |

Screen's strips being that shallow is the **design**, not a bad crop — the
mockup draws that course as thin letterboxed bands, which is the one place
in this app where the picture is shaped like the medium the course teaches.

## The two things worth knowing

### 1. These are roughly 1x assets

The ASSET-MAP says it plainly: the 19 PNGs are "extracted from the supplied
mockups, not high-resolution originals". Measured against the card slot
this layout actually gives them — about 380px wide, because these pages
keep the right rail and so sit in the 940px track — they land between
**1.1x and 1.4x**. Fine at 1x; soft on a retina screen.

**And there is no higher-resolution source to prefer.** The handoff's own
advice was to use one "if one exists". For Acting and Building a Character
it does not: the 600 × 800 portraits already shipping (from 1086 × 1448
masters) are **different paintings** — same scenes re-composed wide, with
different rooms, furniture and costumes — not crops of each other. And a
2:1 band cannot be cut out of a 3:4 portrait without slicing the faces the
character art brief deliberately put in its upper half.

So the old portraits are higher resolution and the wrong shape; the new
bands are the right shape and about 1x. Re-rendering the eighteen at
roughly **1400px wide** would be a real improvement and is not urgent.

### 2. Screen Acting module 9 has no card

`09-repetition-and-the-reality-of-doing.png` is **455 × 33** — half the
height of its eight neighbours, because the bottom edge of the mockup it
was cut from runs through it. It is a truncated screenshot, not a drawing.

An art slot with no entry renders **nothing** in this app, which is honest;
a squashed band would not be. So `sc-root` ships without a picture and its
card is title, blurb and "Explore module".

**To fix it:** one band for `sc-root` at the same shape as the others
(about 1400 × 180 at the suggested size, or 455 × 62 to match what ships),
installed as `img/ui/screen-band-sc-root.jpg` and added to the `screen`
scene's `moduleCard` in `js/data/learn-scenes.js`. `launch_lint.py` fails
if that registry names a file that does not ship, so a typo cannot pass.

## What was NOT built, and why

**Six of the nine right-rail "Go deeper" links in the mockups have no
destination in the app.** The handoff's own rule is to "treat reference
links as placeholders unless matching destinations already exist", and
shipping a label with nowhere to go is the "coming soon" shape
`launch_lint.py` bans across the whole view layer. So:

| Label | Status |
|---|---|
| Mask Cards, One Line Many Masks, Warmup | **Exist** — and Character's rail card already draws exactly these three |
| Rehearsal Techniques | A near-exact match exists and is **switched off** behind `PERFORMANCE_LIVE` |
| The Actor's Toolkit | Nothing of this name exists in any form |
| On-Camera Technique, Audition and Industry Skills | Nothing by name; nearest are two Screen modules already on the page |
| Key Musicals, Performing Musical Theatre | Nothing by name; nearest are the two Musical modules already on the page |

Each of the six would restate something the page already shows, point at a
withdrawn module, or need a page that has not been written. Say which you
want and they are quick to add.

**The hero subtitles** in three of the four mockups are new one-line
descriptions ("Build a truthful, expressive, and responsive performance.").
Those are not in the course data, and writing course copy is not mine to
invent, so all four pages carry the **module and lesson count** instead —
which is what the Building a Character mockup itself shows. Supply four
taglines and they go in.
