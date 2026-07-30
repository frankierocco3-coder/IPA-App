// Daily quests: three small targets that reset each day, paying gems.
//
// Everything is derived from what the learner actually did — the hooks are
// called from the existing lesson-results flow and never change scoring.
// State lives in localStorage and is intentionally tiny.

import { store } from './state.js';

const KEY = 'speechcraft-quests-v1';

export const DAILY_QUESTS = [
  { id: 'xp30', icon: '⚡', title: 'Earn 30 XP', metric: 'xp', target: 30, reward: 20 },
  { id: 'perfect', icon: '🎯', title: 'Score 100% in a lesson', metric: 'perfect', target: 1, reward: 25 },
  { id: 'games2', icon: '🕹', title: 'Finish 2 practice rounds', metric: 'games', target: 2, reward: 25 },
];

const todayStr = () => new Date().toISOString().slice(0, 10);

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && raw.date === todayStr()) return raw;
  } catch { /* fall through to a fresh day */ }
  return { date: todayStr(), progress: { xp: 0, perfect: 0, games: 0 }, claimed: [] };
}

function save(q) {
  try { localStorage.setItem(KEY, JSON.stringify(q)); } catch { /* best effort */ }
}

export function bumpQuest(metric, n = 1) {
  const q = load();
  q.progress[metric] = (q.progress[metric] ?? 0) + n;
  save(q);
}

/** Call once from the lesson-results screen. */
export function onLessonFinished({ xp = 0, perfect = false, isGame = false } = {}) {
  const q = load();
  q.progress.xp = (q.progress.xp ?? 0) + xp;
  if (perfect) q.progress.perfect = (q.progress.perfect ?? 0) + 1;
  if (isGame) q.progress.games = (q.progress.games ?? 0) + 1;
  save(q);
}

/** Rows for the UI: progress, completion, claim state. */
export function questRows() {
  const q = load();
  return DAILY_QUESTS.map(d => {
    const done = Math.min(q.progress[d.metric] ?? 0, d.target);
    return {
      ...d,
      done,
      complete: done >= d.target,
      claimed: q.claimed.includes(d.id),
    };
  });
}

/** Claim a completed quest's gems. Returns the reward, or 0. */
export function claimQuest(id) {
  const q = load();
  const def = DAILY_QUESTS.find(d => d.id === id);
  if (!def) return 0;
  if (q.claimed.includes(id)) return 0;
  if ((q.progress[def.metric] ?? 0) < def.target) return 0;
  q.claimed.push(id);
  save(q);
  store.addGems(def.reward);
  return def.reward;
}

export const questsCompleteCount = () => questRows().filter(r => r.complete).length;
export const unclaimedCount = () => questRows().filter(r => r.complete && !r.claimed).length;
