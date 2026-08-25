#!/usr/bin/env python3
"""Assemble exactly what GitHub Pages should serve, into ./_site.

    python3 tools/build_artifact.py [output_dir]

Why this exists: the workflow used to publish `path: .` — the whole
repository, including tools/, docs/, tests/, .github/ and anything untracked
that happened to be on the deploying machine. That is exactly how a local
credential file ends up publicly downloadable.

This is an ALLOW-LIST. A file is published only if it matches both a listed
directory and a listed extension, so a stray .env or key file cannot reach the
web root even if someone deploys by hand from a working copy containing one.
"""
from __future__ import annotations

import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Top-level files that ship.
FILES = ['index.html', 'manifest.json', 'icon-180.png', 'icon-512.png', 'favicon.svg']

# Directories that ship, and the extensions allowed inside them.
DIRS = {
    'css':   {'.css'},
    'js':    {'.js', '.mjs', '.json'},
    'audio': {'.mp3', '.json'},
    # Articulation artwork. .json ships so the symbol-to-drawing manifest
    # stays checkable on the live site, the same way it is in the repo.
    'img':   {'.jpg', '.png', '.svg', '.json'},
}

# Never publish, whatever the extension says.
FORBIDDEN = re.compile(
    r'(^|/)\.'                                   # any dotfile or dot-directory
    r'|\.(pem|key|p12|pfx|env)$'
    r'|\.elevenlabs_key$'
    r'|credentials?\.json$|secrets?\.json$'
    r'|\.(bak|orig|swp|tmp)$|~$',
    re.I,
)


def build(out: str) -> int:
    if os.path.exists(out):
        shutil.rmtree(out)
    os.makedirs(out)

    copied = 0

    for name in FILES:
        src = os.path.join(ROOT, name)
        if os.path.isfile(src) and not FORBIDDEN.search(name):
            shutil.copy2(src, os.path.join(out, name))
            copied += 1

    for d, allowed_ext in DIRS.items():
        src_dir = os.path.join(ROOT, d)
        if not os.path.isdir(src_dir):
            continue
        for dirpath, dirnames, filenames in os.walk(src_dir):
            # Never descend into a dot-directory.
            dirnames[:] = [x for x in dirnames if not x.startswith('.')]
            for fn in filenames:
                if os.path.splitext(fn)[1].lower() not in allowed_ext:
                    continue
                abs_src = os.path.join(dirpath, fn)
                relpath = os.path.relpath(abs_src, ROOT)
                if FORBIDDEN.search(relpath):
                    continue
                abs_dst = os.path.join(out, relpath)
                os.makedirs(os.path.dirname(abs_dst), exist_ok=True)
                shutil.copy2(abs_src, abs_dst)
                copied += 1

    # Belt and braces: nothing sensitive may exist in the output.
    offenders = []
    for dirpath, _, filenames in os.walk(out):
        for fn in filenames:
            rel = os.path.relpath(os.path.join(dirpath, fn), out)
            if FORBIDDEN.search(rel) or FORBIDDEN.search(fn):
                offenders.append(rel)
    if offenders:
        print('FATAL: credential-shaped files reached the build output:', file=sys.stderr)
        for o in offenders:
            print('  ' + o, file=sys.stderr)
        return 1

    # Sanity: the app must actually be complete, or we would ship a broken site.
    required = ['index.html', 'js/main.js', 'css/style.css', 'js/data/pron.json']
    missing = [r for r in required if not os.path.isfile(os.path.join(out, r))]
    if missing:
        print(f'FATAL: build output is incomplete, missing: {", ".join(missing)}', file=sys.stderr)
        return 1

    total_bytes = sum(
        os.path.getsize(os.path.join(dp, f))
        for dp, _, fs in os.walk(out) for f in fs
    )
    print(f'Built deploy artifact at: {out}')
    print(f'  files: {copied}')
    print(f'  size:  {total_bytes / 1024 / 1024:.0f} MB')
    print(f'  top level: {" ".join(sorted(os.listdir(out)))}')
    return 0


if __name__ == '__main__':
    sys.exit(build(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '_site')))
