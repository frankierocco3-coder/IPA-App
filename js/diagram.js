// Articulation diagrams — how each sound is physically made.
//
// Vowels get a vowel-space chart (tongue high↔low, front↔back, rounding).
// Consonants get a side-view (sagittal) cross-section of the mouth with the
// place of articulation highlighted and the manner shown by the constriction.
// All original SVG, so it stays in the zero-build, offline app.

// height: 0 close (tongue high) … 1 open (tongue low)
// back:   0 front … 1 back;  round: lips rounded
const VOWELS = {
  'ɪ': { h: 0.18, b: 0.30 }, 'e': { h: 0.42, b: 0.18 }, 'æ': { h: 0.85, b: 0.22 },
  'ʌ': { h: 0.62, b: 0.68 }, 'ʊ': { h: 0.22, b: 0.72, round: 1 }, 'ɒ': { h: 0.92, b: 0.90, round: 1 },
  'ə': { h: 0.50, b: 0.50 }, 'iː': { h: 0.06, b: 0.10 }, 'ɑː': { h: 0.95, b: 0.88 },
  'ɔː': { h: 0.60, b: 0.92, round: 1 }, 'uː': { h: 0.10, b: 0.90, round: 1 }, 'ɜː': { h: 0.50, b: 0.50 },
  // Contemporary SQUARE: the monophthongised /eə/, open-mid front and long,
  // a shade more open than DRESS. happY: close front, in the gap between
  // KIT and FLEECE. Both were missing, so their pages drew nothing at all.
  'ɛː': { h: 0.55, b: 0.16 }, 'i': { h: 0.12, b: 0.14 },
  // American
  'ɑ': { h: 0.94, b: 0.85 }, 'ɝ': { h: 0.50, b: 0.55, r: 1 }, 'ɚ': { h: 0.52, b: 0.52, r: 1 },
  // Australian (HCE/revised symbols)
  'ɐ': { h: 0.72, b: 0.50 }, 'ɐː': { h: 0.80, b: 0.55 }, 'ʉː': { h: 0.10, b: 0.50, round: 1 },
  'ɔ': { h: 0.62, b: 0.90, round: 1 }, 'oː': { h: 0.38, b: 0.90, round: 1 }, 'eː': { h: 0.42, b: 0.15 },
};

// Diphthongs: glide from one vowel position to another.
const DIPHTHONGS = {
  'eɪ': ['e', 'ɪ'], 'aɪ': [{ h: 0.9, b: 0.5 }, 'ɪ'], 'ɔɪ': ['ɔː', 'ɪ'],
  'əʊ': ['ə', 'ʊ'], 'aʊ': [{ h: 0.9, b: 0.5 }, 'ʊ'], 'ɪə': ['ɪ', 'ə'],
  'eə': ['e', 'ə'], 'ʊə': ['ʊ', 'ə'], 'oʊ': [{ h: 0.35, b: 0.85, round: 1 }, 'ʊ'],
  'æɪ': ['æ', 'ɪ'], 'ɑe': [{ h: 0.92, b: 0.85 }, 'e'], 'æɔ': ['æ', 'ɔ'],
  'oɪ': ['oː', 'ɪ'], 'əʉ': ['ə', 'ʉː'],
};

// place x/y on the sagittal (mouth faces left); manner + voicing.
const PLACES = {
  bilabial: [34, 96], labiodental: [46, 92], dental: [62, 84], alveolar: [84, 76],
  postalveolar: [104, 72], palatal: [132, 68], velar: [174, 78], glottal: [206, 128],
};
const CONS = {
  p: ['bilabial', 'plosive', 0], b: ['bilabial', 'plosive', 1], t: ['alveolar', 'plosive', 0],
  d: ['alveolar', 'plosive', 1], k: ['velar', 'plosive', 0], g: ['velar', 'plosive', 1],
  m: ['bilabial', 'nasal', 1], n: ['alveolar', 'nasal', 1], 'ŋ': ['velar', 'nasal', 1],
  f: ['labiodental', 'fricative', 0], v: ['labiodental', 'fricative', 1], 'θ': ['dental', 'fricative', 0],
  'ð': ['dental', 'fricative', 1], s: ['alveolar', 'fricative', 0], z: ['alveolar', 'fricative', 1],
  'ʃ': ['postalveolar', 'fricative', 0], 'ʒ': ['postalveolar', 'fricative', 1], h: ['glottal', 'fricative', 0],
  'tʃ': ['postalveolar', 'affricate', 0], 'dʒ': ['postalveolar', 'affricate', 1],
  // The glottal stop closes the vocal folds themselves. Nothing happens in
  // the mouth, which is exactly what the diagram should show.
  'ʔ': ['glottal', 'plosive', 0],
  l: ['alveolar', 'lateral', 1], r: ['postalveolar', 'approximant', 1],
  w: ['bilabial', 'approximant', 1], j: ['palatal', 'approximant', 1],
};

const lerp = (a, b, t) => a + (b - a) * t;

// A point in the vowel trapezoid for a {h, b} position.
function vowelPoint(v) {
  const frontX = lerp(58, 84, v.h), backX = lerp(188, 168, v.h);
  return [lerp(frontX, backX, v.b), lerp(44, 150, v.h)];
}

function vowelDiagram(sym) {
  const v = VOWELS[sym] || DIPHTHONGS[sym];
  const glide = Array.isArray(v);
  const resolve = p => (typeof p === 'string' ? VOWELS[p] : p);
  const pts = glide ? v.map(resolve) : [v];
  const [x, y] = vowelPoint(pts[0]);
  const dot = glide
    ? (() => { const [x2, y2] = vowelPoint(pts[1]);
        return `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="var(--green)" stroke-width="3" marker-end="url(#arrow)"/>
                <circle cx="${x}" cy="${y}" r="6" fill="var(--green)"/>`; })()
    : `<circle cx="${x}" cy="${y}" r="8" fill="var(--green)"/>${(pts[0].round) ? `<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="var(--lavender)" stroke-width="2.5"/>` : ''}`;
  return `<svg viewBox="0 0 240 175" class="artic-svg" role="img">
    <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--green)"/></marker></defs>
    <polygon points="58,44 188,44 168,150 84,150" fill="var(--panel-2)" stroke="var(--line)" stroke-width="2"/>
    <text x="52" y="40" class="artic-lbl" text-anchor="end">close</text>
    <text x="80" y="166" class="artic-lbl">open</text>
    <text x="58" y="30" class="artic-lbl">front</text>
    <text x="188" y="30" class="artic-lbl" text-anchor="end">back</text>
    ${dot}
  </svg>`;
}

function consonantDiagram(sym) {
  const c = CONS[sym];
  if (!c) return '';
  const [place, manner, voiced] = c;
  const [px, py] = PLACES[place];
  // constriction glyph varies by manner
  const gap = manner === 'plosive' || manner === 'affricate' ? 3
    : manner === 'fricative' ? 7 : manner === 'nasal' ? 5 : 12;
  const marker = manner === 'nasal'
    ? `<path d="M${px} ${py} q -6 -26 4 -40" fill="none" stroke="var(--green)" stroke-width="2.5" stroke-dasharray="3 3"/><circle cx="${px}" cy="${py}" r="7" fill="var(--green)"/>`
    : `<circle cx="${px}" cy="${py}" r="${5 + (12 - gap)}" fill="none" stroke="var(--green)" stroke-width="3"/><circle cx="${px}" cy="${py}" r="5" fill="var(--green)"/>`;
  return `<svg viewBox="0 0 240 185" class="artic-svg" role="img">
    <!-- nasal cavity + head shell -->
    <path d="M20 150 Q10 70 60 40 Q120 8 200 30 Q234 45 224 95 L224 150 Z" fill="var(--panel-2)" stroke="var(--line)" stroke-width="2"/>
    <!-- palate / roof of mouth -->
    <path d="M28 96 Q40 86 62 84 Q100 78 132 70 Q168 66 200 84 L200 150 L28 150 Z" fill="var(--panel)" stroke="var(--line)" stroke-width="1.5"/>
    <!-- tongue -->
    <path d="M40 150 Q60 118 92 116 Q140 112 176 132 Q186 140 188 150 Z" fill="#cdb98a" stroke="#a58f5e" stroke-width="1.5"/>
    <!-- lips at the front (left) -->
    <ellipse cx="26" cy="104" rx="7" ry="13" fill="#c78f7a" stroke="#a06a56" stroke-width="1.5"/>
    ${marker}
    <text x="120" y="176" class="artic-lbl" text-anchor="middle">${voiced ? 'voiced' : 'voiceless'} · ${place} · ${manner}</text>
  </svg>`;
}


// ── Guide diagrams: the sagittal a learner can act on ─────────
// The phoneme facts this file already holds (vowel height, backness
// and rounding; consonant place, manner and voicing) drive a side view
// with the tongue actually in position, the lips doing what they do
// for this sound, and each written cue on a leader line.
//
// Vowels get a sagittal here rather than the abstract trapezoid,
// because "front of the tongue up" is something a learner can DO. A
// dot in a vowel space is not. All original drawing.
//
// The view is cropped to the LOWER FACE — nose, mouth, jaw, throat. A
// whole head was tried first and failed at the one job the picture
// has: with a realistic cranium the oral cavity became a sliver, and
// /iː/ and /ɑː/ came out looking the same. Cropping lets the mouth
// fill the frame, so height and backness are visible at a glance.
//
// Frame: 560 x 280. The face fills x 0-300 facing LEFT; the callout
// column runs from x 316.

/** A DOM-safe id from an IPA symbol, which may be non-ASCII. */
const phonemeSlugSafe = sym =>
  [...String(sym)].map(ch => ch.codePointAt(0).toString(36)).join('');

// Where each named cue anchor sits. The teaching file names anchors,
// never numbers, so the face can be redrawn without touching a word.
const CUE_AT = {
  lips: [28, 130], teeth: [54, 114], tongueFront: [84, 128], tongueBack: [142, 126],
  jaw: [90, 178], voicebox: [182, 230], airflow: [104, 96],
};

// Where the constriction sits, by place of articulation.
const GUIDE_PLACE = {
  bilabial: [28, 130], labiodental: [38, 132], dental: [56, 126], alveolar: [64, 106],
  postalveolar: [88, 88], palatal: [120, 62], velar: [174, 70], glottal: [182, 226],
};

// How the tongue sits for a consonant, in the same {height, backness}
// language the vowels use, so one curve serves both. `tip` raises the
// tongue tip to the ridge for the sounds that are made with it.
const CONS_SHAPE = {
  bilabial: { h: 0.62, b: 0.5 }, labiodental: { h: 0.62, b: 0.5 },
  dental: { h: 0.5, b: 0.1, tip: 118 }, alveolar: { h: 0.45, b: 0.08, tip: 110 },
  postalveolar: { h: 0.38, b: 0.24, tip: 116 }, palatal: { h: 0.2, b: 0.34 },
  velar: { h: 0.24, b: 0.96 }, glottal: { h: 0.6, b: 0.5 },
};

/**
 * The tongue. Tip, body and root ALL move with height — an earlier
 * version pinned the ends and the mouth could not actually open or
 * close, which is the one thing the picture exists to show. Backness
 * then decides which part of the body rises: a front vowel lifts the
 * front control, a back vowel the back one.
 *
 * The underside traces the floor of the mouth, so the cream left above
 * the tongue is the air space that is genuinely there.
 */
function tonguePath(h, b, tip) {
  const mid = lerp(66, 138, h);
  const tipY = tip ?? lerp(140, 154, h);
  const rootY = lerp(78, 138, h);
  const c1y = mid - 22 * (1 - b);       // front of the tongue
  const c2y = mid - 22 * b;             // back of the tongue
  return `M44 ${tipY.toFixed(1)} C86 ${c1y.toFixed(1)} 134 ${c2y.toFixed(1)} 162 ${rootY.toFixed(1)}
          C176 ${(rootY + 30).toFixed(1)} 182 180 172 214
          C166 198 140 170 96 152 L44 ${tipY.toFixed(1)} Z`;
}

/** The lips in profile. For /p/ and /v/ the lips ARE the sound. */
function lipsSagittal(kind) {
  const upper = 'M50 102 C40 101 26 108 29 118 C39 124 45 115 51 108 Z';
  const lower = 'M50 158 C40 157 26 150 29 140 C39 134 45 143 51 150 Z';
  if (kind === 'closed') return `
    <path d="M50 102 C40 101 24 110 27 123 C38 130 45 117 51 108 Z" class="guide-lip"/>
    <path d="M50 158 C40 157 24 148 27 135 C38 128 45 141 51 150 Z" class="guide-lip"/>
    <line x1="22" y1="129" x2="54" y2="129" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>`;
  if (kind === 'teeth') return `
    <path d="M50 90 C40 89 26 96 29 106 C39 112 45 103 51 96 Z" class="guide-lip"/>
    <path d="${lower}" class="guide-lip"/>
    <rect x="30" y="128" width="13" height="17" rx="2.5" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/>`;
  return `<path d="${upper}" class="guide-lip"/><path d="${lower}" class="guide-lip"/>`;
}

/** The lips seen face on, where rounding and spreading are visible. */
function lipsFrontal(kind) {
  if (kind === 'round') return `
    <ellipse cx="0" cy="0" rx="15" ry="16" fill="#5f3730"/>
    <ellipse cx="0" cy="0" rx="15" ry="16" fill="none" stroke="#d9a89c" stroke-width="9"/>`;
  if (kind === 'spread') return `
    <path d="M-42 0 Q0 -15 42 0 Q0 15 -42 0 Z" fill="#5f3730" stroke="#d9a89c" stroke-width="5"/>
    <rect x="-24" y="-9" width="48" height="8" rx="2" fill="#fbfaf4"/>`;
  if (kind === 'closed') return `
    <path d="M-34 -4 Q0 -16 34 -4 Q0 2 -34 -4 Z" class="guide-lip"/>
    <path d="M-34 4 Q0 16 34 4 Q0 -2 -34 4 Z" class="guide-lip"/>`;
  if (kind === 'teeth') return `
    <path d="M-34 -14 Q0 -26 34 -14 Q0 -8 -34 -14 Z" class="guide-lip"/>
    <path d="M-32 12 Q0 24 32 12 Q0 2 -32 12 Z" class="guide-lip"/>
    <rect x="-21" y="-7" width="13" height="14" rx="2" fill="#fff" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="-6" y="-7" width="13" height="14" rx="2" fill="#fff" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="9" y="-7" width="13" height="14" rx="2" fill="#fff" stroke="var(--ink)" stroke-width="1.3"/>`;
  return `<path d="M-34 0 Q0 -16 34 0 Q0 16 -34 0 Z" fill="#5f3730" stroke="#d9a89c" stroke-width="5"/>`;
}

function lipKindFor(sym) {
  const v = VOWELS[sym];
  if (v) return v.round ? 'round' : (v.b < 0.45 && v.h < 0.55 ? 'spread' : 'neutral');
  const c = CONS[sym];
  if (!c) return 'neutral';
  if (c[0] === 'labiodental') return 'teeth';
  if (c[0] === 'bilabial') return c[1] === 'approximant' ? 'round' : 'closed';
  return 'neutral';
}

const FRONTAL_CAP = {
  round: 'lips rounded', spread: 'lips spread', closed: 'lips closed',
  teeth: 'teeth on the lip', neutral: 'lips relaxed',
};

// The air space: lips, alveolar ridge, hard palate, velum, pharynx,
// then forward again along the floor of the mouth. Doubles as the clip
// for the tongue, so the tongue can never render through the palate.
const AIRWAY = 'M18 114 L62 104 C92 62 138 50 172 62 C190 70 198 92 200 116 '
  + 'C204 150 206 200 200 240 L170 240 C170 200 140 168 96 154 L20 138 Z';

/**
 * The guide view. `cues` come from js/data/articulation.js — this
 * function supplies geometry only, never wording.
 */
export function guideSVG(sym, cues = []) {
  const v = VOWELS[sym];
  const c = CONS[sym];
  if (!v && !c) return '';
  const voiced = v ? true : !!c[2];
  const shape = v ?? CONS_SHAPE[c[0]] ?? { h: 0.6, b: 0.5 };
  const lipKind = lipKindFor(sym);
  // A ring marks where the action is — except at the lips, where the
  // lips themselves already show it and a ring on top is just noise.
  const lipMade = !v && (c[0] === 'bilabial' || c[0] === 'labiodental');
  const place = v ? null : (GUIDE_PLACE[c[0]] ?? null);
  const ring = lipMade ? null : place;
  const stopped = !v && (c[1] === 'plosive' || c[1] === 'nasal');
  // Only caption the voicing when no cue already says it, so a learner
  // never reads "voice on" twice on one picture.
  const cuesVoicing = cues.some(q => q.at === 'voicebox');
  // Clip ids must be unique per diagram: two guides on one page sharing
  // an id would both clip to whichever rendered first.
  const cid = phonemeSlugSafe(sym);

  const DX = 6, DY = 0;
  const leader = (cue, i) => {
    const a = CUE_AT[cue.at] ?? CUE_AT.lips;
    const [ax, ay] = [a[0] + DX, a[1] + DY];
    const ty = 46 + i * 36;
    return `<path d="M${ax} ${ay} L306 ${ty - 5} L314 ${ty - 5}" class="guide-lead"/>
      <circle cx="${ax}" cy="${ay}" r="5" class="guide-dot"/>
      <text x="322" y="${ty}" class="guide-lbl">${cue.text}</text>`;
  };

  return `<svg viewBox="0 0 560 280" class="guide-svg" role="img"
       aria-label="Side view of the mouth showing how ${sym} is made">
    <defs><clipPath id="gclip-${cid}"><path d="${AIRWAY}"/></clipPath></defs>
    <g transform="translate(${DX} ${DY})">
      <!-- lower face in profile, facing left: nose, lips, chin, jaw, throat -->
      <path d="M84 0 C74 20 68 40 60 52 L14 86 C6 92 12 101 24 100 L54 100
               L26 108 L30 120 L26 132 L20 146 C24 168 34 182 56 192
               C96 212 152 216 184 206 L194 280 L250 280
               C272 200 276 80 260 0 Z"
            fill="#e9d6c0" stroke="#ab9781" stroke-width="2.2"/>
      <!-- the air space -->
      <path d="${AIRWAY}" fill="#fffdf8" stroke="#9c8a72" stroke-width="1.8"/>
      <!-- tongue, placed from this sound's own height and backness,
           clipped so it can never cross the roof of the mouth -->
      <g clip-path="url(#gclip-${cid})">
        <path d="${tonguePath(shape.h, shape.b, shape.tip)}"
              fill="#cf9a94" stroke="#a8736d" stroke-width="2.6"/>
      </g>
      <!-- teeth last, so the tongue never buries them -->
      <rect x="54" y="102" width="11" height="19" rx="2.5" fill="#fff" stroke="#8d7c66" stroke-width="1.6"/>
      <rect x="54" y="138" width="11" height="18" rx="2.5" fill="#fff" stroke="#8d7c66" stroke-width="1.6"/>
      ${lipsSagittal(lipKind)}
      <!-- air on its way out, or stopped dead at the closure -->
      ${stopped
        ? `<line x1="${place[0] + 14}" y1="${place[1] - 20}" x2="${place[0] + 14}" y2="${place[1] + 20}"
                 stroke="#a4443a" stroke-width="4" stroke-linecap="round"/>`
        : `<path d="M172 196 C136 164 104 142 42 130" class="guide-air"/>
           <path d="M56 121 L36 130 L56 140" class="guide-air"/>`}
      ${ring ? `<circle cx="${ring[0]}" cy="${ring[1]}" r="13" class="guide-place"/>` : ''}
      <!-- voicing, at the larynx -->
      <g opacity="${voiced ? 1 : 0.26}">
        <path d="M176 220 q10 9 0 17" fill="none" stroke="#6f8657" stroke-width="2.8"/>
        <path d="M189 216 q13 12 0 25" fill="none" stroke="#6f8657" stroke-width="2.8"/>
      </g>
    </g>
    ${cuesVoicing ? '' : `<text x="212" y="252" class="guide-lbl">${voiced ? 'voice on' : 'voice off'}</text>`}
    <!-- the lips seen face on, where rounding and spreading show -->
    <g transform="translate(456 214)">${lipsFrontal(lipKind)}</g>
    <text x="456" y="258" class="guide-lbl" text-anchor="middle">${FRONTAL_CAP[lipKind]}</text>
    ${cues.map(leader).join('')}
  </svg>`;
}

export function articulationSVG(sym) {
  if (VOWELS[sym] || DIPHTHONGS[sym]) return vowelDiagram(sym);
  if (CONS[sym]) return consonantDiagram(sym);
  return '';
}

// ── "Your Instrument": a labelled sagittal of the vocal tract ──
// Original drawing of standard anatomy (facts, not a copied illustration).
export function vocalTractSVG() {
  const lbl = (text, tx, ty, px, py, anchor = 'start') =>
    `<line x1="${anchor === 'end' ? tx - 4 : tx + 4}" y1="${ty - 3}" x2="${px}" y2="${py}" class="anat-lead"/>
     <circle cx="${px}" cy="${py}" r="2.6" class="anat-dot"/>
     <text x="${tx}" y="${ty}" text-anchor="${anchor}" class="anat-lbl">${text}</text>`;
  return `<svg viewBox="0 0 460 380" class="anat-svg" role="img" aria-label="Side view of the vocal tract">
    <!-- head / soft-tissue silhouette, a left-facing profile: forehead, nose, lips, chin, throat -->
    <path d="M330 22 Q180 16 156 58 Q146 92 118 120 Q100 140 106 156
             Q118 162 122 170 Q110 180 110 192 Q114 206 130 216
             Q146 238 172 250 Q214 266 240 292 L240 372 L330 372 Z"
          fill="#f0e7d6" stroke="var(--line)" stroke-width="2"/>
    <!-- bone: upper jaw + hard palate mass (speckled) -->
    <path d="M330 40 Q210 34 168 66 Q144 86 138 148 L250 152 Q300 150 316 132 L330 120 Z"
          fill="#e7ddc6" stroke="#cfc3a4" stroke-width="1.4"/>
    <circle cx="210" cy="78" r="1.4" fill="#cfc3a4"/><circle cx="245" cy="92" r="1.4" fill="#cfc3a4"/>
    <circle cx="278" cy="80" r="1.4" fill="#cfc3a4"/><circle cx="230" cy="108" r="1.4" fill="#cfc3a4"/>
    <circle cx="268" cy="112" r="1.4" fill="#cfc3a4"/><circle cx="295" cy="100" r="1.4" fill="#cfc3a4"/>
    <!-- nasal cavity opening -->
    <path d="M172 92 Q225 84 278 92 Q262 116 218 120 Q192 120 172 112 Z"
          fill="var(--panel)" stroke="#cfc3a4" stroke-width="1.2"/>
    <!-- hard palate underside (arched roof of the mouth) -->
    <path d="M132 152 Q170 146 250 150 Q248 158 210 160 Q160 160 140 168 Q132 160 132 152 Z"
          fill="#efe6d2" stroke="#cfc3a4" stroke-width="1"/>
    <!-- soft palate (velum) + uvula, hanging at the back -->
    <path d="M250 150 Q276 150 280 176 Q278 198 262 200 Q252 194 252 172 Q250 160 250 150 Z"
          fill="#d8a3a0" stroke="#bd8380" stroke-width="1.4"/>
    <!-- upper + lower teeth -->
    <rect x="124" y="152" width="7" height="12" rx="2" fill="#fbfaf4" stroke="#d8d0bb" stroke-width="1"/>
    <rect x="124" y="200" width="7" height="12" rx="2" fill="#fbfaf4" stroke="#d8d0bb" stroke-width="1"/>
    <!-- lips -->
    <path d="M108 156 Q98 178 110 200 Q120 190 120 178 Q120 166 108 156 Z"
          fill="#c88f7b" stroke="#a86a56" stroke-width="1.4"/>
    <!-- tongue: humped body sitting on the mouth floor -->
    <path d="M132 208 Q138 186 172 180 Q212 174 244 186 Q274 198 282 228
             Q286 258 268 280 Q240 292 206 288 Q164 284 146 262 Q134 238 132 208 Z"
          fill="#d69a86" stroke="#b87b66" stroke-width="1.6"/>
    <path d="M172 184 Q182 236 232 280" fill="none" stroke="#b87b66" stroke-width="1" stroke-dasharray="3 3" opacity="0.65"/>
    <path d="M214 178 Q224 232 262 278" fill="none" stroke="#b87b66" stroke-width="1" stroke-dasharray="3 3" opacity="0.65"/>
    <!-- pharynx back wall -->
    <path d="M300 150 L300 296" fill="none" stroke="#cfc3a4" stroke-width="2"/>
    <!-- epiglottis + larynx + vocal folds -->
    <path d="M272 288 Q286 296 284 312" fill="none" stroke="#bd8380" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="282" cy="326" rx="15" ry="11" fill="#e7ddc6" stroke="#cfc3a4" stroke-width="1.4"/>
    <line x1="271" y1="326" x2="293" y2="326" stroke="#bd8380" stroke-width="3"/>
    <!-- trachea -->
    <path d="M271 340 L271 366 M293 340 L293 366" stroke="#cfc3a4" stroke-width="1.5"/>

    <!-- LEFT labels -->
    ${lbl('Nasal cavity', 40, 74, 200, 104)}
    ${lbl('Hard palate', 40, 118, 185, 152)}
    ${lbl('Alveolar ridge', 40, 150, 134, 154)}
    ${lbl('Teeth', 40, 180, 126, 160)}
    ${lbl('Lips', 40, 210, 106, 182)}
    ${lbl('Tongue tip', 40, 244, 150, 196)}
    ${lbl('Tongue front', 40, 274, 195, 186)}
    <!-- RIGHT labels -->
    ${lbl('Soft palate (velum)', 420, 118, 266, 168, 'end')}
    ${lbl('Uvula', 420, 152, 266, 194, 'end')}
    ${lbl('Tongue back', 420, 206, 274, 216, 'end')}
    ${lbl('Pharynx', 420, 248, 300, 240, 'end')}
    ${lbl('Epiglottis', 420, 294, 280, 300, 'end')}
    ${lbl('Vocal folds (glottis)', 420, 328, 282, 326, 'end')}
    ${lbl('Trachea', 420, 362, 282, 356, 'end')}
  </svg>`;
}

// All the vowels plotted on the quadrilateral — the classic reference.

// ── /ʃ/ in motion ───────────────────────────────────────────────
// Two synchronised views of one English /ʃ/ — the tongue in side cutaway,
// the lips from the front — scrubbable through rest, shape, hold, release.
// A schematic of one possible configuration, not a tracing of a speaker.
//
// IDS ARE SEQUENTIAL HERE, NOT phonemeSlugSafe(). The house idiom above
// derives the suffix from the symbol, which is exactly wrong for this
// component: it draws TWO svgs for the SAME symbol, so every gradient and
// clip id would be emitted twice in one document and `url(#…)` would
// resolve both to whichever rendered first. A counter is the only
// discriminator that separates them, and it separates two instances of
// the whole component as well.
let shSeq = 0;

// Where the four positions sit on the 4.2s timeline, in ms.
const SH_POSES = [0, 850, 1950, 3800];
const SH_POSE_NAMES = ['Rest', 'Shape', 'Hold SH', 'Release'];
const SH_LABELS = [
  'Rest: the tongue is lower and the lips are relaxed.',
  'Shape: the tongue blade lifts toward the roof of the mouth. From the front, watch the lips round slightly.',
  'Hold SH: air passes through a narrow gap just behind the ridge. The voice stays off.',
  'Release: the tongue lowers and the lips relax.',
];

const shMix = (a, b, t) => a + (b - a) * t;
const shSmooth = t => t * t * (3 - 2 * t);        // ease in and out of a phase

/** The tongue outline at `t` — 0 at rest, 1 at the /ʃ/ posture. */
const shTongueD = t =>
  `M106 ${shMix(159, 152, t)} C114 ${shMix(151, 141, t)} 116 ${shMix(141, 116, t)} 133 ${shMix(136, 113, t)} `
  + `C165 ${shMix(129, 97, t)} 228 ${shMix(138, 121, t)} 250 177 Q257 199 253 220 Q225 197 163 179Z`;

/** The lips face on, narrowing and rounding as `t` rises. */
const shLipsD = t => {
  const w = shMix(40, 26, t), left = 175 - w, right = 175 + w;
  return `M${left - 6} 150 Q${left + 8} ${133 - 5 * t} 163 ${138 - 4 * t} Q170 ${133 - 5 * t} 175 ${140 - 4 * t} `
    + `Q180 ${133 - 5 * t} 187 ${138 - 4 * t} Q${right - 8} ${133 - 5 * t} ${right + 6} 150 Q175 ${181 + 10 * t} ${left - 6} 150Z`;
};

/** The highlight along the lower lip. */
const shLightD = t =>
  `M${175 - shMix(40, 26, t) * 0.42} ${160 + 6 * t} Q175 ${165 + 7 * t} ${175 + shMix(40, 26, t) * 0.32} ${160 + 6 * t}`;

/**
 * The /ʃ/ motion figure, or '' for every other sound. The caller decides
 * nothing: asking for any other symbol gets an empty string back, so a
 * call site can simply prefer this over whatever it drew before.
 *
 * THE STILL IS AUTHORED IN THE MARKUP, NOT PAINTED ON LOAD. Every animated
 * attribute carries its Hold SH value, so this is already a correct
 * illustration before a single frame runs — with script dead, under
 * reduced motion, and inside the lesson panel, which starts `hidden` and
 * therefore may get no rendering opportunity at all. The reference mockup
 * left `d` empty and filled it from script on load, which draws a mouth
 * with no tongue in it anywhere that has not happened yet.
 */
export function shMotionHtml(sym) {
  if (sym !== 'ʃ') return '';
  // `sym` can only be 'ʃ' past that guard, so nothing here is interpolated
  // from data and this module stays import-free.
  const u = `shm${++shSeq}`;
  const id = name => `${name}-${u}`;
  const t = 1, flow = 1;                              // authored at Hold SH
  const offset = (SH_POSES[2] / 1000 - 1.3) * 42;
  const w = shMix(40, 26, t), h = shMix(5, 11, t);
  return `<div class="artic-wrap shm" data-shm>
    <p class="shm-lede">Watch the tongue blade rise just behind the ridge. It leaves a narrow gap for the air.</p>
    <div class="shm-views">
      <figure class="shm-view">
        <figcaption>Front view · lip rounding</figcaption>
        <svg viewBox="0 0 350 270" role="img" aria-label="The lower face from the front, showing the lips rounding slightly">
          <defs>
            <radialGradient id="${id('skin')}" cx="44%" cy="40%" r="64%"><stop stop-color="#f8dbc0"/><stop offset=".56" stop-color="#eac0a3"/><stop offset="1" stop-color="#b4826b"/></radialGradient>
            <linearGradient id="${id('neck')}" x2="15%" y2="100%"><stop stop-color="#936450"/><stop offset="1" stop-color="#dab297"/></linearGradient>
            <linearGradient id="${id('lip-shade')}" x2="0%" y2="100%"><stop stop-color="#aa605b"/><stop offset=".28" stop-color="#c17972"/><stop offset=".49" stop-color="#95504d"/><stop offset=".62" stop-color="#d89187"/><stop offset=".83" stop-color="#c77a72"/><stop offset="1" stop-color="#a45f57"/></linearGradient>
            <radialGradient id="${id('cheek')}"><stop stop-color="#d98f80" stop-opacity=".38"/><stop offset="1" stop-color="#d98f80" stop-opacity="0"/></radialGradient>
            <clipPath id="${id('opening')}"><ellipse data-shm-aperture cx="175" cy="150" rx="${w}" ry="${h}"/></clipPath>
          </defs>
          <path d="M102 178Q96 227 71 270H279Q254 225 248 178Z" fill="url(#${id('neck')})"/>
          <path d="M53 0H297L291 77Q287 155 257 194Q224 238 175 246Q126 238 93 194Q63 155 59 77Z" fill="url(#${id('skin')})" stroke="#90705b" stroke-width="2"/>
          <ellipse cx="102" cy="110" rx="39" ry="47" fill="url(#${id('cheek')})"/><ellipse cx="248" cy="110" rx="39" ry="47" fill="url(#${id('cheek')})"/>
          <path d="M157 29Q156 62 143 85Q137 99 148 104Q158 101 168 108Q175 112 182 108Q193 101 202 104Q213 99 207 85Q194 62 192 29Q176 50 157 29Z" fill="#c9947b" opacity=".25"/>
          <path d="M148 102q8-6 16 0m22 0q8-6 16 0" fill="none" stroke="#845846" stroke-width="3" stroke-linecap="round"/>
          <path d="M170 111q1 12-5 20m15-20q-1 12 5 20" fill="none" stroke="#b88570" opacity=".48" stroke-linecap="round"/>
          <path data-shm-frontlips d="${shLipsD(t)}" fill="url(#${id('lip-shade')})" stroke="#9f5c55" stroke-width="1.2"/>
          <path data-shm-liplight d="${shLightD(t)}" fill="none" stroke="#f6beb0" stroke-width="1.7" stroke-linecap="round" opacity=".48"/>
          <ellipse data-shm-aperture cx="175" cy="150" rx="${w}" ry="${h}" fill="#48262d"/>
          <g clip-path="url(#${id('opening')})">
            <path d="M132 135H218V145Q175 152 132 145Z" fill="#fff4de"/>
            <path d="M158 137v12m17-12v13m17-13v12" stroke="#d1bead" stroke-width="1"/>
          </g>
          <path d="M148 194Q175 207 202 194" fill="none" stroke="#ac7d66" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </figure>
      <figure class="shm-view">
        <figcaption>Side cutaway · tongue and airflow</figcaption>
        <svg viewBox="0 0 350 270" role="img" aria-label="Side cutaway of the vocal tract, showing the tongue raised behind the ridge and the air moving through the gap">
          <defs>
            <linearGradient id="${id('tongue-ink')}" x2="0%" y2="100%"><stop stop-color="#e5a09b"/><stop offset=".42" stop-color="#c97b7b"/><stop offset="1" stop-color="#944d58"/></linearGradient>
            <linearGradient id="${id('side-tissue')}" x2="74%" y2="95%"><stop stop-color="#f2d8bb"/><stop offset=".47" stop-color="#dfb99e"/><stop offset="1" stop-color="#aa7668"/></linearGradient>
            <linearGradient id="${id('airway-depth')}" x2="78%" y2="100%"><stop stop-color="#fff8ea"/><stop offset=".67" stop-color="#ecd3bb"/><stop offset="1" stop-color="#c29182"/></linearGradient>
          </defs>
          <path d="M128 6C114 34 112 55 94 69C81 83 58 90 48 101Q35 113 54 118L90 117Q69 126 67 142L62 160Q65 198 105 212Q157 232 239 218L251 264H325Q338 195 333 120L326 6Z" fill="url(#${id('side-tissue')})" stroke="#987d67" stroke-width="2"/>
          <path d="M68 110q10-8 19-1m18-25q-7 13-3 22" fill="none" stroke="#a37260" stroke-width="2" stroke-linecap="round"/>
          <path d="M67 142Q90 137 105 121Q114 117 126 104C158 76 217 72 254 96C282 116 294 172 286 264H250C249 213 209 190 160 175L77 161Z" fill="url(#${id('airway-depth')})" stroke="#987365" stroke-width="2"/>
          <path d="M106 120Q114 117 126 104C151 82 193 75 224 84" fill="none" stroke="#b78975" stroke-width="3" opacity=".65"/>
          <g data-shm-air opacity="${flow}" fill="none" stroke-linecap="round">
            <path d="M269 248C278 165 259 109 208 95C173 85 147 94 127 110Q108 132 89 144L35 150" stroke="#23728a" stroke-width="6" opacity=".22"/>
            <path data-shm-dots d="M269 248C278 165 259 109 208 95C173 85 147 94 127 110Q108 132 89 144L35 150" stroke="#26778a" stroke-width="3.5" stroke-dasharray="2 10" stroke-dashoffset="${-offset}"/>
          </g>
          <path data-shm-tongue d="${shTongueD(t)}" fill="url(#${id('tongue-ink')})" stroke="#823e46" stroke-width="2"/>
          <path d="M94 126L106 120L105 135Q103 144 98 142Z M91 159L96 149Q100 145 103 151L105 164Z" fill="#fffdf6" stroke="#987d67"/>
          <path data-shm-lip transform="translate(${-4 * t} 0)" d="M91 125Q70 122 66 139Q73 147 91 137Z" fill="#b96869" stroke="#823e46"/>
          <path data-shm-lip transform="translate(${-4 * t} 0)" d="M92 163Q70 170 65 155Q71 148 92 153Z" fill="#b96869" stroke="#823e46"/>
          <g data-shm-air opacity="${flow}" fill="none" stroke="#8de4f1" stroke-linecap="round" stroke-width="3"><path d="M45 143L34 150L46 156"/></g>
          <g data-shm-air opacity="${flow}"><circle cx="132" cy="108" r="12" fill="none" stroke="#a26720" stroke-width="2"/><path d="M127 97L103 66H62" fill="none" stroke="#edc77f"/><text x="20" y="61" fill="#ffe4ae" font-size="12">Narrow gap</text></g>
        </svg>
      </figure>
    </div>
    <div class="shm-timeline">
      <label class="shm-label" for="${id('scrub')}">Movement timeline</label>
      <input id="${id('scrub')}" class="shm-scrub" data-shm-scrub type="range" min="0" max="4200" step="20"
             value="${SH_POSES[2]}" aria-valuetext="2.0 seconds, hold sh">
      <div class="shm-ticks" aria-hidden="true"><span>Rest</span><span>Shape</span><span>Hold</span><span>Release</span></div>
    </div>
    <div class="shm-transport">
      <button class="btn-lite shm-play" data-shm-play type="button" aria-pressed="false">▶ Play movement</button>
      <button class="btn-lite" data-shm-slow type="button" aria-pressed="true">½× speed</button>
    </div>
    <fieldset class="shm-poses">
      <legend class="shm-label">Jump to a position</legend>
      ${SH_POSE_NAMES.map((name, i) =>
        `<button class="btn-lite" data-shm-pose="${i}" type="button" aria-pressed="${i === 2}">${i + 1} · ${name}</button>`).join('')}
    </fieldset>
    <p class="shm-caption" data-shm-caption aria-live="polite">${SH_LABELS[2]}</p>
    <p class="artic-cap">Silent, simplified illustration. One possible English /ʃ/ shape; speakers vary.</p>
  </div>`;
}

/**
 * Brings every /ʃ/ figure under `root` to life. Safe on any root: with no
 * figure in it, it does nothing, and a second call on the same figure is
 * ignored rather than binding everything twice.
 *
 * NOTHING HERE LOOKS UP AN ID. Every query is scoped to one figure, so two
 * instances in a document cannot drive each other's drawings.
 *
 * ON requestAnimationFrame, WHICH THIS APP OTHERWISE DOES NOT USE. The two
 * removals recorded in main.js took REQUIRED WORK out of a frame — a scroll
 * position and a live-region announcement that silently never happened in
 * an uncomposited pane. Nothing required is in this loop: the still, the
 * caption, the scrubber value and all four pressed states are authored in
 * the markup or set synchronously on click, and the loop only advances a
 * decorative animation. Where a frame never arrives the figure simply
 * stays at its still, which is the correct picture either way. rAF is also
 * the only timer that stops when the reader cannot see the drawing.
 */
export function wireShMotion(root) {
  root.querySelectorAll('[data-shm]').forEach(fig => {
    if (fig.dataset.shmWired) return;              // a re-render must not double-bind
    fig.dataset.shmWired = '1';

    const q = sel => fig.querySelector(sel);
    const all = sel => [...fig.querySelectorAll(sel)];
    const scrub = q('[data-shm-scrub]');
    const play = q('[data-shm-play]');
    const slow = q('[data-shm-slow]');
    const caption = q('[data-shm-caption]');
    const tongue = q('[data-shm-tongue]');
    const frontLips = q('[data-shm-frontlips]');
    const lipLight = q('[data-shm-liplight]');
    const dots = q('[data-shm-dots]');
    const poses = all('[data-shm-pose]');
    const apertures = all('[data-shm-aperture]');
    const sideLips = all('[data-shm-lip]');
    const flows = all('[data-shm-air]');
    if (!scrub || !play || !tongue || !frontLips) return;   // markup moved under us

    let frame = 0, phase = 2, position = SH_POSES[2], fromStart = true;

    const draw = (t, flow, offset) => {
      tongue.setAttribute('d', shTongueD(t));
      frontLips.setAttribute('d', shLipsD(t));
      lipLight.setAttribute('d', shLightD(t));
      const w = shMix(40, 26, t), h = shMix(5, 11, t);
      apertures.forEach(e => { e.setAttribute('rx', w); e.setAttribute('ry', h); });
      sideLips.forEach(e => e.setAttribute('transform', `translate(${-4 * t} 0)`));
      flows.forEach(e => e.setAttribute('opacity', flow));
      dots.setAttribute('stroke-dashoffset', -offset);
    };

    // The caption is a live region, so it is written only when the phase
    // actually changes. Writing it every frame would have a screen reader
    // read the same sentence sixty times a second.
    const say = p => {
      if (phase === p) return;
      phase = p;
      caption.textContent = SH_LABELS[p];
      poses.forEach((b, i) => b.setAttribute('aria-pressed', String(i === p)));
    };

    const seek = ms => {
      position = Math.max(0, Math.min(4200, ms));
      scrub.value = position;
      const t = position / 1000;
      if (t < 0.25) { say(0); draw(0, 0, 0); }
      else if (t < 1.3) { say(1); draw(shSmooth((t - 0.25) / 1.05), 0, 0); }
      else if (t < 3.1) { say(2); draw(1, Math.min(1, (t - 1.3) * 8), (t - 1.3) * 42); }
      else { say(3); draw(1 - shSmooth(Math.min(1, (t - 3.1) / 0.85)), Math.max(0, 1 - (t - 3.1) * 10), 0); }
      scrub.setAttribute('aria-valuetext',
        `${(position / 1000).toFixed(1)} seconds, ${SH_POSE_NAMES[phase].toLowerCase()}`);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      play.textContent = '▶ Play movement';
      play.setAttribute('aria-pressed', 'false');
    };
    // How the lesson panel and the page teardown shut this down.
    fig.addEventListener('shm:stop', stop);

    const still = p => { stop(); fromStart = false; seek(SH_POSES[p]); };
    poses.forEach((b, i) => b.addEventListener('click', () => still(i)));
    scrub.addEventListener('input', e => { stop(); fromStart = false; seek(Number(e.target.value)); });
    slow.addEventListener('click', () =>
      slow.setAttribute('aria-pressed', String(slow.getAttribute('aria-pressed') !== 'true')));

    play.addEventListener('click', () => {
      // Read the preference fresh, the way navTo does, so a reader who
      // changes it mid-session is obeyed without a reload.
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return still(2);
      if (frame) return stop();
      if (position >= 4200 || fromStart) seek(0);
      fromStart = false;
      let last = performance.now();
      play.textContent = '❚❚ Pause';
      play.setAttribute('aria-pressed', 'true');
      const tick = now => {
        // Navigated away from: this app replaces #app.innerHTML and tells
        // nobody, so the loop has to notice on its own or run forever
        // against nodes that are no longer anywhere.
        if (!fig.isConnected) return stop();
        // CLAMP THE STEP. A backgrounded tab gets no frames, so `now - last`
        // can be the whole time the reader was away; unclamped, the first
        // frame back teleports past the end and the movement they came back
        // for has silently already finished. Measured: rAF stops dead while
        // document.hidden is true.
        const rate = slow.getAttribute('aria-pressed') === 'true' ? 0.5 : 1;
        seek(position + Math.min(now - last, 100) * rate);
        last = now;
        if (position >= 4200) return stop();
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
  });
}

/**
 * Stops any /ʃ/ movement under `root`. Idempotent, like cancelRecording():
 * the page teardown calls it on every navigation without first asking
 * whether anything is playing.
 */
export function stopShMotion(root) {
  root?.querySelectorAll?.('[data-shm]').forEach(fig => fig.dispatchEvent(new Event('shm:stop')));
}
