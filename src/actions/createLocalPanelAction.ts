import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/startPanelsStore.ts';
import {activeStartPanel} from '../app/state.ts';
import {ActionInterface} from './actionInterface.ts';
import {createId} from '#utils/createId.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';

export class CreateLocalPanelAction implements ActionInterface {
    async run() {
        const startPanel = activeStartPanel.value;
        if (!startPanel) {
            console.error('No active start panel to copy.');
            return;
        }

        const startPanelsStore = inject(StartPanelsStore);

        let id = startPanel.id;
        const existingPanel = await startPanelsStore.get(id);

        // ID logic: If a panel with the same ID already exists in the local store,
        // we generate a new unique ID to avoid overwriting the existing one.
        if (existingPanel) {
            id = createId();
        }

        let anchor = startPanel.anchor;

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

        const newStartPanel = new StartPanel({
            ...startPanel,
            id: id,
            anchor: anchor
        });

        const newEntry = new StartPanelEntry({
            id: id,
            anchor: newStartPanel.anchor,
            startPanel: newStartPanel
        });

        await startPanelsStore.set(newEntry);
        activeStartPanel.value = newStartPanel;
        console.log(`Copied active panel to local storage with ID: ${id}`);
    }
}
