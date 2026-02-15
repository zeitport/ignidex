import {StartPanel} from '#models/internal/startPanel.ts';
import {inject} from '#app/injector.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {activeStartPanel, activeRemoteUrl} from '#state';
import {ActionInterface} from './actionInterface.ts';

export class SwitchPanelBackAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    async run() {
        const currentPanel = activeStartPanel.value;
        const entries = await this.startPanelsStore.getAll();

        if (entries.length === 0) {
            return;
        }

        const currentIndex = entries.findIndex(entry => entry.id === currentPanel?.id);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : entries.length - 1;
        const previousEntry = entries[previousIndex];

        activeStartPanel.value = new StartPanel(previousEntry.startPanel);
        activeRemoteUrl.value = previousEntry.remoteUrl ?? null;
    }
}
