import {HoverHint} from '#core/hoverHint.ts';
import {i18n, t} from '#i18n';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import type {Card} from '#models/internal/card.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {when} from 'lit/directives/when.js';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {highlightSectionStyles} from './highlightSectionStyles.ts';
import {activeContextMenu, selectedCard, selectedSection, selectedGroup, bookmarkOnClickAction, cardDragDrop, userState} from '#state';
import {bookmarkContextMenuItems} from '../../app/contextMenus/bookmarkContextMenuItems.ts';
import {highlightSectionContextMenuItems} from '../../app/contextMenus/highlightSectionContextMenuItems.ts';
import {BookmarkOnClickAction} from '#models/idb/bookmarkOnClickAction.ts';

@customElement('cc-highlight-section')
export class HighlightSectionElement extends LitElement {
    static styles = highlightSectionStyles;

    private dragDrop = cardDragDrop.watch(this);

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

        const isDragging = this.dragDrop.value !== null;

        // Create cards with their group reference for drag tracking
        const cardsWithGroup: Array<{card: Card; group: CardGroup}> = [];
        for (const group of this.section.groups) {
            for (const card of group.cards) {
                cardsWithGroup.push({card, group});
            }
        }

        // Collect empty groups for placeholder rendering during drag
        const emptyGroups = isDragging ? this.section.groups.filter(group => group.cards.length === 0) : [];

        return html`
            <div class="card-section">
                <div class="section-title" @contextmenu=${(event: MouseEvent) => this.handleSectionContextMenu(event)}>${this.section.name}</div>

                <div class="bookmarks" @contextmenu=${(event: MouseEvent) => this.handleSectionContextMenu(event)}>
                    ${cardsWithGroup.map(({card, group}) => this.renderCard(card, group))}
                    ${emptyGroups.map(group => this.renderEmptyGroupPlaceholder(group))}
                </div>
            </div>
        `;
    }

    private renderEmptyGroupPlaceholder(group: CardGroup) {
        const isGroupDropTarget = this.dragDrop.value?.groupDropTarget?.id === group.id;

        return html`
            <div class="empty-group-placeholder ${isGroupDropTarget ? 'drop-target' : ''}"
                 @mouseenter=${() => this.handleEmptyGroupMouseEnter(group)}
                 @mouseleave=${() => this.handleEmptyGroupMouseLeave(group)}>
                <span class="empty-group-label"></span>
            </div>
        `;
    }

    private renderCard(card: Card, group: CardGroup) {
        const isDragging = this.dragDrop.value?.draggedCard.id === card.id;
        const isDropTarget = this.dragDrop.value?.cardDropTarget?.id === card.id;

        const classes = {
            'bookmark': true,
            'dragging': isDragging,
            'drop-target': isDropTarget
        };

        return html`
            <div class="bookmark-card">
                <div class="${classMap(classes)}"
                     ${hoverHint(i18n.token.hints.bookmark)}
                     @click=${(event: MouseEvent) => this.handleCardClick(event, card)}
                     @auxclick=${(event: MouseEvent) => this.handleAuxClick(event, card)}
                     @contextmenu=${(event: MouseEvent) => this.handleCardContextMenu(event, card)}
                     @mousedown=${(event: MouseEvent) => this.handleCardMouseDown(event, card, group)}
                     @mouseup=${() => this.handleCardMouseUp()}
                     @mouseenter=${() => this.handleCardMouseEnter(card)}
                     >
                    <div class="bookmark-item-background"></div>
                    <cc-card-icon .card="${card}" style="--icon-size: 1.75rem"></cc-card-icon>
                    <div class="meta">
                        <div class="name">${card.name ?? ''}</div>
                        ${when(card.description, description => html`<div class="url">${description}</div>`)}
                    </div>

                    <div class="drop-zone-container" @mouseleave=${() => this.handleCardMouseLeave(card)}>
                        <div class="drop-zone inline-start"
                             @mouseenter=${() => {
                                 HoverHint.show(t.hints.dropZoneInlineStart);
                                 this.setInsertPosition('before');
                             }}></div>
                        <div class="drop-zone inline-end"
                             @mouseenter=${() => {
                                 HoverHint.show(t.hints.dropZoneInlineEnd);
                                 this.setInsertPosition('after');
                             }}></div>
                    </div>
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

    private handleCardClick(event: MouseEvent, card: Card) {
        this.clearDragTimer();
        if (event.button === 2) return; // Ignore right-click (context menu only)
        if (!card.url) return;

        const wasMiddleClick = event.button === 1;
        const shouldOpenInNewTab =
            event.ctrlKey ||
            event.metaKey ||
            bookmarkOnClickAction.value === BookmarkOnClickAction.openInNewTab ||
            wasMiddleClick;

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
                cardDragDrop.value = {
                    draggedCard: this.pendingDragCard,
                    sourceGroupId: this.pendingDragGroupId,
                    sourceSectionId: this.section.id,
                    cursorX: this.pendingDragCursorX,
                    cursorY: this.pendingDragCursorY,
                    cardDropTarget: null,
                    groupDropTarget: null,
                    insertPosition: 'before'
                };
            }
            this.pendingDragCard = null;
            this.pendingDragGroupId = null;
        }, userState.value.dragHoldDelay);
    }

    private handleCardMouseUp() {
        this.clearDragTimer();
    }

    private handleCardMouseLeave(card: Card) {
        // Cancel pending drag if mouse leaves the card before timer completes
        if (this.pendingDragCard?.id === card.id) {
            this.clearDragTimer();
        }

        // Clear drop target if leaving the current target
        const dragState = cardDragDrop.value;
        if (dragState?.cardDropTarget?.id === card.id) {
            cardDragDrop.value = {...dragState, cardDropTarget: null};
        }
    }

    private handleCardMouseEnter(card: Card) {
        // Set drop target when hovering over a card while dragging
        const dragState = cardDragDrop.value;
        if (dragState && dragState.draggedCard.id !== card.id) {
            cardDragDrop.value = {...dragState, cardDropTarget: card, groupDropTarget: null};
        }
    }

    private setInsertPosition(position: 'before' | 'after') {
        const dragState = cardDragDrop.value;
        if (dragState) {
            cardDragDrop.value = {...dragState, insertPosition: position};
        }
    }

    private handleEmptyGroupMouseEnter(group: CardGroup) {
        const dragState = cardDragDrop.value;
        if (dragState) {
            cardDragDrop.value = {...dragState, groupDropTarget: group, cardDropTarget: null};
        }
    }

    private handleEmptyGroupMouseLeave(group: CardGroup) {
        const dragState = cardDragDrop.value;
        if (dragState?.groupDropTarget?.id === group.id) {
            cardDragDrop.value = {...dragState, groupDropTarget: null};
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
        'cc-highlight-section': HighlightSectionElement
    }
}
