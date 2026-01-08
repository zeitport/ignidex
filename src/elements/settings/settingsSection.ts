import {html, LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('cc-settings-section')
export class SettingsSection extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .label {
            font-weight: bold;
            font-size: 0.9rem;
        }

        .description {
            font-size: 0.8rem;
            color: var(--muted);
        }

        .error {
            font-size: 0.85rem;
            color: var(--error, #ff4444);
        }

        ::slotted([slot="label"]) {
            margin: 0;
        }

        ::slotted([slot="description"]) {
            margin: 0;
        }

        ::slotted([slot="error"]) {
            margin: 0;
        }

        /* Hide empty slots containers */
        .label:not(:has(slot[name="label"]::slotted(*))),
        .description:not(:has(slot[name="description"]::slotted(*))),
        .error:not(:has(slot[name="error"]::slotted(*))) {
            display: none;
        }
    `;

    render() {
        return html`
            <div class="label">
                <slot name="label"></slot>
            </div>
            <div class="description">
                <slot name="description"></slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div class="error">
                <slot name="error"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-settings-section': SettingsSection;
    }
}
