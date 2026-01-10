# Feature: Add bookmark to highlight section

## Use case

As a user, I want to add a bookmark to the highlight section.

## Plan

- When a URL is pasted, the select section overlay also includes "highlight sections"
- When a "highlight section" is selected than no "select group overlay" is needed.
- A "highlight section" can only contain one "group"
- After selecting a section show the "edit bookmark overlay"
- Add the "bookmark" to this group or create a default group
- Also add an "Add bookmark" to the "highlight section context menu"
- Use the mdiBookmarkOutline icon

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (100%)
