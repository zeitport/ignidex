export const SettingsIconStyle = {
    Off: 'off',
    Small: 'small',
    Large: 'large',
} as const;

export type SettingsIconStyle = typeof SettingsIconStyle[keyof typeof SettingsIconStyle];
