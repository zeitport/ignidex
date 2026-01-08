# Feature: Font Size Setting

## Use case

As a user I want to use a different font size to improve my personal readability.

## Implementation

- Add "Base Font Size" section to UI panel
- Above accent color
- Provide 3 square options for font size: S, M, L
- Add tooltips like small, medium (default), large
- The font sizes are small=14px; medium=16px; large=20px
- Use a base CSS variable for font size
- This font size setting shall work  with the em settings of all other styles.
- Store the font size setting as use state

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (100%)

- Used a scale hover effect
