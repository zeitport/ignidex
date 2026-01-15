import {inject} from '#inject';
import {SwitchPanelNextAction} from '../../actions/switchPanelNextAction.ts';
import {i18n} from '../../localization/i18n.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {noInputFocused, noOverlayOpen} from '#app/preconditions.ts';

export const panelNextShortcut: KeyboardShortcut = {
    name: 'panelNextShortcut',
    group: KeyboardShortcutGroup.navigation,
    keySequence: ['ArrowRight'],
    description: i18n.text.keyboardShortcut.panelNext,
    preconditions: [noInputFocused, noOverlayOpen],
    getAction: () => inject(SwitchPanelNextAction)
};
