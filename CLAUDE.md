# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ignidex is a local-first personal start page for links and bookmarks. Built with Lit web components and TypeScript, it stores data in IndexedDB with JSON import/export.

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # TypeScript check + lint + Vite build
npm run lint     # Run oxlint
npm run lint:fix # Run oxlint with auto-fix
npm run tsc      # TypeScript type-check only
```

Dev server loads: `http://localhost:3000/?load=http://localhost:3000/store/test.json`

## Architecture

### Import Aliases

Use the package.json import aliases:
- `#elements` - Web component exports
- `#utils/*` - Utility functions
- `#inject` - Dependency injection
- `#models/*` - Data models
- `#core/*` - Core business logic

### Directory Structure

- `src/app/` - Global styles (`index.css`) and observable state (`state.ts`)
- `src/core/` - Persistence layer (IndexedDB), stores, dependency injection
- `src/models/` - Three model layers:
  - `internal/` - Runtime classes with constructors
  - `dto/` - Plain data transfer objects for serialization
  - `idb/` - IndexedDB entry wrappers
- `src/elements/` - Lit web components
- `src/actions/` - User interaction commands implementing `ActionInterface`
- `src/utils/` - Observable property system, ID generation

### Key Patterns

**Dependency Injection:** Use `inject(ClassName)` from `#inject` to get singleton instances of stores and services.

**Observable State:** Global reactive state in `src/app/state.ts`. Components call `.watch(this)` to auto-rerender on changes:
- `activeStartPanel` - Current panel being displayed
- `activeOverlay` - Modal dialog state
- `selectedCard/selectedSection/selectedGroup` - Context menu targets
- `activeAction` - Currently executing action

**Action Pattern:** User interactions are encapsulated in action classes implementing `ActionInterface`:
```typescript
interface ActionInterface {
    run(): void | Promise<void>;
    confirmation?: ActionConfirmation;
    confirm?(): void | Promise<void>;
    cancel?(): void | Promise<void>;
}
```

**IndexedDB Layer:** `DatabaseConnector` provides promise-based access to stores: `iconAssets`, `startPanels`, `userState`.

### Data Model Hierarchy

```
StartPanel
└── CardSection[] (type: 'highlight' | 'groups')
    └── CardGroup[]
        └── Card[] (type: 'bookmark')
```

### Component Naming

Web components use `cc-` prefix (e.g., `<cc-start-page>`, `<cc-card-icon>`).

## Linting

Oxlint enforces:
- No default exports (use named exports)
- Strict TypeScript rules
- Import/export conventions