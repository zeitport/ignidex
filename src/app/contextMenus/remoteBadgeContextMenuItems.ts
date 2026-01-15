import {i18n} from '#i18n';
import {mdiCloudDownloadOutline, mdiRefresh} from '@mdi/js';
import {CreateLocalPanelAction} from '../../actions/createLocalPanelAction.ts';
import {RefreshFromRemoteAction} from '../../actions/refreshFromRemoteAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const remoteBadgeContextMenuItems = [
    new ContextMenuItem({
        icon: mdiCloudDownloadOutline,
        label: i18n.text.remotePanel.copyToLocal,
        tooltip: i18n.text.hints.createLocalPanel,
        action: new CreateLocalPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiRefresh,
        label: i18n.text.remotePanel.refreshFromRemote,
        tooltip: i18n.text.remotePanel.refreshFromRemote,
        action: new RefreshFromRemoteAction()
    })
];
