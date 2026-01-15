export const tokens = {
    keyboardShortcut: {
        switchPanel: 'Open panel switcher',
        panelBack: 'Go to previous panel',
        panelNext: 'Go to next panel',
        openSettings: 'Open settings',
        closeOverlay: 'Close overlay'
    },
    hints: {
        bookmark: '[LMB] open; [CTRL] + [LMB] open in new tab; [RMB] bookmark menu',
        startPanelHeader: '[RMB] panel menu; [🠜] go back; [🠞] go forward',
        switchPanel: '[LMB] Select another panel; [🠜] go back; [🠞] go forward',
        editPanel: 'Edit current panel',
        addSectionToPanel: 'Add new section to panel',
        deletePanel: '[LMB] + [?] Delete current panel',
        createNewPanel: 'Create a new panel',
        exportJson: 'Export data as JSON file',
        createLocalPanel: '[LMB] Create a copy of the current panel; A remote panel is then a local panel.',
        openSettings: '[LMB] or [F1] opens the app settings',
        editGroup: 'Edit group',
        addBookmarkToGroup: 'Add new bookmark to group',
        deleteGroup: '[LMB] + [?] Delete group',
        editSection: 'Edit section',
        addGroupToSection: 'Add new group to section',
        deleteSection: 'Delete section',
        addBookmarkToSection: 'Add new bookmark to section',
        iconPreviewPaste: '[LMB] or [CTRL] + [V] Paste icon from clipboard (SVG, URL, or data URI)',
        iconPreviewCopy: '[LMB] Copy icon data URI to clipboard',
        iconPreviewDelete: '[LMB] Remove icon',
        iconPreviewNoIcon: 'No icon selected',
        switchPanelListItem: '[RMB] open menu to move items up/down'
    },
    remotePanel: {
        badge: 'Remote',
        badgeHint: '[RMB] menu; This panel was imported from a remote source; [LOCK] Readonly',
        copyToLocal: 'Copy as local panel',
        refreshFromRemote: 'Refresh from remote',
        loadError: 'Failed to load remote panel. Please check the URL is accessible and CORS is enabled.',
        refreshError: 'Failed to refresh from remote source. Please check the URL is accessible.'
    }
};
