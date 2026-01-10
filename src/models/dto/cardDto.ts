export interface CardDto {
    id: string | null;
    type: 'bookmark';
    name: string | null;
    description: string | null;
    icon: string | null;
    url: string | null;
}
