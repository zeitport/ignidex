export const HoverHintMode = {
    Off: 'off',
    Muted: 'muted',
    Highlighted: 'highlighted',
} as const;

export type HoverHintModeType = typeof HoverHintMode[keyof typeof HoverHintMode];
