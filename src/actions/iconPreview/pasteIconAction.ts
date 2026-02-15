import {IconStyle} from '#models/internal/iconStyle.ts';
import {createId} from '#utils/createId.ts';
import type {ActionInterface} from '../actionInterface.ts';
import {fetchIconFromUrl} from '#utils/fetchIconFromUrl.ts';
import {svgToDataUri} from '#utils/svgToDataUri.ts';
import {activeIconPreview} from '../../state/state.ts';

export class PasteIconAction implements ActionInterface {
    async run() {
        try {
            const clipboardItems = await navigator.clipboard.read();

            for (const item of clipboardItems) {
                // Check for SVG image type
                if (item.types.includes('image/svg+xml')) {
                    const blob = await item.getType('image/svg+xml');
                    const text = await blob.text();
                    const dataUri = svgToDataUri(text);
                    this.applyChange(dataUri, '');
                    return;
                }

                // Check for text that might be SVG
                if (item.types.includes('text/plain')) {
                    const blob = await item.getType('text/plain');
                    const text = await blob.text();
                    if (await this.processText(text)) {
                        return;
                    }
                }
            }
        } catch (err) {
            console.error('Failed to paste icon from clipboard:', err);
        }
    }

    async processText(text: string): Promise<boolean> {
        const trimmed = text.trim();
        if (!trimmed) return false;

        // SVG markup
        if (trimmed.startsWith('<svg') || trimmed.startsWith('<?xml')) {
            const dataUri = svgToDataUri(trimmed);
            this.applyChange(dataUri, '');
            return true;
        }

        // Data URI
        if (trimmed.startsWith('data:image/svg+xml')) {
            this.applyChange(trimmed, '');
            return true;
        }

        // URL to fetch
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            const dataUri = await fetchIconFromUrl(trimmed);
            if (dataUri) {
                this.applyChange(dataUri, trimmed);
            }
            return true;
        }

        return false;
    }

    private applyChange(dataUri: string, source: string) {
        activeIconPreview.value = {
            assetId: createId(),
            dataUri,
            source,
            iconStyle: activeIconPreview.value?.iconStyle ?? IconStyle.mask,
        };
    }
}
