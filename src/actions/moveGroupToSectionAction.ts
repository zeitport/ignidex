import {activeOverlay, groupToMove, selectedGroup} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class MoveGroupToSectionAction implements ActionInterface {
    run() {
        groupToMove.value = selectedGroup.value;
        activeOverlay.value = OverlayType.selectSection;
    }
}
