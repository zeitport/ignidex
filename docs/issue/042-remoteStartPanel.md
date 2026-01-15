# Feature: Remote Start Panel 

## Use case

As a user, I want to use a share my _start panel_ with a community, team or colleagues via a public link.

## Feature Overview
Ignidex is a local and privacy first app. The app does not provide a back-end and so no direct way to share a _start panel_.
A user can export a created _start panel_ as a JSON file. This file can be uploaded to a public file sharing service and shared with others.
A user can create a ignidex URL with the _load_ parameter to load a _start panel_ from a JSON file.
For example: `https://ignidex.app?load=https://example.com/my-cool-start-panel.json`

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- WHEN a user opens the app with a _load_ parameter 
  - WHEN a _start panel_ with same `remoteUrl` exists
    - THEN load the _start panel_ from the database, load the JSON file and update the local _start panel_.
  - WHEN a _start panel_ with same `remoteUrl` does not exist
    - THEN create a new _start panel_ from the JSON file and update the `remoteUrl` of the entry.
  - UPDATE the location with the anchor (remove load url part)
- WHEN a user views a _remote start panel_
  - THEN show a "remote" badge (muted style) in the _start panel header_
  - AND add a hoverHint to the badge to show the `remoteUrl` and why the _start panel_ is read-only.
- New system: precondition for context menu
  - works similar like the precondition for keyboard shortcuts
  - add a "notReadOnly" precondition for context menu
  - WHEN a precondition is not satisifed then "disable" the context menu
- Evaluate all context menu items, when it modifies the _start panel_ add a _notReadOnly_ precondition.
- The _CreateLocalPanelAction_ should remove the remoteUrl from the entry. So it can be edited.
- Document a brief summary in [AI Code Changes] (no sub headlines)

## Clarifications

**Q1: Should the remote JSON file use the existing `StartPanelDto` format?**
A: Yes, the existing `StartPanelDto` from `src/models/dto/` is correct. It includes `images[]` and `meta` fields making it self-contained for sharing.

**Q2: What should happen when the remote JSON file fails to load?**
A: Show an error overlay and stay on the current panel (or first panel, or getting started overlay if no panels exist). The error overlay should provide context information like "check CORS" but no lengthy guidance.

**Q3: When loading an existing remote panel, should remote always overwrite local?**
A: Yes, remote overwrites local version. When `remoteUrl` is set, the remote source is the single source of truth.

**Q4: Should URL change from `?load=...` to `#anchor-name` after loading?**
A: Yes.

**Q5: What operations should remain available on a remote/read-only panel?**
A: No edit actions (edit, reorder, delete, etc.). Settings are per-app so those work normally. Other actions like navigation, export, and "Copy to local panel" should be available.

**Q6: CORS considerations?**
A: Expect a CORS-friendly environment. If a loading error occurs, the error overlay can mention CORS as a possible cause. No workarounds or longer guidance needed.

**Q7: Should remote panels auto-refresh?**
A: No auto-refresh. Add a context menu to the "remote" badge with two options: "Copy to local" and "Refresh from remote".

**Q8: How should the badge context menu work?**
A: Use the same right-click context menu pattern as other context menus. Also add a hover hint to the badge showing the remote URL and explaining why the panel is read-only.

**Q9: Is "Copy to local" the same as `CreateLocalPanelAction`?**
A: Yes, use the existing `CreateLocalPanelAction` which removes the `remoteUrl` so it can be edited.

**Q10: How should anchor conflicts be handled?**
A: Try to use the anchor from the remote JSON. If it conflicts with an existing local anchor, generate a new anchor using `createId()`.

**Q11: Does `StartPanelEntry` already have a `remoteUrl` field?**
A: No, `remoteUrl` is new. Create a database upgrade script to add `remoteUrl` as an index. Add helper methods to the store. Bump the database version.

**Q12: Should "Refresh from remote" show confirmation or loading indicator?**
A: Only show an error overlay when it fails. Expect loading to be very fast, no loading indicator needed.

**Q13: Should there be a loading indicator when initially loading via `?load=`?**
A: No, expect small JSONs and fast load times.

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Added `remoteUrl` field to `StartPanelEntry` with IndexedDB index (db version 10) and `getByRemoteUrl()` store method. Created `activeStartPanelEntry` observable in state to track current panel entry. Updated `main.ts` to handle `?load=` URL parameter: fetches remote JSON, creates/updates panel with `remoteUrl`, handles anchor conflicts, and redirects to `#anchor`. Added `loadRemotePanel()` function with error handling that shows overlay on failure. Created `notReadOnly` precondition and added `preconditions` field to `ContextMenuItem` class. Updated `ContextMenuElement` to check preconditions when rendering items. Added "Remote" badge to `StartPanelHeaderElement` with hover hint and right-click context menu. Created `RefreshFromRemoteAction` for re-fetching remote content. Updated `CreateLocalPanelAction` to explicitly set `remoteUrl: null` and update `activeStartPanelEntry`. Applied `notReadOnly` precondition to edit actions in panel, bookmark, group, and section context menus. Added localization strings for remote panel feature (`remotePanel` section in `en.ts`). Updated `loadDataFromUrl` to throw errors instead of returning fallback panel. Updated `switchToFirstStartPanel` to maintain `activeStartPanelEntry` state.
