import {css} from 'lit';

export const startPanelHeaderElementStyle = css`
    :host {
        display: block;
        width: 100%;
        position: relative;
        margin-block: 1rem;
    }

    .header-back {
        position: absolute;
        inset: -1rem;
        background-color: var(--accent);
        border-radius: 0.5rem;
        opacity: 0.05;
    }

    .header-stripe {
        position: absolute;
        inset: -1rem;
        border-radius: 0.5rem;
        border-inline-start: var(--panel-header-stripe);
    }

    .header {
        position: relative;
        display: grid;
        align-items: center;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
    }

    .icon {
        width: 3rem;
        height: 3rem;
    }

    .icon .mono-icon {
        width: 3rem;
        height: 3rem;
        background-color: var(--panel-header-icon-color);
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
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
    }

    h1 {
        margin: 0;
        user-select: none;
    }

    .description {
        margin: 0;
        padding: 0;
        color: var(--muted);
        font-size: 0.8rem;
    }

    .remote-badge {
        padding: 0.25rem 0.5rem;
        background-color: var(--remote-badge-bg);
        color: var(--remote-badge-color);
        font-size: 0.8rem;
        text-transform: var(--text-transform);
        border-radius: 0.25rem;
        user-select: none;
    }
`;
