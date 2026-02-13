import {activeOverlay, selectedSection} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class AddSectionAction implements ActionInterface {
    run() {
        selectedSection.value = null;
        activeOverlay.value = OverlayType.newSection;
    }
}
