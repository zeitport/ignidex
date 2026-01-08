import {activeOverlay} from '../app/state.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class SwitchPanelAction implements ActionInterface {
    run() {
        activeOverlay.value = OverlayType.switchPanel;
    }
}
