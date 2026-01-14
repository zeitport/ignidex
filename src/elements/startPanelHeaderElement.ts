import {hoverHint} from '#core/hoverHintDirective.ts';
import {i18n} from '#i18n';
import {LitElement, html, type PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {inject} from '#inject';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import type {StartPanelHeader} from '#models/internal/startPanelHeader.ts';
import {startPanelHeaderElementStyle} from './startPanelHeaderElementStyle.ts';
import {activeContextMenu} from '#state';
import {panelContextMenuItems} from '../app/contextMenus/panelContextMenuItems.ts';

@customElement('cc-start-panel-header')
export class StartPanelHeaderElement extends LitElement {
    static styles = startPanelHeaderElementStyle;

    @property({type: Object})
    header: StartPanelHeader | null = null;

    @state()
    private iconDataUri: string | null = null;

    private imageAssetsStore = inject(ImageAssetsStore);

    connectedCallback() {
        super.connectedCallback();
        this.resolveIcon();
    }

    protected willUpdate(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('header')) {
            this.resolveIcon();
        }
    }

    private async resolveIcon() {
        if (!this.header?.icon) {
            this.iconDataUri = null;
            return;
        }

        const entry = await this.imageAssetsStore.get(this.header.icon);
        this.iconDataUri = entry?.dataUri ?? null;
    }

    render() {
        const title = this.header?.title ?? 'Start';
        const description = this.header?.description;
        const hasIcon = !!this.iconDataUri;

        return html`
            <div class="header-back"></div>
            <div class="header-stripe"></div>
            <div class="header"
                 ${hoverHint(i18n.text.hints.startPanelHeader)}
                 @contextmenu=${this.handleContextMenu}
                >
                ${hasIcon ? html`
                    <div class="icon">
                        <div class="mono-icon" aria-hidden="true" style="--mask-url: url('${this.iconDataUri}')"></div>
                    </div>
                ` : ''}
                <div class="content">
                    <h1>${title}</h1>
                    ${description ? html`<div class="description">${description}</div>` : ''}
                </div>
            </div>
        `;
    }

    private handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        activeContextMenu.value = {
            items: panelContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-start-panel-header': StartPanelHeaderElement
    }
}
