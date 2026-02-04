import {ImageAssetEntry, type ImageAssetEntryInit} from '#models/idb/imageAssetEntry.ts';
import {DatabaseConnector} from './databaseConnector.ts';

export class ImageAssetsStore {
    static readonly storeName = 'imageAssets';

    private readonly connector = new DatabaseConnector();

    async set(icon: ImageAssetEntryInit): Promise<void> {
        const entry = new ImageAssetEntry(icon);
        await this.connector.set(ImageAssetsStore.storeName, entry);
    }

    async get(id: string): Promise<ImageAssetEntry | null> {
        return await this.connector.get<ImageAssetEntry>(ImageAssetsStore.storeName, id);
    }

    async has(id: string): Promise<boolean> {
        return await this.connector.has(ImageAssetsStore.storeName, id);
    }

    async getAll(): Promise<Array<ImageAssetEntry>> {
        return await this.connector.getAll<ImageAssetEntry>(ImageAssetsStore.storeName);
    }

    static upgrade(db: IDBDatabase): void {
        if (!db.objectStoreNames.contains(ImageAssetsStore.storeName)) {
            db.createObjectStore(ImageAssetsStore.storeName, {keyPath: 'id'});
        }
    }
}
