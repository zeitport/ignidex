import {activeContextMenu} from '#state';
import {HoverHint} from '#app/hoverHint.ts';
import type {KeyboardShortcut, KeyCombination} from './keyboardShortcutInterface.ts';
import {keyboardShortcuts} from './keyboardShortcuts.ts';
import {isModifierOnlyEvent, matchesCombination, parseKeySequence} from './keySequenceParser.ts';

const DOUBLE_TAP_TIMEOUT_MS = 300;
const SEQUENCE_TIMEOUT_MS = 1000;

interface ShortcutState {
    lastKeyTime: number;
    lastKey: string;
    sequenceBuffer: KeyCombination[];
    sequenceStartTime: number;
}

const state: ShortcutState = {
    lastKeyTime: 0,
    lastKey: '',
    sequenceBuffer: [],
    sequenceStartTime: 0
};

function checkPreconditions(shortcut: KeyboardShortcut): boolean {
    return shortcut.preconditions.every(fn => fn());
}

function resetSequenceBuffer() {
    state.sequenceBuffer = [];
    state.sequenceStartTime = 0;
}

function findMatchingShortcut(event: KeyboardEvent): KeyboardShortcut | null {
    const now = Date.now();

    if (now - state.sequenceStartTime > SEQUENCE_TIMEOUT_MS && state.sequenceBuffer.length > 0) {
        resetSequenceBuffer();
    }

    for (const shortcut of keyboardShortcuts) {
        const parsed = parseKeySequence(shortcut.keySequence);

        if (parsed.isDoubleTap && parsed.doubleTapKey) {
            const eventKey = event.key.toUpperCase();
            const expectedKey = parsed.doubleTapKey;

            if (eventKey === expectedKey || (expectedKey === 'SHIFT' && event.key === 'Shift')) {
                if (state.lastKey === expectedKey && now - state.lastKeyTime < DOUBLE_TAP_TIMEOUT_MS) {
                    if (checkPreconditions(shortcut)) {
                        state.lastKey = '';
                        state.lastKeyTime = 0;
                        return shortcut;
                    }
                }

                state.lastKey = expectedKey;
                state.lastKeyTime = now;
            }
            continue;
        }

        if (parsed.combinations.length === 1) {
            if (matchesCombination(event, parsed.combinations[0]) && checkPreconditions(shortcut)) {
                return shortcut;
            }
            continue;
        }

        if (parsed.combinations.length > 1) {
            const nextIndex = state.sequenceBuffer.length;

            if (nextIndex < parsed.combinations.length) {
                if (matchesCombination(event, parsed.combinations[nextIndex])) {
                    if (state.sequenceBuffer.length === 0) {
                        state.sequenceStartTime = now;
                    }
                    state.sequenceBuffer.push(parsed.combinations[nextIndex]);

                    if (state.sequenceBuffer.length === parsed.combinations.length) {
                        if (checkPreconditions(shortcut)) {
                            resetSequenceBuffer();
                            return shortcut;
                        }
                        resetSequenceBuffer();
                    }
                    return null;
                }
            }
        }
    }

    return null;
}

async function executeShortcut(shortcut: KeyboardShortcut, event: KeyboardEvent): Promise<boolean> {
    const action = shortcut.getAction();

    if (action.isDisabled) {
        const disabled = await action.isDisabled();
        if (disabled) {
            if (action.disabledHint) {
                HoverHint.show(action.disabledHint);
                setTimeout(() => HoverHint.clear(), 2000);
            }
            return false;
        }
    }

    activeContextMenu.value = null;
    await action.run();
    event.stopPropagation();
    event.preventDefault();
    return true;
}

async function handleKeyDown(event: KeyboardEvent): Promise<void> {
    if (isModifierOnlyEvent(event) && event.key !== 'Shift') {
        return;
    }

    const shortcut = findMatchingShortcut(event);

    if (shortcut) {
        await executeShortcut(shortcut, event);
    }
}

export function registerKeyboardInputObserver(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => void handleKeyDown(event));
}
