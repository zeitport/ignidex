import type {CardGroup} from '#models/internal/cardGroup.ts';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel, selectedSection, selectedGroup, selectedCard, pastedUrl, cardToMove} from '#state';
import {ListItem} from '#elements';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {Card} from '#models/internal/card.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';
import {OverlayType} from './overlayType.ts';

@customElement('cc-select-group-overlay')
export class SelectGroupOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    private startPanelsStore = inject(StartPanelsStore);

    private selectedSection = selectedSection.watch(this);
    private pastedUrl = pastedUrl.watch(this);
    private cardToMove = cardToMove.watch(this);

    render() {
        const groups: CardGroup[] = this.selectedSection.value?.groups ?? [];
        const items: ListItem[] = groups.map(group => ({
            id: group.id,
            label: group.name || 'Untitled Group'
        }));

        return html`
            <cc-overlay @close=${this.handleClose}>
                <div slot="header">
                    <h2>Select Group</h2>
                    ${this.pastedUrl.value ? html`<div class="info-text">Select a group to create a bookmark for: <span class="info-url">${this.pastedUrl.value}</span></div>` : ''}
                    ${this.cardToMove.value ? html`<div class="info-text">Move "<span class="info-url">${this.cardToMove.value.name}</span>" to:</div>` : ''}
                </div>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail, groups)}></cc-list>
                ${groups.length === 0 ? html`<div>No groups found in this section.</div>` : ''}
            </cc-overlay>
        `;
    }

    private handleSelect = async (item: ListItem, groups: CardGroup[]) => {
        const group = groups.find(group => group.id === item.id);
        if (!group) return;

        if (this.cardToMove.value) {
            await this.moveCardToGroup(this.cardToMove.value, group);
            return;
        }

        selectedGroup.value = group;
        selectedCard.value = null;
        activeOverlay.value = OverlayType.editBookmark;
    }

    private async moveCardToGroup(card: Card, targetGroup: CardGroup) {
        const startPanel = activeStartPanel.value;
        if (!startPanel) return;

        const clonedPanel = StartPanel.clone(startPanel);

        // Remove card from its current location
        let cardRemoved = false;
        for (const section of clonedPanel.sections) {
            for (const group of section.groups) {
                const cardIndex = group.cards.findIndex((item: Card) => item.id === card.id);
                if (cardIndex !== -1) {
                    group.cards.splice(cardIndex, 1);
                    cardRemoved = true;
                    break;
                }
            }
            if (cardRemoved) break;
        }

        if (!cardRemoved) return;

        // Find the target group in the cloned panel and add the card
        let cardAdded = false;
        for (const section of clonedPanel.sections) {
            for (const group of section.groups) {
                if (group.id === targetGroup.id) {
                    group.cards.push(card);
                    cardAdded = true;
                    break;
                }
            }
            if (cardAdded) break;
        }

        if (!cardAdded) return;

        // Save to database
        const updatedEntry = new StartPanelEntry({
            id: clonedPanel.id,
            anchor: clonedPanel.anchor,
            startPanel: clonedPanel
        });

        await this.startPanelsStore.set(updatedEntry);
        activeStartPanel.value = clonedPanel;

        // Clean up state
        cardToMove.value = null;
        selectedSection.value = null;
        selectedGroup.value = null;
        activeOverlay.value = null;
    }

    private handleClose = () => {
        selectedSection.value = null;
        selectedGroup.value = null;
        pastedUrl.value = null;
        cardToMove.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-group-overlay': SelectGroupOverlay;
    }
}
