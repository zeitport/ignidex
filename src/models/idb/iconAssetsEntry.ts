export class IconAssetsEntry {
    id: string;
    source: string | null;
    dataUri: string | null;

    constructor(init: Partial<IconAssetsEntry> & {id: string}) {
        this.id = init.id;
        this.source = init.source ?? null;
        this.dataUri = init.dataUri ?? null;
    }
}
