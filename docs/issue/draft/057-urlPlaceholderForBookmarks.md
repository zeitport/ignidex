# TODO: URL Placeholder for Bookmarks. 

## Story

As a user, I want to open a URL with the current date as a parameter (e.g: Search for today's new tasks).
As a user, I want to add a random id to a URL to prevent caching.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Example for a bookmark url: https://example.com?date={{date}}&random={{random}}
- Placeholder {{date}} will be replaced with the current date in the format YYYY-MM-DD
- Placeholder {{date.year}} will be replaced with the current date in the format YYYY
- Placeholder {{date.month}} will be replaced with the current date in the format MM
- Placeholder {{date.day}} will be replaced with the current date in the format DD
- Placeholder {{random}} will be replaced with a random 8-character long alphanumeric string (nanoid, url safe)
- Placeholder {{random:x}} will be replaced with a random x-character long alphanumeric string (nanoid, url safe)
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

