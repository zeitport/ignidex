import {CardSectionDto} from './cardSectionDto.ts';
import {StartPanelHeaderDto} from './startPanelHeaderDto.ts';
import {ImageDto} from './imageDto.ts';
import {MetaDto} from './metaDto.ts';

export interface StartPanelDto {
    id?: string;
    meta?: MetaDto;
    /**
     * The anchor is matched against the fragment of the location URL
     */
    anchor?: string | null;
    header?: StartPanelHeaderDto;
    sections?: Array<CardSectionDto>;
    images?: Array<ImageDto>;
}
