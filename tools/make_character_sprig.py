#!/usr/bin/env python3
"""Draw Building a Character's ornament, and write it to img/ui/.

WHY THIS EXISTS
---------------
`SPRIG` in js/main.js resolves `COURSE_SPRIG[workspace]` and falls back
to `cm-l01-sprig` for everything it does not find. Until now that table
held ONE entry, Rhetoric's, so Building a Character, Acting, Shakespeare,
Musical Theatre, Screen Acting and Theatre History all decorated their
lesson headings with

    img/lessons/commedia/l01-sprig.png

a leaf spray cropped from the owner's commedia rendering. js/main.js:4795
states the house rule out loud, that pulling one course's artwork onto
another course's page is not a thing this project does, and the ornament
was quietly breaking it on six courses. tools/make_rhetoric_sprig.py was
written for exactly this reason and says so; this is the same fix, one
course along.

WHY A PLUMB LINE
----------------
Rhetoric got laurel because laurel is the one plant that subject owns.
Building a Character owns no plant. What it owns is a QUESTION ABOUT A
BODY: its first module is The Physical Character and its first lesson,
Your Own Body First, asks where the weight sits, what leads, and where
the body holds itself off true. A plumb line is the tool that answers
exactly that question and nothing else, and it is the only object in the
workshop that means `centre` on sight.

The swing arc underneath is the point of the drawing rather than
decoration: a plumb that hangs dead still is a diagram, and this course
is about a body that is still settling.

SAME IDIOM AS THE RHETORIC MARK, which is the same hand as the Learn
grounds one size down: a single ink, thin stroke, filled where a shape
is too small to read as an outline. At the 46px this renders beside a
heading an outlined bob 5px across is a scribble and a filled one is a
bob.

THE SAME HOUSE RULES THE GROUND AND THE LAUREL KEEP
---------------------------------------------------
* No `-` twice in a row anywhere in the output. A double hyphen inside an
  SVG comment is not well formed XML and the file fails to parse SILENTLY
  as a broken image. This writes no SVG comments at all.
* The root carries `width` and `height`, not only a `viewBox`. An <img>
  given a viewBox alone has no intrinsic size and draws nothing.
* Edit this script and re-run it. Never edit the SVG.

    python3 tools/make_character_sprig.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships
nowhere; only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui'

# A warm mid brown, between the page ink #2f3a2e and the gold eyebrow
# #8a6d3b this course already uses. Rhetoric's mark is olive because it
# is foliage; this one is a wooden tool and reads as one.
INK = '#7a6a52'

# 76 x 49, EXACTLY the raster's box. The CSS that places `.lxc-sprig`
# needs no change at all, which is the whole reason for matching it.
W, H = 76, 49


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def eye(cx, cy, r, t):
    """The ring the cord is tied through.

    THERE WAS A FULL WIDTH BATTEN HERE and it was wrong. Set beside the
    Rhetoric laurel at 3x, a hard horizontal bar spanning the whole box
    read as a rule or a UI divider rather than as an ornament, and with
    the bob under it the mark looked like an anchor. The laurel is
    diagonal, asymmetric and organic; a ring and a hanging line can be
    the same hand, a bar cannot."""
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="none" '
            f'stroke="{INK}" stroke-width="{f(t)}"/>')


def cord(x, y1, y2, t):
    return (f'<rect x="{f(x - t / 2)}" y="{f(y1)}" width="{f(t)}" '
            f'height="{f(y2 - y1)}" rx="{f(t / 2)}"/>')


def bob(cx, top, length, width):
    """The weight: a shoulder, a taper, a point. Filled, for the reason
    in the docstring above."""
    hw = width / 2
    sh = top + length * 0.34          # the widest point, the shoulder
    # EVERY NUMBER HERE IS ABSOLUTE. The first draft passed `sh - top`,
    # an offset, as a control point's y, which put it at 4.59 near the
    # top of the box: the bob's shoulder curved up past the beam it hangs
    # from. In an SVG path only `c` is relative, never `C`.
    c_hi = top + length * 0.10
    c_lo = sh - length * 0.08
    return (f'<path d="M{f(cx)} {f(top)} '
            f'C{f(cx + hw)} {f(c_hi)} {f(cx + hw)} {f(c_lo)} {f(cx + hw * 0.92)} {f(sh)} '
            f'L{f(cx)} {f(top + length)} '
            f'L{f(cx - hw * 0.92)} {f(sh)} '
            f'C{f(cx - hw)} {f(c_lo)} {f(cx - hw)} {f(c_hi)} {f(cx)} {f(top)} Z"/>')


def swing(cx, y, half, drop, t):
    """A shallow arc under the bob: where it has been, and where it is
    still going. Stroked rather than filled, so it stays a hint."""
    return (f'<path d="M{f(cx - half)} {f(y)} Q{f(cx)} {f(y + drop)} {f(cx + half)} {f(y)}" '
            f'fill="none" stroke="{INK}" stroke-width="{f(t)}" '
            f'stroke-linecap="round" stroke-opacity=".55"/>')


def sprig():
    """A plumb still settling: tied at the upper left, hanging off true,
    with the arc of its swing beneath.

    THE TILT IS THE WHOLE COMPOSITION. Drawn dead vertical and centred it
    is a diagram; carried off plumb and anchored off centre it has the
    diagonal the laurel has, and it says the thing the lesson says, that
    a body has not finished settling into what it does when nobody is
    looking."""
    ax, ay = 22.0, 10.5                      # the anchor, upper left
    tilt = -11                               # degrees off true
    # WEIGHTED FOR 46px, NOT FOR THE 2.5x PROOF. Side by side with the
    # laurel at shipping size the first pass read as a thread: the laurel
    # carries nine filled leaves and this carries one line. The cord and
    # the bob are fattened until the two hold the same mass beside a
    # heading, which is the only size either of them is ever seen at.
    hang = (
        cord(ax, ay, ay + 19, 1.9)
        + '\n' + bob(ax, ay + 19, 14.5, 9.2)
    )
    parts = [
        eye(ax, ay - 3.6, 3.3, 1.8),
        f'<g transform="rotate({f(tilt)} {f(ax)} {f(ay)})">{hang}</g>',
        swing(ax + 4.5, 45.5, 15.5, 4.0, 1.8),
    ]
    return W, H, parts


def build(w, h, parts):
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" fill="{INK}">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


if __name__ == '__main__':
    w, h, parts = sprig()
    svg = build(w, h, parts)
    assert '--' not in svg, 'a double hyphen would break the XML parse'
    assert 'width=' in svg.split('>')[0], 'the root needs an intrinsic size'
    (OUT / 'character-sprig.svg').write_text(svg)
    print(f'make_character_sprig: wrote img/ui/character-sprig.svg, {len(svg):,} bytes')
