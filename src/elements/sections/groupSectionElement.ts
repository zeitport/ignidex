import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {groupSectionStyle} from './groupSectionStyle.ts';

@customElement('cc-groups-section')
export class GroupSectionElement extends LitElement {
    static styles = groupSectionStyle;

    @property()
    section: CardSection | null = null;

    render() {
        if (!this.section) return html``;

        return html`
            <div class="card-section">
                <div class="section-title" @contextmenu=${(event: MouseEvent) => this.dispatchSectionContextMenuEvent(event)}>${this.section.name}</div>

                <div class="grid">
                    ${this.section.groups.map(group => this.renderList(group))}
                </div>
            </div>
        `;
    }

    renderList(group: CardGroup) {
        return html`
            <div class="bookmark-group">
                <h2 class="group-title" @contextmenu=${(event: MouseEvent) => this.dispatchGroupContextMenuEvent(event, group)}>${group.name}</h2>
                <div class="bookmark-group-items">
                    ${group.cards.map(card => this.renderCard(card))}
                </div>
            </div>
        `;
    }

    renderCard(card: Card) {
        return html`
            <div class="bookmark-item"
                 @click=${(event: MouseEvent) => this.handleCardClick(event, card)}
                 @contextmenu=${(event: MouseEvent) => this.dispatchCardContextMenuEvent(event, card)}>
                <div class="bookmark-item-background"></div>
                <div class="bookmark-item-content">
                    <cc-card-icon .card=${card}></cc-card-icon>
                    <div class="bookmark-label">${card.name}</div>
                </div>
            </div>
        `;
    }

    private handleCardClick(event: MouseEvent, card: Card) {
        if (!card.url) return;

        if (event.ctrlKey || event.metaKey) {
            window.open(card.url, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = card.url;
        }
    }

    private dispatchCardContextMenuEvent(event: MouseEvent, card: Card) {
        event.preventDefault();
        event.stopPropagation();

        console.log('Dispatching CardContextMenuEvent', event, card);
        this.dispatchEvent(new CustomEvent('card-context-menu', {
            detail: {
                event,
                card,
                x: event.clientX,
                y: event.clientY,
            },
            bubbles: true,
            composed: true
        }));
    }

    private dispatchSectionContextMenuEvent(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        console.log('Dispatching Section ContextMenuEvent', event);
        this.dispatchEvent(new CustomEvent('section-context-menu', {
            detail: {
                event,
                section: this.section,
                x: event.clientX,
                y: event.clientY,
            },
            bubbles: true,
            composed: true
        }))
    }

    private dispatchGroupContextMenuEvent(event: MouseEvent, group: CardGroup) {
        event.preventDefault();
        event.stopPropagation();

        console.log('Dispatching Group ContextMenuEvent', event, group);
        this.dispatchEvent(new CustomEvent('group-context-menu', {
            detail: {
                event,
                section: this.section,
                group,
                x: event.clientX,
                y: event.clientY,
            },
            bubbles: true,
            composed: true
        }))
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-groups-section': GroupSectionElement
    }
}
