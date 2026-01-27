import type {KeyboardShortcut} from './keyboardShortcutInterface.ts';
import {closeOverlayShortcut} from './shortcuts/closeOverlayShortcut.ts';
import {openSettingsShortcut} from './shortcuts/openSettingsShortcut.ts';
import {panelBackShortcut} from './shortcuts/panelBackShortcut.ts';
import {panelNextShortcut} from './shortcuts/panelNextShortcut.ts';
import {switchPanelShortcut} from './shortcuts/switchPanelShortcut.ts';
import {switchToPanelShortcuts} from './shortcuts/switchToPanelShortcuts.ts';

export const keyboardShortcuts: KeyboardShortcut[] = [
    switchPanelShortcut,
    openSettingsShortcut,
    closeOverlayShortcut,
    panelNextShortcut,
    panelBackShortcut,
    ...switchToPanelShortcuts,
];

export function getKeyboardShortcuts(): KeyboardShortcut[] {
    return keyboardShortcuts;
}
