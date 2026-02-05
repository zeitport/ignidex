import {cardCopy, selectedCard} from '#state';
import {ActionInterface} from './actionInterface.ts';

export class CopyCardAction implements ActionInterface {
    run() {
        cardCopy.value = selectedCard.value;
        selectedCard.value = null;
    }
}
