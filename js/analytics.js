// Practice analytics: what the learner actually gets wrong.
//
// This module only *observes*. It never changes whether an answer counts as
// correct, never touches hearts, XP or lesson completion — it records what
// already happened so Weak Sounds and Today's Rehearsal have something real
// to work from.
//
// Storage: localStorage, matching the app's existing convention for small
// structured progress data. The whole payload is a few counters per phoneme
// (~55 of them) plus a bounded recent-history ring, so it stays small and can
// be read synchronously while rendering.

const KEY = 'speechcraft-analytics-v1';
const RECENT_WINDOW = 10;    // "recent accuracy" looks at the last N attempts
const HISTORY_CAP = 400;     // bounded so this can never grow without limit

// Confidence tiers — never show a precise percentage from a handful of tries.
export const CONFIDENCE = { NONE: 'none', EARLY: 'early', OK: 'ok' };
export function confidenceOf(attempts) {
  if (attempts < 5) return CONFIDENCE.NONE;
  if (attempts < 10) return CONFIDENCE.EARLY;
  return CONFIDENCE.OK;
}
export function accuracyLabel(stat) {
  const tier = confidenceOf(stat.attempts);
  if (tier === CONFIDENCE.NONE) return 'Not enough data';
  const pct = Math.round((stat.correct / stat.attempts) * 100);
  return tier === CONFIDENCE.EARLY ? `Early estimate · ~${pct}%` : `${pct}%`;
}

function blank() {
  return {
    version: 1,
    symbols: {},     // sym -> { attempts, correct, recent[], lastAt, totalMs }
    words: {},       // word -> { attempts, correct, lastAt }
    types: {},       // exercise type -> { attempts, correct }
    dialects: {},    // accent -> { attempts, correct }
    confusions: {},  // "a>b" -> count  (answer was a, learner chose b)
    history: [],     // bounded: [{ at, ok, sym, type, accent, ms }]
    startedAt: Date.now(),
  };
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw || typeof raw !== 'object') return blank();
    return { ...blank(), ...raw };
  } catch {
    return blank();
  }
}

function save(a) {
  try { localStorage.setItem(KEY, JSON.stringify(a)); }
  catch { /* quota or private mode — analytics is best-effort, never fatal */ }
}

export const getAnalytics = load;

/** Wipe practice analytics only. XP, streaks, lessons, projects, recordings all survive. */
export function resetAnalytics() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}

const bump = (bucket, key, ok) => {
  const s = bucket[key] ?? { attempts: 0, correct: 0 };
  s.attempts++;
  if (ok) s.correct++;
  bucket[key] = s;
  return s;
};

const symbolsIn = (text) => {
  // Pull /x/ tokens out of a label or explanation.
  const out = [];
  const re = /\/([^/\s]{1,4})\//g;
  let m;
  while ((m = re.exec(String(text ?? '')))) out.push(m[1]);
  return out;
};

/**
 * Record one answered exercise.
 *
 * `ex`      the exercise object the app already built
 * `ok`      whether the learner got it right (the app's own verdict)
 * `chose`   the label they picked, when it was a choice question
 * `ms`      response time
 * `accent`  the lesson's dialect, if any
 */
export function recordAttempt({ ex, ok, chose = null, ms = null, accent = null }) {
  if (!ex) return;
  const a = load();
  const at = Date.now();

  // The correct answer's symbols — from the winning choice, or the display.
  const correctLabel = ex.choices?.find(c => c.ok)?.label ?? ex.display ?? '';
  const syms = [...new Set([...symbolsIn(correctLabel), ...symbolsIn(ex.display)])];

  for (const sym of syms) {
    const s = a.symbols[sym] ?? { attempts: 0, correct: 0, recent: [], lastAt: 0, totalMs: 0 };
    s.attempts++;
    if (ok) s.correct++;
    s.recent = [...s.recent, ok ? 1 : 0].slice(-RECENT_WINDOW);
    s.lastAt = at;
    if (ms) s.totalMs += ms;
    a.symbols[sym] = s;
  }

  // A word-level target, when the exercise had one.
  const word = (ex.audioText ?? '').trim();
  if (word && !word.startsWith('/')) {
    const w = a.words[word.toLowerCase()] ?? { attempts: 0, correct: 0, lastAt: 0 };
    w.attempts++; if (ok) w.correct++; w.lastAt = at;
    a.words[word.toLowerCase()] = w;
  }

  if (ex.type) bump(a.types, ex.type, ok);
  if (accent) bump(a.dialects, accent, ok);

  // Confusion pair: they chose X when the answer was Y. Only meaningful when
  // both are single IPA symbols.
  if (!ok && chose) {
    const wrong = symbolsIn(chose)[0];
    const right = symbolsIn(correctLabel)[0];
    if (wrong && right && wrong !== right) {
      const k = `${right}>${wrong}`;
      a.confusions[k] = (a.confusions[k] ?? 0) + 1;
    }
  }

  a.history = [...a.history, { at, ok: !!ok, sym: syms[0] ?? null, type: ex.type ?? null, accent, ms }]
    .slice(-HISTORY_CAP);

  save(a);
}

const rate = s => (s.attempts ? s.correct / s.attempts : 0);
const recentRate = s => (s.recent?.length ? s.recent.reduce((x, y) => x + y, 0) / s.recent.length : rate(s));
const daysSince = ts => (ts ? (Date.now() - ts) / 86400e3 : 999);

/** Symbols ranked strongest / weakest, with enough data to be honest about it. */
export function symbolBreakdown() {
  const a = load();
  const rows = Object.entries(a.symbols).map(([sym, s]) => ({
    sym, ...s,
    accuracy: rate(s),
    recentAccuracy: recentRate(s),
    tier: confidenceOf(s.attempts),
    label: accuracyLabel(s),
    days: daysSince(s.lastAt),
    improving: recentRate(s) > rate(s) + 0.1 && s.attempts >= 5,
  }));
  const rated = rows.filter(r => r.tier !== CONFIDENCE.NONE);
  return {
    all: rows,
    strongest: [...rated].sort((x, y) => y.accuracy - x.accuracy).slice(0, 5),
    weakest: [...rated].sort((x, y) => x.accuracy - y.accuracy).slice(0, 5),
    improving: rows.filter(r => r.improving).slice(0, 5),
    stale: [...rows].filter(r => r.days >= 7).sort((x, y) => y.days - x.days).slice(0, 5),
    thin: rows.filter(r => r.tier === CONFIDENCE.NONE).length,
  };
}

export function confusionPairs(limit = 5) {
  const a = load();
  return Object.entries(a.confusions)
    .map(([k, count]) => { const [right, wrong] = k.split('>'); return { right, wrong, count }; })
    .sort((x, y) => y.count - x.count)
    .slice(0, limit);
}

export function totals() {
  const a = load();
  const attempts = Object.values(a.types).reduce((n, s) => n + s.attempts, 0);
  const correct = Object.values(a.types).reduce((n, s) => n + s.correct, 0);
  const days = new Set(a.history.map(h => new Date(h.at).toISOString().slice(0, 10)));
  return {
    attempts, correct,
    accuracy: attempts ? correct / attempts : 0,
    daysPractised: days.size,
    byType: Object.entries(a.types).map(([type, s]) => ({ type, ...s, accuracy: rate(s), label: accuracyLabel(s) })),
    byDialect: Object.entries(a.dialects).map(([id, s]) => ({ id, ...s, accuracy: rate(s), label: accuracyLabel(s) })),
  };
}

/**
 * Today's rehearsal: 3–5 things worth practising, each with a plain-English
 * reason. Deliberately a simple, explainable score rather than a black box.
 *
 *   priority = error rate
 *            + recent errors (weighted higher — today matters more than March)
 *            + time since last practice
 *            + confusion-pair frequency
 *            − a bonus for things already improving (so they don't dominate)
 */
export function dailyRehearsal(max = 4) {
  const a = load();
  const rows = Object.entries(a.symbols).map(([sym, s]) => {
    const err = 1 - rate(s);
    const recentErr = 1 - recentRate(s);
    const stale = Math.min(daysSince(s.lastAt) / 14, 1);       // caps at 2 weeks
    const improving = recentRate(s) > rate(s) + 0.1;
    const missedRecently = (s.recent ?? []).filter(x => x === 0).length;
    return { sym, s, err, recentErr, stale, improving, missedRecently };
  });

  const pairs = confusionPairs(8);
  const pairFor = sym => pairs.find(p => p.right === sym || p.wrong === sym);

  const scored = rows.map(r => {
    const pair = pairFor(r.sym);
    const pairWeight = pair ? Math.min(pair.count / 4, 1) : 0;
    const priority =
      r.err * 1.0 +
      r.recentErr * 1.6 +
      r.stale * 0.7 +
      pairWeight * 1.2 -
      (r.improving ? 0.5 : 0);
    return { ...r, pair, priority };
  });

  // Enough attempts to mean something, then highest priority first.
  const pool = scored.filter(r => r.s.attempts >= 3).sort((x, y) => y.priority - x.priority);
  const picks = [];
  const used = new Set();

  for (const r of pool) {
    if (picks.length >= max - 1) break;
    if (used.has(r.sym)) continue;
    // Don't stack the whole card with one confusion pair.
    if (r.pair && picks.some(p => p.pair && p.pair.right === r.pair.right)) continue;
    used.add(r.sym);
    if (r.pair) used.add(r.pair.right === r.sym ? r.pair.wrong : r.pair.right);
    picks.push({
      sym: r.sym,
      pair: r.pair,
      title: r.pair ? `/${r.pair.right}/ vs /${r.pair.wrong}/` : `/${r.sym}/`,
      why: r.pair
        ? `You've mixed these up ${r.pair.count} time${r.pair.count === 1 ? '' : 's'}.`
        : r.missedRecently >= 2
          ? `Missed ${r.missedRecently} of your last ${r.s.recent.length} attempts.`
          : r.stale >= 0.5
            ? `Not practised in ${Math.round(daysSince(r.s.lastAt))} days.`
            : `Accuracy is ${Math.round(rate(r.s) * 100)}% so far.`,
      phonemes: r.pair ? [r.pair.right, r.pair.wrong] : [r.sym],
    });
  }

  // Always end on something they're getting better at — rehearsal shouldn't
  // only ever feel like a list of failures.
  const win = scored.filter(r => r.improving && !used.has(r.sym))
    .sort((x, y) => y.s.attempts - x.s.attempts)[0];
  if (win) {
    picks.push({
      sym: win.sym, pair: null, title: `/${win.sym}/`,
      why: 'Keeping this one warm — it’s been improving.',
      phonemes: [win.sym], review: true,
    });
  }

  return picks.slice(0, max);
}

export const hasEnoughData = () => Object.keys(load().symbols).length > 0;
