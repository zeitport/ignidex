# Feature: Move Bookmark Card via Drag and Drop

## Story

As a user, I want to move a bookmark card via drag and drop.
As a user, I do not want to accidentally delete a bookmark card while moving it.
As a user, I do not want to accidentally move a bookmark card when I click and move the cursor accidentally.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Add a new "bookmarkDragDropState" property (when null: drag and drop is not active)
- Enter drag mode when the left mouse button is down for 1s and the cursor is over a bookmark card
- Show visual indication when dragging a bookmark card over another bookmark card
- Only other bookmark cards are valid drop targets
- When dropped outside of a bookmark card, cancel drag and drop
- When dropped on a bookmark card, move the bookmark card to the new position (before the target bookmark card)
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

1. **2s delay is intentional** - The UI should resist easy/accidental editing
2. **Cross-group moves** - Cards can be moved between different CardGroups
3. **Cross-section moves** - Cards can be moved between different CardSections (only by dropping on top of another card)
4. **Drop to last position** - Out of scope for now; will be implemented later
5. **Drag source visual** - Dimmed/reduced opacity at original position while dragging
6. **Drop target visual** - Border highlight using accent color
7. **Drop on self/no change** - Nothing happens (no-op)
8. **Auto-scroll** - No special implementation for now
9. **Touch devices** - No special handling; touch-and-hold opens context menu (takes priority over drag-and-drop)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

