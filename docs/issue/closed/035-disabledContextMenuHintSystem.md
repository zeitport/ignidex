# Issue: System to provide a hint for disabled context menu items

## Use case

As a user, I want to know why a context menu item is disabled.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Add an optional `disabledHint: string` property to `ActionInterface`
- When calling `isDisabled()` on an action and it is disabled, then set the `disabledHint` property.
- On event hover over a disabled context menu item, show the `disabledHint` as an activeHoverHint.
- Implement
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

- **Hint type**: `disabledHint` is an optional property on `ActionInterface`. It is set by the action itself when `isDisabled()` is called, because only that method knows why the action is disabled.
- **Missing hint behavior**: If a disabled action has no `disabledHint` set, no hover hint is shown.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added optional `disabledHint?: string` property to the interface.
- Updated to accept `HoverHint | null | undefined` instead of just `HoverHint`
- Added null check in `onEnter` - only shows hint when hint is truthy
- Added `until` directive, `HoverHint`, and `hoverHint` directive imports
- Removed `disabledStates` and `disabledHints` Maps (no longer needed)
- Removed `updated()` lifecycle hook and `computeDisabledStates()` method
- `renderItem()` now uses `until()` directive for async rendering
- Added `renderItemAsync()` - computes disabled state and hint asynchronously
- Added `renderMenuItem()` - shared rendering logic for menu items
- `handleAction()` now receives `isDisabled` as parameter instead of looking up from Map
- Added `disabledHint` property. Sets hint to "Only one panel exists" when disabled.
- Added `disabledHint` property. Sets hint to "Not implemented yet" when disabled.
