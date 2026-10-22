# Learn band artwork — what the page needs from an image

The Acting Learn page is five illustrated bands in one scroll. Each band
is framed by two painted margins with the lesson cards on the paper
between them. This is what a generated image has to satisfy for the
margins to run unbroken from the top of the course to the bottom.

Written 2026-10-22, after the first five images left a hard horizontal
cut across two of the five bands.

## The problem to solve

Margin art is placed at a **fixed width** with its **natural height**.
Sizing it by height instead would scale its width with the number of
lessons in the module — a nine-lesson band would push its own artwork
out under the cards — and stretching it to fit would distort the faces.

So a band taller than its painting runs out of picture. Measured at an
820px window, with 104px margins:

| # | Module | Lessons | Band height | Margin aspect needed |
|---|---|---|---|---|
| 1 | Script Analysis | 5 | 739px | 1 : 7.1 |
| 2 | Where Behavior Comes From | 8 | 1067px | 1 : 10.3 |
| 3 | Listening and Responding | 6 | 747px | 1 : 7.2 |
| 4 | Tempo-Rhythm | 6 | 747px | 1 : 7.2 |
| 5 | Preparing the Performance | 9 | 1141px | 1 : 11.0 |

The first batch were all 1 : 8.2, so modules 2 and 5 fell short.

**These numbers are a floor, not a target.** Band height grows as the
window narrows, because card text wraps to more lines. At the 560px
breakpoint where the margins are still shown, module 5 approaches
1 : 14. No single fixed aspect is right at every width.

## The rule that actually fixes it

**The bottom and top of every margin must be quiet, repeatable
material** — wall, ivy, floorboards, curtain — carrying no face, no
hand, no prop, no handwriting and no hard edge. The page extends the
last clean slice downward to meet the next band, so whatever the band's
height, the art arrives at the next one. That only looks right if the
slice it extends is featureless.

Reserve the top **12%** and the bottom **12%** of each margin for it.

### Two alternatives that were tried and do not work

**Drawing the art taller.** Band height is not fixed — it grows as card
text wraps — so at a 600px window module 5 needs a **1:17.2** margin.
Against art drawn at 1:9.4, that is nearly double, and a 1:17 strip is
not a drawing anybody wants to compose. No single aspect covers every
width, so the art will always run out somewhere.

**Mirror-tiling** (2026-10-22). Baking `[art, flipped art]` into each
file gives a genuinely seamless vertical repeat: every join is a pair of
identical rows, and across stone and ivy the seam is undetectable —
measured and confirmed. It still fails here, because these margins carry
**handwritten notes**. The flipped copy prints *"Take the work into the
room"* upside down and reversed, which no amount of seamlessness
excuses. Mirroring stays available for artwork with no text and no
strongly oriented objects; it is not available for this page.

That leaves the quiet band as the only approach that survives any band
height, which is why it is the one rule here that cannot be traded away.

## Hard requirements

1. **Full vertical bleed.** The illustration reaches the very top and
   very bottom edge of the image. No white margin, no fade, no vignette,
   no rounded corners, no drop shadow, no border. If the mockup includes
   the app header or the bottom navigation bar, the illustration must
   continue *behind* them — those get cropped away and the art has to
   survive the cut.
2. **The centre channel stays clean paper.** The middle ~55% of the
   width carries the lesson cards and the node rail. Nothing is painted
   there: no figures, no props, no shadows reaching into it. Cards drawn
   into the mockup are fine — they get cut out — but nothing painted in
   that channel can be part of the artwork.
3. **Figures sit in the middle third vertically**, clear of the top and
   bottom 12%.
4. **The join has to match.** One band's bottom edge butts against the
   next band's top edge. Same material, same scale, same light
   direction, same horizon height. A floor at the bottom of module 2 and
   a ceiling at the top of module 3 will read as a mistake.
5. **One palette across all five.** Warm parchment, ink line, muted
   sage and olive, soft gold light. Same eye level, same time of day,
   same rendering weight.
6. **JPEG or PNG. Never WebP** — `tools/build_artifact.py` ships `img`
   as `.jpg/.png/.svg/.json` only, so a `.webp` lands in git and 404s on
   the live site.

## What happens to the file afterwards

The mockup is cut into two strips — left of the node rail, right of the
cards — and the centre is discarded. Nothing is painted over; the real
page background shows between the strips. Sizes land around 70–90KB per
strip.

Replacing a strip at a path that is already live **requires a service
worker `VERSION` bump** in `sw.js`: media is served `cacheFirst`, which
never revalidates, so an installed copy would keep the old picture
forever. A new image at a new path needs no bump.
