import {
    mdiDelete,
    mdiPencilOutline,
    mdiArrowUpThin,
    mdiArrowDownThin
} from '@mdi/js';
import {DeleteSectionAction} from '../../actions/deleteSectionAction.ts';
import {EditSectionAction} from '../../actions/editSectionAction.ts';
import {MoveSectionAction} from '../../actions/moveSectionAction.ts';
import {ContextMenuItem} from '../contextMenuItem.ts';

export const highlightSectionContextMenuItems = [
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        tooltip: 'Edit section',
        action: new EditSectionAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiArrowUpThin,
        label: 'Move up',
        action: new MoveSectionAction('up')
    }),
    new ContextMenuItem({
        icon: mdiArrowDownThin,
        label: 'Move down',
        action: new MoveSectionAction('down')
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDelete,
        label: 'Delete...',
        tooltip: 'Delete section',
        action: new DeleteSectionAction()
    })
];
