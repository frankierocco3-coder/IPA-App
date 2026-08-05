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
