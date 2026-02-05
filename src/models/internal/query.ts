import type {Card} from '#models/internal/card.ts';
import type {CardGroup} from '#models/internal/cardGroup.ts';
import type {CardSection} from '#models/internal/cardSection.ts';

export const query = {
    findSection(sections: Array<CardSection>, sectionId: string): CardSection | undefined {
        return sections.find(section => section.id === sectionId);
    },

    findGroup(sections: Array<CardSection>, groupId: string): CardGroup | undefined {
        for (const section of sections) {
            for (const group of section.groups) {
                if (group.id === groupId) {
                    return group;
                }
            }
        }
    },

    findCard(sections: Array<CardSection>, cardId: string): FindCardResult | null {
        for (const section of sections) {
            for (const group of section.groups) {
                for (const card of group.cards) {
                    if (card.id === cardId) {
                        return {section, group, card};
                    }
                }
            }
        }

        return null;
    },

    findSectionWithGroup(sections: Array<CardSection>, groupId: string): CardSection | undefined {
        const filterGroupId = (item: CardGroup) => item.id === groupId;

        return sections.find((section: CardSection) => section.groups.find(filterGroupId));
    },
}

export type FindCardResult = {
    section: CardSection;
    group: CardGroup;
    card: Card;
};
