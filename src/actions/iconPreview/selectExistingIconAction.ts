import {activeSubOverlay} from '#state';
import type {ActionInterface} from '../actionInterface.ts';
import {OverlayType} from '../../elements/overlays/overlayType.ts';

export class SelectExistingIconAction implements ActionInterface {
    run() {
        activeSubOverlay.value = OverlayType.selectIcon;
    }
}
