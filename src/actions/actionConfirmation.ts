export class ActionConfirmation {
    message: string;
    buttonLabel: string;

    constructor(init: Partial<ActionConfirmation> = {}) {
        this.message = init.message ?? 'Are you sure you want to proceed?';
        this.buttonLabel = init.buttonLabel ?? 'Confirm';
    }
}
