import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {activeOverlay} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class SwitchPanelAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);
    disabledHint?: string;

    run() {
        activeOverlay.value = OverlayType.switchPanel;
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
