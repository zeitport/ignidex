import {SwitchToPanelAction} from '../../actions/switchToPanelAction.ts';
import {i18n} from '../../localization/i18n.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {noInputFocused, noOverlayOpen} from '#app/preconditions.ts';

/**
 * Creates a keyboard shortcut that switches to a panel by number (1-9).
 *
 * Note: We use plain number keys instead of CTRL+number because CTRL+1-9
 * conflicts with browser shortcuts for switching tabs.
 * The noInputFocused precondition ensures the shortcut doesn't trigger
 * when the user is typing in an input field.
 */
function createSwitchToPanelShortcut(panelNumber: number): KeyboardShortcut {
    return {
        name: `switchToPanel${panelNumber}Shortcut`,
        group: KeyboardShortcutGroup.navigation,
        keySequence: [`${panelNumber}`],
        description: i18n.token.keyboardShortcut[`switchToPanel${panelNumber}` as keyof typeof i18n.token.keyboardShortcut],
        preconditions: [noInputFocused, noOverlayOpen],
        getAction: () => new SwitchToPanelAction(panelNumber)
    };
}

export const switchToPanel1Shortcut = createSwitchToPanelShortcut(1);
export const switchToPanel2Shortcut = createSwitchToPanelShortcut(2);
export const switchToPanel3Shortcut = createSwitchToPanelShortcut(3);
export const switchToPanel4Shortcut = createSwitchToPanelShortcut(4);
export const switchToPanel5Shortcut = createSwitchToPanelShortcut(5);
export const switchToPanel6Shortcut = createSwitchToPanelShortcut(6);
export const switchToPanel7Shortcut = createSwitchToPanelShortcut(7);
export const switchToPanel8Shortcut = createSwitchToPanelShortcut(8);
export const switchToPanel9Shortcut = createSwitchToPanelShortcut(9);

export const switchToPanelShortcuts: KeyboardShortcut[] = [
    switchToPanel1Shortcut,
    switchToPanel2Shortcut,
    switchToPanel3Shortcut,
    switchToPanel4Shortcut,
    switchToPanel5Shortcut,
    switchToPanel6Shortcut,
    switchToPanel7Shortcut,
    switchToPanel8Shortcut,
    switchToPanel9Shortcut
];
