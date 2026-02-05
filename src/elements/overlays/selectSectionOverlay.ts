import {clonePanel} from '#models/mapper/clonePanel.ts';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel, selectedSection, selectedGroup, selectedCard, pastedUrl, cardToMove} from '#state';
import {CardSectionType} from '#models/internal/cardSectionType.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {Card} from '#models/internal/card.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {inject} from '#core/injector.ts';
import {ListItem} from '#elements';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';
import {OverlayType} from './overlayType.ts';

@customElement('cc-select-section-overlay')
export class SelectSectionOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    private startPanelsStore = inject(StartPanelsStore);

    private activeStartPanel = activeStartPanel.watch(this);
    private pastedUrl = pastedUrl.watch(this);
    private cardToMove = cardToMove.watch(this);

    render() {
        const sections = this.activeStartPanel.value?.sections.filter(section => section.type === CardSectionType.Groups || section.type === CardSectionType.Highlight) ?? [];
        const items: ListItem[] = sections.map(section => ({
            id: section.id,
            label: section.name || 'Untitled Section'
        }));

        return html`
            <cc-overlay @close=${this.handleClose}>
                <div slot="header">
                    <h2>Select Section</h2>
                    ${this.pastedUrl.value ? html`<div class="info-text">Select a section to create a bookmark for: <span class="info-url">${this.pastedUrl.value}</span></div>` : ''}
                    ${this.cardToMove.value ? html`<div class="info-text">Move "<span class="info-url">${this.cardToMove.value.name}</span>" to:</div>` : ''}
                </div>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail, sections)}></cc-list>
                ${sections.length === 0 ? html`<div>No sections found.</div>` : ''}
            </cc-overlay>
        `;
    }

    private handleSelect = async (item: ListItem, sections: CardSection[]) => {
        const section = sections.find(section => section.id === item.id);
        if (!section) return;

        selectedSection.value = section;

        if (section.type === CardSectionType.Highlight) {
            const targetGroup = section.groups[0] ?? new CardGroup({name: 'Group'});
            if (this.cardToMove.value) {
                await this.moveCardToGroup(this.cardToMove.value, targetGroup);
                return;
            }
            selectedGroup.value = targetGroup;
            selectedCard.value = null;
            activeOverlay.value = OverlayType.editBookmark;
        } else if (section.groups.length === 0) {
            selectedGroup.value = new CardGroup({name: 'Group'});
            selectedCard.value = null;
            activeOverlay.value = OverlayType.editBookmark;
        } else {
            activeOverlay.value = OverlayType.selectGroup;
        }
    }

    private async moveCardToGroup(card: Card, targetGroup: CardGroup) {
        const startPanel = this.activeStartPanel.value;
        if (!startPanel) return;

        const clonedPanel = clonePanel(startPanel);

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
        pastedUrl.value = null;
        cardToMove.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-section-overlay': SelectSectionOverlay;
    }
}
