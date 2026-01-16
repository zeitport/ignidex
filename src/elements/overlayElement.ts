import {inject} from '#inject';
import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {CloseOverlayAction} from '../actions/closeOverlayAction.ts';
import {overlayElementStyle} from './overlayElementStyle.ts';

@customElement('cc-overlay')
export class OverlayElement extends LitElement {
    static styles = overlayElementStyle;

    @property({type: Boolean})
    isCancelEnabled: boolean = true;

    @state()
    private hasHeader = false;

    private handleHeaderSlotChange = (event: Event) => {
        const slot = event.target as HTMLSlotElement;
        this.hasHeader = slot.assignedNodes({flatten: true}).length > 0;
    }

    render() {
        return html`
            <div class="overlay-container">
                <div class="overlay-header" ?hidden=${!this.hasHeader}>
                    <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
                </div>

                <div class="overlay-body-section">
                    <div class="overlay-body">
                        <slot></slot>
                    </div>
                </div>

                <div class="overlay-footer">
                    ${when(this.isCancelEnabled, () => this.renderCancelButton())}
                    <slot name="footer"></slot>
                </div>
            </div>
        `;
    }

    private renderCancelButton() {
        return html`
            <cc-dialog-button @click=${this.handleCancel}>Cancel</cc-dialog-button>
        `;
    }

    private handleCancel = () => {
        this.close();
    }

    private close() {
        inject(CloseOverlayAction).run();
        this.dispatchEvent(new CustomEvent('close'));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-overlay': OverlayElement
    }
}
