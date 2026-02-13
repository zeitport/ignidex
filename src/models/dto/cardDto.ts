import type {IconStyle} from '#models/internal/iconStyle.ts';

export interface CardDto {
    id: string | null;
    type: 'bookmark';
    name: string | null;
    description: string | null;
    icon: string | null;
    iconStyle?: IconStyle;
    url: string | null;
}
