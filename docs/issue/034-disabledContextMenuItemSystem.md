# Issue: System for disabled context menu item

## Use case

As a developer, I want to have a system in place that allows me to disable context menu items based on certain conditions, 
so that I can provide a more tailored user experience.

## Plan

- Add optional `isDisabled()` method to `ActionInterface`
- When `isDisabled()` is not defined by an action implementation, then fallback to `false` (enabled)
- Render disabled context menu items with a muted color.
- `isDisabled()` is called when rendering a context menu item with an action.
- Do not implement a responsive (or observable) property state.

## Clarifications

- `isDisabled()` returns `boolean | Promise<boolean>` (supports both sync and async)
- When an action has `isDisabled()`, it takes priority over the `ContextMenuItem.disabled` property
- Test case: `SwitchPanelAction` should be disabled when only one panel exists

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

### Files modified

- `src/actions/actionInterface.ts` - Added optional `isDisabled?(): boolean | Promise<boolean>` method
- `src/elements/contextMenuElement.ts` - Added async disabled state computation on items change
- `src/elements/contextMenuElementStyle.ts` - Disabled hover effect on disabled items
- `src/actions/switchPanelAction.ts` - Added `isDisabled()` implementation (returns true when only one panel)

### Implementation notes

- `ContextMenuElement` computes disabled states asynchronously when `items` property changes
- Disabled states are cached in a `Map<ContextMenuItem, boolean>` and used during render
- When `action.isDisabled()` is defined, it takes priority over `ContextMenuItem.disabled`
- Disabled items have `opacity: 0.5`, mdiCancel icon cursor (with `not-allowed` fallback), and no hover effect
