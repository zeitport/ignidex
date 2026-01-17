import {css} from 'lit';

export const gettingStartedOverlayStyle = css`
    .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-block: 2rem 1rem;
        user-select: none;

        p {
            margin: 0.5rem;
            padding: 0;
            text-align: center;
        }

        .statement {
            color: var(--accent);
            margin-block-start: 2rem;
        }
    }

    h1 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0 0 1rem 0;
    }

    .feature-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 2rem;
        margin-block: 0 2rem;
        user-select: none;
    }

    .feature-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-block: 2rem;

        h3 {
            font-size: 1rem;
            font-weight: normal;
            margin: 0.5rem 0 0 0;
            padding: 0;
        }

        p {
            font-size: 1rem;
            color: var(--muted);
            margin: 0;
            padding: 0;
        }

        svg {
            grid-row: 1 / span 2;
            fill: var(--accent);
            width: 2rem;
            height: 2rem;
        }
    }

    .app-icon {
        margin-inline-end: 1rem;
        width: 4rem;
        height: 4rem;
    }
`;
