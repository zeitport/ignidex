import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel} from '../../app/state.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {ListItem} from '../listElement.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';

@customElement('cc-switch-panel-overlay')
export class SwitchPanelOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    @state()
    private panels: Array<StartPanelEntry> = [];

    private startPanelsStore = inject(StartPanelsStore);

    async updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('isOpen') && this.isOpen) {
            this.panels = await this.startPanelsStore.getAll();
        }
    }

    render() {
        const items: ListItem[] = this.panels.map(entry => ({
            id: entry.id,
            label: entry.startPanel.header?.title || 'Untitled',
            description: `#${entry.anchor}`
        }));

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <h2 slot="header">Switch Panel</h2>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail)}></cc-list>
                ${this.panels.length === 0 ? html`<div>No local panels found.</div>` : ''}

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleSelect(item: ListItem) {
        const entry = this.panels.find(panel => panel.id === item.id);
        if (entry) {
            activeStartPanel.value = entry.startPanel;
            this.handleClose();
        }
    }

    private handleClose() {
        activeOverlay.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-switch-panel-overlay': SwitchPanelOverlay;
    }
}
