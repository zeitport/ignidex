import {css} from 'lit';

export const editPanelOverlayStyle = css`
    .form-layout {
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-column-gap: 1.5rem;
        width: 100%;
    }

    .icon-column {
        grid-column: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .details-column {
        grid-column: 2;
        min-width: 0;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
        color: var(--text, #e7e9ec);
        font-weight: bold;
    }

    .field-description {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--muted, #9aa3ad);
        font-size: 0.85rem;
    }

    input {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        background: var(--input-bg);
        border: 2px solid var(--input-border-color);
        border-radius: 4px;
        color: var(--text, #e7e9ec);
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: var(--accent);
    }

    input.error {
        border-color: #ff5252;
    }

    .error-message {
        color: #ff5252;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
`;
