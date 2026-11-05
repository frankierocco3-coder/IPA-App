#!/usr/bin/env python3
"""Draw the Shakespeare Learn page's ivy ground, and write it to img/ui/.

WHY THIS IS A SCRIPT AND NOT A PICTURE
--------------------------------------
The owner's reference draws ivy down the far-left margin of the Learn page
and along its bottom edge. It arrived painted into the reference screenshot
and not as an asset, and a raster strip is the wrong answer anyway: the
margin's height is whatever the page's height happens to be, so a bitmap
either tiles visibly or stretches.

So it is drawn, the way img/ui/commedia-ground.svg is drawn — geometry, one
ink colour, a few KB, and it rescales and re-themes for free. Unlike that
one, this has a generator beside it, because a vine is leaves placed along
a curve at its own tangent and that is arithmetic, not handwork.

Run it to regenerate the file after changing anything here:

    python3 tools/make_vine_ground.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.

TWO HOUSE RULES IT HAS TO KEEP
------------------------------
* No `--` anywhere in the output, including inside a comment. An SVG
  comment containing a double hyphen is not well-formed XML and the whole
  file fails to parse, silently, as a broken image. This writes no SVG
  comments at all rather than relying on care.
* The root carries `width` and `height`, not only a `viewBox`. An <img> is
  a replaced element: given a viewBox alone it has no intrinsic size, and
  the CSS that places the ground sizes it from the file. A viewBox-only
  SVG collapses to 0x0 and draws nothing, which has already happened once
  in this project.
"""

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui' / 'shakespeare-ground.svg'

W, H = 1200, 1000
INK = '#76854f'


def bez(p0, p1, p2, p3, t):
    """Point on a cubic at t."""
    u = 1 - t
    x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0]
    y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]
    return x, y


def bez_tan(p0, p1, p2, p3, t):
    """Tangent angle in degrees at t. This is what makes a leaf sit ON the
    stem rather than beside it: every leaf is rotated to the curve's own
    direction where it attaches."""
    u = 1 - t
    dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
    dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
    return math.degrees(math.atan2(dy, dx))


def n(v):
    """Trim a float to one decimal, and drop a trailing .0 — the file is
    mostly numbers, so this is most of its size."""
    s = f'{v:.1f}'
    return s[:-2] if s.endswith('.0') else s


class Stem:
    """A polybezier: a start point and a run of cubic segments."""

    def __init__(self, start, segs):
        self.start = start
        self.segs = segs

    def path(self):
        d = [f'M{n(self.start[0])} {n(self.start[1])}']
        for c1, c2, end in self.segs:
            d.append(f'C{n(c1[0])} {n(c1[1])} {n(c2[0])} {n(c2[1])} {n(end[0])} {n(end[1])}')
        return ''.join(d)

    def at(self, s):
        """Point and tangent at s in 0..1 across the whole stem."""
        k = min(int(s * len(self.segs)), len(self.segs) - 1)
        t = s * len(self.segs) - k
        p0 = self.start if k == 0 else self.segs[k - 1][2]
        c1, c2, p3 = self.segs[k]
        return bez(p0, c1, c2, p3, t), bez_tan(p0, c1, c2, p3, t)


def leaf(length, width):
    """One lanceolate leaf pointing along +x from its stalk at the origin,
    drawn as two mirrored cubics with a midrib."""
    L, Wd = length, width
    body = (f'M0 0C{n(L * .24)} {n(-Wd)} {n(L * .72)} {n(-Wd * .82)} {n(L)} 0'
            f'C{n(L * .72)} {n(Wd * .82)} {n(L * .24)} {n(Wd)} 0 0Z')
    rib = f'M{n(L * .1)} 0L{n(L * .82)} 0'
    return body, rib


def tendril(radius):
    """A little coil, for the gaps between leaves. Three quarter turns of
    shrinking radius, which reads as a curl without needing many points."""
    pts = []
    r = radius
    a = 0.0
    x, y = 0.0, 0.0
    for _ in range(5):
        nx = x + r * math.cos(a + math.pi / 2) * .9
        ny = y + r * math.sin(a + math.pi / 2) * .9
        pts.append((f'Q{n(x + r * math.cos(a) * .8)} {n(y + r * math.sin(a) * .8)} '
                    f'{n(nx)} {n(ny)}'))
        x, y = nx, ny
        a += math.pi / 2.2
        r *= .62
    return 'M0 0' + ''.join(pts)


def sprigs(stem, count, first=0.04, last=0.97, length=34, width=13, flip=1):
    """Leaves alternating down a stem, each rotated to the tangent there and
    kicked out to one side or the other."""
    out = []
    for i in range(count):
        s = first + (last - first) * (i / max(count - 1, 1))
        (px, py), ang = stem.at(s)
        side = flip if i % 2 == 0 else -flip
        # Shrink toward the tip so the vine tapers rather than ending blunt.
        taper = 1 - 0.38 * (i / max(count - 1, 1))
        L, Wd = length * taper, width * taper
        body, rib = leaf(L, Wd)
        rot = ang + side * 62
        g = (f'<g transform="translate({n(px)},{n(py)}) rotate({n(rot)})">'
             f'<path d="{body}" fill="{INK}" fill-opacity=".10"/>'
             f'<path d="{rib}" stroke-opacity=".5"/></g>')
        out.append(g)
        if i % 3 == 1:
            (tx, ty), tang = stem.at(min(s + 0.018, 1.0))
            out.append(f'<g transform="translate({n(tx)},{n(ty)}) '
                       f'rotate({n(tang - side * 48)})" stroke-opacity=".45">'
                       f'<path d="{tendril(11)}"/></g>')
    return out


def build():
    # THE LEFT MARGIN. It runs off the top and off the bottom, because a
    # vine that starts and stops inside the frame reads as an object on the
    # page rather than as a border to it.
    left = Stem((104, -60), [
        ((150, 60), (46, 150), (92, 250)),
        ((132, 342), (48, 430), (86, 524)),
        ((120, 606), (40, 690), (78, 782)),
        ((112, 866), (52, 940), (96, 1060)),
    ])
    # THE BOTTOM EDGE, running in from the left and off the right.
    bottom = Stem((-60, 946), [
        ((90, 902), (208, 992), (330, 944)),
        ((448, 898), (560, 984), (690, 940)),
        ((812, 898), (930, 976), (1060, 936)),
        ((1130, 914), (1180, 946), (1260, 926)),
    ])
    # A second, fainter strand behind the left one, for depth.
    ghost = Stem((48, -40), [
        ((96, 110), (8, 206), (54, 320)),
        ((96, 426), (18, 520), (62, 640)),
        ((104, 752), (26, 850), (70, 1040)),
    ])

    parts = []
    parts.append(f'<path d="{ghost.path()}" stroke-opacity=".32"/>')
    parts += sprigs(ghost, 7, length=25, width=10, flip=-1)
    parts.append(f'<path d="{left.path()}"/>')
    parts += sprigs(left, 13, length=36, width=14, flip=1)
    parts.append(f'<path d="{bottom.path()}" stroke-opacity=".7"/>')
    parts += sprigs(bottom, 15, length=30, width=12, flip=-1)

    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'width="{W}" height="{H}" preserveAspectRatio="xMinYMax slice" '
            f'fill="none" stroke="{INK}" stroke-width="1.6" '
            f'stroke-linejoin="round" stroke-linecap="round">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


if __name__ == '__main__':
    svg = build()
    assert '--' not in svg, 'a double hyphen would break the XML parse'
    OUT.write_text(svg)
    print(f'make_vine_ground: wrote {OUT.relative_to(ROOT)}, {len(svg):,} bytes')
