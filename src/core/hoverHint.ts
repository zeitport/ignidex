import {activeHoverHint} from '#state';

/**
 * Use the "hoverHint" directive to show a hint when hovering over an element.
 * @see {HoverHintDirective}
 */
export class HoverHint {
    text: string | null;

    private static hoverTimeout: ReturnType<typeof setTimeout> | null = null;
    private static clearTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(init: Partial<HoverHint> = {}) {
        this.text = init.text ?? null;
    }

    static show(hint: HoverHint) {
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = null;
        }

        if (hint.text) {
            this.hoverTimeout = setTimeout(() => {
                activeHoverHint.value = hint;
            }, 150);
        }
    }

    static clear() {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }

        this.clearTimeout = setTimeout(() => {
            activeHoverHint.value = null;
        }, 500);
    }
}
