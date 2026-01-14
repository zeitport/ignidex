import type {Card} from '../models/internal/card.ts';
import {IconResolverResult} from './iconResolverResult.ts';
import {ImageAssetsStore} from './idb/imageAssetsStore.ts';
import {inject} from '#inject';
import {mdiLinkOff} from '@mdi/js';

export class IconResolver {
    private imageAssetsDatabase: ImageAssetsStore = inject(ImageAssetsStore);

    async resolve(card: Card): Promise<IconResolverResult> {
        return this.resolveById(card.icon);
    }

    async resolveById(iconId: string | null): Promise<IconResolverResult> {
        if (iconId) {
            try {
                const entry = await this.imageAssetsDatabase.get(iconId);

                if (entry) {
                    if (entry.dataUri) {
                        return new IconResolverResult({dataUri: entry.dataUri});
                    } else {
                        return this.resolveFallbackIcon();
                    }
                }
            } catch (error) {
                console.warn('Icon assets read failed, continue resolving.', error);
            }
        }

        return this.resolveFallbackIcon();
    }

    private resolveFallbackIcon() {
        return this.resolveMdiIcon(mdiLinkOff);
    }

    // private async resolveIconUrl(card: Card): Promise<IconResolverResult> {
    //     try {
    //         const response = await fetch(card.iconUrl!);
    //         if (!response.ok) {
    //             const error = `Failed to fetch icon from URL: ${response.status} ${response.statusText}`;
    //             return new IconResolverResult({error});
    //         }
    //
    //         const blob = await response.blob();
    //         const dataUri = await new Promise<string>((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => resolve(reader.result as string);
    //             reader.onerror = reject;
    //             reader.readAsDataURL(blob);
    //         });
    //
    //         return new IconResolverResult({dataUri})
    //     } catch {
    //         return new IconResolverResult({error: `Error fetching icon from URL: ${card.iconUrl!}`})
    //     }
    // }

    private resolveMdiIcon(pathData: string): IconResolverResult {
        const result = new IconResolverResult();

        if (pathData) {
            const svg = this.createSvgFromPathData(pathData);
            result.dataUri = this.svgToDataUri(svg);
        } else {
            result.error = `Could not find mdi icon path`;
        }

        return result;
    }

    private svgToDataUri(svg: string) {
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
    }

    private createSvgFromPathData(path: string): string {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
    }
}
