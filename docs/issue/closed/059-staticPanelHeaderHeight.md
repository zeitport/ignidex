# UX: Static Start Panel Header Height

## Story

As a user, I want a calm UI when I switch between panels to avoid visual distractions.
The panel header height should be static to provide a consistent visual experience.

The panel header has a headline and an optional description and icon.
Place all elements vertically centered to create a balanced and harmonious layout.

## Plan

- [x] Review this issue and ask questions to improve the plan and clarify unclear requirements.
- [x] Document answers in section [Clarifications]
- [x] Add `--panel-header-height: 3.5rem` CSS variable to `src/app/index.css`
- [x] Update `startPanelHeaderElementStyle.ts`:
  - Set fixed height on `:host` using the CSS variable
  - Add `height: 100%` to `.header` for proper vertical centering
  - Add single-line truncation to `.description` (white-space, overflow, text-overflow)
- [x] Run validation commands
- [x] Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

1. **Static height**: 3.5rem using CSS variable `--panel-header-height`
2. **Description overflow**: Truncate with ellipsis (single line only)
3. **Icon absence**: Collapse the icon column (text shifts left)
4. **Missing description**: Title vertically centered in full header height
5. **Background element**: Keep `.header-back` with `inset: -1rem` unchanged

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `--panel-header-height: 3.5rem` CSS variable to `src/app/index.css`
- Set fixed `height: var(--panel-header-height)` on `:host` in `startPanelHeaderElementStyle.ts`
- Added `height: 100%` to `.header` grid container for proper vertical centering
- Added single-line ellipsis truncation to `.description` (white-space: nowrap, overflow: hidden, text-overflow: ellipsis)
