import {inject} from '#inject';
import {EditCardAction} from '../../actions/editCardAction.ts';
import {i18n} from '../../localization/i18n.ts';
import {KeyboardShortcutGroup} from '../KeyboardShortcutGroup.ts';
import type {KeyboardShortcut} from '../keyboardShortcutInterface.ts';
import {hasHoveredCard, noInputFocused, noOverlayOpen} from '#app/preconditions.ts';
import {hoveredCard, selectedCard} from '#state';

export const editBookmarkShortcut: KeyboardShortcut = {
    name: 'editBookmarkShortcut',
    group: KeyboardShortcutGroup.editing,
    keySequence: ['E'],
    description: i18n.token.keyboardShortcut.editBookmark,
    preconditions: [noInputFocused, noOverlayOpen, hasHoveredCard],
    getAction: () => {
        selectedCard.value = hoveredCard.value;
        return inject(EditCardAction);
    }
};
