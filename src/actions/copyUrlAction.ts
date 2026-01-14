import {selectedCard} from '#state';
import {ActionInterface} from './actionInterface.ts';

export class CopyUrlAction implements ActionInterface {
    async run() {
        const card = selectedCard.value;
        if (!card || !card.url) return;

        try {
            await navigator.clipboard.writeText(card.url);
            console.log('URL copied to clipboard:', card.url);
        } catch (err) {
            console.error('Failed to copy URL to clipboard:', err);
        }
    }
}
