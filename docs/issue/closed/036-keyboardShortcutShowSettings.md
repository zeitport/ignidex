# Issue: Keyboard Shortcut "F1" – Open Settings

## Use case

As a user, I want to be able to open the settings panel using the keyboard shortcut "F1".

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- When no overlay is active
- AND user presses "F1" key
- THEN show the settings panel overlay.
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

- F1 should be disabled when an input field is focused, consistent with other keyboard shortcuts (ArrowLeft/ArrowRight)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Added F1 keyboard shortcut handler to `src/main.ts` in the `registerKeyboardNavigation()` function. The handler uses the existing `OpenSettingsAction` to open the settings overlay when F1 is pressed, provided no overlay is active and no input field is focused. Imported `OpenSettingsAction` from `./actions/openSettingsAction.ts`.
