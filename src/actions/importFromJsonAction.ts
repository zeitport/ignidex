import {inject} from '#core/injector.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {createId} from '#utils/createId.ts';
import {activeOverlay, activeStartPanel, messageOverlayContent} from '../app/state.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import type {ActionInterface} from './actionInterface.ts';

export class ImportFromJsonAction implements ActionInterface {
    constructor(private file: File) {}

    async run() {
        try {
            const content = await this.readFile();
            const data = this.parseJson(content);
            this.validateData(data);
            await this.importData(data);
        } catch (error) {
            this.showError(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }

    private readFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(this.file);
        });
    }

    private parseJson(content: string): StartPanelDto {
        try {
            return JSON.parse(content);
        } catch {
            throw new Error('Invalid JSON file');
        }
    }

    private validateData(data: StartPanelDto): void {
        if (!data.meta || data.meta.app !== 'ignidex') {
            throw new Error('Invalid file: Not an Ignidex export file');
        }

        if (!data.id || !data.sections) {
            throw new Error('Invalid file: Missing required data');
        }
    }

    private async importData(data: StartPanelDto): Promise<void> {
        const startPanelsStore = inject(StartPanelsStore);
        const imageAssetsStore = inject(ImageAssetsStore);

        const existingPanel = await startPanelsStore.get(data.id);
        const oldToNewIdMap = new Map<string, string>();

        let panelId = data.id;
        let anchor = data.anchor;

        if (existingPanel) {
            panelId = createId();
            anchor = panelId;
            oldToNewIdMap.set(data.id, panelId);
        }

        if (data.images && data.images.length > 0) {
            for (const image of data.images) {
                const existingImage = await imageAssetsStore.has(image.id);
                let imageId = image.id;

                if (existingImage) {
                    imageId = createId();
                    oldToNewIdMap.set(image.id, imageId);
                }

                await imageAssetsStore.set({
                    id: imageId,
                    source: image.source,
                    dataUri: image.dataUri
                });
            }
        }

        const panelData = this.remapIds(data, panelId, anchor, oldToNewIdMap);
        const startPanel = new StartPanel(panelData);

        const nextOrder = await startPanelsStore.getNextOrder();
        const entry = new StartPanelEntry({
            id: startPanel.id,
            anchor: startPanel.anchor,
            order: nextOrder,
            startPanel
        });

        await startPanelsStore.set(entry);

        activeStartPanel.value = startPanel;
        window.location.hash = startPanel.anchor ?? startPanel.id;
    }

    private remapIds(
        data: StartPanelDto,
        newPanelId: string,
        newAnchor: string | null,
        idMap: Map<string, string>
    ): Partial<StartPanel> {
        const remapped = structuredClone(data) as any;
        remapped.id = newPanelId;
        remapped.anchor = newAnchor;

        if (remapped.header?.icon && idMap.has(remapped.header.icon)) {
            remapped.header.icon = idMap.get(remapped.header.icon);
        }

        for (const section of remapped.sections) {
            for (const group of section.groups) {
                for (const card of group.cards) {
                    if (card.icon && idMap.has(card.icon)) {
                        card.icon = idMap.get(card.icon);
                    }
                }
            }
        }

        return remapped;
    }

    private showError(message: string): void {
        messageOverlayContent.value = message;
        activeOverlay.value = OverlayType.message;
    }
}
