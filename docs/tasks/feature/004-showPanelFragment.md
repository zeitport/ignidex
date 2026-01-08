# Feature: Show panel URL fragment 

## Use case

As a user, I want to see the current panel (anchor) as part of the URL to achieve better navigation.

## Plan

- After startup or whenever the panel changes, update the URL fragment
- Ensure the URL fragment is correctly parsed and applied when navigating back to the page
- Ensure back/forward navigation works correctly with the URL fragment

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (xx%)
