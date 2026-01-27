import {diceContextMenuItems} from '#app/contextMenus/diceContextMenuItems.ts';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {t} from '#i18n';
import {Icon} from '#models/internal/icon.ts';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {
    mdiDice1,
    mdiDice2,
    mdiDice3,
    mdiDice4,
    mdiDice5,
    mdiDice6,
    mdiFileDocumentOutline,
    mdiFlask,
    mdiImport
} from '@mdi/js';
import {activeStartPanel, activeRemoteUrl, activeContextMenu, diceRollResult} from '#state';
import {inject} from '#core/injector.ts';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {loadDataFromUrl} from '../../core/loadDataFromUrl.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '../../models/idb/startPanelEntry.ts';
import {StartPanel} from '../../models/internal/startPanel.ts';
import {StartPanelHeader} from '../../models/internal/startPanelHeader.ts';
import {ListItem} from '../listElement.ts';
import {gettingStartedOverlayStyle} from './gettingStartedOverlayStyle.ts';

@customElement('cc-getting-started-overlay')
export class GettingStartedOverlay extends LitElement {
    static styles = gettingStartedOverlayStyle;

    private startPanelsStore = inject(StartPanelsStore);

    private diceIcons = [mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6];

    constructor() {
        super();
        diceRollResult.watch(this);
    }

    render() {
        const items: ListItem[] = [
            {
                id: 'demo',
                label: 'Ignidex Demo',
                description: 'Load the build-in demo panel to explore all features.',
                icon: Icon.fromMdiIcon(mdiFlask),
                badgeText: 'Recommended',
            },
            {
                id: 'import',
                label: 'Import',
                description: 'Import a ignidex JSON file.',
                icon: Icon.fromMdiIcon(mdiImport),
            },
            {
                id: 'empty',
                label: 'Empty Panel',
                description: 'Start with a new empty panel',
                icon: Icon.fromMdiIcon(mdiFileDocumentOutline),
            }
        ];

        const currentDiceValue: number = diceRollResult.value ?? 2;
        const currentDiceIcon = this.diceIcons[currentDiceValue - 1];

        return html`
            <cc-overlay .isCancelEnabled=${false}>
                 <section class="intro">

                    <h1><img class="app-icon" src="/favicon.svg" alt="favicon"> Ignidex</h1>

                    <p>
                        Ignidex is a calm, local-first start page<br>
                        for organizing links and small pieces of information.
                    </p>

                    <p class="statement" hoverHint="">
                        Without the clutter of dashboards.
                    </p>
                </section>

                <section class="feature-list">
                    <div aria-label="feature-1" class="feature-card">
                        ${this.renderIcon(mdiDice1)}
                        <h3>Local-first & private</h3>
                    </div>

                    <div
                        aria-label="feature-2"
                        class="feature-card"
                        ${hoverHint(t.hints.featureRightClick)}
                        @contextmenu=${this.handleContextMenu}
                        >
                        ${this.renderIcon(currentDiceIcon)}
                        <h3>Context menus everywhere</h3>
                    </div>

                    <div aria-label="feature-3" class="feature-card">
                        ${this.renderIcon(mdiDice3)}
                        <h3>Export / Import data</h3>
                    </div>
                </section>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail)}></cc-list>
            </cc-overlay>
        `;
    }

    private renderIcon(iconPath: string) {
        return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${iconPath}" /></svg>`
    }

    private handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        activeContextMenu.value = {
            items: diceContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
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
        const entry = new StartPanelEntry({id: panel.id, startPanel: panel});
        await this.startPanelsStore.set(entry);
        activeStartPanel.value = panel;
        activeRemoteUrl.value = null;
        inject(CloseOverlayAction).run();
    }

    private async handleLoadTest() {
        const panel = await loadDataFromUrl('/examples/ignidex.json');
        const entry = new StartPanelEntry({id: panel.id, startPanel: panel});
        await this.startPanelsStore.set(entry);
        activeStartPanel.value = panel;
        activeRemoteUrl.value = null;
        inject(CloseOverlayAction).run();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-getting-started-overlay': GettingStartedOverlay;
    }
}
