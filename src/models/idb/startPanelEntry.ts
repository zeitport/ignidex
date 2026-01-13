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

    /**
     * Order in the panel list (lower values appear first)
     * Can be null for panels created before ordering was added
     * @since 0.4.0
     */
    order: number | null;

    startPanel: StartPanel;

    constructor(init: Partial<StartPanelEntry> & {id: string, startPanel: StartPanel}) {
        this.id = init.id;
        this.anchor = init.anchor ?? this.id;
        this.order = init.order ?? null;
        this.startPanel = init.startPanel;
    }
}
