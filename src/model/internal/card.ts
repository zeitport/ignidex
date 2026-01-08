import {createId} from '#utils/createId.ts';

export class Card {
    id: string | null;
    type: 'bookmark';
    name: string | null;
    description: string | null;
    icon: string | null;

    /**
     * #TODO
     * Not implemented
     */
    iconRef: string | null;

    url: string | null;

    constructor(init: Partial<Card> = {}) {
        this.id = init.id ?? createId();
        this.type = init.type ?? 'bookmark';
        this.name = init.name ?? null;
        this.icon = init.icon ?? null;
        this.iconRef = init.iconRef ?? null;
        this.url = init.url ?? null;
        this.description = init.description ?? null;
    }
}
