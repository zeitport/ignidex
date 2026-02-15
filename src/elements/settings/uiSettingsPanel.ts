import {getCornerActionFromPosition} from '../../cornerAction/getCornerActionFromPosition.ts';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';
import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';
import {Icon} from '#models/internal/icon.ts';
import {html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {cornerActionIconSvgMap} from '../cornerAction/cornerActionIconSvgMap.ts';
import type {CheckedCustomEvent} from '../customEvents/checkedCustomEvent.ts';
import type {CustomEventWithValue} from '../customEvents/customEventWithValue.ts';
import {OverlayType} from '../overlays/overlayType.ts';
import type {RadioOption} from '../radioButton/radioOption.ts';
import {colorPalette} from './colorPalette.ts';
import {UserStateStore} from '../../idb/userStateStore.ts';
import {inject} from '#inject';
import {activeSubOverlay, cornerActions, hoverHintMode, selectedCornerPosition} from '#state';
import {uiSettingsPanelStyle} from './uiSettingsPanelStyle.ts';
import {t} from '#i18n';

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
    private selectedHoverHintMode: HoverHintModeType = HoverHintMode.Dark;

    constructor() {
        super();
        cornerActions.watch(this);
    }

    static styles = uiSettingsPanelStyle;

    connectedCallback(): void {
        super.connectedCallback();
        void this.loadUserState();
    }

    async loadUserState() {
        const state = await this.userStateStore.getOrCreate();
        this.selectedColor = state.accentColor;
        this.selectedFontSize = state.baseFontSize;
        this.useUppercase = state.useUppercase;
        this.selectedHoverHintMode = state.hoverHintMode;
        cornerActions.value = state.cornerActions;
    }

    render() {
        const fontSizeOptions = [
            {label: 'S', size: 14, tooltip: t.settingsPanel.uiFontSizeSmall},
            {label: 'M', size: 16, tooltip: t.settingsPanel.uiFontSizeMedium},
            {label: 'L', size: 20, tooltip: t.settingsPanel.uiFontSizeLarge},
        ];

        return html`
            <cc-settings-header>${t.settingsPanel.uiHeader}</cc-settings-header>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.uiFontSizeLabel}</span>
                <span slot="description">${t.settingsPanel.uiFontSizeDescription}</span>
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
                <span slot="label">${t.settingsPanel.uiAccentColorLabel}</span>
                <span slot="description">${t.settingsPanel.uiAccentColorDescription}</span>
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
                <span slot="label">${t.settingsPanel.uiTextTransformLabel}</span>
                <span slot="description">${t.settingsPanel.uiTextTransformDescription}</span>
                <div>
                    <cc-switch
                        aria-label="${t.settingsPanel.uiTextTransformLabel}"
                        .checked=${this.useUppercase}
                        @change=${(event: CheckedCustomEvent) => this.toggleTextTransform(event.detail.checked)}>
                    </cc-switch>
                </div>
            </cc-settings-section>

            <cc-settings-section>
                <span slot="label">${t.settingsPanel.uiHoverHintsLabel}</span>
                <span slot="description">${t.settingsPanel.uiHoverHintsDescription}</span>
                <cc-radio-button-group
                    aria-label="${t.settingsPanel.uiHoverHintsLabel}"
                    .options=${[
                        {label: t.settingsPanel.optionOff, value: HoverHintMode.Off},
                        {label: t.settingsPanel.uiHoverHintsOnDark, value: HoverHintMode.Dark},
                        {label: t.settingsPanel.uiHoverHintsOnAccent, value: HoverHintMode.Highlighted}
                    ]}
                    .value=${this.selectedHoverHintMode}
                    @change=${(event: CustomEventWithValue<HoverHintModeType>) => this.selectHoverHintMode(event.detail.value)}
                ></cc-radio-button-group>
            </cc-settings-section>

            ${this.renderCornerActionSizeSection()}
            ${when(cornerActions.value.size !== SettingsIconStyle.Off, () => this.renderCornerActionsSection())}
        `;
    }

    private renderCornerActionSizeSection() {
        return html`
            <cc-settings-section>
                <span slot="label">${t.settingsPanel.uiCornerActionSizeLabel}</span>
                <span slot="description">${t.settingsPanel.uiCornerActionSizeDescription}</span>
                <div class="corner-icons-size">
                    <cc-radio-button-group
                        aria-label="${t.settingsPanel.uiCornerActionSizeLabel}"
                        .options=${[
                            {label: t.settingsPanel.optionOff, value: SettingsIconStyle.Off},
                            {label: t.settingsPanel.optionSmall, value: SettingsIconStyle.Small},
                            {label: t.settingsPanel.optionLarge, value: SettingsIconStyle.Large}
                        ]}
                        .value=${cornerActions.value.size}
                        @change=${(event: CustomEventWithValue<SettingsIconStyle>) => this.selectCornerIconSize(event.detail.value)}
                    ></cc-radio-button-group>
                </div>
            </cc-settings-section>
        `;
    }

    private renderCornerActionsSection() {
        return html`
            <cc-settings-section>
                <span slot="label">${t.settingsPanel.uiCornerActionsLabel}</span>
                <span slot="description">${t.settingsPanel.uiCornerActionsDescription}</span>
                ${this.renderCornerRadioButtons()}
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

    private getCornerIconPath(iconType: CornerActionType): Icon {
        return cornerActionIconSvgMap[iconType] ?? Icon.brokenIcon();
    }

    private renderCornerRadioButtons() {
        const items: RadioOption[] = [
            this.createCornerRadioOption(CornerPosition.TopLeft),
            this.createCornerRadioOption(CornerPosition.TopRight),
            this.createCornerRadioOption(CornerPosition.BottomLeft),
            this.createCornerRadioOption(CornerPosition.BottomRight),
        ];

        return html`
            <cc-radio-button-group
                class="corner-action-slot"
                aria-label="Corner Action"
                .options=${items}
                 @change=${(event: CustomEventWithValue<CornerPosition>) => this.openCornerIconSelector(event.detail.value)}>
            </cc-radio-button-group>
        `;
    }

    private createCornerRadioOption(position: CornerPosition): RadioOption {
        const iconType = getCornerActionFromPosition(cornerActions.value, position);

        const indicator = document.createElement('div');
        indicator.classList.add('corner-icon-indicator');
        indicator.setAttribute('position', position);
        indicator.style.position = 'absolute';
        indicator.style.borderRadius = '100%';
        indicator.style.backgroundColor = 'var(--accent)';
        indicator.style.width = '0.375rem';
        indicator.style.height = '0.375rem';

        const margin = '0.375rem';

        const positionSetters = new Map<CornerPosition, () => void>([
            [CornerPosition.TopLeft, () => { indicator.style.top = indicator.style.left = margin; }],
            [CornerPosition.TopRight, () => { indicator.style.top = indicator.style.right = margin; }],
            [CornerPosition.BottomLeft, () => { indicator.style.bottom = indicator.style.left = margin; }],
            [CornerPosition.BottomRight, () => { indicator.style.bottom = indicator.style.right = margin; }]
        ]);

        positionSetters.get(position)?.();

        return {
            label: indicator,
            value: position,
            icon: this.getCornerIconPath(iconType)
        };
    }

    private openCornerIconSelector(position: CornerPosition) {
        selectedCornerPosition.value = position;
        activeSubOverlay.value = OverlayType.selectCornerAction;
    }

    private async selectCornerIconSize(size: SettingsIconStyle) {
        const newConfig = {...cornerActions.value, size};
        cornerActions.value = newConfig;

        const state = await this.userStateStore.getOrCreate();
        state.cornerActions = newConfig;

        await this.userStateStore.set(state);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-ui-settings-panel': UISettingsPanel;
    }
}
