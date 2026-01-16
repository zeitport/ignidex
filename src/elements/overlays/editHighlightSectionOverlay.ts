import {html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {activeStartPanel, selectedSection} from '#state';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardSectionType} from '#models/internal/cardSectionType.ts';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {panelOverlayStyle} from './panelOverlayStyle.ts';

@customElement('cc-edit-highlight-section-overlay')
export class EditHighlightSectionOverlay extends LitElement {
    static styles = panelOverlayStyle;

    @state()
    private name = '';

    @state()
    private nameError = '';

    private startPanelsStore = inject(StartPanelsStore);

    private watchSelectedSection = selectedSection.watch(this);

    connectedCallback() {
        super.connectedCallback();
        this.resetFields();
    }

    private resetFields() {
        const section = this.watchSelectedSection.value;

        if (section) {
            this.name = section.name ?? '';
        } else {
            this.name = '';
        }
        this.nameError = '';
    }

    render() {
        const section = this.watchSelectedSection.value;

        return html`
            <cc-overlay @close=${this.handleClose}>
                <h2 slot="header">${section ? 'Edit Highlight Section' : 'New Highlight Section'}</h2>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        .value=${this.name}
                        @input=${this.handleNameInput}
                        class=${this.nameError ? 'error' : ''}
                        placeholder="Section Name"
                        autocomplete="off"
                    >
                    ${this.nameError ? html`<div class="error-message">${this.nameError}</div>` : ''}
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

    private handleClose = () => {
        selectedSection.value = null;
    }

    private close() {
        selectedSection.value = null;
        inject(CloseOverlayAction).run();
    }

    private handleSave = async() => {
        if (!this.name.trim()) {
            this.nameError = 'Name must not be empty.';
            return;
        }

        const currentPanel = activeStartPanel.value;
        if (!currentPanel) {
            this.close();
            return;
        }

        const sectionToEdit = this.watchSelectedSection.value;
        let updatedSections: CardSection[];

        if (sectionToEdit) {
            updatedSections = currentPanel.sections.map(item => {
                if (item.id === sectionToEdit.id) {
                    return new CardSection({
                        ...item,
                        name: this.name.trim()
                    });
                }
                return item;
            });
        } else {
            const newSection = new CardSection({
                name: this.name.trim(),
                type: CardSectionType.Highlight
            });
            updatedSections = [...currentPanel.sections, newSection];
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
        'cc-edit-highlight-section-overlay': EditHighlightSectionOverlay;
    }
}
