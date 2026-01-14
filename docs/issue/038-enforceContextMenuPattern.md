# Issue: Refactor: Enforce Context Menu Pattern

## Use case

As a developer, I want to ensure consistent and predictable behavior for context menus across the application.
Every context menu must be defined in "/src/app/contextMenus" and export an Array of MenuItem objects.
Every menuItem shall have a tooltip stored in "en.ts".

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Extract the context menus from icon preview
- Create an iconPreviewContextMenu
- Refactor actions to use the proper isDisabled property
- Do not dynamically generate context menus
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

- **Action Pattern**: Icon preview actions now use observable state (`activeIconPreview`) instead of callbacks. The component registers its state when active, allowing actions to read/write without direct coupling.
- **Disabled Items**: All menu items are always shown; Copy and Delete use `isDisabled()` to disable themselves when no icon is present, displaying the `iconPreviewNoIcon` hint.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Added `IconPreviewState` interface (dataUri, source) and `activeIconPreview` observable to `src/app/state.ts`. Created `src/app/contextMenus/iconPreviewContextMenuItems.ts` with static Paste, Copy Data URL, and Delete menu items. Refactored `PasteIconAction`, `CopyIconDataUrlAction`, and `DeleteIconAction` to read/write observable state directly; added `isDisabled()` and `disabledHint` to Copy and Delete actions. Updated `iconPreviewElement.ts` to watch the observable and emit `icon-change` events when external changes are detected. Added localization tokens `iconPreviewPaste`, `iconPreviewCopy`, `iconPreviewDelete`, and `iconPreviewNoIcon` to `en.ts`. Added guideline to `CLAUDE.md` that observable state objects must not contain callbacks.
