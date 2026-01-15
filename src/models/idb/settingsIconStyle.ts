export const SettingsIconStyle = {
    Off: 'off',
    Small: 'small',
    Large: 'large',
} as const;

export type SettingsIconStyleType = typeof SettingsIconStyle[keyof typeof SettingsIconStyle];
