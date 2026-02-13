import type {IconStyle} from '#models/internal/iconStyle.ts';

export interface ActiveIconPreview {
    dataUri: string | null;
    source: string | null;
    assetId: string | null;
    iconStyle: IconStyle;
}
