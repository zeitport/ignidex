import {css} from 'lit';

export const contextMenuElementStyle = css`
    :host {
        position: fixed;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        font-size: var(--context-menu-font-size);
    }

    :host([isopen]) {
        pointer-events: auto;
        opacity: 1;
        transition: opacity 100ms ease-in-out;
    }

    .menu {
        position: absolute;
        background: var(--context-menu-bg);

        /* TODO: Make context menu border themeable */
        border: 0 solid var(--context-menu-border);
        border-radius: 0.5rem;
        min-width: 160px;
        padding: 0.5rem 0.5rem;
        display: flex;
        flex-direction: column;
    }

    .menu-item {
        padding: 0.25rem 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: var(--context-menu-text);
        user-select: none;
        white-space: nowrap;
        border-radius: 0.25rem;
    }

    .divider {
        height: 0;
        border-block-start: 1px solid var(--context-menu-divider);
        margin: 0.5rem -0.5rem;
    }

    .menu-item:hover:not(.disabled) {
        background: var(--context-menu-hover-bg);
        color: var(--context-menu-hover-text);

        .icon {
            fill: var(--context-menu-icon-hover);
        }
    }

    .menu-item.disabled {
        opacity: 0.5;
        cursor: var(--not-allowed-cursor);
    }

    .icon {
        width: var(--context-menu-icon-size);
        height: var(--context-menu-icon-size);
        fill: var(--context-menu-icon-color);
    }

    .label {
        flex: 1;
    }
`;
