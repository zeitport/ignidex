# Feature: Icon Selector and Image Gallery 

## Use case

As a user, I want to select an existing icon for a bookmark.
As a user, I want to view a gallery of all uploaded/used images.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Create a new element cc-image-asset-viewer
  - filter by type
  - Shows image assets in an 8 column wide grid.
  - Preview an image inside a square box. Size 2rem width & height
  - dispatches @select event 
  - Use a very clean layout with subtile hover effects (check existing app style)
- Create a new selectIconOverlay
  - Add new context menu option to the icon preview context menu: "Select existing icon"
  - The selectIconAction opens the selectIconOverlay
  - When an icon is selected, the iconId is set to the activeIconPreview
- Update activeIconPreview with an assetId (=imageAssetEntry.id)
  - Update the icon preview element to support dataUri and assetIds
- Create a new imageGallerySettingsPanel
  - Show the panel in the settings overlay.
  - It also uses the cc-image-asset-viewer element to display the image gallery
  - create a new context menu "imageGalleryItemMenu" with options: Copy as dataUri, Open in new tab, Copy as SVG
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- **Icon sharing**: Multiple cards share the same assetId when selecting an existing icon (no copies created)
- **Type filter UI**: The type filter on cc-image-asset-viewer is a property only, no visible UI control in the viewer
- **Copy as SVG**: Copies raw SVG markup (decoded from base64 dataUri), not the dataUri string

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Created `cc-image-asset-viewer` element with 8-column grid, type filter prop, @select and @item-context-menu events
- Created `selectIconOverlay` for selecting existing icons from gallery
- Created `SelectExistingIconAction` to open the select icon overlay
- Added "Select existing icon" context menu item to icon preview menu
- Updated `IconPreviewState` and `IconPreviewChangeEvent` interfaces to include optional `assetId`
- Updated `iconPreviewElement` to pass assetId through change events
- Updated `editBookmarkCardOverlay` to reuse existing asset IDs when selecting shared icons
- Created `imageGallerySettingsPanel` with context menu support for gallery items
- Added Image Gallery panel to settings overlay
- Created `selectedImageAsset` state for tracking selected gallery item
- Created gallery context menu with actions: Copy as Data URI, Open in new tab, Copy as SVG
- Created actions: `CopyAsDataUriAction`, `OpenInNewTabAction`, `CopyAsSvgAction`
- Added i18n token `iconPreviewSelectExisting` for tooltip
- Exported new components in elements/index.ts
