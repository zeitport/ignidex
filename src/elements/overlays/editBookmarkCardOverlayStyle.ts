import {css} from 'lit';

export const editBookmarkCardOverlayStyle = css`
    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
        color: var(--text, #e7e9ec);
        font-weight: bold;
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
