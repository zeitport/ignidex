# Refactor: Split Section Context Menu

## Use case

As a code maintainer, I want to develop different features for the "bookmark" and "highlight" section.

## Plan

- Split the existing section context menu into separate menus for bookmarks and highlights
- Update the section context menu to open the correct context menu
- Both context menus curently have the same actions

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (100%)
