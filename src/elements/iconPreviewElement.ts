import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {mdiDeleteOutline} from '@mdi/js';
import {svgToDataUri} from '#utils/svgToDataUri.ts';
import './contextMenuElement.ts';
import type {ContextMenuElement} from './contextMenuElement.ts';
import {PasteIconAction} from '../actions/iconPreview/pasteIconAction.ts';
import {iconPreviewContextMenuItems} from '../app/contextMenus/iconPreviewContextMenuItems.ts';
import {activeIconPreview} from '#state';
import {iconPreviewElementStyle} from './iconPreviewElementStyle.ts';

export interface IconPreviewChangeEvent {
    dataUri: string;
    source: string;
    assetId?: string;
}

@customElement('cc-icon-preview')
export class IconPreviewElement extends LitElement {
    static styles = iconPreviewElementStyle;

    private iconPreviewState = activeIconPreview.watch(this);

    @property({type: String})
    dataUri = '';

    @property({type: String})
    source = '';

    @property({type: Boolean})
    active = false;

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has('active')) {
            if (this.active) {
                this.syncIconPreviewState();
                window.addEventListener('paste', this.onPaste);
                window.addEventListener('click', this.handleWindowClick);
            } else {
                activeIconPreview.value = null;
                window.removeEventListener('paste', this.onPaste);
                window.removeEventListener('click', this.handleWindowClick);
            }
        }

        if (changedProperties.has('dataUri') && this.active) {
            this.syncIconPreviewState();
        }

        this.checkForExternalChanges();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        activeIconPreview.value = null;
        window.removeEventListener('paste', this.onPaste);
        window.removeEventListener('click', this.handleWindowClick);
    }

    render() {
        return html`
            <div
                class="icon-preview ${this.dataUri ? 'has-icon' : ''}"
                @click=${this.handlePreviewClick}
                @contextmenu=${(event: MouseEvent) => this.handleContextMenu(event)}
            >
                ${this.dataUri
                    ? html`<div class="icon-preview-icon" style="--mask-url: url('${this.dataUri}')"></div>`
                    : html``
                }
                ${this.dataUri ? html`
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

    private syncIconPreviewState() {
        activeIconPreview.value = {
            dataUri: this.dataUri,
            source: this.source
        };
    }

    private checkForExternalChanges() {
        if (!this.active) return;

        const state = this.iconPreviewState.value;
        if (!state) return;

        if (state.dataUri !== this.dataUri || state.source !== this.source) {
            this.emitChange(state.dataUri, state.source, state.assetId);
        }
    }

    private handlePreviewClick = () => {
        const fileInput = this.shadowRoot?.getElementById('icon-file') as HTMLInputElement;
        fileInput?.click();
    }

    private handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const svgContent = reader.result as string;
            const dataUri = svgToDataUri(svgContent);
            this.emitChange(dataUri, file.name);
        };
        reader.readAsText(file);
        input.value = '';
    }

    private onPaste = (event: ClipboardEvent) => { void this.handlePaste(event)};

    private async handlePaste(event: ClipboardEvent): Promise<void> {
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
        event.stopPropagation();
        this.emitChange('', '');
    }

    private handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const contextMenu = this.shadowRoot!.getElementById('iconContextMenu') as ContextMenuElement;
        contextMenu.items = iconPreviewContextMenuItems;
        contextMenu.open(event.clientX, event.clientY);
    }

    private handleWindowClick = () => {
        const contextMenu = this.shadowRoot?.getElementById('iconContextMenu') as ContextMenuElement | null;
        contextMenu?.close();
    };

    private emitChange(dataUri: string, source: string, assetId?: string) {
        this.dispatchEvent(new CustomEvent<IconPreviewChangeEvent>('icon-change', {
            detail: {dataUri, source, assetId},
            bubbles: true,
            composed: true
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-icon-preview': IconPreviewElement;
    }
}
