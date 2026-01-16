import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {messageOverlayContent} from '#state';
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

    private messageContent = messageOverlayContent.watch(this);

    render() {
        const message = this.messageContent.value;

        if (!message) return html``;

        return html`
            <cc-overlay>
                <div class="message">
                    ${message}
                </div>
            </cc-overlay>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-message-overlay': MessageOverlay;
    }
}
