import {selectedCard} from '../app/state.ts';
import {ActionInterface} from './actionInterface.ts';

export class OpenInNewTabAction implements ActionInterface {
    run() {
        const card = selectedCard.value;
        if (!card || !card.url) return;

        window.open(card.url, '_blank');
    }
}
