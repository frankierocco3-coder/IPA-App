#!/usr/bin/env python3
"""Draw Screen Acting's Learn ground, and write it to img/ui/.

WHY THIS IS A SCRIPT AND NOT A PICTURE
--------------------------------------
The same reason the other grounds are drawn: the pane's height is whatever
the page's height happens to be, so a bitmap either tiles visibly or
stretches. Geometry rescales and re-themes for free and costs a few KB.

WHAT IT DRAWS, AND WHY THIS AND NOT SOMETHING ELSE
--------------------------------------------------
A SET: a stand with a flag on the left, the monitor and a stack of apple
boxes on the right, and DOLLY TRACK where the other grounds have a floor.

SCREEN_PRINCIPLE says the camera is not an audience you reach, it is a
record you answer to, and that every take has to be repeatable. The
monitor is the record, in the one piece of kit the course's own first
module sends the learner to look at: playback is where it says the
learning happens. The track is repeatability made out of metal, and it is
the only floor in this project that is a machine.

NO CAMERA, AND THAT IS DELIBERATE. This course's heading ornament is
already a phone on a tripod (tools/make_course_sprigs.py), and the sprig
sits on the same pages as this drawing. Putting sticks in both would be
the same object twice in one frame.

THE TRACK REPLACES THE FLOOR LINE RATHER THAN JOINING IT. Every other
ground runs one horizontal full width, because that is the only mark the
reading column can crop and still have make sense in both margins. Two
rails and their sleepers do the same job and say where they are, and the
NEAR rail sits at y 782, which is the floor height every other ground in
this project uses. The family holds even where the floor is a machine.

AND EVERYTHING STANDS BEHIND THE TRACK, NOT IN IT. The first draft put
the stand's feet, the monitor's base and the boxes at y 778, between the
rails: at any magnification that reads as a light stand planted in the
middle of a dolly track, which is both wrong and the first thing a
grip would see. In an elevation with no perspective, behind is higher up
the page, so the furniture stands on the FAR rail's line.

Theatre's rooms belong to the other courses: Acting the rehearsal room,
Character the dressing room, Musical the piano, Commedia the hill towns,
Shakespeare the vine, Rhetoric the temple front.

WHERE IT IS SAFE TO DRAW, AND THIS COURSE HAS ONLY ONE MARGIN
--------------------------------------------------------------
Measured in the running app at a 1440 window:

    viewBox x      0 .............. 282 ......... 1193 ....... 1600
    on screen     10 .............. 260 ......... 1066 ....... 1426
                  |<-- left gap -->|<-- reading -->|<-- right -->|

`.tr-view` has an OPAQUE background with the module cards on top, so only
the two margins are ever seen.

AND ON THIS COURSE THE RIGHT MARGIN IS NOT ONE OF THEM. `.right-rail` is
`position: sticky`, so whatever it paints covers the same band of the
drawing at every scroll position, and the depth of that band is a
property of the COURSE, not of the layout. The deepest opaque card:

    acting     287
    musical    602
    character  717
    screen    1012        <- this course, and the floor line is at 782

1012 is past the bottom of the drawing. There is no height at which
anything on the right of this ground is visible to anybody, which is why
the first pass put a monitor and a stack of apple boxes over there and
they could not be seen at any scroll position or any width.
make_acting_ground.py records the rail as ending near y 354; that is
ACTING'S page and generalises to nothing.

So the whole set lives in the 282 units of the left margin, below the
last navigation item at 360.

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

    python3 tools/make_screen_ground.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui' / 'screen-ground.svg'

W, H = 1600, 900
# A warm graphite: this is kit, not furniture and not foliage. The same
# ink as the course's tripod ornament, so the two drawings on a lesson
# page are one hand.
INK = '#6f6a5c'

RAIL_NEAR = 782          # where every other ground puts its floor
RAIL_FAR = 758


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def line(x1, y1, x2, y2, op=None):
    o = f' stroke-opacity="{op}"' if op else ''
    return f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}"{o}/>'


def rect(x1, y1, x2, y2, op=None):
    o = f' stroke-opacity="{op}"' if op else ''
    return (f'<path d="M{f(x1)} {f(y1)} L{f(x2)} {f(y1)} L{f(x2)} {f(y2)} '
            f'L{f(x1)} {f(y2)} Z"{o}/>')


def track():
    """Two rails and their sleepers, running out of frame both ways.

    THE SLEEPERS ARE WHY IT IS TRACK. Two parallel lines alone are a kerb;
    the rungs between them are the whole read, and they are spaced at 92
    rather than drawn every 40, because at a 1440 window 40 units is 35
    screen px and a close ladder fills in to a grey band at opacity .5."""
    out = [
        line(0, RAIL_NEAR, W, RAIL_NEAR),
        line(0, RAIL_FAR, W, RAIL_FAR, '.75'),
    ]
    x = 26
    while x < W:
        out.append(line(x, RAIL_FAR, x + 9, RAIL_NEAR, '.5'))
        x += 92
    return out


def c_stand(x, top):
    """A stand with a flag on an arm: the column, the knuckle, the arm and
    a rectangle of black cloth hanging off it.

    THE ARM REACHES ONE WAY ONLY. Drawn centred it is a crucifix; drawn
    reaching across the page it is a piece of grip equipment cutting light
    off something, which is what it is for. The legs are three, uneven,
    for the reason the music stands on Musical's ground are: a symmetric
    tripod in elevation reads as a post."""
    foot = RAIL_FAR - 2
    arm_y = top + 22
    arm_x = x + 118
    return [
        # the column, in two sections with a collar where they meet
        line(x, top, x, foot - 18),
        line(x - 9, top + 96, x + 9, top + 96, '.7'),
        # three legs
        line(x, foot - 18, x - 52, foot),
        line(x, foot - 18, x + 46, foot),
        line(x, foot - 18, x - 6, foot - 2, '.7'),
        # the knuckle and the arm
        f'<circle cx="{f(x)}" cy="{f(arm_y)}" r="9" fill="none" stroke-opacity=".85"/>',
        line(x + 8, arm_y, arm_x, arm_y),
        f'<circle cx="{f(arm_x)}" cy="{f(arm_y)}" r="7" fill="none" stroke-opacity=".7"/>',
        # the flag, hanging from the arm's end
        rect(arm_x - 62, arm_y + 7, arm_x + 14, arm_y + 128),
        line(arm_x - 62, arm_y + 7, arm_x + 14, arm_y + 128, '.35'),
    ]


def monitor(cx, top, w=180, h=116):
    """The record you answer to, standing ON the apple boxes.

    A MONITOR ON A STACK OF BOXES IS NOT A COMPROMISE, it is what a small
    unit actually does, and it is the one arrangement that fits a screen,
    a stand and a set into 282 units of margin. The bezel line is what
    makes it a monitor rather than a window."""
    return [
        rect(cx - w / 2, top, cx + w / 2, top + h),
        rect(cx - w / 2 + 11, top + 11, cx + w / 2 - 11, top + h - 11, '.45'),
        # the little stand foot it sits on, resting on the top box
        line(cx - 26, top + h, cx - 20, top + h + 14, '.7'),
        line(cx + 26, top + h, cx + 20, top + h + 14, '.7'),
        line(cx - 30, top + h + 14, cx + 30, top + h + 14, '.8'),
    ]


def apple_boxes(x, w=116, n=2):
    """Two boxes, stacked and not quite square to each other, standing
    behind the track. The hand hole is the detail that makes them apple
    boxes and not crates."""
    out = []
    y = RAIL_FAR - 2
    for i in range(n):
        h = 42 - i * 3
        ww = w - i * 8
        off = i * 7
        out.append(rect(x + off, y - h, x + off + ww, y))
        out.append(line(x + off + ww * 0.36, y - h * 0.52,
                        x + off + ww * 0.64, y - h * 0.52, '.55'))
        y -= h
    return out


def cable(x1, y1, x2):
    """One cable running off the right edge. The single curve in a drawing
    of straight kit, which is what stops the right margin reading as a
    diagram."""
    return [f'<path d="M{f(x1)} {f(y1)} C{f(x1 + 70)} {f(y1 + 18)} {f(x2 - 90)} {f(y1 - 14)} '
            f'{f(x2)} {f(y1 + 6)}" fill="none" stroke-opacity=".45"/>']


def build():
    parts = []
    parts += track()

    # THE WHOLE SET IS IN THE LEFT MARGIN, for the reason measured in the
    # docstring: this course's rail covers the right of the drawing at
    # every scroll position.
    #
    # The boxes stand behind the track, the monitor stands on the boxes,
    # and one cable runs off the left edge. c_stand() below is NOT called
    # and is kept deliberately: it is a finished drawing of a flag on a
    # stand, and the day this course's rail gets shorter it belongs in
    # the margin that is free again.
    parts += apple_boxes(84)
    parts += monitor(142, 562)
    parts += cable(96, RAIL_FAR - 6, -40)

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
    print(f'make_screen_ground: wrote {OUT.relative_to(ROOT)}, {len(svg):,} bytes')
