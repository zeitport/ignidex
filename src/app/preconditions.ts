import {activeOverlay, activeRemoteUrl} from '#state';
import type {PreconditionFn} from '../keyboard/keyboardShortcutInterface.ts';

export const noInputFocused: PreconditionFn = () => {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLInputElement) {
        return false;
    }
    if (activeElement instanceof HTMLTextAreaElement) {
        return false;
    }
    if (activeElement instanceof HTMLSelectElement) {
        return false;
    }
    if (activeElement instanceof HTMLElement && activeElement.isContentEditable) {
        return false;
    }

    return true;
};

export const noOverlayOpen: PreconditionFn = () => {
    return activeOverlay.value === null;
};

export const overlayOpen: PreconditionFn = () => {
    return activeOverlay.value !== null;
};

export const noRemoteUrl: PreconditionFn = () => {
    return activeRemoteUrl.value == null;
};
