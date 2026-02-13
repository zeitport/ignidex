export const IconStyle = {
    none: 'none',
    mask: 'mask',
    maskAccent: 'maskAccent'
} as const;

export type IconStyle = typeof IconStyle[keyof typeof IconStyle];
