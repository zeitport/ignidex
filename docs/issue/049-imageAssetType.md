# System: Image Asset Type 

## Use case

In the future, a user shall manage background images for panels and corner actions. Support for icons is already implemented.
To distinguish between different types of image assets, such as icons and background images, we need to introduce a type system.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- New 'ImageAssetType' was created to be used for 'ImageAssetEntry'
- Update bookmark edit overlay, when a user uploads or pastes an SVG image for a bookmark THEN add type "icon" to the image asset entry.
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `type` field to `ImageDto` interface to support passing the image asset type
- Updated `editBookmarkCardOverlay.ts` to import `ImageAssetType` and explicitly pass `type: ImageAssetType.icon` when saving bookmark icons
- Updated `exportToJsonAction.ts` to include `type` field in exported images, defaulting to `icon` when type is null
