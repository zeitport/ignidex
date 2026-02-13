import {InsertPosition} from '#app/insertPosition.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {inject} from '#inject';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import type {Card} from '#models/internal/card.ts';
import type {CardGroup} from '#models/internal/cardGroup.ts';
import {query} from '#models/internal/query.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {clonePanel} from '#models/mapper/clonePanel.ts';
import {activeStartPanel} from '#state';

export class CardMover {
    private readonly panelStore: StartPanelsStore = inject(StartPanelsStore);

    async moveCardToPosition(sourceCard: Card, targetCard: Card, position: InsertPosition) {
        const clonedPanel = this.removeCardFromPanel(sourceCard.id);
        if (!clonedPanel) return;

        const result = query.findCard(clonedPanel.sections, targetCard.id);
        if (result) {
            const targetGroupCards = [];
            for (const card of result.group.cards) {
                if (card.id === targetCard.id) {
                    if (position === InsertPosition.before) {
                        targetGroupCards.push(sourceCard);
                        targetGroupCards.push(card);
                    } else if (position === InsertPosition.after) {
                        targetGroupCards.push(card);
                        targetGroupCards.push(sourceCard);
                    }
                } else {
                    targetGroupCards.push(card);
                }
            }
            result.group.cards = targetGroupCards;
        }

        await this.savePanel(clonedPanel);
    }

    async moveCardToGroup(sourceCard: Card, targetGroup: CardGroup) {
        const clonedPanel = this.removeCardFromPanel(sourceCard.id);
        if (!clonedPanel) return;

        const group = query.findGroup(clonedPanel.sections, targetGroup.id);
        if (group) {
            group.cards.push(sourceCard);
        }

        await this.savePanel(clonedPanel);
    }

    private removeCardFromPanel(cardId: string): StartPanel | null {
        const startPanel = activeStartPanel.value;
        if (!startPanel || !cardId) return null;

        const clonedPanel = clonePanel(startPanel);
        const result = query.findCard(clonedPanel.sections, cardId);
        if (result) {
            result.group.cards = result.group.cards.filter(item => item.id !== cardId);
        }

        return clonedPanel;
    }

    private async savePanel(panel: StartPanel) {
        const updatedEntry = new StartPanelEntry({
            id: panel.id,
            anchor: panel.anchor,
            startPanel: panel
        });

        await this.panelStore.set(updatedEntry);
        activeStartPanel.value = panel;
    }
}
