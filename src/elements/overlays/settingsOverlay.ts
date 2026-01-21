import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ListItem} from '../listElement.ts';
import {mdiPalette, mdiDatabase, mdiInformationOutline, mdiKeyboard, mdiImageMultipleOutline, mdiCompassOutline} from '@mdi/js';
import {Coffee} from 'lucide';
import {lucideIconToDataUri} from '#utils/lucideIconToDataUri.ts';
import '../overlayElement.ts';
import '../listElement.ts';
import '../settings/uiSettingsPanel.ts';
import '../settings/navigationSettingsPanel.ts';
import '../settings/storageSettingsPanel.ts';
import '../settings/aboutSettingsPanel.ts';
import '../settings/keyboardShortcutsSettingsPanel.ts';
import '../settings/imageGallerySettingsPanel.ts';
import '../settings/coffeeSettingsPanel.ts';
import '../dialogButton.ts';

@customElement('cc-settings-overlay')
export class SettingsOverlay extends LitElement {
    @state()
    private activePanelId: string = 'ui';

    private panels: ListItem[] = [
        {id: 'ui', label: 'UI', icon: mdiPalette},
        {id: 'navigation', label: 'Navigation', icon: mdiCompassOutline},
        {id: 'keyboard', label: 'Keyboard', icon: mdiKeyboard},
        {id: 'gallery', label: 'Image Gallery', icon: mdiImageMultipleOutline},
        {id: 'storage', label: 'Storage', icon: mdiDatabase},
        {id: 'coffee', label: 'Coffee', iconDataUri: lucideIconToDataUri(Coffee)},
        {id: 'about', label: 'About', icon: mdiInformationOutline}
    ];

    static styles = css`
        :host {
            display: block;
            position: absolute;
            inset: 0;
        }

        .settings-container {
            display: flex;
            min-height: 60vh;
        }

        .settings-sidebar {
            width: 200px;
            padding-right: 1rem;
        }

        .settings-content {
            flex: 1;
            padding-left: 2rem;
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
                            @selected=${(event: CustomEvent<ListItem>) => this.activePanelId = event.detail.id}
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
