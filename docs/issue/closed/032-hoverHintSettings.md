# Issue: Hover Hint Settings

## Use case

As a user, I want to customize the hover hint settings to improve my personal app experience.

## Plan

- Add a new "Hover Hint" settings section to the "UI settings panel"
- Provide 3 options: Off, Muted, Highlighted
- Do not use a drop down box.
- Create a new cc-radio-button-group element with multiple options
- Use the cc-radio-button-group element to display the options
- Option: Off - Do not show hover hints
- Option: Muted - show hover hints with dark/black background
- Option: Highlighted - show hover hints with accent color background

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

## Comments

### Clarifications (2026-01-13)

**Style mapping:**
- Highlighted = accent color background (current behavior)
- Muted = dark/black background (new style)

**Default value:** Highlighted (preserves current behavior for new users)

**Radio button style:** Match the existing "Base Font Size" selector - horizontal row of clickable boxes with labels

**Storage:** Add `hoverHintMode` property to `UserStateEntry` as string type with values `'off' | 'muted' | 'highlighted'`
