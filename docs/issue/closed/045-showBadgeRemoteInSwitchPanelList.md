# Feature: Show the "remote" badge in a switch panel list 

## Use case

As a user, I want to see a badge indicating if a panel is remote in the switch panel list.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Extend the cc-list component to display a generic badge
- Extend the list item with an optional badgeText property.
- Update the switch panel list to use the new badgeText property
- Use the same badge style as the panel header badge in the application
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Extended the `ListItem` interface in `listElement.ts` with an optional `badgeText` property. Updated the `cc-list` component to render the badge when `badgeText` is present. Added `.item-badge` styling to `listElementStyle.ts` using the same CSS variables as the panel header badge (`--remote-badge-bg`, `--remote-badge-color`, `--text-transform`). Updated `switchPanelOverlay.ts` to set `badgeText` to the localized "Remote" text (`i18n.token.remotePanel.badge`) when a panel has a `remoteUrl`.
