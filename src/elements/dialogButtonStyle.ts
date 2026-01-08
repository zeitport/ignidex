import {css} from 'lit';

export const dialogButtonStyle = css`
    :host {
        display: inline-block;
    }

    button {
        padding: var(--cc-dialog-button-padding);
        border-radius: var(--cc-dialog-button-border-radius);
        border: none;
        cursor: pointer;
        font-weight: var(--cc-dialog-button-font-weight);
        font-family: inherit;
        font-size: var(--cc-dialog-button-font-size);
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;
        background: var(--cc-dialog-button-bg);
        color: var(--cc-dialog-button-color);
    }

    button:hover {
        background: var(--cc-dialog-button-hover-bg);
    }

    button:active {
        transform: scale(0.97);
    }

    :host([primary]) button {
        background: var(--cc-dialog-button-primary-bg);
        color: var(--cc-dialog-button-primary-color);
    }

    :host([primary]) button:hover {
        background: var(--cc-dialog-button-primary-hover-bg);
    }
`;
