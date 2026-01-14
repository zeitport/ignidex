import {activeOverlay, selectedGroup} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class EditGroupAction implements ActionInterface {
    run() {
        if (!selectedGroup.value) {
            return;
        }
        activeOverlay.value = OverlayType.editGroup;
    }
}
