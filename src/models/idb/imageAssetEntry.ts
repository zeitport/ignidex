import {ImageAssetType} from '#models/idb/ImageAssetType.ts';

export class ImageAssetEntry {
    id: string;
    source: string | null;
    type: ImageAssetType | null;
    dataUri: string | null;

    constructor(init: Partial<ImageAssetEntry> & {id: string}) {
        this.id = init.id;
        this.type = init.type ?? ImageAssetType.icon;
        this.source = init.source ?? null;
        this.dataUri = init.dataUri ?? null;
    }
}
