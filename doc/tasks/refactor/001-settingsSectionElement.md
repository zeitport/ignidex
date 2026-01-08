# Refactor: Settings Section Element (cc-settings-section)

## Use case

As a code maintainer I want to use the settings section element to display a single setting to
- improve code readability
- reduce code duplication

## Implementation

- [x] Create new cc-settings-section element 
- [x] with a slot for the setting content (e.g.: input element, color selector, ...)
- [x] a label slot
- [x] a description slot
- [x] a validation error slot
- [x] refactor existing settings panels to use the new element

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result: 90%
- Some UI improvements needed
