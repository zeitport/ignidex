import {activeOverlay, cardToMove, selectedCard} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class MoveBookmarkToGroupAction implements ActionInterface {
    constructor() {}

    run() {
        cardToMove.value = selectedCard.value;
        activeOverlay.value = OverlayType.selectSection;
        console.log('[MoveBookmarkToGroup] run', [cardToMove.value, activeOverlay.value]);
    }
}
