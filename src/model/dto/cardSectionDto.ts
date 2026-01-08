import {CardGroupDto} from './cardGroupDto.ts';
import {CardSectionType} from '../internal/cardSectionType.ts';

export interface CardSectionDto {
    id: string;
    name: string | null;
    type: CardSectionType;
    groups: Array<CardGroupDto>;
}
