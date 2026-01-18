# Feature: Coffee Settings Panel 

## Use case

As a developer, I plan to create a special "buy me a coffee" settings panel to link to my support page.
This is only the first step towards a more comprehensive user engagement strategy.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Create am empty "Coffee" settings panel.
- Use the "Coffee" icon from lucide.dev icons (https://lucide.dev/icons/coffee)
- Use the "With ESModules" import syntax (https://lucide.dev/guide/packages/lucide#with-esmodules)
- Be mindful of performance implications when importing icons. (keep tree shaking)
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- **Icon Library**: Install Lucide as a new dependency (user preference over staying with @mdi/js)
- **Panel Content**: Title "Coffee" with placeholder description "Support the developer"
- **Icon Integration**: Lucide uses multi-path stroke icons vs MDI's single filled path. Will use `iconDataUri` field with SVG data URI to render Lucide icon properly

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Installed `lucide` package as new dependency for Coffee icon
- Created `src/utils/lucideIconToDataUri.ts` - utility to convert Lucide icons to SVG data URIs for use with `ListItem.iconDataUri`
- Created `src/elements/settings/coffeeSettingsPanel.ts` - empty Coffee settings panel with title "Coffee" and placeholder "Support the developer"
- Updated `src/elements/overlays/settingsOverlay.ts` - added Coffee panel to settings sidebar with Lucide Coffee icon

