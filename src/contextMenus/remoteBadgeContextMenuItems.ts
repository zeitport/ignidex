import {i18n} from '#i18n';
import {mdiCloudDownloadOutline, mdiLink, mdiRefresh} from '@mdi/js';
import {CopyShareUrlToClipboardAction} from '../actions/copyShareUrlToClipboardAction.ts';
import {CreateLocalPanelAction} from '../actions/createLocalPanelAction.ts';
import {RefreshFromRemoteAction} from '../actions/refreshFromRemoteAction.ts';
import {ContextMenuItem} from '../elements/contextMenuItem.ts';

export const remoteBadgeContextMenuItems = [
    new ContextMenuItem({
        icon: mdiCloudDownloadOutline,
        label: i18n.token.remotePanel.copyToLocal,
        tooltip: i18n.token.hints.createLocalPanel,
        action: new CreateLocalPanelAction()
    }),
    new ContextMenuItem({
        icon: mdiRefresh,
        label: i18n.token.remotePanel.refreshFromRemote,
        tooltip: i18n.token.remotePanel.refreshFromRemote,
        action: new RefreshFromRemoteAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiLink,
        label: i18n.token.remotePanel.copyShareUrlToClipboard,
        tooltip: i18n.token.hints.copyShareUrlToClipboard,
        action: new CopyShareUrlToClipboardAction()
    }),
];
