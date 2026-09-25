// The IPA reference: the chart, the sound pages, What Is IPA? and their shared bits
//
// Moved out of js/main.js by the 2026-09 split. No behaviour
// change: every declaration keeps its name and its body.

import { ACCENT_LANG, clipIndexLoaded, hasPhonemeClip, hasWordClip, playPhoneme, speak, stopSpeech } from '../audio.js';
import { artFor, chartFor } from '../data/articulation-art.js';
import { articulationFor } from '../data/articulation.js';
import { videoFor } from '../data/media-videos.js';
import { PHONEMES } from '../data/phonemes.js';
import { articulationSVG, guideSVG } from '../diagram.js';
import { phonemesForAccent } from '../engine.js';
import { startRecording, stopRecording } from '../perform.js';
import { tryItHtml } from '../record-ui.js';
import { store } from '../state.js';
import { app, esc, goBack, goSection, navStack, navTo, pageTopbar, phonemeSlug, record, wireBrandHome } from '../ui.js';
import { COURSES, activeCourse, setCourse, setWorkspace } from './context.js';

// A word control that is only playable when a real recording exists for
// this course. Missing → visibly unavailable, never a dead button and
// never device TTS. (Before the index loads, assume available.)
export const speakableWord = (w, acc) => !clipIndexLoaded() || hasWordClip(w, acc);
export const wordChip = (w, acc) => speakableWord(w, acc)
  ? `<button class="word-chip" data-say="${esc(w)}" type="button" aria-label="Hear the word “${esc(w)}”">🔊 ${esc(w)}</button>`
  : `<span class="word-chip is-off" role="note" aria-label="“${esc(w)}” — recording coming soon">${esc(w)} <small>· recording soon</small></span>`;
const WII_QUESTIONS = 5;   // ship-symbol + same-sound pair + 3 classifications
export function whatIsIpaCard() {
  const w = store.whatIsIpa;
  return `
    <button class="track-card wii-card" data-open-wii type="button" style="--track-color:#64748b">
      <div class="track-glyph" aria-hidden="true">💡</div>
      <div class="track-info">
        <h2>What Is IPA? ${w.done ? '<span class="tag tag-skill">✓ completed</span>' : ''}</h2>
        <p>Meet the alphabet of sounds — what it represents, why actors and language learners use it, and how to turn symbols into speech.</p>
        <p class="mode-meta">3-minute introduction · interactive${w.done ? ` · ${w.correct}/${WII_QUESTIONS} answered right` : ''}</p>
      </div>
      <div class="track-arrow">›</div>
    </button>`;
}
export function wireWhatIsIpaCard(container) {
  container.querySelectorAll('[data-open-wii]').forEach(b =>
    b.addEventListener('click', openWhatIsIpa));
}
export function openWhatIsIpa() {
  record(openWhatIsIpa);
  drawWhatIsIpa(0, { answered: {}, revealed: false });
}
// A word row with its transcription and a listen button.
const wiiWordRow = (word, ipa, note = '') => `
  <div class="guide-word">
    ${wordChip(word, 'nam')}
    <span class="guide-ipa">${esc(ipa)}</span>
    ${note ? `<span class="guide-note">${esc(note)}</span>` : ''}
  </div>`;
// A tappable sound chip: symbol + example word. Plays the WORD (labelled as
// such); flips to the isolated phoneme automatically once one is approved.
const wiiSoundChip = ph => {
  const p = PHONEMES[ph];
  const slug = phonemeSlug(ph);
  if (hasPhonemeClip(slug, 'nam')) {
    return `<span class="wii-sound-pair">
      <button class="word-chip" data-phoneme="${esc(slug)}" type="button"
        aria-label="Hear the isolated sound ${esc(ph)}">🔊 /${esc(ph)}/</button>
      <button class="word-chip" data-say="${esc(p.examples[0])}" type="button"
        aria-label="Hear the word “${esc(p.examples[0])}”">${esc(p.examples[0])}</button>
    </span>`;
  }
  return `<button class="word-chip" data-say="${esc(p.examples[0])}" type="button"
    aria-label="Hear the word “${esc(p.examples[0])}”, which contains ${esc(ph)}">/${esc(ph)}/ in “${esc(p.examples[0])}”</button>`;
};
// One-tap mini question. `key` tracks the answer in the module state so a
// question stays answered (and scored once) across Back/Continue.
export function wiiQuestion(st, key, prompt, options) {
  const answered = st.answered[key];
  return `
    <div class="mini-check" data-q="${key}">
      <p class="mini-prompt">${prompt}</p>
      <div class="mini-opts" role="group" aria-label="${esc(prompt.replace(/<[^>]+>/g, ''))}">
        ${options.map(o => `
          <button class="btn mini-opt ${answered !== undefined && o.ok ? 'right' : ''}" type="button"
            data-ok="${o.ok ? 1 : 0}" ${answered !== undefined ? 'disabled' : ''}>${o.label}</button>`).join('')}
      </div>
      <p class="mini-result" role="status">${answered === true ? '✓ Correct.' : answered === false ? 'Not quite — the marked answer is right.' : ''}</p>
    </div>`;
}
export function wireWiiQuestions(container, st, redraw) {
  container.querySelectorAll('.mini-check').forEach(box => {
    const key = box.dataset.q;
    box.querySelectorAll('.mini-opt').forEach(btn =>
      btn.addEventListener('click', () => {
        if (st.answered[key] !== undefined) return;
        const ok = btn.dataset.ok === '1';
        st.answered[key] = ok;
        btn.classList.add(ok ? 'right' : 'wrong');
        box.querySelectorAll('.mini-opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.ok === '1') b.classList.add('right');
        });
        box.querySelector('.mini-result').textContent =
          ok ? '✓ Correct.' : 'Not quite — the marked answer is right.';
      }));
  });
}
function wiiStepHtml(step, st) {
  switch (step) {
    case 0: return `
      <h1>What is IPA?</h1>
      <p class="guide-text">The International Phonetic Alphabet, or IPA, is a system for writing sounds. Unlike ordinary spelling, each symbol tells you what sound to make — not how a word happens to be spelled.</p>
      ${wiiWordRow('cat', '/kæt/', 'three letters, three sounds')}
      ${wiiWordRow('enough', '/ɪˈnʌf/', 'six letters, four sounds')}
      ${wiiWordRow('though', '/ðoʊ/', 'six letters, two sounds')}
      <p class="pane-note">These transcriptions are accent-aware — this is the Neutral American reading, and other accents can differ.</p>`;
    case 1: return `
      <h1>Why is it useful?</h1>
      <div class="guide-word"><span class="wii-who">🎭 Actors</span><span class="guide-note">learn an accent without depending on imitation alone</span></div>
      <div class="guide-word"><span class="wii-who">🌍 Language learners</span><span class="guide-note">see how a word is actually pronounced</span></div>
      <div class="guide-word"><span class="wii-who">🎵 Singers</span><span class="guide-note">identify vowels and consonants precisely</span></div>
      <div class="guide-word"><span class="wii-who">🎓 Teachers & coaches</span><span class="guide-note">communicate pronunciation consistently</span></div>
      <div class="guide-word"><span class="wii-who">🔬 Linguists</span><span class="guide-note">record and compare human speech</span></div>
      <p class="wii-callout">IPA gives you a map. Audio lets you hear the destination; IPA shows you how to find it again.</p>`;
    case 2: return `
      <h1>One symbol, one sound</h1>
      <p class="guide-text">Every symbol always means the same sound. Tap to hear each one inside a word${
        hasPhonemeClip(phonemeSlug('ʃ'), 'nam') ? ' — or tap the symbol to hear the bare sound by itself' : ''}:</p>
      <div class="chips">${['iː', 'æ', 'ɑ', 'ʃ', 'θ', 'ð', 'ŋ'].map(wiiSoundChip).join('')}</div>
      ${hasPhonemeClip(phonemeSlug('ʃ'), 'nam') ? ''
        : '<p class="pane-note">Isolated recordings of each bare sound are on the way — until then, every button plays the sound inside its word.</p>'}
      ${wiiQuestion(st, 'ship', 'Which symbol represents the <b>first sound</b> in “ship”?', [
        { label: '/s/', ok: false }, { label: '/ʃ/', ok: true }, { label: '/ɪ/', ok: false }, { label: '/θ/', ok: false },
      ])}`;
    case 3: return `
      <h1>IPA versus spelling</h1>
      <p class="guide-text">Spelling is a poor guide to sound:</p>
      <div class="guide-word"><span class="wii-who">c</span><span class="guide-note">“cat” /k/ and “city” /s/ — one letter, two sounds</span></div>
      <div class="guide-word"><span class="wii-who">ough</span><span class="guide-note">“though”, “thought”, “enough” — one spelling, three sounds</span></div>
      <div class="guide-word"><span class="wii-who">/iː/</span><span class="guide-note">“see”, “sea”, “scene” — one sound, three spellings</span></div>
      <p class="wii-callout">IPA describes pronunciation directly, without asking spelling for permission.</p>
      ${wiiQuestion(st, 'pair', 'Tap the pair that <b>starts with the same sound</b>:', [
        { label: 'cat · city', ok: false }, { label: 'city · sea', ok: true }, { label: 'cat · ship', ok: false },
      ])}`;
    case 4: return `
      <h1>How to read a transcription</h1>
      <div class="guide-word"><span class="wii-who">/ /</span><span class="guide-note">slashes surround a broad pronunciation</span></div>
      <div class="guide-word"><span class="wii-who">ˈ</span><span class="guide-note">marks the syllable with primary stress — /ɪˈnʌf/</span></div>
      <div class="guide-word"><span class="wii-who">symbols</span><span class="guide-note">represent sounds, never letters</span></div>
      <div class="guide-word"><span class="wii-who">accents</span><span class="guide-note">the same word can transcribe differently</span></div>
      <p class="guide-text">The same word, two accents — listen to both:</p>
      <div class="guide-word">
        ${speakableWord('bar', 'nam')
          ? `<button class="word-chip" data-say="bar" data-lang="en-US" data-acc="nam" type="button">🔊 bar 🇺🇸</button>`
          : `<span class="word-chip is-off">bar 🇺🇸 <small>· recording soon</small></span>`}
        <span class="guide-ipa">/bɑr/</span><span class="guide-note">Neutral American — the r is spoken</span>
      </div>
      <div class="guide-word">
        <button class="word-chip" data-say="bar" data-lang="en-GB" data-acc="rp" type="button">🔊 bar 🎩</button>
        <span class="guide-ipa">/bɑː/</span><span class="guide-note">Traditional RP — the r becomes vowel length</span>
      </div>
      <details class="idiom-extra"><summary>Advanced detail — narrow transcription</summary>
        <p class="pane-note">Square brackets [ ] mark a <i>narrow</i> transcription: exactly what a speaker did, with diacritics for fine detail — [kʰɑːˑ] notes aspiration and length. Speechcraft teaches broad transcription; narrow can wait.</p>
      </details>`;
    case 5: return `
      <h1>How sounds are organized</h1>
      <div class="guide-word"><span class="wii-who">Vowels</span><span class="guide-note">airflow stays open; tongue and lip position shape the sound</span></div>
      <div class="guide-word"><span class="wii-who">Consonants</span><span class="guide-note">airflow is narrowed or stopped somewhere in the mouth</span></div>
      <div class="guide-word"><span class="wii-who">Diphthongs</span><span class="guide-note">the mouth glides from one vowel position toward another</span></div>
      <p class="guide-text">Sort these three — tap a category for each sound:</p>
      ${[['æ', 'trap', 'Vowel'], ['ʃ', 'ship', 'Consonant'], ['aɪ', 'price', 'Diphthong']].map(([ph, w, right]) => `
        <div class="mini-check wii-classify" data-q="cls-${ph}">
          <p class="mini-prompt"><button class="word-chip" data-say="${esc(PHONEMES[ph].examples[0])}" type="button">🔊 /${esc(ph)}/ ${esc(w)}</button></p>
          <div class="mini-opts" role="group" aria-label="Classify /${esc(ph)}/">
            ${['Vowel', 'Consonant', 'Diphthong'].map(c => `
              <button class="btn mini-opt ${st.answered['cls-' + ph] !== undefined && c === right ? 'right' : ''}" type="button"
                data-ok="${c === right ? 1 : 0}" ${st.answered['cls-' + ph] !== undefined ? 'disabled' : ''}>${c}</button>`).join('')}
          </div>
          <p class="mini-result" role="status">${st.answered['cls-' + ph] === true ? '✓ Correct.' : st.answered['cls-' + ph] === false ? 'Not quite — the marked answer is right.' : ''}</p>
        </div>`).join('')}
      <p class="pane-note">The full landscape lives in the Library: the IPA Chart and Your Instrument (the vocal tract) — every sound with tongue placement and audio.</p>`;
    case 6: return `
      <h1>How to use IPA</h1>
      <ol class="wii-steps-list">
        <li>Find the word’s transcription.</li>
        <li>Identify each sound.</li>
        <li>Listen to the symbols and example words.</li>
        <li>Examine tongue and lip placement.</li>
        <li>Say the sounds separately.</li>
        <li>Blend them into the word.</li>
        <li>Listen closely to the model recordings and shadow them in your head as you read.</li>
        <li>Compare, adjust, repeat.</li>
      </ol>
      <p class="guide-text">Try it on one word:</p>
      <div class="wii-demo">
        <div class="wii-demo-word">ship
          <button class="word-chip" data-say="ship" type="button" aria-label="Hear the word ship">🔊 hear it</button>
        </div>
        ${st.revealed ? `
          <div class="chips" id="wii-demo-syms">
            ${[['ʃ', 'ship'], ['ɪ', 'kit'], ['p', 'pen']].map(([ph, w]) => {
              const slug = phonemeSlug(ph);
              return hasPhonemeClip(slug, 'nam')
                ? `<button class="word-chip" data-phoneme="${esc(slug)}" type="button"
                     aria-label="Hear the isolated sound ${esc(ph)}">🔊 /${esc(ph)}/</button>`
                : `<button class="word-chip" data-say="${esc(w)}" type="button"
                     aria-label="Hear the word “${esc(w)}”, home of ${esc(ph)}">/${esc(ph)}/ in “${esc(w)}”</button>`;
            }).join('')}
          </div>
          <p class="pane-note">${hasPhonemeClip(phonemeSlug('ʃ'), 'nam')
            ? 'Tap a symbol to hear the sound by itself; tap 🔊 above to hear the whole word.'
            : 'Each symbol button plays its home word for now — isolated recordings are coming.'}</p>
          <button class="btn-lite" data-sound-detail="ʃ" type="button">📐 See /ʃ/ tongue placement ›</button>`
        : '<button class="btn" id="wii-reveal" type="button">Reveal the transcription</button>'}
      </div>`;
  }
  // completion
  const correct = Object.values(st.answered).filter(Boolean).length;
  const course = COURSES.find(c => c.id === activeCourse());
  return `
    <h1>That’s the whole idea</h1>
    <p class="guide-text">You do not need to memorize the entire IPA chart. Start by learning the symbols used in your course, one sound at a time.</p>
    <div class="end-summary">
      <div class="end-block"><span class="end-block-l">Questions</span><span class="end-block-v">${correct}/${WII_QUESTIONS} correct</span></div>
      <div class="end-block"><span class="end-block-l">Covered</span><span class="end-block-v">symbols · stress · accents · vowel/consonant/diphthong · the workflow</span></div>
      <div class="end-block"><span class="end-block-l">Next</span><span class="end-block-v">${correct >= 4 ? 'jump into a course' : 'the IPA Chart is a good slow tour'}</span></div>
    </div>
    <div class="ob-actions ob-actions-col">
      <button class="btn btn-primary" id="wii-foundations" type="button">Start IPA Foundations</button>
      <button class="btn" id="wii-chart" type="button">Explore the IPA Chart</button>
      ${course.id !== 'core' ? `<button class="btn" id="wii-course" type="button">Continue ${esc(course.label)}</button>` : ''}
    </div>`;
}
function drawWhatIsIpa(step, st) {
  stopSpeech();
  const total = 7;
  const isEnd = step >= total;
  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit" aria-label="Exit What Is IPA">✕</button>
      <div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="${total}"
           aria-valuenow="${Math.min(step + 1, total)}" aria-label="What Is IPA — step ${Math.min(step + 1, total)} of ${total}">
        <div class="progress-fill" style="width:${Math.round(Math.min(step + 1, total) / total * 100)}%"></div></div>
      <span class="step-count">${isEnd ? '✓' : `${step + 1} of ${total}`}</span>
    </header>
    <main class="guide guide-stepped">
      <div class="guide-title-bar" style="--unit-color:#64748b">💡 What Is IPA?</div>
      <section class="guide-step">${wiiStepHtml(step, st)}</section>
      ${isEnd ? '' : `
      <div class="guide-nav">
        ${step > 0 ? '<button class="btn" id="g-back" type="button">‹ Back</button>' : '<span></span>'}
        <button class="btn btn-primary" id="g-next" type="button">${step === total - 1 ? 'Finish' : 'Continue'}</button>
      </div>`}
    </main>`;

  document.getElementById('quit').addEventListener('click', goBack);
  document.getElementById('g-back')?.addEventListener('click', () => drawWhatIsIpa(step - 1, st));
  document.getElementById('g-next')?.addEventListener('click', () => {
    const to = step + 1;
    if (to >= total) store.markWhatIsIpa(Object.values(st.answered).filter(Boolean).length);
    drawWhatIsIpa(to, st);
  });
  app.querySelectorAll('[data-say]').forEach(b =>
    b.addEventListener('click', () => speak(b.dataset.say, { lang: b.dataset.lang ?? 'en-US', accent: b.dataset.acc ?? 'nam' })));
  app.querySelectorAll('[data-phoneme]').forEach(b =>
    b.addEventListener('click', () => playPhoneme(b.dataset.phoneme, 'nam')));
  app.querySelector('[data-sound-detail]')?.addEventListener('click', e =>
    renderSoundDetail(e.currentTarget.dataset.soundDetail, 'nam'));
  document.getElementById('wii-reveal')?.addEventListener('click', () => { st.revealed = true; drawWhatIsIpa(step, st); });
  document.getElementById('wii-foundations')?.addEventListener('click', () => { setCourse('core'); setWorkspace('ipa'); goSection('learn'); });
  document.getElementById('wii-chart')?.addEventListener('click', () => renderChart());
  document.getElementById('wii-course')?.addEventListener('click', () => { setWorkspace('accents'); goSection('learn'); });
  wireWiiQuestions(app, st);
  const h = app.querySelector('.guide-step h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
}
export function renderChart() {
  record(renderChart);
  const syms = Object.entries(PHONEMES);
  const groups = [
    { key: 'vowels', title: 'Vowels', note: 'Single vowel sounds — short, long (ː), and the accent-specific variants.',
      items: syms.filter(([, p]) => p.type === 'vowel' && !p.weak && !p.allophone) },
    { key: 'diphthongs', title: 'Diphthongs', note: 'Vowels that glide from one position to another.',
      items: syms.filter(([, p]) => p.type === 'diphthong' && !p.weak && !p.allophone) },
    { key: 'consonants', title: 'Consonants', note: 'The consonant phonemes of English.',
      items: syms.filter(([, p]) => p.type === 'consonant' && !p.allophone) },
    { title: 'Weak vowels', note: 'The vowels of unstressed syllables, counted apart from the full vowel system.',
      items: syms.filter(([, p]) => p.weak && !p.allophone) },
    { title: 'Realizations', note: 'Ways a phoneme is actually spoken, written in [brackets] — never extra phonemes.',
      items: syms.filter(([, p]) => p.allophone) },
  ];

  const section = g => `
    <section class="chart-section">
      <h2 class="chart-h">${esc(g.title)} <span>${g.items.length}</span></h2>
      <p class="chart-note">${esc(g.note)}</p>
      ${(() => {
        // The section's overview chart, where the artwork pack has one.
        // Sections it does not cover (weak vowels, realizations) simply
        // go without rather than borrowing a chart that omits them.
        const c = chartFor(g.key);
        return c ? `<figure class="chart-overview">
          <img src="${esc(c.src)}" alt="${esc(c.title)} overview chart" decoding="async">
        </figure>` : '';
      })()}
      <div class="chart-grid">
        ${g.items.map(([sym, p]) => `
          <button class="chart-chip" data-sym="${esc(sym)}" title="How “${esc(sym)}” is made">
            <span class="chart-sym">${p.allophone ? `[${esc(sym)}]` : esc(sym)}</span>
            <span class="chart-meta">
              <span class="chart-name">${esc(p.name)}</span>
              <span class="chart-eg">${p.examples.slice(0, 2).map(w => `<b>${esc(w)}</b>`).join(', ')}</span>
            </span>
            <span class="chart-play">›</span>
          </button>`).join('')}
      </div>
    </section>`;

  app.innerHTML = `
    ${pageTopbar('📖 The IPA Chart', '#64748b')}
    <main class="tree chart-page">
      <p class="track-blurb">The full alphabet of sounds. Tap any symbol to see how it’s made and hear it.</p>
      ${whatIsIpaCard()}
      ${groups.map(section).join('')}
    </main>`;

  wireBrandHome();
  wireWhatIsIpaCard(app);
  app.querySelectorAll('.chart-chip').forEach(btn =>
    btn.addEventListener('click', () => renderSoundDetail(btn.dataset.sym))
  );
}
// ── Try it yourself: record, play back, compare with the model ─
// Ephemeral by design — nothing is saved; the Studio remains the place for
// keeping takes. One object URL lives at a time.
// Module-private: only this module writes it. An exported `let` cannot be
// assigned by an importer (the binding is read-only there and assignment
// throws), which is how the 2026-09 split briefly broke releaseTryIt.
let tryItUrl = null;
export function releaseTryIt() {
  if (tryItUrl) { URL.revokeObjectURL(tryItUrl); tryItUrl = null; }
}
export function wireTryIt(container, playModel) {
  const box = container.querySelector('.tryit');
  if (!box) return;
  const rec = box.querySelector('[data-tryit="rec"]');
  const player = box.querySelector('[data-tryit="play"]');
  const status = box.querySelector('[data-tryit="status"]');
  let recording = false;
  box.querySelector('[data-tryit="model"]').addEventListener('click', () => playModel());
  rec.addEventListener('click', async () => {
    if (!recording) {
      try {
        stopSpeech();
        await startRecording({ onAutoStop: () => rec.click() });
        recording = true;
        rec.textContent = '⏹ Stop';
        rec.classList.add('is-recording');
        status.textContent = 'Recording… speak, then press stop.';
      } catch (err) {
        status.textContent = err?.name === 'NotAllowedError'
          ? 'Microphone permission was declined — allow it in the browser to record.'
          : 'Recording isn’t available right now.';
      }
      return;
    }
    recording = false;
    rec.textContent = '⏺ Record';
    rec.classList.remove('is-recording');
    const take = await stopRecording();
    if (!take?.blob) { status.textContent = 'Nothing captured — try again.'; return; }
    if (tryItUrl) URL.revokeObjectURL(tryItUrl);
    tryItUrl = URL.createObjectURL(take.blob);
    player.src = tryItUrl;
    player.hidden = false;
    player.play().catch(() => {});
    status.textContent = 'That’s you. Play the model, then match it.';
  });
}
// The visible inventory order for a context: exactly the sequence the
// course's IPA page (or the full Foundations chart) displays its chips in.
// Prev/Next on the sound pages follows THIS order and nothing else, so a
// symbol excluded from a course can never be reached from inside it.
function inventoryOrder(accent) {
  const syms = accent ? phonemesForAccent(accent) : Object.keys(PHONEMES);
  const info = s => PHONEMES[s] ?? {};
  return [
    ...syms.filter(s => info(s).type === 'vowel' && !info(s).weak && !info(s).allophone),
    ...syms.filter(s => info(s).type === 'diphthong' && !info(s).weak && !info(s).allophone),
    ...syms.filter(s => info(s).type === 'consonant' && !info(s).allophone),
    ...syms.filter(s => info(s).weak && !info(s).allophone),
    ...syms.filter(s => info(s).allophone),
  ];
}
// Articulation video: renders ONLY for an approved manifest entry — with
// none approved (the current state) the sound page shows nothing extra, an
// honest absence rather than a "coming soon" tease. Native controls plus
// loop and half-speed toggles; captions track required; inline playback.
function articulationVideoHtml(v, kindLabel) {
  if (!v) return '';
  const g = v.articulation ?? {};
  return `
    <figure class="artic-video" data-video-id="${esc(v.id)}">
      <figcaption class="field-label">${esc(kindLabel)}${v.word ? ` — “${esc(v.word)}”` : ''} · /${esc(v.symbol)}/</figcaption>
      <video controls playsinline preload="metadata" poster="${esc(v.poster)}" aria-label="${esc(kindLabel)} articulation video for ${esc(v.symbol)}">
        <source src="${esc(v.video)}">
        ${v.captions ? `<track kind="captions" src="${esc(v.captions)}" srclang="en" label="Captions" default>` : ''}
      </video>
      <div class="artic-video-tools">
        <button class="btn-lite" data-vid-loop type="button" aria-pressed="false">🔁 Loop</button>
        <button class="btn-lite" data-vid-slow type="button" aria-pressed="false">🐢 Half speed</button>
      </div>
      ${(g.lips || g.tongue || g.jaw || g.voice) ? `
      <dl class="anat-list artic-video-guide">
        ${g.lips ? `<div><dt>Lips</dt><dd>${esc(g.lips)}</dd></div>` : ''}
        ${g.tongue ? `<div><dt>Tongue</dt><dd>${esc(g.tongue)}</dd></div>` : ''}
        ${g.jaw ? `<div><dt>Jaw</dt><dd>${esc(g.jaw)}</dd></div>` : ''}
        ${g.voice ? `<div><dt>Voice</dt><dd>${esc(g.voice)}</dd></div>` : ''}
      </dl>` : ''}
    </figure>`;
}
function wireArticulationVideos(root) {
  root.querySelectorAll('.artic-video').forEach(fig => {
    const vid = fig.querySelector('video');
    fig.querySelector('[data-vid-loop]')?.addEventListener('click', e => {
      vid.loop = !vid.loop;
      e.currentTarget.setAttribute('aria-pressed', String(vid.loop));
    });
    fig.querySelector('[data-vid-slow]')?.addEventListener('click', e => {
      vid.playbackRate = vid.playbackRate === 0.5 ? 1 : 0.5;
      e.currentTarget.setAttribute('aria-pressed', String(vid.playbackRate === 0.5));
    });
  });
}
// Detail for one sound: articulation diagram, description, example words.
// `accent` is the dialect context the page was opened from — inside a course
// everything speaks that course's voices. Without one (the full Foundations
// chart) fall back to guessing from dialect-exclusive symbols.
// `focusHeading` is set by Prev/Next so keyboard and screen-reader users
// land on the new sound's name.
export function renderSoundDetail(sym, accent, { focusHeading = false } = {}) {
  const p = PHONEMES[sym];
  if (!p) return renderChart();
  record(() => renderSoundDetail(sym, accent));
  // Realizations (like [ʔ] for /t/) wear square brackets everywhere.
  const wrapSym = s => (p.allophone ? `[${s}]` : `/${s}/`);
  const diagram = articulationSVG(sym);
  const lang = ACCENT_LANG[accent]
    ?? ACCENT_LANG[({ 'ɝ': 'nam', 'ɚ': 'nam', 'ɑ': 'nam', 'oʊ': 'nam' }[sym])]
    ?? (['ɐ', 'ɐː', 'ʉː', 'æɪ', 'ɑe', 'æɔ', 'əʉ', 'ɔ', 'oː', 'eː', 'oɪ'].includes(sym) ? 'en-AU' : 'en-GB');
  const acc = accent ?? ({ 'en-US': 'nam', 'en-GB': 'rp', 'en-AU': 'aus' })[lang];
  // ISOLATED PHONEMES EXIST IN ONE ACCENT. All 42 approved clips are
  // nam/reference (the owner's own recordings), and General American is
  // the only course getting them for now — owner decision 2026-09-22.
  //
  // So an accent-NEUTRAL surface (Voice & Speech, IPA Foundations, or a
  // page reached with no accent at all) resolved to a guessed 'rp' and
  // fell silent, holding forty-two recordings it would not play. Owner
  // order 2026-09-24: use the Neutral American ones we have.
  //
  // The four accent courses are deliberately NOT included. Handing an
  // RP learner a General American vowel would teach the wrong sound,
  // which is why their sound pages still say the isolated clip is not
  // recorded yet and keep their word audio.
  const ACCENT_COURSES = ['rp', 'ssbe', 'aus', 'cockney'];
  const phonAcc = ACCENT_COURSES.includes(acc) ? acc : 'nam';
  const isVowel = p.type !== 'consonant';
  // The big symbol plays the ISOLATED sound only when an ear-approved clip
  // exists. Until then it is an explicit word control — labelled as such,
  // never pretending a word is the phoneme.
  const slug = phonemeSlug(sym);
  const hasIso = hasPhonemeClip(slug, phonAcc);
  const hasSyl = hasPhonemeClip(slug + '_syllable', phonAcc);
  const chips = p.examples.map(w => wordChip(w, acc)).join('');

  // Prev/Next through the visible inventory for this context. No looping:
  // the controls simply disable at either end.
  const order = inventoryOrder(accent);
  const idx = order.indexOf(sym);
  const prevSym = idx > 0 ? order[idx - 1] : null;
  const nextSym = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  const navLabel = s => `${PHONEMES[s].allophone ? `[${s}]` : `/${s}/`} ${PHONEMES[s].name}`;
  const arrow = (s, dir) => `
    <button class="sound-step" data-step="${esc(s ?? '')}" data-dir="${dir === 'prev' ? 'back' : 'forward'}" type="button" ${s ? '' : 'disabled'}
      aria-label="${s ? `${dir === 'prev' ? 'Previous' : 'Next'} sound: ${esc(navLabel(s))}` : `No ${dir === 'prev' ? 'previous' : 'next'} sound`}"
      title="${s ? esc(navLabel(s)) : ''}">${dir === 'prev' ? '‹' : '›'}</button>`;

  app.innerHTML = `
    ${pageTopbar(wrapSym(esc(sym)), '#64748b')}
    <main class="guide sound-detail">
      <div class="sound-hero">
        <div class="sound-big-wrap">
          ${hasIso ? `
          <button class="sound-big" id="say-sym"
            aria-label="Hear the isolated sound ${esc(sym)}" title="Hear the sound">${wrapSym(esc(sym))}</button>
          <span class="sound-big-cap">🔊 Hear the sound</span>`
          : hasSyl ? `
          <button class="sound-big" id="say-syl-hero"
            aria-label="Hear ${esc(sym)} inside a syllable — a syllable demonstration, since this sound cannot be spoken alone" title="Hear it in a syllable">${wrapSym(esc(sym))}</button>
          <span class="sound-big-cap">🔊 In a syllable</span>`
          : `
          <div class="sound-big is-plain" aria-hidden="true">${wrapSym(esc(sym))}</div>`}
          ${hasIso && hasSyl ? `<button class="word-chip" id="say-syl" type="button"
            aria-label="Hear ${esc(sym)} inside a syllable — a syllable demonstration, not a fully isolated sound">🔊 Hear it in a syllable</button>` : ''}
        </div>
        <div class="sound-head">
          <h1 id="sound-title" tabindex="-1">${esc(p.name)}</h1>
          <p class="guide-text">${esc(p.hint)}.</p>
          <div class="sound-steps" aria-label="Neighbouring sounds">
            ${arrow(prevSym, 'prev')}${arrow(nextSym, 'next')}
          </div>
        </div>
      </div>
      ${(() => {
        // The picture of how this sound is made.
        //
        // A hand-drawn illustration REPLACES the generated diagram
        // outright wherever one exists. The generated one was only ever
        // a stand-in for artwork that had not been drawn yet, and
        // showing both would just be two answers to the same question.
        const art = artFor(sym);
        const g = articulationFor(sym);
        const picture = art
          ? `<figure class="artic-wrap artic-figure">
               <img class="artic-art" src="${esc(art)}"
                    alt="How the mouth makes ${esc(sym)}" decoding="async">
             </figure>`
          // No artwork yet: fall back to the generated diagram, with the
          // cues on leader lines when there is written guidance to hang.
          : (g ? `<div class="artic-wrap">${guideSVG(sym, g.cues)}</div>`
               : (diagram ? `<div class="artic-wrap">${diagram}
                   <p class="artic-cap">${isVowel ? 'Tongue position in the mouth' : 'Where the sound is made (side view)'}</p></div>` : ''));
        if (!g) return picture;
        return `
        <section class="sp-step guide-block" aria-label="How to make this sound">
          <h2 class="guide-heading">How to make it</h2>
          <p class="guide-text">${esc(g.summary)}</p>
          ${picture}
          <ol class="guide-steps">${g.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
          ${g.contrast ? `<p class="pane-note"><b>Against /${esc(g.contrast.sym)}/:</b> ${esc(g.contrast.note)}</p>` : ''}
          ${g.watch ? `<p class="pane-note">${esc(g.watch)}</p>` : ''}
        </section>`;
      })()}
      ${articulationVideoHtml(videoFor(acc, sym, 'isolated'), 'Isolated Sound')}
      ${articulationVideoHtml(videoFor(acc, sym, 'word'), 'Example Word')}
      <h2 class="guide-heading">Hear it in words</h2>
      <div class="chips">${chips}</div>
      ${tryItHtml(`Record yourself saying ${hasIso ? `the sound /${sym}/` : `“${p.examples.find(x => speakableWord(x, acc)) ?? p.examples[0]}”`}, then compare.`)}
      <nav class="sound-footnav" aria-label="Neighbouring sounds">
        ${prevSym ? `<button class="btn-lite sound-step-wide" data-step="${esc(prevSym)}" data-dir="back" type="button"
          aria-label="Previous sound: ${esc(navLabel(prevSym))}">‹ Previous: ${esc(navLabel(prevSym))}</button>` : '<span></span>'}
        ${nextSym ? `<button class="btn-lite sound-step-wide" data-step="${esc(nextSym)}" data-dir="forward" type="button"
          aria-label="Next sound: ${esc(navLabel(nextSym))}">Next: ${esc(navLabel(nextSym))} ›</button>` : '<span></span>'}
      </nav>
    </main>`;

  wireBrandHome();
  wireArticulationVideos(app);
  // A phoneme request plays the phoneme or nothing — no word stand-in.
  document.getElementById('say-sym')?.addEventListener('click', () => playPhoneme(slug, phonAcc));
  document.getElementById('say-syl')?.addEventListener('click', () => playPhoneme(slug + '_syllable', phonAcc));
  document.getElementById('say-syl-hero')?.addEventListener('click', () => playPhoneme(slug + '_syllable', phonAcc));
  wireTryIt(app, () => {
    if (hasIso) { playPhoneme(slug, phonAcc); return; }
    const w = p.examples.find(x => speakableWord(x, acc));
    if (w) speak(w, { lang, accent: acc });
  });
  app.querySelectorAll('[data-say]').forEach(b =>
    b.addEventListener('click', () => speak(b.dataset.say, { lang, accent: acc })));

  // Prev/Next REPLACE this page in the back history: after /ɪ/ → /e/ → /æ/
  // the main Back button returns straight to the inventory. record() inside
  // the next render handles the audio/mic/try-it cleanup.
  app.querySelectorAll('[data-step]').forEach(b =>
    b.addEventListener('click', () => {
      if (!b.dataset.step) return;
      navTo(() => {
        navStack.pop();
        renderSoundDetail(b.dataset.step, accent, { focusHeading: true });
      }, b.dataset.dir ?? 'forward');
    }));

  window.scrollTo(0, 0);
  if (focusHeading) document.getElementById('sound-title')?.focus();
}
