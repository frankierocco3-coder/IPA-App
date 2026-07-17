import { COURSE } from './data/course.js';
import { PHONEMES, WORDS } from './data/phonemes.js';
import { generateLesson } from './engine.js';
import { store } from './state.js';
import { speak } from './audio.js';

const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Global order of lessons for the unlock chain.
const ALL_LESSONS = COURSE.flatMap(u => u.lessons.map(l => ({ ...l, unit: u })));

function isUnlocked(lessonId) {
  if (store.freePlay) return true;
  const i = ALL_LESSONS.findIndex(l => l.id === lessonId);
  return i === 0 || store.isCompleted(ALL_LESSONS[i - 1].id);
}

// ── Home / skill tree ─────────────────────────────────────────

function renderHome() {
  const units = COURSE.map(unit => {
    const nodes = unit.lessons.map(l => {
      const done = store.isCompleted(l.id);
      const unlocked = isUnlocked(l.id);
      const cls = done ? 'done' : unlocked ? 'open' : 'locked';
      return `
        <button class="node ${cls}" data-lesson="${l.id}" ${unlocked ? '' : 'disabled'}
                style="${done || unlocked ? `--node-color:${unit.color}` : ''}">
          <span class="node-icon">${done ? '✓' : unlocked ? '★' : '🔒'}</span>
          <span class="node-title">${esc(l.title)}</span>
        </button>`;
    }).join('');
    return `
      <section class="unit">
        <header class="unit-header" style="--unit-color:${unit.color}">
          <div class="unit-glyph">${unit.icon}</div>
          <div>
            <h2>${esc(unit.title)}${unit.accent ? ' <span class="badge">ACCENT</span>' : ''}</h2>
            <p>${esc(unit.blurb)}</p>
          </div>
        </header>
        <div class="nodes">${nodes}</div>
      </section>`;
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
    <main class="tree">${units}</main>`;

  document.getElementById('freeplay').addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderHome();
  });

  app.querySelectorAll('.node[data-lesson]').forEach(btn =>
    btn.addEventListener('click', () => {
      const lesson = ALL_LESSONS.find(l => l.id === btn.dataset.lesson);
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

  const rpWords = lesson.rpOnly
    ? WORDS.filter(w => w.rp && w.ipa.some(s => lesson.phonemes.includes(s)))
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
      ${rpWords ? `<h2 class="guide-heading">RP words to know</h2>${rpWords}` : ''}
      <div class="guide-start">
        <button class="btn btn-primary" id="start">Start lesson</button>
      </div>
    </main>`;

  document.getElementById('quit').addEventListener('click', renderHome);
  document.getElementById('start').addEventListener('click', () => startLesson(lesson));
  app.querySelectorAll('[data-say]').forEach(btn =>
    btn.addEventListener('click', () => speak(btn.dataset.say))
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
    <main class="exercise">${body}</main>
    <footer class="feedback" id="feedback"></footer>`;
  document.getElementById('quit').addEventListener('click', renderHome);
}

function renderExercise(s) {
  if (s.hearts === 0) return renderFail(s);
  if (s.index >= s.queue.length) return renderResults(s);
  const ex = s.queue[s.index];
  if (ex.type === 'match') renderMatch(s, ex);
  else if (ex.type === 'build') renderBuild(s, ex);
  else renderChoice(s, ex);
}

function audioButton(ex) {
  return ex.audioText
    ? `<button class="speaker" id="speaker" title="Play audio">🔊</button>`
    : '';
}

function wireAudio(ex, onFirstPlay) {
  const btn = document.getElementById('speaker');
  if (!btn) return;
  let played = false;
  btn.addEventListener('click', () => {
    speak(ex.audioText);
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
    if (penalty) s.hearts--;
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

  wireAudio(ex, () => {
    document.querySelectorAll('.choice').forEach(b => (b.disabled = false));
    document.getElementById('choices')?.classList.remove('gated');
  });
  if (ex.audioText && !gated) setTimeout(() => speak(ex.audioText), 300);

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

  wireAudio(ex);
  setTimeout(() => speak(ex.audioText), 300);

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

// ── End screens ───────────────────────────────────────────────

function renderResults(s) {
  const perfect = s.mistakes === 0;
  const xp = 10 + (perfect ? 5 : 0);
  store.recordLesson(s.lesson.id, xp);
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">${perfect ? '🏆' : '🎉'}</div>
      <h1>${perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      <p class="end-xp">+${xp} XP${perfect ? ' (perfect bonus)' : ''}</p>
      <button class="btn btn-primary" id="home">Continue</button>
    </main>`;
  document.getElementById('home').addEventListener('click', renderHome);
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
  document.getElementById('home').addEventListener('click', renderHome);
}

renderHome();
