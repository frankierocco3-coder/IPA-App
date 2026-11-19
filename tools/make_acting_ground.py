#!/usr/bin/env python3
"""Draw the Acting Learn page's ground, and write it to img/ui/.

WHY THIS IS A SCRIPT AND NOT A PICTURE
--------------------------------------
The same reason the other three grounds are drawn rather than painted: the
ground sits behind a pane whose height is whatever the page's height
happens to be, so a bitmap either tiles visibly or stretches. Geometry
rescales and re-themes for free and costs a few KB. It also keeps the
artwork budget where it belongs, which is the course plates.

WHAT IT DRAWS, AND WHY THIS AND NOT SOMETHING ELSE
--------------------------------------------------
The rehearsal room, because that is where every one of this course's four
modules happens: script analysis at the table, behaviour on the floor,
listening across it, and rhythm in the time between. The furniture is a
lighting bar, a ghost light and a row of chairs, which is a theatre at
rest and reads as one shape at any size.

Commedia owns the hill towns, Shakespeare the vine and Rhetoric the
temple front. None of those is available here and none should be: a
course wearing another course's motif is the same mistake as a course
wearing another course's artwork.

Elevation, not perspective. One ink, thin stroke, no fill, same idiom as
the other three, so the four read as one hand.

THE COMPOSITION IS DICTATED BY THE PANE, and this is the part worth
reading before changing anything. Measured in the running app at a 1440
window: the ground spans x 10 to 1426 and the READING COLUMN sits at 260
to 1066. So the only parts a reader actually sees are a 250px margin on
the left and a 360px margin on the right, and anything drawn in the
middle is behind the words at opacity .5, fighting them.

    viewBox x      0 .............. 282 ......... 1193 ....... 1600
    on screen     10 .............. 260 ......... 1066 ....... 1426
                  |<-- left gap -->|<-- reading -->|<-- right -->|

So: the ghost light stands in the left margin, the chairs sit in the
right one, and the centre carries nothing but the bar overhead and the
floor line, both of which are single horizontals that text reads over
without noticing.

THE HOUSE RULES EVERY GROUND GENERATOR KEEPS
--------------------------------------------
* No `-` twice in a row anywhere in the output, including inside a
  comment. A double hyphen in an SVG comment is not well formed XML and
  the file fails to parse SILENTLY as a broken image. This writes no SVG
  comments at all rather than relying on care.
* The root carries `width` and `height`, not only a `viewBox`. An <img>
  given a viewBox alone has no intrinsic size and draws nothing, which has
  happened in this project before.
* The viewBox is 1600x900 to match the pane, which measures 1412x802 in
  the running app. `object-fit: cover` with `object-position: top center`
  crops the BOTTOM, so an aspect that matches means almost nothing is
  cropped at all. It matters here more than it did on the other grounds,
  because the usable space is the LOWER half of this one: at 1600x1000 a
  shorter pane would have cropped the floor, the ghost light and the
  chairs together, leaving an empty rectangle.

    python3 tools/make_acting_ground.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui' / 'acting-ground.svg'

W, H = 1600, 900
# A warm stage brown. The page is cream and the ground renders at opacity
# .5, so anything greyer than this reads as smudge rather than as line.
INK = '#7b6f57'

LEFT_EDGE, RIGHT_EDGE = 282, 1193   # where the reading column starts and ends


def f(x):
    """Trim coordinates. Two decimals is well under a stroke width and
    takes about a third off the file."""
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def lantern(x, y, size=1.0):
    """One hanging lantern. A YOKE, a long barrel and a lens ring at the
    bottom, because the first draft drew a short tapered box that read as
    a bucket, and five buckets on a bar read as a shelf of crockery."""
    w, h = 23 * size, 58 * size
    drop = 22 * size
    top = y + drop
    return [
        # the hook and the drop to the yoke
        f'<line x1="{f(x)}" y1="{f(y)}" x2="{f(x)}" y2="{f(top - 6 * size)}"/>',
        # the yoke: a U the barrel hangs inside
        f'<path d="M{f(x - w * 0.86)} {f(top - 6 * size)} L{f(x - w * 0.86)} {f(top + h * 0.46)} '
        f'M{f(x + w * 0.86)} {f(top - 6 * size)} L{f(x + w * 0.86)} {f(top + h * 0.46)}" '
        f'stroke-opacity=".7"/>',
        f'<line x1="{f(x - w * 0.86)}" y1="{f(top - 6 * size)}" '
        f'x2="{f(x + w * 0.86)}" y2="{f(top - 6 * size)}" stroke-opacity=".7"/>',
        # the barrel, longer than it is wide so it reads as a lantern
        f'<path d="M{f(x - w / 2)} {f(top)} L{f(x + w / 2)} {f(top)} '
        f'L{f(x + w / 2)} {f(top + h)} L{f(x - w / 2)} {f(top + h)} Z"/>',
        # the lens ring, flared
        f'<path d="M{f(x - w * 0.72)} {f(top + h)} L{f(x + w * 0.72)} {f(top + h)}"/>',
        f'<path d="M{f(x - w / 2)} {f(top + h)} L{f(x - w * 0.72)} {f(top + h + 9 * size)} '
        f'M{f(x + w / 2)} {f(top + h)} L{f(x + w * 0.72)} {f(top + h + 9 * size)}" '
        f'stroke-opacity=".6"/>',
    ]


def ghost_light(x, base_y, height):
    """The bulb left burning on an empty stage: a tripod foot, a stand, a
    bare lamp and a wire cage around it. The one object in a theatre that
    means the room is at rest, which is what a watermark should say."""
    top = base_y - height
    cage_r = 34
    cy = top + cage_r + 10
    parts = [
        f'<line x1="{f(x)}" y1="{f(base_y)}" x2="{f(x)}" y2="{f(cy + cage_r)}"/>',
        # tripod foot
        f'<line x1="{f(x - 46)}" y1="{f(base_y)}" x2="{f(x + 46)}" y2="{f(base_y)}"/>',
        f'<line x1="{f(x)}" y1="{f(base_y - 34)}" x2="{f(x - 38)}" y2="{f(base_y)}" stroke-opacity=".7"/>',
        f'<line x1="{f(x)}" y1="{f(base_y - 34)}" x2="{f(x + 38)}" y2="{f(base_y)}" stroke-opacity=".7"/>',
        # the cage, as a circle and four ribs
        f'<circle cx="{f(x)}" cy="{f(cy)}" r="{f(cage_r)}" stroke-opacity=".8"/>',
        f'<line x1="{f(x - cage_r)}" y1="{f(cy)}" x2="{f(x + cage_r)}" y2="{f(cy)}" stroke-opacity=".45"/>',
        f'<line x1="{f(x)}" y1="{f(cy - cage_r)}" x2="{f(x)}" y2="{f(cy + cage_r)}" stroke-opacity=".45"/>',
        # the bulb inside it
        f'<path d="M{f(x - 11)} {f(cy + 9)} C{f(x - 13)} {f(cy - 8)} {f(x + 13)} {f(cy - 8)} '
        f'{f(x + 11)} {f(cy + 9)} Z" stroke-opacity=".9"/>',
        f'<line x1="{f(x - 7)}" y1="{f(cy + 9)}" x2="{f(x + 7)}" y2="{f(cy + 9)}"/>',
    ]
    return parts


def chair(x, base_y, s=1.0):
    """A folding chair IN PROFILE, facing left.

    Front elevation was tried twice and abandoned: at the size this
    renders, a chair seen head on is a rectangle above a trapezoid, which
    reads as a crate. In profile the seat and the back make an L, and an L
    on four legs is a chair at any size. The row faces left, into the
    reading column, the way chairs set out for a read through would.
    """
    depth, seat_h, back_h = 44 * s, 42 * s, 74 * s
    seat = base_y - seat_h
    front, rear = x, x + depth
    return [
        # the seat
        f'<line x1="{f(front)}" y1="{f(seat)}" x2="{f(rear)}" y2="{f(seat)}"/>',
        # front leg, kicking forward
        f'<line x1="{f(front)}" y1="{f(seat)}" x2="{f(front - 7 * s)}" y2="{f(base_y)}"/>',
        # rear leg, kicking back
        f'<line x1="{f(rear)}" y1="{f(seat)}" x2="{f(rear + 7 * s)}" y2="{f(base_y)}"/>',
        # the back, leaning away a little
        f'<line x1="{f(rear)}" y1="{f(seat)}" x2="{f(rear + 9 * s)}" y2="{f(seat - back_h)}"/>',
        # top rail and one slat, drawn short because this is a profile
        f'<line x1="{f(rear + 9 * s)}" y1="{f(seat - back_h)}" '
        f'x2="{f(rear + 2 * s)}" y2="{f(seat - back_h)}" stroke-opacity=".75"/>',
        f'<line x1="{f(rear + 5 * s)}" y1="{f(seat - back_h * 0.5)}" '
        f'x2="{f(rear - 1 * s)}" y2="{f(seat - back_h * 0.5)}" stroke-opacity=".5"/>',
        # stretcher between the legs
        f'<line x1="{f(front - 4 * s)}" y1="{f(base_y - 14 * s)}" '
        f'x2="{f(rear + 4 * s)}" y2="{f(base_y - 14 * s)}" stroke-opacity=".5"/>',
    ]


def build():
    """THE TOP OF THIS PANE IS NOT FREE, which the first draft assumed and
    the running app disproved. Measured at a 1440 window:

        .side-nav    x   16..232    y 0..1000   full height, transparent
        .right-rail  x 1094..1424   y 0..313
        the reading  x  260..1066

    So a lighting bar with lanterns across the top hung them behind the
    navigation on the left and behind the Next step card on the right, and
    the only thing it achieved was a line through the page title. All of it
    came out. What is left is the room below the furniture: a ghost light
    standing in the open strip under the nav, chairs in the open right
    margin under the rail, and two horizontals nothing competes with.

    A watermark that has to fight the interface is a watermark drawn in the
    wrong place, not one that needs to be fainter.
    """
    parts = []
    floor = 782

    # The floor, full width: the line the room stands on, and the edge of
    # the stage below it.
    parts.append(f'<line x1="0" y1="{floor}" x2="{W}" y2="{floor}"/>')
    parts.append(f'<line x1="0" y1="{floor + 15}" x2="{W}" y2="{floor + 15}" stroke-opacity=".45"/>')

    # LEFT: the ghost light, in the strip below the navigation items.
    # 250, not 330. At a 1024 window the pane is tall and narrow, the
    # drawing scales down, and a taller stand put the lamp head level with
    # the last navigation item. Short enough to clear it at every width.
    parts += ghost_light(150, floor, 250)

    # RIGHT: the chairs, in the margin below the rail, facing the reading.
    for x in (1240, 1346, 1452, 1558):
        parts += chair(x, floor)

    # NO SPIKE MARKS. Four of them were drawn across the centre and not one
    # was ever visible: `.tr-view` carries an opaque background and the
    # module cards sit on top of it, so the only part of this drawing a
    # reader sees is the two margins OUTSIDE the reading column. Anything
    # in the middle is covered. The floor line survives for the opposite
    # reason: it is cropped in the centre and shows in both margins at the
    # same height, which is what ties the two halves together.

    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'width="{W}" height="{H}" preserveAspectRatio="xMidYMin slice" '
            f'fill="none" stroke="{INK}" stroke-width="2.1" '
            f'stroke-linejoin="round" stroke-linecap="round">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


if __name__ == '__main__':
    svg = build()
    assert '--' not in svg, 'a double hyphen would break the XML parse'
    assert 'width=' in svg.split('>')[0], 'the root needs an intrinsic size'
    OUT.write_text(svg)
    print(f'make_acting_ground: wrote {OUT.relative_to(ROOT)}, {len(svg):,} bytes')
