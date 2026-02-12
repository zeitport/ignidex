import {HoverHint} from '#core/hoverHint.ts';
import {i18n, t} from '#i18n';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import type {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {groupSectionStyle} from './groupSectionStyle.ts';
import {
    activeContextMenu,
    selectedCard,
    selectedSection,
    selectedGroup,
    bookmarkOnClickAction,
    bookmarkDragDrop,
    bookmarkDragDropTarget,
    bookmarkDragDropInsertPosition, userState
} from '#state';
import {bookmarkContextMenuItems} from '#app/contextMenus/bookmarkContextMenuItems.ts';
import {bookmarkSectionContextMenuItems} from '#app/contextMenus/bookmarkSectionContextMenuItems.ts';
import {groupContextMenuItems} from '#app/contextMenus/groupContextMenuItems.ts';
import {BookmarkOnClickAction} from '#models/idb/bookmarkOnClickAction.ts';

@customElement('cc-groups-section')
export class GroupSectionElement extends LitElement {
    static styles = groupSectionStyle;

    private dragDrop = bookmarkDragDrop.watch(this);
    private dragDropTarget = bookmarkDragDropTarget.watch(this);

    private dragHoldTimer: ReturnType<typeof setTimeout> | null = null;
    private pendingDragCard: Card | null = null;
    private pendingDragGroupId: string | null = null;

    @property()
    section: CardSection | null = null;

    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearDragTimer();
    }

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
            <div class="bookmark-group" id="${group.id}">
                <h2 class="group-title" @contextmenu=${(event: MouseEvent) => this.handleGroupContextMenu(event, group)}>${group.name}</h2>
                <div class="bookmark-group-items">
                    ${group.cards.map(card => this.renderCard(card, group))}
                </div>
            </div>
        `;
    }

    renderCard(card: Card, group: CardGroup) {
        const isDragging = this.dragDrop.value?.draggedCard.id === card.id;
        const isDropTarget = this.dragDropTarget.value?.id === card.id && this.dragDrop.value !== null;

        const classes = {
            'bookmark-item': true,
            'dragging': isDragging,
            'drop-target': isDropTarget
        };

        return html`
            <div class="${classMap(classes)}"
                 id="${card.id}"
                 ${hoverHint(i18n.token.hints.bookmark)}
                 @click=${(event: MouseEvent) => this.handleCardClick(event, card)}
                 @auxclick=${(event: MouseEvent) => this.handleAuxClick(event, card)}
                 @contextmenu=${(event: MouseEvent) => this.handleCardContextMenu(event, card)}
                 @mousedown=${(event: MouseEvent) => this.handleCardMouseDown(event, card, group)}
                 @mouseenter=${() => this.handleCardMouseEnter(card)}
                 >
                <div class="bookmark-item-background"></div>

                <div class="bookmark-item-content">
                    <cc-card-icon .card=${card}></cc-card-icon>
                    <div class="bookmark-label">${card.name}</div>
                </div>

                <div class="drop-zone-container" @mouseleave=${() => this.handleCardMouseLeave(card)}>
                    <div class="drop-zone top"
                         @mouseenter=${() => {
                             HoverHint.show(t.hints.dropZoneTop);
                             bookmarkDragDropInsertPosition.value = 'before';
                         }}></div>
                    <div class="drop-zone bottom"
                         @mouseenter=${() => bookmarkDragDropInsertPosition.value = 'after'}></div>
                </div>
            </div>
        `;
    }

    private handleCardClick(event: MouseEvent, card: Card) {
        this.clearDragTimer();
        if (!card.url) return;

        const shouldOpenInNewTab =
            event.ctrlKey ||
            event.metaKey ||
            bookmarkOnClickAction.value === BookmarkOnClickAction.openInNewTab;
        if (shouldOpenInNewTab) {
            window.open(card.url, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = card.url;
        }
    }

    private handleAuxClick(event: MouseEvent, card: Card) {
        if (!card.url) return;
        const wasMiddleClick = event.button === 1;

        if (wasMiddleClick) {
            window.open(card.url, '_blank', 'noopener,noreferrer');
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

    private pendingDragCursorX = 0;
    private pendingDragCursorY = 0;

    private handleCardMouseDown(event: MouseEvent, card: Card, group: CardGroup) {
        if (event.button !== 0) return; // Only left click
        this.clearDragTimer();

        this.pendingDragCard = card;
        this.pendingDragGroupId = group.id;
        this.pendingDragCursorX = event.clientX;
        this.pendingDragCursorY = event.clientY;

        this.dragHoldTimer = setTimeout(() => {
            if (this.pendingDragCard && this.pendingDragGroupId && this.section) {
                console.log('Set bookmarkDragDrop', card, group);
                bookmarkDragDrop.value = {
                    draggedCard: this.pendingDragCard,
                    sourceGroupId: this.pendingDragGroupId,
                    sourceSectionId: this.section.id,
                    cursorX: this.pendingDragCursorX,
                    cursorY: this.pendingDragCursorY
                };
            }
            this.pendingDragCard = null;
            this.pendingDragGroupId = null;
        }, userState.value.dragHoldDelay);
    }

    private handleCardMouseLeave(card: Card) {
        console.log('handleCardMouseLeave', card);
        // Cancel pending drag if mouse leaves the card before timer completes
        if (this.pendingDragCard?.id === card.id) {
            this.clearDragTimer();
        }

        // Clear drop target if leaving the current target
        if (bookmarkDragDropTarget.value?.id === card.id) {
            bookmarkDragDropTarget.value = null;
        }
    }

    private handleCardMouseEnter(card: Card) {
        // Set drop target when hovering over a card while dragging
        if (bookmarkDragDrop.value && bookmarkDragDrop.value.draggedCard.id !== card.id) {
            console.log('Update bookmarkDragDropTarget', card.id);
            bookmarkDragDropTarget.value = card;
        }
    }

    private clearDragTimer() {
        if (this.dragHoldTimer) {
            clearTimeout(this.dragHoldTimer);
            this.dragHoldTimer = null;
        }
        this.pendingDragCard = null;
        this.pendingDragGroupId = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-groups-section': GroupSectionElement
    }
}
