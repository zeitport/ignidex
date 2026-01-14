import {inject} from '#core/injector.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import {StartPanel} from '../models/internal/startPanel.ts';
import {StartPanelHeader} from '../models/internal/startPanelHeader.ts';

/**
 * '/store/test.json'
 * @param url
 */
export async function loadDataFromUrl(url: string): Promise<StartPanel> {
    try {
        const response = await fetch(url, {cache: 'no-store'});

        if (!response.ok) throw new Error(`Failed to load: ${response.status}`);

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
    } catch (error) {
        console.error('Failed to load from url', error);
        return new StartPanel({header: new StartPanelHeader({title: 'Oops!'})});
    }
}
