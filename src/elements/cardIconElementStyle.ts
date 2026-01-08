import {css} from 'lit';

export const cardIconElementStyle = css`
    :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
    }

    .mono-icon {
        width: var(--icon-size, 1.5rem);
        height: var(--icon-size, 1.5rem);
        background-color: var(--icon-color);
        mask-image: var(--mask-url);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;

        -webkit-mask-image: var(--mask-url);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        -webkit-mask-size: contain;

        transition: background-color ease 500ms;
    }
`;
