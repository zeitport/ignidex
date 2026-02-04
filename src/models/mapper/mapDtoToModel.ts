import type {CardDto} from '#models/dto/cardDto.ts';
import type {CardGroupDto} from '#models/dto/cardGroupDto.ts';
import type {CardSectionDto} from '#models/dto/cardSectionDto.ts';
import type {StartPanelDto} from '#models/dto/startPanelDto.ts';
import type {StartPanelHeaderDto} from '#models/dto/startPanelHeaderDto.ts';
import {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelHeader} from '#models/internal/startPanelHeader.ts';

export function mapDtoToStartPanel(startPanelDto: StartPanelDto): StartPanel {
    const dto = structuredClone(startPanelDto);

    return new StartPanel({
        id: dto.id,
        anchor: startPanelDto.anchor ?? dto.id,
        header: mapDtoToStartPanelHeader(dto.header ?? {}),
        sections: startPanelDto.sections?.map(mapDtoToCardSection) ?? [],
    });
}

export function mapDtoToStartPanelHeader(headerDto: StartPanelHeaderDto): StartPanelHeader {
    return new StartPanelHeader(headerDto);
}

export function mapDtoToCardSection(sectionDto: CardSectionDto): CardSection {
    const dto = structuredClone(sectionDto);

    return new CardSection({
        id: dto.id,
        name: dto.name,
        type: dto.type,
        groups: dto.groups?.map(mapDtoToCardGroup) ?? [],
    });
}

export function mapDtoToCardGroup(groupDto: CardGroupDto): CardGroup {
    const dto = structuredClone(groupDto);

    return new CardGroup({
        id: dto.id,
        name: dto.name,
        cards: groupDto.cards?.map(mapDtoToCard) ?? [],
    });
}

export function mapDtoToCard(cardDto: CardDto): Card {
    return new Card(cardDto);
}
