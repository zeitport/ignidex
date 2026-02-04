import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {Card} from '#models/internal/card.ts';
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

    async getByRemoteUrl(remoteUrl: string): Promise<StartPanelEntry | null> {
        return await this.connector.getByIndex<StartPanelEntry>(this.startPanelsStoreName, 'remoteUrl', remoteUrl);
    }

    /**
     * Returns all panels sorted by order (ascending).
     * Panels without an order value are placed at the end.
     */
    async getAll(): Promise<Array<StartPanelEntry>> {
        const entries = await this.connector.getAll<StartPanelEntry>(this.startPanelsStoreName);
        return entries.sort((first, second) => {
            const orderFirst = first.order ?? Number.MAX_SAFE_INTEGER;
            const orderSecond = second.order ?? Number.MAX_SAFE_INTEGER;
            return orderFirst - orderSecond;
        });
    }

    async delete(id: string): Promise<void> {
        await this.connector.delete(this.startPanelsStoreName, id);
    }

    async getNextOrder(): Promise<number> {
        const allPanels = await this.getAll();
        if (allPanels.length === 0) {
            return 0;
        }
        const maxOrder = Math.max(...allPanels.map(panel => panel.order ?? 0));
        return maxOrder + 1;
    }

    /**
     * Adds or updates a card in a group. Creates the group if it doesn't exist in the section.
     * Returns the updated StartPanel with re-instantiated class instances.
     */
    async upsertCard(panel: StartPanel, group: CardGroup, card: Card): Promise<StartPanel> {
        const clonedPanel = StartPanel.clone(panel);

        const targetGroup = clonedPanel.findGroup(group.id);
        if (!this.assertGroup(targetGroup) || !card.id) {
             throw new Error('Group does not exist');
        }

        targetGroup.upsertCard(card);

        const entry = new StartPanelEntry({
            id: clonedPanel.id,
            anchor: clonedPanel.anchor,
            startPanel: clonedPanel
        });
        await this.set(entry);

        return clonedPanel;
    }

    private assertGroup(group: CardGroup | null | undefined): group is CardGroup {
        return group !== null && group !== undefined;
    }
}
