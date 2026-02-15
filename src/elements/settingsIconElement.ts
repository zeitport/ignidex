import {mdiCog} from '@mdi/js';
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {hoverHint} from '#app/hoverHintDirective.ts';
import {i18n} from '#i18n';
import {activeOverlay, settingsIconStyle} from '#state';
import {OverlayType} from './overlays/overlayType.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';

@customElement('cc-settings-icon')
export class SettingsIconElement extends LitElement {
    private settingsIconStyle = settingsIconStyle.watch(this);

    static styles = css`
        :host {
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            z-index: 100;
        }

        .settings-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0.2;
            transition: opacity 0.15s ease-in-out, transform 1s ease-in-out;
        }

        .settings-icon:hover {
            opacity: 1;
            transform: rotate(90deg);
        }

        .settings-icon svg {
            fill: var(--text);
        }

        .settings-icon.small svg {
            width: 1.25rem;
            height: 1.25rem;
        }

        .settings-icon.large svg {
            width: 2rem;
            height: 2rem;
        }
    `;

    render() {
        const style = this.settingsIconStyle.value;

        if (style === SettingsIconStyle.Off) {
            return html``;
        }

        const sizeClass = style === SettingsIconStyle.Small ? 'small' : 'large';

        return html`
            <div
                class="settings-icon ${sizeClass}"
                ${hoverHint(i18n.token.hints.openSettings)}
                @click=${this.handleClick}
            >
                <svg viewBox="0 0 24 24">
                    <path d="${mdiCog}"></path>
                </svg>
            </div>
        `;
    }

    private handleClick = () => {
        activeOverlay.value = OverlayType.editSettings;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-settings-icon': SettingsIconElement
    }
}
