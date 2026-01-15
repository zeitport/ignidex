import {inject} from '#core/injector.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import {StartPanel} from '../models/internal/startPanel.ts';

/**
 * Loads a StartPanel from a remote URL.
 * @param url The URL to fetch the JSON from
 * @throws Error if fetching or parsing fails
 */
export async function loadDataFromUrl(url: string): Promise<StartPanel> {
    const response = await fetch(url, {cache: 'no-store'});

    if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
    }

    const data = await response.json() as Partial<StartPanelDto>;

    if (data.images && Array.isArray(data.images)) {
        const imageAssetsDatabase = inject(ImageAssetsStore);

        for (const image of data.images) {
            if (image.id && image.dataUri) {
                await imageAssetsDatabase.set(image);
            }
        }
    }

    return new StartPanel(data);
}
