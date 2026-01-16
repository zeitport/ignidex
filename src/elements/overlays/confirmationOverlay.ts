import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {activeAction} from '#state';
import {panelOverlayStyle} from './panelOverlayStyle.ts';

@customElement('cc-confirmation-overlay')
export class ConfirmationOverlay extends LitElement {
    static styles = [
        panelOverlayStyle,
        css`
            :host {
                --overlay-max-width: 50rem;
            }
        `
    ];

    private activeAction = activeAction.watch(this);

    render() {
        const action = this.activeAction.value;

        if (!action) return html``;

        return html`
            <cc-overlay @close=${this.handleClose}>
                <div>
                    ${action.confirmation?.message}
                </div>

                <cc-dialog-button slot="footer" primary @click=${this.handleConfirm}>
                    ${action.confirmation?.buttonLabel}
                </cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleConfirm = async () => {
        console.log('Confirming action', {action: this.activeAction.value});
        await this.activeAction.value?.confirm?.();
        this.activeAction.value = null;
    }

    private handleClose = async () => {
        await this.activeAction.value?.cancel?.();
        this.activeAction.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-confirmation-overlay': ConfirmationOverlay;
    }
}
