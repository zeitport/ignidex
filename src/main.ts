import {loadDataFromUrl} from '#core/loadDataFromUrl.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {switchToFirstStartPanel} from '#core/switchToFirstStartPanel.ts';
import {UserStateStore} from '#core/idb/userStateStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {createId} from '#utils/createId.ts';
import {activeStartPanel, activeOverlay, hoverHintMode, activeContextMenu} from '#state';
import {inject} from '#inject';
import {SwitchPanelBackAction} from './actions/switchPanelBackAction.ts';
import {SwitchPanelNextAction} from './actions/switchPanelNextAction.ts';
import {SwitchPanelAction} from './actions/switchPanelAction.ts';
import {OpenSettingsAction} from './actions/openSettingsAction.ts';
import '#elements';

const DOUBLE_SHIFT_TIMEOUT_MS = 300;
let lastShiftPressTime = 0;

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
            console.error('Service worker registration failed:', error);
        });
    }
}

function registerKeyboardNavigation() {
    document.addEventListener('keydown', (event: KeyboardEvent) =>  void handleKeyDown(event));
}

async function handleKeyDown(event: KeyboardEvent) {
    if (activeOverlay.value !== null) {
        return;
    }

    const activeElement = document.activeElement;
    const isInputFocused = activeElement instanceof HTMLInputElement
        || activeElement instanceof HTMLTextAreaElement
        || (activeElement instanceof HTMLElement && activeElement.isContentEditable);

    if (isInputFocused) {
        return;
    }

    if (event.shiftKey) {
        const now = Date.now();

        if (now - lastShiftPressTime < DOUBLE_SHIFT_TIMEOUT_MS) {
            const action = inject(SwitchPanelAction);

            if (!await action.isDisabled()) {
                action.run();
                event.stopPropagation();
                event.preventDefault();
            }

            lastShiftPressTime = 0;
        } else {
            lastShiftPressTime = now;
        }
        return;
    }

    if (event.key === 'ArrowLeft') {
        await inject(SwitchPanelBackAction).run();
        event.stopPropagation();
        event.preventDefault();
    } else if (event.key === 'ArrowRight') {
        await inject(SwitchPanelNextAction).run();
        event.stopPropagation();
        event.preventDefault();
    } else if (event.key === 'F1') {
        activeContextMenu.value = null;
        inject(OpenSettingsAction).run();
        event.stopPropagation();
        event.preventDefault();
    }
}

async function main() {
    registerServiceWorker();
    registerKeyboardNavigation();
    console.log('Starting application...');
    console.log(createId());

    const userStateStore = inject(UserStateStore);
    const startPanelsStore = inject(StartPanelsStore);

    const state = await userStateStore.getOrCreate();
    if (state.accentColor) {
        document.documentElement.style.setProperty('--accent', state.accentColor);
    }
    if (state.baseFontSize) {
        document.documentElement.style.setProperty('--base-font-size', `${state.baseFontSize}px`);
    }
    document.documentElement.style.setProperty('--text-transform', state.useUppercase ? 'uppercase' : 'none');
    hoverHintMode.value = state.hoverHintMode;

    activeStartPanel.observe(async (panel) => {
        if (panel) {
            const state = await userStateStore.getOrCreate();
            state.lastUsedStartPanelId = panel.id;
            await userStateStore.set(state);

            if (panel.anchor && window.location.hash !== `#${panel.anchor}`) {
                if (window.location.hash === '') {
                    history.replaceState(null, '', `#${panel.anchor}`);
                } else {
                    window.location.hash = panel.anchor;
                }
            }
        }
    });

    window.addEventListener('hashchange', () => void handleHashChange());

    const urlParams = new URLSearchParams(window.location.search);
    const loadUrl = urlParams.get('load');

    if (loadUrl) {
        activeStartPanel.value = await loadDataFromUrl(loadUrl);
    } else {
        const anchor = window.location.hash.slice(1);
        let panelLoaded = false;

        if (anchor) {
            const entry = await startPanelsStore.getByAnchor(anchor);
            if (entry) {
                activeStartPanel.value = new StartPanel(entry.startPanel);
                panelLoaded = true;
            }
        }

        if (!panelLoaded) {
            const state = await userStateStore.getOrCreate();
            const lastUsedStartPanelId = state.lastUsedStartPanelId;

            if (lastUsedStartPanelId) {
                const entry = await startPanelsStore.get(lastUsedStartPanelId);
                if (entry) {
                    activeStartPanel.value = new StartPanel(entry.startPanel);
                    panelLoaded = true;
                }
            }
        }

        if (!panelLoaded) {
            await switchToFirstStartPanel();
        }
    }
}

async function handleHashChange() {
    const anchor = window.location.hash.slice(1);

    if (anchor) {
        const startPanelsStore = inject(StartPanelsStore);
        const currentPanel = activeStartPanel.value;
        if (currentPanel?.anchor !== anchor) {
            const entry = await startPanelsStore.getByAnchor(anchor);
            if (entry) {
                activeStartPanel.value = new StartPanel(entry.startPanel);
            }
        }
    }
}

void main();
