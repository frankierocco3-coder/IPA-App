// Script parsing — speaker attribution only.
//
// This module answers ONE question about a pasted script: which lines
// does which character speak? That is what flash cards and the exercises
// need in order to cue you off the right line.
//
// Three speaker conventions are recognised, because real scripts use all
// three:
//   NAME: line          Speechcraft's own texts, and many published plays
//   NAME line           printed plays (A View From The Bridge, and most
//                       Miller/Williams editions)
//   NAME                screenplay format — the speech is the line(s)
//     line              beneath, indented or not
//
// STAGE DIRECTIONS ARE NOT SEPARATED (owner order, 2026-08-20). An
// earlier build classified "(pause)" and "(laughing)" as directions and
// held them out of the spoken text; that is reverted. Everything that is
// not a speaker line is simply a line of the script, and it is spoken,
// displayed and rehearsed exactly as written.
//
// The parser annotates; it NEVER reflows, merges or re-orders. What you
// paste is what you read.

const HEADING = /^(?:ACT\b|SCENE\b|INT\.|EXT\.|INT\/EXT|FADE (?:IN|OUT)|CUT TO\b|PROLOGUE\b|EPILOGUE\b|CURTAIN\b)/i;
// A speaker name: 2–30 chars. Caps form stays strict so an ordinary
// sentence opening on "I" or "A" can never be read as a character.
const NAME_COLON = /^([A-Za-z][\w .'’-]{0,29}?)\s*:\s*(\S.*)$/;
const NAME_CAPS = /^([A-Z][A-Z0-9.'’-]+(?:\s+[A-Z][A-Z0-9.'’-]+)*)\s+(\S.*)$/;
const NAME_ALONE = /^([A-Z][A-Z0-9.'’-]+(?:\s+[A-Z][A-Z0-9.'’-]*)*)\s*[:.]?$/;
// "(CONT'D)", "(V.O.)", "(O.S.)" ride along with the name, not the speech.
const NAME_TAG = /\s*\((?:CONT'?D|V\.?O\.?|O\.?S\.?|OFF)\)\s*$/i;

/**
 * One canonical form for a speaker name. Trailing punctuation is NOT
 * part of a character's name: "CATHERINE." and "CATHERINE," and
 * "CATHERINE" are one person. Letting a stray period into the cast list
 * is what stranded every other line by that character as prose.
 */
const cleanName = n => n.replace(NAME_TAG, '').replace(/[.,:;\s]+$/, '').trim();

export function parseScript(text) {
  const raw = String(text ?? '')
    .replace(/[\u00a0\u2007\u202f\u2000-\u200a]/g, ' ')   // NBSP & friends
    .split(/\r?\n/);
  const blocks = [];

  for (const source of raw) {
    const line = source.trim();
    if (!line) { blocks.push({ kind: 'blank', text: '', raw: source }); continue; }

    if (HEADING.test(line)) { blocks.push({ kind: 'heading', text: line, raw: source }); continue; }

    // A bare NAME on its own line — screenplay format. Its speech is the
    // lines beneath it; those lines stay their own blocks.
    const alone = line.match(NAME_ALONE);
    if (alone && alone[1].length >= 2) {
      blocks.push({ kind: 'speaker', who: cleanName(alone[1]), text: '', raw: source });
      continue;
    }

    const colon = line.match(NAME_COLON);
    if (colon && colon[1].length >= 2) {
      blocks.push({ kind: 'speech', who: cleanName(colon[1]),
        text: colon[2], raw: source });
      continue;
    }

    const caps = line.match(NAME_CAPS);
    if (caps) {
      blocks.push({ kind: 'speech', who: cleanName(caps[1]),
        text: caps[2], raw: source });
      continue;
    }

    // Everything else is a line of the script, kept exactly as written.
    // It is NEVER folded into the block above it: merging lines is what
    // destroys the flow of a pasted script.
    blocks.push({ kind: 'line', text: line, raw: source });
  }

  // ── Second pass ──────────────────────────────────────────────
  // The strict rules above find the cast. Now every remaining line that
  // OPENS with a known cast name is attributed to them, whatever follows
  // it — a comma, a parenthetical, a dash. One correctly-detected
  // "CATHERINE" therefore fixes every other Catherine line in the text,
  // which is why a stray punctuation mark can no longer strand half a
  // scene as unattributed prose.
  const cast = [...new Set(blocks.filter(b => b.who).map(b => b.who))]
    .sort((a, b) => b.length - a.length);              // longest name first
  if (cast.length) {
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.kind !== 'line') continue;
      const hit = cast.find(name =>
        b.text.length > name.length
        && b.text.slice(0, name.length).toUpperCase() === name.toUpperCase()
        && /[^A-Za-z0-9]/.test(b.text[name.length]));   // a boundary, not a longer word
      if (!hit) continue;
      const rest = b.text.slice(hit.length).replace(/^[\s.,:;—–-]+/, '').trim();
      if (rest) blocks[i] = { kind: 'speech', who: hit, text: rest, raw: b.raw };
    }
  }

  const named = blocks.filter(b => b.kind === 'speech' || b.kind === 'speaker');
  const characters = [...new Set(named.map(b => b.who))];
  // Two or more named speakers, each speaking at least once on average.
  // The old rule additionally demanded that someone speak TWICE, which
  // failed on a short exchange — a real scene a learner might well paste.
  // Prose still cannot qualify: it has no speaker lines at all.
  const isScript = characters.length >= 2 && characters.length <= 12
    && named.length >= characters.length;
  return { isScript, blocks, characters };
}

/**
 * Group blocks into speech units WITHOUT altering them: a unit is a
 * speaker (or speaker+text) block plus the plain lines beneath it, up to
 * the next speaker, heading or blank line. Grouping happens here,
 * at query time, so the rendered script keeps the shape you pasted.
 */
export function speechUnits(parsed) {
  const units = [];
  let cur = null;
  parsed.blocks.forEach((b, i) => {
    if (b.kind === 'speaker' || b.kind === 'speech') {
      cur = { who: b.who, start: i, blocks: [b] };
      units.push(cur);
    } else if (b.kind === 'line') {
      if (cur) cur.blocks.push(b);
    } else {
      cur = null;                      // a blank line or heading ends it
    }
  });
  return units;
}

/** A whole unit's text, exactly as written. */
export const unitText = u => u.blocks.map(b => b.text).filter(Boolean).join(' ').trim();

/** Every speech unit by one character, with the unit that cues it. */
export function cuedSpeeches(parsed, who) {
  const units = speechUnits(parsed);
  const out = [];
  units.forEach((u, n) => {
    if (who && u.who !== who) return;
    const cue = n > 0 ? units[n - 1] : null;
    out.push({ index: u.start, block: u, cue });
  });
  return out;
}
