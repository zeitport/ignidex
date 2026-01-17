import {diceRollResult} from '#state';
import type {ActionInterface} from './actionInterface.ts';

export const D6: number[] = [1,2,3,4,5,6];
export const D20: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export class RollD6DiceAction implements ActionInterface {
    readonly dice: number[];

    constructor(dice: number[]) {
        this.dice = dice;
    }

    run() {
        this.dice.sort(() => Math.random() - 0.5);

        diceRollResult.value = this.dice[0];
    }
}
