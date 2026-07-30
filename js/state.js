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

function touchStreak(s) {
  const today = todayStr();
  if (s.lastPlayed !== today) {
    const yesterday = new Date(Date.now() - 86400e3).toISOString().slice(0, 10);
    const dayBefore = new Date(Date.now() - 2 * 86400e3).toISOString().slice(0, 10);
    if (s.lastPlayed === yesterday) {
      s.streak = (s.streak ?? 0) + 1;
    } else if (s.lastPlayed === dayBefore && (s.freezes ?? 0) > 0) {
      // A streak freeze bridges exactly one missed day.
      s.freezes -= 1;
      s.streak = (s.streak ?? 0) + 1;
    } else {
      s.streak = 1;
    }
    s.lastPlayed = today;
  }
}

// ── Persistent hearts ─────────────────────────────────────────
// Five hearts shared across lessons. One regenerates every four hours;
// practice sessions and gems can restore them faster. Practice and Arcade
// never cost hearts.
export const HEART_MAX = 5;
const HEART_REGEN_MS = 4 * 60 * 60 * 1000;

function heartState(s) {
  if (!s.heartsV2) s.heartsV2 = { n: HEART_MAX, at: Date.now() };
  const h = s.heartsV2;
  if (h.n < HEART_MAX) {
    const regen = Math.floor((Date.now() - h.at) / HEART_REGEN_MS);
    if (regen > 0) {
      h.n = Math.min(HEART_MAX, h.n + regen);
      h.at = h.n >= HEART_MAX ? Date.now() : h.at + regen * HEART_REGEN_MS;
    }
  }
  return h;
}

export const store = {
  get xp() { return load().xp ?? 0; },
  get streak() { return load().streak ?? 0; },
  get completed() { return new Set(load().completed ?? []); },

  isCompleted(lessonId) { return this.completed.has(lessonId); },

  recordLesson(lessonId, xpEarned) {
    const s = load();
    if ((s.boostUntil ?? 0) > Date.now()) xpEarned *= 2;
    s.xp = (s.xp ?? 0) + xpEarned;
    s.completed = [...new Set([...(s.completed ?? []), lessonId])];
    touchStreak(s);
    save(s);
  },

  // Practice sessions: XP and streak, but no lesson gets marked complete.
  addXp(xpEarned) {
    const s = load();
    if ((s.boostUntil ?? 0) > Date.now()) xpEarned *= 2;
    s.xp = (s.xp ?? 0) + xpEarned;
    touchStreak(s);
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

  // Last text pasted into "Train Any Text" — { title, body, accent }.
  get customText() { return load().customText ?? null; },
  saveCustomText(v) { const s = load(); s.customText = v; save(s); },

  // ── Gems: earned in lessons and quests, spent in the Shop ──
  get gems() { return load().gems ?? 0; },
  addGems(n) { const s = load(); s.gems = (s.gems ?? 0) + n; save(s); },
  spendGems(n) {
    const s = load();
    if ((s.gems ?? 0) < n) return false;
    s.gems -= n;
    save(s);
    return true;
  },

  // ── Hearts ─────────────────────────────────────────────────
  get hearts() { const s = load(); const h = heartState(s); save(s); return h.n; },
  // When the next heart arrives, in ms — null when full.
  get nextHeartMs() {
    const s = load(); const h = heartState(s);
    return h.n >= HEART_MAX ? null : (h.at + HEART_REGEN_MS) - Date.now();
  },
  loseHeart() {
    const s = load(); const h = heartState(s);
    if (h.n > 0) { if (h.n === HEART_MAX) h.at = Date.now(); h.n -= 1; }
    save(s); return h.n;
  },
  gainHeart() {
    const s = load(); const h = heartState(s);
    h.n = Math.min(HEART_MAX, h.n + 1);
    save(s); return h.n;
  },
  refillHearts() { const s = load(); s.heartsV2 = { n: HEART_MAX, at: Date.now() }; save(s); },

  // ── Streak freezes (max 2 equipped, like the template) ─────
  get freezes() { return load().freezes ?? 0; },
  addFreeze() {
    const s = load();
    if ((s.freezes ?? 0) >= 2) return false;
    s.freezes = (s.freezes ?? 0) + 1;
    save(s); return true;
  },

  // ── XP boost ────────────────────────────────────────────────
  get boostActive() { return (load().boostUntil ?? 0) > Date.now(); },
  get boostUntil() { return load().boostUntil ?? 0; },
  startBoost(minutes = 15) { const s = load(); s.boostUntil = Date.now() + minutes * 60000; save(s); },

  // ── Onboarding / preferences ────────────────────────────────
  // { done, goal, accent, diagnostic } — goal is one of GOALS' ids. Users
  // whose progress predates onboarding are marked done on first load so
  // they are never funnelled through it.
  get onboarding() { return load().onboarding ?? { done: false, goal: null, accent: null }; },
  saveOnboarding(patch) {
    const s = load();
    s.onboarding = { ...(s.onboarding ?? { done: false, goal: null, accent: null }), ...patch };
    save(s);
  },
  // Hearts, gems, streaks and quests stay quiet until something is earned.
  get hasEarnedAnything() { const s = load(); return (s.xp ?? 0) > 0 || (s.completed ?? []).length > 0; },

  // ── Local profile ───────────────────────────────────────────
  get profile() {
    const s = load();
    if (!s.firstSeen) { s.firstSeen = Date.now(); save(s); }
    return { name: s.profileName ?? 'Actor', avatar: s.profileAvatar ?? '🎭', firstSeen: s.firstSeen };
  },
  saveProfile({ name, avatar }) {
    const s = load();
    if (name != null) s.profileName = String(name).slice(0, 40);
    if (avatar != null) s.profileAvatar = String(avatar).slice(0, 8);
    save(s);
  },
};
