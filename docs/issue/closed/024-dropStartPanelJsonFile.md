# Issue: Drop Start Panel JSON File

## Use case

As a user, I want to drop my exported JSON file to create a new start panel.

## Plan

- Create a _drop file overlay_ to indicate that the app accepts file drops.
- When the user drags a file over the app, it shows the _drop file overlay_.
- Validate the dropped file format and content. (JSON → meta → app === ignidex)
- Create a new start panel from the dropped JSON file.
- Import all images from the JSON file.
- Set the source of the image to the local file path.

## Clarifications

- the entire app window should be the drop zone
- What should happen when validation fails? Display an error message overlay.
- Create a generic "message overlay" (like the confirmation overlay)
- Duplicate handling: If a start panel with the same ID already exists create a new id.
- Success feedback: Switch to the new start panel.
- Auto-switch? yes
- Multiple files? no. keep it simple, only one file supported. (show an error)
- Export structure is defined in models/dto/*

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

### Quality Score
8/10

## Comments
- Ai re-implemented an overlay style instead of using the existin cc-overlay element (-2).
