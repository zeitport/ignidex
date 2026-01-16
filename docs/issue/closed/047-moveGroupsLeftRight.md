# Feature: Move Card Groups left, right 

## Use case

As a user, I want to be able to easily rearrange card groups via the context menu.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Add "Move left" and "Move right" options to the group context menu
- Use icons mdiArrowLeftThin and mdiArrowRightThin
- Implement actions
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Created `src/actions/moveGroupAction.ts` with `MoveGroupAction` class supporting `left` and `right` directions
- Added "Move Left" and "Move Right" menu items to `src/app/contextMenus/groupContextMenuItems.ts` with `mdiArrowLeftThin` and `mdiArrowRightThin` icons
- Added i18n tokens `moveGroupLeft` and `moveGroupRight` to `src/localization/en.ts`
