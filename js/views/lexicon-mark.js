// Marking the slang — Shakespeare's Language, highlighted so the word shows
//
// Owner order 2026-09-26: mark the slang itself. A lexicon row carries a
// meaning, an actor's note and sometimes a metre line, and all of that
// buried the one thing a reader is scanning 160 rows for, which is the
// word. So the headword is highlighted on the page, and where an entry
// carries a line the word is highlighted INSIDE the line too. Twenty of
// the 160 entries carry a line, and those are exactly the rows where a
// reader had to hunt a quotation for the word being defined.
//
// This lives in its own module rather than inside the renderer because it
// is the one part of the page with a wrong answer available: match too
// loosely and the highlight lands on the wrong word in Shakespeare's line,
// or worse, a bug in the marker drops the escaping on text that goes
// straight into innerHTML. Pure functions here mean the regression suite
// tests the BEHAVIOUR — which word is marked, and that every character
// survives escaped exactly once — instead of grepping the renderer.
//
// MATCHING IS CONSERVATIVE ON PURPOSE:
//   inflections   the line rarely carries the dictionary form — owe/owest,
//                 let/lets, tell/tells, rival/rivals — so a short list of
//                 endings is tried against each whole word.
//   alternates    'yon / yonder' and 'thou / thee / thy / thine' split on
//                 the slash, and any of them may be the one in the line.
//   glosses       a parenthetical is editorial, not text: 'anon (as reply)'
//                 looks for anon.
//   affixes       a bare affix entry ('-èd', '-est ending', 'a- prefix') is
//                 never matched inside a word. Highlighting three letters
//                 in the middle of a word teaches nothing.
//   no guessing   an entry that names a construction rather than a word
//                 ('double comparatives', 'emphatic do', 'inverted word
//                 order') matches nothing and is left exactly as written.
//                 No highlight is the honest answer; picking a likely word
//                 out of the line would be the app inventing a claim.

export const LEX_INFLECTIONS = ['', 's', 'es', 'd', 'ed', 'st', 'est', 'th', 'eth', 'ing', 'n', '’s'];

/** Every written form of a headword that should light up in its own line. */
export function lexTermForms(term) {
  const parts = String(term ?? '').replace(/\([^)]*\)/g, '').split('/')
    .map(s => s.trim().toLowerCase())
    .filter(p => p && !p.startsWith('-') && !p.endsWith('-'));
  return new Set(parts.flatMap(p => LEX_INFLECTIONS.map(i => p + i)));
}

// The line splits into word runs and the punctuation between them, so a
// match is decided one whole word at a time. That is what lets the
// apostrophised entries work (’tis, on’t, ta’en, o’er) without trusting a
// word boundary next to a curly quote, and it is why the escaping below
// can be exhaustive: every piece of the split goes through esc, marked or
// not, so the output is the input escaped once with tags added only around
// whole words this function chose.
const LEX_WORD_SPLIT = /([A-Za-zÀ-ɏ’']+)/;

/**
 * The example line as HTML, with the headword marked wherever it appears.
 * `esc` is passed in rather than imported so this module stays a leaf with
 * no dependency on the UI layer.
 */
export function lexMarkedExample(term, example, esc) {
  const forms = lexTermForms(term);
  return String(example ?? '').split(LEX_WORD_SPLIT)
    .map((part, i) => (i % 2 && forms.has(part.toLowerCase())
      ? `<mark class="lex-hit">${esc(part)}</mark>`
      : esc(part)))
    .join('');
}
