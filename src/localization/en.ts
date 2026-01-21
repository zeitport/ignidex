import {CornerActionType} from '#models/idb/cornerActionType.ts';

export const hints = {
    bookmark: '[LMB] open; [CTRL] + [LMB] open in new tab; [RMB] bookmark menu',
    startPanelHeader: '[RMB] panel menu; [🠜] go back; [🠞] go forward',
    switchPanel: '[LMB] Select another panel; [🠜] go back; [🠞] go forward',
    editPanel: 'Edit current panel',
    addSectionToPanel: 'Add new section to panel',
    deletePanel: '[LMB] + [?] Delete current panel',
    createNewPanel: 'Create a new panel',
    exportJson: 'Export data as JSON file',
    createLocalPanel: '[LMB] Convert the remote panel to an editable local panel',
    duplicatePanel: '[LMB] Create a copy of the current panel',
    openSettings: '[LMB] or [F1] opens the app settings',
    openAppHome: '[LMB] opens the Ignidex GitHub page',
    exportPanel: '[LMB] exports the current panel as JSON',
    editGroup: 'Edit group',
    addBookmarkToGroup: 'Add new bookmark to group',
    moveGroupLeft: '[LMB] Move group left',
    moveGroupRight: '[LMB] Move group right',
    deleteGroup: '[LMB] + [?] Delete group',
    editSection: 'Edit section',
    addGroupToSection: 'Add new group to section',
    deleteSection: 'Delete section',
    addBookmarkToSection: 'Add new bookmark to section',
    iconPreviewPaste: '[LMB] or [CTRL] + [V] Paste icon from clipboard (SVG, URL, or data URI)',
    iconPreviewSelectExisting: '[LMB] Select an existing icon from the gallery',
    iconPreviewCopy: '[LMB] Copy icon data URI to clipboard',
    iconPreviewDelete: '[LMB] Remove icon',
    iconPreviewNoIcon: 'No icon selected',
    switchPanelListItem: '[RMB] open menu to move items up/down',
    copyShareUrlToClipboard: '[LMB] Copy share URL to clipboard',
    featureRightClick: '[RMB] Try me'
}


/**
 * Prefer `t` from `i18n`;
 */
export const tokens = {
    keyboardShortcut: {
        switchPanel: 'Open panel switcher',
        panelBack: 'Go to previous panel',
        panelNext: 'Go to next panel',
        openSettings: 'Open settings',
        closeOverlay: 'Close overlay'
    },
    hints: hints,
    cornerActionType: {
        [CornerActionType.Off]: '',
        [CornerActionType.Settings]: hints.openSettings,
        [CornerActionType.Home]: hints.openAppHome,
        [CornerActionType.SwitchPanel]: hints.switchPanel,
        [CornerActionType.Export]: hints.exportPanel,
    },
    panel: {
        copyPrefix: 'Copy: ',
    },
    remotePanel: {
        badge: 'Remote',
        badgeHint: '[RMB] menu; This panel was imported from a remote source; [LOCK] Readonly',
        copyToLocal: 'Copy as local panel',
        refreshFromRemote: 'Refresh from remote',
        loadError: 'Failed to load remote panel. Please check the URL is accessible and CORS is enabled.',
        refreshError: 'Failed to refresh from remote source. Please check the URL is accessible.',
        copyShareUrlToClipboard: 'Copy share URL'
    },
    contextMenu: {
        switchPanel: 'Switch panel',
        editPanel: 'Edit panel',
        addSection: 'Add Section',
        exportAsJson: 'Export as JSON',
        duplicatePanel: 'Duplicate panel',
        deletePanel: 'Delete panel',
        moveRight: 'Move Right',
        moveLeft: 'Move Left',
        delete: 'Delete...',
        addBookmark: 'Add Bookmark',
        editBookmark: 'Edit',
        editGroup: 'Edit',
    },
    settingsPanel: {
        // Sidebar navigation labels
        sidebarUi: 'UI',
        sidebarNavigation: 'Navigation',
        sidebarKeyboard: 'Keyboard',
        sidebarImageGallery: 'Image Gallery',
        sidebarStorage: 'Storage',
        sidebarCoffee: 'Coffee',
        sidebarAbout: 'About',

        // Common option labels
        optionOff: 'Off',
        optionSmall: 'Small',
        optionLarge: 'Large',

        // UI Settings
        uiHeader: 'UI Settings',
        uiFontSizeLabel: 'Base Font Size',
        uiFontSizeDescription: 'Adjust the default text size for better readability.',
        uiFontSizeSmall: 'small',
        uiFontSizeMedium: 'medium (default)',
        uiFontSizeLarge: 'large',
        uiAccentColorLabel: 'Accent Color',
        uiAccentColorDescription: 'Choose a color to personalize buttons, highlights, and interactive elements.',
        uiTextTransformLabel: 'Text Transform',
        uiTextTransformDescription: 'Enable uppercase text for a modern look.',
        uiHoverHintsLabel: 'Hover Hints',
        uiHoverHintsDescription: 'Select how to display hover hints for elements.',
        uiHoverHintsOnDark: 'On (dark)',
        uiHoverHintsOnAccent: 'On (accent)',
        uiCornerActionSizeLabel: 'Corner Action Size',
        uiCornerActionSizeDescription: 'Configure corner action icon size.',
        uiCornerActionsLabel: 'Corner Actions',
        uiCornerActionsDescription: 'Configure corner actions for quick access to your favorite actions.',

        // Navigation Settings
        navigationHeader: 'Navigation Settings',
        navigationBookmarkOnClickLabel: 'Bookmark on Click',
        navigationBookmarkOnClickDescription: 'Choose what happens when you click on a bookmark.',
        navigationBookmarkOpen: 'Open',
        navigationBookmarkOpenNewTab: 'Open in new tab',

        // Keyboard Settings
        keyboardHeader: 'Keyboard Shortcuts',
        keyboardAvailableLabel: 'Available Shortcuts',
        keyboardAvailableDescription: 'Overview of all keyboard shortcuts.',

        // Image Gallery Settings
        imageGalleryHeader: 'Image Gallery',
        imageGalleryAllImagesLabel: 'All Images',
        imageGalleryAllImagesDescription: 'All uploaded images stored locally.',

        // Storage Settings
        storageHeader: 'Storage Settings',
        storageIconCacheLabel: 'Icon Assets Cache',
        storageIconCount: (count: number) => `${count} icons stored locally.`,

        // Coffee Settings
        coffeeHeader: 'Coffee',
        coffeeSupportLabel: 'Support the developer',
        coffeeSupportDescription: 'Coming soon...',

        // About Settings
        aboutHeader: 'About Ignidex',
        aboutVersionLabel: 'Version',
        aboutAuthorLabel: 'Author',
        aboutHomepageLabel: 'Homepage',
        aboutIssuesLabel: 'Issues',
        aboutLicenseLabel: 'License'
    }
};
