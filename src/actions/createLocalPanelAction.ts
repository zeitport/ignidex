import {inject} from '#app/injector.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {activeStartPanel, activeRemoteUrl} from '#state';
import {ActionInterface} from './actionInterface.ts';
import {createId} from '#utils/createId.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';

export class CreateLocalPanelAction implements ActionInterface {
    async run() {
        const sourcePanel = activeStartPanel.value;
        if (!sourcePanel) {
            console.error('No active start panel to copy.');
            return;
        }

        const startPanelsStore = inject(StartPanelsStore);

        let id = sourcePanel.id;
        const sourcePanelEntry = await startPanelsStore.get(id);

        // ID logic: If a panel with the same ID already exists in the local store,
        // we generate a new unique ID to avoid overwriting the existing one.
        if (sourcePanelEntry) {
            id = createId();
        }

        let anchor = sourcePanel.anchor;

        // Anchor logic: Ensure the anchor is unique across all local panels.
        // If the anchor is already in use by another panel, we default to using the (potentially new) ID as the anchor.
        if (anchor) {
            const existingAnchor = await startPanelsStore.getByAnchor(anchor);

            if (existingAnchor) {
                anchor = id;
            }
        } else {
            anchor = id;
        }

        const newPanel = new StartPanel({
            ...sourcePanel,
            id: id,
            anchor: anchor
        });

        const nextOrder = await startPanelsStore.getNextOrder();
        const newEntry = new StartPanelEntry({
            id: id,
            anchor: newPanel.anchor,
            order: nextOrder,
            remoteUrl: null,  // Ensure local panels have no remoteUrl
            startPanel: newPanel
        });


        await startPanelsStore.set(newEntry);

        // If the sourcePanelEntry is a remote panel, we delete the reference from the store.
        if (sourcePanelEntry?.remoteUrl) {
            await startPanelsStore.delete(sourcePanelEntry.id);
        }

        activeStartPanel.value = newPanel;

        // Local panels have no remoteUrl
        activeRemoteUrl.value = null;
    }
}
