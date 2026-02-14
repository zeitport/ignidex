# Problem: Can not create new group section 

## Description

GIVEN a panel with multiple sections (highlight + group)
WHEN a user creates a new group section and enters a name for the new section
THEN the existing section is renamed (not okay) 
AND no new section was created (not okay)

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications

## Clarifications

**Root cause:** `AddSectionAction.run()` opens the new section overlay without clearing `selectedSection`. If a section was previously selected (e.g. via context menu), the edit overlay sees that non-null value and enters its "edit existing section" branch instead of the "create new section" branch.

**Fix:** Clear `selectedSection.value = null` in `AddSectionAction.run()` before opening the overlay.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

