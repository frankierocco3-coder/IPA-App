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
    # HTTP/1.1, SO CONNECTIONS ARE REUSED. The default here is HTTP/1.0,
    # which closes the socket after every single response. This app is a
    # zero-build ES module graph: one page load fetches main.js plus well
    # over a hundred modules, and the browser was opening, using and
    # discarding a TCP connection for each one. Every discarded connection
    # then sits in TIME_WAIT for tens of seconds. Across a browser session,
    # and especially across a full tests/run-all.html run, that accumulates
    # until the server stops answering and the app boots to a blank screen.
    # Keep-alive collapses a hundred-odd connections into a handful.
    #
    # SimpleHTTPRequestHandler is safe under 1.1 because send_head always
    # sets Content-Length for a file and send_error sets it for an error,
    # so no response can leave the connection hanging for want of a length.
    protocol_version = 'HTTP/1.1'
    # Keep-alive pins one thread per open connection, so an idle browser tab
    # holding six of them holds six threads indefinitely. This reaps them:
    # a connection with nothing on it for half a minute is closed, and the
    # browser simply opens another when it next needs one. Without it the
    # 1.1 change above trades a socket leak for a thread leak.
    timeout = 30

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

class DevServer(http.server.ThreadingHTTPServer):
    # A LISTEN BACKLOG OF FIVE IS THE OTHER HALF OF THE SAME BUG. That is
    # socketserver's default, and it is the number of connections the kernel
    # will hold while the server is busy accepting. A browser opening a
    # module graph asks for far more than five at once, so under a burst the
    # surplus connections are refused or dropped and the page half-loads or
    # does not load at all. 128 costs nothing and removes the ceiling.
    request_queue_size = 128


DevServer(('', PORT), NoCacheHandler).serve_forever()
