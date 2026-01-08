import {StartPanel} from '#models/internal/startPanel.ts';
import {selectedSection, activeStartPanel} from '../app/state.ts';
import {ActionInterface} from './actionInterface.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class MoveSectionAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    constructor(private direction: 'up' | 'down') {}

    async run() {
        const section = selectedSection.value;
        const startPanel = activeStartPanel.value;

        if (!section || !startPanel) {
            return;
        }

        const clonedPanel = StartPanel.clone(startPanel);

        const sectionIndex = clonedPanel.sections.findIndex(item => item.id === section.id);

        if (sectionIndex !== -1) {
            const newIndex = this.direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
            if (newIndex >= 0 && newIndex < clonedPanel.sections.length) {
                const [movedSection] = clonedPanel.sections.splice(sectionIndex, 1);
                clonedPanel.sections.splice(newIndex, 0, movedSection);

                const updatedEntry = new StartPanelEntry({
                    id: clonedPanel.id,
                    anchor: clonedPanel.anchor,
                    startPanel: clonedPanel
                });

                await this.startPanelsStore.set(updatedEntry);
                activeStartPanel.value = clonedPanel;
            }
        }
    }
}
