import {t} from '#i18n';
import {html, LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import './settingsSection.ts';
import './settingsHeader.ts';
import packageJson from '../../../package.json';

@customElement('cc-about-settings-panel')
export class AboutSettingsPanel extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        a {
            color: var(--accent);
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .value {
            font-size: 0.9rem;
        }

        p {
            margin-block-start: 0;
        }

        strong {
            color: var(--accent);
        }
    `;

    render() {
        return html`
            <cc-settings-header>${t.settingsPanel.aboutHeader}</cc-settings-header>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.aboutVersionLabel}</span>
                <span class="value">${packageJson.version}</span>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.aboutAuthorLabel}</span>
                <p>
                    I built <strong>Ignidex</strong> for myself because I wanted a calm <strong>start page</strong>, not a dashboard.
                    It's a local-first tool for organizing links and small pieces of information, designed to stay out of the way once it's set up.
                </p>
                <span class="value">Chris</span>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.aboutHomepageLabel}</span>
                <a class="value" href="${packageJson.homepage}" target="_blank" rel="noopener noreferrer">${packageJson.homepage}</a>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.aboutIssuesLabel}</span>
                <a class="value" href="${packageJson.bugs.url}" target="_blank" rel="noopener noreferrer">${packageJson.bugs.url}</a>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.aboutLicenseLabel}</span>
                <span class="value">${packageJson.license}</span>
            </cc-settings-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-about-settings-panel': AboutSettingsPanel;
    }
}
