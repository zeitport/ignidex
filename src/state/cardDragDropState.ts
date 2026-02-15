import type {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import type {InsertPosition} from './insertPosition.ts';

export interface CardDragDropState {
    draggedCard: Card;
    sourceGroupId: string;
    sourceSectionId: string;
    cursorX: number;
    cursorY: number;
    cardDropTarget: Card | null;
    groupDropTarget: CardGroup | null;
    insertPosition: InsertPosition;
}
