# Problem: Sticky Drag Item 
 
## Description

The user clicks on a bookmark item, the URL is opened in a new tab.
When the user switches back to the ignidex tab, the clicked item is in drag (move) mode.
The item sticks to the mouse cursor and an unintended drag operation occurs.

A drag&drop operation should not start when a user clicked a bookmark, or switched tab or closed the window.

## Hypothesis

My intuition is that the drag delay timer is not properly reset for some scenarios.

## Plan

- Validate my hypothesis or analyze the problem
- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

