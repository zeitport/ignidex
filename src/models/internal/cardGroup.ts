import {createId} from '#utils/createId.ts';
import {Card} from './card.ts';

export class CardGroup {
    id: string;
    name: string | null;
    cards: Array<Card>;

    constructor(init: Partial<CardGroup> = {}) {
        this.id = init.id ?? createId();
        this.name = init.name ?? null;
        this.cards = (init.cards ?? []).map(card => new Card(card));
    }
}
