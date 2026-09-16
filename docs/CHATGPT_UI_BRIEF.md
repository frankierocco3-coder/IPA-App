# ChatGPT UI brief — paste-ready

How to use: attach screenshots of the screens listed at the bottom
(phone screenshots are fine), paste the prompt block below, and send.
Bring the full response back to Tess. Tess vets every proposal against
the house constraints, implements the keepers, runs the gates and the
suite, and nothing ships without Frankie's approval and "push it".

Do NOT let ChatGPT talk you into: a framework, a build step, a CSS
library, icon fonts, Google Fonts, a rebrand, or a dark mode. Those are
all constraint violations and Tess will strike them on return anyway.

---

## The prompt (paste everything between the lines)

You are a senior product designer doing a UI critique and improvement
pass on a shipped web app. You are working from screenshots plus the
notes below. Be specific and practical; no redesign fantasies.

**The product.** Speechcraft, a speech / acting / dialect trainer for
working actors. Live at https://frankierocco3-coder.github.io/IPA-App/
(it is a JS single-page app, so trust the screenshots over your
browser). Duolingo-style shell: left sidebar with Learn / Practice /
Studio / Library / Progress / More, a winding lesson path, card-based
libraries, long-form reading chapters, a rehearsal studio where actors
work on their own scripts.

**What I want from you.**
1. A frank critique of the attached screens: what looks amateur, dated,
   cluttered, inconsistent, or hard to scan. Rank by impact.
2. Your top 10 concrete improvements, highest impact first. For each:
   - **Problem** — what is wrong, on which screen.
   - **Proposal** — the fix, described visually.
   - **Spec** — exact CSS-level details: spacing values, type sizes,
     line lengths, border radii, shadow values, color adjustments,
     layout changes. Real numbers, not adjectives.
   - **Mobile** — how it behaves at ~400px width.
   - **Risk** — what could get worse if this is done clumsily.
3. A short section on typography and vertical rhythm for the long
   reading chapters specifically (they are the heart of the app).
4. A short section on the lesson path screen: hierarchy, affordance,
   and how to make the current-lesson state more obvious.

**Hard constraints — proposals that break these are useless to me.**
- Vanilla HTML/CSS/JS, no build step. No frameworks, no CSS libraries,
  no Tailwind, no icon fonts, no new dependencies of any kind.
- No external resources at runtime: no Google Fonts, no CDNs, nothing
  fetched from another origin. System font stacks and local assets only.
- The visual identity is settled and must be evolved, not replaced:
  warm off-white paper ground, deep muted greens, serif display
  headings, an editorial print feel. No rebrand, no dark mode, no
  glassmorphism, no gradients-everywhere trends.
- Accessibility is non-negotiable: visible focus states, real buttons,
  WCAG AA contrast, reduced-motion support, 44px+ touch targets.
- Emoji are currently used as card icons in places. You may propose
  replacing them with inline SVG, but only inline SVG.
- The app is used on phones and desktops; every proposal must work at
  400px width without horizontal scroll.

**Output format.** Markdown. Numbered proposals. Terse prose. Specs as
bullet lists of property: value pairs. No preamble about how nice the
app is.

---

## Screens to attach

Capture at desktop width and, where marked, phone width too.

1. Learn — the lesson path for an accent course (desktop + phone)
2. Learn — the Acting course module grid
3. A reading chapter, mid-scroll (desktop + phone) — e.g. Acting 6.6
4. A lesson exercise screen mid-question (the IPA course)
5. Library — the Acting Library card grid
6. Practice — the hub with Quick Practice and the game groups
7. Studio — the project list and one open project
8. Progress — the stats page
9. Home stats bar close-up: workspace chip, course chip, hearts/XP

## What happens on return

Tess sorts the response into keep / modify / kill with reasons,
implements the keepers behind the usual process (gates, 451-check
browser suite, your eyes on the preview), and nothing deploys without
your "push it". Expect roughly a third of any external design feedback
to die on the no-dependencies and identity constraints — that is the
filter working, not wasted effort.
