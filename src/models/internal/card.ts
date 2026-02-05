import {createId} from '#utils/createId.ts';

export class Card {
    id: string;
    type: 'bookmark';
    name: string | null;
    description: string | null;
    icon: string | null;
    url: string | null;

    constructor(init: CardInit = {}) {
        this.id = init.id ?? createId();
        this.type = init.type ?? 'bookmark';
        this.name = init.name ?? null;
        this.icon = init.icon ?? null;
        this.url = init.url ?? null;
        this.description = init.description ?? null;
    }
}

export type CardInit = {
    id?: string | null;
    type?: 'bookmark';
    name?: string | null;
    description?: string | null;
    icon?: string | null;
    url?: string | null;
}
