import {StartPanel} from '#models/internal/startPanel.ts';

export function clonePanel(startPanel: StartPanel): StartPanel {
    return new StartPanel(structuredClone(startPanel));
}
