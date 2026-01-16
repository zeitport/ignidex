import {activeAction, activeOverlay, activeSubOverlay} from '#state';
import type {ActionInterface} from './actionInterface.ts';

export class CloseOverlayAction implements ActionInterface {
    run(this: void) {
        if (activeSubOverlay.value !== null) {
            activeSubOverlay.value = null;
        } else {
            activeOverlay.value = null;
        }

        const action = activeAction.value;
        if (action?.cancel) {
            action.cancel();
        }
    }
}
