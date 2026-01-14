import {StartPanel} from '#models/internal/startPanel.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {activeStartPanel} from '#state';
import {ActionInterface} from './actionInterface.ts';

export class SwitchPanelNextAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    async run() {
        const currentPanel = activeStartPanel.value;
        const entries = await this.startPanelsStore.getAll();

        if (entries.length === 0) {
            return;
        }

        const currentIndex = entries.findIndex(entry => entry.id === currentPanel?.id);
        const nextIndex = currentIndex < entries.length - 1 ? currentIndex + 1 : 0;
        const nextEntry = entries[nextIndex];

        activeStartPanel.value = new StartPanel(nextEntry.startPanel);
    }
}
