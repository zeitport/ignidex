import {css} from 'lit';

export const highlightSectionStyles = css`
    :host {
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

    .apps {
        display: grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        gap: 18px 56px;
        padding-top: 6px;
        margin-bottom: 30px;
    }

    .app {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        min-height: 44px;
    }

    .app:hover {
        background-color: var(--app-hover-bg);
        cursor: pointer;
        outline: solid 0.5rem var(--app-hover-bg);

        --icon-color: var(--icon-color-hover);
    }

    .app-icon {
        width: 26px;
        height: 26px;
        display: grid;
        place-items: center;
        color: #cdd4db;
        opacity: .95;
        margin-top: 2px;
        font-size: 18px;
    }

    .meta{
        line-height:1.15;
    }

    .url {
        margin-top: 4px;
        font-size: 11px;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        text-decoration: none;
    }
`;
