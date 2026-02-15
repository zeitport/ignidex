import {Card} from '#models/internal/card.ts';
import {clonePanel} from '#models/mapper/clonePanel.ts';
import {selectedCard, activeAction, activeOverlay, activeStartPanel} from '#state';
import {ActionConfirmation} from './actionConfirmation.ts';
import {ActionInterface} from './actionInterface.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {inject} from '#app/injector.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class DeleteCardAction implements ActionInterface {
    readonly confirmation = new ActionConfirmation({buttonLabel: 'Delete'});

    private startPanelsStore = inject(StartPanelsStore);

    run() {
        const card = selectedCard.value;
        if (!card) {
            return;
        }

        this.confirmation.message = `Do you want to delete "${card.name}"?`;

        activeAction.value = this;
        activeOverlay.value = OverlayType.confirmation;
    }

    async confirm() {
        console.log('Confirming delete card action');

        const card = selectedCard.value;
        const startPanel = activeStartPanel.value;

        if (!card || !startPanel) {
            return;
        }

        // Clone the current start panel to avoid in-place mutation
        const clonedPanel = clonePanel(startPanel);

        // Remove the card from the cloned data
        let cardRemoved = false;
        for (const section of clonedPanel.sections) {
            for (const group of section.groups) {
                const cardIndex = group.cards.findIndex((item: Card) => item.id === card.id);
                if (cardIndex !== -1) {
                    group.cards.splice(cardIndex, 1);
                    cardRemoved = true;
                    break;
                }
            }
            if (cardRemoved) break;
        }

        if (cardRemoved) {
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
