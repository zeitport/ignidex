import {css} from 'lit';

export const hoverHintElementStyle = css`
    :host {
        position: fixed;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        pointer-events: none;
    }

    .hint {
        background-color: var(--accent);
        color: var(--bg);
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.85;
        white-space: nowrap;
    }

    :host([hidden]) {
        display: none;
    }
`;
