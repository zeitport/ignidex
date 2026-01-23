# Issue: Fix Right Mouse Button (RMB) Click on Bookmark 

## Story

The right mouse button click on a bookmark shall only open the context menu.
A right mouse button click shall not open the link.


## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Fix RMB click handling
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- The `auxclick` event fires for any non-primary mouse button (including right-click with button === 2)
- Right-click was triggering both the context menu (via `contextmenu` event) and `handleCardClick` (via `auxclick` event)
- Fix: Add early return when `event.button === 2` to ignore right-clicks in the click handler

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `if (event.button === 2) return;` check in `handleCardClick` method in `src/elements/sections/highlightSectionElement.ts:86`
- Added `if (event.button === 2) return;` check in `handleCardClick` method in `src/elements/sections/groupSectionElement.ts:65`
