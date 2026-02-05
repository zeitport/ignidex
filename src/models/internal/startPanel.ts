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
        this.header = init.header ?? new StartPanelHeader();
        this.sections = init.sections ?? [];
    }
}

