import {t} from '#i18n';
import {
    mdiContentDuplicate,
    mdiDeleteOutline, mdiExport,
    mdiPencil,
    mdiShapeSquarePlus,
    mdiSwapHorizontal
} from '@mdi/js';
import {DuplicatePanelAction} from '../../actions/duplicatePanelAction.ts';
import {ExportToJsonAction} from '../../actions/exportToJsonAction.ts';
import {SwitchPanelAction} from '../../actions/switchPanelAction.ts';
import {EditPanelAction} from '../../actions/editPanelAction.ts';
import {DeletePanelAction} from '../../actions/deletePanelAction.ts';
import {AddSectionAction} from '../../actions/addSectionAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {noRemoteUrl} from '../preconditions.ts';

export const panelContextMenuItems = [
    new ContextMenuItem({
        icon: mdiSwapHorizontal,
        label: t.contextMenu.switchPanel,
        tooltip: t.hints.switchPanel,
        action: new SwitchPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiPencil,
        label: t.contextMenu.editPanel,
        tooltip: t.hints.editPanel,
        action: new EditPanelAction(),
        preconditions: [noRemoteUrl]
    }),
    new ContextMenuItem({
        icon: mdiShapeSquarePlus,
        label: t.contextMenu.addSection,
        tooltip: t.hints.addSectionToPanel,
        action: new AddSectionAction(),
        preconditions: [noRemoteUrl]
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiExport,
        label: t.contextMenu.exportAsJson,
        tooltip: t.hints.exportJson,
        action: new ExportToJsonAction()
    }),
    new ContextMenuItem({
        icon: mdiContentDuplicate ,
        label: t.contextMenu.duplicatePanel,
        tooltip: t.hints.duplicatePanel,
        action: new DuplicatePanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: t.contextMenu.deletePanel,
        tooltip: t.hints.deletePanel,
        action: new DeletePanelAction()
    }),
];
