import {inject} from '#inject';
import {SwitchPanelAction} from '../../actions/switchPanelAction.ts';
import {i18n} from '../../localization/i18n.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {noInputFocused, noOverlayOpen} from '#app/preconditions.ts';

export const switchPanelShortcut: KeyboardShortcut = {
    name: 'switchPanelShortcut',
    group: KeyboardShortcutGroup.navigation,
    keySequence: ['SHIFT', 'SHIFT'],
    description: i18n.token.keyboardShortcut.switchPanel,
    preconditions: [noInputFocused, noOverlayOpen],
    getAction: () => inject(SwitchPanelAction)
};
