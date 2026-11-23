#!/usr/bin/env python3
"""Draw the five Tempo-Rhythm diagrams, and write them to img/lessons/.

WHY THESE ARE DRAWN AND NOT PAINTED
-----------------------------------
Owner order, 2026-11-22: expand the Tempo-Rhythm module and "throw in some
diagrams". These five are DIAGRAMS, not pictures: a grid of four states, two
pulse tracks against each other, an interval between two lines, a line of
verse with its stresses marked, a spectrum with two ends missing. Every one
of them is geometry and type, so it is code, and it is not part of the
artwork Frankie paints. The same rule the Learn grounds and the course
sprigs follow.

A diagram also has to be READ, which is the one way these differ from the
ornaments: they carry text, they sit at full width in the content column
rather than at 46px beside a heading, and they are drawn at full ink rather
than at the half opacity of a watermark.

WHAT EACH ONE SAYS, AND WHY IT EXISTS
-------------------------------------
  rhythm-dials      The lesson's own claim, which is hard to hold in words
                    alone: tempo and rhythm are separate controls, so there
                    are FOUR states and not a single scale from slow to
                    fast. The grid is the argument.
  rhythm-two        Outside even and held, inside fast and crowded, on the
                    same stretch of time. The owner asked for people on the
                    outside versus the inside; this draws the two tracks
                    against one body so the gap between them is a measurable
                    distance rather than a metaphor.
  rhythm-harmony    Unison beside harmony. Two tracks landing on the same
                    marks, then two tracks landing differently, with the
                    intervals drawn in the space between, because the
                    lesson's point is that nobody plays the interval.
  rhythm-rests      Notes and rests, on a real line of pentameter, with the
                    count running under the silence. The owner asked for
                    iambic pentameter or musical dynamics as the example;
                    verse wins because this course already teaches it.
  rhythm-speeds     The spectrum with its two ends missing, and under it the
                    difference between true slow and stretched slow, true
                    fast and rushed.

HOUSE RULES, THE SAME ONES EVERY GENERATOR IN HERE KEEPS
---------------------------------------------------------
* No `-` twice in a row anywhere in the output. A double hyphen inside an
  SVG comment is not well formed XML and the file fails to parse SILENTLY
  as a broken image. This writes no SVG comments at all.
* The root carries `width` and `height`, not only a `viewBox`. With a
  viewBox alone the browser uses the default replaced box, 267x150.
* Fonts are GENERIC FAMILIES ONLY. An SVG loaded through <img> cannot
  fetch a webfont, so naming the app's Iowan Old Style here would silently
  fall back anyway. Georgia and the generic serif are named in that order
  because the app's own stack does the same.
* Text is drawn as text, not as paths. It stays selectable, scalable and
  legible to a screen reader that opens the file directly, and the figure
  carries real alt text in js/data/acting/art.js regardless.
* Edit this script and re-run it. Never edit the SVG.

    python3 tools/make_rhythm_diagrams.py

It is OFFLINE TOOLING. Nothing in the app imports it and it ships nowhere;
only its output does.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'img' / 'lessons'

INK = '#3f4a38'          # the page ink, a shade warmer
SOFT = '#7b8470'         # supporting rule and axis
SAGE = '#6f8056'         # the steady, the held, the expected
RUST = '#b45c42'         # the pressure, the broken, the missing
GOLD = '#b08a35'         # the thing being pointed at
SERIF = "Georgia, serif"


def f(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.')


def text(x, y, s, size=26, fill=INK, anchor='start', weight='normal',
         spacing=None, style=None):
    sp = f' letter-spacing="{spacing}"' if spacing else ''
    st = f' font-style="{style}"' if style else ''
    return (f'<text x="{f(x)}" y="{f(y)}" font-family="{SERIF}" '
            f'font-size="{f(size)}" fill="{fill}" text-anchor="{anchor}" '
            f'font-weight="{weight}"{sp}{st}>{s}</text>')


def line(x1, y1, x2, y2, c=SOFT, w=1.6, op=None, cap='round'):
    o = f' stroke-opacity="{op}"' if op else ''
    return (f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" '
            f'stroke="{c}" stroke-width="{f(w)}" stroke-linecap="{cap}"{o}/>')


def bar(x, y, w, h, c=INK, r=2):
    """One sounding mark. Width is duration, which is the whole notation
    these diagrams use: a long bar is a long sound, a gap is silence."""
    return (f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" '
            f'rx="{f(r)}" fill="{c}"/>')


def track(x, y, marks, h=18, c=INK, unit=1.0):
    """A row of sounding marks from (duration, gap) pairs, in units."""
    out, cx = [], x
    for dur, gap in marks:
        out.append(bar(cx, y, dur * unit, h, c))
        cx += (dur + gap) * unit
    return out, cx


def fit(marks, width):
    """The unit that makes a run of marks end exactly at `width`.

    THE FIRST PASS PASSED A FIXED UNIT AND THE STRIPS RAN OUT OF THEIR
    CELLS. Thirteen fast marks at ten pixels is 130 units of drawing in a
    390 pixel box only if you do the arithmetic, and the fast cells did
    not. Every strip is fitted now, so adding or removing a mark cannot
    break the layout."""
    total = sum(d + g for d, g in marks)
    last_gap = marks[-1][1]
    return width / (total - last_gap) if total > last_gap else width / total


def wrap(s, cols):
    """Break on SPACES, not on a character count.

    The first pass sliced captions at a fixed index and produced lines
    reading `somebod` and `y choosing every word`, which is the kind of
    thing that looks like a rendering bug in a shipped figure."""
    words, lines, cur = s.split(), [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if len(trial) <= cols:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def block(x, y, s, cols, size=21, fill=SOFT, leading=27, style=None):
    """Wrapped text as a run of <text> lines."""
    return [text(x, y + i * leading, ln, size, fill, style=style)
            for i, ln in enumerate(wrap(s, cols))]


def svg(w, h, parts):
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" fill="none">')
    return head + '\n' + '\n'.join(parts) + '\n</svg>\n'


# ── 1. TWO DIALS, FOUR STATES ────────────────────────────────────────
def dials():
    """FOUR CELLS, BECAUSE THE WHOLE LESSON IS THAT THERE ARE FOUR.
    Drawn as a 2x2 rather than as two sliders side by side: sliders imply
    one scale read twice, and a grid is the only shape that says these
    combine."""
    W, H = 1200, 780
    x0, y0, cw, ch = 300, 150, 420, 240
    parts = []

    parts.append(text(60, 70, 'Two dials, four states', 38, INK, weight='600'))
    parts.append(text(60, 108, 'Tempo is how fast. Rhythm is the pattern inside the speed.',
                      25, SOFT, style='italic'))

    # the axes
    parts.append(line(x0 - 34, y0, x0 - 34, y0 + ch * 2, SOFT, 1.4))
    parts.append(line(x0, y0 + ch * 2 + 34, x0 + cw * 2, y0 + ch * 2 + 34, SOFT, 1.4))
    parts.append(text(x0 + cw, y0 + ch * 2 + 76, 'TEMPO', 22, SOFT, 'middle', spacing='3'))
    parts.append(text(x0 - 70, y0 + ch, 'RHYTHM', 22, SOFT, 'middle', spacing='3')
                 .replace('<text ', f'<text transform="rotate(270 {f(x0 - 70)} {f(y0 + ch)})" '))
    parts.append(text(x0 + cw * 0.5, y0 + ch * 2 + 70, 'slow', 23, SOFT, 'middle'))
    parts.append(text(x0 + cw * 1.5, y0 + ch * 2 + 70, 'fast', 23, SOFT, 'middle'))
    parts.append(text(x0 - 52, y0 + ch * 0.5, 'even', 23, SOFT, 'end'))
    parts.append(text(x0 - 52, y0 + ch * 1.5, 'broken', 23, SOFT, 'end'))

    # the four cells. (duration, gap) pairs, in units of 1 unit = 10px.
    cells = [
        (0, 0, 'Slow and even', [(5, 4)] * 5, SAGE,
         'A held, regular line. Ceremony, grief, somebody choosing every word.'),
        (1, 0, 'Fast and even', [(2, 1.6)] * 13, SAGE,
         'Quick and regular. Patter, briskness, a mind that has already decided.'),
        (0, 1, 'Slow and broken', [(6, 3), (1.5, 7), (4, 2), (1, 9), (5, 3)], RUST,
         'Slow overall, lurching inside it. Somebody working something out as they speak.'),
        (1, 1, 'Fast and broken', [(1, 1), (3, 0.8), (0.8, 3), (2.4, 0.8), (0.8, 0.8),
                                   (3.4, 2.6), (1, 0.8), (2, 1)], RUST,
         'Quick and jagged. Panic, interruption, somebody losing the thread.'),
    ]
    for cx, cy, title, marks, colour, note in cells:
        gx, gy = x0 + cx * cw, y0 + cy * ch
        parts.append(f'<rect x="{f(gx)}" y="{f(gy)}" width="{f(cw - 30)}" '
                     f'height="{f(ch - 30)}" rx="10" fill="none" stroke="{SOFT}" '
                     f'stroke-width="1.2" stroke-opacity=".5"/>')
        parts.append(text(gx + 26, gy + 48, title, 27, INK, weight='600'))
        strip, _ = track(gx + 26, gy + 78, marks, h=30, c=colour,
                         unit=fit(marks, cw - 82))
        parts += strip
        parts += block(gx + 26, gy + 152, note, 40)

    parts += block(60, H - 56,
                   'Wrong tempo, change the speed. Wrong rhythm, and changing the speed '
                   'only carries the same pattern along faster.', 86, size=23, fill=INK)
    return W, H, parts


# ── 2. TWO RHYTHMS AT ONCE ───────────────────────────────────────────
def two_rhythms():
    """THE SAME STRETCH OF TIME, TWICE. Both tracks start and end on the
    same verticals, because the claim is not that the inside is longer, it
    is that the inside is BUSIER over an identical span."""
    W, H = 1200, 700
    parts = []
    parts.append(text(60, 70, 'Two rhythms at once', 38, INK, weight='600'))
    parts.append(text(60, 108, 'One person, one stretch of time, two rhythms running in it.',
                      25, SOFT, style='italic'))

    left, right = 330, 1140
    y_out, y_in = 230, 450

    # a plain standing figure, so the two tracks belong to a body
    fx, fy = 150, 420
    parts.append(f'<circle cx="{f(fx)}" cy="{f(fy - 150)}" r="26" fill="none" '
                 f'stroke="{INK}" stroke-width="2.4"/>')
    parts.append(line(fx, fy - 122, fx, fy - 20, INK, 2.4))
    parts.append(line(fx, fy - 96, fx - 34, fy - 44, INK, 2.4))
    parts.append(line(fx, fy - 96, fx + 34, fy - 44, INK, 2.4))
    parts.append(line(fx, fy - 20, fx - 26, fy + 60, INK, 2.4))
    parts.append(line(fx, fy - 20, fx + 26, fy + 60, INK, 2.4))

    for y, label, sub, marks, colour in (
        (y_out, 'OUTSIDE', 'what the room can see', [(7, 9)] * 7, SAGE),
        (y_in, 'INSIDE', 'what is actually happening', [(1.2, 1)] * 29, RUST),
    ):
        parts.append(text(left, y - 44, label, 24, colour, spacing='3', weight='600'))
        parts.append(text(left + 150, y - 44, sub, 23, SOFT, style='italic'))
        parts.append(line(left, y + 48, right, y + 48, SOFT, 1.2, op='.6'))
        strip, _ = track(left, y, marks, h=34, c=colour, unit=fit(marks, right - left))
        parts += strip

    # the gap, marked as a distance rather than described
    bx = right + 0
    parts.append(line(left - 26, y_out + 20, left - 26, y_in + 20, GOLD, 2, cap='butt'))
    parts.append(line(left - 34, y_out + 20, left - 18, y_out + 20, GOLD, 2))
    parts.append(line(left - 34, y_in + 20, left - 18, y_in + 20, GOLD, 2))
    parts.append(text(left - 46, (y_out + y_in) / 2 + 26, 'the gap', 23, GOLD, 'end'))

    parts.append(text(60, H - 96,
                      'The audience is reading the distance between the two lines, not '
                      'either line on its own.', 25, INK))
    parts.append(text(60, H - 54,
                      'Clamp the outside harder and the inside runs faster. That loop is '
                      'the thing to play, not to solve.', 23, SOFT))
    return W, H, parts


# ── 3. HARMONY, NOT UNISON ───────────────────────────────────────────
def harmony():
    """TWO PANELS, AND THE INTERVALS DRAWN. The lesson says nobody plays
    the interval, so the interval has to be visible and attributable to
    neither track: it is the gold tie between them, touching both and
    belonging to neither."""
    W, H = 1200, 660
    parts = []
    parts.append(text(60, 70, 'Harmony, not unison', 38, INK, weight='600'))
    parts.append(text(60, 108, 'Two people in a scene are two lines sounding at once.',
                      25, SOFT, style='italic'))

    panels = [
        (70, 'UNISON', 'one note, louder',
         [(4, 5)] * 7, [(4, 5)] * 7, False),
        (640, 'HARMONY', 'two lines, and the intervals between them',
         [(4, 5)] * 7, [(2.6, 2.4), (6, 3), (3, 6.4), (5, 2), (1.6, 5), (7, 2), (2, 3)], True),
    ]
    for px, title, sub, top, bottom, show_gap in panels:
        pw = 490
        parts.append(f'<rect x="{f(px)}" y="150" width="{f(pw)}" height="340" rx="12" '
                     f'fill="none" stroke="{SOFT}" stroke-width="1.2" stroke-opacity=".5"/>')
        parts.append(text(px + 26, 196, title, 24, INK, spacing='3', weight='600'))
        parts.append(text(px + 26, 228, sub, 21, SOFT, style='italic'))
        unit = min(fit(top, pw - 56), fit(bottom, pw - 56))
        a, _ = track(px + 28, 274, top, h=28, c=SAGE, unit=unit)
        b, _ = track(px + 28, 392, bottom, h=28, c=RUST if show_gap else SAGE, unit=unit)
        parts += a + b
        parts.append(text(px + 28, 262, 'A', 20, SOFT))
        parts.append(text(px + 28, 380, 'B', 20, SOFT))
        if show_gap:
            cx = px + 28
            for dur, gap in bottom[:5]:
                parts.append(line(cx + dur * unit / 2, 306, cx + dur * unit / 2, 388,
                                  GOLD, 1.6, op='.75'))
                cx += (dur + gap) * unit
            parts.append(text(px + pw - 26, 466, 'the intervals, which neither actor plays',
                              20, GOLD, 'end'))
        else:
            parts.append(text(px + pw - 26, 466, 'nothing between them to hear',
                              20, SOFT, 'end'))

    parts.append(text(60, H - 92,
                      'Two players on the same note are not making a chord. They are '
                      'making one note louder.', 25, INK))
    parts.append(text(60, H - 50,
                      'What to fear is accidental unison: a scene rehearsed until '
                      'everybody has drifted onto one polite shared pace.', 23, SOFT))
    return W, H, parts


# ── 4. NOTES AND RESTS ───────────────────────────────────────────────
def rests():
    """A REAL LINE, NOT A ROW OF BEATS. The count under the silence is the
    whole point of the lesson, so it runs visibly past the end of the
    sounding marks and through the rest."""
    W, H = 1200, 720
    parts = []
    parts.append(text(60, 70, 'Notes and rests', 38, INK, weight='600'))
    parts.append(text(60, 108,
                      'Syllables are the notes. Pauses are the rests. A rest is written '
                      'into the music.', 25, SOFT, style='italic'))

    syll = [('But', 0), ('soft,', 1), ('what', 0), ('light', 1), ('through', 0),
            ('yon', 1), ('der', 0), ('win', 1), ('dow', 0), ('breaks', 1)]
    x = 110
    step = 86
    base = 300
    parts.append(line(90, base + 54, 1110, base + 54, SOFT, 1.4))
    for i, (word, stress) in enumerate(syll):
        cx = x + i * step
        r = 17 if stress else 10
        parts.append(f'<ellipse cx="{f(cx)}" cy="{f(base)}" rx="{f(r * 1.25)}" '
                     f'ry="{f(r)}" fill="{SAGE if stress else SOFT}" '
                     f'transform="rotate(-20 {f(cx)} {f(base)})"/>')
        if stress:
            parts.append(line(cx + r * 1.2, base - 4, cx + r * 1.2, base - 64, SAGE, 2.4))
        parts.append(text(cx, base + 96, word, 25, INK, 'middle'))
        parts.append(text(cx, base - 92, 'DUM' if stress else 'da', 19,
                          SAGE if stress else SOFT, 'middle', spacing='1'))

    # the rest, and the count that keeps running under it
    rx = x + 10 * step - 20
    parts.append(f'<rect x="{f(rx + 26)}" y="{f(base - 26)}" width="52" height="16" '
                 f'rx="3" fill="{RUST}"/>')
    parts.append(f'<rect x="{f(rx + 26)}" y="{f(base + 2)}" width="52" height="16" '
                 f'rx="3" fill="{RUST}" fill-opacity=".45"/>')
    parts.append(text(rx + 52, base + 96, 'rest', 25, RUST, 'middle'))

    # THE COUNT IS IN FEET, NOT IN SYLLABLES, and the first pass got this
    # wrong: it numbered 1 to 5 twice across the ten syllables, which is
    # two bars of five and is not what a pentameter line is. Five feet,
    # one beat each, the beat landing on the stress. Then the count walks
    # on through the rest, which is the entire point being illustrated.
    parts.append(line(90, base + 170, 1110, base + 170, SOFT, 1.2, op='.7'))
    for beat in range(7):
        cx = x + (beat * 2 + 1) * step
        sounded = beat < 5
        parts.append(line(cx, base + 160, cx, base + 180, SOFT if sounded else RUST, 1.4))
        parts.append(text(cx, base + 212, str(beat + 1), 23,
                          SOFT if sounded else RUST, 'middle'))
    parts.append(text(90, base + 258,
                      'the count, in feet, which does not stop where the sound does',
                      22, SOFT, style='italic'))

    parts.append(text(60, H - 46,
                      'Five of these in a row is a line of pentameter. The rest at the '
                      'end is still in the bar.', 25, INK))
    return W, H, parts


# ── 5. THE TWO MISSING SPEEDS ────────────────────────────────────────
def speeds():
    """THE SPECTRUM FIRST, THEN WHAT GOES WRONG AT EACH END. The shaded
    middle is deliberately wide: the lesson's claim is that almost all
    stage speech lives in it, and a narrow band would make the problem
    look rarer than it is."""
    W, H = 1200, 800
    parts = []
    parts.append(text(60, 70, 'The two missing speeds', 38, INK, weight='600'))
    parts.append(text(60, 108,
                      'Most stage speech lives in the middle. The two ends have to be built.',
                      25, SOFT, style='italic'))

    bx, by, bw = 90, 180, 1020
    parts.append(f'<rect x="{f(bx)}" y="{f(by)}" width="{f(bw)}" height="54" rx="8" '
                 f'fill="none" stroke="{SOFT}" stroke-width="1.4"/>')
    parts.append(f'<rect x="{f(bx + bw * 0.28)}" y="{f(by)}" width="{f(bw * 0.44)}" '
                 f'height="54" rx="8" fill="{SAGE}" fill-opacity=".28"/>')
    parts.append(text(bx + bw * 0.5, by + 36, 'where almost all stage speech sits',
                      23, INK, 'middle'))
    parts.append(text(bx + bw * 0.14, by + 36, 'missing', 23, RUST, 'middle', spacing='2'))
    parts.append(text(bx + bw * 0.86, by + 36, 'missing', 23, RUST, 'middle', spacing='2'))
    parts.append(text(bx, by + 92, 'TRUE SLOW', 21, SOFT, spacing='2'))
    parts.append(text(bx + bw, by + 92, 'TRUE FAST', 21, SOFT, 'end', spacing='2'))

    # THE NOTE SITS UNDER ITS LABEL, NOT BESIDE IT. In the first pass the
    # italic ran from x 320 and the strips began at x 730, so the longest
    # note ran straight through the first bar of its own strip. The left
    # column is fixed now and the strips start clear of it, which also
    # means a longer note can only ever push downward.
    rows = [
        (330, 'True slow', 'the sound carries all the way through',
         [(26, 2), (30, 2), (22, 2), (34, 0)], SAGE),
        (450, 'Stretched slow', 'words with air between them, and the line dies in the gaps',
         [(9, 16), (7, 18), (10, 15), (8, 0)], RUST),
        (570, 'True fast', 'every consonant finished, built up from a crawl',
         [(4, 2.4)] * 16, SAGE),
        (690, 'Rushed', 'the words run together and the ends fall off',
         [(13, 1), (19, 0.8), (9, 1), (24, 0)], RUST),
    ]
    col = 470
    for y, label, note, marks, colour in rows:
        parts.append(text(bx, y, label, 26, INK, weight='600'))
        parts += block(bx, y + 30, note, 40, size=20, leading=25, style='italic')
        strip, _ = track(bx + col, y - 22, marks, h=26, c=colour,
                         unit=fit(marks, bw - col))
        parts += strip
    return W, H, parts


DIAGRAMS = (
    ('rhythm-dials', dials),
    ('rhythm-two', two_rhythms),
    ('rhythm-harmony', harmony),
    ('rhythm-rests', rests),
    ('rhythm-speeds', speeds),
)


if __name__ == '__main__':
    for name, fn in DIAGRAMS:
        w, h, parts = fn()
        out = svg(w, h, parts)
        assert '--' not in out, 'a double hyphen would break the XML parse'
        assert 'width=' in out.split('>')[0], 'the root needs an intrinsic size'
        (OUT / f'{name}.svg').write_text(out)
        print(f'make_rhythm_diagrams: wrote img/lessons/{name}.svg, '
              f'{len(out):,} bytes, {w}x{h}')
