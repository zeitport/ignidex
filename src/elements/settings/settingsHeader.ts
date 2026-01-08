import {html, LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('cc-settings-header')
export class SettingsHeader extends LitElement {
    static styles = css`
        h3 {
            margin: 0.75rem 0;
            font-size: 1.25rem;
            color: var(--text);
        }
    `;

    render() {
        return html`
            <h3><slot></slot></h3>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-settings-header': SettingsHeader;
    }
}
