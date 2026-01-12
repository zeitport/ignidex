import {css} from 'lit';

export const startPanelElementStyle = css`
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
