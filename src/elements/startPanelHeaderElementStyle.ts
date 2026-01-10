import {css} from 'lit';

export const startPanelHeaderElementStyle = css`
    :host {
        display: block;
    }

    .header {
        display: flex;
        align-items: flex-start;
        gap: 16px;
    }

    .icon {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
    }

    .icon .mono-icon {
        width: 48px;
        height: 48px;
        background-color: var(--text, #e7e9ec);
        mask-image: var(--mask-url);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;

        -webkit-mask-image: var(--mask-url);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        -webkit-mask-size: contain;
    }

    .content {
        flex: 1;
        min-width: 0;
    }

    h1 {
        margin: 0;
        cursor: context-menu;
        user-select: none;
    }

    .description {
        margin-top: 4px;
        color: var(--muted, #9aa3ad);
        font-size: 0.95rem;
        line-height: 1.4;
    }
`;
