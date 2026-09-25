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
 *   • Range requests — which is how <audio> asks for EVERY clip, not just
 *     when seeking — go to the network for a real 206, and a full copy of
 *     the file is stored once in the background. Offline, that copy is
 *     sliced into the 206 the player asked for. (Until 2026-09-21 nothing
 *     ever stored that copy, so offline audio never worked.)
 * Nothing cross-origin is fetched or cached — the app makes no
 * external requests, and this worker preserves that.
 *
 * Bump VERSION when the caching LOGIC changes, or when the MODULE GRAPH
 * gains files (old caches are then dropped on activate). Ordinary content
 * updates need no bump: URLs are stable and stale-while-revalidate
 * refreshes entries by itself.
 *
 * The module-graph case is not obvious and it bites offline. An installed
 * app holding the old js/main.js serves it from cache and revalidates in
 * the background, so the NEW main.js lands in the cache while the OLD one
 * is still the code running — and the old code never imports the new
 * js/views/* modules, so they are never fetched. Go offline, open the app,
 * and the cached new main.js asks for modules that were never cached.
 * Bumping VERSION drops the old cache wholesale, so the next load fetches
 * one consistent graph.
 *
 * Every fetch here goes past the browser's own HTTP cache ('no-cache' /
 * 'reload'). GitHub Pages marks files max-age=600, so for ten minutes after
 * a visit a plain fetch() can be handed the OLD file without asking the
 * server. That once filled a freshly bumped cache (sc-v7) with the previous
 * deploy's main.js, which quietly undoes the bump and re-opens the offline
 * blank-screen trap above. 'no-cache' is a conditional request: an
 * unchanged file costs a 304, not a download.
 */
const VERSION = 'sc-v16';                     // 2026-09-25: the Shakespeare course completed — the module graph gained js/data/shakespeare/rhetoric.js on top of the course data, and an installed app holding the old main.js would never fetch it
const SHELL = `${VERSION}-shell`;
const MEDIA = `${VERSION}-media`;
const PRECACHE = ['./', 'index.html', 'css/style.css', 'manifest.json',
                  'favicon.svg', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL)
    .then(c => c.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
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
    const res = await fetch(req, { signal: ctrl.signal, cache: 'no-cache' });
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
  const fresh = fetch(req, { cache: 'no-cache' }).then(res => {
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

// <audio> requests media in ranges, so every play arrives HERE, never in
// cacheFirst — this branch is where offline audio is won or lost. Online,
// the network answers with its own 206 and a full copy is stored once in
// the background. Offline, the stored copy is sliced into the 206 the
// player asked for: Safari will not play a 200 handed back to a range.
function rangeRequest(e, req, url) {
  const key = url.origin + url.pathname;
  e.respondWith(fetch(req).catch(async () => {
    const cached = await (await caches.open(MEDIA)).match(key, { ignoreVary: true });
    return cached ? sliceRange(cached, req.headers.get('range')) : Response.error();
  }));
  if (isMedia(url.pathname)) e.waitUntil(storeFull(key));
}

async function storeFull(key) {
  const cache = await caches.open(MEDIA);
  if (await cache.match(key, { ignoreVary: true })) return;
  try {
    const res = await fetch(key);
    if (res.ok && res.status === 200) await cache.put(key, res);
  } catch { /* offline right now; the next online play tries again */ }
}

async function sliceRange(res, header) {
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(header || '');
  let start = 0, end = size - 1;
  if (m && m[1] === '' && m[2] !== '') start = Math.max(0, size - Number(m[2]));   // bytes=-N
  else if (m) { start = m[1] === '' ? 0 : Number(m[1]); if (m[2] !== '') end = Math.min(Number(m[2]), size - 1); }
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
  }
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg',
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Content-Length': String(end - start + 1),
    'Accept-Ranges': 'bytes',
  } });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!sameOrigin(url)) return;                    // the app never asks; never answer
  if (req.mode === 'navigate') { e.respondWith(networkFirstNav(req)); return; }
  if (req.headers.has('range')) { rangeRequest(e, req, url); return; }
  if (isMedia(url.pathname)) { e.respondWith(cacheFirst(req)); return; }
  if (/\.(js|css|json|webmanifest)$/i.test(url.pathname)) {
    e.respondWith(staleWhileRevalidate(req));
  }
});
