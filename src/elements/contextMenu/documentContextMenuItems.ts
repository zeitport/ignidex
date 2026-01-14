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
import {ContextMenuItem} from '../contextMenuItem.ts';

export const documentContextMenuItems = [
    new ContextMenuItem({
        icon: mdiSwapHorizontal,
        label: 'Switch panel',
        tooltip: 'Switch to another panel',
        action: new SwitchPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiPlus,
        label: 'New panel',
        tooltip: 'Create a new panel',
        action: new NewPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiExport,
        label: 'Export as JSON',
        tooltip: 'Export data as JSON file',
        action: new ExportToJsonAction()
    }),
    new ContextMenuItem({
        icon: mdiCloudDownloadOutline ,
        label: 'Create local panel',
        tooltip: 'Add current panel to my collection of panels (or clone it)',
        action: new CreateLocalPanelAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiCog,
        label: 'Settings',
        tooltip: '[LMB] or [F1] opens the app settings',
        action: new OpenSettingsAction()
    })
];
