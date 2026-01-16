import {css} from 'lit';

export const radioButtonGroupElementStyle = css`
    :host {
        display: inline-block;
    }

    .radio-group {
        display: flex;
        gap: 0.75rem;
    }

    .radio-option {
        position: relative;
        min-width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.125rem 0.5rem;
        cursor: pointer;
        font-size: 0.9rem;
        z-index: 1;
    }

    .radio-option::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--input-bg);
        border: 2px solid var(--input-border-color);
        border-radius: 0.5rem;
        transition: 0.1s ease-in-out, border-color 0.1s ease-in-out;
        z-index: -1;
    }

    .radio-option:hover::before {
        inset: -0.25rem;
    }

    .radio-option:hover .radio-icon{
        fill: var(--icon-color-hover);
    }

    .radio-icon {
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--icon-color);
    }

    .radio-option.selected::before {
        border-color: var(--accent);
        inset: -0.25rem;
        background-color: color-mix(in srgb, var(--accent) 20%, transparent);
    }
`;
