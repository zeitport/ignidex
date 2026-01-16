import type {ImageAssetType} from '#models/idb/ImageAssetType.ts';

export interface ImageDto {
    id: string;
    type?: ImageAssetType;
    source: string | null;
    dataUri: string | null;
}
