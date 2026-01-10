import {Card} from '#models/internal/card.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {selectedCard, activeStartPanel} from '../app/state.ts';
import {ActionInterface} from './actionInterface.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class MoveCardAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    constructor(private direction: 'up' | 'down') {}

    async run() {
        const card = selectedCard.value;
        const startPanel = activeStartPanel.value;

        if (!card || !startPanel) {
            return;
        }

        const clonedPanel = StartPanel.clone(startPanel);

        let cardMoved = false;
        for (const section of clonedPanel.sections) {
            for (const group of section.groups) {
                const cardIndex = group.cards.findIndex((item: Card) => item.id === card.id);
                if (cardIndex !== -1) {
                    const newIndex = this.direction === 'up' ? cardIndex - 1 : cardIndex + 1;
                    if (newIndex >= 0 && newIndex < group.cards.length) {
                        const [movedCard] = group.cards.splice(cardIndex, 1);
                        group.cards.splice(newIndex, 0, movedCard);
                        cardMoved = true;
                    }
                    break;
                }
            }
            if (cardMoved) break;
        }

        if (cardMoved) {
            const updatedEntry = new StartPanelEntry({
                id: clonedPanel.id,
                anchor: clonedPanel.anchor,
                startPanel: clonedPanel
            });

            await this.startPanelsStore.set(updatedEntry);
            activeStartPanel.value = clonedPanel;
        }
    }
}
