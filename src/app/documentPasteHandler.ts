import {ImageAssetsStore} from '../idb/imageAssetsStore.ts';
import {StartPanelsStore} from '../idb/startPanelsStore.ts';
import {inject} from '#inject';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {mapDtoToStartPanel} from '#models/mapper/mapDtoToModel.ts';
import {activeOverlay, activeRemoteUrl, activeStartPanel, pastedUrl} from '#state';
import {createId} from '#utils/createId.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';

export class DocumentPasteHandler {
    connect() {
        document.addEventListener('paste', this.handlePaste);
    }

    disconnect() {
        document.removeEventListener('paste', this.handlePaste);
    }

    private handlePaste = (event: ClipboardEvent) => {
        if (activeOverlay.value) return;

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

    private async createRemoteStartPanel(remoteUrl: string, data: StartPanelDto): Promise<void> {
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

        const loadedPanel = mapDtoToStartPanel(data);
        const existingEntry = await startPanelsStore.getByRemoteUrl(remoteUrl);

        if (existingEntry) {
            // Update existing entry with new data
            const updatedPanel = new StartPanel({
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

            const newPanel = new StartPanel({
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
}
