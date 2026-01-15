import {i18n} from '#i18n';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {Card} from '#models/internal/card.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {when} from 'lit/directives/when.js';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {highlightSectionStyles} from './highlightSectionStyles.ts';
import {activeContextMenu, selectedCard, selectedSection, selectedGroup} from '#state';
import {bookmarkContextMenuItems} from '../../app/contextMenus/bookmarkContextMenuItems.ts';
import {highlightSectionContextMenuItems} from '../../app/contextMenus/highlightSectionContextMenuItems.ts';

@customElement('cc-highlight-section')
export class HighlightSectionElement extends LitElement {
    static styles = highlightSectionStyles;

    @property()
    section: CardSection | null = null;

    render() {
        if (!this.section) return html``;

        const allCards = this.section.groups.map(group => group.cards).flat();

        return html`
            <div class="card-section">
                <div class="section-title" @contextmenu=${(event: MouseEvent) => this.handleSectionContextMenu(event)}>${this.section.name}</div>

                <div class="bookmarks" @contextmenu=${(event: MouseEvent) => this.handleSectionContextMenu(event)}>
                    ${allCards.map(card => html`
                        <div class="bookmark"
                             ${hoverHint(i18n.token.hints.bookmark)}
                             @click=${(event: MouseEvent) => this.handleAppClick(event, card)}
                             @contextmenu=${(event: MouseEvent) => this.handleCardContextMenu(event, card)}
                             >
                            <div class="bookmark-background"></div>
                            <cc-card-icon .card="${card}" style="--icon-size: 1.75rem"></cc-card-icon>
                            <div class="meta">
                                <div class="name">${card.name ?? ''}</div>
                                ${when(card.description, description => html`<div class="url">${description}</div>`)}
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    private handleSectionContextMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        selectedSection.value = this.section;
        selectedGroup.value = this.section?.groups[0] ?? new CardGroup({name: 'Group'});
        activeContextMenu.value = {
            items: highlightSectionContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }

    private handleCardContextMenu(event: MouseEvent, card: Card) {
        event.preventDefault();
        event.stopPropagation();

        if (card.type === 'bookmark') {
            selectedCard.value = card;
            activeContextMenu.value = {
                items: bookmarkContextMenuItems,
                x: event.clientX,
                y: event.clientY
            };
        }
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
