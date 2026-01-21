import {html, LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import './settingsSection.ts';
import './settingsHeader.ts';
import {t} from '#i18n';

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
            <cc-settings-header>${t.settingsPanel.coffeeHeader}</cc-settings-header>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.coffeeSupportLabel}</span>
                <span slot="description">${t.settingsPanel.coffeeSupportDescription}</span>
            </cc-settings-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-coffee-settings-panel': CoffeeSettingsPanel;
    }
}
