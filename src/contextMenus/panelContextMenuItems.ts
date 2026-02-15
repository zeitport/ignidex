import {i18n, t} from '#i18n';
import {
    mdiCog,
    mdiContentDuplicate,
    mdiDeleteOutline, mdiExport,
    mdiPencil, mdiPlus,
    mdiShapeSquarePlus,
    mdiSwapHorizontal
} from '@mdi/js';
import {DuplicatePanelAction} from '../actions/duplicatePanelAction.ts';
import {ExportToJsonAction} from '../actions/exportToJsonAction.ts';
import {NewPanelAction} from '../actions/newPanelAction.ts';
import {OpenSettingsAction} from '../actions/openSettingsAction.ts';
import {SwitchPanelAction} from '../actions/switchPanelAction.ts';
import {EditPanelAction} from '../actions/editPanelAction.ts';
import {DeletePanelAction} from '../actions/deletePanelAction.ts';
import {AddSectionAction} from '../actions/addSectionAction.ts';
import {ContextMenuItem} from '../elements/contextMenuItem.ts';
import {noRemoteUrl} from '#app/preconditions.ts';

export const panelContextMenuItems = [
    new ContextMenuItem({
        icon: mdiSwapHorizontal,
        label: t.contextMenu.switchPanel,
        tooltip: t.hints.switchPanel,
        action: new SwitchPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiPlus,
        label: t.contextMenu.newPanel,
        tooltip: i18n.token.hints.createNewPanel,
        action: new NewPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiContentDuplicate ,
        label: t.contextMenu.duplicatePanel,
        tooltip: t.hints.duplicatePanel,
        action: new DuplicatePanelAction()
    }),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: t.contextMenu.deletePanel,
        tooltip: t.hints.deletePanel,
        action: new DeletePanelAction()
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

    ContextMenuItem.divider(),

    new ContextMenuItem({
        icon: mdiCog,
        label: 'Settings',
        tooltip: i18n.token.hints.openSettings,
        action: new OpenSettingsAction()
    })
];
