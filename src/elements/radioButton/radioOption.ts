import type {Icon} from '#models/internal/icon.ts';

export interface RadioOption {
    label: HTMLElement | string;
    value: string;
    icon?: Icon;
}
