import { COURSE, TRACKS, MODES, BOARDS } from './data/course.js';
import { PHONEMES, WORDS } from './data/phonemes.js';
import { generateLesson } from './engine.js';
import { store } from './state.js';
import { speak, ACCENT_LANG } from './audio.js';

const langFor = lesson => ACCENT_LANG[lesson?.accent] ?? 'en-GB';

const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Each track has its own unlock chain, independent of the others.
const unitById = Object.fromEntries(COURSE.map(u => [u.id, u]));

// Mini-game checkpoints woven between lessons: after every 2 lessons in
// a unit, a short review game covering everything the unit taught so far.
function expandUnit(unit) {
  const out = [];
  const covered = [];
  unit.lessons.forEach((l, i) => {
    out.push(l);
    covered.push(l);
    if ((i + 1) % 2 === 0 && unit.lessons.length > 1) {
      const phonemes = [...new Set(covered.flatMap(x => x.phonemes ?? []))];
      const types = [...new Set(covered.flatMap(x => x.types ?? []))];
      const accent = covered.find(x => x.accent)?.accent;
      const shiftTo = covered.find(x => x.shiftTo)?.shiftTo;
      // sprinkle in extra game-y types that fit the material
      const extras = accent || shiftTo ? ['fillBlank'] : ['match', 'fillBlank', 'gapBuild'];
      out.push({
        id: `chk-${unit.id}-${(i + 1) / 2}`,
        title: 'Checkpoint game',
        checkpoint: true,
        phonemes,
        types: [...new Set([...types, ...extras])],
        accent,
        shiftTo,
        count: 5,
      });
    }
  });
  return out;
}

const UNIT_EXPANDED = Object.fromEntries(COURSE.map(u => [u.id, expandUnit(u)]));
const TRACK_LESSONS = Object.fromEntries(TRACKS.map(t => [
  t.id,
  t.unitIds.flatMap(uid => UNIT_EXPANDED[uid].map(l => ({ ...l, unit: unitById[uid], track: t }))),
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

// Where a finished/quit lesson returns to.
function exitLesson(lesson) {
  if (lesson.board) return renderBoard(lesson.board);
  if (lesson.arcade) return renderArcade();
  if (lesson.track) return renderTrack(lesson.track);
  return renderHome();
}

// A single-mode arcade session: one exercise type, played on its own.
function modeLesson(mode) {
  return {
    id: 'mode-' + mode.id,
    title: mode.title,
    practice: true,
    arcade: true,
    mode,
    phonemes: mode.phonemes ?? [],
    types: [mode.type],
    count: 10,
    track: null,
  };
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
      <div class="brand">ʃə<span>Speechcraft</span></div>
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
      <button class="track-card arcade-entry" id="arcade-entry" style="--track-color:#c99e58">
        <div class="track-glyph">🕹️</div>
        <div class="track-info">
          <h2>Arcade</h2>
          <p>Every game and exercise on its own — pick one and just play.</p>
        </div>
        <div class="track-arrow">›</div>
      </button>
      <button class="track-card quest-entry" id="quest-entry" style="--track-color:#b3596e">
        <div class="track-glyph">🗺️</div>
        <div class="track-info">
          <h2>Quest Mode <span class="badge badge-dark">GAME</span></h2>
          <p>Roll across the board, beat each tile’s challenge, clear the map.</p>
        </div>
        <div class="track-arrow">›</div>
      </button>
      <button class="track-card chart-entry" id="chart-entry" style="--track-color:#64748b">
        <div class="track-glyph">📖</div>
        <div class="track-info">
          <h2>The IPA Chart</h2>
          <p>Every symbol, its sound, and example words — tap any to hear it.</p>
        </div>
        <div class="track-arrow">›</div>
      </button>
    </main>`;

  document.getElementById('freeplay').addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderHome();
  });
  document.getElementById('arcade-entry').addEventListener('click', renderArcade);
  document.getElementById('quest-entry').addEventListener('click', renderQuestPicker);
  document.getElementById('chart-entry').addEventListener('click', renderChart);
  app.querySelectorAll('.track-card:not(.arcade-entry)').forEach(btn =>
    btn.addEventListener('click', () => renderTrack(TRACKS.find(t => t.id === btn.dataset.track)))
  );
}

// ── Arcade: single-mode games ─────────────────────────────────

function renderArcade() {
  const cards = MODES.map(m => `
    <button class="mode-card" data-mode="${m.id}">
      <span class="mode-icon">${m.icon}</span>
      <span class="mode-title">${esc(m.title)}</span>
      <span class="mode-blurb">${esc(m.blurb)}</span>
    </button>`).join('');

  app.innerHTML = `
    <header class="topbar">
      <button class="back" id="back" title="Home">‹</button>
      <div class="track-title" style="color:#c99e58">🕹️ Arcade</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>
    <main class="track-list">
      <p class="track-blurb">Pick a game. Endless rounds, no hearts lost — just practice.</p>
      <div class="mode-grid">${cards}</div>
    </main>`;

  document.getElementById('back').addEventListener('click', renderHome);
  app.querySelectorAll('.mode-card').forEach(btn =>
    btn.addEventListener('click', () => startLesson(modeLesson(MODES.find(m => m.id === btn.dataset.mode))))
  );
}

// ── The IPA chart: a reference to browse ──────────────────────

function renderChart() {
  const syms = Object.entries(PHONEMES);
  const groups = [
    { title: 'Vowels', note: 'Single vowel sounds — short, long (ː), and the schwa /ə/.',
      items: syms.filter(([, p]) => p.type === 'vowel') },
    { title: 'Diphthongs', note: 'Vowels that glide from one position to another.',
      items: syms.filter(([, p]) => p.type === 'diphthong') },
    { title: 'Consonants', note: 'The consonant sounds of English.',
      items: syms.filter(([, p]) => p.type === 'consonant') },
  ];

  const section = g => `
    <section class="chart-section">
      <h2 class="chart-h">${esc(g.title)} <span>${g.items.length}</span></h2>
      <p class="chart-note">${esc(g.note)}</p>
      <div class="chart-grid">
        ${g.items.map(([sym, p]) => `
          <button class="chart-chip" data-say="${esc(p.examples[0])}" title="Hear “${esc(p.examples[0])}”">
            <span class="chart-sym">${esc(sym)}</span>
            <span class="chart-meta">
              <span class="chart-name">${esc(p.name)}</span>
              <span class="chart-eg">${p.examples.slice(0, 2).map(w => `<b>${esc(w)}</b>`).join(', ')}</span>
            </span>
            <span class="chart-play">🔊</span>
          </button>`).join('')}
      </div>
    </section>`;

  app.innerHTML = `
    <header class="topbar">
      <button class="back" id="back" title="Home">‹</button>
      <div class="track-title" style="color:#64748b">📖 The IPA Chart</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>
    <main class="tree chart-page">
      <p class="track-blurb">The full alphabet of sounds. Tap any symbol to hear a word that uses it.</p>
      ${groups.map(section).join('')}
    </main>`;

  document.getElementById('back').addEventListener('click', renderHome);
  app.querySelectorAll('.chart-chip').forEach(btn =>
    btn.addEventListener('click', () => speak(btn.dataset.say))
  );
}

// ── Quest Mode: board game ────────────────────────────────────

let questState = null; // { board, pos, rolling }

function boardUnlocked(board) {
  if (store.freePlay) return true;
  const i = BOARDS.findIndex(b => b.id === board.id);
  return i === 0 || store.isBoardDone(BOARDS[i - 1].id);
}

function boardTiles(board) {
  const n = board.tiles;
  return Array.from({ length: n }, (_, i) => {
    if (i === 0) return { i, kind: 'start' };
    if (i === n - 1) return { i, kind: 'goal' };
    if (i === n - 2) return { i, kind: 'boss' };
    if (i % 4 === 0) return { i, kind: 'bonus' };
    return { i, kind: 'challenge' };
  });
}

function tilePool(board, i) {
  const frac = i / (board.tiles - 1);
  const tier = frac < 0.34 ? 0 : frac < 0.67 ? 1 : 2;
  return board.tiers[Math.min(tier, board.tiers.length - 1)];
}

const TILE_ICON = { start: '🏳️', goal: '🏁', boss: '👑', bonus: '💎', challenge: '' };
const BOARD_COLS = 4;

// Tile positions as percentages on the board plane (serpentine path).
function tileLayout(board) {
  const rows = Math.ceil(board.tiles / BOARD_COLS);
  return boardTiles(board).map(t => {
    const r = Math.floor(t.i / BOARD_COLS);
    const c = r % 2 === 0 ? t.i % BOARD_COLS : BOARD_COLS - 1 - (t.i % BOARD_COLS);
    return { ...t, row: r, x: (c + 0.5) / BOARD_COLS * 100, y: (r + 0.5) / rows * 100 };
  });
}

function renderQuestPicker() {
  const cards = BOARDS.map(b => {
    const unlocked = boardUnlocked(b);
    const done = store.isBoardDone(b.id);
    return `
      <button class="track-card ${unlocked ? '' : 'locked-card'}" data-board="${b.id}"
              style="--track-color:${b.color}" ${unlocked ? '' : 'disabled'}>
        <div class="track-glyph">${unlocked ? b.icon : '🔒'}</div>
        <div class="track-info">
          <h2>${esc(b.title)}${done ? ' <span class="badge badge-gold">🏆 CLEARED</span>' : ''}</h2>
          <p>${esc(b.blurb)}</p>
        </div>
        <div class="track-arrow">›</div>
      </button>`;
  }).join('');

  app.innerHTML = `
    <header class="topbar">
      <button class="back" id="back" title="Home">‹</button>
      <div class="track-title" style="color:#b3596e">🗺️ Quest Mode</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>
    <main class="track-list">
      <p class="track-blurb">Pick a board. Roll to move, beat each tile’s challenge, reach the flag. Clear a board to unlock the next.</p>
      ${cards}
    </main>`;

  document.getElementById('back').addEventListener('click', renderHome);
  app.querySelectorAll('.track-card[data-board]:not(.locked-card)').forEach(btn =>
    btn.addEventListener('click', () => {
      const board = BOARDS.find(b => b.id === btn.dataset.board);
      questState = { board, pos: 0, rolling: false };
      renderBoard(board);
    })
  );
}

function renderBoard(board) {
  const tiles = boardTiles(board);
  const layout = tileLayout(board);
  const rows = Math.ceil(board.tiles / BOARD_COLS);
  const cur = layout[questState.pos];

  // The route drawn point-to-point through every tile centre.
  const route = 'M ' + layout.map(t => `${t.x.toFixed(1)} ${t.y.toFixed(1)}`).join(' L ');

  const tileEls = layout.map(t => {
    const here = t.i === questState.pos;
    const passed = t.i < questState.pos;
    return `
      <div class="qtile3d ${t.kind} ${here ? 'here' : ''} ${passed ? 'passed' : ''}"
           style="left:${t.x}%; top:${t.y}%; --tile-color:${board.color}" data-i="${t.i}">
        <span class="qtile-num">${TILE_ICON[t.kind] || (t.i + 1)}</span>
      </div>`;
  }).join('');

  const atGoal = questState.pos >= board.tiles - 1;
  app.innerHTML = `
    <header class="topbar">
      <button class="back" id="back" title="Quests">‹</button>
      <div class="track-title" style="color:${board.color}">${board.icon} ${esc(board.title)}</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>
    <main class="board-page">
      <div class="board3d-wrap">
        <div class="board3d ground-${board.id}" style="aspect-ratio:${BOARD_COLS} / ${rows}">
          <svg class="route" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="${route}" />
          </svg>
          ${tileEls}
          <div class="pawn" id="pawn" style="left:${cur.x}%; top:${cur.y}%">
            <div class="pawn-shadow"></div>
            <div class="pawn-figure" style="--pawn:${board.color}">
              <div class="pawn-head"></div>
              <div class="pawn-body"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="board-controls">
        <div class="die" id="die">🎲</div>
        <button class="btn btn-primary" id="roll" ${atGoal ? 'disabled' : ''}>Roll</button>
      </div>
      <p class="board-hint" id="hint">Tile ${questState.pos + 1} of ${board.tiles}. Roll to move.</p>
    </main>`;

  document.getElementById('back').addEventListener('click', renderQuestPicker);
  const rollBtn = document.getElementById('roll');
  if (rollBtn && !atGoal) rollBtn.addEventListener('click', () => rollDice(board, tiles));
}

function rollDice(board, tiles) {
  if (questState.rolling) return;
  questState.rolling = true;
  const die = 1 + Math.floor(Math.random() * 3);
  const dieEl = document.getElementById('die');
  const hint = document.getElementById('hint');
  const rollBtn = document.getElementById('roll');
  if (rollBtn) rollBtn.disabled = true;
  if (dieEl) dieEl.textContent = ['⚀', '⚁', '⚂'][die - 1];
  if (hint) hint.textContent = `Rolled ${die}!`;
  const target = Math.min(questState.pos + die, board.tiles - 1);

  const hop = () => {
    if (questState.pos < target) {
      questState.pos++;
      redrawTokenOnly(board);
      setTimeout(hop, 240);
    } else {
      questState.rolling = false;
      onLand(board, tiles[questState.pos]);
    }
  };
  setTimeout(hop, 240);
}

// Walk the character to its new tile without rebuilding the board.
function redrawTokenOnly(board) {
  const layout = tileLayout(board);
  const cur = layout[questState.pos];
  const pawn = document.getElementById('pawn');
  if (pawn) {
    pawn.style.left = cur.x + '%';
    pawn.style.top = cur.y + '%';
    pawn.classList.add('walking');
    clearTimeout(pawn._walkT);
    pawn._walkT = setTimeout(() => pawn.classList.remove('walking'), 400);
  }
  document.querySelectorAll('.qtile3d').forEach(el => {
    const i = +el.dataset.i;
    el.classList.toggle('here', i === questState.pos);
    el.classList.toggle('passed', i < questState.pos);
  });
}

function onLand(board, tile) {
  if (tile.kind === 'goal') return finishBoard(board);
  if (tile.kind === 'bonus') {
    store.addXp(5);
    const hint = document.getElementById('hint');
    if (hint) hint.textContent = '💎 Bonus! +5 XP. Roll again.';
    const rollBtn = document.getElementById('roll');
    if (rollBtn) rollBtn.disabled = false;
    return;
  }
  // challenge or boss → run the tile's challenge
  const boss = tile.kind === 'boss';
  startLesson({
    id: 'challenge-' + board.id + '-' + tile.i,
    title: boss ? 'Boss challenge' : 'Challenge',
    challenge: true,
    board,
    boss,
    accent: null,
    phonemes: board.phonemes,
    types: tilePool(board, tile.i),
    count: boss ? 3 : 1,
    onResult: passed => {
      if (!passed) {
        questState.pos = Math.max(0, questState.pos - (boss ? 2 : 1));
      }
      questState.rolling = false;
      renderBoard(board);
      const hint = document.getElementById('hint');
      if (hint) hint.textContent = passed
        ? (boss ? '👑 Boss beaten! The flag is close.' : '✓ Cleared! Roll again.')
        : (boss ? '💥 The boss knocked you back. Try again.' : '✗ Missed — knocked back a tile.');
    },
  });
}

function finishBoard(board) {
  const already = store.isBoardDone(board.id);
  const xp = already ? 10 : 30;
  store.completeBoard(board.id, xp);
  const i = BOARDS.findIndex(b => b.id === board.id);
  const next = BOARDS[i + 1];
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">🏆</div>
      <h1>${esc(board.title)} cleared!</h1>
      <p class="end-xp">+${xp} XP</p>
      ${next && !already ? `<p>Unlocked: <b>${esc(next.title)}</b></p>` : ''}
      <div class="end-actions">
        <button class="btn btn-primary" id="more">More quests</button>
        <button class="btn" id="home">Home</button>
      </div>
    </main>`;
  document.getElementById('more').addEventListener('click', renderQuestPicker);
  document.getElementById('home').addEventListener('click', renderHome);
}

// ── Track page: that dialect's units & lessons ────────────────

// The face of a lesson node: the IPA it teaches (checkpoints keep the
// dice, mastery finals the crown).
function lessonNodeIcon(lesson) {
  if (lesson.checkpoint) return { text: '🎲', ipa: false };
  if (/final|mastery/.test(lesson.id) || (lesson.count && lesson.count >= 12)) return { text: '👑', ipa: false };
  const phs = lesson.phonemes || [];
  if (!phs.length) return { text: '⭐', ipa: false };
  const two = phs.slice(0, 2).join(' ');
  return { text: two.length <= 5 ? two : phs[0], ipa: true };
}

// Winding path, Duolingo-style skeleton: sequential nodes zig-zagging down,
// one active "START" node with a mascot, sticky unit banners.
const PATH_OFFSETS = [0, 48, 70, 48, 0, -48, -70, -48];

function renderTrack(track) {
  const chain = TRACK_LESSONS[track.id];
  const active = chain.find(l => !store.isCompleted(l.id) && isUnlocked(l));
  let gi = 0;

  const unitsHtml = track.unitIds.map((uid, ui) => {
    const unit = unitById[uid];
    const rows = UNIT_EXPANDED[uid].map(raw => {
      const l = chain.find(x => x.id === raw.id);
      const done = store.isCompleted(l.id);
      const isActive = active && l.id === active.id;
      const unlocked = isUnlocked(l);
      const state = done ? 'done' : isActive ? 'active' : unlocked ? 'open' : 'locked';
      const dx = PATH_OFFSETS[gi % PATH_OFFSETS.length];
      gi++;
      const face = done ? { text: '✓', ipa: false } : unlocked ? lessonNodeIcon(l) : { text: '🔒', ipa: false };
      const mascotSide = dx <= 0 ? 1 : -1;
      return `
        <div class="path-row">
          <button class="path-node ${state} ${l.checkpoint ? 'checkpoint' : ''}" data-lesson="${l.id}" ${unlocked ? '' : 'disabled'}
                  style="--dx:${dx}px; --node-color:${unit.color}" title="${esc(l.title)}">
            ${isActive ? '<span class="start-flag">START</span>' : ''}
            <span class="path-icon ${face.ipa ? 'ipa' : ''}">${esc(face.text)}</span>
          </button>
          ${isActive ? `<div class="path-mascot" style="left:calc(50% + ${dx + mascotSide * 78}px)">🎭</div>` : ''}
        </div>`;
    }).join('');
    return `
      <div class="unit-banner" style="--unit-color:${unit.color}">
        <div class="unit-banner-label">${esc(track.title)} · Unit ${ui + 1}</div>
        <div class="unit-banner-title">${esc(unit.title)}</div>
      </div>
      <div class="path">${rows}</div>`;
  }).join('');

  app.innerHTML = `
    <header class="topbar">
      <button class="back" id="back" title="All tracks">‹</button>
      <div class="track-title" style="color:${track.color}">${track.icon} ${esc(track.title)}</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>
    <main class="track-scroll">
      <div class="practice-row">
        <button class="btn btn-practice" id="practice">🎯 Practice — mixed review, no hearts lost</button>
      </div>
      ${unitsHtml}
    </main>`;

  document.getElementById('back').addEventListener('click', renderHome);
  document.getElementById('practice').addEventListener('click', () => startLesson(practiceLesson(track)));
  app.querySelectorAll('.path-node[data-lesson]:not([disabled])').forEach(btn =>
    btn.addEventListener('click', () => {
      const lesson = chain.find(l => l.id === btn.dataset.lesson);
      // Checkpoint games jump straight in — no guide page.
      if (lesson.checkpoint) startLesson(lesson);
      else renderGuide(lesson);
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
      <div class="hearts">${s.lesson.practice ? '♾️' : '❤️'.repeat(s.hearts) + '🖤'.repeat(3 - s.hearts)}</div>
    </header>
    <main class="exercise" data-accent="${s.lesson.accent ?? ''}">${body}</main>
    <footer class="feedback" id="feedback"></footer>`;
  document.getElementById('quit').addEventListener('click', () => exitLesson(s.lesson));
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
    if (penalty && !s.lesson.practice && !s.lesson.challenge) s.hearts--;
    s.mistakes++;
    if (requeue && !s.lesson.challenge && s.hearts > 0) s.queue.push({ ...ex });
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
        if (hadMistake && !s.lesson.challenge) s.queue.push({ ...ex });
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
  if (s.lesson.challenge) { s.lesson.onResult(perfect); return; }
  if (s.lesson.practice) {
    const xp = 5 + (perfect ? 2 : 0);
    store.addXp(xp);
    const arcade = s.lesson.arcade;
    app.innerHTML = `
      <main class="end-screen">
        <div class="end-emoji">${arcade ? s.lesson.mode.icon : '🎯'}</div>
        <h1>${perfect ? (arcade ? 'Flawless round!' : 'Flawless practice!') : (arcade ? 'Round complete!' : 'Practice complete!')}</h1>
        <p class="end-xp">+${xp} XP</p>
        <div class="end-actions">
          <button class="btn btn-primary" id="again">${arcade ? 'Play again' : 'Practice again'}</button>
          <button class="btn" id="home">Done</button>
        </div>
      </main>`;
    document.getElementById('again').addEventListener('click', () =>
      startLesson(arcade ? modeLesson(s.lesson.mode) : practiceLesson(s.lesson.track)));
    document.getElementById('home').addEventListener('click', () => exitLesson(s.lesson));
    return;
  }
  const xp = 10 + (perfect ? 5 : 0);
  store.recordLesson(s.lesson.id, xp);
  const { done, total } = trackProgress(s.lesson.track);
  const mastered = done === total;
  const chk = s.lesson.checkpoint;
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">${mastered ? '🎓' : chk ? '🎲' : perfect ? '🏆' : '🎉'}</div>
      <h1>${mastered ? 'Course complete!' : chk ? 'Checkpoint cleared!' : perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      ${mastered ? `<p>${esc(s.lesson.track.title)} — mastered, start to finish.</p>` : ''}
      <p class="end-xp">+${xp} XP${perfect ? ' (perfect bonus)' : ''}</p>
      <button class="btn btn-primary" id="home">Continue</button>
    </main>`;
  document.getElementById('home').addEventListener('click', () => exitLesson(s.lesson));
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
