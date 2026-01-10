# Feature: Edit SVG icon for bookmark cards

## Use case

As a user, I want to set an SVG icon for my bookmark cards so that I can visually distinguish them and make them more recognizable.

## Plan

- Add an SVG icon input field to the bookmark card overlay
- The SVG icon is optional. (A fallback icon already exists and is implemented)
- Use a two column layout for the overlay.
  - Left column 25% (icon input)
  - Right column 75% (card details, like name, URL, ...)
- Uploaded icons are stored in the iconAsset database
- The updated bookmark card is saved with the new icon reference
- SVG input methods
  - Click to open file picker for SVG icon file
  - User can paste a SVG icon URL
  - User can paste an SVG file
  - Selecting existing icons is planned later (do not implement yet)
- Preview
  - Show the SVG as 2rem size in the preview box
## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Review of AI code

- Score: 5/10
- Multiple style fixes needed.
- Added too many input fields
