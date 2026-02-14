# Feature: Bookmark Card Icon Style

## Description

As a user, I want to use the orginal SVG icon for bookmark cards (icon style none).
As a user, I want to use the mask SVG icon for a calm UI experience. (icon style mask).
As a user, I want to highlight a bookmark with a colored icon (icon style maskAccent).

In the __Edit Bookmark__ overlay, show 3 icons for style selection.
When a style is applied, show it in the icon preview.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications
- Update idb model
- Update dto model
- Use the cc-radio-button-group with only icons
- Use icon lucide circle-slash for style none.
- Use icon lucide circle for style mask.
- Use icon lucide circle-dot for style maskAccent
- Based on the icon style, show the corresponding icon in the preview.
- Based on the icon style, show the corresponding icon in the bookmark card.
- Store, export and import the icon style.

## References
- src/models/internal/card.ts
- src/models/internal/iconStyle.ts

## Clarifications

1. "none" means render the original SVG as-is (no mask, no monochrome treatment)
2. "maskAccent" uses the `--accent` CSS custom property as icon color
3. "mask" is the current behavior (monochrome via currentColor)
4. Icon style radio group goes below the `<cc-icon-preview>` in the Edit Bookmark overlay
5. Default and fallback for existing/imported data is `IconStyle.mask`
6. `iconStyle` is optional in the DTO — no breaking change, fallback to "mask"

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

