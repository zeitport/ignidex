import {activeOverlay, selectedGroup} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class AddGroupAction implements ActionInterface {
    run() {
        selectedGroup.value = null;
        activeOverlay.value = OverlayType.editGroup;
    }
}
