export class UserStateEntry {
    id: string = 'default';
    lastUsedStartPanelId: string | null = null;
    accentColor: string | null = null;
    baseFontSize: number = 16;
    useUppercase: boolean = true;

    constructor(init?: Partial<UserStateEntry>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
