# Move Group to another Section

## Description

As a user, I want to move a group and all its bookmarks to another section.

The context menu action "Move to…" opens a section selection dialog. 
The dialog should display only group sections (no highlight section), including the current section.
The user can select a new section to move the group to. 
If the user cancels the dialog, the group remains in its current section.0

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications
- Add new "Move to…" context menu item to the "group" context menu item
- Implement new "MoveGroupToSectionAction" 
- Add a filter property to the "Select section" overlay element to show only "group sections"
- Reuse the "select section" overlay element for the group "Move to…" section action

## Clarifications

- The "Move to…" menu item uses an up arrow icon (`mdiArrowUpThin`) to indicate moving to a different section
- When the dialog opens, it filters out:
  - Highlight sections (only group sections are shown)
  - The current section the group belongs to
- When a target section is selected, the group (with all its bookmarks) is moved to the end of that section's groups list

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

