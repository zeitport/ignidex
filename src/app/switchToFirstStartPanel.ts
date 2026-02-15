import {activeOverlay, activeStartPanel, activeRemoteUrl} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {inject} from '#app/injector.ts';

/**
 * Switches to the first available start panel in the database.
 * If no panels exist, shows the "Getting Started" overlay.
 */
export async function switchToFirstStartPanel(): Promise<void> {
    const startPanelsStore = inject(StartPanelsStore);
    const allPanels = await startPanelsStore.getAll();

    if (allPanels.length > 0) {
        activeStartPanel.value = allPanels[0].startPanel;
        activeRemoteUrl.value = allPanels[0].remoteUrl ?? null;
    } else {
        activeStartPanel.value = null;
        activeRemoteUrl.value = null;
        activeOverlay.value = OverlayType.gettingStarted;
    }
}
