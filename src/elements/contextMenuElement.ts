import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import type {ContextMenuItem} from './contextMenuItem.ts';
import {contextMenuElementStyle} from './contextMenuElementStyle.ts';
import { when } from 'lit/directives/when.js';

@customElement('cc-context-menu')
export class ContextMenuElement extends LitElement {
    static styles = contextMenuElementStyle;

    @property({type: Array})
    items: Array<ContextMenuItem> = [];

    @state()
    x: number = 0;

    @state()
    y: number = 0;

    @property({type: Boolean, reflect: true})
    isOpen: boolean = false;

    @state()
    private disabledStates: Map<ContextMenuItem, boolean> = new Map();

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (this.isOpen && event.key === 'Escape') {
            this.close();
        }
    };

    async updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('items')) {
            await this.computeDisabledStates();
        }
    }

    private async computeDisabledStates() {
        const newStates = new Map<ContextMenuItem, boolean>();

        for (const item of this.items) {
            if (item.divider) continue;

            let isDisabled = false;
            if (item.action?.isDisabled) {
                isDisabled = await item.action.isDisabled();
            }
            newStates.set(item, isDisabled);
        }

        this.disabledStates = newStates;
    }

    render() {
        if (!this.isOpen) return html``;

        const offsetX = -48;
        const offsetY = -20;

        this.style.position = 'absolute';
        this.style.left = `${this.x + offsetX}px`;
        this.style.top = `${this.y + offsetY}px`;

        return html`
            <div class="menu">
                ${this.items.map(item => this.renderItem(item))}
            </div>
        `;
    }

    open(x: number, y: number) {
        this.isOpen = true;
        this.x = x;
        this.y = y;
    }

    close() {
        this.x = 0;
        this.y = 0;
        this.isOpen = false;
    }

    private renderItem(item: ContextMenuItem) {
        if (item.divider) return this.renderDivider();

        const isDisabled = this.disabledStates.get(item) ?? false;
        return html`
            <div class="menu-item ${isDisabled ? 'disabled' : ''}"
                 title="${item.tooltip}"
                 @click=${() => this.handleAction(item)}>
                ${when(item.icon, icon => this.renderIcon(icon))}
                <span class="label">${item.label}</span>
            </div>
        `;
    }

    private renderDivider() {
        return html`<div class="divider"></div>`;
    }

    private renderIcon(path: string) {
        return html`<svg class="icon"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}" /></svg>`;
    }

    private handleAction(item: ContextMenuItem) {
        const isDisabled = this.disabledStates.get(item) ?? false;
        if (isDisabled) return;

        this.isOpen = false;

        if (item.action) {
            item.action.run();
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-context-menu': ContextMenuElement
    }
}
