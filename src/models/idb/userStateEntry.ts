import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {SettingsIconStyle, type SettingsIconStyleType} from '#models/idb/settingsIconStyle.ts';

export class UserStateEntry {
    id: string;
    lastUsedStartPanelId: string | null = null;
    accentColor: string | null = null;
    baseFontSize: number = 16;
    useUppercase: boolean = true;
    hoverHintMode: HoverHintModeType = HoverHintMode.Dark;
    settingsIconStyle: SettingsIconStyleType = SettingsIconStyle.Large;

    constructor(init: Partial<UserStateEntry> = {}) {
        this.id = init.id ?? 'default';
        this.lastUsedStartPanelId = init.lastUsedStartPanelId ?? null;
        this.accentColor = init.accentColor ?? null;
        this.baseFontSize = init.baseFontSize ?? 16;
        this.useUppercase = init.useUppercase ?? true;

        this.hoverHintMode = init.hoverHintMode ?? HoverHintMode.Dark;

        if (!Object.values(HoverHintMode).includes(this.hoverHintMode)) {
            // Fallback to a known value.
            this.hoverHintMode = HoverHintMode.Dark;
        }

        this.settingsIconStyle = init.settingsIconStyle ?? SettingsIconStyle.Large;

        if (!Object.values(SettingsIconStyle).includes(this.settingsIconStyle)) {
            this.settingsIconStyle = SettingsIconStyle.Large;
        }
    }
}
