import {css} from 'lit';

export const listElementStyle = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .list-item {
        display: flex;
        align-items: center;
        padding: var(--list-item-padding);
        background: var(--list-bg);
        border-radius: var(--list-item-border-radius);
        cursor: pointer;
        transition: background-color 0.2s, border-inline-start-color 0.2s;
        gap: var(--list-item-gap);
        border-inline-start: 0.5rem solid transparent;
    }

    .list-item:hover {
        background: var(--list-bg-hover);
    }

    .list-item.selected {
        background: var(--list-bg-hover);
        border-inline-start-color: var(--accent);
    }

    .list-item:hover .item-icon,
    .list-item.selected .item-icon {
        fill: var(--context-menu-icon-hover);
    }

    .item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--context-menu-icon-color);
    }

    .item-icon svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .item-info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .item-label {
        font-weight: bold;
        color: var(--text);
    }

    .item-description {
        font-size: 0.8rem;
        color: var(--muted);
    }
`;
