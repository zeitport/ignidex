import {inject} from '#inject';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {CloseOverlayAction} from '../actions/closeOverlayAction.ts';
import {dialogButtonStyle} from './dialogButtonStyle.ts';

@customElement('cc-dialog-button')
export class DialogButton extends LitElement {
    static styles = dialogButtonStyle;

    @property({type: Boolean, reflect: true})
    primary = false;

    @property({type: Boolean, reflect: true})
    cancel = false;

    render() {
        return html`
            <button @click=${this.handleClick}>
                <slot></slot>
            </button>
        `;
    }

    private handleClick = (event: MouseEvent) =>  {
        if (this.cancel) {
            event.preventDefault();
            event.stopPropagation();

            inject(CloseOverlayAction).run();
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-dialog-button': DialogButton;
    }
}
