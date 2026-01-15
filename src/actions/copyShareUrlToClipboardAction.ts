import {activeRemoteUrl} from '#state';
import type {ActionInterface} from './actionInterface.ts';

export class CopyShareUrlToClipboardAction implements ActionInterface {
    async run() {
        try {
            if (activeRemoteUrl.value) {
                const shareUrl = `${location.protocol}//${location.hostname}:${location.port}?load=${activeRemoteUrl.value}`;
                await navigator.clipboard.writeText(shareUrl);
            }
        } catch (err) {
            console.error('Failed to copy share URL to clipboard:', err);
        }
    }

    isDisabled(): boolean {
        return !activeRemoteUrl.value;
    }
}
