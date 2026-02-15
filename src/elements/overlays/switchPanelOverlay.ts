import {hoverHint} from '#core/hoverHintDirective.ts';
import {i18n} from '#i18n';
import {Icon} from '#models/internal/icon.ts';
import {html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {activeStartPanel, activeRemoteUrl, activeContextMenu, selectedPanelEntry, panelOrderVersion} from '#state';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {IconResolver} from '#core/iconResolver.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {type ListItem} from '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';
import {switchPanelContextMenuItems} from '../../contextMenus/switchPanelContextMenuItems.ts';

@customElement('cc-switch-panel-overlay')
export class SwitchPanelOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    @state()
    private panels: Array<StartPanelEntry> = [];

    @state()
    private listItems: ListItem[] = [];

    private startPanelsStore = inject(StartPanelsStore);
    private iconResolver = inject(IconResolver);
    private panelOrderSubscription: { unsubscribe: () => void } | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.panelOrderSubscription = panelOrderVersion.observe(() => {
            this.loadPanels();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.panelOrderSubscription?.unsubscribe();
    }

    private async loadPanels() {
        this.panels = await this.startPanelsStore.getAll();
        await this.buildListItems();
    }

    private async buildListItems() {
        const items: ListItem[] = [];

        for (const entry of this.panels) {
            const iconId = entry.startPanel.header?.icon ?? null;
            const result = await this.iconResolver.resolveById(iconId);

            items.push({
                id: entry.id,
                label: entry.startPanel.header?.title || 'Untitled',
                description: `#${entry.anchor}`,
                icon: Icon.fromDataUri(result.dataUri),
                badgeText: entry.remoteUrl ? i18n.token.remotePanel.badge : undefined
            });
        }

        this.listItems = items;
    }

    render() {
        return html`
            <cc-overlay>
                <h2 slot="header">Switch Panel</h2>

                <cc-list
                    .items=${this.listItems}
                    ${hoverHint(i18n.token.hints.switchPanelListItem)}
                    @selected=${this.handleListSelect}
                    @item-contextmenu=${this.handleListContextMenu}>
                </cc-list>

                ${this.panels.length === 0 ? html`<div>No local panels found.</div>` : ''}
            </cc-overlay>
        `;
    }

    private findPanelEntry(itemId: string): StartPanelEntry | undefined {
        return this.panels.find(panel => panel.id === itemId);
    }

    private handleListSelect = (customEvent: CustomEvent<ListItem>) => {
        const entry = this.findPanelEntry(customEvent.detail.id);

        if (entry) {
            activeStartPanel.value = entry.startPanel;
            activeRemoteUrl.value = entry.remoteUrl ?? null;
            inject(CloseOverlayAction).run();
        }
    };

    private handleListContextMenu = (customEvent: CustomEvent<{item: ListItem; event: MouseEvent}>) => {
        const {item, event} = customEvent.detail;
        event.preventDefault();
        event.stopPropagation();

        const entry = this.findPanelEntry(item.id);
        if (entry) {
            selectedPanelEntry.value = entry;
            activeContextMenu.value = {
                items: switchPanelContextMenuItems,
                x: event.clientX,
                y: event.clientY
            };
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-switch-panel-overlay': SwitchPanelOverlay;
    }
}
