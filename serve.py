#!/usr/bin/env python3
"""Dev server: http.server with caching disabled so edits show up on reload."""
import http.server
import os
import sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()


http.server.ThreadingHTTPServer(('', PORT), NoCacheHandler).serve_forever()
