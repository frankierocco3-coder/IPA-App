#!/usr/bin/env python3
"""Partition the audio into what a store build must BUNDLE and what it may DOWNLOAD.

WHY (2026-10-04, docs/STORE_PLAN.md). The app is 33MB and the audio is
~305MB, which is the whole packaging problem — except that most of the
audio is not course material. Sonnet narration is a reader enhancement on
one shelf, already incomplete and honest about it. Course audio is what
the product IS: a dialect trainer that needs a network to play a vowel is
broken.

    COURSE     the five dialects, the phoneme recordings, both indexes.
               Bundled in the binary. Must be complete offline.
    NARRATION  per-line sonnet readings. Optional, downloaded on demand.

THIS TOOL MOVES NOTHING. The IPA-Audio repository is a published Pages
site that the live app resolves against with a relative URL, so physically
restructuring it would break every clip for every existing user to serve a
packager that does not exist yet. This reads the tree and can MATERIALISE
either half into an output directory, which is what a bundler needs and
costs nothing to be wrong about.

    python3 tools/split_audio.py                       # classify and report
    python3 tools/split_audio.py --emit course --out build/audio
    python3 tools/split_audio.py --emit narration --out build/narration

Emitting hard-links by default, so a 300MB set costs no extra disk. Pass
--copy for a real copy (needed when the output goes to another volume, or
into something that will be zipped and shipped).

THE TRAP THIS TOOL CANNOT FIX FOR YOU, stated here because it is the one
way to ship a lie: js/data/audio-coverage.js is generated from WHAT IS ON
DISK and is the single truth source for which voices the reader presents
as recorded. Build a bundle without narration and keep the existing
coverage file, and the reader will show recorded-audio badges for
narration that is not in the bundle; playback is strict, so it will simply
be silent. After emitting a course-only tree, regenerate against it:

    SPEECHCRAFT_AUDIO_DIR=<that tree> python3 tools/longform_coverage.py
"""
import json
import os
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from audio_root import AUDIO, require_audio          # noqa: E402

# Every top-level entry must be named here. An unclassified one is an
# ERROR, not a default: silently dropping a new folder out of the bundle
# is how a course ships without its audio.
COURSE_DIRS = ['nam', 'rp', 'aus', 'ssbe', 'cockney', 'phonemes']
COURSE_FILES = ['index.json', 'phonemes-index.json']
NARRATION_DIRS = ['sonnets', 'chekhov', 'ibsen', 'oneill', 'wilde', 'pirandello']
IGNORE = ['README.md', '.git', '.gitignore', '.github', '.nojekyll']


def walk(root):
    """Every file under root, as paths relative to it."""
    out = []
    for base, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d != '.git']
        for f in files:
            full = os.path.join(base, f)
            out.append(os.path.relpath(full, root))
    return out


def classify(audio):
    """Split the tree three ways. Unclassified is a failure, not a bucket."""
    course, narration, unknown = [], [], []
    for rel in walk(audio):
        top = rel.split(os.sep)[0]
        if top in IGNORE:
            continue
        if top in COURSE_DIRS or rel in COURSE_FILES:
            course.append(rel)
        elif top in NARRATION_DIRS:
            narration.append(rel)
        else:
            unknown.append(rel)
    return course, narration, unknown


def total_bytes(audio, rels):
    n = 0
    for rel in rels:
        try:
            n += os.path.getsize(os.path.join(audio, rel))
        except OSError:
            pass
    return n


def mb(n):
    return '%.1f MB' % (n / 1024.0 / 1024.0)


def indexed_clips(audio):
    """Every clip path the app can ask for from index.json + the phonemes."""
    want = set()
    with open(os.path.join(audio, 'index.json'), 'r', encoding='utf-8') as fh:
        idx = json.load(fh)
    for dialect in idx:
        for voice in idx[dialect]:
            for slug in idx[dialect][voice]:
                want.add(os.path.join(dialect, voice, slug + '.mp3'))
    pidx = os.path.join(audio, 'phonemes-index.json')
    if os.path.isfile(pidx):
        with open(pidx, 'r', encoding='utf-8') as fh:
            p = json.load(fh)
        for dialect in p:
            for voice in p[dialect]:
                for slug in p[dialect][voice]:
                    want.add(os.path.join('phonemes', dialect, voice, slug + '.mp3'))
    return want


def emit(audio, rels, out, copy):
    made = linked = copied = 0
    for rel in rels:
        src = os.path.join(audio, rel)
        dst = os.path.join(out, rel)
        d = os.path.dirname(dst)
        if not os.path.isdir(d):
            os.makedirs(d)
            made += 1
        if os.path.exists(dst):
            os.remove(dst)
        if copy:
            shutil.copy2(src, dst)
            copied += 1
        else:
            try:
                os.link(src, dst)
                linked += 1
            except OSError:
                shutil.copy2(src, dst)       # different volume; a copy is correct
                copied += 1
    return made, linked, copied


def main():
    audio = require_audio()
    args = sys.argv[1:]
    want_set = None
    out = None
    copy = '--copy' in args
    if '--emit' in args:
        want_set = args[args.index('--emit') + 1]
        if want_set not in ('course', 'narration'):
            print('split_audio: --emit takes course or narration')
            return 2
        if '--out' not in args:
            print('split_audio: --emit needs --out <dir>')
            return 2
        out = args[args.index('--out') + 1]

    course, narration, unknown = classify(audio)
    c_bytes = total_bytes(audio, course)
    n_bytes = total_bytes(audio, narration)

    print('Audio at %s' % audio)
    print('  COURSE     %5d files  %10s   bundled in the binary'
          % (len(course), mb(c_bytes)))
    print('  NARRATION  %5d files  %10s   downloaded on demand'
          % (len(narration), mb(n_bytes)))
    print('  TOTAL      %5d files  %10s' % (len(course) + len(narration),
                                            mb(c_bytes + n_bytes)))

    problems = []
    if unknown:
        problems.append('%d file(s) match neither set, starting with %s — add their '
                        'top-level name to COURSE_DIRS or NARRATION_DIRS'
                        % (len(unknown), ', '.join(sorted(unknown)[:3])))

    # The bundle has to be SUFFICIENT: every clip the app can ask for by
    # name must be in the course set, or a learner meets silence offline.
    have = set(course)
    missing = sorted(indexed_clips(audio) - have)
    if missing:
        problems.append('%d indexed clip(s) are not in the course set, starting with %s'
                        % (len(missing), ', '.join(missing[:3])))

    overlap = have & set(narration)
    if overlap:
        problems.append('%d file(s) are in BOTH sets' % len(overlap))

    if problems:
        print('\nFAILED:')
        for p in problems:
            print('  x ' + p)
        return 1
    print('\n  every indexed clip is in the course set; the two sets are disjoint '
          'and cover the tree.')

    if want_set:
        rels = course if want_set == 'course' else narration
        made, linked, copied = emit(audio, rels, out, copy)
        print('\nemitted %s into %s' % (want_set, out))
        print('  %d dirs, %d hard-linked, %d copied' % (made, linked, copied))
        if want_set == 'course':
            print('\n  NOW REGENERATE COVERAGE, or the reader will claim narration')
            print('  this tree does not have:')
            print('    SPEECHCRAFT_AUDIO_DIR=%s python3 tools/longform_coverage.py'
                  % os.path.abspath(out))
    return 0


if __name__ == '__main__':
    sys.exit(main())
