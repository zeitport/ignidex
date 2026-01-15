export const KeyboardShortcutGroup = {
    general: 'general',
    navigation: 'navigation',
    editing: 'editing',
    view: 'view',
} as const;

export type KeyboardShortcutGroup = typeof KeyboardShortcutGroup[keyof typeof KeyboardShortcutGroup];
