import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('cc-image-gallery-settings-panel')
export class ImageGallerySettingsPanel extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .gallery-container {
            min-height: 10rem;
        }
    `;

    @state()
    private refreshKey = 0;

    connectedCallback(): void {
        super.connectedCallback();
        this.refreshKey++;
    }

    render() {
        return html`
            <cc-settings-header>Image Gallery</cc-settings-header>

            <cc-settings-section>
                <span slot="label">All Images</span>
                <div slot="description">All uploaded images stored locally.</div>
                <div class="gallery-container">
                    <cc-image-asset-viewer .key=${this.refreshKey}></cc-image-asset-viewer>
                </div>
            </cc-settings-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-image-gallery-settings-panel': ImageGallerySettingsPanel;
    }
}
