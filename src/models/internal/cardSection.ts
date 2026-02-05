import type {CardGroup} from '#models/internal/cardGroup.ts';
import {createId} from '#utils/createId.ts';
import {CardSectionType} from './cardSectionType.ts';

export class CardSection {
    id: string;
    name: string | null;
    type: CardSectionType;
    groups: Array<CardGroup>;

    constructor(init: Partial<CardSection>) {
        this.id = init.id ?? createId();
        this.name = init.name ?? null;
        this.type = init.type ?? CardSectionType.Highlight;
        this.groups =init.groups ?? [];
    }
}
