import {css} from 'lit';

export const highlightSectionStyles = css`
    :host {
    }

    .section-title {
        margin: 1.5rem 0 1rem;
        font-size: 0.8rem;
        text-transform: var(--text-transform);
        color: var(--muted);
        font-weight: 600;
        user-select: none;
    }

    .group-title {
        margin: 0.5rem 0 0.5rem 0;
        padding: 0;
        line-height: 1.25rem;
        font-size: 0.8rem;
        text-transform: var(--text-transform);
        color: var(--accent);
        font-weight: 300;
        user-select: none;
    }

    .bookmarks {
        display: grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        gap: 18px 56px;
        padding-top: 6px;
        margin-bottom: 30px;
    }

    .bookmark {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        padding: 0;
    }

    .bookmark-background {
        position: absolute;
        inset: 0% 100% 0% 0%;
        transition: all ease 700ms;
        border-radius: 0.5rem;
        opacity: 0;
    }

    .bookmark:hover {
        --icon-color: var(--icon-color-hover);

        .bookmark-background {
            background-color: var(--app-hover-bg);
            inset: -0.5rem;
            transition: all ease 100ms;
            opacity: 1;
        }
    }

    cc-card-icon,
    .meta {
        position: relative;
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
        text-transform: var(--text-transform);
        letter-spacing: 0.05rem;
        text-decoration: none;
    }
`;
