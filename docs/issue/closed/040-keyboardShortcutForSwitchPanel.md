# Feature: Keyboard Shortcut for Switching Panels 

## Use case

As a user, I want to use a keyboard shortcut to _open_ the _switch panel_ overlay.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Double press of SHIFT + SHIFT key should open the switch panel overlay.
- The double press needs to be within a certain time frame to be considered a double press. (300ms)
- Ignore SHIFT key when inside input fields
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

- The shortcut should NOT trigger when another overlay is already open (consistent with existing keyboard shortcuts)
- Either SHIFT key (left or right) should work for the double-tap
- The shortcut should respect the `isDisabled` check - don't open if only 1 panel exists

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Modified `src/main.ts` to add double SHIFT detection. Added a `lastShiftPressTime` variable to track the timestamp of the previous SHIFT keydown. When a SHIFT key is pressed within 300ms of the previous press, and no overlay is open, input is not focused, and more than one panel exists, the `SwitchPanelAction` is triggered to open the switch panel overlay. The timestamp resets after triggering to prevent repeated activations.
