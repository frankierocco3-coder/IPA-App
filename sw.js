/* Speechcraft service worker — offline capability for a zero-build app.
 *
 * Strategy (docs/SECURITY_CHECKLIST.md and CLAUDE.md constraints apply):
 * there is NO generated precache manifest, because a hand-maintained or
 * tool-generated file list drifts. Instead the ES module graph does the
 * enumeration for us: index.html statically imports js/main.js, whose
 * import graph pulls every core module at boot, and each of those
 * fetches lands in the runtime cache on the first online visit. After
 * one load the whole shell — lessons, scenes, texts, UI — works
 * offline. Heavy lazies (pron.json, edition chunks, audio) cache when
 * first used, which is the honest shape of what the user actually has.
 *
 * Caching rules, same-origin GET only:
 *   • navigations   network first (3 s), fall back to cached index.html
 *   • js / css / json   stale-while-revalidate, so updates arrive on
 *     the next visit without ever blocking on the network
 *   • audio / images / fonts   cache first (these files never change
 *     in place; new recordings get new paths)
 *   • Range requests (audio seeking) go to the network; if the network
 *     is gone, the cached full response is served instead, which
 *     Chromium accepts for playback
 * Nothing cross-origin is fetched or cached — the app makes no
 * external requests, and this worker preserves that.
 *
 * Bump VERSION when the caching LOGIC changes (old caches are then
 * dropped on activate). Content updates need no bump: URLs are stable
 * and stale-while-revalidate refreshes entries by itself.
 */
const VERSION = 'sc-v1';
const SHELL = `${VERSION}-shell`;
const MEDIA = `${VERSION}-media`;
const PRECACHE = ['./', 'index.html', 'css/style.css', 'manifest.json',
                  'favicon.svg', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      if (!k.startsWith(VERSION)) await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

const sameOrigin = url => url.origin === self.location.origin;
const isMedia = path => /\.(mp3|wav|m4a|ogg|jpg|jpeg|png|webp|svg|gif|woff2?)$/i.test(path);

async function networkFirstNav(req) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    const res = await fetch(req, { signal: ctrl.signal });
    clearTimeout(t);
    if (res.ok) (await caches.open(SHELL)).put('index.html', res.clone());
    return res;
  } catch {
    return (await caches.match('index.html')) ?? Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(SHELL);
  const cached = await cache.match(req);
  const fresh = fetch(req).then(res => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  return cached ?? (await fresh) ?? Response.error();
}

async function cacheFirst(req) {
  const cache = await caches.open(MEDIA);
  const cached = await cache.match(req, { ignoreVary: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok && res.status === 200) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!sameOrigin(url)) return;                    // the app never asks; never answer
  if (req.mode === 'navigate') { e.respondWith(networkFirstNav(req)); return; }
  if (req.headers.has('range')) {
    // Seeking inside audio: let the network answer with a real 206;
    // offline, fall back to the cached full file.
    e.respondWith(fetch(req).catch(async () =>
      (await caches.open(MEDIA)).match(url.pathname, { ignoreSearch: true, ignoreVary: true })
        .then(r => r ?? Response.error())));
    return;
  }
  if (isMedia(url.pathname)) { e.respondWith(cacheFirst(req)); return; }
  if (/\.(js|css|json|webmanifest)$/i.test(url.pathname)) {
    e.respondWith(staleWhileRevalidate(req));
  }
});
