import type {ActionInterface} from '../actionInterface.ts';
import {selectedImageAsset} from '#state';

export class CopyAsSvgAction implements ActionInterface {
    async run() {
        const asset = selectedImageAsset.value;
        if (!asset?.dataUri) return;

        try {
            const svgContent = this.decodeSvgFromDataUri(asset.dataUri);
            if (svgContent) {
                await navigator.clipboard.writeText(svgContent);
            }
        } catch (err) {
            console.error('Failed to copy SVG to clipboard:', err);
        }
    }

    private decodeSvgFromDataUri(dataUri: string): string | null {
        const [header, data] = dataUri.split(',');
        if (!data) return null;

        const isBase64 = header.includes(';base64');

        try {
            if (isBase64) {
                return atob(data);
            } else {
                return decodeURIComponent(data);
            }
        } catch {
            return null;
        }
    }
}
