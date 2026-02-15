# GitHub Action: Create Docker image for easy selfhost. 

## Description

As a maintainer, I want to create a Docker image for easy self-hosting of the application.

The docker image should be built using GitHub Actions and pushed to GitHub container registry (ghcr)

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Implement based on description and clarifications
- Create a GitHub Actions workflow to build and push the Docker image to ghcr
- Update docker-compose file to use the image from the ghcr.
- Update selfhost.md (Installation should be as easy as possible, 1. curl, 2. run docker compose up -d)
- Update documentation to include instructions for using the Docker image

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

