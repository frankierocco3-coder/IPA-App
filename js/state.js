// Progress persistence: XP, streak, completed lessons. localStorage only.

const KEY = 'ipa-trainer-v1';

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY)) ?? {};
    // v1 (unversioned) data is fully forward-compatible — every reader
    // defaults missing fields. Never wipe on unknown versions; newer data
    // from a future build is read best-effort.
    return s;
  } catch {
    return {};
  }
}

const SCHEMA_VERSION = 2;   // bump only with a matching migration in load()

function save(state) {
  state.v = SCHEMA_VERSION;
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
  // { done, goal, accent, diagnostic } — `goal` is legacy (its picker is
  // gone; the stored value stays untouched and is read nowhere).
  // `diagnostic` is 'taken' | 'declined' | undefined — it retires the
  // Learn offer card. `done` doubles as the threshold's grandfathering
  // signal; do not rename it. Users whose progress predates onboarding
  // are marked done so they are never funnelled through first-run flows.
  get onboarding() { return load().onboarding ?? { done: false, goal: null, accent: null }; },
  saveOnboarding(patch) {
    const s = load();
    s.onboarding = { ...(s.onboarding ?? { done: false, goal: null, accent: null }), ...patch };
    save(s);
  },
  // Hearts, gems, streaks and quests stay quiet until something is earned.
  get hasEarnedAnything() { const s = load(); return (s.xp ?? 0) > 0 || (s.completed ?? []).length > 0; },

  // ── Free play ───────────────────────────────────────────────
  // Unlocks every lesson for browsing. Persistence restored (B04 bug #2:
  // "Remove Quest Mode" deleted this accessor in July while the UI kept
  // the toggle, silently demoting the flag to per-session memory).
  // Strictly boolean both ways: any missing, legacy or malformed stored
  // value reads as false, and only `true` is ever written as true.
  get freePlay() { return load().freePlay === true; },
  set freePlay(on) { const s = load(); s.freePlay = on === true; save(s); },

  // ── "Before You Speak" threshold ────────────────────────────
  // { version, completedAt, choice, source, lastReplayedAt, lastChoice }
  //   choice  'craft' | 'tools' | null (grandfathered users never chose)
  //   source  'first-run' | 'grandfathered'
  // The record is written once and never overwritten: replays only touch
  // lastReplayedAt/lastChoice. Versioned so a materially revised threshold
  // can be handled deliberately later.
  get threshold() { return load().threshold ?? null; },
  completeThreshold({ choice = null, source }) {
    const s = load();
    if (s.threshold) return s.threshold;          // never overwrite
    s.threshold = {
      version: 1,
      completedAt: new Date().toISOString(),
      choice,
      source,
      lastReplayedAt: null,
      lastChoice: null,
    };
    save(s);
    return s.threshold;
  },
  markThresholdReplay(lastChoice = null) {
    const s = load();
    if (!s.threshold) return null;                // replay implies a record
    s.threshold = { ...s.threshold, lastReplayedAt: new Date().toISOString(),
                    lastChoice: lastChoice ?? s.threshold.lastChoice ?? null };
    save(s);
    return s.threshold;
  },
  // One-time invitation card for grandfathered users (adjacent flag, not
  // part of the spec'd threshold record).
  get thresholdInviteSeen() { return load().thresholdInviteSeen === true; },
  dismissThresholdInvite() { const s = load(); s.thresholdInviteSeen = true; save(s); },

  // ── "What Is IPA?" intro module ─────────────────────────────
  // Completion badge only — deliberately no XP or gems, so "Progress
  // activates after your first lesson" stays true for fresh users.
  get whatIsIpa() { return load().whatIsIpa ?? { done: false, correct: 0 }; },
  markWhatIsIpa(correct) {
    const s = load();
    s.whatIsIpa = { done: true, correct, at: Date.now() };
    save(s);
  },

  // ── One-time course introductions ───────────────────────────
  get introsSeen() { return load().courseIntros ?? {}; },
  markIntroSeen(courseId) {
    const s = load();
    s.courseIntros = { ...(s.courseIntros ?? {}), [courseId]: true };
    save(s);
  },

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
