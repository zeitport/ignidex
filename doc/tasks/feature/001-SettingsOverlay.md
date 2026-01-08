# Feature: Settings Overlay Foundation

## Use case

As a user I want to change the accent color of the Ignidex UI to personalize my experience.
As a user I want to know how much storage I am using.

## Context

This is the first setting of the Ignidex UI. Many more settings will follow.
So settings will be grouped in different panels.

## Implementation

- Implement "OpenSettingsAction"
- Create a new settings overlay
- The settings overlay UI:
  - Left side: List of setting panels (use cc-list)
  - Right side: Settings panel
- Create a "UI" settings panel 
  - Provide a list of material design colors, suitable for dark backgrounds
  - E57373, F06292, BA68C8, 9575CD, 7986CB, 64B5F6, 4FC3F7, 4DD0E1, 81C784, AED581, DCE775, FFF176
  - Put colors in a separate file colorPalette
  - Each color is a square of 1.5rem size.
  - The accent color is stored in the user state entry
  - On app start read the user state and set the --accent CSS variable
- Create an "Storage" settings panel
  - Show the size (MBytes) of all stored icon assets. 

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## Result (70%)
- wrong icon color
- UI inconsistencies 
- storage panel did not work
