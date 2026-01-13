import {css} from 'lit';

export const switchPanelOverlayStyle = css`
    .info-text {
        padding: 0.25rem;
        font-size: 0.8rem;
        color: var(--muted);
    }

    .info-url {
        word-break: break-all;
        color: var(--accent);
        font-weight: bold;
    }

    h2 {
        margin-block-end: 0.5rem;
    }

    .panel-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .panel-item {
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

    .panel-item:hover {
        background: var(--list-bg-hover);
    }

    .panel-info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .panel-label {
        font-weight: bold;
        color: var(--text);
    }

    .panel-description {
        font-size: 0.8rem;
        color: var(--muted);
    }
`;
