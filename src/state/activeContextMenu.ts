import type {ContextMenuItem} from '../elements/contextMenuItem.ts';

export interface ActiveContextMenu {
    items: ContextMenuItem[];
    x: number;
    y: number;
}
