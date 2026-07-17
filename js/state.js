// Progress persistence: XP, streak, completed lessons. localStorage only.

const KEY = 'ipa-trainer-v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export const store = {
  get xp() { return load().xp ?? 0; },
  get streak() { return load().streak ?? 0; },
  get completed() { return new Set(load().completed ?? []); },

  isCompleted(lessonId) { return this.completed.has(lessonId); },

  recordLesson(lessonId, xpEarned) {
    const s = load();
    s.xp = (s.xp ?? 0) + xpEarned;
    s.completed = [...new Set([...(s.completed ?? []), lessonId])];

    const today = todayStr();
    if (s.lastPlayed !== today) {
      const yesterday = new Date(Date.now() - 86400e3).toISOString().slice(0, 10);
      s.streak = s.lastPlayed === yesterday ? (s.streak ?? 0) + 1 : 1;
      s.lastPlayed = today;
    }
    save(s);
  },

  get freePlay() { return load().freePlay ?? false; },
  set freePlay(on) {
    const s = load();
    s.freePlay = on;
    save(s);
  },

  // Streak shown on the home screen: 0 if the chain is broken.
  get displayStreak() {
    const s = load();
    if (!s.lastPlayed) return 0;
    const today = todayStr();
    const yesterday = new Date(Date.now() - 86400e3).toISOString().slice(0, 10);
    return (s.lastPlayed === today || s.lastPlayed === yesterday) ? (s.streak ?? 0) : 0;
  },
};
