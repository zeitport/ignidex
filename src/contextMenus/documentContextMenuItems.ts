import {i18n, t} from '#i18n';
import {
    mdiCog, mdiContentDuplicate,
    mdiExport, mdiPlus, mdiSwapHorizontal
} from '@mdi/js';
import {DuplicatePanelAction} from '../actions/duplicatePanelAction.ts';
import {OpenSettingsAction} from '../actions/openSettingsAction.ts';
import {ExportToJsonAction} from '../actions/exportToJsonAction.ts';
import {NewPanelAction} from '../actions/newPanelAction.ts';
import {SwitchPanelAction} from '../actions/switchPanelAction.ts';
import {ContextMenuItem} from '../elements/contextMenuItem.ts';

export const documentContextMenuItems = [
    new ContextMenuItem({
        icon: mdiSwapHorizontal,
        label: t.contextMenu.switchPanel,
        tooltip: i18n.token.hints.switchPanel,
        action: new SwitchPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiPlus,
        label: 'New panel',
        tooltip: i18n.token.hints.createNewPanel,
        action: new NewPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiExport,
        label: 'Export as JSON',
        tooltip: i18n.token.hints.exportJson,
        action: new ExportToJsonAction()
    }),
    new ContextMenuItem({
        icon: mdiContentDuplicate ,
        label: t.contextMenu.duplicatePanel,
        tooltip: i18n.token.hints.duplicatePanel,
        action: new DuplicatePanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiCog,
        label: 'Settings',
        tooltip: i18n.token.hints.openSettings,
        action: new OpenSettingsAction()
    })
];
