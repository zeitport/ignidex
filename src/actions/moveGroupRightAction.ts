import {CardGroup} from '#models/internal/cardGroup.ts';
import type {CardSection} from '#models/internal/cardSection.ts';
import {query} from '#models/internal/query.ts';
import {clonePanel} from '#models/mapper/clonePanel.ts';
import {selectedGroup, activeStartPanel} from '#state';
import {ActionInterface} from './actionInterface.ts';
import {inject} from '#app/injector.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class MoveGroupRightAction implements ActionInterface {
    private startPanelsStore = inject(StartPanelsStore);

    isDisabled() {
        const group = selectedGroup.value;
        const startPanel = activeStartPanel.value;

        if (!group || !startPanel) {
            return true;
        }

        const section = query.findSectionWithGroup(startPanel.sections, group.id);

        if (!section) {
            return true;
        }

        const groupIndex = this.getGroupIndex(section, group.id);

        return groupIndex === section.groups.length - 1;
    }

    async run() {
        const group = selectedGroup.nonNullableValue;
        const startPanel = activeStartPanel.nonNullableValue;
        const clonedPanel = clonePanel(startPanel);

        const section = query.findSectionWithGroup(clonedPanel.sections, group.id);
        const groupIndex: number = this.getGroupIndex(section, group.id);

        let groupMoved = false;

        if (section && groupIndex >= 0 && groupIndex < section.groups.length) {
            const newIndex = groupIndex + 1;
            const [movedGroup] = section.groups.splice(groupIndex, 1);

            section.groups.splice(newIndex, 0, movedGroup);
            groupMoved = true;
        }

        if (groupMoved) {
            const updatedEntry = new StartPanelEntry({
                id: clonedPanel.id,
                anchor: clonedPanel.anchor,
                startPanel: clonedPanel
            });

            await this.startPanelsStore.set(updatedEntry);
            activeStartPanel.value = clonedPanel;
        }
    }

    getGroupIndex(section: CardSection | undefined, groupId: string): number {
        return section?.groups.findIndex((item: CardGroup) => item.id === groupId) ?? -1;
    }
}
