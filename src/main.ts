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
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const loadUrl = urlParams.get('load');

    if (loadUrl) {
        activeStartPanel.value = await loadDataFromUrl(loadUrl);
    } else {
        const state = await userStateStore.getOrCreate();
        const lastUsedStartPanelId = state.lastUsedStartPanelId;
        let panelLoaded = false;

        if (lastUsedStartPanelId) {
            const entry = await startPanelsStore.get(lastUsedStartPanelId);
            if (entry) {
                activeStartPanel.value = new StartPanel(entry.startPanel);
                panelLoaded = true;
            }
        }

        if (!panelLoaded) {
            await switchToFirstStartPanel();
        }
    }
}

main();
