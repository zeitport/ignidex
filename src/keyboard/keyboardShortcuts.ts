import type {KeyboardShortcut} from './keyboardShortcutInterface.ts';
import {closeOverlayShortcut} from './shortcuts/closeOverlayShortcut.ts';
import {openSettingsShortcut} from './shortcuts/openSettingsShortcut.ts';
import {panelBackShortcut} from './shortcuts/panelBackShortcut.ts';
import {panelNextShortcut} from './shortcuts/panelNextShortcut.ts';
import {switchPanelShortcut} from './shortcuts/switchPanelShortcut.ts';

export const keyboardShortcuts: KeyboardShortcut[] = [
    switchPanelShortcut,
    panelBackShortcut,
    panelNextShortcut,
    openSettingsShortcut,
    closeOverlayShortcut
];

export function getKeyboardShortcuts(): KeyboardShortcut[] {
    return keyboardShortcuts;
}
