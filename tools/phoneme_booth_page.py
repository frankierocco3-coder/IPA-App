#!/usr/bin/env python3
"""Render the booth pages as one self-contained HTML page.

Presentation only. Every fact comes from tools/phoneme_booth_data.py,
which reads the manifests and APPROVED_PHONEMES through the same
functions that generate the markdown scripts - so this page cannot drift
from docs/PHONEME_RECORDING_SCRIPT_*.md.

    python3 tools/phoneme_booth_page.py --out <path.html>
"""

import argparse
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import phoneme_booth_data as data  # noqa: E402


def dashes(obj):
    """Manifest prose uses a spaced ASCII hyphen where a dash is meant."""
    if isinstance(obj, str):
        return obj.replace(" - ", " — ")
    if isinstance(obj, list):
        return [dashes(x) for x in obj]
    if isinstance(obj, dict):
        return dict((k, dashes(v)) for k, v in obj.items())
    return obj


HTML = """<title>Phoneme Booth Scripts</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400&display=swap">
<style>
/* Layout: sticky accent switcher over a single reading column of take cards.
   Palette and serif stack are the Speechcraft app's own (css/style.css). */
:root {
  --bg: #efe9dc;            /* warm cream page */
  --panel: #f6f1e8;
  --panel-2: #ece5d6;
  --ink: #2f3a2e;           /* deep olive */
  --muted: #625f4c;
  --line: #ddd6c4;
  --sage: #6f8657;          /* record once, serves every course */
  --sage-tint: #e6ebdd;
  --terra: #a34c38;         /* cannot be borrowed */
  --terra-tint: #f2e3dc;
  --gold: #9a7a28;
  --serif: "Gentium Book Plus", "Iowan Old Style", Palatino, Georgia, serif;
  --sans: -apple-system, "SF Pro Text", "Segoe UI", system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #1b1f1a; --panel: #242a22; --panel-2: #2d342a;
    --ink: #ece5d6; --muted: #a8a894; --line: #3a4236;
    --sage: #9db583; --sage-tint: #2b3526;
    --terra: #e0907a; --terra-tint: #3a2823;
    --gold: #d2b05f;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #1b1f1a; --panel: #242a22; --panel-2: #2d342a;
  --ink: #ece5d6; --muted: #a8a894; --line: #3a4236;
  --sage: #9db583; --sage-tint: #2b3526;
  --terra: #e0907a; --terra-tint: #3a2823;
  --gold: #d2b05f;
  color-scheme: dark;
}

* { box-sizing: border-box; }
body {
  background: var(--bg); color: var(--ink);
  font-family: var(--sans); font-size: 16px; line-height: 1.55;
  -webkit-text-size-adjust: 100%;
}
body::before {
  content: ""; position: fixed; inset: 0 0 auto;
  height: env(safe-area-inset-top, 0px); z-index: 20; background: var(--panel);
}
.gut {
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
}
.wrap { max-width: 760px; margin: 0 auto; }
h1, h2, h3 { font-family: var(--serif); font-weight: 700; text-wrap: balance; margin: 0; }
h1 { font-size: 1.45rem; letter-spacing: -0.01em; }
h2 { font-size: 1.3rem; margin-block: 0 .5rem; }
h3 { font-size: 1.05rem; }
p { margin: 0 0 .75rem; }
p:last-child { margin-bottom: 0; }
code, .slug {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: .86em;
}
.lede { color: var(--muted); max-width: 62ch; }

/* ---- header ---------------------------------------------------------- */
header {
  position: sticky; top: env(safe-area-inset-top, 0px); z-index: 10;
  background: var(--panel); border-bottom: 1px solid var(--line);
}
.hrow { display: flex; flex-wrap: wrap; align-items: baseline; gap: .5rem 1rem; padding-block: .7rem .5rem; }
.hrow h1 { min-width: 0; }
.src { font-size: .76rem; color: var(--muted); }
.tabs { display: flex; flex-wrap: wrap; gap: .4rem; padding-bottom: .6rem; }
.tab {
  font: inherit; font-size: .88rem; cursor: pointer;
  background: var(--bg); color: var(--ink);
  border: 1px solid var(--line); border-radius: 999px;
  padding: .3rem .7rem; display: inline-flex; align-items: center; gap: .4rem;
}
.tab:hover { border-color: var(--sage); }
.tab[aria-selected="true"] { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.tab .pill {
  font-size: .76rem; font-variant-numeric: tabular-nums;
  background: var(--sage-tint); color: var(--sage);
  border-radius: 999px; padding: 0 .4rem; font-weight: 700;
}
.tab[aria-selected="true"] .pill { background: var(--sage); color: var(--panel); }

/* ---- controls -------------------------------------------------------- */
.ctl {
  display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1rem;
  padding-block: .55rem; border-top: 1px solid var(--line);
  font-size: .85rem;
}
.sw { display: inline-flex; align-items: center; gap: .45rem; cursor: pointer; }
.sw input { accent-color: var(--sage); width: 1.05em; height: 1.05em; }
.count { color: var(--muted); font-variant-numeric: tabular-nums; }
.prog { margin-left: auto; font-variant-numeric: tabular-nums; color: var(--muted); }
.prog b { color: var(--sage); }

/* ---- session brief --------------------------------------------------- */
main { padding-block: 1.25rem 3rem; }
.brief {
  background: var(--panel); border: 1px solid var(--line);
  border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;
}
.sum { display: flex; flex-wrap: wrap; gap: .4rem; align-items: baseline; font-family: var(--serif); font-size: 1.1rem; }
.sum .big { font-size: 2rem; font-weight: 700; color: var(--sage); font-variant-numeric: tabular-nums; line-height: 1; }
.warn {
  margin-top: .8rem; padding: .6rem .75rem; border-left: 3px solid var(--gold);
  background: var(--panel-2); border-radius: 0 6px 6px 0; font-size: .9rem;
}

/* ---- pile stats ------------------------------------------------------ */
.piles { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: .7rem; margin-bottom: 1.5rem; }
.pile { border: 1px solid var(--line); border-radius: 10px; padding: .8rem; background: var(--panel); min-width: 0; }
.pile .n { font-family: var(--serif); font-size: 1.9rem; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; }
.pile .t { font-weight: 700; font-size: .9rem; margin-top: .15rem; }
.pile .d { font-size: .82rem; color: var(--muted); margin-top: .3rem; }
.pile.own { border-color: var(--terra); background: var(--terra-tint); }
.pile.own .n, .pile.own .t { color: var(--terra); }
.pile.fresh { border-color: var(--sage); background: var(--sage-tint); }
.pile.fresh .n, .pile.fresh .t { color: var(--sage); }
.pile.copy .n { color: var(--muted); }
.pile.zero { border-style: dashed; }
.pile.zero .n { color: var(--muted); }
.pile.zero .t { color: var(--muted); }

/* ---- disclosure ------------------------------------------------------ */
details { border: 1px solid var(--line); border-radius: 10px; background: var(--panel); margin-bottom: .7rem; }
summary { cursor: pointer; padding: .65rem .85rem; font-family: var(--serif); font-weight: 700; font-size: 1rem; }
summary::marker { color: var(--sage); }
.dbody { padding: 0 .85rem .85rem; font-size: .93rem; }
.dbody p { max-width: 64ch; }
.rule { font-size: .9rem; padding-left: .9rem; border-left: 2px solid var(--line); margin-bottom: .7rem; }
.rule b { font-family: var(--serif); }

/* ---- at a glance ----------------------------------------------------- */
.glance { overflow-x: auto; margin: .4rem 0 1.4rem; }
table { border-collapse: collapse; font-size: .88rem; }
th, td { text-align: left; padding: .35rem .8rem .35rem 0; border-bottom: 1px solid var(--line); }
th { font-size: .74rem; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
td.num { font-variant-numeric: tabular-nums; }

/* ---- take cards ------------------------------------------------------ */
.list { display: flex; flex-direction: column; gap: .6rem; }
.take {
  display: grid; grid-template-columns: 2.6rem 1fr; gap: .2rem .9rem;
  border: 1px solid var(--line); border-left-width: 4px; border-radius: 8px;
  background: var(--panel); padding: .75rem .9rem; min-width: 0;
}
.take.own { border-left-color: var(--terra); }
.take.fresh { border-left-color: var(--sage); }
.take.copy { border-left-color: var(--line); opacity: .72; }
.take.done { opacity: .5; }
.take .ord {
  grid-row: 1 / span 3; font-family: var(--serif); font-size: 1.5rem; font-weight: 700;
  color: var(--muted); font-variant-numeric: tabular-nums; text-align: right; line-height: 1.1;
}
.hd { display: flex; flex-wrap: wrap; align-items: baseline; gap: .3rem .6rem; min-width: 0; }
.sym { font-family: var(--serif); font-size: 1.75rem; line-height: 1; font-weight: 400; }
.sym .br { color: var(--muted); font-weight: 400; }
.slug { color: var(--ink); background: var(--panel-2); border-radius: 4px; padding: .1rem .35rem; }
.set { font-size: .74rem; letter-spacing: .06em; color: var(--muted); font-weight: 700; }
.kind { font-size: .74rem; color: var(--gold); font-weight: 700; }
.gd { font-size: .95rem; margin-top: .3rem; max-width: 60ch; }
.badge { display: inline-block; font-size: .78rem; font-weight: 700; border-radius: 999px; padding: .1rem .5rem; }
.badge.own { background: var(--terra-tint); color: var(--terra); border: 1px solid var(--terra); }
.badge.fresh { background: var(--sage-tint); color: var(--sage); border: 1px solid var(--sage); }
.badge.copy { background: var(--panel-2); color: var(--muted); border: 1px solid var(--line); }
.why { font-size: .88rem; color: var(--muted); margin-top: .35rem; }
.why .lbl { color: var(--ink); font-weight: 700; }
.serves { font-size: .85rem; color: var(--sage); margin-top: .3rem; }
.tick { display: inline-flex; align-items: center; gap: .35rem; font-size: .82rem; color: var(--muted); margin-top: .45rem; cursor: pointer; }
.tick input { accent-color: var(--sage); }
.none { color: var(--muted); font-style: italic; padding: 1rem 0; }

:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
@media (max-width: 460px) {
  .take { grid-template-columns: 1.9rem 1fr; gap: .2rem .6rem; padding: .65rem .7rem; }
  .take .ord { font-size: 1.2rem; }
  .sym { font-size: 1.5rem; }
  h1 { font-size: 1.25rem; }
}
</style>

<header class="gut">
  <div class="wrap">
    <div class="hrow">
      <h1>Phoneme Booth Scripts</h1>
      <span class="src">generated from the manifests</span>
    </div>
    <div class="tabs" role="tablist" aria-label="Accent"></div>
    <div class="ctl">
      <label class="sw">
        <input type="checkbox" id="only" checked>
        <span>Only what I record</span>
      </label>
      <span class="count" id="count"></span>
      <span class="prog" id="prog"></span>
    </div>
  </div>
</header>

<main class="gut"><div class="wrap" id="view"></div></main>

<script type="application/json" id="data">__DATA__</script>
<script>
(function () {
  "use strict";
  var D = JSON.parse(document.getElementById("data").textContent);
  var KEY = "speechcraft-booth-done";
  var accents = D.accents;
  var codes = accents.map(function (a) { return a.code; });

  function loadDone() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveDone(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }
  var done = loadDone();

  function isDone(code, slug) {
    return !!(done[code] && done[code].indexOf(slug) !== -1);
  }
  function toggleDone(code, slug, on) {
    if (!done[code]) done[code] = [];
    var i = done[code].indexOf(slug);
    if (on && i === -1) done[code].push(slug);
    if (!on && i !== -1) done[code].splice(i, 1);
    saveDone(done);
  }

  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  var PILE = {
    own: { label: "Records its own take", lead: "Its own take" },
    fresh: { label: "New shared sound", lead: "New shared" },
    copy: { label: "No new take needed", lead: "Already covered" }
  };

  function current() {
    var h = (location.hash || "").replace(/^#/, "");
    var i = codes.indexOf(h);
    return accents[i === -1 ? 0 : i];
  }

  function buildTabs() {
    var box = document.querySelector(".tabs");
    box.textContent = "";
    accents.forEach(function (a) {
      var b = el("button", "tab");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.id = "tab-" + a.code;
      b.appendChild(document.createTextNode(a.name));
      b.appendChild(el("span", "pill", String(a.perform)));
      b.addEventListener("click", function () { location.hash = a.code; });
      box.appendChild(b);
    });
  }

  function markTabs(code) {
    accents.forEach(function (a) {
      var b = document.getElementById("tab-" + a.code);
      b.setAttribute("aria-selected", a.code === code ? "true" : "false");
    });
  }

  function para(parent, text) {
    if (!text) return;
    parent.appendChild(el("p", null, text));
  }

  function renderPiles(a, host) {
    var g = el("div", "piles");
    var defs = [
      ["own", a.own, "Its own take",
       a.own ? "The spec names a departure, so these teach this accent's realization. Never reuse another course's file."
             : "Every sound this accent uses is shared, or one another accent diverges on."],
      ["fresh", a.fresh, "New shared sounds",
       "Nobody has recorded these yet. One good take serves every course that shares the sound."],
      ["copy", a.copy, "Already covered",
       "Recorded and approved for Neutral American on 2026-09-22. Copied in, not re-performed."]
    ];
    defs.forEach(function (d) {
      // A pile of zero is "nothing to do here", so it must not wear the
      // colour that means "this one cannot be borrowed".
      var c = el("div", "pile " + (d[1] ? d[0] : "zero"));
      c.appendChild(el("div", "n", String(d[1])));
      c.appendChild(el("div", "t", d[2]));
      c.appendChild(el("div", "d", d[3]));
      g.appendChild(c);
    });
    host.appendChild(g);
  }

  function disclosure(host, title, open, fill) {
    var d = document.createElement("details");
    if (open) d.open = true;
    var s = document.createElement("summary");
    s.textContent = title;
    d.appendChild(s);
    var b = el("div", "dbody");
    fill(b);
    d.appendChild(b);
    host.appendChild(d);
  }

  var RULES = [
    ["Hold each one about a second.", "Steady pitch, comfortable speaking loudness. No fade, no swell, no falling pitch at the end."],
    ["A word first, then the sound.", "Say the word under your breath to find the vowel, then produce the sound alone. Do not record the word."],
    ["One take per file.", "Try a sound as often as you like, keep only the take you are happy with. A file holding two sounds is refused by the prep tool, not imported."],
    ["File names are the slug.", "Exactly as printed on each card. Any format the recorder makes is fine: m4a, wav, aiff or mp3."]
  ];

  function renderTake(a, e) {
    var card = el("div", "take " + e.pile);
    if (e.pile !== "copy" && isDone(a.code, e.slug)) card.classList.add("done");
    card.appendChild(el("div", "ord", String(e.n)));

    var hd = el("div", "hd");
    var sym = el("span", "sym");
    var open = e.symbol === "\\u0294" ? "[" : "/";
    var close = e.symbol === "\\u0294" ? "]" : "/";
    sym.appendChild(el("span", "br", open));
    sym.appendChild(document.createTextNode(e.symbol));
    sym.appendChild(el("span", "br", close));
    hd.appendChild(sym);
    hd.appendChild(el("span", "slug", e.slug));
    if (e.set) hd.appendChild(el("span", "set", e.set));
    if (e.kind === "syllable") hd.appendChild(el("span", "kind", "syllable demo"));
    hd.appendChild(el("span", "badge " + e.pile, PILE[e.pile].lead));
    card.appendChild(hd);

    var body = el("div");
    body.appendChild(el("div", "gd", e.guidance));

    if (e.takeWhy) {
      var w = el("div", "why");
      w.appendChild(el("span", "lbl", "Why its own: "));
      w.appendChild(document.createTextNode(e.takeWhy));
      body.appendChild(w);
    }
    if (e.takeNote) {
      body.appendChild(el("div", "why", e.takeNote + "."));
    }
    if (e.pile === "fresh") {
      body.appendChild(el("div", "serves", e.alsoServes.length
        ? "Also serves " + e.alsoServes.join(", ")
        : "Used by this course only"));
    }
    if (e.pile === "copy") {
      body.appendChild(el("div", "why", "The Neutral American recording covers this one."));
    } else {
      var lab = el("label", "tick");
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = "done-" + a.code + "-" + e.slug;
      cb.checked = isDone(a.code, e.slug);
      cb.addEventListener("change", function () {
        toggleDone(a.code, e.slug, cb.checked);
        card.classList.toggle("done", cb.checked);
        updateMeta(a);
      });
      lab.appendChild(cb);
      lab.appendChild(document.createTextNode("Take recorded"));
      body.appendChild(lab);
    }
    card.appendChild(body);
    return card;
  }

  function updateMeta(a) {
    var only = document.getElementById("only").checked;
    var shown = a.entries.filter(function (e) {
      return !only || e.pile !== "copy";
    }).length;
    document.getElementById("count").textContent =
      "Showing " + shown + " of " + a.total + (only ? " \\u2014 " + a.copy + " copied in, hidden" : "");
    var d = (done[a.code] || []).filter(function (s) {
      return a.entries.some(function (e) { return e.slug === s && e.pile !== "copy"; });
    }).length;
    var p = document.getElementById("prog");
    p.textContent = "";
    var b = el("b", null, String(d));
    p.appendChild(b);
    p.appendChild(document.createTextNode(" of " + a.perform + " recorded"));
  }

  function render() {
    var a = current();
    markTabs(a.code);
    var v = document.getElementById("view");
    v.textContent = "";

    // session brief
    var brief = el("div", "brief");
    var h = el("h2", null, a.name);
    brief.appendChild(h);
    var sum = el("div", "sum");
    sum.appendChild(el("span", "big", String(a.perform)));
    sum.appendChild(el("span", null, "takes to perform, out of " + a.total + " clips the course needs."));
    brief.appendChild(sum);
    var sub = el("p", "lede");
    sub.style.marginTop = ".6rem";
    sub.textContent = "Across all four accents the whole job is " + D.sessionTotal +
      " performances \\u2014 " + D.sessionShared + " new shared sounds plus " +
      D.sessionOwn + " accent-specific takes.";
    brief.appendChild(sub);
    var warn = el("div", "warn");
    warn.appendChild(document.createTextNode(
      "The four tabs add up to " + D.naiveSum + ", not " + D.sessionTotal +
      ". A shared sound appears in every script that wants it and is recorded once, " +
      "so finishing one accent shortens the others."));
    brief.appendChild(warn);
    v.appendChild(brief);

    renderPiles(a, v);

    disclosure(v, "Before you start", false, function (b) {
      para(b, a.general);
      RULES.forEach(function (r) {
        var d = el("div", "rule");
        d.appendChild(el("b", null, r[0] + " "));
        d.appendChild(document.createTextNode(r[1]));
        b.appendChild(d);
      });
      if (a.order) {
        var o = el("div", "rule");
        o.appendChild(el("b", null, "Record in the printed order. "));
        o.appendChild(document.createTextNode(a.order));
        b.appendChild(o);
      }
      if (a.frame) {
        b.appendChild(el("h3", null, "The syllable frame"));
        para(b, a.frame);
      }
    });

    disclosure(v, "Casting and what to listen for", false, function (b) {
      para(b, a.cast);
      a.risks.forEach(function (t) { para(b, t); });
    });

    disclosure(v, "Handing them over", false, function (b) {
      [
        "Put every file you recorded in one folder, each named by its slug.",
        "Tell me the folder. The prep tool trims the silence, levels the takes against each other, checks each file is a real recording, and writes MP3.",
        "The " + a.copy + " already-covered sounds are copied from the Neutral American set into the same folder under their own slug names, so import sees one complete course.",
        "You listen at #audit and mark each one Good or Bad. Only the ones you mark Good ever reach a learner \\u2014 approval is exact to the dialect, voice and slug.",
        "Nothing about the other courses changes. Approving " + a.name + " leaves every other accent exactly as it was."
      ].forEach(function (t, i) {
        var d = el("div", "rule");
        d.appendChild(el("b", null, (i + 1) + ". "));
        d.appendChild(document.createTextNode(t));
        b.appendChild(d);
      });
      para(b, a.share);
      var f = el("p", "lede");
      f.textContent = "Script: " + a.script + "  \\u00b7  Manifest: " + a.manifest;
      b.appendChild(f);
    });

    // at a glance
    var head = el("h2", null, "The recording list");
    head.style.marginTop = "1.6rem";
    v.appendChild(head);
    var note = el("p", "lede");
    note.textContent = "Manifest order, which prep_phonemes.py --split uses to name files when it cuts one continuous take. The order is load-bearing, not presentational.";
    v.appendChild(note);

    var gl = el("div", "glance");
    var tb = document.createElement("table");
    var tr = document.createElement("tr");
    ["Group", "Entries"].forEach(function (t) {
      var th = document.createElement("th");
      th.textContent = t;
      tr.appendChild(th);
    });
    tb.appendChild(tr);
    a.runs.forEach(function (r) {
      var row = document.createElement("tr");
      var c1 = document.createElement("td");
      c1.textContent = D.kindLabel[r.kind].replace(/^./, function (m) { return m.toUpperCase(); });
      var c2 = document.createElement("td");
      c2.className = "num";
      c2.textContent = r.hi > r.lo ? r.lo + "\\u2013" + r.hi : String(r.lo);
      row.appendChild(c1);
      row.appendChild(c2);
      tb.appendChild(row);
    });
    gl.appendChild(tb);
    v.appendChild(gl);
    if (a.repeatedGroups) {
      var rg = el("p", "lede");
      rg.style.marginTop = "-.9rem";
      rg.textContent = "A group appears twice because this accent lists the sounds it shares with the other courses first, then its own distinctly named set. That is the manifest's order, so it is kept rather than tidied.";
      v.appendChild(rg);
    }

    var list = el("div", "list");
    list.id = "list";
    var only = document.getElementById("only").checked;
    var any = false;
    a.entries.forEach(function (e) {
      if (only && e.pile === "copy") return;
      list.appendChild(renderTake(a, e));
      any = true;
    });
    if (!any) list.appendChild(el("p", "none", "Nothing to record for this accent."));
    v.appendChild(list);

    updateMeta(a);
  }

  document.getElementById("only").addEventListener("change", render);
  window.addEventListener("hashchange", render);
  buildTabs();
  render();
})();
</script>
"""


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()
    payload = dashes(data.build())
    blob = json.dumps(payload, ensure_ascii=True, separators=(",", ":"))
    if "</script" in blob or "<!--" in blob:
        raise SystemExit("payload would break out of the script tag")
    html = HTML.replace("__DATA__", blob)
    # The page must not depend on the host declaring a charset: an em dash
    # served as UTF-8 and read as Latin-1 prints as mojibake. Everything
    # non-ASCII goes out as a \\uXXXX escape, so this must hold.
    try:
        html.encode("ascii")
    except UnicodeEncodeError as exc:
        bad = html[exc.start:exc.end]
        line = html[:exc.start].count("\n") + 1
        raise SystemExit("non-ASCII %r at line %d - escape it" % (bad, line))
    with open(args.out, "w", encoding="utf-8") as fh:
        fh.write(html)
    print("wrote %s  (%.1f KB, payload %.1f KB)"
          % (args.out, len(html.encode()) / 1024, len(blob.encode()) / 1024))
    return 0


if __name__ == "__main__":
    sys.exit(main())
