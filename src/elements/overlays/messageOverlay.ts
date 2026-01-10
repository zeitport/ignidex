import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {activeOverlay, messageOverlayContent} from '../../app/state.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import {panelOverlayStyle} from './panelOverlayStyle.ts';

@customElement('cc-message-overlay')
export class MessageOverlay extends LitElement {
    static styles = [
        panelOverlayStyle,
        css`
            :host {
                --overlay-max-width: 32rem;
            }

            .message {
                white-space: pre-wrap;
            }
        `
    ];

    @property({type: Boolean})
    isOpen = false;

    private messageContent = messageOverlayContent.watch(this);

    render() {
        const message = this.messageContent.value;

        if (!message) return html``;

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <div class="message">
                    ${message}
                </div>

                <cc-dialog-button slot="footer" primary @click=${this.handleClose}>OK</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleClose() {
        activeOverlay.value = null;
        messageOverlayContent.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-message-overlay': MessageOverlay;
    }
}
