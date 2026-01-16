export const CornerPosition = {
    TopLeft: 'topLeft',
    TopRight: 'topRight',
    BottomLeft: 'bottomLeft',
    BottomRight: 'bottomRight',
} as const;

export type CornerPosition = typeof CornerPosition[keyof typeof CornerPosition];
