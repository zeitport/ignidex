export const InsertPosition = {
    before: 'before',
    after: 'after'
} as const;

export type InsertPosition = typeof InsertPosition[keyof typeof InsertPosition];
