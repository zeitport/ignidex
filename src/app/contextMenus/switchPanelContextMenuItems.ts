import {
    mdiArrowUpThin,
    mdiArrowDownThin
} from '@mdi/js';
import {MovePanelAction} from '../../actions/movePanelAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const switchPanelContextMenuItems = [
    new ContextMenuItem({
        icon: mdiArrowUpThin,
        label: 'Move up',
        action: new MovePanelAction('up')
    }),
    new ContextMenuItem({
        icon: mdiArrowDownThin,
        label: 'Move down',
        action: new MovePanelAction('down')
    }),
];
