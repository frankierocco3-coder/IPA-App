import { COURSE, TRACKS } from './data/course.js';
import { PHONEMES, WORDS } from './data/phonemes.js';
import { generateLesson } from './engine.js';
import { store } from './state.js';
import { speak, ACCENT_LANG } from './audio.js';

const langFor = lesson => ACCENT_LANG[lesson?.accent] ?? 'en-GB';

const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Each track has its own unlock chain, independent of the others.
const unitById = Object.fromEntries(COURSE.map(u => [u.id, u]));
const TRACK_LESSONS = Object.fromEntries(TRACKS.map(t => [
  t.id,
  t.unitIds.flatMap(uid => unitById[uid].lessons.map(l => ({ ...l, unit: unitById[uid], track: t }))),
]));
const ALL_LESSONS = Object.values(TRACK_LESSONS).flat();

function isUnlocked(lesson) {
  if (store.freePlay) return true;
  const chain = TRACK_LESSONS[lesson.track.id];
  const i = chain.findIndex(l => l.id === lesson.id);
  return i === 0 || store.isCompleted(chain[i - 1].id);
}

function trackProgress(track) {
  const chain = TRACK_LESSONS[track.id];
  return { done: chain.filter(l => store.isCompleted(l.id)).length, total: chain.length };
}

const TRACK_ACCENT = { nam: 'nam', rp: 'rp' };

// A synthetic lesson drawing on everything the track teaches.
function practiceLesson(track) {
  const chain = TRACK_LESSONS[track.id];
  const phonemes = [...new Set(chain.flatMap(l => l.phonemes ?? []))];
  const types = [...new Set(chain.flatMap(l => l.types ?? []))];
  if (!types.includes('fillBlank') && track.id !== 'shift') types.push('fillBlank');
  return {
    id: 'practice-' + track.id,
    title: track.title + ' — practice',
    practice: true,
    accent: TRACK_ACCENT[track.id],
    shiftTo: TRACK_ACCENT[track.id],
    phonemes,
    types,
    track,
  };
}

// ── Home: track picker ────────────────────────────────────────

function renderHome() {
  const cards = TRACKS.map(t => {
    const { done, total } = trackProgress(t);
    return `
      <button class="track-card" data-track="${t.id}" style="--track-color:${t.color}">
        <div class="track-glyph">${t.icon}</div>
        <div class="track-info">
          <h2>${esc(t.title)}${t.accent ? ' <span class="badge badge-dark">DIALECT</span>' : ''}${t.drills ? ' <span class="badge badge-dark">DRILLS</span>' : ''}${trackProgress(t).done === trackProgress(t).total ? ' <span class="badge badge-gold">🎓 MASTERED</span>' : ''}</h2>
          <p>${esc(t.blurb)}</p>
          <div class="track-progress">
            <div class="track-progress-bar"><div style="width:${total ? Math.round(done / total * 100) : 0}%"></div></div>
            <span>${done}/${total}</span>
          </div>
        </div>
        <div class="track-arrow">›</div>
      </button>`;
  }).join('');

  app.innerHTML = `
    <header class="topbar">
      <div class="brand">ʃə<span>Phoneme</span></div>
      <div class="stats">
        <span class="stat">🔥 ${store.displayStreak}</span>
        <span class="stat">⚡ ${store.xp} XP</span>
        <button class="freeplay ${store.freePlay ? 'on' : ''}" id="freeplay"
                title="Free play: unlock all lessons">${store.freePlay ? '🔓' : '🔒'}</button>
      </div>
    </header>
    ${store.freePlay ? '<p class="freeplay-note">Free play is on — every lesson is unlocked.</p>' : ''}
    <main class="track-list">
      <h1 class="home-heading">Choose your track</h1>
      ${cards}
    </main>`;

  document.getElementById('freeplay').addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderHome();
  });
  app.querySelectorAll('.track-card').forEach(btn =>
    btn.addEventListener('click', () => renderTrack(TRACKS.find(t => t.id === btn.dataset.track)))
  );
}

// ── Track page: that dialect's units & lessons ────────────────

function renderTrack(track) {
  const units = track.unitIds.map(uid => {
    const unit = unitById[uid];
    const nodes = unit.lessons.map(raw => {
      const l = TRACK_LESSONS[track.id].find(x => x.id === raw.id);
      const done = store.isCompleted(l.id);
      const unlocked = isUnlocked(l);
      const cls = done ? 'done' : unlocked ? 'open' : 'locked';
      return `
        <button class="node ${cls}" data-lesson="${l.id}" ${unlocked ? '' : 'disabled'}
                style="${done || unlocked ? `--node-color:${unit.color}` : ''}">
          <span class="node-icon">${done ? '✓' : unlocked ? '★' : '🔒'}</span>
          <span class="node-title">${esc(l.title)}</span>
        </button>`;
    }).join('');
    // Single-unit tracks don't need a second header repeating the track name.
    const header = track.unitIds.length > 1 ? `
      <header class="unit-header" style="--unit-color:${unit.color}">
        <div class="unit-glyph">${unit.icon}</div>
        <div>
          <h2>${esc(unit.title)}</h2>
          <p>${esc(unit.blurb)}</p>
        </div>
      </header>` : '';
    return `<section class="unit">${header}<div class="nodes">${nodes}</div></section>`;
  }).join('');

  app.innerHTML = `
    <header class="topbar">
      <button class="back" id="back" title="All tracks">‹</button>
      <div class="track-title" style="color:${track.color}">${track.icon} ${esc(track.title)}</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>
    <main class="tree">
      <p class="track-blurb">${esc(track.blurb)}</p>
      <div class="practice-row">
        <button class="btn btn-practice" id="practice">🎯 Practice — mixed review, no hearts lost</button>
      </div>
      ${units}
    </main>`;

  document.getElementById('back').addEventListener('click', renderHome);
  document.getElementById('practice').addEventListener('click', () => startLesson(practiceLesson(track)));
  app.querySelectorAll('.node[data-lesson]').forEach(btn =>
    btn.addEventListener('click', () => {
      const lesson = TRACK_LESSONS[track.id].find(l => l.id === btn.dataset.lesson);
      renderGuide(lesson);
    })
  );
}

// ── Lesson guide (the teaching page before the exercises) ─────

function renderGuide(lesson) {
  const unit = lesson.unit;
  const phonemeCards = lesson.phonemes.map(ph => {
    const p = PHONEMES[ph];
    const chips = p.examples.map(w =>
      `<button class="word-chip" data-say="${esc(w)}">🔊 ${esc(w)}</button>`).join('');
    return `
      <div class="guide-card">
        <button class="guide-symbol" data-say="${esc(p.examples[0])}" title="Hear “${esc(p.examples[0])}”">/${ph}/</button>
        <div class="guide-info">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.hint)}</p>
          <div class="chips">${chips}</div>
        </div>
      </div>`;
  }).join('');

  const accentName = { rp: 'RP', nam: 'Neutral American' }[lesson.accent] ?? '';
  const accentWords = lesson.accent
    ? WORDS.filter(w => w.accent === lesson.accent && w.ipa.some(s => lesson.phonemes.includes(s)))
        .map(w => `
          <div class="guide-word">
            <button class="word-chip" data-say="${esc(w.word)}">🔊 ${esc(w.word)}</button>
            <span class="guide-ipa">/${w.ipa.join('')}/</span>
            <span class="guide-note">${esc(w.note ?? '')}</span>
          </div>`).join('')
    : '';

  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit">✕</button>
      <div class="guide-title-bar" style="--unit-color:${unit.color}">${esc(unit.title)}</div>
    </header>
    <main class="guide">
      <h1>${esc(lesson.title)}</h1>
      <p class="guide-text">${esc(lesson.guide ?? '')}</p>
      <h2 class="guide-heading">Sounds in this lesson</h2>
      ${phonemeCards}
      ${accentWords ? `<h2 class="guide-heading">${esc(accentName)} words to know</h2>${accentWords}` : ''}
      <div class="guide-start">
        <button class="btn btn-primary" id="start">Start lesson</button>
      </div>
    </main>`;

  document.getElementById('quit').addEventListener('click', () => renderTrack(lesson.track));
  document.getElementById('start').addEventListener('click', () => startLesson(lesson));
  app.querySelectorAll('[data-say]').forEach(btn =>
    btn.addEventListener('click', () => speak(btn.dataset.say, { lang: langFor(lesson) }))
  );
}

// ── Lesson session ────────────────────────────────────────────

function startLesson(lesson) {
  const session = {
    lesson,
    queue: generateLesson(lesson),
    index: 0,
    hearts: 3,
    mistakes: 0,
    total: 0,
  };
  session.total = session.queue.length;
  renderExercise(session);
}

function progressPct(s) {
  return Math.round((s.index / s.queue.length) * 100);
}

function lessonChrome(s, body) {
  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit">✕</button>
      <div class="progress"><div class="progress-fill" style="width:${progressPct(s)}%"></div></div>
      <div class="hearts">${'❤️'.repeat(s.hearts)}${'🖤'.repeat(3 - s.hearts)}</div>
    </header>
    <main class="exercise" data-accent="${s.lesson.accent ?? ''}">${body}</main>
    <footer class="feedback" id="feedback"></footer>`;
  document.getElementById('quit').addEventListener('click', () => renderTrack(s.lesson.track));
}

function renderExercise(s) {
  if (s.hearts === 0) return renderFail(s);
  if (s.index >= s.queue.length) return renderResults(s);
  const ex = s.queue[s.index];
  if (ex.type === 'match') renderMatch(s, ex);
  else if (ex.type === 'build') renderBuild(s, ex);
  else if (ex.type === 'gapbuild') renderGapBuild(s, ex);
  else if (ex.type === 'typein') renderTypein(s, ex);
  else renderChoice(s, ex);
}

function audioButton(ex) {
  return ex.audioText
    ? `<button class="speaker" id="speaker" title="Play audio">🔊</button>`
    : '';
}

function exLang(s, ex) {
  return ex.lang ?? langFor(s.lesson);
}

function wireAudio(s, ex, onFirstPlay) {
  const btn = document.getElementById('speaker');
  if (!btn) return;
  let played = false;
  btn.addEventListener('click', () => {
    speak(ex.audioText, { lang: exLang(s, ex) });
    if (!played) { played = true; onFirstPlay?.(); }
  });
}

function showFeedback(s, ok, ex, { requeue = true, penalty = true } = {}) {
  const fb = document.getElementById('feedback');
  fb.className = `feedback show ${ok ? 'good' : 'bad'}`;
  fb.innerHTML = `
    <div class="feedback-text">
      <strong>${ok ? 'Correct!' : 'Not quite.'}</strong>
      <span>${esc(ex.explain ?? '')}</span>
    </div>
    <button class="btn continue ${ok ? '' : 'btn-red'}" id="continue">Continue</button>`;
  if (!ok) {
    if (penalty && !s.lesson.practice) s.hearts--;
    s.mistakes++;
    if (requeue && s.hearts > 0) s.queue.push({ ...ex });
  }
  document.getElementById('continue').addEventListener('click', () => {
    s.index++;
    renderExercise(s);
  });
}

function renderChoice(s, ex) {
  const gated = !!ex.hideUntilPlayed && !!ex.audioText;
  const displayCard = ex.display
    ? `<div class="display-card ${ex.smallDisplay ? 'small' : ''}">${audioButton(ex)}<span>${esc(ex.display)}</span></div>`
    : (ex.audioText ? `<div class="display-card audio-only">${audioButton(ex)}<span class="listen-hint">tap to listen</span></div>` : '');
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    ${displayCard}
    ${ex.displayHint ? `<p class="hint">${esc(ex.displayHint)}</p>` : ''}
    <div class="choices ${gated ? 'gated' : ''}" id="choices">
      ${ex.choices.map((c, i) => `
        <button class="btn choice" data-i="${i}" ${gated ? 'disabled' : ''}>
          <span class="choice-label">${esc(c.label)}</span>
          ${c.sub ? `<span class="choice-sub">${esc(c.sub)}</span>` : ''}
        </button>`).join('')}
    </div>`);

  wireAudio(s, ex, () => {
    document.querySelectorAll('.choice').forEach(b => (b.disabled = false));
    document.getElementById('choices')?.classList.remove('gated');
  });
  if (ex.audioText && !gated) setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex) }), 300);

  document.querySelectorAll('.choice').forEach(btn =>
    btn.addEventListener('click', () => {
      const ok = !!ex.choices[+btn.dataset.i].ok;
      btn.classList.add(ok ? 'right' : 'wrong');
      document.querySelectorAll('.choice').forEach((b, i) => {
        b.disabled = true;
        if (ex.choices[i].ok) b.classList.add('right');
      });
      showFeedback(s, ok, ex);
    })
  );
}

function renderMatch(s, ex) {
  const left = ex.pairs.map((p, i) => ({ id: i, text: p.sym }));
  const right = ex.pairs.map((p, i) => ({ id: i, text: p.word }))
    .sort(() => Math.random() - 0.5);
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="match-grid">
      <div class="match-col" id="col-l">
        ${left.map(x => `<button class="btn match-item" data-id="${x.id}">${esc(x.text)}</button>`).join('')}
      </div>
      <div class="match-col" id="col-r">
        ${right.map(x => `<button class="btn match-item" data-id="${x.id}">${esc(x.text)}</button>`).join('')}
      </div>
    </div>`);

  let selL = null, selR = null, solved = 0, hadMistake = false;
  const check = () => {
    if (!selL || !selR) return;
    const [l, r] = [selL, selR];
    selL = selR = null;
    if (l.dataset.id === r.dataset.id) {
      [l, r].forEach(b => { b.classList.remove('sel'); b.classList.add('solved'); b.disabled = true; });
      if (++solved === ex.pairs.length) {
        showFeedback(s, !hadMistake, { explain: hadMistake ? 'All matched — but with slips. One more pass later.' : 'All pairs matched.' }, { requeue: false, penalty: false });
        if (hadMistake) s.queue.push({ ...ex });
      }
    } else {
      hadMistake = true;
      [l, r].forEach(b => { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake', 'sel'), 500); });
    }
  };
  const wire = (colId, side) => {
    document.querySelectorAll(`#${colId} .match-item`).forEach(btn =>
      btn.addEventListener('click', () => {
        document.querySelectorAll(`#${colId} .sel`).forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        if (side === 'l') selL = btn; else selR = btn;
        check();
      })
    );
  };
  wire('col-l', 'l');
  wire('col-r', 'r');
}

function renderBuild(s, ex) {
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="display-card">${audioButton(ex)}<span>${esc(ex.display)}</span></div>
    <div class="answer-row" id="answer"><span class="slash">/</span><span class="slash">/</span></div>
    <div class="tile-bank" id="bank">
      ${ex.tiles.map((t, i) => `<button class="btn tile" data-t="${esc(t)}" data-i="${i}">${esc(t)}</button>`).join('')}
    </div>
    <button class="btn btn-primary" id="check" disabled>Check</button>`);

  wireAudio(s, ex);
  setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex) }), 300);

  const chosen = [];
  const answerEl = document.getElementById('answer');
  const checkBtn = document.getElementById('check');

  const redraw = () => {
    answerEl.innerHTML = `<span class="slash">/</span>${chosen
      .map((c, i) => `<button class="btn tile placed" data-pos="${i}">${esc(c.t)}</button>`)
      .join('')}<span class="slash">/</span>`;
    checkBtn.disabled = chosen.length === 0;
    answerEl.querySelectorAll('.placed').forEach(btn =>
      btn.addEventListener('click', () => {
        const { bankBtn } = chosen.splice(+btn.dataset.pos, 1)[0];
        bankBtn.disabled = false;
        redraw();
      })
    );
  };

  document.querySelectorAll('#bank .tile').forEach(btn =>
    btn.addEventListener('click', () => {
      chosen.push({ t: btn.dataset.t, bankBtn: btn });
      btn.disabled = true;
      redraw();
    })
  );

  checkBtn.addEventListener('click', () => {
    const ok = chosen.map(c => c.t).join(' ') === ex.target.join(' ');
    checkBtn.disabled = true;
    showFeedback(s, ok, ex);
  });
}

function renderTypein(s, ex) {
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="display-card">${audioButton(ex)}<span>${esc(ex.display)}</span></div>
    <input class="type-input" id="answer-input" type="text" autocomplete="off"
           autocapitalize="none" spellcheck="false" placeholder="type the word…" />
    <button class="btn btn-primary" id="check" disabled>Check</button>`);

  wireAudio(s, ex);
  const input = document.getElementById('answer-input');
  const checkBtn = document.getElementById('check');
  input.focus();
  input.addEventListener('input', () => { checkBtn.disabled = !input.value.trim(); });
  const submit = () => {
    if (!input.value.trim()) return;
    input.disabled = true;
    checkBtn.disabled = true;
    const ok = input.value.trim().toLowerCase() === ex.answer.toLowerCase();
    input.classList.add(ok ? 'right' : 'wrong');
    showFeedback(s, ok, ex);
  };
  checkBtn.addEventListener('click', submit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

function renderGapBuild(s, ex) {
  const slotRow = ex.pattern.map((p, i) =>
    p === null
      ? `<button class="btn tile slot" data-slot="${i}"></button>`
      : `<span class="fixed-seg">${esc(p)}</span>`
  ).join('');
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="display-card">${audioButton(ex)}<span>${esc(ex.display)}</span></div>
    <div class="answer-row gap-row" id="answer"><span class="slash">/</span>${slotRow}<span class="slash">/</span></div>
    <div class="tile-bank" id="bank">
      ${ex.tiles.map((t, i) => `<button class="btn tile" data-t="${esc(t)}" data-i="${i}">${esc(t)}</button>`).join('')}
    </div>
    <button class="btn btn-primary" id="check" disabled>Check</button>`);

  wireAudio(s, ex);
  setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex) }), 300);

  const slots = [...document.querySelectorAll('.slot')];
  const checkBtn = document.getElementById('check');
  const filled = {}; // slot index -> {t, bankBtn}

  const refresh = () => { checkBtn.disabled = slots.some(sl => !filled[sl.dataset.slot]); };

  document.querySelectorAll('#bank .tile').forEach(btn =>
    btn.addEventListener('click', () => {
      const empty = slots.find(sl => !filled[sl.dataset.slot]);
      if (!empty) return;
      filled[empty.dataset.slot] = { t: btn.dataset.t, bankBtn: btn };
      empty.textContent = btn.dataset.t;
      empty.classList.add('filled');
      btn.disabled = true;
      refresh();
    })
  );
  slots.forEach(sl =>
    sl.addEventListener('click', () => {
      const f = filled[sl.dataset.slot];
      if (!f) return;
      f.bankBtn.disabled = false;
      delete filled[sl.dataset.slot];
      sl.textContent = '';
      sl.classList.remove('filled');
      refresh();
    })
  );
  checkBtn.addEventListener('click', () => {
    const gapIdxs = ex.pattern.map((p, i) => (p === null ? i : -1)).filter(i => i >= 0);
    const ok = gapIdxs.every((slotIdx, k) => filled[slotIdx]?.t === ex.answers[k]);
    checkBtn.disabled = true;
    showFeedback(s, ok, ex);
  });
}

// ── End screens ───────────────────────────────────────────────

function renderResults(s) {
  const perfect = s.mistakes === 0;
  if (s.lesson.practice) {
    const xp = 5 + (perfect ? 2 : 0);
    store.addXp(xp);
    app.innerHTML = `
      <main class="end-screen">
        <div class="end-emoji">🎯</div>
        <h1>${perfect ? 'Flawless practice!' : 'Practice complete!'}</h1>
        <p class="end-xp">+${xp} XP</p>
        <div class="end-actions">
          <button class="btn btn-primary" id="again">Practice again</button>
          <button class="btn" id="home">Done</button>
        </div>
      </main>`;
    document.getElementById('again').addEventListener('click', () => startLesson(practiceLesson(s.lesson.track)));
    document.getElementById('home').addEventListener('click', () => renderTrack(s.lesson.track));
    return;
  }
  const xp = 10 + (perfect ? 5 : 0);
  store.recordLesson(s.lesson.id, xp);
  const { done, total } = trackProgress(s.lesson.track);
  const mastered = done === total;
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">${mastered ? '🎓' : perfect ? '🏆' : '🎉'}</div>
      <h1>${mastered ? 'Course complete!' : perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      ${mastered ? `<p>${esc(s.lesson.track.title)} — mastered, start to finish.</p>` : ''}
      <p class="end-xp">+${xp} XP${perfect ? ' (perfect bonus)' : ''}</p>
      <button class="btn btn-primary" id="home">Continue</button>
    </main>`;
  document.getElementById('home').addEventListener('click', () => renderTrack(s.lesson.track));
}

function renderFail(s) {
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">💔</div>
      <h1>Out of hearts</h1>
      <p>No XP this time — but the sounds are still there. Go again.</p>
      <div class="end-actions">
        <button class="btn btn-primary" id="retry">Try again</button>
        <button class="btn" id="home">Back to course</button>
      </div>
    </main>`;
  document.getElementById('retry').addEventListener('click', () => startLesson(s.lesson));
  document.getElementById('home').addEventListener('click', () => renderTrack(s.lesson.track));
}

renderHome();
