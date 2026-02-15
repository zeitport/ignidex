import {IconStyle} from '#models/internal/iconStyle.ts';

export class StartPanelHeader {
    title: string | null;
    icon: string | null;
    description: string | null;
    iconStyle: IconStyle;

    constructor(init: Partial<StartPanelHeader> = {}) {
        this.title = init.title ?? null;
        this.icon = init.icon ?? null;
        this.description = init.description ?? null;
        this.iconStyle = init.iconStyle ?? IconStyle.maskAccent;
    }
}
