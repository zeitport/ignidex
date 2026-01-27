# Feature: Add Coffee Corner Action 

## Story

As a developer I want to guide users to the "Coffee" settings page, to play the mini "coffee brew" game.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- The default corner action for bottom right should be "Open coffee settings panel".
- Create a generic "OpenSettingsPanel" with settingsPanelId (same as URL parameter)
- Use the same coffee settings panel icon.
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `Coffee` to `CornerActionType` enum (`src/models/idb/cornerActionType.ts`)
- Created `OpenSettingsPanelAction` with `settingsPanelId` parameter (`src/actions/openSettingsPanelAction.ts`)
- Created shared `cornerActionIcons.ts` module with icon path and data URI maps (`src/models/idb/cornerActionIcons.ts`)
- Updated `cornerActionElement.ts` to support Lucide icons via data URIs and added Coffee action handler
- Updated `cornerActionElementStyle.ts` to style img elements for data URI icons
- Changed default bottom-right corner action from Export to Coffee (`src/models/idb/createDefaultCornerActions.ts`)
- Added Coffee option to corner action selection overlay (`src/elements/overlays/selectCornerActionOverlay.ts`)
- Added `iconDataUri` support to `RadioOption` interface and `RadioButtonGroupElement`
- Updated `uiSettingsPanel.ts` to display Coffee icon in corner action settings
- Added localization hint for Coffee corner action (`src/localization/en.ts`)
