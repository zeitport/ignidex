import {Icon} from '#models/internal/icon.ts';
import {mdiCancel, mdiCoffeeOutline, mdiCog, mdiExport, mdiGithub, mdiSwapHorizontal} from '@mdi/js';
import {CornerActionType} from '#models/idb/cornerActionType.ts';

export const cornerActionIconSvgMap: Record<CornerActionType, Icon> = {
    [CornerActionType.Off]: Icon.fromMdiIcon(mdiCancel),
    [CornerActionType.Settings]: Icon.fromMdiIcon(mdiCog),
    [CornerActionType.Home]: Icon.fromMdiIcon(mdiGithub),
    [CornerActionType.SwitchPanel]: Icon.fromMdiIcon(mdiSwapHorizontal),
    [CornerActionType.Export]: Icon.fromMdiIcon(mdiExport),
    [CornerActionType.Coffee]: Icon.fromMdiIcon(mdiCoffeeOutline),
};
