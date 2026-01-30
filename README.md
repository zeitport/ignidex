<h1 align="center">
<picture>
    <source srcset="./public/favicon.svg">
    <img alt="Ignidex Logo" src="./public/favicon.svg" height="48" width="48">
</picture><br>
Ignidex
</h1>


**A personal start page for links, actions, and small checklists.**

Ignidex is a local-first page you open *before* everything else. A calm, fast index for the things you access frequently.

<p>
  <a href="https://ignidex.eu"><strong>Try it live</strong></a> ·
  <a href="./docs/features.md">Features</a> ·
  <a href="#screenshots">Screenshots</a> ·
  <a href="./docs/selfhost.md">Self-Host</a> ·
  <a href="./PHILOSOPHY.md">Philosophy</a> ·
  <a href="./PRIVACY.md">Privacy</a>
</p>


## Try It Now

**[ignidex.eu](https://ignidex.eu)** — Use Ignidex directly in your browser.

- No installation required
- No account needed
- No cloud, no sync
- No tracking, no telemetry
- No external network requests
- Not a dashboard
- Everything stored locally (indexdb)
- Open source, permissive license

## Screenshots

<table>
  <tr>
    <td align="center">
      <strong>Start Panel</strong><br>
      <a href="https://ignidex.eu">
        <a href="./docs/screenshots/start-panel.png"><img src="./docs/screenshots/start-panel.png" alt="Start Panel" width="400"></a>
      </a>
    </td>
    <td align="center">
      <strong>Getting Started</strong><br>
      <img src="./docs/screenshots/getting-started.png" alt="Getting Started" width="400">
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Context Menu</strong><br>
      <img src="./docs/screenshots/context-menu-bookmark.png" alt="Context Menu" width="400">
    </td>
    <td align="center">
      <strong>Settings</strong><br>
      <img src="./docs/screenshots/settings-ui.png" alt="Settings" width="400">
    </td>
  </tr>
</table>

## Features

Organize your most-used links into a single page you open every day. Export and share your setup as a portable JSON file.

See **[Features](./docs/features.md)** for full details.

## Self-Hosting

Run Ignidex on your own server with Docker.

```bash
curl -O https://raw.githubusercontent.com/zeitport/ignidex/main/docker-compose.yml
docker compose up -d
```

Access at `http://localhost:4280`

See **[Self-Hosting Guide](./docs/selfhost.md)** for HTTPS setup, custom panels, and production deployment.

## What Ignidex Doesn't Do

Ignidex intentionally avoids:

- Charts, analytics, or dashboard widgets
- Project management or task tracking
- Accounts, sync, or external services
- Automation or scheduled jobs

If you need these, use a different tool. Ignidex is for **starting**.


## Design Principles

| Principle | Description |
|-----------|-------------|
| **Local-first** | Data stays on your machine. No accounts. No tracking. |
| **Minimal** | Few concepts. Clear behavior. Low configuration surface. |
| **Calm UI** | Works quietly. Easy to use, easy to ignore. |
| **Stable** | Feature-complete is a valid end state. |

Read the full **[Philosophy](./PHILOSOPHY.md)** for design rationale.

## Privacy & Security

- No analytics or telemetry
- No external network requests
- Works fully offline
- Data stored locally in IndexedDB
- GDPR-compliant hosted in Europe 

Read the full **[Privacy Policy](./PRIVACY.md)** for details.

## Who This Is For

- Anyone who wants a clean start page without complexity
- Developers and power users
- Self-hosters and privacy-conscious users

## Status

Ignidex is in active development.

## License

- Code: BSD 3-Clause License
- Examples: [LICENSE INFO](./public/examples/LICENSE)

---

<p align="center">
  <a href="https://ignidex.eu">ignidex.eu</a>
</p>
