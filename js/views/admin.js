// Owner-only pages: the audio ear-check (#audit) and the content review (#review)
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { stopSpeech, audioUrl } from '../audio.js';
import { ACTING_APPROACHES } from '../data/acting/approaches.js';
import { actionDrafts } from '../data/dialect-in-action.js';
import { KNOWN_BAD as KNOWN_BAD_LIST } from '../data/audio-flags.js';
import { bridgeDrafts } from '../data/bridge.js';
import { EDITION_CATALOG_COMPLETE, EDITION_CHUNKS, LEGACY_SONNETS, editionFor, editionStatus } from '../data/editions/index.js';
import { RECASTS, TRANSPOSITION_LABELS, approvedTranspositions } from '../data/recasts.js';
import { SONNETS } from '../data/sonnets.js';
import { SPEECH_COMFORT_LINE, SPEECH_LESSONS, SPEECH_SAFETY_LINE } from '../data/speech/speech-course.js';
import { speechApproved, speechPublished } from '../data/speech/reviews.js';
import { PRACTICE_SUBJECTS, draftRoutines, learnerRoutines } from '../data/speech/routines.js';
import { SPEECH_TEXTS, speechTextBody } from '../data/speech/texts.js';
import { voicesForCourse } from '../data/voices.js';
import { phonemesForAccent } from '../engine.js';
import { app, esc, goHome, phonemeSlug, record } from '../ui.js';
import { actionPieceHtml, wireActionPiece } from './action-piece.js';

const AUDIT_KEY = 'speechcraft-audio-audit-v1';
const auditVerdicts = () => { try { return JSON.parse(localStorage.getItem(AUDIT_KEY)) ?? {}; } catch { return {}; } };
const saveVerdict = (id, v) => {
  const all = auditVerdicts();
  if (v) all[id] = v; else delete all[id];
  try { localStorage.setItem(AUDIT_KEY, JSON.stringify(all)); } catch {}
};
export async function renderAudioAudit(filters = { d: 'all', v: 'all', kind: 'all', status: 'all' }) {
  stopSpeech();
  let index = {};
  let phonIndex = {};
  try { index = await (await fetch(audioUrl('index.json'))).json(); } catch { /* rows empty */ }
  try { phonIndex = await (await fetch(audioUrl('phonemes-index.json'))).json(); } catch { /* none yet */ }
  const verdicts = auditVerdicts();
  KNOWN_BAD_LIST.forEach(id => { if (!verdicts[id]) verdicts[id] = 'bad'; });

  const rows = [];
  for (const d of Object.keys(index)) {
    for (const v of Object.keys(index[d])) {
      for (const clip of index[d][v]) {
        rows.push({ id: `${d}/${v}/${clip}`, d, v, clip, kind: 'word', path: audioUrl(`${d}/${v}/${clip}.mp3`) });
      }
    }
  }
  for (const d of ['nam', 'rp', 'aus', 'ssbe']) {
    // Voice keys come from the candidate index itself (so a human
    // 'reference' voice shows up the moment its files are imported); with
    // no candidates on disk yet, fall back to the expected keys so the
    // grid still works as a to-record checklist.
    const named = voicesForCourse(d).map(v => v.id);
    const onDisk = Object.keys(phonIndex[d] ?? {});
    const voiceKeys = onDisk.length ? onDisk : (named.length ? named : ['f', 'm']);
    for (const sym of phonemesForAccent(d)) {
      const slug = phonemeSlug(sym);
      for (const v of voiceKeys) {
        const candidates = phonIndex[d]?.[v] ?? [];
        for (const s2 of [slug, slug + '_syllable']) {
          if (s2.endsWith('_syllable') && !candidates.includes(s2)) continue;
          rows.push({ id: `${d}/${v}/${s2}`, d, v, slug: s2,
            clip: `/${sym}/${s2.endsWith('_syllable') ? ' — syllable demo' : ' — isolated'}`, kind: 'phoneme',
            path: audioUrl(`phonemes/${d}/${v}/${s2}.mp3`),
            missing: !candidates.includes(s2) });
        }
      }
    }
  }

  const f = filters;
  const shown = rows.filter(r =>
    (f.d === 'all' || r.d === f.d) &&
    (f.v === 'all' || r.v === f.v) &&
    (f.kind === 'all' || r.kind === f.kind) &&
    (f.status === 'all'
      || (f.status === 'missing' && r.missing)
      || (f.status === 'bad' && verdicts[r.id] === 'bad')
      || (f.status === 'good' && verdicts[r.id] === 'good')
      || (f.status === 'unreviewed' && !r.missing && !verdicts[r.id])));
  const CAP = 300;

  const sel = (id, opts, cur) => `
    <select id="${id}" class="input-text audit-sel">
      ${opts.map(o => `<option value="${o}" ${o === cur ? 'selected' : ''}>${o}</option>`).join('')}
    </select>`;

  app.innerHTML = `
    <header class="topbar">
      <button class="backbtn" id="audit-exit" aria-label="Back to the app" title="Back to the app">‹</button>
      <div class="track-title" style="color:#566377">🎧 Audio audit</div>
      <div class="stats"><span class="stat">${shown.length} clips</span></div>
    </header>
    <main class="guide audit-page">
      <p class="pane-note">Owner tool. Play each clip, mark it — <b>Good</b> means a learner may hear it, <b>Bad</b> quarantines it. Export writes a new <code>js/data/audio-flags.js</code> to commit.</p>
      <div class="audit-filters">
        ${sel('af-d', ['all', 'nam', 'rp', 'aus', 'ssbe', 'cockney'], f.d)}
        ${sel('af-v', ['all', ...new Set(rows.map(r => r.v))], f.v)}
        ${sel('af-kind', ['all', 'word', 'phoneme'], f.kind)}
        ${sel('af-status', ['all', 'unreviewed', 'good', 'bad', 'missing'], f.status)}
        <button class="btn" id="audit-export" type="button">Export flags</button>
      </div>
      <textarea id="audit-out" class="input-text audit-out" hidden rows="10" aria-label="Exported audio-flags.js"></textarea>
      <div class="audit-rows">
        ${shown.slice(0, CAP).map(r => `
          <div class="audit-row ${verdicts[r.id] ?? ''}" data-id="${esc(r.id)}">
            ${r.missing ? '<span class="audit-play is-off" title="No clip yet">∅</span>'
              : `<button class="audit-play" data-path="${esc(r.path)}" type="button" aria-label="Play ${esc(r.id)}">▶</button>`}
            <span class="audit-name">${esc(r.clip)}</span>
            <span class="audit-meta">${r.d}/${r.v} · ${r.kind}${r.slug ? ` · ${esc(r.slug)}` : ''}${r.missing ? ' · missing' : ''}</span>
            ${r.missing ? '' : `
              <span class="audit-verdict">
                <button class="btn-lite av-good" type="button" aria-pressed="${verdicts[r.id] === 'good'}">Good</button>
                <button class="btn-lite av-bad" type="button" aria-pressed="${verdicts[r.id] === 'bad'}">Bad</button>
              </span>`}
          </div>`).join('')}
        ${shown.length > CAP ? `<p class="pane-note">Showing ${CAP} of ${shown.length} — narrow the filters.</p>` : ''}
      </div>
    </main>`;

  document.getElementById('audit-exit').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname);
    goHome();
  });
  [['af-d', 'd'], ['af-v', 'v'], ['af-kind', 'kind'], ['af-status', 'status']].forEach(([id, key]) =>
    document.getElementById(id).addEventListener('change', e =>
      renderAudioAudit({ ...f, [key]: e.target.value })));

  let playing = null;
  app.querySelectorAll('.audit-play[data-path]').forEach(b =>
    b.addEventListener('click', () => {
      if (playing) playing.pause();
      playing = new Audio(b.dataset.path);
      playing.play().catch(() => { b.textContent = '✗'; b.title = 'File failed to load'; });
    }));

  app.querySelectorAll('.audit-row').forEach(row => {
    const id = row.dataset.id;
    row.querySelector('.av-good')?.addEventListener('click', () => {
      const cur = auditVerdicts()[id];
      saveVerdict(id, cur === 'good' ? null : 'good');
      renderAudioAudit(f);
    });
    row.querySelector('.av-bad')?.addEventListener('click', () => {
      const cur = auditVerdicts()[id];
      const marking = cur !== 'bad';
      saveVerdict(id, marking ? 'bad' : null);
      if (marking) {
        const note = window.prompt('Optional note — what is wrong with this clip?', '');
        try {
          const notes = JSON.parse(localStorage.getItem(AUDIT_KEY + '-notes')) ?? {};
          if (note) notes[id] = note.slice(0, 140); else delete notes[id];
          localStorage.setItem(AUDIT_KEY + '-notes', JSON.stringify(notes));
        } catch { /* note is a nicety */ }
      }
      renderAudioAudit(f);
    });
  });

  document.getElementById('audit-export').addEventListener('click', () => {
    const all = auditVerdicts();
    KNOWN_BAD_LIST.forEach(id => { if (!all[id]) all[id] = 'bad'; });
    const bad = Object.keys(all).filter(k => all[k] === 'bad').sort();
    const phonemeIds = new Set(rows.filter(r => r.kind === 'phoneme').map(r => r.id));
    const approved = Object.keys(all).filter(k => all[k] === 'good' && phonemeIds.has(k)).sort();
    let notes = {};
    try { notes = JSON.parse(localStorage.getItem(AUDIT_KEY + '-notes')) ?? {}; } catch {}
    const goodSsbe = Object.keys(all).filter(k => all[k] === 'good' && k.startsWith('ssbe/')).length;
    const out = document.getElementById('audit-out');
    out.hidden = false;
    out.value = [
      '// Generated by the #audit page on ' + new Date().toISOString().slice(0, 10) + ' — review, then replace js/data/audio-flags.js.',
      goodSsbe ? `// ssbe review: ${goodSsbe} clip(s) marked good this session.` : '',
      'export const KNOWN_BAD = [',
      ...bad.map(x => `  '${x}',${notes[x] ? `   // ${notes[x].replace(/\n/g, ' ')}` : ''}`),
      '];', '',
      'export const APPROVED_PHONEMES = [', ...approved.map(x => `  '${x}',`), '];', '',
    ].filter(l => l !== '').join('\n');
    out.focus();
    out.select();
  });
}
// ── Content review (#review) — owner gate for written drafts ──
// The writing counterpart to #audit: every Dialect in Action piece and
// sonnet transposition still awaiting review, rendered exactly as a
// learner would see it. Approval is a deliberate file edit (reviewStatus
// in js/data/dialect-in-action.js, TRANSPOSITION_REVIEW in js/data/recasts.js) —
// nothing on this page can publish anything by accident.
export function renderContentReview() {
  stopSpeech();
  const drafts = actionDrafts();
  const transDrafts = [];
  for (const n of Object.keys(RECASTS)) {
    for (const d of Object.keys(RECASTS[n].recasts ?? {})) {
      if (!approvedTranspositions(+n).includes(d)) {
        transDrafts.push({ n: +n, d, text: RECASTS[n].recasts[d] });
      }
    }
  }
  const brDrafts = bridgeDrafts();
  const brComps = brDrafts.reduce((n, r) => n + r.comparisons.length, 0);
  const revLine = (label, r) => `${label}: <b>${esc(r?.status ?? 'pending')}</b>${r?.reviewer ? ` — ${esc(r.reviewer)}${r.date ? `, ${esc(r.date)}` : ''}` : ''}`;
  app.innerHTML = `
    <header class="topbar">
      <button class="backbtn" id="review-exit" aria-label="Back to the app" title="Back to the app">‹</button>
      <div class="track-title" style="color:#566377">📝 Content review</div>
      <div class="stats"><span class="stat">${drafts.length + transDrafts.length} + ${brDrafts.length} drafts</span></div>
    </header>
    <main class="guide audit-page">
      <p class="pane-note">Owner tool, reached by typing <code>#review</code> — it is NOT authenticated, so treat everything here as public. Nothing below is on a learner surface. To approve: set the status fields in <code>js/data/dialect-in-action.js</code>, <code>js/data/recasts.js</code>, <code>js/data/bridge.js</code> or <code>js/data/edition-reviews.js</code>, record the reviewer, and commit. Approved pieces appear on their learner surfaces automatically — Dialect in Action in the Library, Accent Bridge under Practice, sonnet editions in Scripts &amp; Speeches. Nothing here may be batch-approved, and Claude may never approve its own writing. The prepared review packet — per-item concerns, checklists and per-claim citations — is <code>docs/REVIEW_PACKET_v1.md</code>.</p>

      <h1>The original 23-item queue</h1>
      <p class="pane-note">${drafts.length} Dialect in Action piece(s) + ${transDrafts.length} sonnet transposition(s) = the original ${drafts.length + transDrafts.length}-item review queue.</p>

      <h2 class="guide-heading">Dialect in Action — ${drafts.length} draft piece(s)</h2>
      <p class="pane-note">Required reviewers, per piece: a <b>literary</b> read (rhythm, register, no parody) and a <b>dialect</b> read by a native or expert speaker of the course accent.</p>
      ${drafts.map(p => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(p.id)}</code> · ${esc(p.courseId)} · status <b>${esc(p.reviewStatus)}</b> ·
            ${revLine('literary', p.review?.literary)} · ${revLine('dialect', p.review?.dialect)}</p>
          ${actionPieceHtml(p)}
          <p class="pane-note">Reviewer notes: ${esc(p.reviewNotes)}</p>
        </section>`).join('')}

      <h2 class="guide-heading">Sonnet transpositions — ${transDrafts.length} draft version(s)</h2>
      <p class="pane-note">Checklist: docs/RECAST_REVIEW.md — faithfulness to argument, imagery and emotional progression; dialect register; no parody.</p>
      ${transDrafts.map(t => `
        <section class="review-piece">
          <p class="sonnet-hint">Sonnet ${t.n} · ${esc(TRANSPOSITION_LABELS[t.d] ?? t.d)} · status <b>draft</b></p>
          <div class="sonnet-lines">${t.text.split('\n').map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>
        </section>`).join('')}

      <h1 id="bridge-drafts">Accent Bridge routes — ${brDrafts.length} new draft route(s)</h1>
      <p class="pane-note">Build D drafts, listed separately — <b>not</b> part of the original 23. ${brComps} comparison(s) across ${brDrafts.length} route(s). Required reviewer: a <b>dialect/accent</b> reviewer qualified in both ends of each route. Every phonetic claim restates the Dialect Accuracy Standard; the reviewer confirms the restatement, the example words and the articulation guidance.</p>
      ${brDrafts.map(r => `
        <section class="review-piece">
          <p class="sonnet-hint">route <code>${esc(r.id)}</code> · ${esc(r.title)} · ${r.comparisons.length} draft comparison(s)</p>
          <p class="guide-text">${esc(r.intro)}</p>
          ${r.comparisons.map(c => `
            <div class="bridge-card">
              <div class="idiom-head"><span class="idiom-term">${esc(c.feature)}</span><span class="tag">${esc(c.lexicalSet)}</span></div>
              <p class="bridge-pair"><span class="ipa-chip">/${esc(c.startIPA)}/</span> <span aria-hidden="true">→</span>
                <span class="ipa-chip is-target">/${esc(c.targetIPA)}/</span> <span class="bridge-word">“${esc(c.word)}”</span></p>
              <p class="guide-note"><b>Stays:</b> ${esc(c.stays)}</p>
              <p class="guide-note"><b>Changes:</b> ${esc(c.changes)}</p>
              <p class="guide-note"><b>Lips:</b> ${esc(c.guidance.lips)} <b>Tongue:</b> ${esc(c.guidance.tongue)} <b>Jaw:</b> ${esc(c.guidance.jaw)} <b>Voice:</b> ${esc(c.guidance.voice)}</p>
            </div>`).join('')}
          ${r.sourceNote ? `<p class="pane-note">${esc(r.sourceNote)}</p>` : ''}
        </section>`).join('')}

      <h1 id="edition-drafts">Sonnet editions — the Build F written catalog</h1>
      <p class="pane-note">New drafts, tracked in <code>js/data/edition-reviews.js</code> —
        listed separately from the original 23. Coverage so far:
        ${EDITION_CHUNKS.length ? EDITION_CHUNKS.map(c => `${c.from}–${c.to}`).join(', ') : 'none yet'}
        (${EDITION_CHUNKS.reduce((s, c) => s + c.expect, 0)} new sonnets ×
        Plain Meaning + 3 voices)${EDITION_CATALOG_COMPLETE ? ' — CATALOG COMPLETE (149 new + 5 pilots = 154)' : ' — catalog in progress'}.
        The five pilots (${LEGACY_SONNETS.join(', ')}) stay in the original queue above.
        Plain Meaning needs a literary review; each voice needs literary AND
        dialect/register review. Enter a sonnet number to inspect its drafts.</p>
      <div class="proj-toolbar">
        <label class="field-label" for="ed-n">Sonnet</label>
        <input class="input-sel" id="ed-n" type="number" min="1" max="154" value="1" style="width:6em">
        <button class="btn-lite" id="ed-show" type="button">Show drafts</button>
      </div>
      <div id="ed-view"></div>

      <h1 id="speech-drafts">Speech system — draft content</h1>
      <p class="pane-note">The written Speech course and practice system (2026-08-13 build), tracked in
        <code>js/data/speech/reviews.js</code> — absence from that ledger means draft. Reviewer guide:
        <code>docs/SPEECH_REVIEW.md</code>. Professional-tier bodies (anatomy/health, acting methods)
        are never learner-facing while draft; editorial-tier drafts may show while pending. Claude may
        never approve his own writing.</p>

      <h2 class="guide-heading">Stage 1 anatomy &amp; vocal health — ${SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional' && !speechApproved(l.id)).length} lesson(s) awaiting voice-professional review</h2>
      <p class="pane-note">Required reviewer: an appropriately qualified <b>voice professional or speech-language pathologist</b>. Sources are paraphrased from NIDCD, ASHA and NIDCR public guidance — the reviewer confirms accuracy, non-diagnostic framing and the absence of prescriptive treatment.</p>
      ${SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional' && !speechApproved(l.id)).map(l => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(l.id)}</code> · ${esc(l.title)} · status <b>${speechPublished(l.id) ? 'published (owner approval)' : 'draft'}</b> · awaiting voice-professional review</p>
          ${l.body.map(b => b.p ? `<p class="guide-text">${esc(b.p)}</p>`
            : b.h ? `<p class="guide-text"><b>${esc(b.h)}</b></p>`
            : b.list ? `<ul class="th-list">${b.list.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`
            : b.safety ? `<p class="pane-note pane-warn">${esc(SPEECH_SAFETY_LINE)}</p>`
            : b.comfort ? `<p class="pane-note">${esc(SPEECH_COMFORT_LINE)}</p>` : '').join('')}
          ${(l.sources ?? []).map(s => `<p class="pane-note">Source: ${esc(s)}</p>`).join('')}
        </section>`).join('')}

      <h2 class="guide-heading">Approaches to Acting — ${ACTING_APPROACHES.filter(a => !speechApproved(a.id)).length} introduction(s) awaiting acting-professional review</h2>
      <p class="pane-note">Required reviewer: a qualified <b>acting teacher or coach</b> — accuracy of history, principles and terminology; no flattened slogans; no implied affiliation.</p>
      ${ACTING_APPROACHES.filter(a => !speechApproved(a.id)).map(a => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(a.id)}</code> · ${esc(a.name)} · ${esc(a.era)} · status <b>${speechPublished(a.id) ? 'published (owner approval)' : 'draft'}</b> · awaiting acting-professional review</p>
          ${['background', 'principles', 'terminology', 'considers', 'misunderstandings', 'sources']
            .map(k => `<p class="guide-text"><b>${esc(k)}:</b> ${esc(a.sections[k])}</p>`).join('')}
          <ul class="th-list">${a.sections.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>
        </section>`).join('')}

      <h2 class="guide-heading">Guided Practice routines — ${draftRoutines().length} draft(s) + ${learnerRoutines().length} in the reviewed batch</h2>
      <p class="pane-note">The eight batch-1 Train routines are learner-facing pending <b>editorial</b> review; the sixteen Prepare/Apply drafts below are review-area-only until reviewed and batched by the owner.</p>
      ${draftRoutines().map(r => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(r.id)}</code> · ${esc(r.title)} (${esc(r.mode)}, ${esc(PRACTICE_SUBJECTS.find(s => s.id === r.subject)?.title ?? r.subject)}) · status <b>draft</b></p>
          <ul class="th-list">${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </section>`).join('')}

      <h2 class="guide-heading">Practice texts — ${SPEECH_TEXTS.filter(t => !speechApproved(t.id)).length} awaiting editorial review</h2>
      <p class="pane-note">Original Speechcraft writing (provenance recorded per record). Learner-facing pending <b>editorial</b> review, per the accepted editorial-tier policy.</p>
      ${SPEECH_TEXTS.filter(t => !speechApproved(t.id)).map(t => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(t.id)}</code> · ${esc(t.title)} (${esc(t.kind)}) · ${esc(t.provenance)} · status <b>draft</b></p>
          <div class="sonnet-lines">${esc(speechTextBody(t)).split('\n').map(l => `<p class="guide-text">${l}</p>`).join('')}</div>
        </section>`).join('')}
    </main>`;
  document.getElementById('review-exit').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname);
    goHome();
  });
  wireActionPiece(app);

  // Edition-draft inspector: loads ONE sonnet's chunk on demand — the
  // review page never parses the whole catalog either.
  const edView = document.getElementById('ed-view');
  document.getElementById('ed-show').addEventListener('click', async () => {
    const n = +document.getElementById('ed-n').value;
    edView.innerHTML = '<p class="pane-note">Loading…</p>';
    const orig = SONNETS.find(x => x.n === n);
    const ed = await editionFor(n).catch(() => null);
    if (!orig) { edView.innerHTML = '<p class="pane-note">No such sonnet.</p>'; return; }
    if (!ed) { edView.innerHTML = `<p class="pane-note">Sonnet ${n}: edition batch not written yet.</p>`; return; }
    if (ed.legacy) {
      edView.innerHTML = `<p class="pane-note">Sonnet ${n} is one of the five pilots — its transpositions live in the original 23-item queue above (js/data/recasts.js).</p>`;
      return;
    }
    const block = (label, kind, text) => `
      <section class="review-piece">
        <p class="sonnet-hint">Sonnet ${n} · ${esc(label)} · status <b>${esc(editionStatus(n, kind))}</b>
          ${kind === 'plain' ? '· requires literary review' : '· requires literary + dialect/register review'}</p>
        <div class="sonnet-lines">${String(text).split('\n').map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>
      </section>`;
    edView.innerHTML = `
      <section class="review-piece">
        <p class="sonnet-hint">Sonnet ${n} · Original (byte-locked, not under review)</p>
        <div class="sonnet-lines">${orig.lines.map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>
      </section>
      ${block('Plain Meaning', 'plain', ed.plain)}
      ${block('In Today’s Voice — Neutral American', 'nam', ed.voices.nam)}
      ${block('In Today’s Voice — Standard British', 'ssbe', ed.voices.ssbe)}
      ${block('In Today’s Voice — Australian', 'aus', ed.voices.aus)}
      <p class="pane-note">Traditional RP deliberately has no vocabulary adaptation — RP is a pronunciation target, not a modern slang register. Its course shows Original + Plain Meaning (once approved).</p>`;
  });
}
