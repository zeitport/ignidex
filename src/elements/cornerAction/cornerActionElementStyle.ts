import {css} from 'lit';

export const cornerActionElementStyle = css`
        :host {
            position: fixed;
            z-index: 100;
        }

        :host([position="topLeft"]) {
            top: 1rem;
            left: 1rem;
        }

        :host([position="topRight"]) {
            top: 1rem;
            right: 1rem;
        }

        :host([position="bottomLeft"]) {
            bottom: 1rem;
            left: 1rem;
        }

        :host([position="bottomRight"]) {
            bottom: 1rem;
            right: 1rem;
        }

        .corner-button {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0.2;
            transition: opacity 0.15s ease-in-out;
            /* button reset */
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            font: inherit;
            color: inherit;
        }

        .corner-button:hover,
        .corner-button:focus-visible {
            opacity: 1;
        }

        .corner-button:focus {
            outline: none;
        }

        .corner-button:focus-visible::before {
            content: "";
            position: absolute;
            inset: -0.5rem;
            border: 2px solid var(--accent);
            border-radius: 100%;
        }

        .corner-button svg {
            fill: var(--text);
        }

        .corner-button[data-size=small] svg {
            width: 1.25rem;
            height: 1.25rem;
        }

        .corner-button[data-size=large] svg {
            width: 2rem;
            height: 2rem;
        }
    `;
