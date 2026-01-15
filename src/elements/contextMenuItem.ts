import type {ActionInterface} from '../actions/actionInterface.ts';
import type {PreconditionFn} from '../keyboard/keyboardShortcutInterface.ts';

export class ContextMenuItem {
    readonly label: string;
    readonly icon: string | null;
    readonly tooltip: string;
    readonly action: ActionInterface | null;
    readonly divider: boolean;
    readonly preconditions: PreconditionFn[];

    constructor(init: Partial<ContextMenuItem>) {
        this.label = init.label ?? '???';
        this.icon = init.icon ?? null;
        this.tooltip = init.tooltip ?? this.label;
        this.action = init.action ?? null;
        this.divider = init.divider ?? false;
        this.preconditions = init.preconditions ?? [];
    }

    static divider() {
        return new ContextMenuItem({ divider: true });
    }
}
