import {css} from 'lit';

export const overlayElementStyle = css`
    :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: var(--overlay-bg, rgba(0, 0, 0, 0.3));
        backdrop-filter: var(--overlay-backdrop-filter, blur(4.5px) saturate(1.4) brightness(0.9));
        align-items: center;
        justify-content: center;
        padding: 1rem;
        opacity: 0;
    }

    :host([isOpen]) {
        display: flex;
        opacity: 1;
        animation: fade-in 0.2s ease-out;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            backdrop-filter: blur(0) saturate(1) brightness(1);
        }
        to {
            opacity: 1;
            backdrop-filter: var(--overlay-backdrop-filter, blur(4.5px) saturate(1.4) brightness(0.9));
        }
    }

    .overlay-backdrop {
        display: contents;
    }

    .overlay-container {
        pointer-events: auto;
        width: 100%;
        max-width: var(--overlay-max-width, 800px);
        max-height: var(--overlay-max-height, 80vh);
        background: var(--panel, #2b3138);
        border-radius: var(--overlay-border-radius, 8px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: slide-up 0.2s ease-out;
        outline: solid 0.25rem rgba(255, 255, 255, 0.1);
    }

    @keyframes slide-up {
        from {
            transform: translateY(10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .overlay-body {
        padding: var(--overlay-body-padding, 1rem);
        overflow-y: auto;
        flex: 1;
    }

    .overlay-header {
        padding: var(--overlay-header-padding, 1rem);
        background: var(--overlay-header-bg);
    }

    .overlay-header h2,
    .overlay-header ::slotted(h2) {
        margin: 0;
        font-size: var(--overlay-header-font-size, 1rem);
        font-weight: 500;
    }

    .overlay-footer {
        padding: var(--overlay-footer-padding, 1rem);
        background: var(--overlay-footer-bg);
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .overlay-footer[hidden],
    .overlay-header[hidden] {
        display: none;
    }
`;
