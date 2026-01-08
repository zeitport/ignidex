import type {IconDto} from '#models/dto/iconDto.ts';
import {IconAssetsEntry} from '#models/idb/iconAssetsEntry.ts';
import {DatabaseConnector} from './databaseConnector.ts';

export class IconAssetsStore {
    private readonly iconAssetsStoreName = 'iconAssets';
    private readonly connector = new DatabaseConnector();

    async set(icon: IconDto): Promise<void> {
        const entry = new IconAssetsEntry(icon);
        await this.connector.set(this.iconAssetsStoreName, entry);
    }

    async get(id: string): Promise<IconAssetsEntry | null> {
        return await this.connector.get<IconAssetsEntry>(this.iconAssetsStoreName, id);
    }

    async has(id: string): Promise<boolean> {
        return await this.connector.has(this.iconAssetsStoreName, id);
    }

    async getAll(): Promise<Array<IconAssetsEntry>> {
        return await this.connector.getAll<IconAssetsEntry>(this.iconAssetsStoreName);
    }
}
