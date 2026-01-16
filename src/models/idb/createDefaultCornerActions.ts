import type {CornerActions} from '#models/idb/cornerActions.ts';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';

export function createDefaultCornerActions(): CornerActions {
    return {
        size: SettingsIconStyle.Large,
        topLeft: CornerActionType.SwitchPanel,
        topRight: CornerActionType.Home,
        bottomLeft: CornerActionType.Settings,
        bottomRight: CornerActionType.Export
    };
}
