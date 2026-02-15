import {LitElement, html, type TemplateResult, type PropertyValues} from 'lit';
import {customElement} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {
    activeOverlay,
    activeStartPanel,
    isDraggingFile,
    messageOverlayContent,
    activeContextMenu,
    activeSubOverlay,
    cardDragDrop
} from '#state';
import {CardMover} from '#app/cardMover.ts';
import {panelContextMenuItems} from '../contextMenus/panelContextMenuItems.ts';
import type {CardSection} from '../models/internal/cardSection.ts';
import {CardSectionType} from '../models/internal/cardSectionType.ts';
import type {ContextMenuElement} from './contextMenuElement.ts';
import {OverlayType} from './overlays/overlayType.ts';
import {startPanelElementStyle} from './startPanelElementStyle.ts';
import {ImportFromJsonAction} from '../actions/importFromJsonAction.ts';
import {inject} from '#inject';
import {StartPanel} from '#models/internal/startPanel.ts';

@customElement('cc-start-panel')
export class StartPanelElement extends LitElement {
    static styles = startPanelElementStyle;

    private activeOverlay = activeOverlay.watch(this);
    private activeSubOverlay = activeSubOverlay.watch(this);
    private activeStartPanel = activeStartPanel.watch(this);
    private isDraggingFile = isDraggingFile.watch(this);
    private activeContextMenu = activeContextMenu.watch(this);
    private cardDragDrop = cardDragDrop.watch(this);
    private dragCounter = 0;
    private cardMover = inject(CardMover);

    private sectionRenderer: Map<CardSectionType, (section: CardSection) => TemplateResult> = new Map(
        [
            [CardSectionType.Highlight, section => html`<cc-highlight-section .section=${section}></cc-highlight-section>`],
            [CardSectionType.Groups, section => html`<cc-groups-section .section=${section}></cc-groups-section>`]
        ]
    );

    protected update(changedProperties: PropertyValues) {
        super.update(changedProperties);
        console.log('StartPanelElement updated', {changedProperties});
    }

    constructor() {
        super();

        // activeStartPanel.watch(this);
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('click', this.handleClickEvent);
        document.addEventListener('contextmenu', this.handleDocumentContextMenu);
        document.addEventListener('dragenter', this.handleDragEnter);
        document.addEventListener('dragleave', this.handleDragLeave);
        document.addEventListener('dragover', this.handleDragOver);
        document.addEventListener('drop', this.handleDrop);
        document.addEventListener('mouseup', this.handleBookmarkDragMouseUp);
        document.addEventListener('mousemove', this.handleBookmarkDragMouseMove);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        window.addEventListener('blur', this.handleWindowBlur);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('click', this.handleClickEvent);
        document.removeEventListener('contextmenu', this.handleDocumentContextMenu);
        document.removeEventListener('dragenter', this.handleDragEnter);
        document.removeEventListener('dragleave', this.handleDragLeave);
        document.removeEventListener('dragover', this.handleDragOver);
        document.removeEventListener('drop', this.handleDrop);
        document.removeEventListener('mouseup', this.handleBookmarkDragMouseUp);
        document.removeEventListener('mousemove', this.handleBookmarkDragMouseMove);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('blur', this.handleWindowBlur);
    }

    render() {
        console.log('StartPanelElement render');
        const startPanel = this.activeStartPanel.value;

        return html`
            ${when(startPanel, panel => this.renderStartPanel(panel))}

            ${this.renderOverlay(this.activeOverlay.value)}
            ${this.renderOverlay(this.activeSubOverlay.value)}

            ${when(this.isDraggingFile.value, () => html`<cc-drop-file-overlay></cc-drop-file-overlay>`)}

            ${when(this.cardDragDrop.value, () => html`<cc-drag-ghost></cc-drag-ghost>`)}

            <cc-context-menu id="contextMenu"></cc-context-menu>

            <cc-hover-hint></cc-hover-hint>

            <cc-corner-action position="topLeft"></cc-corner-action>
            <cc-corner-action position="topRight"></cc-corner-action>
            <cc-corner-action position="bottomLeft"></cc-corner-action>
            <cc-corner-action position="bottomRight"></cc-corner-action>
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

    private renderOverlay(overlayType: OverlayType | null) {
        if (overlayType) {
            if (overlayType === OverlayType.editBookmark) {
                return html`<cc-edit-bookmark-card-overlay></cc-edit-bookmark-card-overlay>`;
            }

            if (overlayType === OverlayType.switchPanel) {
                return html`<cc-switch-panel-overlay></cc-switch-panel-overlay>`;
            }

            if (overlayType === OverlayType.editSettings) {
                return html`<cc-settings-overlay></cc-settings-overlay>`;
            }

            if (overlayType === OverlayType.newPanel) {
                return html`<cc-edit-panel-overlay isCreateMode></cc-edit-panel-overlay>`;
            }

            if (overlayType === OverlayType.editPanel) {
                return html`<cc-edit-panel-overlay></cc-edit-panel-overlay>`;
            }

            if (overlayType === OverlayType.newSection) {
                return html`<cc-new-section-overlay></cc-new-section-overlay>`;
            }

            if (overlayType === OverlayType.editHighlightSection) {
                return html`<cc-edit-highlight-section-overlay></cc-edit-highlight-section-overlay>`;
            }

            if (overlayType === OverlayType.editGroupsSection) {
                return html`<cc-edit-groups-section-overlay></cc-edit-groups-section-overlay>`;
            }

            if (overlayType === OverlayType.editGroup) {
                return html`<cc-edit-group-overlay></cc-edit-group-overlay>`;
            }

            if (overlayType === OverlayType.gettingStarted) {
                return html`<cc-getting-started-overlay></cc-getting-started-overlay>`;
            }

            if (overlayType === OverlayType.confirmation) {
                return html`<cc-confirmation-overlay></cc-confirmation-overlay>`;
            }

            if (overlayType === OverlayType.selectSection) {
                return html`<cc-select-section-overlay></cc-select-section-overlay>`;
            }

            if (overlayType === OverlayType.selectGroup) {
                return html`<cc-select-group-overlay></cc-select-group-overlay>`;
            }

            if (overlayType === OverlayType.message) {
                return html`<cc-message-overlay></cc-message-overlay>`;
            }

            if (overlayType === OverlayType.selectCornerAction) {
                return html`<cc-select-corner-action-overlay></cc-select-corner-action-overlay>`;
            }

            if (overlayType === OverlayType.selectIcon) {
                return html`<cc-select-icon-overlay></cc-select-icon-overlay>`;
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
            items: panelContextMenuItems,
            x: event.clientX,
            y: event.clientY
        };
    }

    private handleClickEvent = () => {
        activeContextMenu.value = null;
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

        try {
            const action = new ImportFromJsonAction(file);
            void action.run();
        } catch (error) {
            console.warn(error);
        }
    }

    private handleBookmarkDragMouseUp = () => {
        const dragState = cardDragDrop.value;
        if (!dragState) return;

        const {draggedCard, cardDropTarget, groupDropTarget, insertPosition} = dragState;

        if (cardDropTarget && draggedCard.id !== cardDropTarget.id) {
            void this.cardMover.moveCardToPosition(draggedCard, cardDropTarget, insertPosition);
        } else if (groupDropTarget) {
            void this.cardMover.moveCardToGroup(draggedCard, groupDropTarget);
        }

        cardDragDrop.value = null;
    }

    private clearDragState() {
        cardDragDrop.value = null;
    }

    private handleVisibilityChange = () => {
        if (document.hidden) {
            this.clearDragState();
        }
    }

    private handleWindowBlur = () => {
        this.clearDragState();
    }

    private handleBookmarkDragMouseMove = (event: MouseEvent) => {
        const dragState = cardDragDrop.value;
        if (dragState) {
            cardDragDrop.value = {
                ...dragState,
                cursorX: event.clientX,
                cursorY: event.clientY
            };
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-start-panel': StartPanelElement
    }
}
