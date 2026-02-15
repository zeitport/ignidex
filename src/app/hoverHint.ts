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

    static show(text: string | null) {
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = null;
        }

        if (text) {
            this.hoverTimeout = setTimeout(() => {
                activeHoverHint.value = new HoverHint({text});
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
