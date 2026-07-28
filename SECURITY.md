# Security policy

Speechcraft is a static, local-first web app. It has no backend, no accounts
and no server-side data, so the realistic security surface is: the repository
and its deploy pipeline, files you import, and data stored in your own browser.

## Reporting a vulnerability

**Please do not open a public issue for a security problem, and please do not
include a working exploit in the first message.**

Report privately, whichever is easier:

1. **GitHub private vulnerability reporting** — the *Security* tab of this
   repository → *Report a vulnerability*. This is preferred.
2. **Email** — `SECURITY_CONTACT_EMAIL_PLACEHOLDER`
   *(replace with a real address before publishing this file widely).*

Please include:

* what the issue is and roughly how it is triggered
* which file or screen it affects
* what an attacker gains
* browser and version

**What to expect:** acknowledgement within about a week. This is a personal
project maintained by one person, so there is no formal SLA and no bug bounty.
Credit is given in the fix commit unless you prefer otherwise.

## Scope

**In scope**
* XSS or code execution in the app
* Bypassing import validation (`js/validate.js`)
* Prototype pollution or data corruption from a crafted file
* Anything causing data to leave the device
* Microphone handling flaws
* Workflow, Actions or deployment weaknesses
* Credentials committed to the repository

**Out of scope**
* Anything requiring an already-compromised device, browser or extension
* The fact that browser storage is unencrypted and readable by anyone with
  access to the device — this is a documented, accepted property (see
  `PRIVACY.md`)
* Missing HTTP security headers that **GitHub Pages cannot send**
  (`frame-ancestors`, `X-Frame-Options`, `Permissions-Policy`) — known and
  documented in `docs/THREAT_MODEL.md`; header configs for other hosts are in
  `deploy/`
* Denial of service achieved by a user against their own browser
* Social engineering, physical access, spam

## Verifying a release yourself

Everything served is plain, unminified, unbundled source. You can read the
exact code the app runs. To check a checkout:

```bash
python3 tools/security_audit.py     # credentials, external origins, unsafe JS, action pinning
```

and, with the app running, in the browser console:

```js
import('./tests/security.test.js').then(m => m.run());
```
