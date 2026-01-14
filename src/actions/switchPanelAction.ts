import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {activeOverlay} from '../app/state.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';

export class SwitchPanelAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    run() {
        activeOverlay.value = OverlayType.switchPanel;
    }

    async isDisabled(): Promise<boolean> {
        const panels = await this.startPanelsStore.getAll();
        return panels.length <= 1;
    }
}
