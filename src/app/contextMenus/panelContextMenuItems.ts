import {i18n} from '#i18n';
import {
    mdiDeleteOutline,
    mdiPencil,
    mdiShapeSquarePlus,
    mdiSwapHorizontal
} from '@mdi/js';
import {SwitchPanelAction} from '../../actions/switchPanelAction.ts';
import {EditPanelAction} from '../../actions/editPanelAction.ts';
import {DeletePanelAction} from '../../actions/deletePanelAction.ts';
import {AddSectionAction} from '../../actions/addSectionAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const panelContextMenuItems = [
    new ContextMenuItem({
        icon: mdiSwapHorizontal,
        label: 'Switch panel',
        tooltip: i18n.text.hints.switchPanel,
        action: new SwitchPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiPencil,
        label: 'Edit panel',
        tooltip: 'Edit current panel',
        action: new EditPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiShapeSquarePlus,
        label: 'Add Section',
        tooltip: 'Add new section to panel',
        action: new AddSectionAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: 'Delete panel',
        tooltip: 'Delete current panel',
        action: new DeletePanelAction()
    }),
];
