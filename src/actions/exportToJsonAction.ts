import {inject} from '#core/injector.ts';
import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import type {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelHeader} from '#models/internal/startPanelHeader.ts';
import {ImageAssetType} from '#models/idb/ImageAssetType.ts';
import {activeStartPanel} from '#state';
import type {ActionInterface} from './actionInterface.ts';

export class ExportToJsonAction implements ActionInterface {
    async run() {
        const startPanel = activeStartPanel.value;
        if (!startPanel) {
            console.error('No active start panel to export.');
            return;
        }

        const imageAssetsStore = inject(ImageAssetsStore);
        const allImages = await imageAssetsStore.getAll();
        const usedIconIds = this.getUsedIconIds(startPanel);
        const images = allImages.filter(image => usedIconIds.has(image.id));

        const exportData: StartPanelDto = {
            meta: {
                app: 'ignidex',
                version: 1,
                exportAt: new Date().toISOString(),
                numberOfCards: this.countAllCards(startPanel),
            },
            id: startPanel.id,
            anchor: startPanel.anchor,
            header: startPanel.header ? {
                title: startPanel.header.title,
                icon: startPanel.header.icon,
                description: startPanel.header.description,
                iconStyle: startPanel.header.iconStyle,
            } : new StartPanelHeader(),
            sections: startPanel.sections,
            images: images.map(icon => ({
                id: icon.id,
                type: icon.type ?? ImageAssetType.icon,
                source: icon.source,
                dataUri: icon.dataUri,
            }))
        };

        const json = JSON.stringify(exportData, null, 2);
        const blob = new Blob([json], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `ignidex-${startPanel.header?.title ?? 'export'}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    private countAllCards(startPanel: StartPanel): number {
        let totalCards = 0;
        for (const section of startPanel.sections) {
            for (const group of section.groups) {
                totalCards += group.cards.length;
            }
        }

        return totalCards;
    }

    private getUsedIconIds(startPanel: StartPanel): Set<string> {
        const usedIconIds = new Set<string>();

        if (startPanel.header?.icon) {
            usedIconIds.add(startPanel.header.icon);
        }

        for (const section of startPanel.sections) {
            for (const group of section.groups) {
                for (const card of group.cards) {
                    if (card.icon) {
                        usedIconIds.add(card.icon);
                    }
                }
            }
        }

        return usedIconIds;
    }
}
