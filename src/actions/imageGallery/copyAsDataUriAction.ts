import type {ActionInterface} from '../actionInterface.ts';
import {selectedImageAsset} from '#state';

export class CopyAsDataUriAction implements ActionInterface {
    async run() {
        const asset = selectedImageAsset.value;
        if (!asset?.dataUri) return;

        try {
            await navigator.clipboard.writeText(asset.dataUri);
        } catch (err) {
            console.error('Failed to copy data URI to clipboard:', err);
        }
    }
}
