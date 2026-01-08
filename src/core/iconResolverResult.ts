export class IconResolverResult {
    error: string | null;
    dataUri: string | null;

    constructor(init: Partial<IconResolverResult> = {}) {
        this.error = init.error ?? null;
        this.dataUri = init.dataUri ?? null;
    }
}
