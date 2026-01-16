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

        .corner-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0.2;
            transition: opacity 0.15s ease-in-out;
        }

        .corner-icon:hover {
            opacity: 1;
        }

        .corner-icon svg {
            fill: var(--text);
        }

        .corner-icon[data-size=small] svg {
            width: 1.25rem;
            height: 1.25rem;
        }

        .corner-icon[data-size=large] svg {
            width: 2rem;
            height: 2rem;
        }
    `;
