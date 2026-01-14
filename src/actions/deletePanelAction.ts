import {activeAction, activeOverlay, activeStartPanel} from '#state';
import {ActionConfirmation} from './actionConfirmation.ts';
import {ActionInterface} from './actionInterface.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {switchToFirstStartPanel} from '#core/switchToFirstStartPanel.ts';

export class DeletePanelAction implements ActionInterface {
    readonly confirmation = new ActionConfirmation({buttonLabel: 'Delete'});

    private startPanelsStore = inject(StartPanelsStore);

    run() {
        const startPanel = activeStartPanel.value;
        if (!startPanel) {
            return;
        }

        this.confirmation.message = `Do you want to delete panel "${startPanel.header?.title ?? 'Untitled'}"?`;

        activeAction.value = this;
        activeOverlay.value = OverlayType.confirmation;
    }

    async confirm() {
        const startPanel = activeStartPanel.value;

        if (!startPanel) {
            this.cancel();
            return;
        }

        await this.startPanelsStore.delete(startPanel.id);

        await switchToFirstStartPanel();

        this.cancel();
    }

    cancel() {
        activeAction.value = null;
        activeOverlay.value = null;
    }
}
