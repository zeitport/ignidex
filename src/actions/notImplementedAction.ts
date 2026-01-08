import type {ActionInterface} from './actionInterface.ts';

export class NotImplementedAction implements ActionInterface {
    readonly message: string;

    constructor(init: Partial<NotImplementedAction>) {
        this.message = init.message ?? 'LogCardAction';
    }

    run() {
        console.warn(`This feature is not implemented: ${this.message}`);
    }
}
