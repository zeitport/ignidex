import {BookmarkOnClickAction, type BookmarkOnClickActionType} from '#models/idb/bookmarkOnClickAction.ts';
import {createDefaultCornerActions} from '#models/idb/createDefaultCornerActions.ts';
import {type CornerActions} from '#models/idb/cornerActions.ts';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';

export class UserStateEntry {
    id: string;
    lastUsedStartPanelId: string | null;
    accentColor: string | null;
    baseFontSize: number;
    useUppercase: boolean;
    hoverHintMode: HoverHintModeType;
    settingsIconStyle: SettingsIconStyle;
    cornerActions: CornerActions;
    bookmarkOnClickAction: BookmarkOnClickActionType;

    /**
     * Users often drag & drop bookmarks when they just wanted to click on them.
     * This delay (in milliseconds) is used to determine if a drag & drop operation is intended or not.
     */
    dragHoldDelay: number;

    constructor(init: Partial<UserStateEntry> = {}) {
        this.id = init.id ?? 'default';
        this.lastUsedStartPanelId = init.lastUsedStartPanelId ?? null;
        this.accentColor = init.accentColor ?? null;
        this.baseFontSize = init.baseFontSize ?? 16;
        this.useUppercase = init.useUppercase ?? true;
        this.dragHoldDelay = init.dragHoldDelay ?? 500;
        this.hoverHintMode = init.hoverHintMode ?? HoverHintMode.Dark;

        if (!Object.values(HoverHintMode).includes(this.hoverHintMode)) {
            // Fallback to a known value.
            this.hoverHintMode = HoverHintMode.Dark;
        }

        this.settingsIconStyle = init.settingsIconStyle ?? SettingsIconStyle.Large;

        if (!Object.values(SettingsIconStyle).includes(this.settingsIconStyle)) {
            this.settingsIconStyle = SettingsIconStyle.Large;
        }

        this.bookmarkOnClickAction = init.bookmarkOnClickAction ?? BookmarkOnClickAction.open;

        if (!Object.values(BookmarkOnClickAction).includes(this.bookmarkOnClickAction)) {
            this.bookmarkOnClickAction = BookmarkOnClickAction.open;
        }

        this.cornerActions = this.initCornerIcons(init.cornerActions) ?? createDefaultCornerActions();
    }

    private initCornerIcons(actions?: CornerActions): CornerActions {
        const defaultConfig = createDefaultCornerActions();

        if (!actions) {
            return defaultConfig;
        }

        const validIconTypes = Object.values(CornerActionType);
        const validSizes = Object.values(SettingsIconStyle);

        return {
            size: validSizes.includes(actions.size) ? actions.size : defaultConfig.size,
            topLeft: validIconTypes.includes(actions.topLeft) ? actions.topLeft : defaultConfig.topLeft,
            topRight: validIconTypes.includes(actions.topRight) ? actions.topRight : defaultConfig.topRight,
            bottomLeft: validIconTypes.includes(actions.bottomLeft) ? actions.bottomLeft : defaultConfig.bottomLeft,
            bottomRight: validIconTypes.includes(actions.bottomRight) ? actions.bottomRight : defaultConfig.bottomRight,
        };
    }
}
