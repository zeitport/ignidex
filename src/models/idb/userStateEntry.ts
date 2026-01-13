import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';

export class UserStateEntry {
    id: string = 'default';
    lastUsedStartPanelId: string | null = null;
    accentColor: string | null = null;
    baseFontSize: number = 16;
    useUppercase: boolean = true;
    hoverHintMode: HoverHintModeType = HoverHintMode.Highlighted;

    constructor(init?: Partial<UserStateEntry>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
