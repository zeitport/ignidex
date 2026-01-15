import {
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
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {noRemoteUrl} from '../preconditions.ts';

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
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiArrowUpThin,
        label: 'Move up',
        action: new MoveCardAction('up'),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiArrowDownThin,
        label: 'Move down',
        action: new MoveCardAction('down'),
        preconditions: [noRemoteUrl]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        action: new EditCardAction(),
        preconditions: [noRemoteUrl]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: 'Delete',
        action: new DeleteCardAction(),
        preconditions: [noRemoteUrl]
    })
];
