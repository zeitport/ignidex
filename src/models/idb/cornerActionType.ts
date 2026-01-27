export const CornerActionType = {
    Off: 'off',
    SwitchPanel: 'switchPanel',
    Home: 'home',
    Settings: 'settings',
    Export: 'export',
    Coffee: 'coffee',
} as const;

export type CornerActionType = typeof CornerActionType[keyof typeof CornerActionType];
