import {css} from 'lit';

export const switchElementStyle = css`
    :host {
        display: inline-block;
        cursor: pointer;
        user-select: none;
    }

    :host([disabled]) {
        cursor: not-allowed;
        opacity: var(--switch-disabled-opacity);
        pointer-events: none;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        cursor: inherit;
    }

    .switch {
        position: relative;
        flex-shrink: 0;
        width: var(--switch-width);
        height: var(--switch-height);
        background-color: var(--switch-bg);
        border-radius: var(--switch-height);
        transition: background-color 0.2s ease;
    }

    :host([checked]) .switch {
        background-color: var(--switch-checked-bg);
    }

    .slider {
        position: absolute;
        top: calc((var(--switch-height) - var(--switch-slider-size)) / 2);
        left: calc((var(--switch-height) - var(--switch-slider-size)) / 2);
        width: var(--switch-slider-size);
        height: var(--switch-slider-size);
        background-color: var(--switch-slider-color);
        border-radius: 50%;
        transition: transform 0.2s ease;
    }

    :host([checked]) .slider {
        transform: translateX(calc(var(--switch-width) - var(--switch-slider-size) - (var(--switch-height) - var(--switch-slider-size))));
    }
`;
