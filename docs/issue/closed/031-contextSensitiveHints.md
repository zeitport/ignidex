# Issue: Context-sensitive hover hints (bottom status toast) 

## Use case

Add a subtle, muted status toast at the bottom center of the screen that appears when hovering 
over Ignidex UI elements (panel, group header, bookmark, empty space).

The toast should display context-specific interaction hints 
(e.g. available mouse buttons, modifier keys, or actions) and disappear immediately when the 
hover target changes or the pointer leaves the element.

## Plan

- Shown only on hover (no persistent UI)
- Context-aware (different text per element type)
- Visually muted and unobtrusive
- No animations or attention-grabbing behavior
- Add a new activeHoverHint state
- As a first step only implement a bookmark hover.
- On hover (delay 150ms) - the bookmark element sets the activeHoverHint state

## Requirements

### Hint Content
- Display action hints for available interactions
- Bookmark hint: "Click to open · Right-click for menu · Drag to move"

### Styling
- Follow the current accent color/theme settings
- Semi-transparent background that matches the theme
- Small, readable text size

### Positioning
- Fixed position at bottom center of viewport
- Distance from bottom: ~24px
- Centered horizontally

### Settings
- No user toggle for now (will be implemented later)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

## Comments
