import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {activeAction} from '../../app/state.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import {panelOverlayStyle} from './panelOverlayStyle.ts';

@customElement('cc-confirmation-overlay')
export class ConfirmationOverlay extends LitElement {
    static styles = [
        panelOverlayStyle,
        css`
            :host {
                --overlay-max-width: 32rem;
            }
        `
    ];

    @property({type: Boolean})
    isOpen = false;

    private activeAction = activeAction.watch(this);

    render() {
        const action = this.activeAction.value;

        if (!action) return html``;

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleCancel}>
                <div>
                    ${action.confirmation?.message}
                </div>

                <cc-dialog-button slot="footer" @click=${this.handleCancel}>Cancel</cc-dialog-button>
                <cc-dialog-button slot="footer" primary @click=${this.handleConfirm}>
                    ${action.confirmation?.buttonLabel}
                </cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleConfirm() {
        this.activeAction.value?.confirm?.();
    }

    private handleCancel() {
        this.activeAction.value?.cancel?.();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-confirmation-overlay': ConfirmationOverlay;
    }
}
