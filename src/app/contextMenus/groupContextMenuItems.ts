import {
    mdiDelete,
    mdiPencilOutline,
    mdiPlus,
} from '@mdi/js';
import {DeleteGroupAction} from '../../actions/deleteGroupAction.ts';
import {EditGroupAction} from '../../actions/editGroupAction.ts';
import {AddCardAction} from '../../actions/addCardAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const groupContextMenuItems = [
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        tooltip: 'Edit group',
        action: new EditGroupAction()
    }),
    new ContextMenuItem({
        icon: mdiPlus,
        label: 'Add Bookmark',
        tooltip: 'Add new bookmark to group',
        action: new AddCardAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDelete,
        label: 'Delete...',
        tooltip: 'Delete group',
        action: new DeleteGroupAction()
    })
];
