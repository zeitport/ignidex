import {CardSectionDto} from './cardSectionDto.ts';
import {StartPanelHeaderDto} from './startPanelHeaderDto.ts';
import {IconDto} from './iconDto.ts';
import {MetaDto} from './metaDto.ts';

export interface StartPanelDto {
    id: string;
    /**
     * The anchor is matched against the fragment of the location URL
     */
    anchor: string | null;
    header: StartPanelHeaderDto | null;
    sections: Array<CardSectionDto>;
    icons: Array<IconDto>;
    meta: MetaDto;
}
