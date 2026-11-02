#!/usr/bin/env python3
"""Print the facts about this app that CLAUDE.md used to remember.

WHY THIS EXISTS (2026-10-20). An audit checked 848 factual claims in
CLAUDE.md against the code and found 127 wrong, 56 of them badly enough to
send a session down a wrong path: three live courses missing from the
opening paragraph, two kill switches described as working features, sixteen
passages insisting that shipped work was unpushed, and counts that had
drifted by 38% without anybody noticing.

The cause was structural, not carelessness. The file's state section was
append-only: every entry described the app as of its own date and nothing
ever reconciled them. Patching the 127 would have left the mechanism in
place.

So the numbers live HERE now and CLAUDE.md points at this. Run it and the
next drift is a diff rather than an excavation:

    python3 tools/project_facts.py            # human-readable
    python3 tools/project_facts.py --markdown # the block CLAUDE.md carries

This reads the source with regex ON PURPOSE. There is no Node on this
machine, so the browser is the only JavaScript parser available and a tool
that needed one could not run in CI. Everything here is a shape the repo
has held for months; a parse that fails is reported as 'unknown' rather
than guessed, because a wrong number here is worse than a missing one.
"""
import argparse
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(rel):
    p = os.path.join(ROOT, rel)
    try:
        with open(p, encoding='utf-8') as f:
            return f.read()
    except OSError:
        return ''


def live_flags():
    """Every X_LIVE switch in shipped code, with where it is set."""
    out = []
    for base, _dirs, files in os.walk(os.path.join(ROOT, 'js')):
        for fn in sorted(files):
            if not fn.endswith('.js'):
                continue
            rel = os.path.relpath(os.path.join(base, fn), ROOT)
            for i, line in enumerate(read(rel).split('\n'), 1):
                m = re.match(r'\s*(?:export )?const ([A-Z_]*LIVE) = (true|false);', line)
                if m:
                    out.append((m.group(1), m.group(2) == 'true', '%s:%d' % (rel, i)))
    return sorted(out)


def listed(src, const):
    """The { id, label } pairs of a top-level array literal."""
    m = re.search(r'export const %s = \[((?:.|\n)*?)\n\];' % const, src)
    if not m:
        return []
    body = m.group(1)
    out = []
    for entry in re.finditer(r"\{[^{}]*?id: '([a-z]+)'[^{}]*?\}", body):
        lab = re.search(r"label: '([^']*)'", entry.group(0))
        out.append((entry.group(1), lab.group(1) if lab else '?'))
    return out


def count(rel, pattern):
    return len(re.findall(pattern, read(rel)))


def record_blocks(src):
    """Every authored record as its own slice of text, keyed by its module.

    One file can hold two courses since 2026-11-02 (character-course.js
    holds Building a Character and Commedia dell'Arte), so any per-course
    figure taken by sweeping a whole file is wrong for both of them. This
    cuts the file at record boundaries instead and lets the caller keep
    the records it owns. Both record styles are matched: id on the brace
    line, and brace-on-its-own-line as speech-course.js writes it."""
    hits = list(re.finditer(r"\n  \{(?:\s*\n\s+| )id: '([a-z0-9-]+)'", src))
    starts = [m.start() for m in hits]
    out = []
    for m, a, b in zip(hits, starts, starts[1:] + [len(src)]):
        block = src[a:b]
        mod = re.search(r"module: '([a-z-]+)'", block)
        # The RECORD's id, taken from the boundary match — a block also
        # contains question ids and figure keys, and a loose sweep for
        # `id:` would count those as lessons.
        out.append((mod.group(1) if mod else None, m.group(1), block))
    return out


def lessons():
    """Authored lesson records per book course, and the module each course
    withdraws. Building a Character exports CHARACTER_LESSONS as
    CHARACTER_LESSONS_ALL.filter(l => ROLE_LIVE || l.module !== 'role'), so
    counting the array overstates the course by the size of 'role'.

    A COURSE IS NOT THE SAME THING AS A FILE, since 2026-11-02. Commedia
    dell'Arte became its own course that day and its records stayed in
    character-course.js, because they are reviewed prose and moving them
    would risk a transcription error for tidiness. So this table counted
    its 22 records under Building a Character and printed no Commedia row
    at all — while the Workspaces section above it printed Commedia LIVE.
    A session reading the block would have been told, by the one artifact
    CLAUDE.md orders it to trust over memory, that a live course had no
    lessons and that Building a Character had 22 it does not walk.

    The `lifted` field is what keeps the two facts in step: it names a
    module whose records are subtracted from the file's own course and
    counted as a course in their own right. Unlike `withdrawn` it is not
    behind a flag — a lift is not reversible by flipping anything, it is
    simply where the course now lives."""
    return [
        ('Acting & Scene Work', 'js/data/acting/acting-course.js', r"\n  \{ id: 'ac-",
         ('performance', 'PERFORMANCE_LIVE'), None, None),
        ('Building a Character', 'js/data/character/character-course.js',
         r"\n  \{ id: '(?:ch|ac)-[a-z-]+', module:", ('role', 'ROLE_LIVE'),
         ('commedia', 'Commedia dell’Arte'), None),
        # SAME FILE AS THE ROW ABOVE, by design — see the docstring.
        ('Commedia dell’Arte', 'js/data/character/character-course.js',
         r"\n  \{ id: '(?:ch|ac)-[a-z-]+', module: 'commedia'", None, None, 'commedia'),
        ('Shakespeare', 'js/data/shakespeare/shakespeare-course.js', r"\n  \{ id: 'sh-", None, None, None),
        ('Rhetoric', 'js/data/rhetoric/rhetoric-course.js', r"\n  \{ id: 'rh-", None, None, None),
        # THE COURSE IS CALLED 'Speech', NOT 'Voice & Speech'. The workspace
        # labelled Voice & Speech has id 'ipa' and is LIVE; the withdrawn
        # workspace is id 'speech', labelled Speech. This row said
        # 'Voice & Speech' until 2026-10-21 and so printed
        # "Voice & Speech ... WORKSPACE WITHDRAWN" into CLAUDE.md's generated
        # block — the exact confusion CLAUDE.md calls the single easiest
        # mistake in the file, emitted by the tool built to prevent it.
        #
        # The regex also has to differ: EVERY OTHER COURSE writes a record as
        # "\n  { id: 'xx-...", but speech-course.js puts the brace on its own
        # line and the id on the next. The old r"\n  \{ id: 'sp-" therefore
        # matched ZERO and reported a 25-record course as 0 records.
        ('Speech', 'js/data/speech/speech-course.js',
         r"\n  \{\s*\n\s+id: '(?:sp-|wsm)", None, None, None),
    ]


def published_ids():
    """Ids the ledger PUBLISHES. Publication and specialist sign-off are
    different facts: every entry here is the owner's editorial verdict and
    none claims a specialist, which the awaiting-review badges say out loud."""
    src = read('js/data/speech/reviews.js')
    body = src[src.index('export const SPEECH_REVIEWS'):] if 'export const SPEECH_REVIEWS' in src else src
    return set(k for k, v in re.findall(r"\n  '([a-z0-9][a-z0-9-]*)': \{\s*verdict: '([a-z-]+)'", body)
               if v in ('approved', 'owner-approved'))


def specialist_signoff():
    src = read('js/data/speech/reviews.js')
    body = src[src.index('export const SPEECH_REVIEWS'):] if 'export const SPEECH_REVIEWS' in src else src
    rows = re.findall(r"\n  '([a-z0-9][a-z0-9-]*)': \{\s*verdict: '([a-z-]+)'", body)
    return len(rows), sum(1 for _, v in rows if v == 'approved')


def facts():
    ctx = read('js/views/context.js')
    flags = live_flags()
    flagmap = dict((n, v) for n, v, _ in flags)

    ws = listed(ctx, 'WORKSPACES')
    # liveWorkspaces() hides speech / character / shakespeare / rhetoric on
    # their own flags; everything else is always shown.
    gate = {'speech': 'SPEECH_LIVE', 'character': 'CHARACTER_LIVE',
            'shakespeare': 'SHAKESPEARE_LIVE', 'rhetoric': 'RHETORIC_COURSE_LIVE'}
    ws_live = [(i, l, flagmap.get(gate[i], True) if i in gate else True) for i, l in ws]

    courses = listed(ctx, 'COURSES')
    co_live = [(i, l, flagmap.get('COCKNEY_LIVE', True) if i == 'cockney' else True)
               for i, l in courses]

    pub = published_ids()
    books = []
    for name, rel, pat, withdrawn, lifted, own_module in lessons():
        src = read(rel)
        n = count(rel, pat)
        note = ''
        # The records this row owns, which is not the file when the file
        # holds two courses. Kept in step with `n` below: whatever is
        # subtracted from the count is dropped from this slice too.
        drop = set()
        if own_module:
            own = [(i, b) for m, i, b in record_blocks(src) if m == own_module]
        else:
            if lifted:
                drop.add(lifted[0])
            if withdrawn and not flagmap.get(withdrawn[1], True):
                drop.add(withdrawn[0])
            own = [(i, b) for m, i, b in record_blocks(src) if m not in drop]
        own_src = ''.join(b for _, b in own)
        mine = [i for i, _ in own]
        if withdrawn:
            mod, flag = withdrawn
            if not flagmap.get(flag, True):
                hidden = len(re.findall(r"module: '%s'" % mod, src))
                n -= hidden
                note = '(%d more in the withdrawn %s module, behind %s)' % (hidden, mod, flag)
        if lifted:
            mod, course = lifted
            gone = len(re.findall(r"module: '%s'" % mod, src))
            n -= gone
            note = (note + ' (%d further records in this file are %s, '
                           'its own course since 2026-11-02)' % (gone, course)).strip()
        # HOW MANY OF THOSE RECORDS THE PATH ACTUALLY WALKS. A
        # `reference: true` record is a page you are sent to and never a
        # step: by the owner's order of 2026-09-22 it is "not listed in its
        # module, shelved, counted or given a place in the Next sequence".
        # So a record count is not a lesson count, and for Commedia the two
        # differ by thirteen — which is the whole of its mask gallery.
        #
        # THIS LINE EXISTS BECAUSE THE SPLIT GOT BUILT WRONG WITHOUT IT. On
        # 2026-11-02 Commedia's modules were drawn from its 22 records, three
        # of the four held nothing but reference pages, and the Learn page
        # rendered a single card. Nothing in this report said 9.
        refs = len(re.findall(r"reference: true", own_src))
        if refs:
            note = (note + ' (%d of them reference pages, so the path walks %d)'
                    % (refs, n - refs)).strip()
        if not flagmap.get({'Speech': 'SPEECH_LIVE'}.get(name, '_'), True):
            note = (note + ' WORKSPACE WITHDRAWN').strip()
        # Tolerate the brace-on-its-own-line style too (speech-course.js), or
        # an unpublished Speech lesson is invisible to the draft-gate warning
        # below — which is the one thing this report exists to catch.
        #
        # SCOPED TO THE ROW'S OWN RECORDS, not the whole file. Two rows now
        # read character-course.js, so a file-wide sweep would report every
        # unpublished commedia lesson twice — once under each course — and
        # the draft-gate warning is the line this report exists for.
        unpub = [x for x in mine if x not in pub and re.match(r'^(ac|ch|sh|rh|sp)-', x)]
        books.append((name, n, len(unpub), unpub[:6], note))

    return {
        'flags': flags,
        'workspaces': ws_live,
        'courses': co_live,
        'books': books,
        'main_lines': len(read('js/main.js').split('\n')),
        'view_modules': sorted(f for f in os.listdir(os.path.join(ROOT, 'js', 'views'))
                               if f.endswith('.js')),
        'reference': [
            ('Shakespeare lexicon', count('js/data/shakespeare-lexicon.js', r"\n  \{ id: 'SH-")),
            ('Idioms', count('js/data/idiom.js', r"\n  \{ id: '")),
            ('Stratagems', count('js/data/rhetoric/stratagems.js', r"\n  \{ id: 'ST-")),
            ('Scenes', count('js/data/scenes.js', r"\n    id: '")),
            ('Commedia masks', count('js/data/character/character-course.js', r"\n  \{ id: '[a-z]+',\n?\s*name:")),
            ('Commedia figures', count('js/data/character/art.js', r"\n  'cm-")),
        ],
        'checks': count('tests/regression.test.js', r"(?<![\w.$])check\s*\("),
        'ledger': specialist_signoff(),
    }


def emit(f, markdown):
    b = (lambda s: '**%s**' % s) if markdown else (lambda s: s)
    h = (lambda s: '\n### %s\n' % s) if markdown else (lambda s: '\n%s\n%s' % (s, '-' * len(s)))

    print(h('Workspaces'))
    for i, l, live in f['workspaces']:
        print('- %-26s %s' % ('%s (%s)' % (l, i), b('LIVE') if live else 'withdrawn'))
    print('\n%d of %d live.' % (sum(1 for _, _, v in f['workspaces'] if v), len(f['workspaces'])))

    print(h('Accent courses'))
    for i, l, live in f['courses']:
        print('- %-26s %s' % ('%s (%s)' % (l, i), 'live' if live else 'withdrawn'))

    print(h('Lessons, and whether they publish'))
    for name, n, unpub, sample, note in f['books']:
        tail = '' if not unpub else '  <- %d UNPUBLISHED: %s' % (unpub, ', '.join(sample))
        print('- %-28s %3d records%s%s' % (name, n, tail, ('  ' + note) if note else ''))
    print('\nAn unpublished lesson in a live course renders as a draft gate to')
    print('every learner. Ship its js/data/speech/reviews.js entry in the same commit.')

    print(h('Every X_LIVE switch'))
    for n, v, where in f['flags']:
        print('- %-24s %-5s  %s' % (n, 'true' if v else 'false', where))

    print(h('Reference shelves'))
    for name, n in f['reference']:
        print('- %-26s %d' % (name, n))

    print(h('Size'))
    print('- js/main.js                %d lines' % f['main_lines'])
    print('- js/views/                 %d modules: %s'
          % (len(f['view_modules']), ', '.join(f['view_modules'])))
    print('- regression check() sites  %d' % f['checks'])

    total, spec = f['ledger']
    print(h('Review'))
    print('- %d ledger entries, %d with specialist sign-off.' % (total, spec))
    print('  Every published lesson rests on the owner editorial verdict alone.')
    print('  The awaiting-review badges say so; do not describe them as reviewed.')


BEGIN, END = '<!-- facts:begin -->', '<!-- facts:end -->'


def rendered():
    """The generated block, exactly as CLAUDE.md should carry it."""
    import io
    buf, old = io.StringIO(), sys.stdout
    sys.stdout = buf
    try:
        print('<!-- generated by tools/project_facts.py — do not hand-edit -->')
        emit(facts(), True)
    finally:
        sys.stdout = old
    return buf.getvalue().rstrip('\n')


def block_in_claude_md():
    src = read('CLAUDE.md')
    m = re.search(r'%s\n((?:.|\n)*?)%s' % (re.escape(BEGIN), re.escape(END)), src)
    return (m.group(1).rstrip('\n'), src, m) if m else (None, src, None)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--markdown', action='store_true',
                    help='emit the block CLAUDE.md carries')
    ap.add_argument('--check', action='store_true',
                    help="fail if CLAUDE.md's facts block is stale (deploy gate)")
    ap.add_argument('--write', action='store_true',
                    help="rewrite CLAUDE.md's facts block in place")
    a = ap.parse_args()

    if a.check or a.write:
        have, src, m = block_in_claude_md()
        want = rendered()
        if have is None:
            print('project_facts: CLAUDE.md has no %s block' % BEGIN)
            return 1
        if have == want:
            print('project_facts: CLAUDE.md is current.')
            return 0
        if a.write:
            out = src[:m.start(1)] + want + '\n' + src[m.end(1):]
            with open(os.path.join(ROOT, 'CLAUDE.md'), 'w', encoding='utf-8') as fh:
                fh.write(out)
            print('project_facts: rewrote the facts block in CLAUDE.md.')
            return 0
        print('project_facts: CLAUDE.md\'s facts block is STALE.')
        print('  The app changed and the file still describes the old shape.')
        print('  Fix it with:  python3 tools/project_facts.py --write')
        import difflib
        for line in list(difflib.unified_diff(
                have.split('\n'), want.split('\n'),
                fromfile='CLAUDE.md', tofile='generated', lineterm=''))[:40]:
            print('  ' + line)
        return 1

    f = facts()
    if a.markdown:
        print('<!-- generated by tools/project_facts.py — do not hand-edit -->')
    emit(f, a.markdown)
    return 0


if __name__ == '__main__':
    sys.exit(main())
