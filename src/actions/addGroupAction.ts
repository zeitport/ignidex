import {activeOverlay, selectedGroup} from '../app/state.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class AddGroupAction implements ActionInterface {
    run() {
        selectedGroup.value = null;
        activeOverlay.value = OverlayType.editGroup;
    }
}
