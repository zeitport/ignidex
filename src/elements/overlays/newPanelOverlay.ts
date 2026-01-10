import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel} from '../../app/state.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {createId} from '#utils/createId.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import {panelOverlayStyle} from './panelOverlayStyle.ts';

@customElement('cc-new-panel-overlay')
export class NewPanelOverlay extends LitElement {
    static styles = panelOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    @state()
    private name = '';

    @state()
    private anchor = '';

    @state()
    private nameError = '';

    private isAnchorManuallyEdited = false;

    private startPanelsStore = inject(StartPanelsStore);

    render() {
        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <h2 slot="header">New Panel</h2>

                <div class="form-group">
                    <label for="name">Name</label>
                    <span class="description">The display name of the panel.</span>
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
                    <label for="anchor">Anchor</label>
                    <span class="description">A unique identifier used in the URL (e.g., #my-panel). Leave empty to use a random ID.</span>
                    <input
                        id="anchor"
                        type="text"
                        .value=${this.anchor}
                        @input=${this.handleAnchorInput}
                        placeholder="my-panel"
                        autocomplete="off"
                    >
                </div>

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
                <cc-dialog-button slot="footer" primary @click=${this.handleCreate}>Create</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleNameInput(event: InputEvent) {
        this.name = (event.target as HTMLInputElement).value;
        if (this.name.trim()) {
            this.nameError = '';
        }

        if (!this.isAnchorManuallyEdited) {
            this.anchor = this.slugify(this.name);
        }
    }

    private handleAnchorInput(event: InputEvent) {
        this.anchor = (event.target as HTMLInputElement).value;
        this.isAnchorManuallyEdited = true;
    }

    private handleClose() {
        this.name = '';
        this.anchor = '';
        this.nameError = '';
        this.isAnchorManuallyEdited = false;
        activeOverlay.value = null;
    }

    private slugify(text: string): string {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    private async handleCreate() {
        if (!this.name.trim()) {
            this.nameError = 'Name must not be empty.';
            return;
        }

        const id = createId();
        let anchor = this.anchor.trim() || id;

        // Check for anchor collision
        const existingPanelByAnchor = await this.startPanelsStore.getByAnchor(anchor);
        if (existingPanelByAnchor) {
            // If anchor is taken, we fall back to ID or append something.
            // The requirement says "create new start panel with name and anchor",
            // but unique anchor is usually required for logic.
            // For now, let's just use it as is, but maybe warn?
            // Actually, CreateLocalPanelAction handles it by falling back to ID.
            // Let's do similar or just let it be.
            // Better to match CreateLocalPanelAction logic if anchor exists.
            anchor = id;
        }

        const newStartPanel = new StartPanel({
            id: id,
            anchor: anchor,
            header: {
                title: this.name.trim()
            },
            sections: []
        });

        const newEntry = new StartPanelEntry({
            id: id,
            anchor: anchor,
            startPanel: newStartPanel
        });

        await this.startPanelsStore.set(newEntry);
        activeStartPanel.value = newStartPanel;

        this.handleClose();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-new-panel-overlay': NewPanelOverlay;
    }
}
