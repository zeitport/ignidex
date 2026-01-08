import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {mdiViewDashboardOutline, mdiViewGridPlusOutline} from '@mdi/js';
import {activeOverlay} from '../../app/state.ts';
import {OverlayType} from './overlayType.ts';
import {ListItem} from '../listElement.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {gettingStartedOverlayStyle} from './gettingStartedOverlayStyle.ts';

@customElement('cc-new-section-overlay')
export class NewSectionOverlay extends LitElement {
    static styles = gettingStartedOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    render() {
        const items: ListItem[] = [
            {
                id: 'highlight',
                label: 'Highlight',
                description: 'Large icon + Two text lines',
                icon: mdiViewDashboardOutline
            },
            {
                id: 'groups',
                label: 'Groups',
                description: 'Groups of cards',
                icon: mdiViewGridPlusOutline
            }
        ];

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <h2 slot="header">New Section</h2>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail)}></cc-list>

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleSelect(item: ListItem) {
        if (item.id === 'highlight') {
            activeOverlay.value = OverlayType.editHighlightSection;
        } else if (item.id === 'groups') {
            activeOverlay.value = OverlayType.editGroupsSection;
        }
    }

    private handleClose() {
        activeOverlay.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-new-section-overlay': NewSectionOverlay;
    }
}
