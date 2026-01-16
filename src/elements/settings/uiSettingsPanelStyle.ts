import {css} from 'lit';

export const uiSettingsPanelStyle = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        user-select: none;
    }

    .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 1.5rem);
        gap: 0.75rem;
    }

    .color-square {
        width: 1.5rem;
        height: 1.5rem;
        cursor: pointer;
        border-radius: 4px;
        border: 2px solid transparent;
        transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
    }

    .color-square:hover {
        transform: scale(1.1);
    }

    .color-square.selected {
        border-color: var(--text);
        transform: scale(1.1);
    }

    .font-size-grid {
        display: flex;
        gap: 0.75rem;
    }

    .font-size-square {
        position: relative;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.9rem;
        z-index: 1;
    }

    .font-size-square::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--input-bg);
        border: 2px solid var(--input-border-color);
        border-radius: 4px;
        transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
        z-index: -1;
    }

    .font-size-square:hover::before {
        transform: scale(1.1);
    }

    .font-size-square.selected::before {
        border-color: var(--text);
        transform: scale(1.1);
    }

    .corner-icon-slot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--input-bg);
        border: 2px solid var(--input-border-color);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: border-color 0.1s ease-in-out;

        --position-padding: 0.125rem;

        &[data-position]::after {
            content: ' ';
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 100%;
            background-color: var(--input-border-color);
        }

        &[data-position=topLeft]::after {
            top: var(--position-padding);
            left: 0.25rem;
        }

        &[data-position=topRight]::after {
            top: 0.25rem;
            right: 0.25rem;
        }

        &[data-position=bottomLeft]::after {
            bottom: 0.25rem;
            left: 0.25rem;
        }

        &[data-position=bottomRight]::after {
            bottom: 0.25rem;
            right: 0.25rem;
        }
    }

    .corner-icon-slot:hover {
        --input-border-color: var(--text);
        border-color: var(--text);
    }

    .corner-icon-slot svg {
        width: 1.25rem;
        height: 1.25rem;
        fill: var(--text);
        flex-shrink: 0;
    }

    .corner-icon-slot .slot-label {
        font-size: 0.75rem;
        opacity: 0.7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .corner-icons-size {
        margin-block-start: 0.75rem;
    }
`;
