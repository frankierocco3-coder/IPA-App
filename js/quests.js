// Daily quests: three small targets that reset each day.
// They PAID GEMS until 2026-10-05; gems were removed with the rest of the
// economy, so a quest is now a mark of what you did, not a transaction.
// `reward` and the stored `claimed` list are LEFT IN PLACE and unread —
// the same stop-reading-never-delete rule the other removals followed.
//
// Everything is derived from what the learner actually did — the hooks are
// called from the existing lesson-results flow and never change scoring.
// State lives in localStorage and is intentionally tiny.


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

export const questsCompleteCount = () => questRows().filter(r => r.complete).length;
// unclaimedCount retired with the reward it counted.
