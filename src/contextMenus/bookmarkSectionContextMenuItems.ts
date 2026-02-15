import {i18n, t} from '#i18n';
import {
    mdiArrowDownThin,
    mdiArrowUpThin,
    mdiContentPaste,
    mdiDelete,
    mdiPencilOutline,
    mdiShapeCirclePlus
} from '@mdi/js';
import {AddGroupAction} from '../actions/addGroupAction.ts';
import {DeleteSectionAction} from '../actions/deleteSectionAction.ts';
import {EditSectionAction} from '../actions/editSectionAction.ts';
import {MoveSectionAction} from '../actions/moveSectionAction.ts';
import {PasteCardToSectionAction} from '../actions/pasteCardToSectionAction.ts';
import {ContextMenuItem} from '../elements/contextMenuItem.ts';
import {hasCardCopy, noRemoteUrl} from '#app/preconditions.ts';

export const bookmarkSectionContextMenuItems = [
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        tooltip: i18n.token.hints.editSection,
        action: new EditSectionAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiShapeCirclePlus,
        label: 'Add Group',
        tooltip: i18n.token.hints.addGroupToSection,
        action: new AddGroupAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiContentPaste,
        label: t.contextMenu.pasteCard,
        tooltip: t.hints.pasteCardToSection,
        action: new PasteCardToSectionAction(),
        preconditions: [noRemoteUrl, hasCardCopy]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiArrowUpThin,
        label: 'Move up',
        action: new MoveSectionAction('up'),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiArrowDownThin,
        label: 'Move down',
        action: new MoveSectionAction('down'),
        preconditions: [noRemoteUrl]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDelete,
        label: 'Delete…',
        tooltip: i18n.token.hints.deleteSection,
        action: new DeleteSectionAction(),
        preconditions: [noRemoteUrl]
    })
];
