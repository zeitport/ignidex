import {i18n} from '#i18n';
import {
    mdiCloudDownloadOutline,
    mdiCog,
    mdiExport, mdiPlus, mdiSwapHorizontal
} from '@mdi/js';
import {CreateLocalPanelAction} from '../../actions/createLocalPanelAction.ts';
import {OpenSettingsAction} from '../../actions/openSettingsAction.ts';
import {ExportToJsonAction} from '../../actions/exportToJsonAction.ts';
import {NewPanelAction} from '../../actions/newPanelAction.ts';
import {SwitchPanelAction} from '../../actions/switchPanelAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const documentContextMenuItems = [
    new ContextMenuItem({
        icon: mdiSwapHorizontal,
        label: 'Switch panel',
        tooltip: i18n.text.hints.switchPanel,
        action: new SwitchPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiPlus,
        label: 'New panel',
        tooltip: i18n.text.hints.createNewPanel,
        action: new NewPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiExport,
        label: 'Export as JSON',
        tooltip: i18n.text.hints.exportJson,
        action: new ExportToJsonAction()
    }),
    new ContextMenuItem({
        icon: mdiCloudDownloadOutline ,
        label: 'Create local panel',
        tooltip: i18n.text.hints.createLocalPanel,
        action: new CreateLocalPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiCog,
        label: 'Settings',
        tooltip: i18n.text.hints.openSettings,
        action: new OpenSettingsAction()
    })
];
