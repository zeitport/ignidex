import {imageGalleryItemContextMenuItems} from '#app/contextMenus/imageGalleryItemContextMenuItems.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {inject} from '#inject';
import type {ImageAssetEntry} from '#models/idb/imageAssetEntry.ts';
import type {ImageAssetType} from '#models/idb/ImageAssetType.ts';
import {activeContextMenu, selectedImageAsset} from '#state';
import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import type {ImageAssetSelectEvent} from './imageAssetSelectEvent.ts';
import {imageAssetViewerElementStyle} from './imageAssetViewerElementStyle.ts';

@customElement('cc-image-asset-viewer')
export class ImageAssetViewerElement extends LitElement {
    static styles = imageAssetViewerElementStyle;

    private readonly imageAssetsStore = inject(ImageAssetsStore);

    @property({type: String})
    type: ImageAssetType | null = null;

    @property({type: String})
    selectedId: string | null = null;

    @state()
    private assets: ImageAssetEntry[] = [];

    connectedCallback(): void {
        super.connectedCallback();
        void this.loadAssets();
    }

    async loadAssets(): Promise<void> {
        const allAssets = await this.imageAssetsStore.getAll();

        if (this.type) {
            this.assets = allAssets.filter(asset => asset.type === this.type || asset.type == null);
        } else {
            this.assets = allAssets;
        }

        const uniqueAssets = new Map<string, ImageAssetEntry>();

        for(const asset of allAssets) {
            if (asset.dataUri) {
                if (!uniqueAssets.has(asset.dataUri)) {
                    uniqueAssets.set(asset.dataUri, asset);
                }
            } else if (asset.id) {
                if (!uniqueAssets.has(asset.id)) {
                    uniqueAssets.set(asset.id, asset);
                }
            }
        }

        this.assets = [...uniqueAssets.values()];
    }

    render() {
        if (this.assets.length === 0) {
            return html`<div class="empty-message">No images found</div>`;
        }

        return html`
            <div class="image-grid">
                ${this.assets.map(asset => this.renderAssetItem(asset))}
            </div>
        `;
    }

    private renderAssetItem(asset: ImageAssetEntry) {
        const isSelected = this.selectedId === asset.id;
        return html`
            <div
                class="image-item ${isSelected ? 'selected' : ''}"
                @click=${() => this.handleSelect(asset)}
                @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event, asset)}
                title=${asset.source ?? asset.id}
            >
                ${asset.dataUri
                    ? html`<div class="image-item-icon" style="mask-image: url('${asset.dataUri}'); -webkit-mask-image: url('${asset.dataUri}')"></div>`
                    : html``
                }
            </div>
        `;
    }

    private handleSelect(asset: ImageAssetEntry) {
        this.dispatchEvent(new CustomEvent<ImageAssetSelectEvent>('select', {
            detail: {asset},
            bubbles: true,
            composed: true
        }));
    }

    private handleContextMenu(event: MouseEvent, asset: ImageAssetEntry) {
        event.preventDefault();
        event.stopPropagation();

        selectedImageAsset.value = {
            id: asset.id,
            dataUri: asset.dataUri,
            source: asset.source
        };

        activeContextMenu.value = {
            items: imageGalleryItemContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-image-asset-viewer': ImageAssetViewerElement;
    }
}
