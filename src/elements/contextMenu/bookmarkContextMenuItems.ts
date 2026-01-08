import {
    mdiArrowAll,
    mdiBookmarkOutline,
    mdiDeleteOutline,
    mdiLink,
    mdiPencilOutline
} from '@mdi/js';
import {EditCardAction} from '../../actions/editCardAction.ts';
import {DeleteCardAction} from '../../actions/deleteCardAction.ts';
import {NotImplementedAction} from '../../actions/notImplementedAction.ts';
import {ContextMenuItem} from '../contextMenuItem.ts';

export const bookmarkContextMenuItems = [
    new ContextMenuItem({
        icon: mdiLink,
        label: 'Copy link',
        action: new NotImplementedAction({message: 'Copy Link'})
    }),
    new ContextMenuItem({
        icon: mdiBookmarkOutline,
        label: 'Copy bookmark',
        action: new NotImplementedAction({message: 'Copy Bookmark'})
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        action: new EditCardAction()
    }),
    new ContextMenuItem({
        icon: mdiArrowAll,
        label: 'Move',
        action: new NotImplementedAction({message: 'Move'})
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: 'Delete',
        action: new DeleteCardAction()
    })
];
