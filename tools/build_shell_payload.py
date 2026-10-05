#!/usr/bin/env python3
"""Assemble the web payload that the native shells embed.

Both store shells (shells/ios, shells/android) are windows onto exactly
this directory. Building it is the only part of going native that is pure
Python and can be verified on this machine, so it is a tool rather than a
step in a README nobody runs.

    python3 tools/build_shell_payload.py build/payload

What it produces, and why the layout is this and not another:

    <out>/index.html, js/, css/, img/, sw.js, privacy.html ...
    <out>/IPA-Audio/   index.json, nam/, rp/, aus/, ssbe/, cockney/, phonemes/

js/audio.js resolves clips with `new URL('../../IPA-Audio/',
import.meta.url)`. Served from the root of <out>, that module sits at
/js/audio.js, so the base resolves to /IPA-Audio/ — the same answer it
gets on Pages, where the app is at /IPA-App/ and the audio at /IPA-Audio/.
The relative URL was written in 2026-09 for the sibling-Pages-site move;
it happens to be exactly what a bundle needs, so no app code changes.

NARRATION IS LEFT OUT, and the coverage file is REGENERATED to say so.
js/data/audio-coverage.js is the single truth source for which voices the
reader presents as recorded, and it is generated from what is on disk.
Shipping the repository's copy beside a course-only audio tree would badge
narration the bundle does not contain; playback is strict, so tapping one
would be silence with nothing to explain it. This regenerates against the
payload's own audio and copies the result in, then puts the repository's
files back exactly as they were.
"""
import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

COVERAGE = os.path.join(ROOT, 'js', 'data', 'audio-coverage.js')
MANIFEST = os.path.join(ROOT, 'docs', 'LONGFORM_RECORDING_MANIFEST.md')
# Regenerating coverage against a course-only tree would zero this too,
# and a bundle that does not know a reading EXISTS can never offer to
# fetch it. Restored with the others, so the payload keeps the
# full-tree values that build_artifact already copied in.
UPSTREAM = os.path.join(ROOT, 'js', 'data', 'audio-upstream.js')


def run(args, env=None):
    e = dict(os.environ)
    if env:
        e.update(env)
    p = subprocess.run(args, cwd=ROOT, env=e,
                       stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    return p.returncode, p.stdout.decode('utf-8', 'replace')


def tree_bytes(path):
    n = 0
    for base, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d != '.git']
        for f in files:
            try:
                n += os.path.getsize(os.path.join(base, f))
            except OSError:
                pass
    return n


def mb(n):
    return '%.1f MB' % (n / 1024.0 / 1024.0)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    if not args:
        print(__doc__.strip().split('\n\n')[2])
        print('\nusage: python3 tools/build_shell_payload.py <out dir> [--copy]')
        return 2
    out = os.path.abspath(args[0])
    copy = '--copy' in sys.argv[1:]

    # 1. The app. build_artifact is an ALLOW-LIST, so this is the same set
    #    Pages publishes and nothing stray can ride along into a binary.
    code, log = run(['python3', 'tools/build_artifact.py', out])
    if code:
        print('build_shell_payload: artifact build FAILED\n' + log)
        return 1
    app_bytes = tree_bytes(out)

    # 2. The course audio, beside the app root so the relative URL resolves.
    audio_out = os.path.join(out, 'IPA-Audio')
    emit = ['python3', 'tools/split_audio.py', '--emit', 'course', '--out', audio_out]
    if copy:
        emit.append('--copy')
    code, log = run(emit)
    if code:
        print('build_shell_payload: audio split FAILED\n' + log)
        return 1
    audio_bytes = tree_bytes(audio_out)

    # 3. Coverage, regenerated against THIS tree so the reader cannot badge
    #    narration the bundle does not carry. The repository's own generated
    #    files are restored afterwards, including when this fails.
    saved = {}
    for p in (COVERAGE, MANIFEST, UPSTREAM):
        try:
            with open(p, 'rb') as fh:
                saved[p] = fh.read()
        except IOError:
            saved[p] = None
    try:
        code, log = run(['python3', 'tools/longform_coverage.py'],
                        env={'SPEECHCRAFT_AUDIO_DIR': audio_out})
        if code:
            print('build_shell_payload: coverage regeneration FAILED\n' + log)
            return 1
        shutil.copy2(COVERAGE, os.path.join(out, 'js', 'data', 'audio-coverage.js'))
        claims = log.strip().split('\n')[0]
    finally:
        for p, data in saved.items():
            if data is not None:
                with open(p, 'wb') as fh:
                    fh.write(data)

    # 4. Prove the payload is what it claims to be.
    problems = []
    for need in ['index.html', 'js/main.js', 'js/audio.js', 'css/style.css',
                 'IPA-Audio/index.json', 'js/data/audio-coverage.js']:
        if not os.path.exists(os.path.join(out, need)):
            problems.append('missing ' + need)
    cov = os.path.join(out, 'js', 'data', 'audio-coverage.js')
    if os.path.exists(cov):
        with open(cov, 'r', encoding='utf-8') as fh:
            body = fh.read()
        # Every sonnet list must be empty: "sonnets": { "nam": [], ... }
        head = body[body.find('"sonnets"'):body.find('"libs"')]
        if '[]' not in head or any(ch.isdigit() for ch in head.replace('"', '')):
            problems.append('the payload still claims sonnet narration it does not carry')
    if os.path.isdir(os.path.join(out, 'IPA-Audio', 'sonnets')):
        problems.append('narration leaked into the payload')

    print('\npayload at %s' % out)
    print('  app        %10s' % mb(app_bytes - audio_bytes if audio_bytes < app_bytes else app_bytes))
    print('  audio      %10s   course only' % mb(audio_bytes))
    print('  TOTAL      %10s' % mb(tree_bytes(out)))
    print('  coverage   %s' % claims)
    if problems:
        print('\nFAILED:')
        for p in problems:
            print('  x ' + p)
        return 1
    print('\n  the payload carries no narration and claims none.')
    print('  serve this directory at / and the app is complete offline.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
