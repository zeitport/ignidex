import {inject} from '#core/injector.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {StartPanel} from '../models/internal/startPanel.ts';

/**
 * '/store/test.json'
 * @param url
 */
export async function loadDataFromUrl(url: string): Promise<StartPanel> {
    try {
        const response = await fetch(url, {cache: 'no-store'});
        if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
        const data = await response.json();

        if (data.icons && Array.isArray(data.icons)) {
            const imageAssetsDatabase = inject(ImageAssetsStore);
            for (const icon of data.icons) {
                if (icon.id && icon.dataUri) {
                    await imageAssetsDatabase.set(icon);
                }
            }
        }

        return new StartPanel(data);
    } catch (error) {
        console.error('Failed to load /store/test.json', error);
        return new StartPanel({header: {title: 'Oops!'}});
    }
}
