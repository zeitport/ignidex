import {createId} from '#utils/createId.ts';
import {Card} from './card.ts';

export class CardGroup {
    id: string;
    name: string | null;
    cards: Array<Card>;

    constructor(init: Partial<CardGroup> = {}) {
        this.id = init.id ?? createId();
        this.name = init.name ?? null;
        this.cards = init.cards ?? [];
    }

    /**
     * Upserts a card into the group. If the card already exists, it updates the existing card.
     * If the card does not exist, it adds the card to the group.
     */
    upsertCard(card: Card) {
        const existingIndex = this.cards.findIndex(item => item.id === card.id);

        if (existingIndex >= 0) {
            this.cards[existingIndex] = card;
        } else {
            this.cards.push(card);
        }
    }
}
