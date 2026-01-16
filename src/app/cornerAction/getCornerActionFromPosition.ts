import type {CornerActions} from '#models/idb/cornerActions.ts';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';

export function getCornerActionFromPosition(config: CornerActions, position: CornerPosition): CornerActionType {
    const cornerActionType = new Map<CornerPosition, CornerActionType>([
        [CornerPosition.TopLeft, config.topLeft],
        [CornerPosition.TopRight, config.topRight],
        [CornerPosition.BottomLeft, config.bottomLeft],
        [CornerPosition.BottomRight, config.bottomRight]
    ]);

    return cornerActionType.get(position) ?? CornerActionType.Settings;
}
