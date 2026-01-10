import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {mdiFileDocumentOutline, mdiFlask} from '@mdi/js';
import {activeOverlay, activeStartPanel} from '../../app/state.ts';
import {inject} from '#core/injector.ts';
import {loadDataFromUrl} from '../../core/loadDataFromUrl.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '../../models/idb/startPanelEntry.ts';
import {StartPanel} from '../../models/internal/startPanel.ts';
import {StartPanelHeader} from '../../models/internal/startPanelHeader.ts';
import {ListItem} from '../listElement.ts';
import '../overlayElement.ts';
import '../listElement.ts';
import {gettingStartedOverlayStyle} from './gettingStartedOverlayStyle.ts';

@customElement('cc-getting-started-overlay')
export class GettingStartedOverlay extends LitElement {
    static styles = gettingStartedOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    private startPanelsStore = inject(StartPanelsStore);

    render() {
        const items: ListItem[] = [
            {
                id: 'empty',
                label: 'Empty Panel',
                description: 'Start with a new empty panel',
                icon: mdiFileDocumentOutline
            },
            {
                id: 'demo',
                label: 'Demo Panel',
                description: 'Load the build-in demo panel to test all features.',
                icon: mdiFlask
            }
        ];

        return html`
            <cc-overlay ?isOpen=${this.isOpen} .canBeClosed=${false}>
                <h2 slot="header">Getting Started</h2>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail)}></cc-list>
            </cc-overlay>
        `;
    }

    private handleSelect(item: ListItem) {
        if (item.id === 'empty') {
            this.handleStartEmpty();
        } else if (item.id === 'demo') {
            this.handleLoadTest();
        }
    }

    private async handleStartEmpty() {
        const panel = new StartPanel({header: new StartPanelHeader({title: 'New Panel'})});
        await this.startPanelsStore.set(new StartPanelEntry({id: panel.id, startPanel: panel}));
        activeStartPanel.value = panel;
        this.handleClose();
    }

    private async handleLoadTest() {
        const panel = await loadDataFromUrl('/store/test.json');
        await this.startPanelsStore.set(new StartPanelEntry({id: panel.id, startPanel: panel}));
        activeStartPanel.value = panel;
        this.handleClose();
    }

    private handleClose() {
        activeOverlay.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-getting-started-overlay': GettingStartedOverlay;
    }
}
