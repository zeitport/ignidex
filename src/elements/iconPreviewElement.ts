import {iconPreviewContextMenuItems} from '#app/contextMenus/iconPreviewContextMenuItems.ts';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {mdiDeleteOutline} from '@mdi/js';
import {svgToDataUri} from '#utils/svgToDataUri.ts';
import {PasteIconAction} from '../actions/iconPreview/pasteIconAction.ts';
import {SelectExistingIconAction} from '../actions/iconPreview/selectExistingIconAction.ts';
import {activeContextMenu, activeIconPreview} from '#state';
import {iconPreviewElementStyle} from './iconPreviewElementStyle.ts';

@customElement('cc-icon-preview')
export class IconPreviewElement extends LitElement {
    static styles = iconPreviewElementStyle;

    private iconPreviewState = activeIconPreview.watch(this);

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('paste', this.onPaste);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        activeIconPreview.value = null;
        window.removeEventListener('paste', this.onPaste);
    }

    render() {
        const state = this.iconPreviewState.value;
        const hasIcon = state && (state.dataUri || state.assetId);
        const dataUri = state?.dataUri ?? null;

        return html`
            <div
                class="icon-preview ${hasIcon ? 'has-icon' : ''}"
                @click=${this.handlePreviewClick}
                @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event)}
            >
                ${dataUri
                    ? html`<div class="icon-preview-icon" style="--mask-url: url('${dataUri}')"></div>`
                    : html``
                }
                ${dataUri ? html`
                    <button class="icon-delete-btn" @click=${this.handleDeleteClick} title="Remove icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d=${mdiDeleteOutline}></path>
                        </svg>
                    </button>
                ` : ''}
            </div>
            <input
                type="file"
                id="icon-file"
                accept=".svg,image/svg+xml"
                @change=${this.handleFileChange}
            >
            <cc-context-menu id="iconContextMenu"></cc-context-menu>
        `;
    }

    private handlePreviewClick = () => {
        new SelectExistingIconAction().run();
    }

    private handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const svgContent = reader.result as string;
            const dataUri = svgToDataUri(svgContent);

            activeIconPreview.value = {
                dataUri,
                assetId: null,
                source: file.name,
            };
        };
        reader.readAsText(file);
        input.value = '';
    }

    private onPaste = (event: ClipboardEvent) => { void this.handlePaste(event)};

    private async handlePaste(event: ClipboardEvent): Promise<void> {
        console.log('Handling icon preview paste event');

        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        const pastedText = event.clipboardData?.getData('text') ?? '';
        if (!pastedText) return;

        const action = new PasteIconAction();
        const processed = await action.processText(pastedText);

        if (processed) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    private handleDeleteClick = (event: Event) => {
        activeIconPreview.value = null;
        event.stopPropagation();
    }

    private handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        activeContextMenu.value = {
            items: iconPreviewContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-icon-preview': IconPreviewElement;
    }
}
