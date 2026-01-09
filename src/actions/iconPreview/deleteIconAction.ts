import type {ActionInterface} from '../actionInterface.ts';

export class DeleteIconAction implements ActionInterface {
    constructor(private onDelete: () => void) {}

    run() {
        this.onDelete();
    }
}
