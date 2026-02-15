import {selectedPanelEntry, panelOrderVersion} from '#state';
import {ActionInterface} from './actionInterface.ts';
import {inject} from '#app/injector.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class MovePanelAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    constructor(private direction: 'up' | 'down') {}

    async run() {
        const panelEntry = selectedPanelEntry.value;

        if (!panelEntry) {
            return;
        }

        const allPanels = await this.startPanelsStore.getAll();
        const currentPanel = allPanels.find(entry => entry.id === panelEntry.id);

        if (!currentPanel) {
            return;
        }

        // Use ±1.5 to position the panel between its current position and the adjacent one.
        // For example, if panels have orders [0, 1, 2] and we move panel at order 2 up:
        // - New order becomes 2 + (-1.5) = 0.5, which sorts between 0 and 1
        // - After recalculation, orders become [0, 1, 2] with the moved panel now at index 1
        const currentOrder = currentPanel.order ?? 0;
        const delta = this.direction === 'up' ? -1.5 : 1.5;
        currentPanel.order = currentOrder + delta;

        await this.recalculateOrder(allPanels);
        panelOrderVersion.value++;
    }

    private async recalculateOrder(panels: StartPanelEntry[]): Promise<void> {
        // Sort by order (panels array is already sorted from getAll, but we modified order values)
        panels.sort((first, second) => {
            const orderFirst = first.order ?? Number.MAX_SAFE_INTEGER;
            const orderSecond = second.order ?? Number.MAX_SAFE_INTEGER;
            return orderFirst - orderSecond;
        });

        for (let index = 0; index < panels.length; index++) {
            const panel = panels[index];
            if (panel.order !== index) {
                const updatedEntry = new StartPanelEntry({
                    id: panel.id,
                    anchor: panel.anchor,
                    order: index,
                    startPanel: panel.startPanel
                });
                await this.startPanelsStore.set(updatedEntry);
            }
        }
    }
}
