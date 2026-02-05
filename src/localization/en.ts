import {CornerActionType} from '#models/idb/cornerActionType.ts';

export const hints = {
    bookmark: '[LMB] open; [CTRL] + [LMB] open in new tab; [RMB] bookmark menu',
    startPanelHeader: '[RMB] panel menu; [🠜] go back; [🠞] go forward',
    switchPanel: '[LMB] Select another panel; [1 - 9] Switch; [🠜] previous; [🠞] next',
    switchPanelUp: '[LMB] Move panel up',
    switchPanelDown: '[LMB] Move panel down',
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
    moveGroupToSection: '[LMB] Move group to another section',
    moveBookmarkToGroup: '[LMB] Move bookmark to another group',
    copyCard: '[LMB] Copy bookmark to clipboard',
    pasteCardToGroup: '[LMB] Paste bookmark to this group',
    pasteCardToSection: '[LMB] Paste bookmark to first group in section',
    editSection: 'Edit section',
    addGroupToSection: 'Add new group to section',
    deleteSection: 'Delete section',
    addBookmarkToSection: 'Add new bookmark to section',
    iconPreviewPaste: '[LMB] or [CTRL] + [V] Paste icon from clipboard (SVG, URL, or data URI)',
    iconPreviewSelectExisting: '[LMB] Select an existing icon from the gallery',
    iconPreviewCopy: '[LMB] Copy icon data URI to clipboard',
    iconPreviewDelete: '[LMB] Remove icon',
    iconPreviewNoIcon: 'No icon selected',
    switchPanelListItem: '[RMB] open menu to move panel up/down; [1 - 9] Switch',
    copyShareUrlToClipboard: '[LMB] Copy share URL to clipboard',
    featureRightClick: '[RMB] Try me',
    portafilter: 'Empty Portafilter; [LMB] Take',
    grinder: 'Grind some Italien coffee beans; [LMB] Fill',
    tamper: 'Compress coffee; [LMB] Tamper',
    machine: 'Make coffee; [LMB] Brew',
    cup: 'Espresso; [LMB] Enjoy',
    openCoffeeSettings: '[LMB] opens the coffee settings',
    dropZoneTop: 'Release [LMB] to insert before',
    dropZoneBottom: 'Release [LMB] to insert after',
    dropZoneInlineStart: 'Release [LMB] to insert before',
    dropZoneInlineEnd: 'Release [LMB] to insert after',
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
        closeOverlay: 'Close overlay',
        switchToPanel1: 'Switch to panel 1',
        switchToPanel2: 'Switch to panel 2',
        switchToPanel3: 'Switch to panel 3',
        switchToPanel4: 'Switch to panel 4',
        switchToPanel5: 'Switch to panel 5',
        switchToPanel6: 'Switch to panel 6',
        switchToPanel7: 'Switch to panel 7',
        switchToPanel8: 'Switch to panel 8',
        switchToPanel9: 'Switch to panel 9'
    },
    hints: hints,
    cornerActionType: {
        [CornerActionType.Off]: '',
        [CornerActionType.Settings]: hints.openSettings,
        [CornerActionType.Home]: hints.openAppHome,
        [CornerActionType.SwitchPanel]: hints.switchPanel,
        [CornerActionType.Export]: hints.exportPanel,
        [CornerActionType.Coffee]: hints.openCoffeeSettings,
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
        delete: 'Delete…',
        addBookmark: 'Add Bookmark',
        editBookmark: 'Edit',
        editGroup: 'Edit',
        moveToSection: 'Move to…',
        copyCard: 'Copy',
        pasteCard: 'Paste',
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
        coffeeHeader: 'Un caffè',
        coffeeGameLabel: 'Let’s brew an Italian caffè',
        coffeeGameDescription: 'It usually starts with the portafilter.',
        coffeeThanksLabel: 'Thanks for the virtual coffee.',
        coffeeThanksDescription: 'A real one would taste even better!',

        // About Settings
        aboutHeader: 'About Ignidex',
        aboutVersionLabel: 'Version',
        aboutAuthorLabel: 'Author',
        aboutHomepageLabel: 'Homepage',
        aboutIssuesLabel: 'Issues',
        aboutLicenseLabel: 'License'
    }
};
