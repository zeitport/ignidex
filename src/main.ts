import {loadDataFromUrl} from '#core/loadDataFromUrl.ts';
import {StartPanelsStore} from '#core/idb/startPanelsStore.ts';
import {switchToFirstStartPanel} from '#core/switchToFirstStartPanel.ts';
import {UserStateStore} from '#core/idb/userStateStore.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {createId} from '#utils/createId.ts';
import {
    activeStartPanel, activeRemoteUrl, activeOverlay, messageOverlayContent, hoverHintMode, settingsIconStyle,
    cornerActions, bookmarkOnClickAction, activeSettingsPanelId
} from '#state';
import {OverlayType} from './elements/overlays/overlayType.ts';
import {inject} from '#inject';
import {registerKeyboardInputObserver} from './keyboard/keyboardInputObserver.ts';
import {getSettingsUrlParameter} from '#core/settingsUrlParameter.ts';
import {isValidSettingsPanelId} from './elements/overlays/settingsOverlay.ts';
import '#elements';

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
            console.error('Service worker registration failed:', error);
        });
    }
}

async function main() {
    registerServiceWorker();
    registerKeyboardInputObserver();
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
    settingsIconStyle.value = state.settingsIconStyle;
    cornerActions.value = state.cornerActions;
    bookmarkOnClickAction.value = state.bookmarkOnClickAction;

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
    window.addEventListener('popstate', handlePopState);

    const urlParams = new URLSearchParams(window.location.search);
    const loadUrl = urlParams.get('load');
    const settingParam = urlParams.get('setting');

    if (loadUrl) {
        await loadRemotePanel(loadUrl, startPanelsStore);
    } else {
        const anchor = window.location.hash.slice(1);
        let panelLoaded = false;

        if (anchor) {
            const entry = await startPanelsStore.getByAnchor(anchor);
            if (entry) {
                activeStartPanel.value = new StartPanel(entry.startPanel);
                activeRemoteUrl.value = entry.remoteUrl ?? null;
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
                    activeRemoteUrl.value = entry.remoteUrl ?? null;
                    panelLoaded = true;
                }
            }
        }

        if (!panelLoaded) {
            await switchToFirstStartPanel();
        }
    }

    // Handle setting URL parameter - open settings overlay if present
    if (settingParam) {
        if (isValidSettingsPanelId(settingParam)) {
            activeSettingsPanelId.value = settingParam;
        } else {
            // Invalid ID defaults to 'ui' panel
            activeSettingsPanelId.value = 'ui';
        }
        activeOverlay.value = OverlayType.editSettings;
    }
}

async function loadRemotePanel(remoteUrl: string, startPanelsStore: StartPanelsStore): Promise<void> {
    try {
        const loadedPanel = await loadDataFromUrl(remoteUrl);

        // Check if a panel with the same remoteUrl already exists
        const existingEntry = await startPanelsStore.getByRemoteUrl(remoteUrl);

        if (existingEntry) {
            // Update existing entry with new data
            const updatedPanel = new StartPanel({
                ...loadedPanel,
                id: existingEntry.id,
                anchor: existingEntry.anchor
            });

            const updatedEntry = new StartPanelEntry({
                id: existingEntry.id,
                anchor: existingEntry.anchor,
                order: existingEntry.order,
                remoteUrl: remoteUrl,
                startPanel: updatedPanel
            });

            await startPanelsStore.set(updatedEntry);
            activeStartPanel.value = updatedPanel;
            activeRemoteUrl.value = remoteUrl;
        } else {
            // Create new entry
            let anchor = loadedPanel.anchor;

            // Check for anchor conflicts
            if (anchor) {
                const existingAnchor = await startPanelsStore.getByAnchor(anchor);
                if (existingAnchor) {
                    anchor = createId();
                }
            } else {
                anchor = createId();
            }

            const newPanel = new StartPanel({
                ...loadedPanel,
                anchor: anchor
            });

            const nextOrder = await startPanelsStore.getNextOrder();
            const newEntry = new StartPanelEntry({
                id: newPanel.id,
                anchor: anchor,
                order: nextOrder,
                remoteUrl: remoteUrl,
                startPanel: newPanel
            });

            await startPanelsStore.set(newEntry);
            activeStartPanel.value = newPanel;
            activeRemoteUrl.value = remoteUrl;
        }

        // Clean URL: replace ?load=... with #anchor
        const newUrl = `${window.location.pathname}#${activeStartPanel.value?.anchor ?? ''}`;
        history.replaceState(null, '', newUrl);
    } catch (error) {
        console.error('Failed to load remote panel:', error);
        messageOverlayContent.value = 'Failed to load remote panel. Please check the URL is accessible and CORS is enabled.';
        activeOverlay.value = OverlayType.message;

        // Fall back to first panel or getting started
        await switchToFirstStartPanel();
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
                activeRemoteUrl.value = entry.remoteUrl ?? null;
            }
        }
    }
}

function handlePopState() {
    const settingParam = getSettingsUrlParameter();

    if (settingParam) {
        // URL has setting parameter - open/update settings overlay
        if (isValidSettingsPanelId(settingParam)) {
            activeSettingsPanelId.value = settingParam;
        } else {
            activeSettingsPanelId.value = 'ui';
        }

        if (activeOverlay.value !== OverlayType.editSettings) {
            activeOverlay.value = OverlayType.editSettings;
        }
    } else {
        // No setting parameter - close settings overlay if open
        if (activeOverlay.value === OverlayType.editSettings) {
            activeSettingsPanelId.value = null;
            activeOverlay.value = null;
        }
    }
}

void main();
