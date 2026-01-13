import {activeHoverHint} from '../app/state.ts';

export class HoverHint {
    text: string;

    private static hoverTimeout: ReturnType<typeof setTimeout> | null = null;
    private static clearTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(init: Partial<HoverHint>) {
        this.text = init.text ?? '';
    }

    static show(hint: HoverHint) {
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = null;
        }
        this.hoverTimeout = setTimeout(() => {
            activeHoverHint.value = hint;
        }, 150);
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
