import type {ActionInterface} from '../actionInterface.ts';
import {activeIconPreview} from '#state';
import {i18n} from '#i18n';

export class DeleteIconAction implements ActionInterface {
    run() {
        activeIconPreview.value = null;
    }

    isDisabled(): boolean {
        return !activeIconPreview.value?.dataUri;
    }

    disabledHint = i18n.token.hints.iconPreviewNoIcon;
}
