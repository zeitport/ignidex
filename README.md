<h1>
<picture>
    <source srcset="./public/favicon.svg">
    <img alt="Ignidex Logo" src="./public/favicon.svg" height="48" width="48"> 
</picture>
Ignidex
</h1>

**A personal start page for links, actions, and small checklists.**

Ignidex is a local-first page you open *before* everything else. A calm, fast index for the things you access frequently.

<br>
<br>
<a href="https://ignidex.eu" target="_blank" rel="noopener noreferrer">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshots/start-panel.png">
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshots/start-panel.png">
  <img alt="Ignidex Screenshot" src="./docs/screenshots/start-panel.png">
</picture>
</a>
<br>
<br>

**It is not a dashboard. It is not a productivity system.**


---

## 🔥 What Ignidex Does

### Cards

Everything is a card. A card can be:
- A link (with optional icon and description)
- A trigger (POST request / webhook)
- A checkbox (for short, ephemeral lists)

### Sections

Cards are grouped into sections you define (e.g., Applications, Bookmarks, Tools).

### StartPanel

Your layout is stored as a JSON file (a StartPanel). Import, export, edit directly.

#### URL Flag: `load`

You can specify which `startPanel.json` file to load by using the `load` URL parameter. This allows you to share "start panels" with others.
These shared panels are opened in a read-only mode, but can be downloaded and edited locally.

**Example:**
`http://localhost:3000/?load=http%3A%2F%2Flocalhost%3A3000%2Fexamples%2Fignidex.json`

Note: The URL passed to the `load` parameter should be URL-encoded.

**CORS Note:** If you are loading a JSON file from a different domain, ensure that the server hosting the file has Cross-Origin Resource Sharing (CORS) enabled to allow requests from your Ignidex instance.

If no `load` parameter is provided, it defaults to `/store/test.json`.

---

## 👎 What Ignidex Doesn't Do

Ignidex intentionally avoids:
- Charts, analytics, or dashboards
- Project management or task tracking
- Accounts, sync, or external services
- Automation or scheduled jobs

If you need these, use a different tool. Ignidex is for **starting**, not managing.

---

## 🧙‍♂️ Design Principles

- **Local-first**: Data stays on your machine. No accounts. No tracking.
- **Minimal**: Few concepts. Clear behavior. Low configuration surface.
- **Stable**: Feature-complete is a valid end state. Maintenance is low.
- **Calm**: Works quietly. Easy to use, easy to ignore.

See [PHILOSOPHY.md](./PHILOSOPHY.md) for the full design rationale.

---

## 👤 Who This Is For

- Developers and engineers
- Self-hosters
- Anyone who wants a clean start page without complexity

---

## ✅ Status

Ignidex is in early development. Expect breaking changes.

---

## 🎯 Roadmap

### Core (now):
- Cards with links, icons, labels
- Section-based layout
- JSON import/export

### Planned:
- Webhook triggers
- Checkbox mode (session-scoped, not persistent task management)
- Theme support

---

## 🤯 Why Ignidex

Most start page projects become dashboards.
They add features, frameworks, build steps, and dependencies. Then they get abandoned when the maintainer burns out.

Ignidex is intentionally small. No framework. No build step. Minimal dependencies. You can read the entire codebase in an afternoon.

If it works today, it should work in five years
