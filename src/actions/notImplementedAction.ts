import type {ActionInterface} from './actionInterface.ts';

export class NotImplementedAction implements ActionInterface {
    readonly message: string;
    disabledHint?: string;

    constructor(init: Partial<NotImplementedAction>) {
        this.message = init.message ?? 'LogCardAction';
    }

    isDisabled(): boolean {
        this.disabledHint = 'Not implemented yet';
        return true;
    }

    run() {
        console.warn(`This feature is not implemented: ${this.message}`);
    }
}
