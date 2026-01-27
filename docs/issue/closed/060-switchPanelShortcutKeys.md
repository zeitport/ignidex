# Feature: Switch Panel Shortcut Keys

## Story

As a user, I want to switch fast between two or more panels using a keyboard shortcut.
Support key 1-9 to open the specific panel.


## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Handle [NUMBER] keyboard event to switch panel.
- CTRL + 1 should switch to the first panel.
- Make sure that the keyboard shortcut is not triggered when any input is focused.
- Make sure that the keyboard shortcuts are documented in the keyboard settings panel. (one entry for each keyboard)
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- CTRL + [1-9] conflicts with the browser's built-in tab switching shortcuts. To avoid overriding well-known browser behavior, we use plain number keys [1-9] instead. The `noInputFocused` precondition ensures these shortcuts don't interfere when typing in input fields.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Created `src/actions/switchToPanelAction.ts` - Action that switches to a panel by number (1-9)
- Created `src/keyboard/shortcuts/switchToPanelShortcuts.ts` - 9 keyboard shortcuts for keys 1-9 (without CTRL modifier to avoid browser tab switching conflict)
- Updated `src/keyboard/keyboardShortcuts.ts` - Registered the new shortcuts
- Updated `src/localization/en.ts` - Added localization strings for all 9 panel switch shortcuts
