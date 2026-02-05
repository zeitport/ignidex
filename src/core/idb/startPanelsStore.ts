import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {query} from '#models/internal/query.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {Card} from '#models/internal/card.ts';
import {activeStartPanel} from '#state';
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
    async insertCard(group: CardGroup, card: Card): Promise<void> {
        console.info('Insert card', {group, card});

        group.cards.push(card);

        return this.saveActivePanel();
    }

    async saveActivePanel() {
        const activePanel = activeStartPanel.nonNullableValue;

        const entry = new StartPanelEntry({
            id: activePanel.id,
            anchor: activePanel.anchor,
            startPanel: activePanel
        });

        await this.set(entry).catch(error => console.error(error));
    }

    /**
     * Adds or updates a card in a group. Creates the group if it doesn't exist in the section.
     * Returns the updated StartPanel with re-instantiated class instances.
     */
    async updateCard(panel: StartPanel, card: Card): Promise<void> {
        console.info('Update card', {panel, card});

        const result = query.findCard(panel.sections, card.id);

        if (!result) {
            return;
        }

        // Replace the card in the group with the updated card
        result.group.cards = result.group.cards.map(item => item.id === card.id ? card : item);

        const entry = new StartPanelEntry({
            id: panel.id,
            anchor: panel.anchor,
            startPanel: panel
        });

        await this.set(entry).catch(error => console.error(error));
    }
}
