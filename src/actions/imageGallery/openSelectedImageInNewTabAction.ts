import type {ActionInterface} from '../actionInterface.ts';
import {selectedImageAsset} from '#state';

export class OpenSelectedImageInNewTabAction implements ActionInterface {
    run() {
        const asset = selectedImageAsset.value;
        if (!asset?.dataUri) return;

        const blob = this.dataUriToBlob(asset.dataUri);
        console.warn(asset.dataUri, blob);
        if (!blob) return;

        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, '_blank');
    }

    private dataUriToBlob(dataUri: string): Blob | null {
        try {
            const [header, data] = dataUri.split(',');
            const mimeMatch = header.match(/data:([^;]+)/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/svg+xml';
            const isBase64 = header.includes(';base64');

            if (isBase64) {
                const byteString = atob(data);
                const byteArray = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    byteArray[i] = byteString.charCodeAt(i);
                }
                return new Blob([byteArray], {type: mimeType});
            } else {
                const decoded = decodeURIComponent(data);
                return new Blob([decoded], {type: mimeType});
            }
        } catch {
            return null;
        }
    }
}
