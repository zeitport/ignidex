# Feature: Text Transform Settings

## Use case

As a user, I want to enable or disable the uppercase text for a modern look.

## Plan

- Implement setting section "text transform" in "ui settings panel"
- Store the user setting in userState
- Use a CSS variable to control the text transform
- Refactor CSS to use variables for text transform

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (100%)
