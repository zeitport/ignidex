import {inject} from '#inject';
import {Card} from '#models/internal/card.ts';
import {clonePanel} from '#models/mapper/clonePanel.ts';
import {activeStartPanel, cardCopy, selectedGroup} from '#state';
import {createId} from '#utils/createId.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {ActionInterface} from './actionInterface.ts';

export class PasteCardToGroupAction implements ActionInterface {
    async run() {
        const copiedCard = cardCopy.value;
        const targetGroup = selectedGroup.value;
        const panel = activeStartPanel.value;

        if (!copiedCard || !targetGroup || !panel) {
            return;
        }

        // Clone the card with a new ID
        const clonedCard = new Card(structuredClone(copiedCard));
        clonedCard.id = createId();

        // Find the target group in the panel and add the card
        targetGroup.cards.push(clonedCard);

        // Save the panel
        const store = inject(StartPanelsStore);
        await store.saveActivePanel();

        activeStartPanel.value = clonePanel(panel);

        // Clear the copy state
        cardCopy.value = null;
    }
}
