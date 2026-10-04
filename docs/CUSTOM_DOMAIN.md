# Custom domain — what it costs, and the one thing it breaks

Written 2026-10-04 on the owner's direction. **Nothing has been bought,
configured or switched.** Buying a domain, pointing DNS and changing the
Pages settings are all yours: they need your card and your accounts.

Read the data-loss section before spending anything.

---

## First, honesty about why I suggested it

I recommended a custom domain in `docs/STORE_PLAN.md` for two reasons, and
**one of them no longer applies.**

- ~~Android's Digital Asset Links~~. That was for a **Trusted Web
  Activity**, which wraps the live site and must prove it owns the domain.
  You chose hand-written shells that **bundle** the app instead, so there
  is no domain to verify and asset links are irrelevant.
- **Presentation and independence.** `speechcraft.app` reads better on a
  store listing than `frankierocco3-coder.github.io/IPA-App/`, and a
  domain you own can be pointed somewhere else later. GitHub cannot be.

So the remaining case is real but it is not technical. Worth knowing
before you weigh it against what follows.

---

## THE BLOCKER: changing origin wipes every existing user

Browser storage is keyed to the **origin**. `frankierocco3-coder.github.io`
and `speechcraft.app` are different origins, and a redirect does not carry
storage across. So on the day the domain switches, every existing user —
**including your own phone and laptop** — opens the new address and finds:

- no XP, no streak, no completed lessons;
- no Studio projects, no dissections, no notebooks, no characters;
- no personal dictionary, no saved recordings.

It is all still sitting on the old origin, reachable only by typing the
old URL. Nothing is destroyed, but nothing comes with you either.

This is the same shape as the store-migration problem and the seven-day
eviction: **export and import is the only bridge.** Which makes device
test **4.1** — does Export actually produce a file on iOS — a prerequisite
for this, not just for the stores.

**If you want a custom domain at all, do it EARLY.** The cost is
proportional to how many people have progress worth losing, and that only
grows.

---

## Two hosting shapes, and only one keeps the audio working

`js/audio.js` finds clips with `new URL('../../IPA-Audio/',
import.meta.url)`. Both shapes resolve to `speechcraft.app/IPA-Audio/`.
The difference is whether anything is **there**.

### A) Domain on the **IPA-App project repo** — app at the root

`speechcraft.app/` serves the app. Prettiest URL.

**All audio breaks.** `speechcraft.app/IPA-Audio/` does not exist, because
the custom domain maps to one repository and the audio lives in another.
Fixing it means a subdomain such as `audio.speechcraft.app`, which is a
**different origin** — so the strict CSP (`connect-src 'self'`,
`media-src 'self'`) has to be opened up, amending hard constraint 3 (no
external runtime requests). That constraint has survived every change so
far, including going native.

### B) Domain on the **user site** — app stays under `/IPA-App/`

Set the domain on a `frankierocco3-coder.github.io` repository and every
project site moves with it:

```
speechcraft.app/IPA-App/     the app
speechcraft.app/IPA-Audio/   the audio
```

Same origin. The relative URL resolves exactly as it does today.
**No code changes, no CSP changes, nothing amended.** The cost is the
`/IPA-App/` path, which a one-line redirect at the root can hide.

**Recommendation: B.** The pretty root URL is not worth breaking the
same-origin model that the whole audio architecture rests on.

---

## What is already ready

Verified 2026-10-04:

- **Nothing in shipped code hardcodes the origin.** No `github.io` in
  `js/`, `css/`, `index.html`, `manifest.json`, `sw.js` or `privacy.html`.
- `manifest.json` uses `"start_url": "."` — relative, so it follows.
- `CNAME` is now in the `build_artifact.py` allow-list. It is **inert**
  until the file exists (a missing allow-listed file is skipped), so this
  changes nothing today and saves a step later. Without that line the
  CNAME would sit in the repo and never deploy.

---

## The steps, in order

1. **Answer device test 4.1 first.** If Export does not work on iOS, you
   cannot carry your own data across, and neither can anyone else.
2. Buy the domain. **Yours — I cannot make purchases.**
3. DNS at the registrar. For an apex domain, four `A` records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   and a `CNAME` for `www` → `frankierocco3-coder.github.io`.
   *(Confirm against GitHub's current documentation before entering them;
   these are the published Pages addresses and they do change.)*
4. Add a `CNAME` file containing just the domain, at the repo root. The
   allow-list already expects it.
5. Set the custom domain in that repository's Pages settings and tick
   **Enforce HTTPS**. **Yours — your GitHub account.**
6. Export your own data from the old origin and import it on the new one,
   on every device you use.
7. Update the privacy policy URL in both store listings.

---

## Timing

If you want it, now is the cheapest it will ever be. If you are unsure,
the honest position is that it buys presentation rather than capability —
and it costs every current user their progress to get it.

Nothing about the store run is blocked by this. The shells bundle the app
and never load the site at all.
