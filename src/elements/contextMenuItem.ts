import type {ActionInterface} from '../actions/actionInterface.ts';

export class ContextMenuItem {
    readonly label: string;
    readonly icon: string | null;
    readonly tooltip: string;
    readonly action: ActionInterface | null;
    readonly disabled?: boolean;
    readonly divider: boolean;

    constructor(init: Partial<ContextMenuItem>) {
        this.label = init.label ?? '???';
        this.icon = init.icon ?? null;
        this.tooltip = init.tooltip ?? this.label;
        this.disabled = init.disabled ?? false;
        this.action = init.action ?? null;
        this.divider = init.divider ?? false;
    }

    static divider() {
        return new ContextMenuItem({ divider: true });
    }
}
