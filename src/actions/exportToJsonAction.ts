import {inject} from '#core/injector.ts';
import {IconAssetsStore} from '#core/iconAssetsStore.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import {activeStartPanel} from '../app/state.ts';
import type {ActionInterface} from './actionInterface.ts';

export class ExportToJsonAction implements ActionInterface {
    async run() {
        const startPanel = activeStartPanel.value;
        if (!startPanel) {
            console.error('No active start panel to export.');
            return;
        }

        const iconAssetsDatabase = inject(IconAssetsStore);
        const allIcons = await iconAssetsDatabase.getAll();
        const usedIconIds = this.getUsedIconIds(startPanel);
        const icons = allIcons.filter(icon => usedIconIds.has(icon.id));

        const exportData: StartPanelDto = {
            meta: {
                app: 'ignidex',
                version: 1,
                exportAt: new Date().toISOString(),
                numberOfCards: this.countAllCards(startPanel),
            },
            ...(startPanel as any),
            icons: icons.map(icon => ({
                id: icon.id,
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

    private countAllCards(startPanel: any): number {
        let totalCards = 0;
        for (const section of startPanel.sections) {
            for (const group of section.groups) {
                totalCards += group.cards.length;
            }
        }

        return totalCards;
    }

    private getUsedIconIds(startPanel: any): Set<string> {
        const usedIconIds = new Set<string>();

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
