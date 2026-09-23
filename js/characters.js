// My Characters: the Building a Character Studio (owner order 2026-09-22).
//
// A shelf of the characters a learner is building, each a worksheet with
// the SAME breakdown the commedia chapters use (want, fear, contradiction,
// status, centre, what leads, stance, walk, thinking, fear and desire,
// gestures, audience, signature, recovery, voice, words). Three kinds,
// matching the course's three kinds of character work:
//   scratch   a person you invent; adds the people you observed
//   given     a role you have been cast in; linked to a script by title
//   commedia  your version of a mask; the tradition's answers shown
//             beside each field (COMMEDIA_MASKS, never copied)
//
// Storage: IndexedDB `meta` store, like the notebook — user-authored text
// never goes in localStorage, and `meta` already exists, so there is no
// schema change and nothing to migrate. One index record plus one record
// per character, so typing in one worksheet never rewrites the others.
// `meta` is in CONTENT_STORES, so both Privacy wipes clear it.
//
// Private, on this device, never scored.

import { metaGet, metaSet, idbDelete, STORES, uid } from './db.js';

const INDEX_KEY = 'characters:index';
const recKey = id => `character:${id}`;

export const MAX_FIELD_LEN = 5000;
export const MAX_NAME_LEN = 60;

export const CHARACTER_KINDS = [
  { id: 'scratch', label: 'From scratch',
    blurb: 'A person you invent, from your own experience and the people you watch.' },
  { id: 'given', label: 'A role I have been cast in',
    blurb: 'A character a writer created. Link the script it comes from.' },
  { id: 'commedia', label: 'A commedia mask',
    blurb: 'Your own version of a traditional character, with the tradition beside you.' },
];
export const kindLabel = id => CHARACTER_KINDS.find(k => k.id === id)?.label ?? '';

// The worksheet. `kinds` limits a field to some kinds; `mask` names the
// COMMEDIA_MASKS field whose traditional answer is shown beside it.
export const CHARACTER_SECTIONS = [
  { title: 'Where they come from', fields: [
    { id: 'observed', kinds: ['scratch'], label: 'People you observed',
      hint: 'Who did you watch, and what did you borrow: one physical thing, one vocal thing, one want?' },
    { id: 'circumstances', kinds: ['given'], label: 'The given circumstances',
      hint: 'Who, where and when, and what happened just before?' },
    { id: 'othersSay', kinds: ['given'], label: 'What the others say about them',
      hint: 'What do the other characters say about this person, and where do they disagree?' },
  ] },
  { title: 'The person', fields: [
    { id: 'wants', mask: 'wants', label: 'Wants', hint: 'What do they want, right now and underneath?' },
    { id: 'fears', mask: 'fears', label: 'Fears', hint: 'What are they afraid of losing, or of being found out about?' },
    { id: 'contradiction', mask: 'contradiction', label: 'Contradiction', hint: 'Which two things do they want at once?' },
    { id: 'status', mask: 'status', label: 'Status and space', hint: 'Where do they stand, and how much space do they take?' },
  ] },
  { title: 'The body', fields: [
    { id: 'centre', mask: 'centre', label: 'Centre of gravity', hint: 'Where does their energy seem to come from?' },
    { id: 'leads', mask: 'leads', label: 'What leads', hint: 'What part of them enters a room first?' },
    { id: 'stance', mask: 'stance', label: 'Base stance', hint: 'Feet, knees, pelvis, spine, head and arms: their physical home.' },
    { id: 'walk', mask: 'walk', label: 'The walk', hint: 'Step size, speed, rhythm and pathway. Does thought come before movement, or after?' },
    { id: 'gestures', mask: 'gestures', label: 'Gestures', hint: 'Their recurring gestures, from the whole body rather than the hands alone.' },
  ] },
  { title: 'Under pressure', fields: [
    { id: 'thinking', mask: 'thinking', label: 'How a thought travels', hint: 'What happens in their body while they think?' },
    { id: 'fearResponse', mask: 'fearResponse', label: 'When afraid', hint: 'What does fear do to them, and what do they protect first?' },
    { id: 'desireResponse', mask: 'desireResponse', label: 'When wanting', hint: 'What does wanting something do to their body?' },
    { id: 'recovery', mask: 'recovery', label: 'Recovery', hint: 'How do they put themselves back together after being caught out?' },
  ] },
  { title: 'With others', fields: [
    { id: 'audience', mask: 'audience', label: 'With the audience or listener', hint: 'How do they treat whoever is watching or listening?' },
    { id: 'signature', mask: 'signature', label: 'Signature action', hint: 'One physical sequence that shows who they are.' },
  ] },
  { title: 'Voice and words', fields: [
    { id: 'voice', mask: 'voice', label: 'Voice and breath', hint: 'Breath, pitch, pace and pauses: one playable voice.' },
    { id: 'rhetoric', mask: 'rhetoric', label: 'What the words are doing', hint: 'What are their words for?' },
    { id: 'line', mask: 'line', label: 'A line that is theirs', hint: 'One line only this person could say.' },
  ] },
];
export const fieldsFor = kind => CHARACTER_SECTIONS
  .map(s => ({ ...s, fields: s.fields.filter(f => !f.kinds || f.kinds.includes(kind)) }))
  .filter(s => s.fields.length);

const clampName = n => String(n ?? '').trim().slice(0, MAX_NAME_LEN);

// Every write goes through one queue: two fields saved a moment apart
// both read-modify-write the same record, and without the queue the
// second write would drop the first.
let chain = Promise.resolve();
const serial = fn => (chain = chain.then(fn, fn));

export async function listCharacters() {
  const index = await metaGet(INDEX_KEY, []);
  return (Array.isArray(index) ? index : []).slice().sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
}

export async function getCharacter(id) {
  const rec = await metaGet(recKey(id), null);
  return rec && typeof rec === 'object' ? rec : null;
}

/** { name, kind, maskId?, source? } → the new character's id. */
export const createCharacter = args => serial(() => createNow(args));
async function createNow({ name, kind, maskId = null, source = null }) {
  const clean = clampName(name);
  if (!clean) throw new Error('A character needs a name.');
  if (!CHARACTER_KINDS.some(k => k.id === kind)) throw new Error('Unknown kind of character.');
  const now = Date.now();
  const id = uid('ch');
  const summary = { id, name: clean, kind, maskId: kind === 'commedia' ? maskId : null,
    source: kind === 'given' ? source : null, createdAt: now, updatedAt: now };
  await metaSet(recKey(id), { ...summary, fields: {} });
  const index = await metaGet(INDEX_KEY, []);
  await metaSet(INDEX_KEY, [...(Array.isArray(index) ? index : []), summary]);
  return id;
}

async function touchIndex(id, patch) {
  const index = await metaGet(INDEX_KEY, []);
  await metaSet(INDEX_KEY, (Array.isArray(index) ? index : []).map(c => c.id === id ? { ...c, ...patch } : c));
}

/** Save several worksheet fields at once: { fieldId: text }. */
export const saveFields = (id, patch) => serial(() => saveNow(id, patch));
async function saveNow(id, patch) {
  const rec = await getCharacter(id);
  if (!rec) throw new Error('That character no longer exists.');
  const now = Date.now();
  const clean = Object.fromEntries(Object.entries(patch).map(([k, v]) => [k, String(v ?? '').slice(0, MAX_FIELD_LEN)]));
  rec.fields = { ...(rec.fields ?? {}), ...clean };
  rec.updatedAt = now;
  await metaSet(recKey(id), rec);
  await touchIndex(id, { updatedAt: now });
}

export const renameCharacter = (id, name) => serial(() => renameNow(id, name));
async function renameNow(id, name) {
  const clean = clampName(name);
  if (!clean) return false;
  const rec = await getCharacter(id);
  if (!rec) return false;
  const now = Date.now();
  await metaSet(recKey(id), { ...rec, name: clean, updatedAt: now });
  await touchIndex(id, { name: clean, updatedAt: now });
  return true;
}

export const deleteCharacter = id => serial(() => deleteNow(id));
async function deleteNow(id) {
  await idbDelete(STORES.meta, recKey(id));
  const index = await metaGet(INDEX_KEY, []);
  await metaSet(INDEX_KEY, (Array.isArray(index) ? index : []).filter(c => c.id !== id));
}
