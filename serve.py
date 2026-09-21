#!/usr/bin/env python3
"""Dev server: http.server with caching disabled so edits show up on reload.

Also serves the audio. It lives in its own repository, IPA-Audio, checked
out beside this one; on the live site it is its own Pages site at
/IPA-Audio/, so /IPA-Audio/ here maps to that sibling checkout and the app
uses the same paths in both places. Override the location with
SPEECHCRAFT_AUDIO_DIR.
"""
import http.server
import os
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
AUDIO_DIR = os.path.realpath(os.environ.get('SPEECHCRAFT_AUDIO_DIR')
                             or os.path.join(os.path.dirname(ROOT), 'IPA-Audio'))
AUDIO_PREFIX = '/IPA-Audio/'


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def translate_path(self, path):
        clean = urllib.parse.unquote(path.split('?', 1)[0].split('#', 1)[0])
        if not clean.startswith(AUDIO_PREFIX):
            return super().translate_path(path)
        full = os.path.realpath(os.path.join(AUDIO_DIR, clean[len(AUDIO_PREFIX):]))
        # A ../ in the URL must never climb out of the audio checkout.
        if full != AUDIO_DIR and not full.startswith(AUDIO_DIR + os.sep):
            return os.path.join(AUDIO_DIR, '__outside_audio_dir__')
        return full


if not os.path.isdir(AUDIO_DIR):
    print('warning: no audio at %s — clips will 404. Clone IPA-Audio beside '
          'this repo, or set SPEECHCRAFT_AUDIO_DIR.' % AUDIO_DIR, file=sys.stderr)

http.server.ThreadingHTTPServer(('', PORT), NoCacheHandler).serve_forever()
