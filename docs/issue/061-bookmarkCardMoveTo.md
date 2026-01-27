# Feature: "Move to" action for bookmark cards

## Story

As a user, I want to move a bookmark card from one group to another so that I can organize my bookmarks more efficiently.
The group can also be from another section.

User interaction:
- Bookmark card context menu
- Click "Move to..."
  - Shows the "select section" overlay
- User selects a section
  - Shows the "select group" overlay
- User selects a group
  - Insert bookmark at the end of this group
  - Bookmark is removed from old group

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Create new action "MoveBookmarkToGroup"
- It follows the same workflow as pasting a URL (select section, select group)
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- Movement is within the same panel only (different sections/groups within that panel)
- Card can be moved to any group, including its current group (moves to end)
- For highlight sections (single implicit group), the move happens directly without group selection
- For sections with multiple groups, the user selects which group to move to

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `cardToMove` observable state property in `src/app/state.ts`
- Created `MoveBookmarkToGroupAction` in `src/actions/moveBookmarkToGroupAction.ts`
- Updated `SelectSectionOverlay` to show card name when moving and handle highlight section moves
- Updated `SelectGroupOverlay` to perform the actual move operation when `cardToMove` is set
- Added "Move to..." menu item with `mdiSwapHorizontal` icon to `bookmarkContextMenuItems.ts`
