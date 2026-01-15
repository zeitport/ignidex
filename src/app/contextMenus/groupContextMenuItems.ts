import {i18n} from '#i18n';
import {
    mdiDelete,
    mdiPencilOutline,
    mdiPlus,
} from '@mdi/js';
import {DeleteGroupAction} from '../../actions/deleteGroupAction.ts';
import {EditGroupAction} from '../../actions/editGroupAction.ts';
import {AddCardAction} from '../../actions/addCardAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {noRemoteUrl} from '../preconditions.ts';

export const groupContextMenuItems = [
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        tooltip: i18n.text.hints.editGroup,
        action: new EditGroupAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiPlus,
        label: 'Add Bookmark',
        tooltip: i18n.text.hints.addBookmarkToGroup,
        action: new AddCardAction(),
        preconditions: [noRemoteUrl]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDelete,
        label: 'Delete...',
        tooltip: i18n.text.hints.deleteGroup,
        action: new DeleteGroupAction(),
        preconditions: [noRemoteUrl]
    })
];
