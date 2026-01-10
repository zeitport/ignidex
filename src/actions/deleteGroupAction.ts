import {StartPanel} from '#models/internal/startPanel.ts';
import {selectedGroup, activeAction, activeOverlay, activeStartPanel} from '../app/state.ts';
import {ActionConfirmation} from './actionConfirmation.ts';
import {ActionInterface} from './actionInterface.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class DeleteGroupAction implements ActionInterface {
    readonly confirmation = new ActionConfirmation({buttonLabel: 'Delete'});

    private startPanelsStore = inject(StartPanelsStore);

    run() {
        const group = selectedGroup.value;
        if (!group) {
            return;
        }

        this.confirmation.message = `Do you want to delete group "${group.name ?? 'Untitled'}"?`;

        activeAction.value = this;
        activeOverlay.value = OverlayType.confirmation;
    }

    async confirm() {
        const group = selectedGroup.value;
        const startPanel = activeStartPanel.value;

        if (!group || !startPanel) {
            this.cancel();
            return;
        }

        // Clone the current start panel to avoid in-place mutation
        const clonedPanel = StartPanel.clone(startPanel);

        // Remove the group from the cloned data
        let groupRemoved = false;
        for (const section of clonedPanel.sections) {
            const groupIndex = section.groups.findIndex(item => item.id === group.id);
            if (groupIndex !== -1) {
                section.groups.splice(groupIndex, 1);
                groupRemoved = true;
                break;
            }
        }

        if (groupRemoved) {
            const updatedEntry = new StartPanelEntry({
                id: clonedPanel.id,
                anchor: clonedPanel.anchor,
                startPanel: clonedPanel
            });

            await this.startPanelsStore.set(updatedEntry);
            activeStartPanel.value = clonedPanel;
        }

        this.cancel();
    }

    cancel() {
        activeAction.value = null;
        activeOverlay.value = null;
        selectedGroup.value = null;
    }
}
