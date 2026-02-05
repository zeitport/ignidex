import {i18n, t} from '#i18n';
import {
    mdiArrowLeftThin,
    mdiArrowRightThin,
    mdiContentPaste,
    mdiDelete,
    mdiPencilOutline,
    mdiPlus,
    mdiSwapVertical
} from '@mdi/js';
import {AddCardAction} from '../../actions/addCardAction.ts';
import {DeleteGroupAction} from '../../actions/deleteGroupAction.ts';
import {EditGroupAction} from '../../actions/editGroupAction.ts';
import {MoveGroupLeftAction} from '../../actions/moveGroupLeftAction.ts';
import {MoveGroupRightAction} from '../../actions/moveGroupRightAction.ts';
import {MoveGroupToSectionAction} from '../../actions/moveGroupToSectionAction.ts';
import {PasteCardToGroupAction} from '../../actions/pasteCardToGroupAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {hasCardCopy, noRemoteUrl} from '../preconditions.ts';

export const groupContextMenuItems = [
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: t.contextMenu.editGroup,
        tooltip: i18n.token.hints.editGroup,
        action: new EditGroupAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiPlus,
        label: t.contextMenu.addBookmark,
        tooltip: t.hints.addBookmarkToGroup,
        action: new AddCardAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiContentPaste,
        label: t.contextMenu.pasteCard,
        tooltip: t.hints.pasteCardToGroup,
        action: new PasteCardToGroupAction(),
        preconditions: [noRemoteUrl, hasCardCopy]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiArrowLeftThin,
        label: t.contextMenu.moveLeft,
        tooltip: t.hints.moveGroupLeft,
        action: new MoveGroupLeftAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiArrowRightThin,
        label: t.contextMenu.moveRight,
        tooltip: t.hints.moveGroupRight,
        action: new MoveGroupRightAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiSwapVertical,
        label: t.contextMenu.moveToSection,
        tooltip: t.hints.moveGroupToSection,
        action: new MoveGroupToSectionAction(),
        preconditions: [noRemoteUrl]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDelete,
        label: t.contextMenu.delete,
        tooltip: t.hints.deleteGroup,
        action: new DeleteGroupAction(),
        preconditions: [noRemoteUrl]
    })
];
