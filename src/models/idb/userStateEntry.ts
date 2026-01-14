import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';

export class UserStateEntry {
    id: string;
    lastUsedStartPanelId: string | null = null;
    accentColor: string | null = null;
    baseFontSize: number = 16;
    useUppercase: boolean = true;
    hoverHintMode: HoverHintModeType = HoverHintMode.Dark;

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
    }
}
