import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('cc-drop-file-overlay')
export class DropFileOverlay extends LitElement {
    static styles = css`
        :host {
            pointer-events: none;
        }

        cc-overlay {
            pointer-events: none;
        }

        .drop-zone {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            border: 2px dashed var(--accent);
            border-radius: 1rem;
            background: rgba(96, 165, 250, 0.1);
            color: var(--text);
        }

        .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.9;
        }

        .title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            font-size: 1rem;
            color: var(--muted);
        }
    `;

    render() {
        return html`
            <cc-overlay .isCancelEnabled=${false}>
                <div class="drop-zone">
                    <div class="icon">+</div>
                    <div class="title">Drop JSON file to import</div>
                    <div class="subtitle">Release to import your start panel</div>
                </div>
            </cc-overlay>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-drop-file-overlay': DropFileOverlay;
    }
}
