# Fix: Missing Icons

## Problem

After starting the app and switching to another panel, I noticed that the icons were missing from the UI.
Only the placeholder icon is displayed.
When refreshing the page, the icons are displayed correctly.

## Plan

- Investigate the code responsible for handling icon loading
- Check the iconAsset loading process
- Identify any potential issues or missing functionality that could be causing the problem.
- If the problem is easy to fix, consider implementing a solution, otherwise ask for help.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Solution

**Root Cause:** In `src/elements/cardIconElement.ts`, icon resolution only happened in `connectedCallback()`, which runs once when the element first connects to the DOM. When switching panels, Lit reuses existing DOM elements but updates the `card` property - since `connectedCallback()` doesn't run again, icons weren't re-resolved.

**Fix:** Added `willUpdate()` lifecycle method to re-resolve icons when the `card` property changes, and extracted icon resolution into a reusable `resolveIcon()` method.

## AI Code Generation

### Quality Score
8/10

### Problems

- None

