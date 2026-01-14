# Issue: Switch Panel List Context Menu

## Use case

As a user, I want to move a panel up or down in the list by right-clicking on it.

## Plan

- Create new switchPanelContextMenu.ts in ./src/elements/contextMenu
- Show context menu on right-click on "switch panel list" (overlay)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

## Comments

Implementation completed with the following changes:

**New files created:**
- `src/elements/contextMenu/switchPanelContextMenuItems.ts` - Move Up/Move Down menu items
- `src/actions/movePanelAction.ts` - Action to reorder panels

**Refactored context menu system:**
- Added `activeContextMenu` observable to `state.ts` for centralized context menu management
- Added `selectedPanelEntry` observable for tracking right-clicked panel
- Added `order` field to `StartPanelEntry` for panel ordering
- Refactored `startPanelElement.ts` to watch `activeContextMenu` observable
- Refactored `groupSectionElement.ts`, `highlightSectionElement.ts`, `startPanelHeaderElement.ts` to set observable instead of dispatching events
- Updated `switchPanelOverlay.ts` to render list items inline with contextmenu handlers

**Panel ordering implementation:**
- Changed `order` field to `number | null` to handle existing data without order
- Updated IDB version with migration that sets order for existing panels
- Added `getNextOrder()` helper to `StartPanelsStore`
- `StartPanelsStore.getAll()` now returns panels sorted by order (centralized sorting)
- Updated `editPanelOverlay.ts`, `createLocalPanelAction.ts`, `importFromJsonAction.ts` to set order on new panels
- `MovePanelAction` uses fractional delta (±1.5) then recalculates all orders to 0, 1, 2, 3... to fix inconsistencies

**Overlay refresh after move:**
- Added `panelOrderVersion` observable to `state.ts` - incremented when panel order changes
- `SwitchPanelOverlay` subscribes to `panelOrderVersion` and re-fetches panels when it changes

**Navigation actions updated:**
- `SwitchPanelNextAction` and `SwitchPanelBackAction` now navigate panels in order (via sorted `getAll()`)
