import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {overlayElementStyle} from './overlayElementStyle.ts';

@customElement('cc-overlay')
export class OverlayElement extends LitElement {
    static styles = overlayElementStyle;

    @property({type: Boolean, reflect: true})
    isOpen: boolean = false;

    @property({type: Boolean})
    canBeClosed: boolean = true;

    @state()
    private hasHeader = false;

    @state()
    private hasFooter = false;

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        window.removeEventListener('keydown', this.handleKeyDown);
        super.disconnectedCallback();
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (this.isOpen && this.canBeClosed && event.key === 'Escape') {
            this.close();
        }
    };

    private handleBackdropClick(event: MouseEvent) {
        if (this.canBeClosed && event.target === event.currentTarget) {
            this.close();
        }
    }

    private handleHeaderSlotChange(event: Event) {
        const slot = event.target as HTMLSlotElement;
        this.hasHeader = slot.assignedNodes({flatten: true}).length > 0;
    }

    private handleFooterSlotChange(event: Event) {
        const slot = event.target as HTMLSlotElement;
        this.hasFooter = slot.assignedNodes({flatten: true}).length > 0;
    }

    render() {
        return html`
            <div class="overlay-backdrop" @click=${this.handleBackdropClick}>
                <div class="overlay-container">
                    <div class="overlay-header" ?hidden=${!this.hasHeader}>
                        <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
                    </div>
                    <div class="overlay-body-section">
                        <div class="overlay-body">
                            <slot></slot>
                        </div>
                    </div>
                    <div class="overlay-footer" ?hidden=${!this.hasFooter}>
                        <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                    </div>
                </div>
            </div>
        `;
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
        this.dispatchEvent(new CustomEvent('close'));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-overlay': OverlayElement
    }
}
