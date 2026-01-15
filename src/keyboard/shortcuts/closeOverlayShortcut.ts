import {activeAction, activeOverlay} from '#state';
import {i18n} from '#i18n';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {overlayOpen} from '#app/preconditions.ts';

export const closeOverlayShortcut: KeyboardShortcut = {
    name: 'closeOverlayShortcut',
    group: KeyboardShortcutGroup.general,
    keySequence: ['Escape'],
    description: i18n.text.keyboardShortcut.closeOverlay,
    preconditions: [overlayOpen],
    getAction: () => ({
        run: () => {
            const action = activeAction.value;
            if (action?.cancel) {
                action.cancel();
            } else {
                activeOverlay.value = null;
            }
        }
    })
};
