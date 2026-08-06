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

function appFrame() {
  return new Promise(resolve => {
    const f = document.createElement('iframe');
    // Same-origin framing is explicitly allowed by the app's clickjacking
    // guard (an attacker cannot serve from this origin), so the runner can
    // host it plainly — no sandbox tricks needed.
    f.src = '../index.html';
    f.addEventListener('load', async () => {
      for (let i = 0; i < 50; i++) {                       // up to ~5s for the shell
        if (f.contentDocument?.querySelector('.side-nav .side-item')) break;
        await new Promise(r => setTimeout(r, 100));
      }
      resolve(f);
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

(async () => {
  seedOnboarding();
  const frame = await appFrame();
  const suites = [];
  try { suites.push(['Security', await runSecurity()]); }
  catch (e) { suites.push(['Security', { total: 1, failed: 1, results: [{ name: 'suite crashed', pass: false, detail: String(e) }] }]); }
  try { suites.push(['Audio contract', await runAudio()]); }
  catch (e) { suites.push(['Audio contract', { total: 1, failed: 1, results: [{ name: 'suite crashed', pass: false, detail: String(e) }] }]); }
  try { suites.push(['Launch regression', await runRegression({ navDoc: frame.contentDocument })]); }
  catch (e) { suites.push(['Launch regression', { total: 1, failed: 1, results: [{ name: 'suite crashed', pass: false, detail: String(e) }] }]); }

  const total = suites.reduce((n, [, o]) => n + o.total, 0);
  const failed = suites.reduce((n, [, o]) => n + o.failed, 0);
  suites.forEach(([name, out]) => drawSuite(name, out));
  statusEl.textContent = `${suites.length} suites · ${total} checks · ${failed} failure${failed === 1 ? '' : 's'}`;
  verdictEl.hidden = false;
  verdictEl.textContent = failed === 0 ? 'PASSED' : 'FAILED';
  verdictEl.className = failed === 0 ? 'pass' : 'fail';
  frame.remove();
})();
