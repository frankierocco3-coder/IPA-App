#!/usr/bin/env python3
"""Draw the Rhetoric Learn page's ground, and write it to img/ui/.

WHY THIS IS A SCRIPT AND NOT A PICTURE
--------------------------------------
The same reason img/ui/commedia-ground.svg and img/ui/shakespeare-ground.svg
are drawn rather than painted: the ground sits behind a pane whose height is
whatever the page's height happens to be, so a bitmap either tiles visibly or
stretches. Geometry rescales and re-themes for free, and costs a few KB.

It also keeps the artwork budget where it belongs. The owner paints the
course plates; a ruled colonnade is arithmetic, not handwork.

WHAT IT DRAWS, AND WHY THIS AND NOT SOMETHING ELSE
--------------------------------------------------
Rhetoric's own scene labels are "WHAT THE ROOM MAY EXAMINE" above and
"WHAT YOU RAISE" below. The room is the course's subject, so the ground is
the room: a stoa's colonnade across the top, and beneath it the concentric
benches of a theatron with its radial stairs. A speaker and the ranked
people who get to examine what they said.

Elevation, not perspective. One ink, thin stroke, no fill: the same idiom as
the other two grounds, so the three read as one hand.

Run it to regenerate the file after changing anything here:

    python3 tools/make_rhetoric_ground.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.

TWO HOUSE RULES IT HAS TO KEEP
------------------------------
* No `-` twice in a row anywhere in the output, including inside a comment.
  An SVG comment containing a double hyphen is not well formed XML and the
  whole file fails to parse, silently, as a broken image. This writes no SVG
  comments at all rather than relying on care.
* The root carries `width` and `height`, not only a `viewBox`. An <img> is a
  replaced element: given a viewBox alone it has no intrinsic size, and the
  CSS that places the ground sizes it from the file. A viewBox only SVG
  collapses to 0x0 and draws nothing, which has already happened once here.

ONE MORE, SPECIFIC TO THIS GROUND
---------------------------------
`.lm-ground` is `object-fit: cover; object-position: top center`, so the
BOTTOM of this viewBox is the part that gets cropped. Everything that has to
be seen lives in the top half. The lower band is deliberately sparse.
"""

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui' / 'rhetoric-ground.svg'

W, H = 1600, 1200
INK = '#7b7260'


def f(x):
    """Trim coordinates. Two decimals is well under a stroke width, and the
    file is a third smaller than it would be at full float precision."""
    return f'{x:.2f}'.rstrip('0').rstrip('.')


# ── The colonnade ────────────────────────────────────────────
# A Doric order in elevation, built from the ground up: stylobate, shaft
# with a hint of fluting, capital, then one entablature spanning the row.

def column(x, base_y, height, width, flutes=2):
    """One column, drawn from its centre line at x standing on base_y."""
    hw = width / 2
    top = base_y - height
    cap_h = width * 0.42
    parts = [
        # shaft: a slight taper is what stops it reading as a pipe
        f'<path d="M{f(x - hw)} {f(base_y)} L{f(x - hw * 0.86)} {f(top + cap_h)} '
        f'L{f(x + hw * 0.86)} {f(top + cap_h)} L{f(x + hw)} {f(base_y)}"/>',
        # capital: echinus flaring to a square abacus
        f'<path d="M{f(x - hw * 0.86)} {f(top + cap_h)} L{f(x - hw * 1.28)} {f(top + cap_h * 0.34)} '
        f'L{f(x + hw * 1.28)} {f(top + cap_h * 0.34)} L{f(x + hw * 0.86)} {f(top + cap_h)}"/>',
        f'<rect x="{f(x - hw * 1.34)}" y="{f(top)}" width="{f(hw * 2.68)}" height="{f(cap_h * 0.34)}"/>',
    ]
    for i in range(flutes):
        fx = x - hw * 0.45 + (hw * 0.9) * (i / max(1, flutes - 1) if flutes > 1 else 0.5)
        parts.append(f'<line x1="{f(fx)}" y1="{f(base_y - height * 0.08)}" '
                     f'x2="{f(fx)}" y2="{f(top + cap_h * 1.25)}" stroke-opacity=".4"/>')
    return parts


def pediment(x0, x1, y, rise):
    """The temple front's gable, sitting on the cornice. Raking cornice,
    tympanum floor, and nothing inside it: a filled tympanum at this scale
    is a smudge."""
    cx = (x0 + x1) / 2
    return [
        f'<path d="M{f(x0)} {f(y)} L{f(cx)} {f(y - rise)} L{f(x1)} {f(y)}"/>',
        f'<path d="M{f(x0 + 14)} {f(y - 13)} L{f(cx)} {f(y - rise + 13)} '
        f'L{f(x1 - 14)} {f(y - 13)}" stroke-opacity=".5"/>',
        f'<line x1="{f(x0)}" y1="{f(y)}" x2="{f(x1)}" y2="{f(y)}"/>',
    ]


def colonnade(x0, x1, base_y, n, height, width):
    parts = []
    step = (x1 - x0) / (n - 1)
    for i in range(n):
        parts += column(x0 + i * step, base_y, height, width)
    top = base_y - height
    # stylobate: two steps the whole row stands on
    for k, op in ((0, '1'), (1, '.55')):
        y = base_y + 9 + k * 11
        parts.append(f'<line x1="{f(x0 - 70)}" y1="{f(y)}" x2="{f(x1 + 70)}" y2="{f(y)}" '
                     f'stroke-opacity="{op}"/>')
    # entablature: architrave, a triglyph course, cornice
    arch_y = top - 16
    parts.append(f'<line x1="{f(x0 - 56)}" y1="{f(arch_y)}" x2="{f(x1 + 56)}" y2="{f(arch_y)}"/>')
    parts.append(f'<line x1="{f(x0 - 60)}" y1="{f(arch_y - 34)}" x2="{f(x1 + 60)}" y2="{f(arch_y - 34)}"/>')
    parts.append(f'<line x1="{f(x0 - 66)}" y1="{f(arch_y - 46)}" x2="{f(x1 + 66)}" y2="{f(arch_y - 46)}" '
                 f'stroke-opacity=".6"/>')
    g = step / 2
    x = x0 - 56
    while x < x1 + 46:
        parts.append(f'<rect x="{f(x)}" y="{f(arch_y - 32)}" width="13" height="30" stroke-opacity=".55"/>')
        x += g
    return parts


# ── The theatron ─────────────────────────────────────────────
# Concentric benches with radial stairs. Drawn as arcs rather than a fan so
# the rows stay parallel to one another, which is what a raked house reads as.

def theatron(cx, cy, r0, rows, gap, span_deg, stairs):
    parts = []
    a0 = math.radians(180 + (180 - span_deg) / 2)
    a1 = math.radians(360 - (180 - span_deg) / 2)
    for i in range(rows):
        r = r0 + i * gap
        x0, y0 = cx + r * math.cos(a0), cy + r * math.sin(a0)
        x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
        op = 0.5 - (i / rows) * 0.3
        parts.append(f'<path d="M{f(x0)} {f(y0)} A{f(r)} {f(r)} 0 0 1 {f(x1)} {f(y1)}" '
                     f'stroke-opacity="{f(op)}"/>')
    r_out = r0 + (rows - 1) * gap
    for s in range(stairs):
        a = a0 + (a1 - a0) * (s + 0.5) / stairs
        parts.append(f'<line x1="{f(cx + r0 * math.cos(a))}" y1="{f(cy + r0 * math.sin(a))}" '
                     f'x2="{f(cx + r_out * math.cos(a))}" y2="{f(cy + r_out * math.sin(a))}" '
                     f'stroke-opacity=".38"/>')
    return parts


# ── Laurel ───────────────────────────────────────────────────
# The one piece of handwork. Paired leaves along a shallow arc, the same
# trick the vine uses: each leaf sits at the stem's own tangent.

def laurel(x, y, length, scale, flip=1, rot=0):
    parts = []
    pts = [(x + length * t / 10, y - flip * 26 * math.sin(math.pi * t / 10)) for t in range(11)]
    d = 'M' + ' L'.join(f'{f(px)} {f(py)}' for px, py in pts)
    parts.append(f'<path d="{d}" stroke-opacity=".8" transform="rotate({f(rot)} {f(x)} {f(y)})"/>')
    # ONE LEAF PER NODE, SIDES ALTERNATING. Drawing both sides at the same
    # node closes the pair into a loop, and a run of them reads as a bead
    # chain rather than a sprig. Alternating is also what laurel does.
    for i in range(1, 10):
        px, py = pts[i]
        ax, ay = pts[i + 1][0] - pts[i - 1][0], pts[i + 1][1] - pts[i - 1][1]
        ang = math.degrees(math.atan2(ay, ax))
        side = 1 if i % 2 else -1
        lw, lh = 6.5 * scale, 26 * scale
        parts.append(
            f'<path d="M0 0 C{f(lw)} {f(-lh * 0.3)} {f(lw * 0.8)} {f(-lh * 0.78)} 0 {f(-lh)} '
            f'C{f(-lw * 0.8)} {f(-lh * 0.78)} {f(-lw)} {f(-lh * 0.3)} 0 0 Z" '
            f'transform="rotate({f(rot)} {f(x)} {f(y)}) translate({f(px)} {f(py)}) '
            f'rotate({f(ang + 62 * side)})" stroke-opacity=".7"/>')
    return parts


def build():
    parts = []

    # The far wall: a second, fainter colonnade set back and up, so the room
    # has depth without anything being drawn in perspective.
    parts += colonnade(x0=250, x1=1480, base_y=432, n=7, height=232, width=36)
    parts += pediment(x0=176, x1=1554, y=132, rise=104)

    # The house, below the steps, sliced by the pane's bottom edge.
    parts += theatron(cx=800, cy=1196, r0=232, rows=6, gap=52, span_deg=120, stairs=0)

    # The speaker's platform, centred on the theatron and open to the room.
    parts.append('<path d="M690 762 L910 762 L910 806 L690 806 Z" stroke-opacity=".75"/>')
    parts.append('<line x1="664" y1="806" x2="936" y2="806" stroke-opacity=".5"/>')

    parts += laurel(176, 548, 162, 1.0, flip=1, rot=-12)
    parts += laurel(1322, 530, 176, 1.1, flip=-1, rot=10)
    parts += laurel(596, 214, 128, 0.78, flip=1, rot=-6)

    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'width="{W}" height="{H}" preserveAspectRatio="xMidYMin slice" '
            f'fill="none" stroke="{INK}" stroke-width="1.7" '
            f'stroke-linejoin="round" stroke-linecap="round">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


if __name__ == '__main__':
    svg = build()
    assert '--' not in svg, 'a double hyphen would break the XML parse'
    assert 'width=' in svg.split('>')[0], 'the root needs an intrinsic size'
    OUT.write_text(svg)
    print(f'make_rhetoric_ground: wrote {OUT.relative_to(ROOT)}, {len(svg):,} bytes')
