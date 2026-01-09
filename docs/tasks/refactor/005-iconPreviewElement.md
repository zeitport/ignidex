# Refactor: Icon Preview Element

## Use case

The edit bookmark overlay element is getting complex with multiple actions and utilities related to icon preview.
This refactor aims to simplify and modularize the code for better maintainability and readability.

## Plan

- Create new cc-icon-preview element
- Move icon preview related actions and utilities to a separate module
- Update edit bookmark overlay element to use the new cc-icon-preview element

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler


## Review of AI code

- Score: 8/10
- context menu setup (-2)
- property active is confusing and not documented (-1)
