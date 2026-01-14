import {selectedSection, activeOverlay} from '#state';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {ActionInterface} from './actionInterface.ts';
import {CardSectionType} from '../models/internal/cardSectionType.ts';

export class EditSectionAction implements ActionInterface {
    run() {
        const section = selectedSection.value;
        if (!section) {
            return;
        }

        if (section.type === CardSectionType.Highlight) {
            activeOverlay.value = OverlayType.editHighlightSection;
        } else if (section.type === CardSectionType.Groups) {
            activeOverlay.value = OverlayType.editGroupsSection;
        }
    }
}
