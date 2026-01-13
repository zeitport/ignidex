import {html, type TemplateResult} from 'lit';
import {activeHoverHint} from './state.ts';

export class ActiveHoverHint {
    html: TemplateResult;

    private static hoverTimeout: ReturnType<typeof setTimeout> | null = null;
    private static clearTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(init: Partial<ActiveHoverHint>) {
        this.html = init.html ?? html``;
    }

    static show(hint: ActiveHoverHint) {
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
