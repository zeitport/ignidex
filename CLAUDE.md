# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ignidex is a local-first personal start page for links and bookmarks. Built with Lit web components and TypeScript, it stores data in IndexedDB with JSON import/export.

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # TypeScript check + lint + Vite build
npm run lint     # Run eslint
npm run lint:fix # Run eslint with auto-fix
npm run tsc      # TypeScript type-check only
```

Dev server loads: `http://localhost:3000`

## Architecture

### Import Aliases

Use the package.json import aliases:
- `#elements` - Web component exports
- `#utils/*` - Utility functions
- `#inject` - Dependency injection
- `#models/*` - Data models
- `#app/*` - App core logic
- `#state` - The global app state.

### Directory Structure

- `src/app/` - Global styles (`index.css`), stores, dependency injection
- `src/state/` - The global app state.
- `src/models/` - Data models (see Data Model Layers below)
- `src/elements/` - Lit web components
- `src/actions/` - User interaction commands implementing `ActionInterface`
- `src/utils/` - Observable property system, ID generation
- `test/playwright` - browser tests using playwright
- `test/units` - unit/code tests
- 
### MCP Tools

The local `ignidex-mcp` server provides project-specific tools:
- `createId` - Use this tool to generate unique IDs (nanoid) when creating new entities

### Key Patterns

**Dependency Injection:** Use `inject(ClassName)` from `#inject` to get singleton instances of stores and services.

**Observable State:** Global reactive state in `src/app/state.ts`. Components call `.watch(this)` to auto-rerender on changes:
- `activeStartPanel` - Current panel being displayed
- `activeOverlay` - Modal dialog state
- `selectedCard/selectedSection/selectedGroup` - Context menu targets
- `activeAction` - Currently executing action

Observable state objects must not contain callbacks. Actions should update state directly, and components should watch for changes and react accordingly.

**Action Pattern:** User interactions are encapsulated in action classes implementing `ActionInterface`:
```typescript
interface ActionInterface {
    run(): void | Promise<void>;
    confirmation?: ActionConfirmation;
    confirm?(): void | Promise<void>;
    cancel?(): void | Promise<void>;
}
```

**IndexedDB Layer:** `DatabaseConnector` provides promise-based access to stores: `imageAssets`, `startPanels`, `userState`.

### Data Model Layers

The `src/models/` directory contains three distinct model layers:

**internal/** - In-memory runtime models
- Classes with constructors that auto-generate IDs via `createId()`
- Support partial initialization with sensible defaults
- Automatically instantiate nested child objects
- Used throughout the app at runtime
- Example: `new Card({name: 'GitHub'})` creates a full Card with generated ID

**idb/** - IndexedDB entry wrappers
- Classes that wrap internal models for database storage
- Add indexing fields required by IndexedDB (e.g., primary key `id`)
- `StartPanelEntry` wraps a `StartPanel` with anchor for URL fragment matching
- `ImageAssetEntry` stores images separately with `dataUri` for binary data
- `UserStateEntry` stores user preferences (accent color, font size, etc.)

**dto/** - Data Transfer Objects for JSON export/import
- Plain interfaces (not classes) for serialization
- Self-contained: `StartPanelDto` includes `images[]` and `meta` for portable export
- May differ from internal models
- Used when importing/exporting data to JSON files

### Data Model Hierarchy

```
StartPanel
└── CardSection[] (type: 'highlight' | 'groups')
    └── CardGroup[]
        └── Card[] (type: 'bookmark')
```

### Component Naming

Web components use `cc-` prefix (e.g., `<cc-start-panel>`, `<cc-card-icon>`).

## Linting

ESLint enforces:
- No default exports (use named exports)
- Strict TypeScript rules
- Import/export conventions

## Tests

All tests are written in TypeScript using vitest. File structure:

