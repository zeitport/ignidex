import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {activeOverlay, activeStartPanel, selectedSection, selectedGroup} from '../../app/state.ts';
import {inject} from '#core/injector.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import '../overlayElement.ts';
import '../dialogButton.ts';
import {panelOverlayStyle} from './panelOverlayStyle.ts';

@customElement('cc-edit-group-overlay')
export class EditGroupOverlay extends LitElement {
    static styles = panelOverlayStyle;

    @property({type: Boolean})
    isOpen = false;

    @state()
    private name = '';

    @state()
    private nameError = '';

    private startPanelsStore = inject(StartPanelsStore);

    private watchSelectedSection = selectedSection.watch(this);
    private watchSelectedGroup = selectedGroup.watch(this);

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has('isOpen') && this.isOpen) {
            this.resetFields();
        }
    }

    private resetFields() {
        const group = this.watchSelectedGroup.value;

        if (group) {
            this.name = group.name ?? '';
        } else {
            this.name = '';
        }
        this.nameError = '';
    }

    render() {
        const group = this.watchSelectedGroup.value;

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <h2 slot="header">${group ? 'Edit Group' : 'Add Group'}</h2>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        .value=${this.name}
                        @input=${this.handleNameInput}
                        class=${this.nameError ? 'error' : ''}
                        placeholder="Group Name"
                        autocomplete="off"
                    >
                    ${this.nameError ? html`<div class="error-message">${this.nameError}</div>` : ''}
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

    private handleClose() {
        this.name = '';
        this.nameError = '';
        activeOverlay.value = null;
        selectedSection.value = null;
        selectedGroup.value = null;
    }

    private async handleSave() {
        if (!this.name.trim()) {
            this.nameError = 'Name must not be empty.';
            return;
        }

        const currentPanel = activeStartPanel.value;
        const section = this.watchSelectedSection.value;
        if (!currentPanel || !section) {
            this.handleClose();
            return;
        }

        const groupToEdit = this.watchSelectedGroup.value;
        let updatedSections: CardSection[];

        if (groupToEdit) {
            updatedSections = currentPanel.sections.map(item => {
                if (item.id === section.id) {
                    return new CardSection({
                        ...item,
                        groups: item.groups.map(item => {
                            if (item.id === groupToEdit.id) {
                                return new CardGroup({
                                    ...item,
                                    name: this.name.trim()
                                });
                            }
                            return item;
                        })
                    });
                }
                return item;
            });
        } else {
            // Add new group
            updatedSections = currentPanel.sections.map(item => {
                if (item.id === section.id) {
                    return new CardSection({
                        ...item,
                        groups: [...item.groups, new CardGroup({
                            name: this.name.trim()
                        })]
                    });
                }
                return item;
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
        'cc-edit-group-overlay': EditGroupOverlay;
    }
}
