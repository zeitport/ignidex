import {
    mdiDelete,
    mdiPencilOutline,
    mdiShapeCirclePlus,
} from '@mdi/js';
import {DeleteSectionAction} from '../../actions/deleteSectionAction.ts';
import {EditSectionAction} from '../../actions/editSectionAction.ts';
import {AddGroupAction} from '../../actions/addGroupAction.ts';
import {ContextMenuItem} from '../contextMenuItem.ts';

export const sectionContextMenuItems = [
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        tooltip: 'Edit section',
        action: new EditSectionAction()
    }),
    new ContextMenuItem({
        icon: mdiShapeCirclePlus,
        label: 'Add Group',
        tooltip: 'Add new group to section',
        action: new AddGroupAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDelete,
        label: 'Delete...',
        tooltip: 'Delete section',
        action: new DeleteSectionAction()
    })
];
