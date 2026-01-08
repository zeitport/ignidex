import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel, selectedSection, selectedGroup, selectedCard, pastedUrl} from '../../app/state.ts';
import {CardSectionType} from '#models/internal/cardSectionType.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {ListItem} from '../listElement.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';
import {OverlayType} from './overlayType.ts';

@customElement('cc-select-section-overlay')
export class SelectSectionOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    private activeStartPanel = activeStartPanel.watch(this);
    private pastedUrl = pastedUrl.watch(this);

    render() {
        const sections = this.activeStartPanel.value?.sections.filter(section => section.type === CardSectionType.Groups) ?? [];
        const items: ListItem[] = sections.map(section => ({
            id: section.id,
            label: section.name || 'Untitled Section'
        }));

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <div slot="header">
                    <h2>Select Section</h2>
                    ${this.pastedUrl.value ? html`<div class="info-text">Select a section to create a bookmark for: <span class="info-url">${this.pastedUrl.value}</span></div>` : ''}
                </div>

                <cc-list .items=${items} @click=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail, sections)}></cc-list>
                ${sections.length === 0 ? html`<div>No group sections found.</div>` : ''}

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleSelect(item: ListItem, sections: CardSection[]) {
        const section = sections.find(section => section.id === item.id);
        if (!section) return;

        selectedSection.value = section;
        if (section.groups.length === 0) {
            selectedGroup.value = new CardGroup({name: 'Group'});
            selectedCard.value = null;
            activeOverlay.value = OverlayType.editBookmark;
        } else {
            activeOverlay.value = OverlayType.selectGroup;
        }
    }

    private handleClose() {
        activeOverlay.value = null;
        selectedSection.value = null;
        pastedUrl.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-section-overlay': SelectSectionOverlay;
    }
}
