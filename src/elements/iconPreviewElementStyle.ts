import {css} from 'lit';

export const iconPreviewElementStyle = css`
    :host {
        display: block;
    }

    .icon-preview {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        background: var(--input-bg);
        border: 2px dashed var(--input-border-color);
        border-radius: 4px;
        cursor: pointer;
        transition: border-color 0.2s;
        margin-block: 0.5rem;
    }

    .icon-preview:hover {
        border-color: var(--accent);
    }

    .icon-preview.has-icon {
        border-style: solid;
    }

    .icon-preview-icon {
        width: 2rem;
        height: 2rem;
        background-color: var(--icon-color);
        mask-image: var(--mask-url);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;
        -webkit-mask-image: var(--mask-url);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        -webkit-mask-size: contain;
    }

    .icon-delete-btn {
        position: absolute;
        bottom: 4px;
        right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        background: transparent;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .icon-delete-btn:hover {
        background: rgba(255, 82, 82, 0.15);
    }

    .icon-delete-btn svg {
        width: 1.125rem;
        height: 1.125rem;
        fill: var(--muted);
        transition: fill 0.2s;
    }

    .icon-delete-btn:hover svg {
        fill: #ff5252;
    }

    input[type="file"] {
        display: none;
    }
`;
