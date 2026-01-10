import type {StartPanel} from '#models/internal/startPanel.ts';
import {LitElement, html, type TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import './cardIconElement.ts';
import './sections/highlightSectionElement.ts';
import './sections/groupSectionElement.ts';
import {when} from 'lit/directives/when.js';
import {activeOverlay, activeStartPanel, selectedGroup, selectedCard, selectedSection, pastedUrl, isDraggingFile, messageOverlayContent} from '../app/state.ts';
import type {Card} from '../models/internal/card.ts';
import {CardGroup} from '../models/internal/cardGroup.ts';
import type {CardSection} from '../models/internal/cardSection.ts';
import {CardSectionType} from '../models/internal/cardSectionType.ts';
import {bookmarkContextMenuItems} from './contextMenu/bookmarkContextMenuItems.ts';
import {documentContextMenuItems} from './contextMenu/documentContextMenuItems.ts';
import {panelContextMenuItems} from './contextMenu/panelContextMenuItems.ts';
import {groupContextMenuItems} from './contextMenu/groupContextMenuItems.ts';
import {bookmarkSectionContextMenuItems} from './contextMenu/bookmarkSectionContextMenuItems.ts';
import {highlightSectionContextMenuItems} from './contextMenu/highlightSectionContextMenuItems.ts';
import type {ContextMenuElement} from './contextMenuElement.ts';
import {OverlayType} from './overlays/overlayType.ts';
import './overlays/gettingStartedOverlay.ts';
import './overlays/newPanelOverlay.ts';
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
import {startPageElementStyle} from './startPageElementStyle.ts';
import {ImportFromJsonAction} from '../actions/importFromJsonAction.ts';

@customElement('cc-start-page')
export class StartPageElement extends LitElement {
    static styles = startPageElementStyle;

    private activeOverlay = activeOverlay.watch(this);
    private activeStartPanel = activeStartPanel.watch(this);
    private isDraggingFile = isDraggingFile.watch(this);
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

            <cc-context-menu id="contextMenu"></cc-context-menu>

            ${this.renderOverlay()}

            <cc-drop-file-overlay ?isOpen=${this.isDraggingFile.value}></cc-drop-file-overlay>
        `;
    }

    private renderStartPanel(startPanel: StartPanel) {
        return html`
            <div
                class="wrap"
                @card-context-menu=${this.handleCardContextMenu}
                @section-context-menu=${this.handleSectionContextMenu}
                @group-context-menu=${this.handleGroupContextMenu}>
                <div class="topline"></div>

                <div class="toprow">
                    <div>
                        <h1 @contextmenu=${this.handlePanelContextMenu}>${startPanel.header?.title ?? 'Start'}</h1>
                    </div>
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
                return html`<cc-new-panel-overlay isOpen></cc-new-panel-overlay>`;
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

    private handleCardContextMenu(event: {detail: {card: Card, x: number, y: number}} & CustomEvent) {
        if (this.activeOverlay.value) return;
        console.log('Show CardContextMenu', event);

        if (event.detail.card.type === 'bookmark') {
            const contextMenu = this.shadowRoot!.getElementById('contextMenu')! as ContextMenuElement;
            contextMenu.items = bookmarkContextMenuItems;

            selectedCard.value = event.detail.card;

            const {x, y} = event.detail;
            contextMenu.open(x, y);
        }
    }

    private handleSectionContextMenu(event: {detail: {section: CardSection, x: number, y: number}}) {
        if (this.activeOverlay.value) return;
        console.log('Show Section ContextMenu', event);
        const contextMenu = this.shadowRoot!.getElementById('contextMenu')! as ContextMenuElement;

        if (event.detail.section.type === CardSectionType.Highlight) {
            contextMenu.items = highlightSectionContextMenuItems;
            selectedGroup.value = event.detail.section.groups[0] ?? new CardGroup({name: 'Group'});
        } else if (event.detail.section.type === CardSectionType.Groups) {
            contextMenu.items = bookmarkSectionContextMenuItems;
            selectedGroup.value = null;
        }

        selectedSection.value = event.detail.section;

        contextMenu.open(event.detail.x, event.detail.y);
    }

    private handleGroupContextMenu(event: {detail: {section: CardSection, group: CardGroup, x: number, y: number}}) {
        if (this.activeOverlay.value) return;
        console.log('Show Group ContextMenu', event);
        const contextMenu = this.shadowRoot!.getElementById('contextMenu')! as ContextMenuElement;
        contextMenu.items = groupContextMenuItems;

        selectedSection.value = event.detail.section;
        selectedGroup.value = event.detail.group;

        contextMenu.open(event.detail.x, event.detail.y);
    }

    private handlePanelContextMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (this.activeOverlay.value) return;
        console.log('Show Panel ContextMenu', event);
        const contextMenu = this.shadowRoot!.getElementById('contextMenu')! as ContextMenuElement;
        contextMenu.items = panelContextMenuItems;
        contextMenu.open(event.clientX, event.clientY);
    }

    private handleDocumentContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        if (this.activeOverlay.value) return;
        console.log('Show DocumentContextMenu', event);
        const contextMenu = this.shadowRoot!.getElementById('contextMenu')! as ContextMenuElement;
        contextMenu.items = documentContextMenuItems;
        contextMenu.open(event.clientX, event.clientY);
    }

    private handleClickEvent = () => {
        const contextMenu = this.shadowRoot!.getElementById('contextMenu') as ContextMenuElement;

        if (contextMenu) {
            contextMenu.close();
        }
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
        'cc-start-page': StartPageElement
    }
}
