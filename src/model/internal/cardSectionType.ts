export const CardSectionType = {
    Highlight: 'highlight',
    Groups: 'groups',
} as const;

export type CardSectionType = typeof CardSectionType[keyof typeof CardSectionType];
