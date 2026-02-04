import {html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {activeStartPanel, selectedCard, selectedSection, selectedGroup, pastedUrl, activeIconPreview} from '#state';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {ImageAssetType} from '#models/idb/ImageAssetType.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {Card} from '#models/internal/card.ts';
import {createId} from '#utils/createId.ts';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {editBookmarkCardOverlayStyle} from './editBookmarkCardOverlayStyle.ts';

@customElement('cc-edit-bookmark-card-overlay')
export class EditBookmarkCardOverlay extends LitElement {
    static styles = editBookmarkCardOverlayStyle;

    @state()
    private name = '';

    @state()
    private url = '';

    @state()
    private description = '';

    @state()
    private nameError = '';

    private startPanelsStore = inject(StartPanelsStore);
    private imageAssetsStore = inject(ImageAssetsStore);

    constructor() {
        super();
        selectedCard.watch(this);
        selectedSection.watch(this);
        selectedGroup.watch(this);
        pastedUrl.watch(this);
    }

    connectedCallback(): void {
        super.connectedCallback();
        void this.resetFields();
    }

    private async resetFields() {
        const card = selectedCard.value;

        if (card) {
            this.name = card.name ?? '';
            this.url = card.url || (pastedUrl.value ?? '');
            this.description = card.description ?? '';
            await this.loadExistingIcon(card.icon);
        } else {
            this.url = pastedUrl.value ?? '';
            this.name = this.extractDomain(this.url);
            this.description = '';
        }
        this.nameError = '';
    }

    private async loadExistingIcon(iconId: string | null) {
        if (!iconId) {
            activeIconPreview.value = null;
            return;
        }

        const entry = await this.imageAssetsStore.get(iconId);
        if (entry) {
            activeIconPreview.value = {
                dataUri: entry.dataUri ?? null,
                source: entry.source ?? null,
                assetId: iconId,
            }
        }
    }

    private extractDomain(url: string): string {
        if (!url) return '';
        try {
            let urlToParse = url;
            if (url.startsWith('localhost')) {
                urlToParse = 'http://' + url;
            }
            const parsed = new URL(urlToParse);
            return parsed.hostname;
        } catch {
            return '';
        }
    }

    render() {
        const card = selectedCard.value;

        return html`
            <cc-overlay @close=${this.handleClose}>
                <h2 slot="header">${card ? 'Edit Bookmark' : 'Add Bookmark'}</h2>

                <div class="form-layout">
                    <div class="icon-column">
                        <label>Icon</label>
                        <cc-icon-preview></cc-icon-preview>
                    </div>

                    <div class="details-column">
                        <div class="form-group">
                            <label for="name">Title</label>
                            <input
                                id="name"
                                type="text"
                                .value=${this.name}
                                @input=${this.handleNameInput}
                                class=${this.nameError ? 'error' : ''}
                                placeholder="Title"
                                autocomplete="off"
                            >
                            ${this.nameError ? html`<div class="error-message">${this.nameError}</div>` : ''}
                        </div>

                        <div class="form-group">
                            <label for="url">URL</label>
                            <input
                                id="url"
                                type="text"
                                .value=${this.url}
                                @input=${this.handleUrlInput}
                                placeholder="https://..."
                                autocomplete="off"
                            >
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                .value=${this.description}
                                @input=${this.handleDescriptionInput}
                                placeholder="Description"
                                autocomplete="off"
                            >
                        </div>
                    </div>
                </div>

                <cc-dialog-button slot="footer" primary @click=${this.handleSave}>Save</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleNameInput = (event: InputEvent) => {
        this.name = (event.target as HTMLInputElement).value;
        if (this.name.trim()) {
            this.nameError = '';
        }
    }

    private handleUrlInput = (event: InputEvent) => {
        this.url = (event.target as HTMLInputElement).value;
    }

    private handleDescriptionInput = (event: InputEvent) => {
        this.description = (event.target as HTMLInputElement).value;
    }

    private handleClose = () => {
        selectedCard.value = null;
        selectedSection.value = null;
        selectedGroup.value = null;
        pastedUrl.value = null;
    }

    private close() {
        inject(CloseOverlayAction).run();
    }

    private handleSave = async () => {
        let hasError = false;
        if (!this.name.trim()) {
            this.nameError = 'Title must not be empty.';
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const currentPanel = activeStartPanel.value;
        const cardToEdit = selectedCard.value;
        const targetSection = selectedSection.value;
        const targetGroup = selectedGroup.value;

        if (!currentPanel) {
            this.close();
            return;
        }

        const activeIcon = activeIconPreview.value;

        if (activeIcon) {
            await this.imageAssetsStore.set({
                id: activeIcon.assetId ?? createId(),
                type: ImageAssetType.icon,
                source: activeIcon.source ?? null,
                dataUri: activeIcon.dataUri ?? null
            });
        }

        let updatedSections: CardSection[];

        if (!cardToEdit) {
            if (!targetSection || !targetGroup) {
                this.close();
                return;
            }

            updatedSections = currentPanel.sections.map(section => {
                if (section.id !== targetSection.id) return section;

                const groupExists = section.groups.some(item => item.id === targetGroup.id);
                let updatedGroups: CardGroup[];

                if (groupExists) {
                    updatedGroups = section.groups.map(group => {
                        if (group.id !== targetGroup.id) return group;

                        return new CardGroup({
                            ...group,
                            cards: [...group.cards, new Card({
                                name: this.name.trim(),
                                url: this.url.trim(),
                                description: this.description.trim(),
                                icon: activeIconPreview.value?.assetId ?? null,
                            })]
                        });
                    });
                } else {
                    updatedGroups = [...section.groups, new CardGroup({
                        ...targetGroup,
                        cards: [new Card({
                            name: this.name.trim(),
                            url: this.url.trim(),
                            description: this.description.trim(),
                            icon: activeIconPreview.value?.assetId ?? null,
                        })]
                    })];
                }

                return new CardSection({
                    ...section,
                    groups: updatedGroups
                });
            });
        } else {
            updatedSections = currentPanel.sections.map(section => {
                return new CardSection({
                    ...section,
                    groups: section.groups.map(group => {
                        return new CardGroup({
                            ...group,
                            cards: group.cards.map(card => {
                                if (card.id === cardToEdit.id) {
                                    return new Card({
                                        ...card,
                                        name: this.name.trim(),
                                        url: this.url.trim(),
                                        description: this.description.trim(),
                                        icon: activeIconPreview.value?.assetId ?? null,
                                    });
                                }
                                return card;
                            })
                        });
                    })
                });
            });
        }

        const updatedStartPanel = new StartPanel({
            ...currentPanel,
            sections: updatedSections
        });

        const updatedEntry = new StartPanelEntry({
            id: currentPanel.id,
            anchor: currentPanel.anchor,
            startPanel: updatedStartPanel
        });

        await this.startPanelsStore.set(updatedEntry);
        activeStartPanel.value = updatedStartPanel;

        this.close();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-edit-bookmark-card-overlay': EditBookmarkCardOverlay;
    }
}
