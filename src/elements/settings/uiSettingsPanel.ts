import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {colorPalette} from './colorPalette.ts';
import './settingsSection.ts';
import './settingsHeader.ts';
import '../radioButtonElement.ts';
import {UserStateStore} from '#core/idb/userStateStore.ts';
import {inject} from '#inject';
import {hoverHintMode} from '../../app/state.ts';

@customElement('cc-ui-settings-panel')
export class UISettingsPanel extends LitElement {
    private userStateStore = inject(UserStateStore);

    @state()
    private selectedColor: string | null = null;

    @state()
    private selectedFontSize: number = 16;

    @state()
    private useUppercase: boolean = true;

    @state()
    private selectedHoverHintMode: HoverHintModeType = HoverHintMode.Highlighted;

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 1.5rem);
            gap: 0.75rem;
        }

        .color-square {
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
            border-radius: 4px;
            border: 2px solid transparent;
            transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
        }

        .color-square:hover {
            transform: scale(1.1);
        }

        .color-square.selected {
            border-color: var(--text);
            transform: scale(1.1);
        }

        .font-size-grid {
            display: flex;
            gap: 0.75rem;
        }

        .font-size-square {
            position: relative;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.9rem;
            z-index: 1;
        }

        .font-size-square::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--input-bg);
            border: 2px solid var(--input-border-color);
            border-radius: 4px;
            transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
            z-index: -1;
        }

        .font-size-square:hover::before {
            transform: scale(1.1);
        }

        .font-size-square.selected::before {
            border-color: var(--text);
            transform: scale(1.1);
        }
    `;

    async connectedCallback() {
        super.connectedCallback();
        const state = await this.userStateStore.getOrCreate();
        this.selectedColor = state.accentColor;
        this.selectedFontSize = state.baseFontSize;
        this.useUppercase = state.useUppercase;
        this.selectedHoverHintMode = state.hoverHintMode;
    }

    render() {
        const fontSizeOptions = [
            {label: 'S', size: 14, tooltip: 'small'},
            {label: 'M', size: 16, tooltip: 'medium (default)'},
            {label: 'L', size: 20, tooltip: 'large'},
        ];

        return html`
            <cc-settings-header>UI Settings</cc-settings-header>

            <cc-settings-section>
                <span slot="label">Base Font Size</span>
                <span slot="description">Adjust the default text size for better readability.</span>
                <div class="font-size-grid">
                    ${fontSizeOptions.map(option => html`
                        <div
                            class="font-size-square ${this.selectedFontSize === option.size ? 'selected' : ''}"
                            @click=${() => this.selectFontSize(option.size)}
                            title="${option.tooltip}"
                        >
                            ${option.label}
                        </div>
                    `)}
                </div>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">Accent Color</span>
                <span slot="description">Choose a color to personalize buttons, highlights, and interactive elements.</span>
                <div class="color-grid">
                    ${colorPalette.map(color => html`
                        <div
                            class="color-square ${this.selectedColor === color ? 'selected' : ''}"
                            style="background-color: ${color}"
                            @click=${() => this.selectColor(color)}
                            title="${color}"
                        ></div>
                    `)}
                </div>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">Text Transform</span>
                <span slot="description">Enable uppercase text for a modern look.</span>
                <div>
                    <cc-switch .checked=${this.useUppercase} @change=${(event: CustomEvent) => this.toggleTextTransform(event.detail.checked)}></cc-switch>
                </div>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">Hover Hints</span>
                <span slot="description">Select how to display hover hints for elements.</span>
                <cc-radio-button
                    .options=${[
                        {label: 'Off', value: HoverHintMode.Off},
                        {label: 'Muted', value: HoverHintMode.Muted},
                        {label: 'Highlighted', value: HoverHintMode.Highlighted}
                    ]}
                    .value=${this.selectedHoverHintMode}
                    @change=${(event: CustomEvent) => this.selectHoverHintMode(event.detail.value)}
                ></cc-radio-button>
            </cc-settings-section>
        `;
    }

    private async selectColor(color: string) {
        this.selectedColor = color;
        const state = await this.userStateStore.getOrCreate();
        state.accentColor = color;
        await this.userStateStore.set(state);
        document.documentElement.style.setProperty('--accent', color);
    }

    private async selectFontSize(size: number) {
        this.selectedFontSize = size;
        const state = await this.userStateStore.getOrCreate();
        state.baseFontSize = size;
        await this.userStateStore.set(state);
        document.documentElement.style.setProperty('--base-font-size', `${size}px`);
    }

    private async toggleTextTransform(checked: boolean) {
        this.useUppercase = checked;
        const state = await this.userStateStore.getOrCreate();
        state.useUppercase = checked;
        await this.userStateStore.set(state);
        document.documentElement.style.setProperty('--text-transform', checked ? 'uppercase' : 'none');
    }

    private async selectHoverHintMode(mode: HoverHintModeType) {
        this.selectedHoverHintMode = mode;
        const state = await this.userStateStore.getOrCreate();
        state.hoverHintMode = mode;
        await this.userStateStore.set(state);
        hoverHintMode.value = mode;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-ui-settings-panel': UISettingsPanel;
    }
}
