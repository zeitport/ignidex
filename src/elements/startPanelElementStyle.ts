import {css} from 'lit';

export const startPanelElementStyle = css`
    :host {
        position: absolute;
        inset: 0;
        overflow-inline: hidden;
        scrollbar-gutter: stable;
    }

    .wrap {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 4rem;
        position: relative;
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
