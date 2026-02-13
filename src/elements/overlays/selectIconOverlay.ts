import {inject} from '#inject';
import type {ImageAssetEntry} from '#models/idb/imageAssetEntry.ts';
import {ImageAssetType} from '#models/idb/ImageAssetType.ts';
import {IconStyle} from '#models/internal/iconStyle.ts';
import {activeIconPreview} from '#state';
import {createId} from '#utils/createId.ts';
import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import type {ImageAssetSelectEvent} from '../imageAssetViewer/imageAssetSelectEvent.ts';

@customElement('cc-select-icon-overlay')
export class SelectIconOverlay extends LitElement {
    static styles = css`
        .icon-viewer-container {
            min-width: 20rem;
            min-height: 10rem;
        }
    `;

    render() {
        return html`
            <cc-overlay>
                <div slot="header">
                    <h2>Select an existing icon</h2>
                </div>

                <div class="icon-viewer-container">
                    <cc-image-asset-viewer
                        type=${ImageAssetType.icon}
                        @select=${this.handleSelect}
                    ></cc-image-asset-viewer>
                </div>
            </cc-overlay>
        `;
    }

    private handleSelect = (event: CustomEvent<ImageAssetSelectEvent>) => {
        const asset: ImageAssetEntry = event.detail.asset;

        activeIconPreview.value = {
            dataUri: asset.dataUri,
            source: asset.source ?? null,
            assetId: asset.id ?? createId(),
            iconStyle: activeIconPreview.value?.iconStyle ?? IconStyle.mask,
        }

        inject(CloseOverlayAction).run();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-icon-overlay': SelectIconOverlay;
    }
}
