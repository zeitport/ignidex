import {inject} from '#inject';
import {i18n} from '#i18n';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {overlayOpen} from '#app/preconditions.ts';

export const closeOverlayShortcut: KeyboardShortcut = {
    name: 'closeOverlayShortcut',
    group: KeyboardShortcutGroup.general,
    keySequence: ['Escape'],
    description: i18n.token.keyboardShortcut.closeOverlay,
    preconditions: [overlayOpen],
    getAction: () => inject(CloseOverlayAction)
};
