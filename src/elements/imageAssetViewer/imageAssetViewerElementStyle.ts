import {css} from 'lit';

export const imageAssetViewerElementStyle = css`
    :host {
        display: block;
        user-select: none;
    }

    .image-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .image-item {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        border-radius: 4px;
        border: 2px solid transparent;
        background-color: var(--input-bg);
        transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-item:hover {
        transform: scale(1.1);
        border-color: var(--input-border-color);
    }

    .image-item.selected {
        border-color: var(--text);
        transform: scale(1.1);
    }

    .image-item-icon {
        width: 1.5rem;
        height: 1.5rem;
        background-color: var(--text);
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
    }

    .empty-message {
        color: var(--text-muted);
        font-size: 0.875rem;
    }
`;
