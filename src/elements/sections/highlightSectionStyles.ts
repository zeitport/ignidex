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
        grid-template-columns:repeat(4, minmax(10rem, 1fr));
        gap: 1rem 4rem;
        padding-top: 0.5rem;
        margin-bottom: 2rem;
    }

    @media (max-width: 1024px) {
        .bookmarks {
            gap: 1rem 2rem;
        }
    }

    @media (max-width: 768px) {
        .bookmarks {
            grid-template-columns: repeat(2, 1fr);
        }
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

    .bookmark-card {
        position: relative;
        width: 100%;
        margin: 0;
    }

    .bookmark:hover {
        --icon-color: var(--icon-color-hover);

        .bookmark-background {
            background-color: var(--accent);
            inset: -0.5rem;
            transition: all ease 100ms;
            opacity: 0.1;
        }
    }

    cc-card-icon {
        position: relative;
    }

    .meta {
        position: relative;
        line-height:1.15;
    }

    .url {
        margin-top: 4px;
        font-size: 11px;
        color: var(--accent);
        text-transform: var(--text-transform);
        text-decoration: none;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .name {
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .bookmark.dragging {
        opacity: 0.4;
    }

    .bookmark.drop-target {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
        border-radius: 0.25rem;
    }
`;
