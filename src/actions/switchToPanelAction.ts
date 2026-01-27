import {StartPanel} from '#models/internal/startPanel.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {activeStartPanel, activeRemoteUrl} from '#state';
import {ActionInterface} from './actionInterface.ts';

export class SwitchToPanelAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    constructor(private panelIndex: number) {}

    async run() {
        const entries = await this.startPanelsStore.getAll();
        const targetIndex = this.panelIndex - 1;

        if (targetIndex < 0 || targetIndex >= entries.length) {
            return;
        }

        const targetEntry = entries[targetIndex];

        activeStartPanel.value = new StartPanel(targetEntry.startPanel);
        activeRemoteUrl.value = targetEntry.remoteUrl ?? null;
    }
}
