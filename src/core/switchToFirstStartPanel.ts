import {activeOverlay, activeStartPanel} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {StartPanelsStore} from './idb/startPanelsStore.ts';
import {inject} from '#inject';

/**
 * Switches to the first available start panel in the database.
 * If no panels exist, shows the "Getting Started" overlay.
 */
export async function switchToFirstStartPanel(): Promise<void> {
    const startPanelsStore = inject(StartPanelsStore);
    const allPanels = await startPanelsStore.getAll();

    if (allPanels.length > 0) {
        activeStartPanel.value = allPanels[0].startPanel;
    } else {
        activeStartPanel.value = null;
        activeOverlay.value = OverlayType.gettingStarted;
    }
}
