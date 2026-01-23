# Feature: Settings URL Parameter 

## Story

The feature will allow developers to create links that directly navigate users to specific settings 
pages within ignidex, enhancing user experience and efficiency. User can share these links with others, 
helping each other to find a specific setting.

A user can write a social media comment, like: "I love the coffee machine in ignidex: https://ignidex.eu?setting=coffee"

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Support new search URL flag "setting"
- Each settings panel has a unique identifier that can be used in the URL
- When a settings panel is opened, the URL is updated with the setting parameter
- Support back/forward navigation with URL parameter
- Document a brief summary in [AI Code Changes] (no sub headlines, list style)

## Clarifications

- When the settings overlay is closed, the `?setting=` parameter should be removed from the URL
- If an invalid setting ID is provided (e.g., `?setting=invalid`), the settings overlay opens with the default panel (UI)
- The existing hash fragment (panel anchor) should be preserved when using the setting parameter (e.g., `?setting=coffee#myPanel` works)
- Available setting panel IDs: `ui`, `navigation`, `keyboard`, `gallery`, `storage`, `about`, `coffee`

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

- Added `activeSettingsPanelId` observable state in `src/app/state.ts:51`
- Created `src/core/settingsUrlParameter.ts` with URL parameter utilities (`updateSettingsUrlParameter`, `removeSettingsUrlParameter`, `getSettingsUrlParameter`)
- Updated `src/elements/overlays/settingsOverlay.ts`: exported `isValidSettingsPanelId` helper, added `connectedCallback` to sync with global state and URL, added `handlePanelSelect` to update URL on panel change
- Updated `src/main.ts`: parse `?setting=` parameter on load, open settings overlay with specified panel, added `handlePopState` for back/forward navigation
- Updated `src/actions/closeOverlayAction.ts`: remove `?setting=` parameter and reset state when settings overlay is closed
