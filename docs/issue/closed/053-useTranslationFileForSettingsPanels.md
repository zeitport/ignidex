# Feature: Use Translation File for Settings Panels 

## Use case

As a developer, I want to use a translation file for settings panels to localization.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Search for hard coded UI labels and text in all setting panels.
- Replace hard coded labels with translation keys in settings panels.
- Add translation keys for settings panel sections and labels.
- Use a logic structure.
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- **Key naming**: Use flat naming with dots (e.g., `settingsPanel.ui.fontSizeLabel`, `settingsPanel.ui.fontSizeDescription`)
- **Options**: Translate all radio button option labels like 'Off', 'Small', 'Large', 'Open', etc.
- **Dynamic text**: Use template with placeholder functions (e.g., `iconCount: (count: number) => \`${count} icons stored locally\``)
- **About content**: Only translate labels ('Version', 'Author', etc.), keep personalized author description hardcoded
- **Sidebar labels**: Translate sidebar navigation labels ('UI', 'Navigation', 'Keyboard', etc.)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added 50+ translation keys to `src/localization/en.ts` for all settings panels (sidebar labels, headers, section labels, descriptions, option labels)
- Updated `settingsOverlay.ts` to use translated sidebar navigation labels
- Updated `uiSettingsPanel.ts` to use translation keys for all 6 sections and option labels
- Updated `navigationSettingsPanel.ts` to use translation keys for header, labels, descriptions, and options
- Updated `keyboardShortcutsSettingsPanel.ts` to use translation keys
- Updated `imageGallerySettingsPanel.ts` to use translation keys
- Updated `storageSettingsPanel.ts` to use translation keys including dynamic text with template function
- Updated `coffeeSettingsPanel.ts` to use translation keys
- Updated `aboutSettingsPanel.ts` to use translation keys for labels (kept author description hardcoded as agreed)

