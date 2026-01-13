# Issue: Hover Hint Text Template Rendering

## Use case

As a user, I want to see a visual representation of keyboard and mouse buttons in the hover hint text template.

The hover hint text should be transformed to a html with a visual representation of keyboard keys and mouse buttons.

For example: 
- `[LMB]` should be replace with a "mdiMouseLeftClickOutline" icon (white color)
- `[RMB]` should be replace with a "mdiMouseRightClickOutline" icon (white color)
- Any text inside `[...]`, like `[CTRL]`, `[ALT]` should be written inside a `<span>` tag with a 1px border.
- A "+" should be rendered inside a `<strong>` tag.
## Plan

- Update render method in HoverHintElement

## Clarifications

- **Mouse buttons**: Handle `[LMB]`, `[RMB]`, and `[MMB]` with corresponding MDI icons (mdiMouseLeftClickOutline, mdiMouseRightClickOutline, mdiMouseScrollWheel)
- **Icon color**: White
- **Icon size**: Match line height (1em)
- **Keyboard key border**: Gray (muted) color
- **Keyboard key styling**: Border + padding + subtle background color

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

## Comments
