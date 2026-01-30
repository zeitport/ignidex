# Features

## Cards

Everything is a card. A card can be:

| Type | Description |
|------|-------------|
| **Bookmark** | A link with optional icon and description |
| **Trigger** | A POST request / webhook |
| **Checkbox** | For short, ephemeral lists |

## Sections & Groups

Organize cards into sections (e.g., "Work", "Personal") and groups within sections for visual hierarchy.

## Start Panels

Your layout is stored as a portable JSON file. Import, export, and share with others.

### Remote Panels

Load any start panel via URL:

```
https://ignidex.eu/?load=https://example.com/my-panel.json
```

Remote panels open in read-only mode and can be downloaded for local editing.

**CORS Note:** If you are loading a JSON file from a different domain, ensure that the server hosting the file has Cross-Origin Resource Sharing (CORS) enabled to allow requests from your Ignidex instance.
