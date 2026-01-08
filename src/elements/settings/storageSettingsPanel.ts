import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import './settingsSection.ts';
import './settingsHeader.ts';
import {IconAssetsStore} from '../../core/iconAssetsStore.ts';
import {inject} from '#inject';

@customElement('cc-storage-settings-panel')
export class StorageSettingsPanel extends LitElement {
    private iconAssetsStore = inject(IconAssetsStore);

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

    async connectedCallback() {
        super.connectedCallback();
        await this.calculateStorageSize();
    }

    private async calculateStorageSize() {
        const assets = await this.iconAssetsStore.getAll();
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
            <cc-settings-header>Storage Settings</cc-settings-header>

            <cc-settings-section>
                <span slot="label">Icon Assets Cache</span>
                <div class="storage-info">
                    ${this.storageSizeMB} MB
                </div>
                <div slot="description" class="storage-details">
                    ${this.iconCount} icons stored locally.
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
