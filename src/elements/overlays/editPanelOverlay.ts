import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeIconPreview, activeStartPanel} from '#state';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelHeader} from '#models/internal/startPanelHeader.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {createId} from '#utils/createId.ts';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {editPanelOverlayStyle} from './editPanelOverlayStyle.ts';

@customElement('cc-edit-panel-overlay')
export class EditPanelOverlay extends LitElement {
    static styles = editPanelOverlayStyle;

    @property({type: Boolean})
    isCreateMode = false;

    @state()
    private name = '';

    @state()
    private anchor = '';

    @state()
    private description = '';

    @state()
    private nameError = '';

    private isAnchorManuallyEdited = false;

    private startPanelsStore = inject(StartPanelsStore);
    private imageAssetsStore = inject(ImageAssetsStore);

    private watchActiveStartPanel = activeStartPanel.watch(this);

    connectedCallback() {
        super.connectedCallback();
        this.resetFields();
    }

    private async resetFields(): Promise<void> {
        const currentPanel = this.watchActiveStartPanel.value;

        if (currentPanel && !this.isCreateMode) {
            this.name = currentPanel.header?.title ?? '';
            this.anchor = currentPanel.anchor ?? '';
            this.description = currentPanel.header?.description ?? '';
            await this.loadExistingIcon(currentPanel.header?.icon ?? null);
        } else {
            this.name = '';
            this.anchor = '';
            this.description = '';
        }
        this.nameError = '';
        this.isAnchorManuallyEdited = false;
    }

    private async loadExistingIcon(iconId: string | null) {
        if (!iconId) {
            return;
        }

        const entry = await this.imageAssetsStore.get(iconId);
        activeIconPreview.value = {
            assetId: iconId,
            dataUri: entry?.dataUri ?? null,
            source: entry?.source ?? '',
        };
    }

    render() {
        const isCreating = this.isCreateMode || !this.watchActiveStartPanel.value;

        return html`
            <cc-overlay>
                <h2 slot="header">${isCreating ? 'New Panel' : 'Edit Panel'}</h2>

                <div class="form-layout">
                    <div class="icon-column">
                        <label>Icon</label>
                        <cc-icon-preview></cc-icon-preview>
                    </div>

                    <div class="details-column">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <span class="field-description">The display name of the panel.</span>
                            <input
                                id="name"
                                type="text"
                                .value=${this.name}
                                @input=${this.handleNameInput}
                                class=${this.nameError ? 'error' : ''}
                                placeholder="My Awesome Panel"
                                autocomplete="off"
                            >
                            ${this.nameError ? html`<div class="error-message">${this.nameError}</div>` : ''}
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <span class="field-description">A short description shown below the panel name.</span>
                            <input
                                id="description"
                                type="text"
                                .value=${this.description}
                                @input=${this.handleDescriptionInput}
                                placeholder="Description"
                                autocomplete="off"
                            >
                        </div>

                        <div class="form-group">
                            <label for="anchor">Anchor</label>
                            <span class="field-description">A unique identifier used in the URL (e.g., #my-panel).${isCreating ? ' Leave empty to use a random ID.' : ''}</span>
                            <input
                                id="anchor"
                                type="text"
                                .value=${this.anchor}
                                @input=${this.handleAnchorInput}
                                placeholder="my-panel"
                                autocomplete="off"
                            >
                        </div>
                    </div>
                </div>

                <cc-dialog-button slot="footer" primary @click=${this.handleSave}>${isCreating ? 'Create' : 'Save'}</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleNameInput = (event: InputEvent) => {
        this.name = (event.target as HTMLInputElement).value;
        if (this.name.trim()) {
            this.nameError = '';
        }

        if (this.isCreateMode && !this.isAnchorManuallyEdited) {
            this.anchor = this.slugify(this.name);
        }
    }

    private handleDescriptionInput = (event: InputEvent) => {
        this.description = (event.target as HTMLInputElement).value;
    }

    private handleAnchorInput = (event: InputEvent) => {
        this.anchor = (event.target as HTMLInputElement).value;
        this.isAnchorManuallyEdited = true;
    }

    private slugify(text: string): string {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    private handleSave = async() => {
        if (!this.name.trim()) {
            this.nameError = 'Name must not be empty.';
            return;
        }

        inject(CloseOverlayAction).run();

        const currentPanel = this.watchActiveStartPanel.value;
        const isCreating = this.isCreateMode || !currentPanel;

        if (isCreating) {
            await this.createPanel();
        } else {
            await this.updatePanel(currentPanel);
        }
    }

    private async createPanel() {
        const id = createId();
        let anchor = this.anchor.trim() || id;

        const existingPanelByAnchor = await this.startPanelsStore.getByAnchor(anchor);
        if (existingPanelByAnchor) {
            anchor = id;
        }

        const iconPreview = activeIconPreview.value;

        if (iconPreview && iconPreview.assetId) {
            await this.imageAssetsStore.set({
                id: iconPreview.assetId,
                source: iconPreview.source ?? null,
                dataUri: iconPreview.dataUri ?? null,
            });
        }

        const newStartPanel = new StartPanel({
            id: id,
            anchor: anchor,
            header: new StartPanelHeader({
                title: this.name.trim(),
                icon: iconPreview?.assetId ?? null,
                description: this.description.trim() || null
            }),
            sections: []
        });

        const nextOrder = await this.startPanelsStore.getNextOrder();
        const newEntry = new StartPanelEntry({
            id: id,
            anchor: anchor,
            order: nextOrder,
            startPanel: newStartPanel
        });

        await this.startPanelsStore.set(newEntry);
        activeStartPanel.value = newStartPanel;
    }

    private async updatePanel(currentPanel: StartPanel) {
        const updatedAnchor = this.anchor.trim() || currentPanel.id;

        if (updatedAnchor !== currentPanel.anchor) {
            const existingPanelByAnchor = await this.startPanelsStore.getByAnchor(updatedAnchor);
            if (existingPanelByAnchor && existingPanelByAnchor.id !== currentPanel.id) {
                // Anchor collision - keep existing anchor
            }
        }

        const iconPreview = activeIconPreview.value;

        if (iconPreview && iconPreview.assetId) {
            await this.imageAssetsStore.set({
                id: iconPreview.assetId,
                source: iconPreview.source ?? null,
                dataUri: iconPreview.dataUri ?? null,
            });
        }

        const updatedStartPanel = new StartPanel({
            ...currentPanel,
            anchor: updatedAnchor,
            header: new StartPanelHeader({
                title: this.name.trim(),
                icon: iconPreview?.assetId ?? null,
                description: this.description.trim() || null
            })
        });

        const updatedEntry = new StartPanelEntry({
            id: currentPanel.id,
            anchor: updatedAnchor,
            startPanel: updatedStartPanel
        });

        await this.startPanelsStore.set(updatedEntry);
        activeStartPanel.value = updatedStartPanel;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-edit-panel-overlay': EditPanelOverlay;
    }
}
