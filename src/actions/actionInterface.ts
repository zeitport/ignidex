import {ActionConfirmation} from './actionConfirmation.ts';

export interface ActionInterface {
    run(): void | Promise<void>;
    confirmation?: ActionConfirmation;
    confirm?(): void | Promise<void>;
    cancel?(): void | Promise<void>;
    isDisabled?(): boolean | Promise<boolean>;
    disabledHint?: string;
}
