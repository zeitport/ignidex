import {inject} from '#inject';
import {Card} from '#models/internal/card.ts';
import {clonePanel} from '#models/mapper/clonePanel.ts';
import {activeStartPanel, cardCopy, selectedSection} from '#state';
import {createId} from '#utils/createId.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {ActionInterface} from './actionInterface.ts';

export class PasteCardToSectionAction implements ActionInterface {
    async run() {
        const copiedCard = cardCopy.value;
        const targetSection = selectedSection.value;
        const panel = activeStartPanel.value;

        if (!copiedCard || !targetSection || !panel) {
            return;
        }

        const targetGroup = targetSection.groups[0];

        // Clone the card with a new ID
        const clonedCard = new Card(structuredClone(copiedCard));
        clonedCard.id = createId();

        // Add the card to the first group
        targetGroup.cards.push(clonedCard);

        // Save the panel
        const store = inject(StartPanelsStore);
        await store.saveActivePanel();

        activeStartPanel.value = clonePanel(panel);

        // Clear the copy state
        cardCopy.value = null;
    }
}
