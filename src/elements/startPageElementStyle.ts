import {css} from 'lit';

export const startPageElementStyle = css`
    :host {
        position: absolute;
        inset: 0;
    }

    .wrap {
        max-width: 1220px;
        margin: 0 auto;
        padding: 44px 56px 64px;
        position: relative;
    }

    .topline {
        height: 1px;
        background: linear-gradient(90deg, transparent 0, var(--line) 12%, var(--line) 88%, transparent 100%);
        margin: 0 0 18px 0;
        opacity: .9;
    }

    .toprow {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 22px;
    }
    .toprow h1 {
        cursor: context-menu;
        user-select: none;
    }
`;
