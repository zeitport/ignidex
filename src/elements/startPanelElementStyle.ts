import {css} from 'lit';

export const startPanelElementStyle = css`
    :host {
        position: absolute;
        inset: 0;
    }

    .wrap {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem;
        position: relative;
    }

    @media (max-width: 1024px) {
        .wrap {
            padding: 2rem;
        }
    }

    .toprow {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 22px;
    }

    .toprow h1 {
        user-select: none;
    }
`;
