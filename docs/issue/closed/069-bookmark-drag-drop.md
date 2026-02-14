# Feature: Drag and Drop Bookmark over empty group.

## Description

As a user, I want drag and drop bookmark over an empty group, so that I can organize my bookmarks differently.

When a user drags a bookmark over an empty group, the bookmark should be added to the group.

Implementation idea:
- Every empty group should have an invisible placeholder.
- When a bookmark is dragged over an empty group, the placeholder acts like a drop target
- The bookmark should be added to the group's list of bookmarks.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications

## Clarifications

- Placeholder only visible during an active drag.
- Applies to both group sections and highlight sections.
- Consolidate three observables (`bookmarkDragDrop`, `bookmarkDragDropTarget`, `bookmarkDragDropInsertPosition`) into one `cardDragDrop` observable with a merged `CardDragDropState`.
- `CardDragDropState` gets `cardDropTarget`, `groupDropTarget`, and `insertPosition` fields.
- Dropping onto an empty group appends the card (no insert position needed).
- New `CardMover.moveCardToGroup()` method for group drops.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

