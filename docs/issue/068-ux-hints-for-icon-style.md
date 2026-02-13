# UX: Hints for icon styles. 

## Description

As a user, I do not understand the icons below the icon preview and I would expect a hint to explain what each icon means.

Add hints for all three icon style radio buttons on the "Edit bookmark" page.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications

## Clarifications

- Reused the existing `hoverHint` directive that powers all other hover hints in the app.
- Added an optional `hint` property to `RadioOption` so any radio button group can show hints.
- Hint texts: "Original icon colors" (none), "Monochrome icon" (mask), "Accent colored icon" (maskAccent).

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

