import {html, LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import './settingsSection.ts';
import './settingsHeader.ts';

@customElement('cc-coffee-settings-panel')
export class CoffeeSettingsPanel extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
    `;

    render() {
        return html`
            <cc-settings-header>Coffee</cc-settings-header>

            <cc-settings-section>
                <span slot="label">Support the developer</span>
                <span slot="description">Coming soon...</span>
            </cc-settings-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-coffee-settings-panel': CoffeeSettingsPanel;
    }
}
