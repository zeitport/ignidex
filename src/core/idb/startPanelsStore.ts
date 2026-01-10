import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {DatabaseConnector} from './databaseConnector.ts';

export class StartPanelsStore {
    private readonly startPanelsStoreName = 'startPanels';
    private readonly connector = new DatabaseConnector();

    async set(entry: StartPanelEntry): Promise<void> {
        await this.connector.set(this.startPanelsStoreName, entry);
    }

    async get(id: string): Promise<StartPanelEntry | null> {
        return await this.connector.get<StartPanelEntry>(this.startPanelsStoreName, id);
    }

    async getByAnchor(anchor: string): Promise<StartPanelEntry | null> {
        return await this.connector.getByIndex<StartPanelEntry>(this.startPanelsStoreName, 'anchor', anchor);
    }

    async getAll(): Promise<Array<StartPanelEntry>> {
        return await this.connector.getAll<StartPanelEntry>(this.startPanelsStoreName);
    }

    async delete(id: string): Promise<void> {
        await this.connector.delete(this.startPanelsStoreName, id);
    }
}
