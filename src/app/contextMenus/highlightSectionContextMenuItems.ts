import {i18n} from '#i18n';
import {
    mdiDelete,
    mdiPencilOutline,
    mdiArrowUpThin,
    mdiArrowDownThin,
    mdiBookmarkOutline
} from '@mdi/js';
import {DeleteSectionAction} from '../../actions/deleteSectionAction.ts';
import {EditSectionAction} from '../../actions/editSectionAction.ts';
import {AddCardAction} from '../../actions/addCardAction.ts';
import {MoveSectionAction} from '../../actions/moveSectionAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const highlightSectionContextMenuItems = [
    new ContextMenuItem({
        icon: mdiBookmarkOutline,
        label: 'Add bookmark',
        tooltip: i18n.text.hints.addBookmarkToSection,
        action: new AddCardAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiPencilOutline,
        label: 'Edit',
        tooltip: i18n.text.hints.editSection,
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
        tooltip: i18n.text.hints.deleteSection,
        action: new DeleteSectionAction()
    })
];
