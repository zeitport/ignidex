import {i18n} from '#i18n';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {groupSectionStyle} from './groupSectionStyle.ts';
import {activeContextMenu, selectedCard, selectedSection, selectedGroup} from '#state';
import {bookmarkContextMenuItems} from '../../app/contextMenus/bookmarkContextMenuItems.ts';
import {bookmarkSectionContextMenuItems} from '../../app/contextMenus/bookmarkSectionContextMenuItems.ts';
import {groupContextMenuItems} from '../../app/contextMenus/groupContextMenuItems.ts';

@customElement('cc-groups-section')
export class GroupSectionElement extends LitElement {
    static styles = groupSectionStyle;

    @property()
    section: CardSection | null = null;

    render() {
        if (!this.section) return html``;

        return html`
            <div class="card-section">
                <div class="section-title" @contextmenu=${(event: MouseEvent) => this.handleSectionContextMenu(event)}>${this.section.name}</div>

                <div class="grid">
                    ${this.section.groups.map(group => this.renderList(group))}
                </div>
            </div>
        `;
    }

    renderList(group: CardGroup) {
        return html`
            <div class="bookmark-group">
                <h2 class="group-title" @contextmenu=${(event: MouseEvent) => this.handleGroupContextMenu(event, group)}>${group.name}</h2>
                <div class="bookmark-group-items">
                    ${group.cards.map(card => this.renderCard(card))}
                </div>
            </div>
        `;
    }

    renderCard(card: Card) {
        return html`
            <div class="bookmark-item"
                 ${hoverHint(i18n.text.hints.bookmark)}
                 @click=${(event: MouseEvent) => this.handleCardClick(event, card)}
                 @contextmenu=${(event: MouseEvent) => this.handleCardContextMenu(event, card)}
                 >
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

    private handleSectionContextMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        selectedSection.value = this.section;
        selectedGroup.value = null;
        activeContextMenu.value = {
            items: bookmarkSectionContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }

    private handleGroupContextMenu(event: MouseEvent, group: CardGroup) {
        event.preventDefault();
        event.stopPropagation();

        selectedSection.value = this.section;
        selectedGroup.value = group;
        activeContextMenu.value = {
            items: groupContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-groups-section': GroupSectionElement
    }
}
