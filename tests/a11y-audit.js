// Accessibility audit for the page currently rendered in #app (and the
// shell around it). Run in the browser console on the dev server:
//   const a = await import('./tests/a11y-audit.js'); a.audit()
// Returns problems as plain objects; nothing is changed. tests/ never ships.
//
// Checks: images without alt, controls without an accessible name, form
// fields without a label, positive tabindex, mouse-only click targets, and
// WCAG 2.1 AA text contrast (4.5:1, or 3:1 for large text) against the
// effective background. Text over images or gradients is reported as
// 'unknown', never guessed.

const visible = el => {
  const s = getComputedStyle(el);
  if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
};
const describe = el => {
  const id = el.id ? '#' + el.id : '';
  const cls = typeof el.className === 'string' && el.className.trim()
    ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
  return `${el.tagName.toLowerCase()}${id}${cls} “${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40)}”`;
};

function accessibleName(el) {
  const lb = el.getAttribute('aria-labelledby');
  if (lb) return lb.split(/\s+/).map(i => document.getElementById(i)?.textContent ?? '').join(' ').trim();
  return (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title')
    || el.querySelector('img[alt]')?.getAttribute('alt') || el.value || '').trim();
}

function fieldLabelled(el) {
  if (el.type === 'hidden') return true;
  if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.title) return true;
  if (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) return true;
  return !!el.closest('label');
}

// ── contrast ──
const parse = c => {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  return { r, g, b, a };
};
const lum = ({ r, g, b }) => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const over = (top, under) => ({
  r: top.r * top.a + under.r * (1 - top.a),
  g: top.g * top.a + under.g * (1 - top.a),
  b: top.b * top.a + under.b * (1 - top.a), a: 1,
});
function background(el) {
  const layers = [];
  for (let n = el; n; n = n.parentElement) {
    const s = getComputedStyle(n);
    if (s.backgroundImage && s.backgroundImage !== 'none') return null;   // image / gradient
    const c = parse(s.backgroundColor);
    if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
  }
  let bg = { r: 255, g: 255, b: 255, a: 1 };
  for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg);
  return bg;
}
function contrastProblems(root) {
  const out = [];
  const seen = new Set();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || seen.has(el) || !visible(el) || el.closest('[aria-hidden="true"], svg')) continue;
    seen.add(el);
    // Screen-reader-only text (a 1px clipped box) is never seen, and emoji
    // draw in their own colours, so CSS colour contrast does not apply.
    const box = el.getBoundingClientRect();
    if (box.width < 2 || box.height < 2) continue;
    if (/^[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}\s️‍]+$/u.test(t.textContent.trim())) continue;
    const s = getComputedStyle(el);
    const fg = parse(s.color);
    const bg = background(el);
    if (!fg) continue;
    if (!bg) { out.push({ kind: 'contrast-unknown', el: describe(el) }); continue; }
    const col = fg.a < 1 ? over(fg, bg) : fg;
    const L1 = lum(col), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(s.fontSize), bold = +s.fontWeight >= 700;
    const large = px >= 24 || (bold && px >= 18.66);
    const need = large ? 3 : 4.5;
    // Disabled controls are exempt under WCAG 1.4.3.
    if (ratio < need && !el.closest(':disabled, [aria-disabled="true"], .is-off')) {
      out.push({ kind: 'contrast', el: describe(el), ratio: +ratio.toFixed(2), need,
        fg: s.color, bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})` });
    }
  }
  return out;
}

export function audit(root = document.body) {
  const problems = [];
  if (!document.documentElement.lang) problems.push({ kind: 'html-lang', el: 'html' });
  for (const img of root.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) problems.push({ kind: 'img-no-alt', el: describe(img), src: img.getAttribute('src') });
  }
  for (const el of root.querySelectorAll('button, a[href], [role="button"], [role="link"], [role="tab"], summary')) {
    if (!visible(el)) continue;
    if (!accessibleName(el)) problems.push({ kind: 'control-no-name', el: el.outerHTML.slice(0, 120) });
  }
  for (const el of root.querySelectorAll('input, select, textarea')) {
    if (!visible(el)) continue;
    if (!fieldLabelled(el)) problems.push({ kind: 'field-no-label', el: el.outerHTML.slice(0, 120) });
  }
  for (const el of root.querySelectorAll('[tabindex]')) {
    if (+el.getAttribute('tabindex') > 0) problems.push({ kind: 'positive-tabindex', el: describe(el) });
  }
  for (const el of root.querySelectorAll('[onclick], [role="button"]')) {
    if (el.matches('button, a[href], input, select, textarea, summary')) continue;
    if (!el.hasAttribute('tabindex')) problems.push({ kind: 'mouse-only', el: describe(el) });
  }
  problems.push(...contrastProblems(root));
  return problems;
}
