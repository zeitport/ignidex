# Issue: Refactor: i18n for context menu tooltips

## Use case

As a developer, I want to use i18n for context menu tooltips to ensure that the tooltips are
stored in one place.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Move all `tooltips` from `./src/app/contextMenus/*` to `en.ts`
- Document a short summary list in [AI Code Changes] (no sub headlines, no file path details)

## Clarifications

- Tooltips will be added to the existing `hints` section in `en.ts`, following the current pattern

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Added 14 tooltip keys to `hints` section in `src/localization/en.ts`.
Updated 5 context menu files to use i18n references: `panelContextMenuItems.ts`, `documentContextMenuItems.ts`, `groupContextMenuItems.ts`, `bookmarkSectionContextMenuItems.ts`, and `highlightSectionContextMenuItems.ts`.
Added `import {i18n} from '#i18n'` to files that didn't have it.
