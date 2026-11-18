#!/usr/bin/env python3
"""Draw Rhetoric's two leaf ornaments, and write them to img/ui/.

WHY THESE EXIST AT ALL
----------------------
The study layout sets a leaf spray beside every section heading, in the
corner of every sage panel, and inside the "Try it" box at the foot of a
lesson. Until now there was exactly ONE such ornament in the repo and it
is a raster that belongs to Commedia dell'Arte:

    img/lessons/commedia/l01-sprig.png
    img/lessons/commedia/l01-reflect.png

js/main.js:4795 already states the house rule out loud — "pulling one
course's artwork onto another course's page is not a thing this project
does" — and then `SPRIG` pulled Commedia's leaf onto every book course's
lesson pages, Rhetoric's included. On a page standing on a drawn Greek
temple that reads as two different hands in one frame.

So Rhetoric gets its own mark, and it is LAUREL, which is the one plant
the subject actually owns.

SAME IDIOM AS THE GROUND, ONE SIZE DOWN. tools/make_rhetoric_ground.py
draws the temple in a single warm ink at a thin stroke; these are the
same hand at ornament scale. The leaves are FILLED rather than outlined
because the sprig renders at 46px beside a heading, where an outlined
leaf 5px across reads as a scribble and a filled one reads as a leaf.

TWO FILES, ONE DRAWING
----------------------
  rhetoric-sprig.svg   76x49   beside a heading, and in a panel corner.
                               Exactly the raster's box, so the CSS that
                               places it needs no change at all.
  rhetoric-wreath.svg  120x96  inside the "Try it" panel at the foot of
                               a lesson, where the Commedia reflect
                               drawing used to sit.

THE SAME THREE HOUSE RULES THE GROUND KEEPS
-------------------------------------------
* No `-` twice in a row anywhere in the output. A double hyphen inside an
  SVG comment is not well formed XML and the file fails to parse SILENTLY
  as a broken image. These write no SVG comments at all.
* The root carries `width` and `height`, not only a `viewBox`. An <img>
  given a viewBox alone has no intrinsic size and draws nothing.
* Edit this script and re-run it. Never edit the SVG.

    python3 tools/make_rhetoric_sprig.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships
nowhere; only its output does.
"""

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui'

# A mid olive. The page ink is #2f3a2e and the sage panel heading is
# #3f5230; this sits between them, so the mark reads as foliage on
# parchment and still holds its shape against the sage tint it sits on.
INK = '#6a7a52'


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def leaf(px, py, ang, length, width):
    """One almond leaf, its base at (px, py), pointing along `ang`.

    Drawn at the origin and transformed into place, so the two control
    curves stay symmetrical whatever angle it ends up at."""
    hw = width / 2
    return (f'<path d="M0 0 C{f(hw)} {f(-length * 0.30)} {f(hw * 0.82)} {f(-length * 0.78)} '
            f'0 {f(-length)} C{f(-hw * 0.82)} {f(-length * 0.78)} {f(-hw)} {f(-length * 0.30)} 0 0 Z" '
            f'transform="translate({f(px)} {f(py)}) rotate({f(ang)})"/>')


def stem(pts, width):
    """The twig the leaves sit on, as a stroked polyline."""
    d = 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in pts)
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{f(width)}" '
            f'stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".85"/>')


def sprig_pts(x0, y0, x1, y1, bow, n=13):
    """Points along a shallow bowed arc from one end of the twig to the
    other. `bow` is how far the middle lifts off the straight line."""
    pts = []
    for i in range(n):
        t = i / (n - 1)
        x = x0 + (x1 - x0) * t
        y = y0 + (y1 - y0) * t - bow * math.sin(math.pi * t)
        pts.append((x, y))
    return pts


def leaves_along(pts, first, last, length, width, flip=1):
    """ONE LEAF PER NODE, SIDES ALTERNATING. Drawing both sides at the
    same node closes the pair into a loop, so a run of them reads as a
    bead chain rather than a sprig; the ground generator learned this the
    same way. Alternating is also what laurel does."""
    out = []
    for i in range(first, last):
        px, py = pts[i]
        ax = pts[i + 1][0] - pts[i - 1][0]
        ay = pts[i + 1][1] - pts[i - 1][1]
        ang = math.degrees(math.atan2(ay, ax)) + 90
        side = 56 if i % 2 else -56
        # The leaves shorten towards the tip, which is what stops the
        # sprig reading as a feather.
        t = (i - first) / max(1, last - first - 1)
        out.append(leaf(px, py, ang + side * flip, length * (1 - 0.34 * t), width))
    return out


def sprig():
    """FEW LEAVES AND BIG ONES. The first draft put thirteen nodes on the
    twig with 15 unit leaves, which drew a convincing laurel at 300px and
    a grey smudge at the 46px it actually renders at. The box is 76 wide
    and the CSS shows it at 46, so everything in here is drawn at 1.65x
    the size it will be read at: nine nodes, leaves a fifth of the box
    long, and a stem heavy enough to survive the reduction."""
    W, H = 76, 49
    pts = sprig_pts(8, 42, 68, 12, bow=6, n=9)
    parts = [stem(pts, 1.9)]
    parts += leaves_along(pts, 1, 8, length=19, width=8)
    # Two berries at the base, where a laurel sprig carries them.
    parts.append('<circle cx="11.5" cy="36.5" r="2.3" fill-opacity=".8"/>')
    parts.append('<circle cx="16" cy="40.5" r="1.9" fill-opacity=".62"/>')
    return W, H, parts


def wreath():
    """An OPEN wreath: two laurel arcs rising from a common foot and
    stopping short of each other at the top. Closed, at 130px, the gap
    between the leaf tips fills in and the whole thing reads as a blot.

    ANGLES ARE MEASURED FROM THE FOOT, not from the x axis. Written the
    usual way round, with `cos` on x and the arc starting at 203 degrees,
    both halves swept sideways along the bottom of the box and drew a
    spiked band rather than a wreath. Here t runs 0 to 1 from the foot
    upward, which is the thing being described, so it cannot come out
    pointing the wrong way."""
    W, H = 120, 96
    cx, cy, r = 60, 50, 38
    parts = []
    for side in (-1, 1):
        pts = []
        for i in range(11):
            a = math.radians(160 * (i / 10))          # 0 at the foot
            pts.append((cx + side * r * math.sin(a), cy + r * math.cos(a)))
        parts.append(stem(pts, 1.9))
        parts += leaves_along(pts, 1, 10, length=17, width=7.2, flip=side)
    parts.append(f'<circle cx="{cx}" cy="{cy + r + 3}" r="2.4" fill-opacity=".72"/>')
    return W, H, parts


def build(w, h, parts):
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" fill="{INK}">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


if __name__ == '__main__':
    for name, fn in (('rhetoric-sprig', sprig), ('rhetoric-wreath', wreath)):
        w, h, parts = fn()
        svg = build(w, h, parts)
        assert '--' not in svg, 'a double hyphen would break the XML parse'
        assert 'width=' in svg.split('>')[0], 'the root needs an intrinsic size'
        (OUT / f'{name}.svg').write_text(svg)
        print(f'make_rhetoric_sprig: wrote img/ui/{name}.svg, {len(svg):,} bytes')
