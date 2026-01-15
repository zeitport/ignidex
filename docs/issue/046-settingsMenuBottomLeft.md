# Feature: Show a Settings Icon in the Bottom Left Corner 

## Use case

As a user, I want to discover the settings menu in the bottom left corner of the application to easily access preferences and customization options.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Show a muted settings icon in the bottom left corner of the application.
- The position is fixed at the bottom left corner to ensure easy accessibility.
- On click open the settings overlay.
- Add a hover hint with a tooltip explaining the purpose of the settings icon.
- Add a setting in Settings → UI to enable/disable the settings icon.
- Store it as `settingsIconStyle` (off, small, large) large = default. 
- small = 1.25rem, large = 2rem
- The settings ui panel shall use the cc-radio-button element for the options.
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Added a fixed-position settings icon in the bottom left corner that opens the settings overlay on click. Created `settingsIconStyle.ts` type definition with options (off, small, large). Added `settingsIconStyle` property to `UserStateEntry` with validation and default value of 'large'. Created `cc-settings-icon` component using `mdiCog` icon with hover hint, opacity transition, and rotation effect on hover. Added settings icon to `cc-start-panel` render output. Added UI settings section with `cc-radio-button` for controlling the settings icon style (Off/Small/Large). Added i18n token for the tooltip. Updated `main.ts` to initialize settingsIconStyle from stored user state on app startup.
