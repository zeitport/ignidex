import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel, selectedCard, selectedSection, selectedGroup, pastedUrl} from '../../app/state.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {Card} from '#models/internal/card.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import {editBookmarkCardOverlayStyle} from './editBookmarkCardOverlayStyle.ts';

@customElement('cc-edit-bookmark-card-overlay')
export class EditBookmarkCardOverlay extends LitElement {
    static styles = editBookmarkCardOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    @state()
    private name = '';

    @state()
    private url = '';

    @state()
    private description = '';

    @state()
    private nameError = '';

    @state()
    private urlError = '';

    private startPanelsStore = inject(StartPanelsStore);

    private selectedCard = selectedCard.watch(this);
    private selectedSection = selectedSection.watch(this);
    private selectedGroup = selectedGroup.watch(this);
    private pastedUrl = pastedUrl.watch(this);

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has('isOpen') && this.isOpen) {
            this.resetFields();
        }
    }

    private resetFields() {
        const card = this.selectedCard.value;

        if (card) {
            this.name = card.name ?? '';
            this.url = card.url || (this.pastedUrl.value ?? '');
            this.description = card.description ?? '';
        } else {
            this.url = this.pastedUrl.value ?? '';
            this.name = this.extractDomain(this.url);
            this.description = '';
        }
        this.nameError = '';
        this.urlError = '';
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
        const card = this.selectedCard.value;

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <h2 slot="header">${card ? 'Edit Bookmark' : 'Add Bookmark'}</h2>

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
                        class=${this.urlError ? 'error' : ''}
                        placeholder="https://..."
                        autocomplete="off"
                    >
                    ${this.urlError ? html`<div class="error-message">${this.urlError}</div>` : ''}
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

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
                <cc-dialog-button slot="footer" primary @click=${this.handleSave}>Save</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleNameInput(event: InputEvent) {
        this.name = (event.target as HTMLInputElement).value;
        if (this.name.trim()) {
            this.nameError = '';
        }
    }

    private handleUrlInput(event: InputEvent) {
        this.url = (event.target as HTMLInputElement).value;
        if (this.url.trim()) {
            this.urlError = '';
        }
    }

    private handleDescriptionInput(event: InputEvent) {
        this.description = (event.target as HTMLInputElement).value;
    }

    private handleClose() {
        this.name = '';
        this.url = '';
        this.description = '';
        this.nameError = '';
        this.urlError = '';
        activeOverlay.value = null;
        selectedCard.value = null;
        selectedSection.value = null;
        selectedGroup.value = null;
        pastedUrl.value = null;
    }

    private async handleSave() {
        let hasError = false;
        if (!this.name.trim()) {
            this.nameError = 'Title must not be empty.';
            hasError = true;
        }

        if (!this.url.trim()) {
            this.urlError = 'URL must not be empty.';
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const currentPanel = activeStartPanel.value;
        const cardToEdit = this.selectedCard.value;
        const targetSection = this.selectedSection.value;
        const targetGroup = this.selectedGroup.value;

        if (!currentPanel) {
            this.handleClose();
            return;
        }

        let updatedSections: CardSection[];

        if (!cardToEdit) {
            if (!targetSection || !targetGroup) {
                this.handleClose();
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
                                description: this.description.trim()
                            })]
                        });
                    });
                } else {
                    updatedGroups = [...section.groups, new CardGroup({
                        ...targetGroup,
                        cards: [new Card({
                            name: this.name.trim(),
                            url: this.url.trim(),
                            description: this.description.trim()
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
                                        description: this.description.trim()
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

        this.handleClose();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-edit-bookmark-card-overlay': EditBookmarkCardOverlay;
    }
}
