import {CardDto} from './cardDto.ts';

export interface CardGroupDto {
    id: string;
    name: string | null;
    cards: Array<CardDto>;
}
