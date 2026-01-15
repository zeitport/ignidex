import {inject} from '#inject';
import {SwitchPanelBackAction} from '../../actions/switchPanelBackAction.ts';
import {i18n} from '../../localization/i18n.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {noInputFocused, noOverlayOpen} from '#app/preconditions.ts';

export const panelBackShortcut: KeyboardShortcut = {
    name: 'panelBackShortcut',
    group: KeyboardShortcutGroup.navigation,
    keySequence: ['ArrowLeft'],
    description: i18n.token.keyboardShortcut.panelBack,
    preconditions: [noInputFocused, noOverlayOpen],
    getAction: () => inject(SwitchPanelBackAction)
};
