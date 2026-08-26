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
export function vowelSpaceSVG() {
  const dots = Object.entries(VOWELS)
    .filter(([, v]) => !v.r) // skip the rhotic duplicates
    .map(([sym, v]) => {
      const [x, y] = vowelPoint(v);
      return `<g><circle cx="${x}" cy="${y}" r="${v.round ? 11 : 7}" fill="${v.round ? 'none' : 'var(--green)'}"
        stroke="${v.round ? 'var(--lavender)' : 'none'}" stroke-width="2.5"/>
        <text x="${x}" y="${y + 4.5}" text-anchor="middle" class="vs-sym" fill="${v.round ? 'var(--ink)' : '#fff'}">${sym}</text></g>`;
    }).join('');
  return `<svg viewBox="0 0 300 220" class="artic-svg" role="img" aria-label="Vowel space chart">
    <polygon points="70,40 230,40 205,190 100,190" fill="var(--panel-2)" stroke="var(--line)" stroke-width="2"/>
    <line x1="150" y1="40" x2="152" y2="190" stroke="var(--line)" stroke-dasharray="3 3"/>
    <text x="64" y="36" class="artic-lbl" text-anchor="end">close</text>
    <text x="96" y="205" class="artic-lbl">open</text>
    <text x="70" y="26" class="artic-lbl">front</text>
    <text x="230" y="26" class="artic-lbl" text-anchor="end">back</text>
    <text x="152" y="26" class="artic-lbl" text-anchor="middle">central</text>
    ${dots}
  </svg>`;
}
