# Feature: Open Bookmark in new Tab with Middle Mouse Button (MMB) Click

## Story

As a user, I want to open a bookmark in a new tab by clicking the middle mouse button (MMB) on its title.

Middle Mouse Button (MMB) is a well-known feature in many applications for opening links in new tabs without having to use the right-click menu.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement MMB handling of bookmark cards
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- MMB click always opens in a new tab (regardless of the `bookmarkOnClickAction` setting)
- Uses `auxclick` event which is the standard event for non-primary mouse button clicks
- Only triggers for middle mouse button (`event.button === 1`), ignoring other auxiliary buttons

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `@auxclick` event listener to bookmark elements in `highlightSectionElement.ts` and `groupSectionElement.ts`
- Added `handleAuxClick` method to both components that opens the bookmark URL in a new tab when MMB is clicked
