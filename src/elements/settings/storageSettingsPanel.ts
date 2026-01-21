import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import './settingsSection.ts';
import './settingsHeader.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {inject} from '#inject';
import {t} from '#i18n';

@customElement('cc-storage-settings-panel')
export class StorageSettingsPanel extends LitElement {
    private imageAssetsStore = inject(ImageAssetsStore);

    @state()
    private storageSizeMB: string = '0.00';

    @state()
    private iconCount: number = 0;

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .storage-info {
            font-size: 2rem;
            color: var(--text);
            font-weight: bold;
        }

        .storage-details {
            font-size: 0.9rem;
            color: var(--muted);
        }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        void this.calculateStorageSize();
    }

    private async calculateStorageSize() {
        const assets = await this.imageAssetsStore.getAll();
        this.iconCount = assets.length;
        let totalBytes = 0;
        for (const asset of assets) {
            if (asset.dataUri) {
                // In JS, string length is the number of 16-bit code units.
                // For base64 data URIs, it's a good approximation of the size in bytes.
                totalBytes += asset.dataUri.length;
            }
        }
        this.storageSizeMB = (totalBytes / (1024 * 1024)).toFixed(2);
    }

    render() {
        return html`
            <cc-settings-header>${t.settingsPanel.storageHeader}</cc-settings-header>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.storageIconCacheLabel}</span>
                <div class="storage-info">
                    ${this.storageSizeMB} MB
                </div>
                <div slot="description" class="storage-details">
                    ${t.settingsPanel.storageIconCount(this.iconCount)}
                </div>
            </cc-settings-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-storage-settings-panel': StorageSettingsPanel;
    }
}
