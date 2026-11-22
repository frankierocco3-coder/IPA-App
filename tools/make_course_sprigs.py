#!/usr/bin/env python3
"""Draw the five remaining courses' ornaments, and write them to img/ui/.

WHY THIS EXISTS
---------------
`SPRIG` in js/main.js resolves `COURSE_SPRIG[workspace]` and falls back to
`cm-l01-sprig` for everything it does not find. Until now that table held
TWO entries, Rhetoric's laurel and Building a Character's plumb, so
Acting, Shakespeare, Musical Theatre, Screen Acting and Theatre History
all decorated their section headings, sage panel corners and concept
cards with

    img/lessons/commedia/l01-sprig.png

a leaf spray cropped from the owner's commedia rendering. js/main.js:4795
states the house rule out loud, that pulling one course's artwork onto
another course's page is not a thing this project does, and the ornament
was quietly breaking it on five courses. tools/make_rhetoric_sprig.py and
tools/make_character_sprig.py were written for exactly this reason and say
so; this is the same fix, finishing the table.

WHY ONE SCRIPT AND NOT FIVE
---------------------------
Because the five have to read as ONE HAND. Rhetoric's laurel and the
plumb each got their own file and each is a different subject's object;
these five ship together and are seen together as a learner moves between
courses, so the stroke weights, the opacities and the trick of hinting the
ground with one faint mark all live in one place where they cannot drift.
Five files would have five copies of the plumbing and no shared eye.

WHAT EACH ONE IS, AND WHY THAT OBJECT
-------------------------------------
Every choice is read out of the course's own `<COURSE>_PRINCIPLE`, which
is the owner's one sentence saying what the course argues. Nothing here
was invented to look nice.

  acting      TWO CHAIRS, TURNED TOWARDS EACH OTHER. The principle says
              behaviour arises from the situation, the want inside it and
              how the situation serves the story. The situation is the
              irreducible unit, and two chairs set facing is what a
              situation looks like before anybody is in it.
              NOT the same as the chairs in the Learn ground, which are a
              ROW at rest along the right margin: a row is a theatre
              waiting, a facing pair is a scene about to happen.

  shakespeare THE IAMB: a breve, a stress, and the two syllables under
              them. The principle says the verse is not a constraint on
              the acting but information about the acting, written down.
              This is that information, in the notation the course
              teaches, and it is the one mark no other course here owns.

  musical     A TIE. Two notes joined so they sound as one. The principle
              says a number is not a break from the acting but the same
              dramatic life carried by other means, and a tie is the only
              object in music that means exactly `this does not stop
              here`.

  screen      THE TRIPOD, with a camera on it. The principle says the
              camera is not an audience you reach, it is a record you
              answer to, and that every take should be repeatable. The
              course's own first module puts a phone on a tripod in the
              learner's room; the sticks are what makes the second take
              match the first.

  theatre     A CAIRN. The principle opens by saying theatre has no agreed
              first moment and no single tradition, and asks the learner
              to walk the history for what each form left behind that is
              still usable. A cairn is a pile of exactly that: no first
              stone, no single builder, left by everyone who walked it.
              The bottom stone is CROPPED by the box on purpose, so the
              drawing has no visible beginning either.
              The ghost light would have been the obvious theatre object
              and it is NOT available: tools/make_acting_ground.py already
              stands one in Acting's left margin, and the same object in
              two courses blurs both marks.
              AND IT IS THE ONE OF THE FIVE THAT DOES NOT SHOW YET. See
              the note beside `th-cairn` in js/main.js: that course takes
              the pre-scene lesson layout, which renders no ornament of
              any kind, so the cairn is registered and waiting rather than
              live. It is drawn anyway because the alternative is drawing
              it later in a different sitting from the other four, and
              these five only work if one hand made them in one go.

SAME IDIOM AS THE LAUREL AND THE PLUMB, which is the same hand as the
Learn grounds one size down: a single ink per course, a thin stroke, and
filled wherever a shape is too small to read as an outline. At the 46px
these render beside a heading, an outlined shape 5px across is a scribble
and a filled one is an object.

THE INK IS THE MATERIAL, NOT THE COURSE'S TINT. Laurel is olive because it
is foliage and the plumb is brown because it is a wooden tool. Chairs are
the wood of Acting's own ground, the two notations are ink on paper, the
tripod is a warm graphite and the cairn is stone.

EVERYTHING IS DRAWN AT ABOUT 1.65x THE SIZE IT IS READ AT. The box is 76
wide and the CSS shows it at 46, so a detail under about 3 units in here
does not survive to the page. That is why none of the five has more than
about five parts.

THE SAME HOUSE RULES THE GROUNDS AND THE OTHER TWO SPRIGS KEEP
--------------------------------------------------------------
* No `-` twice in a row anywhere in the output. A double hyphen inside an
  SVG comment is not well formed XML and the file fails to parse SILENTLY
  as a broken image. This writes no SVG comments at all.
* The root carries `width` and `height`, not only a `viewBox`. An <img>
  given a viewBox alone has no intrinsic size and draws nothing.
* NO SYMMETRICAL FULL WIDTH BARS. The plumb's first draft hung from a
  batten spanning the whole box and it read as a rule or a UI divider
  rather than as an ornament. Every one of these five carries its weight
  off centre and leans, the way the laurel does.
* Edit this script and re-run it. Never edit the SVG.

    python3 tools/make_course_sprigs.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships
nowhere; only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'ui'

# EXACTLY THE RASTER'S BOX, 76 x 49, on all five. The CSS that places
# `.lxc-sprig` needs no change at all, which is the whole reason for
# matching it.
W, H = 76, 49


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def line(x1, y1, x2, y2, t, ink, op=None):
    o = f' stroke-opacity="{op}"' if op is not None else ''
    return (f'<path d="M{f(x1)} {f(y1)} L{f(x2)} {f(y2)}" fill="none" '
            f'stroke="{ink}" stroke-width="{f(t)}" stroke-linecap="round"{o}/>')


def arc(x1, y1, cx, cy, x2, y2, t, ink, op=None):
    o = f' stroke-opacity="{op}"' if op is not None else ''
    return (f'<path d="M{f(x1)} {f(y1)} Q{f(cx)} {f(cy)} {f(x2)} {f(y2)}" '
            f'fill="none" stroke="{ink}" stroke-width="{f(t)}" '
            f'stroke-linecap="round"{o}/>')


def ground_tick(x, y, w, ink):
    """THE ONE FAINT MARK. Each of these five says where its floor is with
    a single short, pale stroke, the way the plumb says where it has swung
    to. It is what stops an object reading as cut out and floating, and it
    is deliberately never long enough to become a rule across the box."""
    return line(x, y, x + w, y, 1.6, ink, op='.45')


# ── ACTING ────────────────────────────────────────────────────────────
ACTING_INK = '#7b6f57'      # the wood of its own Learn ground


def chair(x, y, s, face, ink):
    """One chair in profile, its back post at (x, y) and its seat running
    away in the direction `face`. Four strokes and no more: at 46px a top
    rail and a stretcher close up into a smudge, and the silhouette of a
    back, a seat and two legs is already unmistakably a chair.

    THE BACK HAS TO BE TALLER THAN THE SEAT IS HIGH, and in the first
    draft it was not. Back 17 against a 13 leg drew something the eye read
    as a STOOL WITH A LIP: at shipping size the pair came out as two faint
    brackets with a gap between them, carrying about a third of the
    laurel's ink. A back half again the leg is what makes four strokes
    read as a chair.

    THE BACK RAKES. Drawn dead vertical it reads as a right angled glyph
    rather than as furniture."""
    seat = 20 * s
    back = 22 * s
    leg = 14 * s
    return [
        # the seat
        line(x, y - leg, x + seat * face, y - leg, 2.4 * s, ink),
        # the back post, raked away from the seat
        line(x, y - leg, x - 2.0 * s * face, y - leg - back, 2.4 * s, ink),
        # the two legs
        line(x + 1.3 * s * face, y - leg, x + 0.4 * s * face, y, 2.2 * s, ink),
        line(x + (seat - 2.4 * s) * face, y - leg,
             x + (seat - 1.0 * s) * face, y, 2.2 * s, ink),
    ]


def acting():
    """TWO CHAIRS ACROSS A GAP, one nearer than the other.

    The near chair is bigger and stands lower in the box, which is the
    whole composition: equal chairs side by side read as a furniture
    catalogue, and a pair in depth reads as a room with a scene set in
    it. The empty space between the seats is the subject.

    THEY STAND CLOSE. Pushed to the two ends of the box they read as two
    separate glyphs with nothing in between; about eight screen px apart
    they read as one mark with a gap in it, which is the thing being
    drawn."""
    parts = []
    parts += chair(14.0, 33.0, 0.8, +1, ACTING_INK)       # the far chair
    parts += chair(64.0, 46.0, 1.0, -1, ACTING_INK)       # the near chair
    parts.append(ground_tick(11.0, 33.9, 21, ACTING_INK))
    parts.append(ground_tick(42.5, 46.9, 24, ACTING_INK))
    return parts


# ── SHAKESPEARE ───────────────────────────────────────────────────────
SHAKESPEARE_INK = '#5a6b46'   # ink on paper, between the brand ink and the vine


def shakespeare():
    """THE IAMB. A breve over the light syllable, a stress over the heavy
    one, and a pale tick under each to stand for the syllable itself.

    FIVE FEET WOULD HAVE BEEN THE HONEST PENTAMETER AND IT DOES NOT FIT.
    Measured: five feet across 68 usable units is 13.6 units a foot, which
    is 8 screen px, which is a 3px mark. The house rule above says a 5px
    outline is a scribble. One foot drawn large says the same thing in the
    same notation and survives the reduction, so the drawing is the UNIT
    rather than the line.

    THE STRESS IS A TAPERED PEN STROKE, not a bar of even width. The whole
    point of the principle is that this was WRITTEN DOWN by somebody, and
    a mark that thins as it lifts is a mark somebody made."""
    parts = [
        # the breve: an upward opening arc, pen weight, over the light one
        arc(13, 16.5, 23.5, 33.0, 34, 16.5, 3.7, SHAKESPEARE_INK),
        # the stress: a filled slash, heavy at the foot and lifting away
        f'<path d="M44.5 31.8 C46.2 27.4 54.6 15.2 61.6 11.4 '
        f'L63.4 14.2 C57.2 18.8 49.6 29.4 47.8 33.4 Z"/>',
        ground_tick(14, 41, 20, SHAKESPEARE_INK),
        ground_tick(45.5, 41, 18, SHAKESPEARE_INK),
    ]
    return parts


# ── MUSICAL THEATRE ───────────────────────────────────────────────────
MUSICAL_INK = '#8a6d3b'       # a warm brass gold, the pit and the footlights


def notehead(cx, cy):
    """A filled oval, tilted the way a notehead is tilted. Filled for the
    reason in the docstring at the top: at 46px an outlined one is a
    ring."""
    return (f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="6.4" ry="4.6" '
            f'transform="rotate(-20 {f(cx)} {f(cy)})"/>')


def musical():
    """A TIE: two notes joined so they sound as one.

    THE TIE ARCS AWAY FROM THE STEMS, which is both what notation does and
    what keeps the drawing open. On the same side it closes into a lens
    shape and the pair reads as one blob with a line through it.

    The second note sits higher than the first, so the gesture rises. Two
    notes at the same height read as a diagram of an interval."""
    n1x, n1y = 20.0, 31.0
    n2x, n2y = 55.0, 24.0
    parts = [
        notehead(n1x, n1y),
        notehead(n2x, n2y),
        # the stems, up from the right of each head
        line(n1x + 5.7, n1y - 2.2, n1x + 5.7, 11.5, 2.1, MUSICAL_INK),
        line(n2x + 5.7, n2y - 2.2, n2x + 5.7, 5.0, 2.1, MUSICAL_INK),
        # the tie, under both heads
        arc(n1x - 4.5, n1y + 6.0, (n1x + n2x) / 2, 47.0,
            n2x + 4.0, n2y + 6.5, 2.2, MUSICAL_INK, op='.9'),
    ]
    return parts


# ── SCREEN ACTING ─────────────────────────────────────────────────────
SCREEN_INK = '#6f6a5c'        # a warm graphite: it is kit, not foliage


def screen():
    """A PHONE ON A TRIPOD, which is the kit the course's own first module
    asks the learner to set up, and the reason a second take can match the
    first.

    THREE LEGS, NOT TWO. Two is a stepladder and three is a tripod, and
    the one that goes back has to be drawn SHORTER and landing higher or
    it reads as a fourth leg on a flat row.

    THE PAN HANDLE IS LOAD BEARING. Without it the silhouette is a music
    stand; with it, it is a head you can move. It is one stroke."""
    ax, ay = 37.0, 20.0                     # the apex, where the legs meet
    parts = [
        line(ax, ay, 11.5, 46.5, 2.8, SCREEN_INK),      # front left
        line(ax, ay, 62.5, 46.5, 2.8, SCREEN_INK),      # front right
        line(ax, ay, 40.5, 40.0, 2.4, SCREEN_INK),      # the back leg
        # the head, and the phone standing on it
        f'<rect x="{f(ax - 11)}" y="9" width="22" height="9.4" rx="2.2"/>',
        f'<rect x="{f(ax - 3.2)}" y="4.4" width="6.4" height="5" rx="1.2" '
        f'fill-opacity=".72"/>',
        line(ax + 10, 17.5, ax + 19, 24.0, 1.9, SCREEN_INK, op='.85'),
        ground_tick(8.5, 47.4, 10, SCREEN_INK),
        ground_tick(58.5, 47.4, 10, SCREEN_INK),
    ]
    return parts


# ── THEATRE HISTORY ───────────────────────────────────────────────────
THEATRE_INK = '#78736a'       # stone


def stone(cx, cy, w, h, lean, jitter):
    """One stone: a closed four point path with cubic sides, so no edge is
    straight and no two stones are the same shape.

    `jitter` is four fixed numbers, never random. The output of this
    script has to be byte identical on every run or the repo churns and
    nobody can tell a real change from a redraw."""
    hw, hh = w / 2, h / 2
    a, b, c, d = jitter
    return (f'<path d="M{f(cx - hw)} {f(cy + a)} '
            f'C{f(cx - hw * 0.72)} {f(cy - hh - b)} {f(cx + hw * 0.52)} {f(cy - hh - c)} '
            f'{f(cx + hw + lean)} {f(cy - d)} '
            f'C{f(cx + hw * 0.86)} {f(cy + hh * 0.92)} {f(cx - hw * 0.58)} {f(cy + hh)} '
            f'{f(cx - hw)} {f(cy + a)} Z"/>')


def theatre():
    """A CAIRN, AND NO BOTTOM STONE.

    The base runs out through the floor of the box, so the stack has no
    visible beginning: the principle's first clause is that theatre has no
    agreed first moment, and a cairn drawn complete would contradict it in
    the one place a reader looks first.

    IT LEANS RIGHT AS IT RISES and the stones shrink, which is what makes
    four filled lumps read as a stack built over time rather than as a bar
    chart. The pale path at the right is the walk the principle asks for;
    it leaves the box, like the base."""
    parts = [
        # the base, cropped by the box: cy is low enough that its lower
        # edge is outside the viewBox entirely.
        stone(25.0, 44.0, 36.0, 13.0, 1.4, (1.1, 0.9, 1.6, 0.6)),
        stone(27.0, 34.2, 30.0, 10.4, 1.1, (0.8, 1.4, 0.7, 1.2)),
        stone(30.0, 26.0, 23.0, 8.6, 0.9, (0.6, 0.8, 1.3, 0.5)),
        stone(33.5, 19.2, 15.6, 7.0, 0.7, (0.5, 1.0, 0.6, 0.9)),
        # the path, leaving to the right
        arc(47.0, 46.0, 62.0, 44.0, 74.0, 37.5, 1.7, THEATRE_INK, op='.45'),
    ]
    return parts


# ── BUILD ─────────────────────────────────────────────────────────────

SPRIGS = (
    ('acting-sprig', acting, ACTING_INK),
    ('shakespeare-sprig', shakespeare, SHAKESPEARE_INK),
    ('musical-sprig', musical, MUSICAL_INK),
    ('screen-sprig', screen, SCREEN_INK),
    ('theatre-sprig', theatre, THEATRE_INK),
)


def build(parts, ink):
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'width="{W}" height="{H}" fill="{ink}">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


if __name__ == '__main__':
    for name, fn, ink in SPRIGS:
        svg = build(fn(), ink)
        assert '--' not in svg, 'a double hyphen would break the XML parse'
        assert 'width=' in svg.split('>')[0], 'the root needs an intrinsic size'
        (OUT / f'{name}.svg').write_text(svg)
        print(f'make_course_sprigs: wrote img/ui/{name}.svg, {len(svg):,} bytes')
