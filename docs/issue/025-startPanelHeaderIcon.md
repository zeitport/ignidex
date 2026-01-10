# Issue: Start Panel Header Icon + Description

## Use case

As a user, I want to customize my start panel with a header icon and description.

## Plan

- Add an _icon_ property to _StartPanelHeader_
- Add a _description_ property to _StartPanelHeader_
- Update the start panel component to render the icon and description
- Merge the _newPanelOverlay_ and the _editPanelOverlay_ (use same pattern as other edit overlays)
- Update the edit start panel overlay
  - Add icon preview to the edit overlay
  - Add description input to the edit overlay
  - Icon and description are optional.
- Create a new _startPanelHeader_ component (cc-start-panel-header)
- Use the _startPanelHeader_ component in the start panel
- Update the internal model and the idb and dto model
- 
## Clarification

- Icon handling: Use the existing imageAssets store (similar to card icons)
- Description rendering: Below the title in the header area
- StartPanel data model: _models/internal/startPanel_ has a _header_ property
- Overlay merge pattern: Use the _editBookmarkCardOverlay_ as a basic blueprint

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

### Quality Score

8/10

## Comments

- Export did not work, data was missing in JSON (-2)
