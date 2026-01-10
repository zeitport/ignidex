export class StartPanelHeader {
    title: string | null;
    icon: string | null;
    description: string | null;

    constructor(init: Partial<StartPanelHeader> = {}) {
        this.title = init.title ?? null;
        this.icon = init.icon ?? null;
        this.description = init.description ?? null;
    }
}
