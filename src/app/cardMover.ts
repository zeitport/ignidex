import {InsertPosition} from '#app/insertPosition.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {inject} from '#inject';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import type {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {clonePanel} from '#models/mapper/clonePanel.ts';
import {activeStartPanel} from '#state';

export class CardMover {
    private readonly panelStore: StartPanelsStore = inject(StartPanelsStore);

    async moveCardToPosition(sourceCard: Card, targetCard: Card, position: InsertPosition) {
        console.log('Moving card', sourceCard.id, 'to', targetCard.id, 'at', position);

        const startPanel = activeStartPanel.value;
        if (!startPanel || !sourceCard.id || !targetCard.id) return;

        const clonedPanel = clonePanel(startPanel);

        // Find and remove the dragged card from its current location
        const sourceGroup = this.findGroupByCardId(clonedPanel, sourceCard.id);

        if (sourceGroup) {
            sourceGroup.cards = sourceGroup.cards.filter(item => item.id !== sourceCard.id);
        }

        const targetGroup = this.findGroupByCardId(clonedPanel, targetCard.id);

        if (targetGroup) {
            const targetGroupCards = [];

            for(const card of targetGroup.cards) {
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

            targetGroup.cards = targetGroupCards;
        }

        // Save to database
        const updatedEntry = new StartPanelEntry({
            id: clonedPanel.id,
            anchor: clonedPanel.anchor,
            startPanel: clonedPanel
        });

        await this.panelStore.set(updatedEntry);
        activeStartPanel.value = clonedPanel;
    }

    findGroupByCardId(panel: StartPanel, cardId: string): CardGroup | null {
        for (const section of panel.sections) {
            for (const group of section.groups) {
                if (group.cards.some(card => card.id === cardId)) {
                    return group;
                }
            }
        }

        return null;
    }
}
