import {activeOverlay, selectedGroup} from '../app/state.ts';
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
