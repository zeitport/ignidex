export const HoverHintMode = {
    Off: 'off',
    Dark: 'dark',
    Highlighted: 'highlighted',
} as const;

export type HoverHintModeType = typeof HoverHintMode[keyof typeof HoverHintMode];
