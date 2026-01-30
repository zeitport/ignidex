# FAQ

## What is Ignidex?
Ignidex is a **local-first personal start page** for links, actions, and simple panels.  
It’s designed to be calm, fast, and offline-capable — not a dashboard or productivity system.

---

## Why not just use browser bookmarks?
Bookmarks work well for links, but Ignidex focuses on:
- grouping **actions and panels**, not just URLs
- a **stable start space** independent of browser vendors
- local-first storage with offline support
- a deliberately minimal UI without sync, accounts, or noise

Ignidex does not aim to replace bookmarks; it complements them.

---

## How is this different from dashboards like Dashy, Heimdall, or Homer?
Those tools are dashboards:
- widgets
- metrics
- status pages
- integrations

Ignidex is explicitly **not** a dashboard.

It does not include:
- charts or metrics
- service monitoring
- widgets
- background updates

Ignidex is meant to be a quiet starting point, not a control center.

---

## Is Ignidex a SaaS?
No.

Ignidex is:
- open source
- local-first by design
- usable without any hosted service

A **free hosted version** is available at https://ignidex.eu for convenience, but it is optional.

---

## What is ignidex.eu exactly?
ignidex.eu is a **free, publicly available hosted instance** of Ignidex:
- same application code as local installs
- no accounts
- no tracking or analytics
- EU-hosted, GDPR-compliant

You can use it indefinitely or export your data and move elsewhere at any time.

---

## Does Ignidex track users or collect analytics?
No.

Ignidex includes:
- no analytics
- no telemetry
- no tracking scripts
- no external requests by default

See [Privacy & Security](./docs/privacyAndSecurity.md) for details.

---

## Does Ignidex make network requests?
By default: **no**.

Ignidex performs **zero external network requests** unless:
- you open a bookmark, or
- you explicitly configure and open a remote panel

There are no background requests, version checks, or CDNs.

---

## Where is my data stored?
All data is stored **locally in the browser** using IndexedDB:
- panels
- configuration
- icons

Ignidex works offline via a service worker.

Data can be exported and imported.

---

## Can my data be synced across devices?
No — by design.

Ignidex does not include:
- cloud sync
- accounts
- background data transfer

This is a deliberate non-goal to keep the system simple, predictable, and privacy-respecting.

---

## Why no sync?
Sync adds:
- accounts
- servers
- conflict resolution
- security complexity
- long-term maintenance burden

Ignidex intentionally avoids this trade-off.  
Users who want sync can export/import data or use their own tooling.

---

## Is this secure?
Ignidex aims to **minimize attack surface**:
- minimal dependencies
- no background network activity
- no code execution from user content
- no third-party services required

It does **not** attempt to be a secure vault:
- no encryption at rest
- no secret management

See [Privacy & Security](./docs/privacyAndSecurity.md) for the full security model.

---

## What happens if browser storage is cleared?
Like all browser-based apps, IndexedDB storage may be cleared by the browser or user.

If the data matters to you, export it regularly.

---

## Can I extend Ignidex with plugins?
No.

Ignidex intentionally does not provide:
- a plugin system
- custom JavaScript execution
- third-party extensions

This keeps the app small, understandable, and secure.

---

## Is Ignidex meant to become more feature-rich over time?
Ignidex is opinionated about its scope.

Non-goals include:
- dashboards
- task managers
- metrics
- sync platforms
- “do-everything” start pages

Features are evaluated based on whether they preserve simplicity and local-first behavior.

---

## Who is Ignidex for?
Ignidex is for people who want:
- a calm start page
- local-first behavior
- no accounts or tracking
- a tool that stays out of the way

It may not be a good fit if you want:
- cloud sync
- rich dashboards
- automation platforms
- collaborative features

---

## Is this production-ready?
Ignidex is actively developed and usable today.

- data formats are documented
- export/import is supported
- breaking changes are avoided where possible

Versioning details are documented in the repository.

---

## Where should security issues be reported?
If you discover a security issue, please open an issue in the repository.
