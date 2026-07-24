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
  // Australian
  'ɐ': { h: 0.72, b: 0.50 }, 'ɐː': { h: 0.80, b: 0.55 }, 'ʉː': { h: 0.10, b: 0.50, round: 1 },
};

// Diphthongs: glide from one vowel position to another.
const DIPHTHONGS = {
  'eɪ': ['e', 'ɪ'], 'aɪ': [{ h: 0.9, b: 0.5 }, 'ɪ'], 'ɔɪ': ['ɔː', 'ɪ'],
  'əʊ': ['ə', 'ʊ'], 'aʊ': [{ h: 0.9, b: 0.5 }, 'ʊ'], 'ɪə': ['ɪ', 'ə'],
  'eə': ['e', 'ə'], 'ʊə': ['ʊ', 'ə'], 'oʊ': [{ h: 0.35, b: 0.85, round: 1 }, 'ʊ'],
  'æɪ': ['æ', 'ɪ'], 'ɑɪ': [{ h: 0.92, b: 0.85 }, 'ɪ'], 'æɔ': ['æ', 'ɔː'],
  'əʉ': ['ə', 'ʉː'],
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
