export const ImageAssetType = {
    unknown: 'unknown',
    icon: 'icon'
} as const;

export type ImageAssetType = typeof ImageAssetType[keyof typeof ImageAssetType];
