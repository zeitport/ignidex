# Fix: Context Menu in Background

## Problem

Given an overlay is active and the underlaying UI is blurred,
When a user opens a context menu in the background (e.g.: section context menu)
Then the context menu is displayed

Expected: the overlay backdrop catches all mouse events and prevents them from reaching the underlaying UI.

## Plan

- Investigate the code responsible for handling X
- Identify any potential issues or missing functionality that could be causing the problem.
- If the problem is easy to fix, consider implementing a solution, otherwise ask for help.
- Update this task item (with solution and cost)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Solution

**Root Cause:** The context menu handlers in `startPageElement.ts` did not check if an overlay was active before opening context menus. When a user right-clicked on background elements (sections, groups, cards, etc.) while an overlay was open, the contextmenu events would still bubble up and trigger context menus.

**Fix:** Added an early return check `if (this.activeOverlay.value) return;` to all context menu handlers in `src/elements/startPageElement.ts`:

- `handleCardContextMenu` (line 165)
- `handleSectionContextMenu` (line 180)
- `handleGroupContextMenu` (line 198)
- `handlePanelContextMenu` (line 212) - `preventDefault()` moved before the check
- `handleDocumentContextMenu` (line 221) - `preventDefault()` moved before the check

For handlers receiving native `MouseEvent` (`handlePanelContextMenu`, `handleDocumentContextMenu`), `event.preventDefault()` is called before the overlay check to also block the browser's default context menu.

## AI Code Generation

### Quality Score
9/10

### Estimated Cost
~0.05 EUR

## Comments

- Simple fix with minimal code changes
- Consistent with existing patterns in the codebase

