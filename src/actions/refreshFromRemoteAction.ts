import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {loadDataFromUrl} from '#core/loadDataFromUrl.ts';
import {activeStartPanel, activeRemoteUrl, activeOverlay, messageOverlayContent} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {i18n} from '#i18n';

export class RefreshFromRemoteAction implements ActionInterface {
    async run() {
        const remoteUrl = activeRemoteUrl.value;
        const currentPanel = activeStartPanel.value;

        if (!remoteUrl || !currentPanel) {
            console.error('No remote URL to refresh from.');
            return;
        }

        const startPanelsStore = inject(StartPanelsStore);
        const entry = await startPanelsStore.get(currentPanel.id);

        if (!entry) {
            console.error('Could not find panel entry.');
            return;
        }

        try {
            const loadedPanel = await loadDataFromUrl(remoteUrl);

            // Update existing entry with new data, keeping id, anchor, order
            const updatedPanel = new StartPanel({
                ...loadedPanel,
                id: entry.id,
                anchor: entry.anchor
            });

            const updatedEntry = new StartPanelEntry({
                id: entry.id,
                anchor: entry.anchor,
                order: entry.order,
                remoteUrl: remoteUrl,
                startPanel: updatedPanel
            });

            await startPanelsStore.set(updatedEntry);
            activeStartPanel.value = updatedPanel;
            console.log(`Refreshed panel from remote: ${remoteUrl}`);
        } catch (error) {
            console.error('Failed to refresh from remote:', error);
            messageOverlayContent.value = i18n.token.remotePanel.refreshError;
            activeOverlay.value = OverlayType.message;
        }
    }
}
