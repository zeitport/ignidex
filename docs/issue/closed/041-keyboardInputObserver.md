# System: Keyboard Input Observer 

## Use case

As a developer, I want an easy way to implement new keyboard shortcuts.
As a developer, I want to get an overview of already implemented keyboard shortcuts.
As a user, I want to see a list of all available keyboard shortcuts in the settings.

## Plan

- Review this issue and ask questions to improve the plan and clarify unclear requirements.
- Document answers in section [Clarifications]
- Create a _keyboardShortcuts.ts_ file that returns a list of all registered keyboard shortcuts.
- Create a _keybaordShortcutInterface_ interface for all shortcut implementation.
- Each keyboard shortcut:
  - has it owns file, e.g.: openSwitchPanelOverlayShortcut
  - implements the _keybaordShortcutInterface_
  - should have a unique name
  - should have a key sequence 
    - CTRL + "A" means CTRL key and "A" key is pressed at the same time
    - SHIFT, SHIFT means double press of SHIFT
  - each keyboard shortcut has a method "run" to run the code.
  - each keyboard shortcut has a list of precondition functions that are checked before running the code.
- Create common precondition functions for keyboard shortcuts.
  - noInputFocused
  - noOverlayOpen
  - overlayOpen
- Implement a keySequenceParser that returns a query like object.
- Implement a keyboardInputObserver that observes keyboard input and runs the corresponding keyboard shortcut.
  - Start at main.js
- Add descriptions to shortcuts, add text to own i18n section "keyboardShortcut"
- Refactor all existing keyboard shortcuts to use the new interface and preconditions.
- Document a brief summary in [AI Code Changes] (no sub headlines)
- Create a keyboard shortcut settings panel (read-only)

## Examples

### switchPanelShortcut

```ts
export const switchPanelShortcut: KeyboardShortcut = {
  name: 'switchPanelShortcut',
  keySequence: ['CTRL + A'],
  run: () => {
    const action = inject(SwitchPanelAction);
    action.run();
  },
  description: i18n.text.keyboardShortcut.switchPanel,
  preconditions: [noInputFocused, noOverlayOpen],
};
```

## Clarifications

### Questions

**Q1: Modifier keys**
The example shows `CTRL + A`. Should Alt and Meta (Windows/Command key) also be supported as modifiers?
YES

**Q2: Double-press timing**
The existing double-shift detection uses 300ms. Should this timing be configurable per shortcut, or is 300ms a fixed standard?
> FIXED global 300ms value.

**Q3: Longer key sequences**
Can shortcuts have sequences longer than two keys? For example, vim-style `G, G` or `CTRL + K, CTRL + C`?
> `CTRL + K, CTRL + C` should be supported.

**Q4: Input focus definition**
The existing code excludes `input`, `textarea`, and elements with `contentEditable`. Should `select` elements or custom interactive elements (like the switch component) also be excluded?
> Yes, please

**Q5: Context menu consideration**
Should `noOverlayOpen` also consider `activeContextMenu`? Currently, overlays and context menus are tracked separately in state.
> No, only for overlays.

**Q6: Shortcut conflicts**
How should conflicts be handled if two shortcuts have the same key sequence? Options:
> Check preconditions to determine which runs → then first one registered wins

**Q7: Dynamic registration**
Should shortcuts be registered once at startup, or should components be able to register/unregister shortcuts dynamically during runtime?
> once at startup

**Q8: Shortcut customization**
In the settings view, should users only see shortcuts (read-only list), or should they be able to customize/rebind shortcuts?
> At the moment only a read only list

**Q9: Disabled shortcut behavior**
Actions have `isDisabled()`. When a shortcut's action is disabled, should:
> Show a hint/notification to the user (using `disabledHint`)

**Q10: i18n namespace**
Should the i18n section be named `keyboardShortcut` (singular) or `keyboardShortcuts` (plural)?
> keyboardShortcut (singular)

## Validation

- Run `npm run lint` to check for lint errors
- Run `npm run tsc` to run the TypeScript compiler

## AI Code Changes

Implemented a keyboard input observer system with the following components:
- Created `KeyboardShortcut` interface and types in `src/keyboard/keyboardShortcutInterface.ts`
- Added precondition functions (`noInputFocused`, `noOverlayOpen`, `overlayOpen`) in `src/keyboard/preconditions.ts`
- Implemented `keySequenceParser` for parsing key sequences including double-tap and multi-key combos
- Created individual shortcut files in `src/keyboard/shortcuts/` for switchPanel, panelBack, panelNext, openSettings, and closeOverlay
- Built `keyboardShortcuts.ts` registry that exports all registered shortcuts
- Implemented `keyboardInputObserver.ts` that handles key events, checks preconditions, and executes matching shortcuts
- Added i18n descriptions in `src/localization/en.ts` under `keyboardShortcut` namespace
- Refactored `main.ts` to use the new observer system, removing legacy keyboard handling code
- Created read-only keyboard shortcuts settings panel in `src/elements/settings/keyboardShortcutsSettingsPanel.ts`
- Integrated the settings panel into `settingsOverlay.ts` with a new "Keyboard" tab
