# Learn path — draft 1 (checkpoint, 2026-10-20)

The painted Learn path for Acting. **Parked, not abandoned** — this is the
owner's checkpoint so the work can be picked up without re-deriving it.

Nothing in this folder ships. `tools/build_artifact.py` excludes `docs/`,
which is why the images live here rather than in `img/` where an unused
468KB painting was sitting in every deploy.

## What was being built

Acting's Learn page as **one painting**: a stage at the top with the actor,
and a root system below where every glowing orb is a lesson. The picture is
fixed art; the lessons are percentage-positioned buttons laid over the
orbs, exactly the mechanism the commedia cast chart uses.

It was built and it worked. The reason it is parked is scroll length, not
feasibility — see the trade below.

## The three paintings

| File | Orbs | Shape |
|---|---|---|
| `a-scattered-orbs.jpg` | **33** | orbs scattered through a spreading root system |
| `b-straight-column.jpg` | 32 | orbs in a straight column down a central trunk |
| `c-winding-path.jpg` | 40 | orbs on a serpentine switchback, Duolingo-shaped |

`a-scattered-orbs-shipped-copy.jpg` is the JPEG that was briefly shipped as
`img/ui/path-acting.jpg`; it is the same picture as `a`.

Counts were measured, not eyeballed: threshold the warm glow, flood-fill
each blob, take its centroid. The script is reproducible from the notes
below and the counts are reliable.

## The two things that decide this

**1. The count is frozen in the paint.** Acting has 33 path lessons today
and only painting `a` matched. `b` is 32 and `c` is 40, so neither can map.
The renderer was written to REFUSE a painted path whose orb count and
lesson count disagree and fall back to the winding path, so a mismatch
degrades the layout rather than stranding a lesson nobody can click.

`Speaking to the House` is written and held out of the course awaiting a
ledger entry. Landing it makes Acting 34 and breaks painting `a`.

**2. Scroll length is the reason it is parked.** The painting is 916x1717,
so its height follows its width:

| Column | Painting renders | Generated path |
|---|---|---|
| 375px (phone) | 703px tall | 3,468px |
| 833px (desktop) | 1,561px | 3,468px |

One picture cannot be both this composition and a long descent. The owner
asked for the Duolingo scroll, so the generated winding path won.

**To revive it, the painting must be taller** — roughly 1:4 rather than
1:1.9 — with exactly as many orbs as the course has path lessons, and the
orbs clearly separated so they can be counted and ordered.

## What shipped instead, and what came from here

The painted path is out, but the paintings were not wasted:

* `img/ui/stage-acting.jpg` — the stage with the two actors, cropped from
  `c` above the point where the lit floor meets the earth (16.9% of its
  height), upscaled to 2000px wide. It is the header over the path.
* `img/ui/earth-acting.jpg` — the ground the path runs through, a side
  slice of `c` taken clear of its central trunk, made to tile in both
  directions. Cutting it full-width the first time dragged the painting's
  own column of orbs into the tile and put a second light behind every
  real node.

## The orb map that matched

For painting `a` (33 orbs), in reading order. Percentages of the picture,
so hotspots ride it at any width — pixels drift the moment the column
resizes, which the cast chart learned the hard way.

```js
orbs: [
  { x: 17.1, y: 21.9 }, { x: 37.5, y: 27.4 }, { x: 48.1, y: 26.9 },
  { x: 70.2, y: 26.9 }, { x: 10.0, y: 30.0 }, { x: 78.5, y: 31.5 },
  { x: 90.4, y: 29.9 }, { x: 10.4, y: 42.9 }, { x: 22.6, y: 41.8 },
  { x: 40.7, y: 39.7 }, { x: 61.8, y: 38.1 }, { x: 90.4, y: 41.2 },
  { x: 31.9, y: 45.0 }, { x: 53.3, y: 46.0 }, { x: 82.0, y: 45.2 },
  { x: 9.8, y: 57.6 }, { x: 22.4, y: 60.2 }, { x: 34.1, y: 55.1 },
  { x: 69.4, y: 55.0 }, { x: 76.6, y: 59.4 }, { x: 89.2, y: 58.5 },
  { x: 45.8, y: 61.6 }, { x: 15.4, y: 73.6 }, { x: 31.7, y: 75.9 },
  { x: 59.2, y: 71.0 }, { x: 72.0, y: 70.1 }, { x: 84.6, y: 74.1 },
  { x: 13.6, y: 85.6 }, { x: 26.5, y: 83.9 }, { x: 39.7, y: 87.3 },
  { x: 56.7, y: 85.8 }, { x: 72.5, y: 86.1 }, { x: 86.9, y: 86.0 },
]
```

The renderer (`paintedPathHtml`) and its CSS (`.pp-*`) were written twice
and removed twice; both removals are in this branch's history. The shape:
one `<figure>`, an `<img>`, and one `<button>` per orb positioned with
`--pp-x` / `--pp-y`, with state drawn on top because the painting lights
every orb and cannot show progress by itself.

## Known gaps if it comes back

* **Module boundaries are invisible.** The winding path prints
  "1 - The Situation at Hand" between sections; the painting has nowhere to
  put them. Each orb's accessible label carries its module and the detail
  card names the lesson, but a sighted reader cannot see where Script
  Analysis begins.
* **WebP never reaches the live site.** Every painting arrived as `.webp`
  and was converted. `build_artifact.py` ships `img` as `.jpg/.png/.svg/
  .json` only, so a `.webp` lands in git and silently 404s in production.
* **Replacing a shipped image at its existing path needs a service worker
  bump.** Media goes through `cacheFirst`, which never revalidates. See the
  `sc-v48` note in `sw.js`.
