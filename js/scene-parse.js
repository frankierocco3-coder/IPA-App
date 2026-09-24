// Parses a PROVIDED scene (js/data/scenes.js) into the app's scene
// shape — { characters, lines: [{ who, text }] } — so the scene-aware
// tools (Flash Cards by role, cue work, scene games) can run on the
// Scenes shelf, not only on strict NAME: Studio scripts.
//
// The format rules mirror renderProvidedScene (main.js): blank-line
// blocks; own-line ALL-CAPS speakers ("JACK."); declared speakerLabels
// matched inline ("Mrs. Alving. …", "HIGGINS [aside] …", "MR. X, …"),
// as bare-label headings (the Glaspell convention), and per-line in
// verse (the rhymed-couplet convention). If the two ever disagree, the
// renderer is the authority on how a scene LOOKS; this parser only
// decides who SPEAKS what.
//
// Cleaning: cue text is the spoken words only. Bracketed directions,
// parenthesized italic directions and leading italic directions
// ("_shyly again._—") are removed; italic EMPHASIS keeps its words
// ("the _Morning Post_" keeps "Morning Post"). Narrative paragraphs
// with no speaker (a Shaw stage paragraph, a scene heading) are not
// attributed to anyone: a wrong cue is worse than a missing one.

const OWN_LINE = /^[A-Z][A-Z .’']*\.$/;
const HEAD_EXCLUDE = /^(SCENE|ACT)$/;

const cleanText = s => s
  .replace(/\[[^\]]*\]/g, ' ')            // bracketed directions
  .replace(/\(_[^)]*_\)/g, ' ')           // parenthesized italic directions
  .replace(/^\s*_[^_]*\._\s*(?:—|--)?/, ' ') // leading italic direction (ends with a period)
  .replace(/_/g, '')                      // emphasis markers keep their words
  .replace(/\s+/g, ' ')
  .replace(/^[\s.—-]+/, '')
  .trim();

const cleanWho = h => h.replace(/[.,:]\s*$/, '').trim();

export function parseProvidedScene(sc) {
  if (!sc || !sc.text) return null;
  const labels = sc.speakerLabels ?? null;
  const turns = [];
  let open = null;                         // heading-style speaker collecting blocks

  const push = (who, raw) => {
    const text = cleanText(raw);
    if (text) turns.push({ who: cleanWho(who), text });
  };
  const closeOpen = () => {
    if (open) { push(open.who, open.parts.join(' ')); open = null; }
  };
  const startTurn = (who, raw) => {
    closeOpen();
    if (cleanText(raw)) push(who, raw);
    else open = { who, parts: [] };        // bare heading — body follows in later blocks
  };

  const matchLabel = flat => labels?.find(n => flat === n || flat.startsWith(n + '.')
    || flat.startsWith(n + ',') || flat.startsWith(n + ' (') || flat.startsWith(n + ' ['));

  for (const block of String(sc.text).split(/\n\s*\n/)) {
    const ls = block.split('\n');
    const flat = ls.join(' ').replace(/\s+/g, ' ').trim();
    if (!flat) continue;

    if (sc.verse && labels) {
      // Verse with inline speakers: turns split at label-opening lines.
      for (const raw of ls) {
        const line = raw.trim();
        if (!line) continue;
        if (/^[\[(]/.test(line)) continue;                      // direction line
        const lab = labels.find(n => line.startsWith(n + '.'));
        if (lab) { closeOpen(); open = { who: lab, parts: [line.slice(lab.length + 1)] }; }
        else if (open) open.parts.push(line);
      }
      continue;
    }
    if (OWN_LINE.test(ls[0].trim()) && !HEAD_EXCLUDE.test(ls[0].trim().slice(0, -1))) {
      startTurn(ls[0].trim(), ls.slice(1).join(' '));
      continue;
    }
    const lab = matchLabel(flat);
    if (lab) {
      if (flat === lab) { closeOpen(); open = { who: lab, parts: [] }; }
      else {
        const punct = flat[lab.length] === '.' || flat[lab.length] === ',' ? 1 : 0;
        startTurn(flat.slice(0, lab.length + punct), flat.slice(lab.length + punct));
      }
      continue;
    }
    const m = flat.match(/^([A-Z][A-Z .’']{1,30}?):\s+(.*)$/s);
    if (m) { startTurn(m[1], m[2]); continue; }
    const md = flat.match(/^([A-Z][A-Z’']{1,28}?)\.\s+(.*)$/s);
    if (md && !HEAD_EXCLUDE.test(md[1])) { startTurn(md[1], md[2]); continue; }
    if (/^[\[(]/.test(flat)) {
      // A block can open with a complete direction and continue into
      // speech; the speech belongs to the open heading-speaker if any.
      const sp = flat.match(/^(\[[^\]]*\])\s+(.+)$/s);
      if (sp && open) open.parts.push(sp[2]);
      continue;                                               // pure direction — keep `open`
    }
    if (open) open.parts.push(flat);                          // continuation of a heading turn
    // else: narrative paragraph with no speaker — never attributed
  }
  closeOpen();

  const characters = [...new Set(turns.map(t => t.who))];
  if (characters.length < 2 || turns.length < 4) return null;
  return { characters, lines: turns };
}

// ── Verse and prose ───────────────────────────────────────────
// A scene's form comes from the RECORD, never from the shape of the
// text. Hard-wrapped prose and lineated verse look alike once they are
// in a fixed-width file, and the difference between them is a thing
// this app teaches — so guessing it from line length would be a
// heuristic wearing the clothes of a fact.
//
// A record with no `form` map is uniform, and `verse` says which. A
// mixed scene lists its switch points: each entry names the FIRST WORDS
// of the speech where the new form begins, and that form holds until
// the next entry.
//
// Returns a function, because the switches are positional: call it with
// each speech's first line, in reading order, and it reports the form
// that speech is in.
export function formTracker(sc) {
  let form = sc?.verse ? 'verse' : 'prose';
  const switches = sc?.form ?? [];
  return first => {
    const hit = switches.find(s => String(first).startsWith(s.from));
    if (hit) form = hit.form;
    return form;
  };
}

// ── Speeches with their lineation kept ────────────────────────
// parseProvidedScene() flattens each turn into one cue string, which is
// what the role tools want. The verse tools want the opposite — the
// LINES, because in verse the lines are the metre. This returns the
// scene in reading order as
//   { kind: 'direction', text }
//   { kind: 'speech', who, lines, form, attributed }
// with the words untouched.
//
// An unlabelled block is stage business unless the record CLAIMS it:
// three of the Shakespeare cuts open mid-speech, so their first words
// carry no speaker label in the source. `unlabelled` names the speaker
// of each, quoting the words it attaches to — an editorial attribution,
// flagged as one, never inserted into the text.
export function sceneSpeeches(sc) {
  if (!sc || !sc.text) return [];
  const claims = sc.unlabelled ?? [];
  const formOf = formTracker(sc);
  const out = [];
  for (const block of String(sc.text).split(/\n\s*\n/)) {
    const ls = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!ls.length) continue;
    const head = ls[0];
    if (OWN_LINE.test(head) && !HEAD_EXCLUDE.test(head.slice(0, -1))) {
      const lines = ls.slice(1);
      if (lines.length) out.push({ kind: 'speech', who: cleanWho(head), lines, form: formOf(lines[0]) });
      else out.push({ kind: 'direction', text: head });
      continue;
    }
    const claim = claims.find(c => head.startsWith(c.from));
    if (claim) {
      out.push({ kind: 'speech', who: claim.who, attributed: true, lines: ls, form: formOf(ls[0]) });
      continue;
    }
    out.push({ kind: 'direction', text: ls.join(' ') });
  }
  return out;
}
