import {StartPanel} from '../internal/startPanel.ts';

/**
 * Represents an entry in the IndexedDB for a StartPanel.
 */
export class StartPanelEntry {
    /**
     * The startPanel id
     */
    id: string;

    /**
     * The anchor is matched against the fragment of the location URL
     */
    anchor: string | null;

    startPanel: StartPanel;

    constructor(init: Partial<StartPanelEntry> & {id: string, startPanel: StartPanel}) {
        this.id = init.id;
        this.anchor = init.anchor ?? this.id;
        this.startPanel = init.startPanel;
    }
}
