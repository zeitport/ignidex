import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {Card} from '../../models/internal/card.ts';
import {CardSection} from '../../models/internal/cardSection.ts';
import {highlightSectionStyles} from './highlightSectionStyles.ts';

@customElement('cc-highlight-section')
export class HighlightSectionElement extends LitElement {
    static styles = highlightSectionStyles;

    @property()
    section: CardSection | null = null;

    render() {
        if (!this.section) return html``;

        const allCards = this.section?.groups.map(group => group.cards).flat();

        return html`
            ${this.section.name ? html`<div class="section-title" @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event)}>${this.section.name}</div>` : ''}

            <div class="apps" @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event)}>
                ${allCards.map(card => html`
                    <div class="app" @click=${(event: MouseEvent) => this.handleAppClick(event, card)} @contextmenu=${(event: MouseEvent) => this.handleCardContextMenu(event, card)}>
                        <cc-card-icon .card="${card}" size="1.5rem"></cc-card-icon>
                        <div class="meta">
                            <div class="name">${card.name ?? ''}</div>
                            <div class="url">${card.description ?? ''}</div>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    private handleContextMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.dispatchEvent(new CustomEvent('section-context-menu', {
            detail: {
                event,
                section: this.section,
                x: event.clientX,
                y: event.clientY,
            },
            bubbles: true,
            composed: true
        }));
    }

    private handleCardContextMenu(event: MouseEvent, card: Card) {
        event.preventDefault();
        event.stopPropagation();

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

    handleAppClick(event: MouseEvent, card: Card) {
        console.log(`Clicking card`, {card});

        if (card.url) {
            if (event.ctrlKey || event.metaKey) {
                window.open(card.url, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = card.url;
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-highlight-section': HighlightSectionElement
    }
}
