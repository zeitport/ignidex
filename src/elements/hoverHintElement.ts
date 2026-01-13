import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {hoverHintElementStyle} from './hoverHintElementStyle.ts';
import {activeHoverHint, hoverHintMode} from '../app/state.ts';
import {HoverHintMode} from '#models/idb/hoverHintMode.ts';

@customElement('cc-hover-hint')
export class HoverHintElement extends LitElement {
    static styles = hoverHintElementStyle;

    private activeHoverHint = activeHoverHint.watch(this);
    private hoverHintMode = hoverHintMode.watch(this);

    render() {
        const hint = this.activeHoverHint.value;
        const mode = this.hoverHintMode.value;

        if (!hint || mode === HoverHintMode.Off) {
            return html``;
        }

        return html`<div class="hint ${mode === HoverHintMode.Muted ? 'muted' : ''}">${hint.html}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-hover-hint': HoverHintElement
    }
}
