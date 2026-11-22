#!/usr/bin/env python3
"""Draw Building a Character's Learn ground, and write it to img/ui/.

WHY THIS IS A SCRIPT AND NOT A PICTURE
--------------------------------------
The same reason the other grounds are drawn: the pane's height is whatever
the page's height happens to be, so a bitmap either tiles visibly or
stretches. Geometry rescales and re-themes for free, costs a few KB, and
keeps the artwork budget on the course plates the owner paints.

WHAT IT DRAWS, AND WHY THIS AND NOT SOMETHING ELSE
--------------------------------------------------
A DRESSING ROOM: a costume rail on the left, a mirror and table on the
right.

CHARACTER_PRINCIPLE says a character is a person who wants something, seen
through what they do, and that you can invent that person, build one a
writer created, or learn one the tradition already made. A dressing room
is the one room in a theatre that exists for exactly that, and the THREE
GARMENTS on the rail are those three routes: a plain coat you make up, a
cut-and-shaped piece somebody else wrote, and a short doublet the
tradition already owns.

It is NOT the rehearsal room. Acting owns that, down to the ghost light
and the row of chairs, and this course is the one about becoming somebody
rather than about what happens between people. Commedia owns the hill
towns, Shakespeare the vine, Rhetoric the temple front, Musical the piano
and Screen the set.

Elevation, not perspective. One ink, thin stroke, no fill, same idiom as
the others so they read as one hand.

WHERE IT IS SAFE TO DRAW, WHICH IS THE PART TO READ FIRST
----------------------------------------------------------
Measured in the running app at a 1440 window, the same measurement
make_acting_ground.py records:

    viewBox x      0 .............. 282 ......... 1193 ....... 1600
    on screen     10 .............. 260 ......... 1066 ....... 1426
                  |<-- left gap -->|<-- reading -->|<-- right -->|

`.tr-view` carries an OPAQUE background and the module cards sit on it, so
the only parts of this drawing a reader ever sees are the two margins.
Anything in the middle is covered, and the floor line survives only
because it is cropped in the centre and reappears at the same height on
both sides, which is what ties the two halves together.

AND THE TOP OF EACH MARGIN IS NOT FREE EITHER, BY A DIFFERENT AMOUNT ON
EVERY COURSE. This is the part make_acting_ground.py gets wrong for
anybody who copies its numbers. It records the right rail as ending at
about y 354, which is true of ACTING'S Learn page and of no other:
`.right-rail` is `position: sticky` and its painted cards run as deep as
that course's Next step and Practice content does. Measured in the
running app at a 1440 window, the deepest OPAQUE card in the rail:

    acting     287        <- the short one the old note generalised from
    musical    602
    character  717        <- this course
    screen    1012        <- past the floor line; no right margin at all

The last navigation item ends at 360 on all four, so the LEFT margin is
free from there down.

That leaves this drawing 717 to 782 on the right, which is 65 units, or
about 57 screen pixels. A dressing table with a mirror needs 330 and was
drawn there in the first pass: the table legs showed and the mirror, the
one object that makes the room a dressing room, sat behind the Practice
card. So the rail is the left margin's object and the right gets a low
trunk that fits in the band that is actually free.

Everything is BELOW the nav items and the rail, and both of those are
sticky, so scrolling only ever hides more. Drawing high is drawing for
nobody.

THE HOUSE RULES EVERY GROUND GENERATOR KEEPS
--------------------------------------------
* No `-` twice in a row anywhere in the output, including inside a
  comment. A double hyphen in an SVG comment is not well formed XML and
  the file fails to parse SILENTLY as a broken image. This writes no SVG
  comments at all rather than relying on care.
* The root carries `width` and `height`, not only a `viewBox`. An <img>
  given a viewBox alone has no intrinsic size and the browser hands it the
  default replaced box, 267x150, which is not zero and therefore passes
  every naive check.
* The viewBox is 1600x900 to match the pane, which measures 1412x802 at a
  1440 window.
* Edit this script and re-run it. Never edit the SVG.

    python3 tools/make_character_ground.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui' / 'character-ground.svg'

W, H = 1600, 900
# Wood and cloth. The same warm brown as this course's plumb line in
# tools/make_character_sprig.py, because they are the same hand on the
# same page and the plumb is a wooden tool.
INK = '#7a6a52'

FLOOR = 782


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def line(x1, y1, x2, y2, op=None):
    o = f' stroke-opacity="{op}"' if op else ''
    return f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}"{o}/>'


def hanger(cx, y, half=26):
    """The hook and shoulders a garment hangs from. Drawn as its own thing
    because three garments sharing one silhouette read as bunting; the
    hook is what says these are clothes on a rail."""
    return [
        f'<path d="M{f(cx)} {f(y - 18)} C{f(cx + 9)} {f(y - 26)} {f(cx + 11)} {f(y - 11)} '
        f'{f(cx)} {f(y - 11)}" stroke-opacity=".75"/>',
        f'<path d="M{f(cx)} {f(y - 11)} L{f(cx - half)} {f(y + 7)} L{f(cx + half)} {f(y + 7)} Z" '
        f'stroke-opacity=".8"/>',
    ]


def coat(cx, top, length, shoulder, hem):
    """THE ROUTE YOU INVENT. A plain long coat: shoulders, two straight
    sides falling a little wider than they start, and a hem.

    Garments are drawn WIDE AND FEW. The first sketch hung five at 36
    units each, which is about 32 screen px at a 1440 window: at that
    width a coat is a tally mark. Three at 64 is a rail of clothes."""
    return [
        f'<path d="M{f(cx - shoulder)} {f(top)} C{f(cx - hem * 1.04)} {f(top + length * 0.45)} '
        f'{f(cx - hem)} {f(top + length * 0.8)} {f(cx - hem)} {f(top + length)} '
        f'L{f(cx + hem)} {f(top + length)} '
        f'C{f(cx + hem)} {f(top + length * 0.8)} {f(cx + hem * 1.04)} {f(top + length * 0.45)} '
        f'{f(cx + shoulder)} {f(top)} Z"/>',
        # the opening down the front, which is what stops a coat reading
        # as a sack
        line(cx, top + 6, cx, top + length - 8, '.45'),
    ]


def dress(cx, top, length, shoulder, hem):
    """THE ROUTE A WRITER ALREADY SHAPED. Narrow at the shoulder, taken in
    at the waist and flared below it: a garment somebody cut to a pattern
    rather than one you threw on."""
    waist = top + length * 0.42
    return [
        f'<path d="M{f(cx - shoulder)} {f(top)} L{f(cx - shoulder * 0.62)} {f(waist)} '
        f'C{f(cx - hem * 0.8)} {f(waist + length * 0.3)} {f(cx - hem)} {f(top + length * 0.86)} '
        f'{f(cx - hem)} {f(top + length)} '
        f'L{f(cx + hem)} {f(top + length)} '
        f'C{f(cx + hem)} {f(top + length * 0.86)} {f(cx + hem * 0.8)} {f(waist + length * 0.3)} '
        f'{f(cx + shoulder * 0.62)} {f(waist)} '
        f'L{f(cx + shoulder)} {f(top)} Z"/>',
        line(cx - shoulder * 0.62, waist, cx + shoulder * 0.62, waist, '.4'),
    ]


def doublet(cx, top, length, shoulder, hem):
    """THE ROUTE THE TRADITION MADE. Short, square and peplumed: the one
    of the three that is obviously period, and obviously not yours."""
    skirt = top + length * 0.66
    return [
        f'<path d="M{f(cx - shoulder)} {f(top)} L{f(cx - shoulder * 0.88)} {f(skirt)} '
        f'L{f(cx - hem)} {f(skirt)} L{f(cx - hem * 0.92)} {f(top + length)} '
        f'L{f(cx + hem * 0.92)} {f(top + length)} L{f(cx + hem)} {f(skirt)} '
        f'L{f(cx + shoulder * 0.88)} {f(skirt)} L{f(cx + shoulder)} {f(top)} Z"/>',
        line(cx - shoulder * 0.88, skirt, cx + shoulder * 0.88, skirt, '.5'),
        line(cx, top + 6, cx, skirt - 6, '.45'),
    ]


def rail(x1, x2, bar_y):
    """Two uprights, a bar and two feet. The feet matter: without them the
    uprights end on the floor line in a T and the rail reads as a doorway."""
    out = []
    for x in (x1, x2):
        out.append(line(x, bar_y, x, FLOOR))
        out.append(line(x - 17, FLOOR, x + 17, FLOOR, '.8'))
    out.append(line(x1, bar_y, x2, bar_y))
    return out


def trunk(left, right, top_y):
    """A flat costume trunk, which is the only thing that fits.

    65 UNITS IS THE WHOLE BRIEF. The right margin on this course is free
    from 717 down to the floor at 782, so the object has to be under about
    57 screen pixels tall. A trunk is: it is dressing room furniture, it
    is a box with two straps and a lid line, and nothing about it needs
    height to be recognised."""
    return [
        rect_path(left, top_y, right, FLOOR),
        # the lid, a little proud of the body
        line(left - 5, top_y + 13, right + 5, top_y + 13),
        line(left - 5, top_y, left - 5, top_y + 13, '.8'),
        line(right + 5, top_y, right + 5, top_y + 13, '.8'),
        # two straps
        line(left + 34, top_y, left + 34, FLOOR, '.55'),
        line(right - 34, top_y, right - 34, FLOOR, '.55'),
        # a handle on the near end
        f'<path d="M{f(right + 5)} {f(top_y + 30)} C{f(right + 17)} {f(top_y + 30)} '
        f'{f(right + 17)} {f(top_y + 46)} {f(right + 5)} {f(top_y + 46)}" '
        f'stroke-opacity=".7"/>',
    ]


def rect_path(x1, y1, x2, y2, op=None):
    o = f' stroke-opacity="{op}"' if op else ''
    return (f'<path d="M{f(x1)} {f(y1)} L{f(x2)} {f(y1)} L{f(x2)} {f(y2)} '
            f'L{f(x1)} {f(y2)} Z"{o}/>')


def mirror_table(left, right, top_y):
    """A dressing table with a standing mirror and its bulbs.

    THE BULBS ARE THE WHOLE OBJECT. A plain rectangle on a table is a
    picture frame; a rectangle with a row of lamps down each side is a
    dressing mirror and nothing else, at any size. They are small circles
    rather than outlined fittings for the reason every ornament in this
    project is filled below about 8 units: an outline that small is a
    smudge."""
    mw = (right - left) * 0.58
    mx1 = left + (right - left - mw) / 2
    mx2 = mx1 + mw
    m_top = 452
    out = [
        # the table top, overhanging a little at each end
        line(left, top_y, right, top_y),
        line(left + 10, top_y + 11, right - 10, top_y + 11, '.45'),
        # two legs, kicking out very slightly
        line(left + 22, top_y + 11, left + 14, FLOOR),
        line(right - 22, top_y + 11, right - 14, FLOOR),
        # the mirror standing on it
        f'<path d="M{f(mx1)} {f(top_y)} L{f(mx1)} {f(m_top + 22)} '
        f'C{f(mx1)} {f(m_top)} {f(mx1 + 16)} {f(m_top)} {f(mx1 + 26)} {f(m_top)} '
        f'L{f(mx2 - 26)} {f(m_top)} '
        f'C{f(mx2 - 16)} {f(m_top)} {f(mx2)} {f(m_top)} {f(mx2)} {f(m_top + 22)} '
        f'L{f(mx2)} {f(top_y)}"/>',
    ]
    # the bulbs, four down each side, clear of the glass
    for i in range(4):
        y = m_top + 46 + i * 46
        for x in (mx1 - 20, mx2 + 20):
            out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="8" fill="{INK}" '
                       f'fill-opacity=".55" stroke="none"/>')
    return out


def stool(cx, seat_y, half):
    return [
        line(cx - half, seat_y, cx + half, seat_y),
        line(cx - half * 0.82, seat_y, cx - half, FLOOR),
        line(cx + half * 0.82, seat_y, cx + half, FLOOR),
        line(cx - half * 0.7, seat_y + 26, cx + half * 0.7, seat_y + 26, '.45'),
    ]


def build():
    parts = []

    # The floor, full width, and the skirting below it. Cropped in the
    # middle by the reading column and showing at one height in both
    # margins, which is what makes two separate pieces of furniture read
    # as one room.
    parts.append(line(0, FLOOR, W, FLOOR))
    parts.append(line(0, FLOOR + 15, W, FLOOR + 15, '.45'))

    # LEFT: the rail. The bar hangs at 430 rather than 545, because the
    # measurement above puts the last navigation item at 360: the first
    # pass left 115 units of clear margin unused and the garments were
    # shorter for it.
    parts += rail(58, 252, 430)
    parts += hanger(100, 437)
    parts += coat(100, 444, 246, 26, 34)
    parts += hanger(155, 437)
    parts += dress(155, 444, 264, 24, 38)
    parts += hanger(210, 437)
    parts += doublet(210, 444, 186, 27, 33)

    # RIGHT: a trunk, inside the 65 units this course's rail leaves free.
    # The mirror and the dressing table that were here are not gone
    # because they were wrong, they are gone because nobody could see
    # them; mirror_table() and stool() are kept below for the day a
    # shorter rail makes the right margin usable again.
    parts += trunk(1388, 1546, 722)

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
    print(f'make_character_ground: wrote {OUT.relative_to(ROOT)}, {len(svg):,} bytes')
