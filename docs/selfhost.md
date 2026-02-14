# Self-Hosting Ignidex

Ignidex is a web application that can be self-hosted using Docker.

## Prerequisites

- Docker

## Quick Start

Download the `docker-compose.yml`:

```bash
curl -O https://raw.githubusercontent.com/zeitport/ignidex/refs/heads/main/docker-compose.yml
```

Run:

```bash
docker compose up -d
```

Access Ignidex at `http://localhost:4280`.

## Data Storage

Ignidex stores data in the browser's IndexedDB. Each user's data remains in their browser.

## HTTPS

For production, we recommend running Ignidex behind a reverse proxy. Caddy handles TLS certificates automatically:

```yaml
services:
  ignidex:
    image: ghcr.io/zeitport/ignidex:latest
    restart: unless-stopped

  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    depends_on:
      - ignidex
    restart: unless-stopped

volumes:
  caddy_data:
  caddy_config:
```

Create a `Caddyfile`:

```
ignidex.example.com {
    reverse_proxy ignidex:80
}
```

Caddy automatically provisions Let's Encrypt certificates.

## Updates

```bash
docker compose pull
docker compose up -d
```

## Serving Custom Start Panels

Ignidex uses JSON files called "start panels" to define the layout of cards, sections, and groups. By default, user data is stored in the browser's IndexedDB. However, you can also serve pre-configured start panels from your server, allowing you to share layouts with others or provide default configurations.

### How It Works

The Ignidex container runs nginx to serve the web application. By mounting a local directory into the nginx html folder, you can make your own JSON files accessible alongside the app. Users can then load these panels using the `load` URL parameter.

When a start panel is loaded via URL, it opens in read-only mode. Users can browse and use the links, but changes are not saved. They can download the panel and import it into their own browser storage if they want to customize it.

### Configuration

Mount a local `panels/` directory into the container:

```yaml
services:
  ignidex:
    image: ghcr.io/zeitport/ignidex:latest
    ports:
      - "4280:80"
    volumes:
      - ./panels:/usr/share/nginx/html/panels
    restart: unless-stopped
```

### Adding Panels

Create a `panels/` directory next to your `docker-compose.yml` and add your JSON files:

```
panels/
  work.json
  personal.json
  team-links.json
```

Each JSON file should contain a valid start panel structure. You can export an existing panel from Ignidex using the export feature in settings.

### Accessing Panels

Share links to your panels using the `load` parameter:

```
http://localhost:4280/?load=http://localhost:4280/panels/work.json
```

For production with HTTPS:

```
https://ignidex.example.com/?load=https://ignidex.example.com/panels/team-links.json
```

The URL passed to `load` must be URL-encoded if it contains special characters.
