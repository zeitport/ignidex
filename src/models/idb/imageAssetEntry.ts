import {ImageAssetType} from '#models/idb/ImageAssetType.ts';

export class ImageAssetEntry {
    id: string;
    type: ImageAssetType | null;
    source: string | null;
    dataUri: string | null;

    constructor(init: ImageAssetEntryInit) {
        this.id = init.id;
        this.type = init.type ?? ImageAssetType.icon;
        this.source = init.source ?? null;
        this.dataUri = init.dataUri ?? null;
    }
}

export type ImageAssetEntryInit = {
    id: string;
    type?: ImageAssetType | null;
    source?: string | null;
    dataUri?: string | null;
};
