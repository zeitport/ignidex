# Issue: Keyboard Panel Navigation 

## Use case

As a user, I want to navigate between panels using the keyboard (arrow keys)

## Plan

- On app level handle arrow left and arrow right keys to navigate between panels
- Create a SwitchPanelBackAction and a SwitchPanelNextAction

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Generation

### Quality Score

10/10

## Comments

Implementation complete:
- Created `SwitchPanelBackAction` and `SwitchPanelNextAction` in `src/actions/`
- Added keyboard listener in `main.ts` with `registerKeyboardNavigation()`
- Arrow keys navigate when no input is focused and no overlay is open
- Wrap-around enabled at panel boundaries
- Lint and TypeScript validation passed
