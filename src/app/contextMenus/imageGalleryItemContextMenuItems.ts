import {mdiContentCopy, mdiOpenInNew, mdiXml} from '@mdi/js';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';
import {CopyAsDataUriAction} from '../../actions/imageGallery/copyAsDataUriAction.ts';
import {OpenSelectedImageInNewTabAction} from '../../actions/imageGallery/openSelectedImageInNewTabAction.ts';
import {CopyAsSvgAction} from '../../actions/imageGallery/copyAsSvgAction.ts';

export const imageGalleryItemContextMenuItems = [
    new ContextMenuItem({
        icon: mdiOpenInNew,
        label: 'Open in new tab',
        tooltip: 'Open the image in a new browser tab',
        action: new OpenSelectedImageInNewTabAction()
    }),
    ContextMenuItem.divider(),
    new ContextMenuItem({
        icon: mdiContentCopy,
        label: 'Copy as data URI',
        tooltip: 'Copy the image data URI to clipboard',
        action: new CopyAsDataUriAction()
    }),
    new ContextMenuItem({
        icon: mdiXml,
        label: 'Copy as SVG',
        tooltip: 'Copy the raw SVG markup to clipboard',
        action: new CopyAsSvgAction()
    })
];
