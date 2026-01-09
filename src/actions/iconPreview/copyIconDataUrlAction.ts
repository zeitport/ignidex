import type {ActionInterface} from '../actionInterface.ts';

export class CopyIconDataUrlAction implements ActionInterface {
    constructor(private getDataUri: () => string) {}

    async run() {
        const dataUri = this.getDataUri();
        if (!dataUri) return;

        try {
            await navigator.clipboard.writeText(dataUri);
            console.log('Icon data URL copied to clipboard');
        } catch (err) {
            console.error('Failed to copy icon data URL to clipboard:', err);
        }
    }
}
