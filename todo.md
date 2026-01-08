# Ignidex — TODO (v1)

> **Rule:** No new features beyond this list until v1.0.0 is tagged.

---

## Foundation

* [x] Define TS interfaces for JSON (permissive, unknown fields ignored)
* [x] Load config from localStorage
* [x] Load config from JSON file
* [x] Safe defaults when fields are missing
* [x] Render header title

---

## Layout & Rendering

* [x] Render `topSection` groups
* [x] Render `section` groups
* [x] Grid layout (fixed columns initially)
* [x] Responsive sanity (desktop-first)
* [x] Empty states (no cards / no groups)

---

## Cards (Base)

* [x] Render card name
* [x] Render description (optional)
* [x] URL optional
* [x] Open link in new tab

---

## Editing & Persistence (Local Mode)

* [x] Add card
* [ ] Edit card (name, description, url)
* [x] Delete card (confirm)
* [x] Add group
* [x] Edit group name
* [x] Delete group (confirm)
* [x] Persist changes to localStorage

---

## Import / Export (Local)

* [ ] Export JSON to file
* [ ] Import JSON from file (replace existing)
* [ ] Handle invalid JSON gracefully
* [ ] Ignore unknown fields (future-proof)

---

## Shared / Remote JSON (Read-Only Mode)

* [x] Load JSON via `?load=<https-url>`
* [x] HTTPS only
* [x] Fetch and render remote config
* [ ] Read-only mode enforced
    * [ ] Editing disabled
    * [ ] No localStorage writes
* [ ] Clear banner indicating shared / read-only view
* [ ] Actions available in read-only mode:
    * [ ] Download JSON
    * [x] Copy to local Ignidex
* [ ] Graceful error handling (network / CORS / invalid JSON)

---

## Card Types (v1)

### Link Card

* [ ] URL optional
* [ ] Open in new tab

### Checklist Card

* [ ] 1–10 items max
* [ ] Persist checked state locally (local mode only)

### Clipboard Card

* [ ] Store plain text
* [ ] Copy-to-clipboard action
* [ ] Clear visual feedback on copy

---

## Icons (Privacy-First)

* [ ] Upload icon (SVG/PNG)
* [x] Store uploaded icons in IndexedDB
* [ ] Blob URL lifecycle cleanup
* [ ] Icon picker UI
* [ ] Change / remove icon
* [x] Never show broken icon (fallback always)

---

## Settings (Local Mode)

* [ ] Grid columns setting
* [ ] Max width setting
* [ ] Theme (light/dark)
* [ ] Background (color or image)
* [x] Persist settings locally

---

## Export (Portable)

* [ ] Embed JSON config
* [ ] Embed uploaded icons
* [ ] Works offline

---

## UX Polish

* [ ] Loading states
* [ ] Error feedback (non-intrusive)
* [ ] Empty-state messaging
* [ ] Visual consistency pass

---

## Hardening

* [ ] Basic validation everywhere
* [ ] Storage cleanup (icons)
* [ ] Performance sanity check
* [ ] Remove dead code
* [ ] Final manual test pass

---

## Docs & Release

* [ ] README (what it is / what it is not)
* [ ] Screenshots
* [ ] v1.0.0 release notes
* [ ] Tag v1.0.0

---

## Explicitly NOT in v1

* HTTP POST / webhooks
* Any action with side effects
* Auth / sync
* Backend
* External services / CDNs
* Search
* Drag & drop reorder
* Charts / analytics
* Keyboard command palette
* Rich text / markdown
* Mobile-first UX
* Plugins / extensions

---

**Definition of Done (v1):**

> I use Ignidex daily.
> Links, checklists, and clipboard feel effortless.
> Icons are always present.
> Local and shared pages are clearly separated.
> Import/export never breaks.
> No feature feels half-finished.

---

