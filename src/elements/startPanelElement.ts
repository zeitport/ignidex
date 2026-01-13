import type {StartPanel} from '#models/internal/startPanel.ts';
import {LitElement, html, type TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import './cardIconElement.ts';
import './startPanelHeaderElement.ts';
import './sections/highlightSectionElement.ts';
import './sections/groupSectionElement.ts';
import {when} from 'lit/directives/when.js';
import {activeOverlay, activeStartPanel, pastedUrl, isDraggingFile, messageOverlayContent, activeContextMenu} from '../app/state.ts';
import type {CardSection} from '../models/internal/cardSection.ts';
import {CardSectionType} from '../models/internal/cardSectionType.ts';
import {documentContextMenuItems} from './contextMenu/documentContextMenuItems.ts';
import type {ContextMenuElement} from './contextMenuElement.ts';
import {OverlayType} from './overlays/overlayType.ts';
import './overlays/gettingStartedOverlay.ts';
import './overlays/editPanelOverlay.ts';
import './overlays/newSectionOverlay.ts';
import './overlays/editHighlightSectionOverlay.ts';
import './overlays/editGroupsSectionOverlay.ts';
import './overlays/editGroupOverlay.ts';
import './overlays/selectSectionOverlay.ts';
import './overlays/selectGroupOverlay.ts';
import './overlays/confirmationOverlay.ts';
import './overlays/settingsOverlay.ts';
import './overlays/messageOverlay.ts';
import './overlays/dropFileOverlay.ts';
import './hoverHintElement.ts';
import {startPanelElementStyle} from './startPanelElementStyle.ts';
import {ImportFromJsonAction} from '../actions/importFromJsonAction.ts';

@customElement('cc-start-panel')
export class StartPanelElement extends LitElement {
    static styles = startPanelElementStyle;

    private activeOverlay = activeOverlay.watch(this);
    private activeStartPanel = activeStartPanel.watch(this);
    private isDraggingFile = isDraggingFile.watch(this);
    private activeContextMenu = activeContextMenu.watch(this);
    private dragCounter = 0;

    private sectionRenderer: Map<CardSectionType, (section: CardSection) => TemplateResult> = new Map(
        [
            [CardSectionType.Highlight, section => html`<cc-highlight-section .section=${section}></cc-highlight-section>`],
            [CardSectionType.Groups, section => html`<cc-groups-section .section=${section}></cc-groups-section>`]
        ]
    );

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('click', this.handleClickEvent);
        document.addEventListener('contextmenu', this.handleDocumentContextMenu);
        document.addEventListener('paste', this.handlePaste);
        document.addEventListener('dragenter', this.handleDragEnter);
        document.addEventListener('dragleave', this.handleDragLeave);
        document.addEventListener('dragover', this.handleDragOver);
        document.addEventListener('drop', this.handleDrop);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('click', this.handleClickEvent);
        document.removeEventListener('contextmenu', this.handleDocumentContextMenu);
        document.removeEventListener('paste', this.handlePaste);
        document.removeEventListener('dragenter', this.handleDragEnter);
        document.removeEventListener('dragleave', this.handleDragLeave);
        document.removeEventListener('dragover', this.handleDragOver);
        document.removeEventListener('drop', this.handleDrop);
    }

    render() {
        const startPanel = this.activeStartPanel.value;

        return html`
            ${when(startPanel, panel => this.renderStartPanel(panel))}

            ${this.renderOverlay()}

            <cc-drop-file-overlay ?isOpen=${this.isDraggingFile.value}></cc-drop-file-overlay>

            <cc-context-menu id="contextMenu"></cc-context-menu>

            <cc-hover-hint></cc-hover-hint>
        `;
    }

    private renderStartPanel(startPanel: StartPanel) {
        return html`
            <div class="wrap">

                <div class="toprow">
                    <cc-start-panel-header .header=${startPanel.header}></cc-start-panel-header>
                </div>

                ${startPanel.sections.map(section => this.renderSections(section))}
            </div>
        `;
    }

    private renderSections(section: CardSection) {
        const renderer = this.sectionRenderer.get(section.type);

        if (renderer) {
            return renderer(section);
        } else {
            return html``;
        }
    }

    private renderOverlay() {
        if (this.activeOverlay.value) {
            if (this.activeOverlay.value === OverlayType.editBookmark) {
                return html`<cc-edit-bookmark-card-overlay isOpen></cc-edit-bookmark-card-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.switchPanel) {
                return html`<cc-switch-panel-overlay isOpen></cc-switch-panel-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.editSettings) {
                return html`<cc-settings-overlay isOpen></cc-settings-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.newPanel) {
                return html`<cc-edit-panel-overlay isOpen isCreateMode></cc-edit-panel-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.editPanel) {
                return html`<cc-edit-panel-overlay isOpen></cc-edit-panel-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.newSection) {
                return html`<cc-new-section-overlay isOpen></cc-new-section-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.editHighlightSection) {
                return html`<cc-edit-highlight-section-overlay isOpen></cc-edit-highlight-section-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.editGroupsSection) {
                return html`<cc-edit-groups-section-overlay isOpen></cc-edit-groups-section-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.editGroup) {
                return html`<cc-edit-group-overlay isOpen></cc-edit-group-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.gettingStarted) {
                return html`<cc-getting-started-overlay isOpen></cc-getting-started-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.confirmation) {
                return html`<cc-confirmation-overlay isOpen></cc-confirmation-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.selectSection) {
                return html`<cc-select-section-overlay isOpen></cc-select-section-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.selectGroup) {
                return html`<cc-select-group-overlay isOpen></cc-select-group-overlay>`;
            }

            if (this.activeOverlay.value === OverlayType.message) {
                return html`<cc-message-overlay isOpen></cc-message-overlay>`;
            }
        }

        return html``;
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        const menu = this.activeContextMenu.value;
        const contextMenu = this.shadowRoot?.getElementById('contextMenu') as ContextMenuElement | null;

        if (contextMenu) {
            if (menu) {
                contextMenu.items = menu.items;
                contextMenu.open(menu.x, menu.y);
            } else {
                contextMenu.close();
            }
        }
    }

    private handleDocumentContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        if (this.activeOverlay.value) return;
        activeContextMenu.value = {
            items: documentContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }

    private handleClickEvent = () => {
        activeContextMenu.value = null;
    }

    private handlePaste = (event: ClipboardEvent) => {
        if (this.activeOverlay.value) return;

        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        const pastedText = event.clipboardData?.getData('text');
        if (pastedText && (pastedText.startsWith('http://') || pastedText.startsWith('https://') || pastedText.startsWith('localhost'))) {
            pastedUrl.value = pastedText;
            activeOverlay.value = OverlayType.selectSection;
        }
    }

    private hasFiles(event: DragEvent): boolean {
        return event.dataTransfer?.types.includes('Files') ?? false;
    }

    private handleDragEnter = (event: DragEvent) => {
        event.preventDefault();
        if (!this.hasFiles(event)) return;

        this.dragCounter++;
        if (this.dragCounter === 1) {
            isDraggingFile.value = true;
        }
    }

    private handleDragLeave = (event: DragEvent) => {
        event.preventDefault();
        if (!this.hasFiles(event)) return;

        this.dragCounter--;
        if (this.dragCounter === 0) {
            isDraggingFile.value = false;
        }
    }

    private handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    }

    private handleDrop = (event: DragEvent) => {
        event.preventDefault();
        this.dragCounter = 0;
        isDraggingFile.value = false;

        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return;

        if (files.length > 1) {
            messageOverlayContent.value = 'Only one file can be imported at a time.';
            activeOverlay.value = OverlayType.message;
            return;
        }

        const file = files[0];
        if (!file.name.endsWith('.json')) {
            messageOverlayContent.value = 'Only JSON files are supported.';
            activeOverlay.value = OverlayType.message;
            return;
        }

        const action = new ImportFromJsonAction(file);
        action.run();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-start-panel': StartPanelElement
    }
}
