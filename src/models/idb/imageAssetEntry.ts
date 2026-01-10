export class ImageAssetEntry {
    id: string;
    source: string | null;
    dataUri: string | null;

    constructor(init: Partial<ImageAssetEntry> & {id: string}) {
        this.id = init.id;
        this.source = init.source ?? null;
        this.dataUri = init.dataUri ?? null;
    }
}
