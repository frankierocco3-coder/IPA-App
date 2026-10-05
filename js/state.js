// Progress persistence: completed lessons. localStorage only.

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

let warnedStorage = false;

/**
 * Write progress. Returns false if the device refused it.
 *
 * This used to throw. Safari refuses storage outright when the reader has
 * blocked cookies, and a full device throws QuotaExceededError, so an
 * unguarded write aborted whatever called it — finishing a lesson, claiming
 * a quest — part-way through. Best-effort is the house
 * pattern for localStorage here (see quests.js, analytics.js, the stores).
 *
 * It fails SILENTLY to the reader, which is honest only as far as the
 * console. Telling them their progress is not being kept is product copy
 * and the owner's call.
 */
function save(state) {
  state.v = SCHEMA_VERSION;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    if (!warnedStorage) {
      warnedStorage = true;      // every later write would fail the same way
      console.warn('Speechcraft: this device refused to store progress. '
        + 'Completed lessons will not survive a reload.');
    }
    return false;
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ── XP: REMOVED 2026-10-05 ───────────────────────────────────
// The last of it. XP was a points total that said nothing "lessons
// completed" and "answers given" did not already say more honestly, and
// it was the last thing in the app that scored a person rather than
// describing what they had done.
//
// `xp` STAYS IN STORED DATA AND IS DELIBERATELY NOT READ, like hearts,
// streak, lastPlayed, freezes, gems and boostUntil before it. Six values,
// four removals, nothing deleted.

// ── Gems, the Shop and the XP boost: REMOVED 2026-10-05 ──────
// The last of the Duolingo economy, after hearts and streaks. Gems were
// earned by finishing lessons and claiming quests, and the only thing
// left to spend them on was a 15-minute double-XP boost — so removing
// them took the Shop and the boost with them by arithmetic rather than by
// choice: a shop with no currency sells nothing.
//
// `gems` and `boostUntil` STAY IN STORED DATA AND ARE DELIBERATELY NOT
// READ, like hearts, streak, lastPlayed and freezes before them.

// ── Streaks: REMOVED 2026-10-05, by the owner's decision ─────
// A day counter that reset when you missed a day, with "streak freezes"
// sold in the Shop to bridge one missed day. It manufactured guilt, and
// for actors with irregular schedules it punished you for working.
//
// Streak freezes went with it: a freeze protecting a streak that no longer
// exists is not a product, it is a leftover.
//
// `streak`, `lastPlayed` and `freezes` ARE STILL IN STORED DATA AND ARE
// DELIBERATELY NOT READ — nothing migrated, nothing deleted, the same
// treatment hearts and the retired goal picker got.

// ── Hearts: REMOVED 2026-10-05, by the owner's decision ───────
// Five hearts used to gate the Learn path — a wrong answer cost one, an
// empty pool stopped the lesson, and gems bought them back. It was the
// only mechanic in the app that could stop somebody practising, which is
// the wrong thing for a tool people may pay for to do.
//
// `heartsV2` IS STILL IN STORED DATA AND IS DELIBERATELY NOT READ. Nothing
// is migrated and nothing is deleted — the same treatment the retired goal
// picker got, and the reason this was reversible rather than destructive.

export const store = {
  get completed() { return new Set(load().completed ?? []); },

  isCompleted(lessonId) { return this.completed.has(lessonId); },

  // COMPLETION SURVIVES, the points do not. Finishing a lesson is a fact
  // worth remembering; what it was "worth" was not.
  recordLesson(lessonId) {
    const s = load();
    s.completed = [...new Set([...(s.completed ?? []), lessonId])];
    save(s);
  },


  // Last text pasted into "Train Any Text" — { title, body, accent }.
  get customText() { return load().customText ?? null; },
  saveCustomText(v) { const s = load(); s.customText = v; save(s); },

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
  // Quests stay quiet until something is earned.
  get hasEarnedAnything() { return (load().completed ?? []).length > 0; },

  // ── Free play ───────────────────────────────────────────────
  // Unlocks every lesson for browsing. Persistence restored (B04 bug #2:
  // "Remove Quest Mode" deleted this accessor in July while the UI kept
  // the toggle, silently demoting the flag to per-session memory).
  // Strictly boolean both ways: any missing, legacy or malformed stored
  // value reads as false, and only `true` is ever written as true.
  get freePlay() { return load().freePlay === true; },
  set freePlay(on) { const s = load(); s.freePlay = on === true; save(s); },

  // ── First-launch preface (né "Before You Speak", now "Why
  // Speech Matters" — Build A retitled the copy; the record shape,
  // key and semantics are unchanged) ──────────────────────────
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
  // Completion badge only, so "Progress
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
