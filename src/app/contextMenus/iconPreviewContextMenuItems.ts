import {mdiClipboardOutline, mdiContentCopy, mdiDeleteOutline} from '@mdi/js';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {PasteIconAction} from '../../actions/iconPreview/pasteIconAction.ts';
import {CopyIconDataUrlAction} from '../../actions/iconPreview/copyIconDataUrlAction.ts';
import {DeleteIconAction} from '../../actions/iconPreview/deleteIconAction.ts';
import {i18n} from '../../localization/i18n.ts';

export const iconPreviewContextMenuItems = [
    new ContextMenuItem({
        icon: mdiClipboardOutline,
        label: 'Paste',
        tooltip: i18n.text.hints.iconPreviewPaste,
        action: new PasteIconAction()
    }),
    new ContextMenuItem({
        icon: mdiContentCopy,
        label: 'Copy Data URL',
        tooltip: i18n.text.hints.iconPreviewCopy,
        action: new CopyIconDataUrlAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiDeleteOutline,
        label: 'Delete',
        tooltip: i18n.text.hints.iconPreviewDelete,
        action: new DeleteIconAction()
    })
];
