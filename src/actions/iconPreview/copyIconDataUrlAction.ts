import type {ActionInterface} from '../actionInterface.ts';
import {activeIconPreview} from '#state';
import {i18n} from '#i18n';

export class CopyIconDataUrlAction implements ActionInterface {
    async run() {
        const dataUri = activeIconPreview.value?.dataUri;
        if (!dataUri) return;

        try {
            await navigator.clipboard.writeText(dataUri);
        } catch (err) {
            console.error('Failed to copy icon data URL to clipboard:', err);
        }
    }

    isDisabled(): boolean {
        return !activeIconPreview.value?.dataUri;
    }

    disabledHint = i18n.text.hints.iconPreviewNoIcon;
}
