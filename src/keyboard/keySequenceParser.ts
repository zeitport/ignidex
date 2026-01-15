import type {KeyCombination, KeyboardModifier, ParsedKeySequence} from './keyboardShortcutInterface.ts';

const MODIFIERS: KeyboardModifier[] = ['CTRL', 'ALT', 'SHIFT', 'META'];

function isModifier(token: string): token is KeyboardModifier {
    return MODIFIERS.includes(token as KeyboardModifier);
}

function parseCombination(combo: string): KeyCombination {
    const parts = combo.split('+').map(part => part.trim().toUpperCase());
    const modifiers: KeyboardModifier[] = [];
    let key = '';

    for (const part of parts) {
        if (isModifier(part)) {
            modifiers.push(part);
        } else {
            key = part;
        }
    }

    return {key, modifiers};
}

export function parseKeySequence(sequence: string[]): ParsedKeySequence {
    if (sequence.length === 2) {
        const first = sequence[0].trim().toUpperCase();
        const second = sequence[1].trim().toUpperCase();

        if (first === second && !first.includes('+')) {
            return {
                combinations: [],
                isDoubleTap: true,
                doubleTapKey: first
            };
        }
    }

    const combinations = sequence.map(parseCombination);

    return {
        combinations,
        isDoubleTap: false
    };
}

export function matchesCombination(event: KeyboardEvent, combination: KeyCombination): boolean {
    const eventKey = event.key.toUpperCase();
    const expectedKey = combination.key;

    if (eventKey !== expectedKey) {
        return false;
    }

    const hasCtrl = combination.modifiers.includes('CTRL');
    const hasAlt = combination.modifiers.includes('ALT');
    const hasShift = combination.modifiers.includes('SHIFT');
    const hasMeta = combination.modifiers.includes('META');

    if (event.ctrlKey !== hasCtrl) {
        return false;
    }
    if (event.altKey !== hasAlt) {
        return false;
    }
    if (event.shiftKey !== hasShift) {
        return false;
    }
    if (event.metaKey !== hasMeta) {
        return false;
    }

    return true;
}

export function isModifierOnlyEvent(event: KeyboardEvent): boolean {
    const modifierKeys = ['Control', 'Alt', 'Shift', 'Meta'];
    return modifierKeys.includes(event.key);
}
