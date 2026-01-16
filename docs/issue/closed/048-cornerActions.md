# Feature: Configurable Corner Actions

## Use case

As a developer, I want to show different corner actions for: settings, gitHub app homepage, switch panel and export

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Refactor the cc-settings-icon to a generic cc-corner-action element
  - Remove the rotation hover effect.
  - The element supports two icon properties,
    - an iconPath (so that mdi icons can be used)
    - and an iconAssetId (lookup in the image asset index db)
- Change Settings → UI → Settings Icon to "Corner Actions" section
  - Show 4 slots (top left, top right, bottom left, bottom right)
  - Each slot previews the action icon
  - When clicking on a slot show a "Select Corner Action" overlay.
- "Select corner action" overlay
  - Use the cc-list element.
  - Show list entries of the 4 built-in corner actions (More may come in the future) and an empty entry for "no corner action"
    - Off (no action)
    - Switch Panel
    - Home (github page)
    - Settings
    - Export (export as JSON)
- Each corner action shall "run" an action.
- Create an action for Show Settings Panel
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

**Q: What are the default corner assignments?**
A: Top-Left: Switch Panel, Top-Right: Home, Bottom-Left: Settings, Bottom-Right: Export

**Q: Should corner actions have individual or shared size options?**
A: All corner actions share a single size setting (off/small/large).

**Q: What should the Home action link to and how should it open?**
A: Fixed URL to the Ignidex GitHub repo, opens in the same tab.

**Q: What should the Export action do?**
A: Use the existing Export Action from the panel context menu.

**Q: Should corner action configuration be global or per-panel?**
A: Global, stored in UserState.

**Q: What is the iconAssetId property for?**
A: Future use - users will be able to assign a bookmark to a corner.

**Q: Can users assign the same action to multiple corners?**
A: Yes, no restrictions on duplicate assignments.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Created `cornerPosition.ts` with CornerPosition enum (topLeft, topRight, bottomLeft, bottomRight)
- Created `cornerActionType.ts` with CornerActionType enum (off, switchPanel, home, settings, export)
- Created `cornerActionsConfig.ts` with CornerActionsConfig interface and helper functions
- Updated `userStateEntry.ts` to include cornerActions configuration with validation
- Updated `state.ts` to add cornerActionsConfig and selectedCornerPosition observables
- Created `openHomeAction.ts` to navigate to Ignidex GitHub repo
- Added selectCornerAction to `overlayType.ts`
- Created `cornerActionElement.ts` - generic corner action component with position-based styling
- Created `selectCornerActionOverlay.ts` - overlay for selecting corner action type
- Updated `uiSettingsPanel.ts` - replaced "Settings Icon" section with "Corner Actions" section showing 4 slots with size selector
- Updated `startPanelElement.ts` - replaced cc-settings-icon with 4 cc-corner-action elements
- Updated `elements/index.ts` to export new components
- Added new localization tokens for openHome and exportPanel hints
