import {inject} from '#app/injector.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {activeOverlay, activeSubOverlay} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class SwitchPanelAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);
    disabledHint?: string;

    run() {
        activeOverlay.value = OverlayType.switchPanel;
        activeSubOverlay.value = null;
    }

    async isDisabled(): Promise<boolean> {
        const panels = await this.startPanelsStore.getAll();
        const disabled = panels.length <= 1;
        if (disabled) {
            this.disabledHint = 'Only one panel exists';
        }
        return disabled;
    }
}
