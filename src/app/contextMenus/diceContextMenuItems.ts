import { mdiDice6
} from '@mdi/js';
import {D6, RollD6DiceAction} from '../../actions/rollD6DiceAction.ts';
import {ContextMenuItem} from '../../elements/contextMenuItem.ts';

export const diceContextMenuItems = [
    new ContextMenuItem({
        icon: mdiDice6,
        label: 'Roll the dice',
        tooltip: '[LMB] Roll a D6; +1 Happy; -1 Not a wizard',
        action: new RollD6DiceAction(D6)
    })
];
