import {loadDataFromUrl} from '#core/loadDataFromUrl.ts';
import {StartPanelsStore} from '#core/startPanelsStore.ts';
import {switchToFirstStartPanel} from '#core/switchToFirstStartPanel.ts';
import {UserStateStore} from '#core/userStateStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {createId} from '#utils/createId.ts';
import {activeStartPanel} from './app/state.ts';
import '#elements';

async function main() {
    console.log('Starting application...');
    console.log(createId());

    const userStateStore = new UserStateStore();
    const startPanelsStore = new StartPanelsStore();

    const state = await userStateStore.getOrCreate();
    if (state.accentColor) {
        document.documentElement.style.setProperty('--accent', state.accentColor);
    }
    if (state.baseFontSize) {
        document.documentElement.style.setProperty('--base-font-size', `${state.baseFontSize}px`);
    }

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

    window.addEventListener('hashchange', async () => {
        const anchor = window.location.hash.slice(1);
        if (anchor) {
            const currentPanel = activeStartPanel.value;
            if (currentPanel?.anchor !== anchor) {
                const entry = await startPanelsStore.getByAnchor(anchor);
                if (entry) {
                    activeStartPanel.value = new StartPanel(entry.startPanel);
                }
            }
        }
    });

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

main();
