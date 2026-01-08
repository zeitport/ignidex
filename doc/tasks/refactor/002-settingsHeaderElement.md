# Refactor: Settings Header Element (cc-settings-header)

## Use case

As a code maintainer I want to use the settings header element for each settings panel to
- improve code readability
- reduce code duplication
- consistent UI styling

## Implementation

- [x] Create new cc-settings-header element 
- [x] with a slot for the header text
- [x] refactor existing settings panels to use the new element

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (100%)
The `cc-settings-header` element was created and implemented in both `StorageSettingsPanel` and `UISettingsPanel`. This improves code maintainability and ensures consistent styling for settings headers across the application.
- `src/elements/settings/settingsHeader.ts` (new)
- `src/elements/settings/storageSettingsPanel.ts` (updated)
- `src/elements/settings/uiSettingsPanel.ts` (updated)
