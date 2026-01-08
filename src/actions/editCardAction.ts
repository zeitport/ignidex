import {activeOverlay, selectedCard} from '../app/state.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class EditCardAction implements ActionInterface {
    run() {
        if (!selectedCard.value) return;

        activeOverlay.value = OverlayType.editBookmark;
    }
}
