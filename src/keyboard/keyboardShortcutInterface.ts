import type {ActionInterface} from '../actions/actionInterface.ts';
import {KeyboardShortcutGroup} from './KeyboardShortcutGroup.ts';

export type KeyboardModifier = 'CTRL' | 'ALT' | 'SHIFT' | 'META';

export interface KeyCombination {
    key: string;
    modifiers: KeyboardModifier[];
}

export type PreconditionFn = () => boolean;

export interface KeyboardShortcut {
    name: string;
    group: KeyboardShortcutGroup;
    keySequence: string[];
    description: string;
    preconditions: PreconditionFn[];
    getAction: () => ActionInterface;
}

export interface ParsedKeySequence {
    combinations: KeyCombination[];
    isDoubleTap: boolean;
    doubleTapKey?: string;
}
