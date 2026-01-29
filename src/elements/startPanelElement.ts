import type {StartPanel} from '#models/internal/startPanel.ts';
import {LitElement, html, type TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {
    activeOverlay,
    activeStartPanel,
    pastedUrl,
    isDraggingFile,
    messageOverlayContent,
    activeContextMenu,
    activeRemoteUrl,
    activeSubOverlay,
    bookmarkDragDrop
} from '#state';
import type {CardSection} from '../models/internal/cardSection.ts';
import {CardSectionType} from '../models/internal/cardSectionType.ts';
import {documentContextMenuItems} from '../app/contextMenus/documentContextMenuItems.ts';
import type {ContextMenuElement} from './contextMenuElement.ts';
import {OverlayType} from './overlays/overlayType.ts';
import {startPanelElementStyle} from './startPanelElementStyle.ts';
import {ImportFromJsonAction} from '../actions/importFromJsonAction.ts';
import {inject} from '#inject';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel as StartPanelModel} from '#models/internal/startPanel.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {createId} from '#utils/createId.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';

@customElement('cc-start-panel')
export class StartPanelElement extends LitElement {
    static styles = startPanelElementStyle;

    private activeOverlay = activeOverlay.watch(this);
    private activeSubOverlay = activeSubOverlay.watch(this);
    private activeStartPanel = activeStartPanel.watch(this);
    private isDraggingFile = isDraggingFile.watch(this);
    private activeContextMenu = activeContextMenu.watch(this);
    private bookmarkDragDrop = bookmarkDragDrop.watch(this);
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

            ${this.renderOverlay(this.activeOverlay.value)}
            ${this.renderOverlay(this.activeSubOverlay.value)}

            ${when(this.isDraggingFile.value, () => html`<cc-drop-file-overlay></cc-drop-file-overlay>`)}

            ${when(this.bookmarkDragDrop.value, () => html`<cc-drag-ghost></cc-drag-ghost>`)}

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
            void this.handlePastedUrl(pastedText);
        }
    }

    private async handlePastedUrl(url: string): Promise<void> {
        try {
            const response = await fetch(url, {cache: 'no-store'});

            if (!response.ok) {
                this.openBookmarkOverlay(url);
                return;
            }

            const data = await response.json() as Partial<StartPanelDto>;

            if (!data.meta || data.meta.app !== 'ignidex') {
                this.openBookmarkOverlay(url);
                return;
            }

            await this.createRemoteStartPanel(url, data);
        } catch {
            this.openBookmarkOverlay(url);
        }
    }

    private openBookmarkOverlay(url: string): void {
        pastedUrl.value = url;
        activeOverlay.value = OverlayType.selectSection;
    }

    private async createRemoteStartPanel(remoteUrl: string, data: Partial<StartPanelDto>): Promise<void> {
        const startPanelsStore = inject(StartPanelsStore);
        const imageAssetsStore = inject(ImageAssetsStore);

        // Store images if present
        if (data.images && Array.isArray(data.images)) {
            for (const image of data.images) {
                if (image.id && image.dataUri) {
                    await imageAssetsStore.set(image);
                }
            }
        }

        const loadedPanel = new StartPanelModel(data);
        const existingEntry = await startPanelsStore.getByRemoteUrl(remoteUrl);

        if (existingEntry) {
            // Update existing entry with new data
            const updatedPanel = new StartPanelModel({
                ...loadedPanel,
                id: existingEntry.id,
                anchor: existingEntry.anchor
            });

            const updatedEntry = new StartPanelEntry({
                id: existingEntry.id,
                anchor: existingEntry.anchor,
                order: existingEntry.order,
                remoteUrl: remoteUrl,
                startPanel: updatedPanel
            });

            await startPanelsStore.set(updatedEntry);
            activeStartPanel.value = updatedPanel;
            activeRemoteUrl.value = remoteUrl;
        } else {
            // Create new entry
            let anchor = loadedPanel.anchor;

            // Check for anchor conflicts
            if (anchor) {
                const existingAnchor = await startPanelsStore.getByAnchor(anchor);
                if (existingAnchor) {
                    anchor = createId();
                }
            } else {
                anchor = createId();
            }

            const newPanel = new StartPanelModel({
                ...loadedPanel,
                anchor: anchor
            });

            const nextOrder = await startPanelsStore.getNextOrder();
            const newEntry = new StartPanelEntry({
                id: newPanel.id,
                anchor: anchor,
                order: nextOrder,
                remoteUrl: remoteUrl,
                startPanel: newPanel
            });

            await startPanelsStore.set(newEntry);
            activeStartPanel.value = newPanel;
            activeRemoteUrl.value = remoteUrl;
        }

        // Update URL hash
        if (activeStartPanel.value?.anchor) {
            window.location.hash = activeStartPanel.value.anchor;
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

        try {
            const action = new ImportFromJsonAction(file);
            void action.run();
        } catch (error) {
            console.warn(error);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-start-panel': StartPanelElement
    }
}
