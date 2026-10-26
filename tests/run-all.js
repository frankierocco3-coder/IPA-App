// Drives every browser suite from one page and prints a single verdict.
// The app itself loads in a hidden same-origin iframe so DOM-dependent
// checks (navigation order) run against the real rendered shell.

import { run as runSecurity } from './security.test.js';
import { run as runAudio } from './audio.test.js';
import { run as runRegression } from './regression.test.js';

const statusEl = document.getElementById('status');
const verdictEl = document.getElementById('verdict');
const tablesEl = document.getElementById('tables');

// The shell only renders once onboarding is done; merge that single flag
// (never touching progress) so a fresh profile still shows the nav.
function seedOnboarding() {
  try {
    const key = 'ipa-trainer-v1';
    const s = JSON.parse(localStorage.getItem(key) || '{}');
    s.onboarding = { ...(s.onboarding || {}), done: true };
    localStorage.setItem(key, JSON.stringify(s));
  } catch { /* storage unavailable — the nav checks will say so */ }
}

// AND START IT IN ACCENTS. Sections 1-18 are accent-course checks and the
// suite says so in its own precondition, but nothing ever SET the workspace —
// it inherited whatever the last session left in localStorage and then tried
// to detect where it had landed. That is why the cascade was deterministic
// per profile rather than random: a browser whose stored workspace was
// 'acting' failed the same 68 checks every single run, and one left in
// 'accents' passed every time.
//
// Setting it is the fix; the detector below it is the backstop. Nothing else
// is touched — this is the one key, and progress is never written.
function seedWorkspace() {
  try { localStorage.setItem('speechcraft-workspace', 'accents'); } catch { /* as above */ }
}

// IF THE SHELL NEVER RENDERS, SAY SO — DO NOT RUN THE SUITE ANYWAY.
//
// This wait used to give up silently after ~5s and resolve the frame
// regardless. That is how a dead app went unnoticed for ten days: the
// regression suite ran all 800-odd checks against a BLANK document,
// reported a short count with a scatter of failures, and the short count
// was read as "the embedded browser is unreliable" rather than "the app
// under test never started". A harness that fails quietly teaches you to
// ignore it.
//
// So the boot result is returned, not assumed, and the caller refuses to
// publish a regression number it cannot stand behind.
function appFrame() {
  return new Promise(resolve => {
    const f = document.createElement('iframe');
    f.id = 'appframe';
    // Same-origin framing is explicitly allowed by the app's clickjacking
    // guard (an attacker cannot serve from this origin), so the runner can
    // host it plainly — no sandbox tricks needed.
    f.src = '../index.html';
    f.addEventListener('load', async () => {
      let booted = false;
      for (let i = 0; i < 50; i++) {                       // up to ~5s for the shell
        if (f.contentDocument?.querySelector('.side-nav .side-item')) { booted = true; break; }
        await new Promise(r => setTimeout(r, 100));
      }
      resolve({ frame: f, booted });
    });
    document.body.appendChild(f);
  });
}

function drawSuite(name, out) {
  // Suites differ: some return a per-check results array, some only totals.
  const rows = (out.results ?? []).map(r => `
    <tr><td>${r.pass ? '✅' : '❌'}</td><td>${r.name}</td>
        <td class="detail">${r.pass ? '' : (r.detail ?? '')}</td></tr>`).join('');
  tablesEl.insertAdjacentHTML('beforeend', `
    <h2>${name} — ${out.total - out.failed}/${out.total}</h2>
    ${rows ? `<table><tbody>${rows}</tbody></table>`
           : '<p>Per-check detail in the browser console.</p>'}`);
}

// The suite must never run under a service worker: cached modules would
// silently test yesterday's build (the stale-tab trap). Registration is
// production-only, but the dev opt-in flag exists, so clear the decks.
async function shedServiceWorker() {
  try {
    if ('serviceWorker' in navigator) {
      for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister();
    }
    if ('caches' in window) {
      for (const k of await caches.keys()) await caches.delete(k);
    }
  } catch { /* nothing registered — fine */ }
}

(async () => {
  await shedServiceWorker();
  seedOnboarding();
  seedWorkspace();
  const { frame, booted } = await appFrame();
  const suites = [];
  try { suites.push(['Security', await runSecurity()]); }
  catch (e) { suites.push(['Security', { total: 1, failed: 1, results: [{ name: 'suite crashed', pass: false, detail: String(e) }] }]); }
  try { suites.push(['Audio contract', await runAudio()]); }
  catch (e) { suites.push(['Audio contract', { total: 1, failed: 1, results: [{ name: 'suite crashed', pass: false, detail: String(e) }] }]); }
  // The regression suite is the only one that drives the app, so it is the
  // only one a dead frame invalidates. Security and Audio stand on their own
  // and still run. Refusing to run it is the point: a number produced
  // against a blank document is worse than no number, because it looks like
  // one.
  if (!booted) {
    suites.push(['Launch regression', { total: 1, failed: 1, results: [{
      name: 'DID NOT RUN — the app never rendered in the runner frame',
      pass: false,
      detail: 'No .side-nav .side-item appeared within 5s. Every DOM-driven check '
        + 'would have run against a blank document and reported a short, meaningless '
        + 'count. Open ../index.html directly and look at the console before trusting '
        + 'anything else on this page.' }] }]);
  } else {
    try { suites.push(['Launch regression', await runRegression({ navDoc: frame.contentDocument })]); }
    catch (e) { suites.push(['Launch regression', { total: 1, failed: 1, results: [{ name: 'suite crashed', pass: false, detail: String(e) }] }]); }
  }

  const total = suites.reduce((n, [, o]) => n + o.total, 0);
  const failed = suites.reduce((n, [, o]) => n + o.failed, 0);
  suites.forEach(([name, out]) => drawSuite(name, out));
  statusEl.textContent = `${suites.length} suites · ${total} checks · ${failed} failure${failed === 1 ? '' : 's'}`;
  verdictEl.hidden = false;
  verdictEl.textContent = failed === 0 ? 'PASSED' : 'FAILED';
  verdictEl.className = failed === 0 ? 'pass' : 'fail';

  // THE CHECK COUNT IS THE TELL, so say it on the page rather than leaving
  // it to be remembered. A run that did not boot cannot be compared to one
  // that did, and the difference is easy to miss when both end in a number.
  if (!booted) {
    const warn = document.createElement('p');
    warn.className = 'warn';
    warn.textContent = 'The app never rendered in the frame, so the regression suite did not run. '
      + 'This count is NOT comparable to a normal run. The frame is left in place below so you can see what it is showing.';
    statusEl.after(warn);
  }
  // Left in place after a failed boot: an empty frame is the evidence.
  if (booted) frame.remove();
})();
