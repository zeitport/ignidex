import {css} from 'lit';

export const groupSectionStyle = css`
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem 4rem;
    }

    .section-title {
        margin: 1.5rem 0 1rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: var(--muted);
        font-weight: 600;
        user-select: none;
    }

    .group-title {
        margin: 0.5rem 0 0.5rem 0;
        padding: 0;
        line-height: 1.25rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: var(--accent);
        font-weight: 300;
        user-select: none;
    }

    .bookmark-group-items {
    }

    .bookmark-item {
        position: relative;
        padding: 0.25rem 0;
        margin: 0;
        cursor: pointer;
    }

    .bookmark-item-content {
        position: relative;
        display: grid;
        grid-template-columns: 1.5rem max-content;
        align-items: center;
        grid-column-gap: 0.5rem;
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: var(--text);
    }

    .bookmark-item-background {
        position: absolute;
        inset: 0;
        transform: scale(0);
        transform-origin: left center;
        transition: all ease 500ms;
        border-radius: 0.5rem;
        opacity: 0;
    }

    .bookmark-item:hover {
        --icon-color: var(--icon-color-hover);

        .bookmark-item-background {
            background-color: var(--app-hover-bg);
            transform: scale(1.05) translateX(-0.5rem);
            transition: all ease 100ms;
            opacity: 1;
        }
    }

    .bookmark-label {
        font-size: 1rem;
        color: var(--text);
    }
`;
