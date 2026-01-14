import {selectedCard} from '#state';
import {ActionInterface} from './actionInterface.ts';

export class OpenInNewTabAction implements ActionInterface {
    run() {
        const card = selectedCard.value;
        if (!card || !card.url) return;

        window.open(card.url, '_blank');
    }
}
