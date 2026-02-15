# Readme badges

## Description

As a maintainer, I want that new users trust the project and its quality.

Therefore, a review recommended using badges to show the project's quality and trustworthiness in the README.md file.

Show badges for:
- License badge
- Version badge
- Docker image badge
- "No tracking" / "Local first" custom badge

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications

## Clarifications

- Badges are placed centered below the title, above the description text
- All badges use shields.io
- **License badge**: Dynamic GitHub license badge, links to `./LICENSE`
- **Version badge**: Dynamic GitHub tag badge (`?label=version`), links to GitHub releases
- **Docker image badge**: Static badge with Docker logo showing `ghcr.io`, links to GitHub container package page
- **"Local first"**: Static custom badge (green, `local-first: yes`)
- **"No tracking"**: Static custom badge (green, `tracking: none`)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

