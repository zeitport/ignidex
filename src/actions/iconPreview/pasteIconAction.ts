import type {ActionInterface} from '../actionInterface.ts';
import {fetchIconFromUrl} from '#utils/fetchIconFromUrl.ts';
import {svgToDataUri} from '#utils/svgToDataUri.ts';

export class PasteIconAction implements ActionInterface {
    constructor(private onPaste: (dataUri: string, source: string) => void) {}

    async run() {
        try {
            const clipboardItems = await navigator.clipboard.read();

            for (const item of clipboardItems) {
                // Check for SVG image type
                if (item.types.includes('image/svg+xml')) {
                    const blob = await item.getType('image/svg+xml');
                    const text = await blob.text();
                    const dataUri = svgToDataUri(text);
                    this.onPaste(dataUri, '');
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
            this.onPaste(dataUri, '');
            return true;
        }

        // Data URI
        if (trimmed.startsWith('data:image/svg+xml')) {
            this.onPaste(trimmed, '');
            return true;
        }

        // URL to fetch
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            const dataUri = await fetchIconFromUrl(trimmed);
            if (dataUri) {
                this.onPaste(dataUri, trimmed);
            }
            return true;
        }

        return false;
    }
}
