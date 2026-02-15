import {activeAction, activeOverlay, activeSubOverlay, activeSettingsPanelId} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {removeSettingsUrlParameter} from '#app/settingsUrlParameter.ts';
import type {ActionInterface} from './actionInterface.ts';

export class CloseOverlayAction implements ActionInterface {
    run(this: void) {
        if (activeSubOverlay.value !== null) {
            activeSubOverlay.value = null;
        } else {
            // Remove settings URL parameter if closing settings overlay
            if (activeOverlay.value === OverlayType.editSettings) {
                activeSettingsPanelId.value = null;
                removeSettingsUrlParameter();
            }
            activeOverlay.value = null;
        }

        const action = activeAction.value;
        if (action?.cancel) {
            action.cancel();
        }
    }
}
