import type {CornerActions} from '#models/idb/cornerActions.ts';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';

export function setCornerIconType(config: CornerActions, position: CornerPosition, actionType: CornerActionType): CornerActions {
    const newConfig = {...config};

    const updateProperty = new Map<CornerPosition, () => void>([
        [CornerPosition.TopLeft, () => newConfig.topLeft = actionType],
        [CornerPosition.TopRight, () => newConfig.topRight = actionType],
        [CornerPosition.BottomLeft, () => newConfig.bottomLeft = actionType],
        [CornerPosition.BottomRight, () => newConfig.bottomRight = actionType]
    ]);

    updateProperty.get(position)?.();

    return newConfig;
}
