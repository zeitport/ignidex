import {StartPanel} from '#models/internal/startPanel.ts';
import {selectedSection, activeAction, activeOverlay, activeStartPanel} from '../app/state.ts';
import {ActionConfirmation} from './actionConfirmation.ts';
import {ActionInterface} from './actionInterface.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class DeleteSectionAction implements ActionInterface {
    readonly confirmation = new ActionConfirmation({buttonLabel: 'Delete'});

    private startPanelsStore = inject(StartPanelsStore);

    run() {
        const section = selectedSection.value;
        if (!section) {
            return;
        }

        this.confirmation.message = `Do you want to delete section "${section.name ?? 'Untitled'}"?`;

        activeAction.value = this;
        activeOverlay.value = OverlayType.confirmation;
    }

    async confirm() {
        const section = selectedSection.value;
        const startPanel = activeStartPanel.value;

        if (!section || !startPanel) {
            this.cancel();
            return;
        }

        // Clone the current start panel to avoid in-place mutation
        const clonedPanel = StartPanel.clone(startPanel);

        // Remove the section from the cloned data
        const sectionIndex = clonedPanel.sections.findIndex(item => item.id === section.id);
        if (sectionIndex !== -1) {
            clonedPanel.sections.splice(sectionIndex, 1);

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
        selectedSection.value = null;
    }
}
