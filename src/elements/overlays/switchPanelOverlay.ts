import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel, activeContextMenu, selectedPanelEntry, panelOrderVersion} from '#state';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';
import {switchPanelContextMenuItems} from '../../app/contextMenus/switchPanelContextMenuItems.ts';

@customElement('cc-switch-panel-overlay')
export class SwitchPanelOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    @state()
    private panels: Array<StartPanelEntry> = [];

    private startPanelsStore = inject(StartPanelsStore);
    private panelOrderSubscription: { unsubscribe: () => void } | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.panelOrderSubscription = panelOrderVersion.observe(() => {
            if (this.isOpen) {
                this.loadPanels();
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.panelOrderSubscription?.unsubscribe();
    }

    async updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('isOpen') && this.isOpen) {
            await this.loadPanels();
        }
    }

    private async loadPanels() {
        this.panels = await this.startPanelsStore.getAll();
    }

    render() {
        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <h2 slot="header">Switch Panel</h2>

                <div class="panel-list">
                    ${this.panels.map(entry => html`
                        <div class="panel-item"
                             @click=${() => this.handleSelect(entry)}
                             @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event, entry)}>
                            <div class="panel-info">
                                <span class="panel-label">${entry.startPanel.header?.title || 'Untitled'}</span>
                                <span class="panel-description">#${entry.anchor}</span>
                            </div>
                        </div>
                    `)}
                </div>
                ${this.panels.length === 0 ? html`<div>No local panels found.</div>` : ''}

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleSelect(entry: StartPanelEntry) {
        activeStartPanel.value = entry.startPanel;
        this.handleClose();
    }

    private handleContextMenu(event: MouseEvent, entry: StartPanelEntry) {
        event.preventDefault();
        event.stopPropagation();

        selectedPanelEntry.value = entry;
        activeContextMenu.value = {
            items: switchPanelContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
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
