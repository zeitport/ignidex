# Feature: Paste Remote Start Panel URL 

## Use case

As a user, I want to copy and paste a remote start panel URL to create a remote start panel.

## Plan

- When a URL is pasted into the app
- Then try to fetch the content of the URL
- If the URL is valid and the response contains a JSON object with meta.app = ignidex
- Then create a new remote start panel.
- Switch to the start panel.
- When the URL fetch returns an error or is not a JSON, then open the add URL as bookmark select overlay (existing implementation)
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Modified `src/elements/startPanelElement.ts` to intercept pasted URLs and attempt to fetch their content. If the response is a valid JSON with `meta.app === 'ignidex'`, a new remote start panel is created (or updated if one already exists for that URL) and the app switches to it. If the fetch fails, returns non-JSON, or lacks the ignidex meta identifier, the existing bookmark overlay flow is triggered instead.
