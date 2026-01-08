export interface CardDto {
    id: string | null;
    type: 'bookmark';
    name: string | null;
    description: string | null;
    iconName: string | null;
    iconUrl: string | null;
    iconRef: string | null;
    url: string | null;
}
