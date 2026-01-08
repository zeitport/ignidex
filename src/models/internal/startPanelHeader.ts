export class StartPanelHeader {
    title: string | null;

    constructor(init: Partial<StartPanelHeader> = {}) {
        this.title = init.title ?? null;
    }
}
