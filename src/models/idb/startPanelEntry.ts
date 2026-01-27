import {StartPanel} from '../internal/startPanel.ts';
export * from '../internal/startPanel.ts';
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

    /**
     * The start panel was created via a remote source.
     * A remote start panel is only available in read-only mode. It cannot be modified.
     */
    remoteUrl: string | null;

    startPanel: StartPanel;

    constructor(init: Partial<StartPanelEntry> & {id: string, startPanel: StartPanel}) {
        this.id = init.id;
        this.anchor = init.anchor ?? this.id;
        this.order = init.order ?? null;
        this.remoteUrl = init.remoteUrl ?? null;
        this.startPanel = init.startPanel;
    }
}
