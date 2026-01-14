import {activeOverlay, selectedCard} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class AddCardAction implements ActionInterface {
    run() {
        selectedCard.value = null;
        activeOverlay.value = OverlayType.editBookmark;
    }
}
