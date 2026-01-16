# Feature: Configureable Corner Actions (Icons)

## Use case

As a developer, I want to show different corner icons for: settings, gitHub app homepage, switch panel and export

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Refactor the cc-settings-icon to a generic cc-corner-action element
  - Remove the rotation hover effect.
  - The element supports two icon properties, 
    - an iconPath (so that mdi icons can be used) 
    - and an iconAssetId (lookup in the image asset index db)
- Change Settings → UI → Settings Icon to "Corner Icons" section
  - Show 4 slots (top left, top right, bottom left, bottom right)
  - Each slot previews the icon
  - When clicking on a slot show a "Select Corner Icon" overlay.
- "Select corner icon" overlay
  - Use the cc-list element.
  - Show list entries of the 4 build in corner icons (More may come in the future) and an empty entry for "no corner icon"
    - Off (no icon) - no action
    - Switch Panel
    - Home (github page)
    - Settings
    - Export (export as JSON)
- Each corner icon shall "run" an action.
- Create an action for Show Settings Panel
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

**Q: What are the default corner assignments?**
A: Top-Left: Switch Panel, Top-Right: Home, Bottom-Left: Settings, Bottom-Right: Export

**Q: Should corner icons have individual or shared size options?**
A: All corner icons share a single size setting (off/small/large).

**Q: What should the Home icon link to and how should it open?**
A: Fixed URL to the Ignidex GitHub repo, opens in the same tab.

**Q: What should the Export icon do?**
A: Use the existing Export Action from the panel context menu.

**Q: Should corner icon configuration be global or per-panel?**
A: Global, stored in UserState.

**Q: What is the iconAssetId property for?**
A: Future use - users will be able to assign a bookmark to a corner.

**Q: Can users assign the same icon to multiple corners?**
A: Yes, no restrictions on duplicate assignments.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Created `cornerPosition.ts` with CornerPosition enum (topLeft, topRight, bottomLeft, bottomRight)
- Created `cornerIconType.ts` with CornerIconType enum (off, switchPanel, home, settings, export)
- Created `cornerIconsConfig.ts` with CornerIconsConfig interface and helper functions
- Updated `userStateEntry.ts` to include cornerIcons configuration with validation
- Updated `state.ts` to add cornerIconsConfig and selectedCornerPosition observables
- Created `openHomeAction.ts` to navigate to Ignidex GitHub repo
- Added selectCornerIcon to `overlayType.ts`
- Created `cornerIconElement.ts` - generic corner icon component with position-based styling
- Created `selectCornerIconOverlay.ts` - overlay for selecting corner icon type
- Updated `uiSettingsPanel.ts` - replaced "Settings Icon" section with "Corner Icons" section showing 4 slots with size selector
- Updated `startPanelElement.ts` - replaced cc-settings-icon with 4 cc-corner-action elements
- Updated `elements/index.ts` to export new components
- Added new localization tokens for openHome and exportPanel hints
