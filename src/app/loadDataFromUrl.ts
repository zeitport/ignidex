import {inject} from '#app/injector.ts';
import {ImageAssetsStore} from '../idb/imageAssetsStore.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import {mapDtoToStartPanel} from '#models/mapper/mapDtoToModel.ts';
import {StartPanel} from '#models/internal/startPanel.ts';

/**
 * Loads a StartPanelDto from a remote URL.
 * @param url The URL to fetch the JSON from
 * @throws Error if fetching or parsing fails
 */
export async function loadDataFromUrl(url: string): Promise<StartPanel> {
    const response = await fetch(url, {cache: 'no-store'});

    if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
    }

    const data = await response.json() as StartPanelDto;

    if (data.images && Array.isArray(data.images)) {
        const imageAssetsDatabase = inject(ImageAssetsStore);

        for (const image of data.images) {
            if (image.id && image.dataUri) {
                await imageAssetsDatabase.set(image);
            }
        }
    }

    return mapDtoToStartPanel(data);
}
