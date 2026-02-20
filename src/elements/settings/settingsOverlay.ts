import {t} from '#i18n';
import {Icon} from '#models/internal/icon.ts';
import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ListItem} from '../listElement.ts';
import {
    mdiPalette, mdiDatabase, mdiInformationOutline, mdiKeyboard, mdiImageMultipleOutline, mdiCompassOutline,
    mdiCoffeeOutline
} from '@mdi/js';
import {activeSettingsPanelId} from '#state';
import {updateSettingsUrlParameter} from '#app/settingsUrlParameter.ts';
import '../overlayElement.ts';
import '../listElement.ts';
import './uiSettingsPanel.ts';
import './navigationSettingsPanel.ts';
import './storageSettingsPanel.ts';
import './aboutSettingsPanel.ts';
import './keyboardShortcutsSettingsPanel.ts';
import './imageGallerySettingsPanel.ts';
import './coffeeSettingsPanel.ts';
import '../dialogButton.ts';

const DEFAULT_PANEL_ID = 'ui';

const VALID_PANEL_IDS = ['ui', 'navigation', 'keyboard', 'gallery', 'storage', 'coffee', 'about'];

export function isValidSettingsPanelId(id: string | null): boolean {
    return id !== null && VALID_PANEL_IDS.includes(id);
}

@customElement('cc-settings-overlay')
export class SettingsOverlay extends LitElement {
    @state()
    private activePanelId: string = DEFAULT_PANEL_ID;

    connectedCallback() {
        super.connectedCallback();
        activeSettingsPanelId.watch(this);

        // Initialize from global state if set (e.g., from URL parameter)
        const globalPanelId = activeSettingsPanelId.value;
        if (globalPanelId && isValidSettingsPanelId(globalPanelId)) {
            this.activePanelId = globalPanelId;
        } else {
            this.activePanelId = DEFAULT_PANEL_ID;
        }

        // Update URL with initial panel
        updateSettingsUrlParameter(this.activePanelId);
    }

    private handlePanelSelect(panelId: string) {
        this.activePanelId = panelId;
        activeSettingsPanelId.value = panelId;
        updateSettingsUrlParameter(panelId);
    }

    private panels: ListItem[] = [
        {id: 'ui', label: t.settingsPanel.sidebarUi, icon: Icon.fromMdiIcon(mdiPalette)},
        {id: 'navigation', label: t.settingsPanel.sidebarNavigation, icon: Icon.fromMdiIcon(mdiCompassOutline)},
        {id: 'keyboard', label: t.settingsPanel.sidebarKeyboard, icon: Icon.fromMdiIcon(mdiKeyboard)},
        {id: 'gallery', label: t.settingsPanel.sidebarImageGallery, icon: Icon.fromMdiIcon(mdiImageMultipleOutline)},
        {id: 'storage', label: t.settingsPanel.sidebarStorage, icon: Icon.fromMdiIcon(mdiDatabase)},
        {id: 'coffee', label: t.settingsPanel.sidebarCoffee, icon: Icon.fromMdiIcon(mdiCoffeeOutline)},
        {id: 'about', label: t.settingsPanel.sidebarAbout, icon: Icon.fromMdiIcon(mdiInformationOutline)}
    ];

    static styles = css`
        :host {
            display: block;
            position: absolute;
            inset: 0;
            --overlay-min-height: 80vh;
            --overlay-max-height: 80vh;
        }

        @media (max-height: 1000px) {
            :host {
                --overlay-min-height: 90vh;
                --overlay-max-height: 90vh;
            }
        }

        .settings-container {
            display: flex;
            gap: 2rem;
        }

        .settings-sidebar {
            width: 200px;
        }

        .settings-content {
            flex: 1;
        }
    `;

    render() {
        return html`
            <cc-overlay>
                <div class="settings-container" role="dialog" aria-label="Settings">
                    <div class="settings-sidebar">
                        <cc-list
                            aria-label="Settings Panels"
                            .items=${this.panels}
                            .selectedId=${this.activePanelId}
                            @selected=${(event: CustomEvent<ListItem>) => this.handlePanelSelect(event.detail.id)}
                        ></cc-list>
                    </div>
                    <div class="settings-content">
                        ${this.renderActivePanel()}
                    </div>
                </div>
            </cc-overlay>
        `;
    }

    private renderActivePanel() {
        switch (this.activePanelId) {
            case 'ui':
                return html`<cc-ui-settings-panel></cc-ui-settings-panel>`;
            case 'navigation':
                return html`<cc-navigation-settings-panel></cc-navigation-settings-panel>`;
            case 'keyboard':
                return html`<cc-keyboard-shortcuts-settings-panel></cc-keyboard-shortcuts-settings-panel>`;
            case 'gallery':
                return html`<cc-image-gallery-settings-panel></cc-image-gallery-settings-panel>`;
            case 'storage':
                return html`<cc-storage-settings-panel></cc-storage-settings-panel>`;
            case 'about':
                return html`<cc-about-settings-panel></cc-about-settings-panel>`;
            case 'coffee':
                return html`<cc-coffee-settings-panel></cc-coffee-settings-panel>`;
            default:
                return html``;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-settings-overlay': SettingsOverlay;
    }
}
