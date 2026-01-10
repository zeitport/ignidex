export const OverlayType = {
    editBookmark: 'editBookmark',
    editGroup: 'editGroup',
    editSection: 'editSection',
    editSettings: 'editSettings',
    switchPanel: 'switchPanel',
    newPanel: 'newPanel',
    editPanel: 'editPanel',
    newSection: 'newSection',
    editHighlightSection: 'editHighlightSection',
    editGroupsSection: 'editGroupsSection',
    gettingStarted: 'gettingStarted',
    confirmation: 'confirmation',
    selectSection: 'selectSection',
    selectGroup: 'selectGroup',
    message: 'message'
} as const;

export type OverlayType = typeof OverlayType[keyof typeof OverlayType];
