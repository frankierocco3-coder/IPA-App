# Workspace chips — Theatre History, Musical Theatre and Screen Acting

Written 2026-11-03, the day Theatre History and Musical Theatre were built;
Screen Acting joined on 2026-11-04 when it went live. Three icons, and they
are **the hardest size in the app**.

Every other workspace carries drawn art in the switcher. These three fall
back to an emoji — 🏺, 🎼 and 🎥 — which is honest and ugly, and makes them
the only three rows in that column wearing a different visual language.

---

## READ THIS FIRST: these are smaller than anything drawn so far

Every icon batch to date was drawn for a card. A workspace chip is not a
card. It renders at **three sizes, all of them smaller**:

```
.ws-row-img     32px   the workspace switcher row      css/style.css:1199
.ws-chip-img    24px   the stats-bar chip               css/style.css:1201
.ws-chip-img    20px   the same chip, below 1040px      css/style.css:1343
```

Against the sizes the shipped batches were drawn for:

```
.track-glyph.has-img   46px   Practice hub cards
.tile-img              42px   Library shelf tiles
.mode-icon             36px   game tiles
```

**20px is half the size `scenes.png` was drawn for.** The evidence that this
matters is already in `docs/PRACTICE_ICON_BRIEF.md`: the three-mask icon
stopped reading as masks at **42px**, and the skull-holder went soft at 20px
and lost the Shakespeare chip to a portrait because of it (see the note in
`js/views/context.js`).

So the usual style block still applies, but **one instruction in it has to be
pushed harder than it has ever been pushed**: *"One strong, simple silhouette
that stays readable at coin size: the richness lives in the shading, not in
tiny details."* At 20px the shading is barely visible. **The silhouette is
doing nearly all the work.** Both subjects below were chosen for silhouette
first and subject second.

---

## The style block — paste this with EVERY request

Verbatim from `docs/ICON_STYLE_BLOCK.md`. Do not reword it or the two will
not match the fifteen already shipped.

> Create a single richly illustrated icon for a warm, editorial-style
> education app for actors. Style: one centered object rendered like a
> miniature storybook illustration — soft dimensional shading, gentle
> top-left light, subtle color texture, rounded friendly forms with
> real volume, a fine deep-olive contour (#2F3A2E). Warm and inviting,
> slightly vintage, like a beautifully printed children's-encyclopedia
> plate. Use only this palette and richer shades or highlights of it:
> cream #F6F1E8, deep olive #2F3A2E, sage green #6F8657, muted sage
> #8D997D, terracotta #C0604A, warm gold #C9A24B, muted lavender
> #A99BC4, slate blue #6F87A3. No neon, no pure white glare. One
> strong, simple silhouette that stays readable at coin size: the
> richness lives in the shading, not in tiny details. Absolutely no
> text, letters, or numbers. No background of any kind — fully
> transparent. The object fills about 70% of the frame with even
> margins. PNG, 1024×1024, transparent background.

**Then add this line, which is new and specific to these two:**

> This icon will be displayed as small as 20 pixels wide. Keep the
> outline bold and simple enough to be recognised as a solid shape at
> that size, with no element thinner than about a fortieth of the
> frame. Make the forms solid and heavy — big masses filling their
> outlines — with the detail living in the shading rather than in fine
> pattern.

---

## What the shipped chips actually measure

Measured 2026-11-03 off the seven files in `img/ui/` that `context.js` wires
as workspace art. "Ink" is any pixel with alpha ≥ 32 that is not
parchment-or-lighter; "ink box" is the bounding box of that ink.

| chip | file | ink box | aspect | ink % of frame |
| --- | --- | ---: | ---: | ---: |
| Accents | `globe.png` | 156×157 | 0.99 | **61%** |
| Shakespeare | `shakespeare.png` | 152×154 | 0.99 | **51%** |
| Commedia | `commedia.png` | 157×140 | 1.12 | 43% |
| Building a Character | `building-character.png` | 140×176 | 0.80 | 41% |
| Acting | `scenes.png` | 161×127 | 1.27 | 40% |
| Rhetoric | `rhetoric.png` | 124×155 | 0.80 | 35% |
| Voice & Speech | `instrument.png` | 155×147 | 1.05 | 33% |

**The two that hold best at 20px are the two densest.** That is not a
coincidence and it is the target:

* **aspect 0.9–1.1** — square-ish. The box is `object-fit: contain`, so a
  tall thin object is letterboxed and renders small in both directions. This
  is exactly why the Building a Character mannequin was cropped from
  full-length to head-and-waist: at full length it measured aspect 0.44 and
  rendered at about half the visual weight of its neighbours.
* **ink ≥ 50% of the frame** — aim for the globe/Shakespeare end, not the
  instrument end.
* **176×176 PNG, RGBA, true transparency.** All four corner pixels must be
  `(0,0,0,0)` *after* the resize, not only before it.

> A note on numbers, because this repo has been burned by one before: the
> figures in `js/views/context.js` ("aspect 0.99 and 78% ink") were taken
> with a different method and are **not comparable** to the table above. Use
> one method or the other consistently; do not mix them, and do not turn
> either into a pass/fail threshold. See the palette-distance warning in
> `docs/PRACTICE_ICON_BRIEF.md` for how that goes wrong.

---

## The column is nearly out of colours

All nine workspaces render in one vertical list, so a new chip competes with
its neighbours. The hues are already spoken for:

| row | chip | dominant |
| --- | --- | --- |
| 1 | Acting | sage-olive and terracotta (two masks) |
| 2 | Building a Character | warm gold and olive |
| 3 | Commedia | muted lavender and gold |
| **4** | **Theatre History** | **terracotta and gold — this brief** |
| **5** | **Musical Theatre** | **slate blue and gold — this brief** |
| **6** | **Screen Acting** | **muted sage — this brief** |
| 7 | Shakespeare | very dark olive against cream |
| 8 | Rhetoric | terracotta, all of it |
| 9 | Voice & Speech | pale cream — the lightest in the set |

REVISED 2026-11-04. This table read nine rows ending in Accents & Dialects,
slate and navy. That workspace no longer exists: it merged into Voice &
Speech on 2026-11-03 and its id is retired, so `globe.png` is out of the
column and the blue it held is free — which is what lets Musical Theatre keep
slate blue at row 5 without a second blue five rows down. Screen Acting took
the vacated ninth slot in the list, at row 6.

**So separation has to come from SILHOUETTE, not hue.** Both subjects below
are shapes nothing else in the set uses, and each is pitched at a tone that
does not fight the row directly above or below it.

---

## 1 · `theatre-history.png` — a Greek amphora

**Why a vessel and not masks.** The obvious choice for a theatre-history icon
is the comedy-and-tragedy mask pair, and it is **already the Acting chip**
(`scenes.png`), with a second mask one row above at Commedia. A third mask in
the same column is mush. A vessel is the oldest theatrical object that is not
a mask, and nothing else in the set is a round-shouldered silhouette.

**Add to the style block:**

> The object is an ancient Greek amphora: a two-handled clay storage
> vase, round-shouldered, tapering to a small foot, with a short neck
> and a pair of curved handles from shoulder to neck. Terracotta clay
> with a warm gold rim and foot band, and one dark decorative band
> around the belly of the vessel carrying two simplified figures in
> silhouette, mid-movement, as on painted pottery. Keep the figures
> small and flat — a decorative band, not the subject. Shown straight
> on, perfectly symmetrical, filling the frame top to bottom.

**Attach `img/ui/rhythm.png` as a reference image.** Structurally the
metronome is the same problem: a symmetrical object with a foot, a body and a
neck, drawn straight on. Per `PRACTICE_ICON_BRIEF` point 1, the attachment
carries the finish in a way the words cannot.

**The hazard, and what to check.** The painted band is the one piece of fine
detail here, and the style block bans fine detail for good reason. It is
allowed only because it degrades gracefully: at 20px it should read as a
single dark stripe across the belly, and the icon must still work if it does.
**If the band is doing the recognising rather than the silhouette, reject the
image** — the vase shape is what has to carry it.

Terracotta puts it in the same family as the Rhetoric lectern, four rows
down. That is acceptable: a round two-handled vessel and a square-topped
lectern are not confusable at any size, and the rows are not adjacent.

**If it comes back wrong**, the fallback subject is a single tip-up
auditorium seat in terracotta velvet with dark wood arms, seen three-quarters
on — the course's first lesson opens on theatre as *a place*, and nothing in
the set is a seat.

---

## 2 · `musical-theatre.png` — a top hat with a cane

**Why.** Cylinder plus one diagonal is the strongest silhouette available at
20px, and it is the most immediately readable "musical theatre" shorthand
there is. The hat also gives the solid heavy mass that
`PRACTICE_ICON_BRIEF` point 7 says predicts a strong icon better than frame
fill does.

**Slate blue, not black.** The house palette has no black, and the row
directly below this one is Shakespeare — already a very dark mass against
cream. A dark hat there would put two dark blobs next to each other, which is
the mistake the Shakespeare chip note records ("two similar pale ovals on
red"). Slate blue is in the palette, and the only other blue in the column is
the globe five rows down.

**Add to the style block:**

> The object is a tall top hat resting flat, with a slim walking cane
> laid diagonally across it from lower left to upper right. The hat is
> slate blue with a soft sheen and a warm gold band around the base of
> the crown; the cane is deep olive with a warm gold tip and handle.
> The hat is a solid heavy cylinder filling most of the frame; the cane
> is thick enough to stay visible as a clean diagonal at very small
> size. Slight three-quarter angle.

**Attach `img/ui/arcade.png` as a reference image.** The joystick is the
closest shipped structure: a heavy modelled body, one bright accent at the
top, drawn at a slight angle — and it is the icon in the set that holds
smallest.

**If it comes back wrong** — in particular if the cane reads as a scratch
rather than an object — the fallback subject is a grand piano seen
three-quarters on with the lid raised, slate blue case with a warm gold lid
edge. Denser and more era-neutral, but a weaker silhouette, which is why it
is second.

---

## 3 · `screen-acting.png` — a clapperboard

Added 2026-11-04, when Screen Acting went live and became the third row in
this column wearing an emoji.

**Why a clapperboard and not a camera.** A camera is the obvious choice and
it is the wrong one twice over: it is what the emoji already is (🎥), and a
camera body with a lens barrel, a handle and a viewfinder is exactly the
fine-detail object the style block bans. A clapperboard is a **flat rectangle
with one bold hinged bar**, and nothing else in the set is a flat rectangle —
every other chip is a rounded mass. That is the whole argument: the column
separates by silhouette, and this is a silhouette the column does not own.

**The diagonal question, which is real.** The row directly above is the top
hat with a cane, and that icon is *defined* as "cylinder plus one diagonal".
Two diagonals in adjacent rows is a legitimate worry. They survive together
because the masses differ: the cane is a thin line crossing the whole frame
over a round body, the clapper is a thick striped bar sitting across the top
edge of a square one. **Check this pair side by side at 20px before either is
accepted** — if they read as the same gesture, move the clapper bar to fully
closed and horizontal, which removes the diagonal entirely and costs little.

**Muted sage, the one colour this column does not use.** Row 5 above is slate
blue and row 7 below is very dark olive against cream, so this icon cannot be
either without sandwiching two dark masses or two blues. Muted sage `#8D997D`
is a mid-tone, it is in the palette, and it is the only house colour not
already carrying a row as its dominant.

**Add to the style block:**

> The object is a film clapperboard, closed, seen straight on and
> square to the frame: a solid slate body in muted sage green with
> softly rounded corners, and across its top edge a hinged clapper
> stick carrying four bold diagonal stripes in cream and deep olive.
> A small warm gold hinge pin sits where the stick meets the body.
> The body is a heavy solid rectangle filling most of the frame; the
> stripes are wide and few. No text, no letters, no numbers, and no
> writing of any kind on the slate — it is a blank board.

**Attach `img/ui/textbook.png` as a reference image.** It is the closest
shipped structure: a flat rectangular object with a banded edge, drawn square
to the frame, modelled with soft shading rather than outline. Per
`PRACTICE_ICON_BRIEF` point 1, the attachment carries the finish in a way the
words cannot.

**The hazard, and what to check.** The stripes are this icon's one piece of
pattern, and the style block bans pattern for the usual reason. They are
allowed only because they degrade gracefully: at 20px they should read as a
single light bar across the top of a darker block, and the icon must still
work if they mush into one. **If the stripes are doing the recognising rather
than the rectangle, reject the image.** Four stripes is the maximum; six will
turn to grey at 20px.

A blank slate is deliberate and non-negotiable: the style block bans text,
and a clapperboard with scene and take numbers on it is both a style
violation and unreadable at this size.

**If it comes back wrong**, the fallback subject is a camera lens seen
head-on — a thick ring in deep olive with a warm gold focus band and a dark
cream-flecked glass centre. A ring is the one silhouette in the set that is
not a solid mass, so it separates well, but it risks reading as a coin or a
button at 20px, which is why it is second.

---

## Before any of them is installed

The four measurements from `PRACTICE_ICON_BRIEF` point 6, plus one this batch
adds:

1. **corner pixels** `(0,0,0,0)`, checked again *after* the 176px resize;
2. **ink box** — aspect 0.9–1.1, ink ≥ 50% of the frame;
3. **a 20px render, looked at** — not 46px. This is the actual test and
   nothing substitutes for it. Render it beside `globe.png` and
   `commedia.png` at 20px and ask which of the three you can name;
4. **palette** — check for a hue that is nowhere in the house list, by
   looking at the bands. Do not use palette distance as a threshold;
5. **the whole column at 20px** — all nine chips in a strip. The question is
   not "is this icon good", it is "can I tell these nine apart".

**Always judge from the file, never the chat copy.** Images pasted into chat
are converted to lossy webp with the alpha flattened, so a transparent icon
looks like it has a white box.

---

## What happens when you hand them over

1. I open each file to identify it — never trusting filename or order.
2. `img/ui/theatre-history.png` and `img/ui/musical-theatre.png`,
   `sips -z 176 176`, corner pixel verified with the stdlib PNG probe.
3. Wire `img:` onto the two `WORKSPACES` entries in `js/views/context.js`.
   They currently carry `icon:` only, so the emoji stays in the data as the
   fallback and a missing file degrades to today's behaviour rather than a
   blank.
4. Confirm `img/ui/` lands in the build artifact, run the five gates and the
   browser suite, and show you the switcher at all three sizes before
   anything is pushed.

**Label-check at full resolution before install**, as with all AI art here.
