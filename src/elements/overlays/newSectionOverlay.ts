import {Icon} from '#models/internal/icon.ts';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {mdiViewDashboardOutline, mdiViewGridPlusOutline} from '@mdi/js';
import {activeOverlay} from '#state';
import {OverlayType} from './overlayType.ts';
import {ListItem} from '../listElement.ts';
import {gettingStartedOverlayStyle} from './gettingStartedOverlayStyle.ts';

@customElement('cc-new-section-overlay')
export class NewSectionOverlay extends LitElement {
    static styles = gettingStartedOverlayStyle;

    render() {
        const items: ListItem[] = [
            {
                id: 'highlight',
                label: 'Highlight',
                description: 'Large icon + Two text lines',
                icon: Icon.fromMdiIcon(mdiViewDashboardOutline)
            },
            {
                id: 'groups',
                label: 'Groups',
                description: 'Groups of cards',
                icon: Icon.fromMdiIcon(mdiViewGridPlusOutline)
            }
        ];

        return html`
            <cc-overlay>
                <h2 slot="header">New Section</h2>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail)}></cc-list>
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
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-new-section-overlay': NewSectionOverlay;
    }
}
