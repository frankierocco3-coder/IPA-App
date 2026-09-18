// Approximate-IPA derivation and the per-word pronunciation editor
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { clearOverridesFor, deletePersonal, resolvePronunciation, setOccurrenceOverride, setPersonal, setProjectWordOverride, validateIpa } from '../overrides.js';
import { getProject, saveProject } from '../projects.js';
import { ipaFor, loadPron } from '../pron.js';
import { esc, openModal } from '../ui.js';
import { TEXT_DIALECTS, dialectName } from './context.js';

// Bracketed stage directions removed for anything SPOKEN — narration
// like "[He exits]" is never read aloud or transcribed.
export const stripStage = s => s.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
export async function fillSound(lines, accent, pane, opts = {}) {
  try { await loadPron(); }
  catch {
    pane.innerHTML = `<p class="pane-note">Couldn’t load the pronunciation dictionary — check your connection and reopen this tab.</p>`;
    return;
  }
  const projectId = opts.projectId ?? null;
  let project = projectId ? await getProject(projectId) : null;

  const draw = () => {
    let approxSeen = false, miss = 0, edited = 0;
    const linesHtml = lines.map((ln, i) => {
      const toks = stripStage(ln).split(/(\s+)/);
      let wordIdx = -1;
      const html = toks.map(tok => {
        if (/^\s*$/.test(tok)) return tok === '' ? '' : '<span class="scan-sp"> </span>';
        wordIdx++;
        const base = ipaFor(tok, accent);
        const res = resolvePronunciation({
          word: tok, accent, project, lineIdx: i, wordIdx, base,
        });
        const editable = `data-word="${esc(tok)}" data-line="${i}" data-widx="${wordIdx}"`;
        if (!res) {
          miss++;
          return `<span class="tw"><button class="tw-word" type="button" ${editable}>${esc(tok)}</button><span class="tw-ipa tw-miss">—</span></span>`;
        }
        if (res.source === 'dictionary' && res.approx) approxSeen = true;
        const custom = res.source !== 'dictionary';
        if (custom) edited++;
        return `<span class="tw"><button class="tw-word ${custom ? 'is-custom' : ''}" type="button" ${editable}>${esc(tok)}</button>` +
               `<span class="tw-ipa ${custom ? 'is-custom' : ''}" title="${custom ? esc(res.source) + ' override' : ''}">/${esc(res.ipa)}/</span></span>`;
      }).join('');
      return `<div class="tw-line"><span class="ln-num">${i + 1}</span><span class="tw-words">${html}</span></div>`;
    }).join('');

    pane.innerHTML = `
      <p class="pane-note">Transcribed to IPA in <b>${esc(dialectName(accent))}</b>${approxSeen ? ' <span class="approx">≈ non-American dialects are rule-derived, not dictionary-exact</span>' : ''}.${miss ? ` <span class="approx">${miss} word${miss === 1 ? ' is' : 's are'} not in the dictionary (marked —) — names and invented words need your ear: tap one to supply its pronunciation.</span>` : ''}
        Tap any word to correct it.${edited ? ` <span class="approx">${edited} customised.</span>` : ''}</p>
      <div class="son-transcribe">${linesHtml}</div>`;

    pane.querySelectorAll('.tw-word').forEach(b =>
      b.addEventListener('click', () => openWordEditor({
        word: b.dataset.word, accent, project, projectId,
        lineIdx: +b.dataset.line, wordIdx: +b.dataset.widx,
        onSaved: async () => { if (projectId) project = await getProject(projectId); draw(); },
      })));
  };
  draw();
}
export function openWordEditor({ word, accent, project, projectId, lineIdx, wordIdx, onSaved }) {
  const base = ipaFor(word, accent);
  const current = resolvePronunciation({ word, accent, project, lineIdx, wordIdx, base });
  const generated = base?.ipa ?? '';
  // Alternates the built-in data can offer: the same word read in the other dialects.
  const alts = TEXT_DIALECTS.map(d => d.id)
    .filter(a => a !== accent)
    .map(a => ({ accent: a, ipa: ipaFor(word, a)?.ipa }))
    .filter(a => a.ipa && a.ipa !== generated);

  const scopeOpts = [
    ['occurrence', 'This occurrence only', !projectId],
    ['project', 'All matching words in this project', !projectId],
    ['personal', 'Save to my personal dictionary', false],
  ];

  openModal({
    title: `Pronunciation of “${word}”`,
    body: `
      <dl class="we-facts">
        <div><dt>Word</dt><dd>${esc(word)}</dd></div>
        <div><dt>Dialect</dt><dd>${esc(dialectName(accent) || accent)}</dd></div>
        <div><dt>Generated</dt><dd>${generated ? `/${esc(generated)}/` : '<i>not in the dictionary</i>'}</dd></div>
        ${current && current.source !== 'dictionary' ? `<div><dt>Now using</dt><dd class="is-custom">/${esc(current.ipa)}/ <span class="src-tag">${esc(current.source)}</span></dd></div>` : ''}
      </dl>
      ${alts.length ? `<div class="we-alts"><span class="field-label">Alternates</span>${alts.map(a =>
        `<button class="chip-pick ipa" type="button" data-alt="${esc(a.ipa)}">/${esc(a.ipa)}/ <span class="alt-src">${esc(dialectName(a.accent) || a.accent)}</span></button>`).join('')}</div>` : ''}
      <label class="field"><span class="field-label" id="we-ipa-label">IPA</span>
        <input class="input-text ipa-input" id="we-ipa" aria-labelledby="we-ipa-label" value="${esc(current?.ipa ?? generated)}" placeholder="e.g. ˈaɪðər" autocomplete="off"></label>
      <p class="we-warn" id="we-warn" role="alert" hidden></p>
      <label class="field"><span class="field-label">Note (optional)</span>
        <input class="input-text" id="we-note" maxlength="140" value="${esc(current?.note ?? '')}" placeholder="e.g. director wants the British form"></label>
      <fieldset class="field"><legend class="field-label">Apply to</legend>
        ${scopeOpts.map(([v, l, dis], i) => `
          <label class="we-scope ${dis ? 'is-off' : ''}">
            <input type="radio" name="we-scope" value="${v}" ${i === (projectId ? 0 : 2) ? 'checked' : ''} ${dis ? 'disabled' : ''}>
            <span>${l}${dis ? ' <i>(open from a project)</i>' : ''}</span>
          </label>`).join('')}
      </fieldset>`,
    actions: `
      <button class="btn btn-lite" id="we-reset" type="button">Reset to generated</button>
      <button class="btn btn-primary" id="we-save" type="button">Save</button>`,
    onMount: (root, close) => {
      const ipaInput = root.querySelector('#we-ipa');
      const warn = root.querySelector('#we-warn');
      root.querySelectorAll('[data-alt]').forEach(b =>
        b.addEventListener('click', () => { ipaInput.value = b.dataset.alt; ipaInput.focus(); }));

      root.querySelector('#we-save').addEventListener('click', async () => {
        const check = validateIpa(ipaInput.value);
        if (!check.ok) { warn.hidden = false; warn.textContent = check.error; return; }
        if (check.warning) { warn.hidden = false; warn.textContent = check.warning; }
        const scope = root.querySelector('input[name="we-scope"]:checked')?.value ?? 'personal';
        const note = root.querySelector('#we-note').value.trim();
        try {
          if (scope === 'personal') {
            setPersonal({ word, accent, ipa: check.ipa, note });
          } else if (projectId) {
            let p = await getProject(projectId);
            p = scope === 'occurrence'
              ? setOccurrenceOverride(p, { lineIdx, wordIdx, ipa: check.ipa, note })
              : setProjectWordOverride(p, { word, accent, ipa: check.ipa, note });
            await saveProject(p);
          }
          close();
          onSaved?.();
        } catch (err) {
          warn.hidden = false; warn.textContent = 'Could not save that override.';
          console.warn(err);
        }
      });

      root.querySelector('#we-reset').addEventListener('click', async () => {
        if (!confirm('Reset this word to the generated pronunciation?')) return;
        deletePersonal(word, accent);
        if (projectId) {
          let p = await getProject(projectId);
          p = clearOverridesFor(p, { word, accent, lineIdx, wordIdx });
          await saveProject(p);
        }
        close();
        onSaved?.();
      });
    },
  });
}
