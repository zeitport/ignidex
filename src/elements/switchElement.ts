import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {switchElementStyle} from './switchElementStyle.ts';

@customElement('cc-switch')
export class SwitchElement extends LitElement {
    static styles = switchElementStyle;

    @property({type: Boolean, reflect: true})
    checked = false;

    @property({type: Boolean, reflect: true})
    disabled = false;

    private toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {checked: this.checked},
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="container"
                 @click="${this.toggle}"
                 role="switch"
                 aria-checked="${this.checked}"
                 tabindex="${this.disabled ? '-1' : '0'}"
                 @keydown="${(event: KeyboardEvent) => (event.key === ' ' || event.key === 'Enter') && this.toggle()}"
            >
                <slot></slot>
                <div class="switch">
                    <div class="slider"></div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-switch': SwitchElement;
    }
}
