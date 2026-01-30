# Privacy & Security

Ignidex is designed to be **local-first**, offline-capable, and silent by default.

## Network behavior

- Ignidex does not load remote fonts
- Ignidex does not load icons from CDNs
- Ignidex does not ping a version or update endpoint
- Ignidex does not perform any external network requests on startup
- External network requests occur only when you explicitly open a bookmark or a remote panel of your choice

## Local storage & offline use

- All panels and user data are stored locally in the browser using IndexedDB
- Icons are stored locally after first use
- Ignidex works offline via a service worker
- Data can be exported and imported
- A formal data schema will be provided

> **⚡ Note**: As with all browser storage, IndexedDB may be cleared by the browser
> or user. Export regularly if the data matters to you.

## Public app

- The public app at ignidex.eu runs the same exact application code as local installations
- No analytics, tracking, or telemetry are included
- The demo is hosted on an EU server and follows GDPR-compliant hosting practices

## Remote content

- Remote panels load third-party content and are subject to the privacy policies of those services
- Ignidex does not inspect, modify, or proxy remote content
- Remote panels can be copied to the local storage, then no remote requests are made

## Dependencies & supply chain

- Ignidex has a small dependency footprint (see package.json)
- No third-party services are required to run the application

## Non-goals

- No accounts or authentication
- No cloud sync
- No telemetry or analytics
- No secret management or encryption at rest

If you discover a security issue, please open an issue at https://github.com/zeitport/ignidex/issues.
