import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {hoverHintElementStyle} from './hoverHintElementStyle.ts';
import {activeHoverHint} from '../app/state.ts';

@customElement('cc-hover-hint')
export class HoverHintElement extends LitElement {
    static styles = hoverHintElementStyle;

    private activeHoverHint = activeHoverHint.watch(this);

    render() {
        const hint = this.activeHoverHint.value;

        if (!hint) {
            return html``;
        }

        return html`<div class="hint">${hint.html}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-hover-hint': HoverHintElement
    }
}
