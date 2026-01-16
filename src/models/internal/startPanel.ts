import type {CardGroup} from '#models/internal/cardGroup.ts';
import {createId} from '#utils/createId.ts';
import {CardSection} from './cardSection.ts';
import {StartPanelHeader} from './startPanelHeader.ts';

export class StartPanel {
    id: string;
    /**
     * The anchor is matched against the fragment of the location URL
     */
    anchor: string | null;

    header: StartPanelHeader;

    sections: Array<CardSection>;

    constructor(init: Partial<StartPanel>) {
        this.id = init.id ?? createId();
        this.anchor = init.anchor ?? this.id;
        this.header = new StartPanelHeader(init.header ?? {});
        this.sections = (init.sections ?? []).map(section => new CardSection(section));
    }

    static clone(startPanel: StartPanel) {
        return new StartPanel(structuredClone(startPanel));
    }

    findSectionWithGroup(groupId: string): CardSection | undefined {
        const filterGroupId = (item: CardGroup) => item.id === groupId;

        return this.sections.find((section: CardSection) => section.groups.find(filterGroupId));
    }
}
