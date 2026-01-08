import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {dialogButtonStyle} from './dialogButtonStyle.ts';

@customElement('cc-dialog-button')
export class DialogButton extends LitElement {
    static styles = dialogButtonStyle;

    @property({type: Boolean, reflect: true})
    primary = false;

    render() {
        return html`
            <button>
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-dialog-button': DialogButton;
    }
}
