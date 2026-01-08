import type {Card} from '../model/internal/card.ts';
import {IconResolverResult} from './iconResolverResult.ts';
import {IconAssetsStore} from './iconAssetsStore.ts';
import {inject} from '#inject';
import {mdiLinkOff} from '@mdi/js';

export class IconResolver {
    private iconAssetsDatabase: IconAssetsStore = inject(IconAssetsStore);

    async resolve(card: Card): Promise<IconResolverResult> {
        let result = new IconResolverResult({
            error: 'No icon resolver strategy found. Please make sure that the card has one of this properties: iconName, iconUrl'
        });

        if (card.icon) {
            try {
                const entry = await this.iconAssetsDatabase.get(card.icon);

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

        // Fallback: Icon could not be resolved, fall back to a mdi icon.
        if (result.dataUri === null) {
            result = await this.resolveFallbackIcon();
        }

        return result;
    }

    private async resolveFallbackIcon() {
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

    private async resolveMdiIcon(iconPath: string): Promise<IconResolverResult> {
        const result = new IconResolverResult();

        if (iconPath) {
            const svg = this.createSvgFromMdiIconPath(iconPath);
            console.debug(svg);
            result.dataUri = this.svgToDataUri(svg);
            console.debug(iconPath);
        } else {
            result.error = `Could not find mdi icon path`;
        }

        return result;
    }

    private svgToDataUri(svg: string) {
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
    }

    private createSvgFromMdiIconPath(path: string): string {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
    }
}
