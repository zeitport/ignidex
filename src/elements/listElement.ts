import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {listElementStyle} from './listElementStyle.ts';

export interface ListItem {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    iconDataUri?: string;
    badgeText?: string;
}

@customElement('cc-list')
export class ListElement extends LitElement {
    static styles = listElementStyle;

    @property({type: Array})
    items: ListItem[] = [];

    @property({type: String})
    selectedId: string | null = null;

    render() {
        return html`
            ${this.items.map(item => html`
                <div class="list-item ${this.selectedId === item.id ? 'selected' : ''}"
                     @click=${() => this.handleItemClick(item)}
                     @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event, item)}>
                    ${this.renderIcon(item)}
                    <div class="item-info">
                        <span class="item-label">${item.label}</span>
                        ${item.description ? html`<span class="item-description">${item.description}</span>` : ''}
                    </div>
                    ${item.badgeText ? html`<span class="item-badge">${item.badgeText}</span>` : ''}
                </div>
            `)}
        `;
    }

    private renderIcon(item: ListItem) {
        if (item.iconDataUri) {
            return html`<div class="item-icon item-icon-mask" aria-hidden="true" style="--mask-url: url('${item.iconDataUri}')"></div>`;
        }
        if (item.icon) {
            return html`
                <div class="item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="${item.icon}" />
                    </svg>
                </div>
            `;
        }
        return html``;
    }

    private handleItemClick(item: ListItem) {
        this.dispatchEvent(new CustomEvent('selected', {
            detail: item,
            bubbles: true,
            composed: true
        }));
    }

    private handleContextMenu(event: MouseEvent, item: ListItem) {
        this.dispatchEvent(new CustomEvent('item-contextmenu', {
            detail: {item, event},
            bubbles: true,
            composed: true
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-list': ListElement;
    }
}
