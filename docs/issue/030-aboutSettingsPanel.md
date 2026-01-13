# Issue: New about settings panel

## Use case

As a user, I want to have an about settings panel to display information about the application,
such as version, author, homepage (github), issues and license.

## Plan

- Add a new about settings panel
- Implement the panel component
- Add the panel to the settings menu
- Use mdi gear outline icon

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

### Changes Made

**package.json**
- Added `homepage`, `repository`, and `bugs` fields with GitHub URLs
- Updated version to `0.4.0-beta`
- Updated license to `BSD-3-Clause`

**src/elements/settings/aboutSettingsPanel.ts** (new file)
- Created About panel component displaying version, author, homepage, issues, and license
- Links open in new tabs with `target="_blank"`
- Follows existing settings panel patterns

**src/elements/overlays/settingsOverlay.ts**
- Imported `mdiInformationOutline` icon
- Imported `aboutSettingsPanel.ts` component
- Added `{id: 'about', label: 'About', icon: mdiInformationOutline}` to panels array
- Added `case 'about'` to `renderActivePanel()` switch

### Validation

- `npm run lint` - passed (0 errors)
- `npm run tsc` - passed (0 errors)

## Comments
