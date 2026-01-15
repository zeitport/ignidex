import {inject} from '#inject';
import {OpenSettingsAction} from '../../actions/openSettingsAction.ts';
import {i18n} from '../../localization/i18n.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {noInputFocused, noOverlayOpen} from '../preconditions.ts';

export const openSettingsShortcut: KeyboardShortcut = {
    name: 'openSettingsShortcut',
    group: KeyboardShortcutGroup.general,
    keySequence: ['F1'],
    description: i18n.text.keyboardShortcut.openSettings,
    preconditions: [noInputFocused, noOverlayOpen],
    getAction: () => inject(OpenSettingsAction)
};
