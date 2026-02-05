# Copy bookmarks

## Description

As a user, I want to copy a bookmark from the existing panel to another panel.

### Scenario A: Paste on group

**WHEN**
- Open bookmark context menu
- Select "Copy"
- Switch to another panel
- Open **group context menu**
- Select "Paste"

**THEN**
- Add bookmark to target panel → section → selected group
- Clear copy state

### Scenario B: Paste on section

**WHEN**
- Open bookmark context menu
- Select "Copy"
- Switch to another panel
- Open **section context menu**
- Select "Paste"

**THEN**
- Add bookmark to target panel → section → first group
- Clear copy state

### Restrictions
- User shall not be able to paste a card multiple times
- Do not remove the copied card

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications
- New state **cardCopy**
- The feature shall work for the bookmark card and future other card types.
- Enable **Paste** only when **cardCopy** state is not null
- Create new action **CopyCard**
- Create new action **PasteCardToSectionAction**
- Create new action **PasteCardToGroupAction**
- Clone the card before pasting
- Use a new id for the card when pasting
- Use icon **mdiContentCopy** for the copy context menu item
- Use icon **mdiContentPaste** for the paste context menu item

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

