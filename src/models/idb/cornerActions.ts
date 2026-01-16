import {CornerActionType} from './cornerActionType.ts';
import {type SettingsIconStyle} from './settingsIconStyle.ts';

export interface CornerActions {
    size: SettingsIconStyle;
    topLeft: CornerActionType;
    topRight: CornerActionType;
    bottomLeft: CornerActionType;
    bottomRight: CornerActionType;
}

