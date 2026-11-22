#!/usr/bin/env python3
"""Draw Musical Theatre's Learn ground, and write it to img/ui/.

WHY THIS IS A SCRIPT AND NOT A PICTURE
--------------------------------------
The same reason the other grounds are drawn: the pane's height is whatever
the page's height happens to be, so a bitmap either tiles visibly or
stretches. Geometry rescales and re-themes for free and costs a few KB.

WHAT IT DRAWS, AND WHY THIS AND NOT SOMETHING ELSE
--------------------------------------------------
THE REHEARSAL ROOM AGAIN, WITH MUSIC IN IT: an upright piano and a stack
of scores on the left, three music stands on the right.

That repetition is the argument, not an accident. MUSICAL_PRINCIPLE says a
number is not a break from the acting, it is the same dramatic life
carried by other means. Acting's ground is a rehearsal room with a ghost
light and a row of chairs; this is the same room at the same floor height
with the furniture a music call puts in it. A learner moving between the
two courses should feel they have not left the building.

The scores on the floor are the principle's second clause, that the
repertoire is organised so you can find the one that fits the voice and
the character you have.

Commedia owns the hill towns, Shakespeare the vine, Rhetoric the temple
front, Character the dressing room and Screen the set.

Elevation, not perspective. One ink, thin stroke, no fill.

WHERE IT IS SAFE TO DRAW, WHICH IS THE PART TO READ FIRST
----------------------------------------------------------
Measured in the running app at a 1440 window, the same measurement
make_acting_ground.py records:

    viewBox x      0 .............. 282 ......... 1193 ....... 1600
    on screen     10 .............. 260 ......... 1066 ....... 1426
                  |<-- left gap -->|<-- reading -->|<-- right -->|

`.tr-view` has an OPAQUE background with the module cards on top, so only
the two margins are ever seen. The floor line survives the middle because
it is cropped there and reappears at the same height on both sides.

AND THE TOP OF EACH MARGIN IS NOT FREE, BY A DIFFERENT AMOUNT ON EVERY
COURSE. make_acting_ground.py records the right rail as ending near y 354
and that is true of ACTING'S page only: `.right-rail` is sticky and its
painted cards run as deep as that course's Next step and Practice content
does. Measured in the running app at a 1440 window, the deepest opaque
card in the rail:

    acting     287
    musical    602        <- this course
    character  717
    screen    1012

The last navigation item ends at 360 everywhere, so the left margin is
free from there down to the floor.

So the stands stand LOW: their desks sit at 630, not at the 500 of the
first pass, which put all three tops behind the Practice card. Both the
navigation and the rail are sticky, so scrolling only ever hides more of
this drawing, never less.

THE PIANO IS DRAWN IN FRONT ELEVATION, NOT IN PROFILE. An upright in
profile is a tall rectangle with a lip, which at this scale is a door. The
front gives the one silhouette everybody knows: a case, a long keyboard
band under it and a music desk on top.

THE HOUSE RULES EVERY GROUND GENERATOR KEEPS
--------------------------------------------
* No `-` twice in a row anywhere in the output, including inside a
  comment. A double hyphen in an SVG comment is not well formed XML and
  the file fails to parse SILENTLY as a broken image. This writes no SVG
  comments at all.
* The root carries `width` and `height`, not only a `viewBox`. With a
  viewBox alone the browser uses the default replaced box, 267x150, which
  is not zero and so passes a naive check.
* The viewBox is 1600x900 to match the pane, 1412x802 at a 1440 window.
* Edit this script and re-run it. Never edit the SVG.

    python3 tools/make_musical_ground.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui' / 'musical-ground.svg'

W, H = 1600, 900
# Piano wood with the brass of this course's tie ornament in it. Warmer
# than Acting's stage brown on purpose: the room is the same, the light
# in it is not.
INK = '#7d6a46'

FLOOR = 782


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def line(x1, y1, x2, y2, op=None):
    o = f' stroke-opacity="{op}"' if op else ''
    return f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}"{o}/>'


def rect(x1, y1, x2, y2, op=None):
    o = f' stroke-opacity="{op}"' if op else ''
    return (f'<path d="M{f(x1)} {f(y1)} L{f(x2)} {f(y1)} L{f(x2)} {f(y2)} '
            f'L{f(x1)} {f(y2)} Z"{o}/>')


def piano(left, right, top):
    """An upright, front on: the case, a lid line, the music desk above
    it, the keyboard band and two feet.

    THE BLACK KEYS ARE TICKS AND THERE ARE NOT MANY. A full keyboard at
    this scale is a grey band: 88 keys across 170 units is a key every two
    units, which at a 1440 window is under two screen pixels and fills in
    solid. Nine groups of ticks say piano and leave the band readable."""
    mid = (left + right) / 2
    key_top = top + 128
    case_bot = key_top + 62
    out = [
        # the case
        rect(left, top, right, case_bot),
        # the lid, a shade in from the ends
        line(left + 8, top + 15, right - 8, top + 15, '.6'),
        # the music desk standing on the lid
        rect(mid - 58, top - 46, mid + 58, top, '.8'),
        # the keyboard shelf, overhanging both sides
        line(left - 14, key_top, right + 14, key_top),
        line(left - 14, key_top + 18, right + 14, key_top + 18, '.7'),
        line(left - 14, key_top, left - 14, key_top + 18, '.7'),
        line(right + 14, key_top, right + 14, key_top + 18, '.7'),
    ]
    # the black keys: pairs and threes, the way a keyboard actually goes
    span = (right - left) - 28
    x = left + 14
    step = span / 15
    for i in range(15):
        if i % 7 in (2, 6):          # the gaps between the groups
            x += step
            continue
        out.append(line(x, key_top + 2, x, key_top + 11, '.5'))
        x += step
    # the feet
    out.append(line(left + 16, case_bot, left + 16, FLOOR, '.8'))
    out.append(line(right - 16, case_bot, right - 16, FLOOR, '.8'))
    return out


def scores(x, base, n=3):
    """A stack of vocal books, sitting ON THE LID at the bass end.

    THEY WERE ON THE FLOOR AND HALF OF THEM WERE INVISIBLE. Drawn beside
    the piano they ran from x 248 to 304, and the reading column starts at
    282: a third of the stack was behind an opaque panel, which is the one
    mistake this whole family of drawings exists to avoid. The lid is
    free, it is where a rehearsal room actually piles music, and it costs
    the left margin nothing.

    Nested shallow boxes rather than plain lines, because a run of
    horizontals at this size is a radiator."""
    out = []
    y = base
    for i in range(n):
        w = 52 - (i % 2) * 8
        off = (i % 3) * 5 - 5
        out.append(rect(x + off, y - 15, x + off + w, y, '.7' if i % 2 else None))
        y -= 15
    return out


def music_stand(cx, desk_y):
    """A desk, a stem and three feet. The DESK IS TILTED, which is the
    only part that distinguishes a music stand from a lamp at a glance,
    and the feet splay unevenly because a tripod drawn symmetrically in
    elevation reads as a single post with a shadow."""
    dw, dh = 112, 58
    tilt = 15
    return [
        # the desk, a parallelogram leaning back
        f'<path d="M{f(cx - dw / 2)} {f(desk_y + tilt)} L{f(cx + dw / 2)} {f(desk_y - tilt)} '
        f'L{f(cx + dw / 2)} {f(desk_y - tilt + dh)} L{f(cx - dw / 2)} {f(desk_y + tilt + dh)} Z"/>',
        # the lip the music sits on
        line(cx - dw / 2, desk_y + tilt + dh - 13, cx + dw / 2, desk_y - tilt + dh - 13, '.5'),
        # the stem
        line(cx, desk_y + dh + 4, cx, FLOOR - 16),
        # three feet
        line(cx, FLOOR - 16, cx - 44, FLOOR),
        line(cx, FLOOR - 16, cx + 40, FLOOR),
        line(cx, FLOOR - 16, cx + 6, FLOOR - 2, '.7'),
    ]


def build():
    parts = []

    # The floor and the skirting, at Acting's height to the pixel. That
    # is the whole point of this ground and is not a copied constant to
    # be tidied away: the two rooms are meant to be one room.
    parts.append(line(0, FLOOR, W, FLOOR))
    parts.append(line(0, FLOOR + 15, W, FLOOR + 15, '.45'))

    # LEFT: the upright, with its top below the navigation items, and the
    # music piled on its lid at the bass end.
    parts += piano(58, 236, 536)
    parts += scores(162, 536)

    # RIGHT: three stands, turned towards the reading the way Acting's
    # chairs are.
    for cx in (1268, 1392, 1516):
        parts += music_stand(cx, 630)

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
    print(f'make_musical_ground: wrote {OUT.relative_to(ROOT)}, {len(svg):,} bytes')
