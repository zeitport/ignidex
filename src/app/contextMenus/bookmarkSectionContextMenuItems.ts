import {i18n} from '#i18n';
import {
    mdiDelete,
    mdiPencilOutline,
    mdiShapeCirclePlus,
    mdiArrowUpThin,
    mdiArrowDownThin
} from '@mdi/js';
import {DeleteSectionAction} from '../../actions/deleteSectionAction.ts';
import {EditSectionAction} from '../../actions/editSectionAction.ts';
import {AddGroupAction} from '../../actions/addGroupAction.ts';
import {MoveSectionAction} from '../../actions/moveSectionAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {noRemoteUrl} from '../preconditions.ts';

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
        label: 'Delete...',
        tooltip: i18n.token.hints.deleteSection,
        action: new DeleteSectionAction(),
        preconditions: [noRemoteUrl]
    })
];
