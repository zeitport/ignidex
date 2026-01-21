# Feature: Click on Bookmark Navigation Settings

## Use case

As a user, I want to open all of my bookmarks in a new tab when I click on the bookmark.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Add a new setting "bookmarkOnClickAction" and add it to the user state to persist user preferences
- Add a new "Navigation" settings panel
- Add a new section "Bookmark on Click"
- Show option "Open" and "Open in new tab"
- Use existing UI components
- Use the "mdiCompassOutline" icon for the "Navigation" settings panel
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

1. **Default value**: "Open" (current tab) - maintains existing behavior
2. **Scope**: Global setting only (no per-bookmark overrides)
3. **Middle-click**: Not handled by this feature (separate feature)
4. **Panel position**: Navigation panel appears after "UI" in settings list
5. **Future settings**: Panel will accommodate additional settings (e.g., Start/Home panel)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Created `src/models/idb/bookmarkOnClickAction.ts` with `BookmarkOnClickAction` constant object (`Open`, `OpenInNewTab`)
- Added `bookmarkOnClickAction` property to `UserStateEntry` with default value `Open`
- Added `bookmarkOnClickAction` observable to `src/app/state.ts`
- Created `src/elements/settings/navigationSettingsPanel.ts` with "Bookmark on Click" section and radio button options
- Registered Navigation panel in `settingsOverlay.ts` after UI panel with `mdiCompassOutline` icon
- Exported `NavigationSettingsPanel` from `src/elements/index.ts`
- Updated `highlightSectionElement.ts` and `groupSectionElement.ts` to use the setting when handling bookmark clicks
- Added initialization of `bookmarkOnClickAction` state in `main.ts`
