// Landing-page mockup directions. Dev-only; tests/ ships nowhere.
// Rendered by tests/mockup-frame.html against the app's REAL stylesheet,
// so what you approve here is what the app would look like.
//
// Image paths are written ../img/... because this page lives in tests/.
// In the app itself they resolve page-relative, with no prefix.

export const DIRECTIONS = [];

// ── THEATRE HISTORY ────────────────────────────────────────────────
// The only course with no Learn scene at all, so it falls through to the
// old plain renderer and is the least designed page in the app.
//
// AND IT IS THE ONLY COURSE THAT IS A TIMELINE. Four chapters carrying
// explicit date ranges, Origins to the present, and nothing on the page
// says so. Every other course is a set of modules you may read in any
// order; this one is twenty-five centuries in sequence. That is a shape
// no other course in the app can use, which is the argument for spending
// the design here rather than on a new skin.
//
// Uses the chapter art, dates, preview lines and topic counts already in
// js/data/theatre/theatre-course.js. Nothing new is drawn or generated.
DIRECTIONS.push({
  id: 'theatre-timeline',
  page: 'theatre',
  pageLabel: 'Theatre History',
  angle: 'structure · the course is a timeline',
  name: 'The Long Rail',
  html: `
<style>
  .th-mock .tr-top { text-align: left; }
  .th-mock .lp-course { margin: 0 0 2px; font-size: 11px; font-weight: 700;
    letter-spacing: .13em; color: #8a6d3b; }
  .th-mock .tr-title { font-family: var(--serif); font-size: 34px;
    line-height: 1.12; margin: 0 0 8px; text-wrap: balance; }
  .th-mock .tr-sub { margin: 0; color: var(--muted); font-size: 14px; }
  .th-mock .th-span { display: block; margin-top: 4px; font-family: var(--serif);
    font-size: 13px; font-style: italic; color: var(--muted); }

  /* THE RAIL IS THE POINT. One continuous line down the page with the
     four chapters hung off it, so the course reads as a sequence before
     a single word is read. It is drawn with a border on the list, not an
     SVG, so it costs nothing and stretches to any number of chapters. */
  /* THEATRE_PRINCIPLE, his words. The live page shows a shorter override
     subtitle instead and the principle never appears. */
  .th-mock .th-why { margin: 14px 0 0; padding: 13px 16px;
    background: var(--tint-sage); border-left: 3px solid var(--edge-sage);
    border-radius: 0 8px 8px 0; font-family: var(--serif); font-size: 16px;
    line-height: 1.45; max-width: 44ch; }
  .th-mock .th-time { list-style: none; margin: 26px 0 0; padding: 0 0 0 38px;
    border-left: 2px solid var(--edge-sage); display: grid; gap: 30px; }
  .th-mock .th-era { position: relative; margin: 0; }
  .th-mock .th-dot { position: absolute; left: -49px; top: 0;
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--tint-sage); border: 2px solid var(--edge-sage);
    font-family: var(--serif); font-size: 13px; font-weight: 700;
    color: var(--ink); display: grid; place-items: center; }
  /* Blocks by hand: these are spans because a button may only contain
     phrasing content. Same rule as the two mockups below. */
  .th-mock .th-dates, .th-mock .th-name, .th-mock .th-prev { display: block; }
  .th-mock .th-dates { margin: 2px 0 3px; font-size: 11px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; color: #8a6d3b; }
  .th-mock .th-name { font-family: var(--serif); font-size: 21px; font-weight: 700;
    line-height: 1.25; margin: 0 0 10px; }
  .th-mock .th-art { display: block; width: 100%; height: 108px;
    object-fit: cover; object-position: center;
    border: 1px solid var(--line); border-radius: 8px; }
  .th-mock .th-prev { margin: 9px 0 0; font-size: 13px; line-height: 1.5;
    color: var(--muted); }
  .th-mock .th-foot { display: flex; align-items: center; gap: 10px; margin: 9px 0 0; }
  .th-mock .th-count { font-size: 12px; font-weight: 700; color: var(--ink); }
  .th-mock .th-go { margin-left: auto; font-size: 13px; font-weight: 700;
    color: var(--green-dark); }
  /* A whole chapter is one target, and it clears 44px by a long way. */
  .th-mock .th-hit { display: block; width: 100%; text-align: left;
    background: transparent; border: 0; padding: 0; font: inherit; color: inherit;
    cursor: pointer; }
  .th-mock .th-hit:hover .th-name { color: var(--green-dark); }
  @media (max-width: 420px) {
    .th-mock .tr-title { font-size: 29px; }
    .th-mock .th-time { padding-left: 28px; }
    .th-mock .th-dot { left: -39px; }
    .th-mock .th-art { height: 92px; }
  }
</style>
<div class="tr-view sc-theatre is-light th-mock">
  <div class="tr-top">
    <p class="lp-course">THEATRE HISTORY</p>
    <h1 class="tr-title">The Stages Before Yours</h1>
    <p class="tr-sub">4 chapters <span aria-hidden="true">·</span> 19 topics
      <span class="th-span">Origins to the present, in order.</span></p>
    <p class="th-why">Theatre has no agreed first moment and no single tradition.
      Walk the history as a working actor: what each form asked of a performer,
      and what it left behind that you can still use.</p>
  </div>
  <ol class="th-time">
    <li class="th-era">
      <button class="th-hit" type="button">
        <span class="th-dot" aria-hidden="true">1</span>
        <span class="th-dates">Origins&ndash;c. 500 CE</span>
        <span class="th-name">Origins &amp; the Ancient Stage</span>
        <img class="th-art" src="../img/theatre/chapter-01-ancient.png"
             alt="A sunlit ancient amphitheatre with theatrical masks and a classical column.">
        <span class="th-prev">What Counts as Theatre? &middot; Ancient Greece &middot; Ancient Rome</span>
        <span class="th-foot"><span class="th-count">3 topics</span>
          <span class="th-go">Open chapter &rsaquo;</span></span>
      </button>
    </li>
    <li class="th-era">
      <button class="th-hit" type="button">
        <span class="th-dot" aria-hidden="true">2</span>
        <span class="th-dates">c. 900&ndash;1700</span>
        <span class="th-name">Medieval &amp; Early Modern Theatre</span>
        <img class="th-art" src="../img/theatre/chapter-02-early-modern.png"
             alt="A Commedia performer beside the Globe playhouse and a Noh mask, shown as a symbolic collage.">
        <span class="th-prev">Medieval theatre, Noh, Commedia, Shakespeare, Kabuki &amp; Bunraku, and Moli&egrave;re.</span>
        <span class="th-foot"><span class="th-count">6 topics</span>
          <span class="th-go">Open chapter &rsaquo;</span></span>
      </button>
    </li>
    <li class="th-era">
      <button class="th-hit" type="button">
        <span class="th-dot" aria-hidden="true">3</span>
        <span class="th-dates">c. 1800&ndash;1940</span>
        <span class="th-name">The Modern Stage Takes Shape</span>
        <img class="th-art" src="../img/theatre/chapter-03-modern.png"
             alt="Actors studying scripts in a warm Russian rehearsal room beside a theatre marquee.">
        <span class="th-prev">Minstrelsy &amp; resistance, vaudeville, Russia, Dublin, New York, and Harlem.</span>
        <span class="th-foot"><span class="th-count">6 topics</span>
          <span class="th-go">Open chapter &rsaquo;</span></span>
      </button>
    </li>
    <li class="th-era">
      <button class="th-hit" type="button">
        <span class="th-dot" aria-hidden="true">4</span>
        <span class="th-dates">c. 1920&ndash;present</span>
        <span class="th-name">Political &amp; Experimental Theatre</span>
        <img class="th-art" src="../img/theatre/chapter-04-experimental.png"
             alt="A performer addressing spectators in an intimate experimental theatre with visible stage lights.">
        <span class="th-prev">Brecht, postwar American drama, stages beyond Broadway, Grotowski &amp; Boal.</span>
        <span class="th-foot"><span class="th-count">4 topics</span>
          <span class="th-go">Open chapter &rsaquo;</span></span>
      </button>
    </li>
  </ol>
</div>`,
});

// ── MUSICAL THEATRE ────────────────────────────────────────────────
// Today it prints MUSICAL THEATRE over "Musical Theatre": the scene's
// `title` field is the course's own name, where five other courses carry
// a real one. It is also the SHORTEST course, two modules, so a landing
// built to hold four looks thin.
//
// The answer to both is the same: say what the course is ABOUT in the
// title, and give the two modules the whole width instead of apologising
// for there being two. The module blurb already in the data says it
// outright, "what a song does that speech cannot", so the title is taken
// from the course rather than invented over it.
//
// Uses both existing bands at their declared 2.05/1. Nothing new drawn.
DIRECTIONS.push({
  id: 'musical-moment',
  page: 'musical',
  pageLabel: 'Musical Theatre',
  angle: 'restraint · title, then let the two bands be big',
  name: 'The Moment You Sing',
  html: `
<style>
  .mu-mock .tr-top { text-align: left; }
  .mu-mock .lp-course { margin: 0 0 2px; font-size: 11px; font-weight: 700;
    letter-spacing: .13em; color: #8a6d3b; }
  .mu-mock .tr-title { font-family: var(--serif); font-size: 34px;
    line-height: 1.12; margin: 0 0 8px; text-wrap: balance; }
  .mu-mock .tr-sub { margin: 0; color: var(--muted); font-size: 14px; }
  .mu-mock .mu-why { margin: 14px 0 0; padding: 14px 16px;
    background: var(--tint-gold); border-left: 3px solid var(--edge-gold);
    border-radius: 0 8px 8px 0; font-family: var(--serif); font-size: 16px;
    line-height: 1.45; }
  .mu-mock .mu-list { display: grid; gap: 24px; margin: 26px 0 0; }
  /* TWO MODULES GET THE WHOLE WIDTH. A grid built for four makes a
     two-module course look unfinished; a full-bleed band makes it look
     deliberate. Same data, same art, different confidence. */
  .mu-mock .mu-card { display: block; width: 100%; text-align: left;
    background: var(--panel); border: 1px solid var(--line);
    border-radius: 10px; overflow: hidden; padding: 0;
    font: inherit; color: inherit; cursor: pointer; }
  .mu-mock .mu-art { display: block; width: 100%; aspect-ratio: 2.05 / 1;
    object-fit: cover; }
  .mu-mock .mu-body { display: block; padding: 15px 16px 17px; }
  /* SPANS, BECAUSE A BUTTON MAY ONLY CONTAIN PHRASING CONTENT, so
     each one has to be told to be a block. Without this the kicker,
     the title and the blurb run together on one line. The app's own
     .mp-row has the same shape for the same reason. */
  .mu-mock .mu-kicker, .mu-mock .mu-name, .mu-mock .mu-blurb { display: block; }
  .mu-mock .mu-kicker { margin: 0 0 4px; font-size: 11px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase; color: #8a6d3b; }
  .mu-mock .mu-name { font-family: var(--serif); font-size: 23px; font-weight: 700;
    margin: 0 0 7px; line-height: 1.2; }
  .mu-mock .mu-blurb { margin: 0; font-size: 14px; line-height: 1.5; color: var(--muted); }
  .mu-mock .mu-foot { display: flex; align-items: center; gap: 10px; margin: 12px 0 0; }
  .mu-mock .mu-count { font-size: 12px; font-weight: 700; }
  .mu-mock .mu-go { margin-left: auto; font-size: 13px; font-weight: 700; color: var(--green-dark); }
  .mu-mock .mu-card:hover .mu-name { color: var(--green-dark); }
  @media (max-width: 420px) { .mu-mock .tr-title { font-size: 29px; } }
</style>
<div class="tr-view sc-musical is-light mu-mock">
  <div class="tr-top">
    <p class="lp-course">MUSICAL THEATRE</p>
    <h1 class="tr-title">The Same Dramatic Life</h1>
    <p class="tr-sub">2 modules <span aria-hidden="true">&middot;</span> 22 lessons</p>
  </div>
  <p class="mu-why">A musical number is not a break from the acting. It is the
    same dramatic life carried by other means, and the repertoire is organised so
    you can find the one that fits the voice and the character you have.</p>
  <div class="mu-list">
    <button class="mu-card" type="button">
      <img class="mu-art" src="../img/ui/musical-band-mt-form.jpg"
           alt="A painted chorus in an open prairie landscape, a windmill and a barn behind them.">
      <span class="mu-body">
        <span class="mu-kicker">Module 1</span>
        <span class="mu-name">The Book Musical</span>
        <span class="mu-blurb">What a book musical is made of, the traditions it
          came from, what a song does that speech cannot, and how to approach a
          number as playable action.</span>
        <span class="mu-foot"><span class="mu-count">14 lessons</span>
          <span class="mu-go">Explore module &rsaquo;</span></span>
      </span>
    </button>
    <button class="mu-card" type="button">
      <img class="mu-art" src="../img/ui/musical-band-mt-era.jpg"
           alt="Five performers side by side in the costume of different decades.">
      <span class="mu-body">
        <span class="mu-kicker">Module 2</span>
        <span class="mu-name">Repertoire</span>
        <span class="mu-blurb">How the catalogue is built, six working periods from
          the 1940s songbook to the present, and the two categories that cut
          across all of them.</span>
        <span class="mu-foot"><span class="mu-count">8 lessons</span>
          <span class="mu-go">Explore module &rsaquo;</span></span>
      </span>
    </button>
  </div>
</div>`,
});

// ── SCREEN ACTING ──────────────────────────────────────────────────
// Today it prints SCREEN ACTING over "Screen Acting", and under it
// "9 modules . 9 lessons", which is the rule working correctly and
// reading oddly: nine modules holding one lesson each.
//
// THE LETTERBOX IS THE DESIGN, not a bad crop. docs/SCREEN_LEARN_ART_BRIEF.md
// records it: this course is drawn as thin cinemascope strips because it is
// the one place in the app where the picture is shaped like the medium the
// course teaches. So the landing leans the whole way into it and reads as a
// strip of frames down the page.
//
// Every band keeps its OWN declared aspect, from 455/62 to 455/33. They were
// averaged once and the owner caught heads being cropped on 7, 8 and 9.
DIRECTIONS.push({
  id: 'screen-strip',
  page: 'screen',
  pageLabel: 'Screen Acting',
  angle: 'identity · the page is shaped like the medium',
  name: 'Nine Frames',
  html: `
<style>
  .sc-mock .tr-top { text-align: left; }
  .sc-mock .lp-course { margin: 0 0 2px; font-size: 11px; font-weight: 700;
    letter-spacing: .13em; color: #7d848c; }
  .sc-mock .tr-title { font-family: var(--serif); font-size: 34px;
    line-height: 1.12; margin: 0 0 8px; text-wrap: balance; }
  .sc-mock .tr-sub { margin: 0; color: var(--muted); font-size: 14px; }
  /* NINE MODULES OF ONE LESSON IS NOT A COUNT WORTH PRINTING TWICE.
     Said in words instead, once, honestly. */
  .sc-mock .sc-note { display: block; margin-top: 4px; font-family: var(--serif);
    font-size: 13px; font-style: italic; color: var(--muted); }
  /* HIS SENTENCE, WHICH THE PAGE NEVER SHOWED. SCREEN_PRINCIPLE has sat in
     screen-course.js since the course was written, and the scene renderer
     displays B.principle nowhere: only the older .ws-head page does. The
     course's own thesis was invisible on the one page that needed it. */
  .sc-mock .sc-why { margin: 14px 0 0; padding: 13px 16px;
    background: var(--tint-blue); border-left: 3px solid var(--edge-blue);
    border-radius: 0 8px 8px 0; font-family: var(--serif); font-size: 16px;
    line-height: 1.45; max-width: 44ch; }
  .sc-mock .sc-reel { display: grid; gap: 14px; margin: 26px 0 0; }
  .sc-mock .sc-frame { display: grid; grid-template-columns: 26px minmax(0, 1fr);
    gap: 12px; align-items: start; width: 100%; text-align: left;
    background: transparent; border: 0; padding: 0; font: inherit; color: inherit;
    cursor: pointer; }
  .sc-mock .sc-no { font-family: var(--serif); font-size: 15px; font-weight: 700;
    color: var(--muted); padding-top: 2px; font-variant-numeric: tabular-nums; }
  .sc-mock .sc-strip { display: block; width: 100%; object-fit: cover;
    border: 1px solid var(--edge-blue); border-radius: 3px; background: var(--tint-blue); }
  .sc-mock .sc-frame > span { display: block; min-width: 0; }
  .sc-mock .sc-name { display: block; font-family: var(--serif); font-size: 18px; font-weight: 700;
    margin: 7px 0 0; line-height: 1.25; }
  .sc-mock .sc-frame:hover .sc-name { color: var(--green-dark); }
  /* Module 9 has no usable band (455x33, cut off by the bottom edge of the
     owner's mockup). An art slot with no entry renders NOTHING, which is
     honest; a squashed band would not be. It gets a rule instead. */
  .sc-mock .sc-noart { height: 2px; background: var(--edge-blue); margin-top: 3px; }
  @media (max-width: 420px) { .sc-mock .tr-title { font-size: 29px; } }
</style>
<div class="tr-view sc-screen is-light sc-mock">
  <div class="tr-top">
    <p class="lp-course">SCREEN ACTING</p>
    <h1 class="tr-title">The Record You Answer To</h1>
    <p class="tr-sub">9 modules
      <span class="sc-note">Nine short modules, one lesson in each.</span></p>
    <p class="sc-why">The camera is not an audience you reach, it is a record you
      answer to. Do less, listen for real, and make every take repeatable.</p>
  </div>
  <div class="sc-reel">
    <button class="sc-frame" type="button"><span class="sc-no">01</span><span>
      <img class="sc-strip" style="aspect-ratio: 455 / 62" src="../img/ui/screen-band-sc-start.jpg" alt="Two people talking across a table in a warmly lit room.">
      <span class="sc-name">How This Course Works</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">02</span><span>
      <img class="sc-strip" style="aspect-ratio: 449 / 63" src="../img/ui/screen-band-sc-presence.jpg" alt="An actor standing in front of a lit film camera on a tripod.">
      <span class="sc-name">The Camera Is the Audience</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">03</span><span>
      <img class="sc-strip" style="aspect-ratio: 455 / 62" src="../img/ui/screen-band-sc-craft.jpg" alt="A crew member crouching to lay a tape mark on the floor.">
      <span class="sc-name">Technical Craft</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">04</span><span>
      <img class="sc-strip" style="aspect-ratio: 449 / 62" src="../img/ui/screen-band-sc-reacting.jpg" alt="Two actors in close conversation under a practical lamp.">
      <span class="sc-name">Listening and Reacting</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">05</span><span>
      <img class="sc-strip" style="aspect-ratio: 455 / 54" src="../img/ui/screen-band-sc-preparation.jpg" alt="Two people leaning over a marked-up script on a table.">
      <span class="sc-name">Scene Prep for Screen</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">06</span><span>
      <img class="sc-strip" style="aspect-ratio: 449 / 54" src="../img/ui/screen-band-sc-onset.jpg" alt="A film set seen wide, with a boom operator and two actors mid-scene.">
      <span class="sc-name">Working with the Set</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">07</span><span>
      <img class="sc-strip" style="aspect-ratio: 455 / 54" src="../img/ui/screen-band-sc-tape.jpg" alt="A woman performing to a phone mounted on a small tripod.">
      <span class="sc-name">Self-Tape and Audition</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">08</span><span>
      <img class="sc-strip" style="aspect-ratio: 449 / 54" src="../img/ui/screen-band-sc-address.jpg" alt="A man looking straight down the lens, speaking directly to the camera.">
      <span class="sc-name">Talking to the Lens</span></span></button>
    <button class="sc-frame" type="button"><span class="sc-no">09</span><span>
      <img class="sc-strip" style="aspect-ratio: 455 / 33" src="../img/ui/screen-band-sc-root.jpg" alt="A hand holding a clapperboard at the edge of a lit set.">
      <span class="sc-name">Repetition and the Reality of Doing</span></span></button>
  </div>
</div>`,
});

// ── PRACTICE ───────────────────────────────────────────────────────
// 15 cards, every one on an emoji, no art at all, on a PRIMARY bottom
// nav tab. The only primary destination in the app with no artwork.
//
// TWO DIRECTIONS, because the choice is really about who does the work.
//
// A needs ~10 new pieces from the owner. B needs nothing from anybody:
// the app ALREADY has a drawn line-icon language, NAV_ICONS at
// js/main.js:301, six icons at 24x24, stroke 1.75, currentColor, shipping
// in the bottom nav of every page. B extends that idiom to the modes.
// These are UI chrome drawn in code, the same category as the SVG
// grounds, not the painted 46x46 illustrations the owner makes.
//
// Real mode ids, titles and blurbs from js/data/dialect-course.js:966.

const PRACTICE_MODES = [
  ['listen','Listen &amp; Choose','Hear it, pick the symbol.','🎧','',
   '<path d="M5 13v-1a7 7 0 0 1 14 0v1"/><rect x="3.2" y="12.8" width="3.8" height="6.4" rx="1.7"/><rect x="17" y="12.8" width="3.8" height="6.4" rx="1.7"/>'],
  ['pairs','Minimal Pairs','Which word did you hear?','👂','',
   '<circle cx="9.2" cy="12" r="5.4"/><circle cx="14.8" cy="12" r="5.4"/>'],
  ['match','Matching','Match symbols to words.','🃏','img/ui/flash-cards.png',
   '<rect x="3" y="5.6" width="7.6" height="12.8" rx="1.6"/><rect x="13.4" y="5.6" width="7.6" height="12.8" rx="1.6"/><path d="M10.6 12h2.8"/>'],
  ['decode','Decode the Word','Read IPA, type the word.','🔡','img/ui/ipa.png',
   '<path d="M8.6 5.2H6v13.6h2.6"/><path d="M15.4 5.2H18v13.6h-2.6"/><path d="M10.4 12h3.2"/>'],
  ['find','Find the Word','Which word has this sound?','🔍','',
   '<circle cx="11" cy="11" r="6"/><path d="m15.6 15.6 4 4"/>'],
  ['name','Name That Sound','Match the description.','💬','',
   '<path d="M20.4 6.6a1.6 1.6 0 0 0-1.6-1.6H5.2a1.6 1.6 0 0 0-1.6 1.6v7.8a1.6 1.6 0 0 0 1.6 1.6H8v3.2l3.8-3.2h7a1.6 1.6 0 0 0 1.6-1.6Z"/>'],
  ['readsent','Read a Sentence','Decode a full IPA line.','📖','img/ui/one-line.png',
   '<path d="M4 7.4h16"/><path d="M4 12h16"/><path d="M4 16.6h10"/>'],
  ['spell','Spell It','Fill the missing letters.','✏️','',
   '<path d="m16.4 4.6 3 3L8.8 18.2l-4 1 1-4Z"/><path d="m14.6 6.4 3 3"/>'],
  ['gaps','Fill the Gaps','Complete the transcription.','🧩','',
   '<path d="M4 12h3.6"/><rect x="8.8" y="8.8" width="6.4" height="6.4" rx="1.3"/><path d="M16.4 12H20"/>'],
  ['build','Build a Word','Assemble it from tiles.','🔨','',
   '<rect x="3.6" y="13" width="7" height="6.4" rx="1.3"/><rect x="13.4" y="13" width="7" height="6.4" rx="1.3"/><rect x="8.5" y="4.6" width="7" height="6.4" rx="1.3"/>'],
  ['missing','Missing Symbol','One symbol is missing.','⬜','',
   '<rect x="4.4" y="4.4" width="15.2" height="15.2" rx="2.2" stroke-dasharray="3.6 3"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/>'],
  ['writesent','Transcribe a Sentence','Pick the right transcription.','📝','',
   '<rect x="4.8" y="3.8" width="12" height="16.4" rx="1.8"/><path d="M8 8.6h5.6"/><path d="M8 12.2h5.6"/><path d="M8 15.8h3.4"/>'],
  ['idiom','Words &amp; Expressions','Everyday phrases in this accent.','🗣','img/ui/dictionary.png',
   '<path d="M4 6.2h10.4v6.4H8l-2.8 2.3v-2.3H4Z"/><path d="M9.6 10.4H20v6.4h-3.6l-2.8 2.3v-2.3H9.6Z"/>'],
  ['shift','Accent Shift','Transform between accents.','⇄','',
   '<path d="M4.6 9.2h13"/><path d="m14.6 6.2 3 3-3 3"/><path d="M19.4 14.8h-13"/><path d="m9.4 11.8-3 3 3 3"/>'],
  ['earacc','Name the Accent','RP or American?','🌍','img/ui/globe.png',
   '<circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4c2.4 2.2 3.6 5 3.6 8s-1.2 5.8-3.6 8c-2.4-2.2-3.6-5-3.6-8S9.6 6.2 12 4Z"/>'],
];

const PRACTICE_CSS = `
  .pr-mock .page-h { font-family: var(--serif); font-size: 30px; margin: 0 0 4px; }
  .pr-mock .pr-sub { margin: 0 0 20px; color: var(--muted); font-size: 14px; }
  .pr-mock .pr-cap { display: flex; align-items: center; gap: 12px; margin: 22px 0 12px; }
  .pr-mock .pr-cap::after { content: ""; height: 1px; flex: 1; background: var(--line); }
  .pr-mock .pr-label { margin: 0; font-size: 11px; font-weight: 700;
    letter-spacing: .13em; text-transform: uppercase; color: #8a6d3b; }
  .pr-mock .pr-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .pr-mock .pr-card { display: block; text-align: left; width: 100%;
    background: var(--panel); border: 1px solid var(--line); border-radius: 10px;
    padding: 12px 12px 11px; font: inherit; color: inherit; cursor: pointer; min-height: 44px; }
  .pr-mock .pr-card:hover { border-color: var(--edge-sage); background: var(--tint-sage); }
  .pr-mock .pr-name { display: block; font-family: var(--serif); font-size: 15.5px;
    font-weight: 700; line-height: 1.22; margin-top: 9px; }
  .pr-mock .pr-blurb { display: block; font-size: 12.5px; line-height: 1.4;
    color: var(--muted); margin-top: 3px; }
  .pr-mock .pr-meta { display: block; font-size: 11px; color: var(--muted); margin-top: 7px; }
  .pr-mock .pr-slot { display: grid; place-items: center; width: 38px; height: 38px;
    border-radius: 10px; background: var(--tint-sage); color: var(--green-dark); }
  /* TWO ACROSS AT PHONE WIDTH, like the live page. Fifteen full-width
     cards would make this the longest page in the app; the real
     .mode-card grid holds two at 390 and so does this. One column is
     kept only for the genuinely tiny, where two would crush the type. */
  @media (max-width: 330px) { .pr-mock .pr-grid { grid-template-columns: 1fr; } }
`;

function practiceHtml(kind) {
  const cards = PRACTICE_MODES.map(([id, title, blurb, emoji, img, svg]) => {
    let slot;
    if (kind === 'art') {
      slot = img
        ? `<span class="pr-slot" style="background:var(--tint-gold)"><img src="../${img}" alt="" width="34" height="34"></span>`
        : `<span class="pr-slot pr-todo" aria-hidden="true">${emoji}</span>`;
    } else {
      slot = `<span class="pr-slot"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">${svg}</svg></span>`;
    }
    return `<button class="pr-card" data-mode="${id}" type="button">${slot}
      <span class="pr-name">${title}</span>
      <span class="pr-blurb">${blurb}</span>
      <span class="pr-meta">~4 min</span></button>`;
  }).join('');
  return `<style>${PRACTICE_CSS}
  .pr-mock .pr-todo { background: var(--bad-tint); font-size: 21px;
    outline: 1px dashed var(--red); outline-offset: -1px; }
  </style>
<div class="pr-mock">
  <h1 class="page-h">Practice</h1>
  <p class="pr-sub">Practice as often as you like. Nothing here is scored against you.</p>
  <div class="pr-cap"><p class="pr-label">All modes</p></div>
  <div class="pr-grid">${cards}</div>
</div>`;
}

DIRECTIONS.push({
  id: 'practice-drawn',
  page: 'practice',
  pageLabel: 'Practice',
  angle: 'B · drawn line icons, needs no artwork',
  name: 'The Nav Idiom',
  html: practiceHtml('drawn'),
});

DIRECTIONS.push({
  id: 'practice-art',
  page: 'practice',
  pageLabel: 'Practice',
  angle: 'A · illustrated, red slots still need your art',
  name: 'The Painted Set',
  html: practiceHtml('art'),
});

// ── PRACTICE, VIBRANT (owner picked the painted set, 2026-11-19) ──
//
// WHERE THE COLOUR COMES FROM. Not invented: `.track-card` on the More
// page already carries 2px borders, a 5px bottom edge and a 6px coloured
// left edge from --track-color, and the app's own values for it are
// #6f8657 sage, #64748b slate and #8a6d3b gold. The tint/edge pairs add
// terracotta and lavender. Every colour below is one of those.
//
// THE TILE STAYS PALE AND THAT IS DELIBERATE. `.track-glyph.has-img`
// drops the solid --track-color to --accent-tint with a hairline, because
// a full-colour illustration needs a neutral ground; a painted icon on a
// saturated square fights it. So the vibrancy is carried by the card.
//
// COLOUR MEANS SOMETHING HERE. Five families, grouped under captions, so
// the left edge tells you what the exercise trains rather than decorating
// it. The live page is already sectioned (Quick Practice, Listening...),
// so this is the existing structure with the colour made to earn its keep.
const PRACTICE_FAMILIES = [
  ['By ear', '#64748b', 'var(--tint-blue)', 'var(--edge-blue)',
   ['listen', 'pairs', 'earacc']],
  ['Reading IPA', '#8a6d3b', 'var(--tint-gold)', 'var(--edge-gold)',
   ['decode', 'readsent', 'find']],
  ['Writing it down', '#6f8657', 'var(--tint-sage)', 'var(--edge-sage)',
   ['spell', 'gaps', 'build', 'missing', 'writesent']],
  ['Recall', '#a99bc4', 'var(--tint-lavender)', 'var(--edge-lavender)',
   ['match', 'name']],
  ['Accent work', '#c0604a', 'var(--tint-terracotta)', 'var(--edge-terracotta)',
   ['shift', 'idiom']],
];

DIRECTIONS.push({
  id: 'practice-vibrant',
  page: 'practice',
  pageLabel: 'Practice',
  angle: 'the painted set, with the card carrying the colour',
  name: 'Five Families',
  html: (() => {
    const byId = Object.fromEntries(PRACTICE_MODES.map(m => [m[0], m]));
    const groups = PRACTICE_FAMILIES.map(([fam, color, tint, edge, ids]) => {
      const cards = ids.map(id => {
        const [, title, blurb, emoji, img] = byId[id];
        const slot = img
          ? `<span class="pv-slot" style="background:${tint};border-color:${edge}">
               <img src="../${img}" alt="" width="46" height="46"></span>`
          : `<span class="pv-slot pv-todo" aria-hidden="true"
               style="background:${tint};border-color:${color}">${emoji}</span>`;
        return `<button class="pv-card" style="--track-color:${color}" data-mode="${id}" type="button">
          ${slot}
          <span class="pv-text">
            <span class="pv-name">${title}</span>
            <span class="pv-blurb">${blurb}</span>
          </span></button>`;
      }).join('');
      return `<div class="pv-cap"><p class="pv-label" style="color:${color}">${fam}</p>
        <span class="pv-rule" style="background:${edge}"></span></div>
        <div class="pv-grid">${cards}</div>`;
    }).join('');
    return `<style>
  .pv-mock .page-h { font-family: var(--serif); font-size: 30px; margin: 0 0 4px; }
  .pv-mock .pv-sub { margin: 0 0 4px; color: var(--muted); font-size: 14px; }
  .pv-mock .pv-cap { display: flex; align-items: center; gap: 12px; margin: 24px 0 11px; }
  .pv-mock .pv-label { margin: 0; font-size: 11px; font-weight: 700;
    letter-spacing: .13em; text-transform: uppercase; }
  .pv-mock .pv-rule { height: 2px; flex: 1; border-radius: 2px; }
  .pv-mock .pv-grid { display: grid; gap: 11px; }
  /* The More page's own card, which is the most vibrant thing already
     shipping: chunky bottom edge, 6px of family colour down the left. */
  .pv-mock .pv-card { display: flex; align-items: center; gap: 14px; width: 100%;
    text-align: left; font: inherit; color: inherit; cursor: pointer;
    background: var(--panel); border: 2px solid var(--line);
    border-bottom-width: 5px; border-left: 10px solid var(--track-color);
    border-radius: 14px; padding: 13px 15px; }
  .pv-mock .pv-card:active { transform: translateY(2px); border-bottom-width: 3px; }
  .pv-mock .pv-card:hover { border-color: var(--track-color); border-left-color: var(--track-color); }
  .pv-mock .pv-slot { flex: none; display: grid; place-items: center;
    width: 62px; height: 62px; border-radius: 14px;
    background: var(--accent-tint); border: 1px solid var(--line); }
  .pv-mock .pv-slot img { width: 46px; height: 46px; object-fit: contain; display: block; }
  /* DASHED, NOT RED. The ten slots awaiting art carry the family tint
     like the finished five, so the page shows what it will LOOK like; the
     dashed edge is the only thing marking them. A red slot shouted louder
     than the design and made a finished page look broken. */
  .pv-mock .pv-todo { font-size: 30px; border-style: dashed; border-width: 1.5px; }
  .pv-mock .pv-text { min-width: 0; }
  .pv-mock .pv-name { display: block; font-family: var(--serif); font-size: 18px;
    font-weight: 700; line-height: 1.22; }
  .pv-mock .pv-blurb { display: block; font-size: 13px; line-height: 1.4;
    color: var(--muted); margin-top: 3px; }
</style>
<div class="pv-mock">
  <h1 class="page-h">Practice</h1>
  <p class="pv-sub">Practice as often as you like. Nothing here is scored against you.</p>
  ${groups}
</div>`;
  })(),
});
