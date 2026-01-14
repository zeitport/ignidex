import {activeOverlay} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class AddSectionAction implements ActionInterface {
    run() {
        activeOverlay.value = OverlayType.newSection;
    }
}
