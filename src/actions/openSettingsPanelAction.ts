import {activeOverlay, activeSettingsPanelId} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class OpenSettingsPanelAction implements ActionInterface {
    constructor(private settingsPanelId: string) {}

    run() {
        console.log('OpenSettingsPanelAction', this);
        activeSettingsPanelId.value = this.settingsPanelId;
        activeOverlay.value = OverlayType.editSettings;
    }
}
