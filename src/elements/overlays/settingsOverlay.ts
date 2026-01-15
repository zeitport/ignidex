import {html, LitElement, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeOverlay} from '#state';
import {ListItem} from '../listElement.ts';
import {mdiPalette, mdiDatabase, mdiInformationOutline, mdiKeyboard} from '@mdi/js';
import '../overlayElement.ts';
import '../listElement.ts';
import '../settings/uiSettingsPanel.ts';
import '../settings/storageSettingsPanel.ts';
import '../settings/aboutSettingsPanel.ts';
import '../settings/keyboardShortcutsSettingsPanel.ts';
import '../dialogButton.ts';

@customElement('cc-settings-overlay')
export class SettingsOverlay extends LitElement {
    @property({type: Boolean})
    isOpen = false;

    @state()
    private activePanelId: string = 'ui';

    private panels: ListItem[] = [
        {id: 'ui', label: 'UI', icon: mdiPalette},
        {id: 'keyboard', label: 'Keyboard', icon: mdiKeyboard},
        {id: 'storage', label: 'Storage', icon: mdiDatabase},
        {id: 'about', label: 'About', icon: mdiInformationOutline},
    ];

    static styles = css`
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
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <div class="settings-container">
                    <div class="settings-sidebar">
                        <cc-list
                            .items=${this.panels}
                            .selectedId=${this.activePanelId}
                            @selected=${(event: CustomEvent<ListItem>) => this.activePanelId = event.detail.id}
                        ></cc-list>
                    </div>
                    <div class="settings-content">
                        ${this.renderActivePanel()}
                    </div>
                </div>

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Close</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private renderActivePanel() {
        switch (this.activePanelId) {
            case 'ui':
                return html`<cc-ui-settings-panel></cc-ui-settings-panel>`;
            case 'keyboard':
                return html`<cc-keyboard-shortcuts-settings-panel></cc-keyboard-shortcuts-settings-panel>`;
            case 'storage':
                return html`<cc-storage-settings-panel></cc-storage-settings-panel>`;
            case 'about':
                return html`<cc-about-settings-panel></cc-about-settings-panel>`;
            default:
                return html``;
        }
    }

    private handleClose = () => {
        activeOverlay.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-settings-overlay': SettingsOverlay;
    }
}
