import {
    mdiBookmarkOutline,
    mdiDeleteOutline,
    mdiLink,
    mdiOpenInNew,
    mdiPencilOutline,
    mdiArrowUpThin,
    mdiArrowDownThin
} from '@mdi/js';
import {EditCardAction} from '../../actions/editCardAction.ts';
import {DeleteCardAction} from '../../actions/deleteCardAction.ts';
import {MoveCardAction} from '../../actions/moveCardAction.ts';
import {CopyUrlAction} from '../../actions/copyUrlAction.ts';
import {OpenInNewTabAction} from '../../actions/openInNewTabAction.ts';
import {NotImplementedAction} from '../../actions/notImplementedAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const bookmarkContextMenuItems = [
    new ContextMenuItem({
        icon: mdiOpenInNew,
        label: 'Open in new tab',
        action: new OpenInNewTabAction()
    }),
    new ContextMenuItem({
        icon: mdiLink,
        label: 'Copy URL',
        action: new CopyUrlAction()
    }),
    new ContextMenuItem({
        icon: mdiBookmarkOutline,
        label: 'Copy bookmark',
        action: new NotImplementedAction({message: 'Copy Bookmark'})
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiArrowUpThin,
        label: 'Move up',
        action: new MoveCardAction('up')
    }),
    new ContextMenuItem({
        icon: mdiArrowDownThin,
        label: 'Move down',
        action: new MoveCardAction('down')
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        action: new EditCardAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: 'Delete',
        action: new DeleteCardAction()
    })
];
