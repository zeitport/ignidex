import {createId} from '#utils/createId.ts';
import {CardGroup} from './cardGroup.ts';
import {CardSectionType} from './cardSectionType.ts';

export class CardSection {
    readonly id: string;
    readonly name: string | null;
    readonly type: CardSectionType;
    readonly groups: Array<CardGroup>;

    constructor(init: Partial<CardSection>) {
        this.id = init.id ?? createId();
        this.name = init.name ?? null;
        this.type = init.type ?? CardSectionType.Highlight;
        this.groups = (init.groups ?? []).map(group => new CardGroup(group));
    }
}
