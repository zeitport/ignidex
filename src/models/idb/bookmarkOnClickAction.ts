export const BookmarkOnClickAction = {
    open: 'open',
    openInNewTab: 'openInNewTab',
} as const;

export type BookmarkOnClickActionType = typeof BookmarkOnClickAction[keyof typeof BookmarkOnClickAction];
