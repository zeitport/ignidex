# Feature: Add icons to the "switch panel list"

## Use case

As a user, I want to have icons displayed next to each switch panel item in the list
to enhance visual distinction and improve user experience.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- The list element should support icons for better visual distinction.
- Show icons in the switch panel list (switch panel overlay)
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `resolveById(iconId: string | null)` method to `IconResolver` to resolve icons by ID directly
- Refactored `IconResolver.resolve()` to use the new `resolveById` method
- Extended `ListItem` interface with optional `iconDataUri` property for data URI icons
- Added `renderIcon()` method to `ListElement` supporting both SVG path and data URI icons
- Added `item-contextmenu` event to `ListElement` for right-click context menu support
- Added `.item-icon-mask` CSS styling for mask-based icon rendering in `ListElement`
- Refactored `SwitchPanelOverlay` to use `cc-list` component instead of custom panel list
- Removed unused panel-specific styles from `switchPanelOverlayStyle.ts`
