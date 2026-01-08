import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {activeOverlay, selectedSection, selectedGroup, selectedCard, pastedUrl} from '../../app/state.ts';
import {ListItem} from '#elements';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';
import {OverlayType} from './overlayType.ts';

@customElement('cc-select-group-overlay')
export class SelectGroupOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    private selectedSection = selectedSection.watch(this);
    private pastedUrl = pastedUrl.watch(this);

    render() {
        const groups = this.selectedSection.value?.groups ?? [];
        const items: ListItem[] = groups.map(group => ({
            id: group.id,
            label: group.name || 'Untitled Group'
        }));

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <div slot="header">
                    <h2>Select Group</h2>
                    ${this.pastedUrl.value ? html`<div class="info-text">Select a group to create a bookmark for: <span class="info-url">${this.pastedUrl.value}</span></div>` : ''}
                </div>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail, groups)}></cc-list>
                ${groups.length === 0 ? html`<div>No groups found in this section.</div>` : ''}

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleSelect(item: ListItem, groups: any[]) {
        const group = groups.find(group => group.id === item.id);
        if (!group) return;

        selectedGroup.value = group;
        selectedCard.value = null;
        activeOverlay.value = OverlayType.editBookmark;
    }

    private handleClose() {
        activeOverlay.value = null;
        selectedSection.value = null;
        selectedGroup.value = null;
        pastedUrl.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-group-overlay': SelectGroupOverlay;
    }
}
