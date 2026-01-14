import {css} from 'lit';

export const hoverHintElementStyle = css`
    :host {
        position: fixed;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        pointer-events: none;

        [hidden] {
            display: none;
        }
    }

    .hint {
        display: flex;
        align-items: center;
        background-color: var(--accent);
        color: var(--bg);
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.9;
        white-space: nowrap;
    }

    .hint .key {
        display: inline-flex;
        padding: 0.1rem 0.3rem;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 0.2rem;
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 0.8rem;
        vertical-align: middle;
        margin-inline: 0.5rem;
    }

    .separator {
        display: inline-block;
        margin-inline: 0.5rem;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.25);
        width: 1px;
        height: 1rem;
    }

    .hint.muted {
        background-color: var(--panel);
        color: var(--text);
        border: none;

        .key {
            border-color: rgba(128, 128, 128, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
        }

        .separator {
            background-color: rgba(255, 255, 255, 0.25);
        }
    }

    .hint .mouse-icon {
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        vertical-align: middle;
        margin-inline-end: 0.5rem;
    }

    .hint strong.plus {
        margin: 0 0.25rem;
    }
`;
