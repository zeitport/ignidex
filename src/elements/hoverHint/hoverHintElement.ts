import {activeHoverHint, hoverHintMode} from '#state';
import type {HoverHint} from '#app/hoverHint.ts';
import {HoverHintMode} from '#models/idb/hoverHintMode.ts';
import {mdiLockOutline, mdiMouseLeftClickOutline, mdiMouseRightClickOutline, mdiMouseScrollWheel} from '@mdi/js';
import {nothing, type TemplateResult} from 'lit';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {hoverHintElementStyle} from './hoverHintElementStyle.ts';
import {parseHintTemplate} from './parseHintTemplate.ts';
import type {TemplateToken} from './templateToken.ts';

@customElement('cc-hover-hint')
export class HoverHintElement extends LitElement {
    static styles = hoverHintElementStyle;

    private activeHoverHint = activeHoverHint.watch(this);
    private hoverHintMode = hoverHintMode.watch(this);

    render() {
        const hint = this.activeHoverHint.value;
        const mode = this.hoverHintMode.value;

        if (!hint || hint.text === null || mode === HoverHintMode.Off) {
            return nothing;
        }

        return html`<div class="hint ${mode === HoverHintMode.Dark ? 'muted' : ''}">${this.renderHintText(hint)}</div>`;
    }

    private renderHintText(hint: HoverHint) {
        if (!hint.text) return nothing;

        const tokens = parseHintTemplate(hint.text);
        return tokens.map((token) => this.renderToken(token));
    }

    private renderToken(token: TemplateToken): TemplateResult | string {
        switch (token.type) {
            case 'separator':
                return html`<span class="separator"></span>`;
            case 'text':
                return token.value;
            case 'plus':
                return html`<strong class="plus">+</strong>`;
            case 'key':
                return html`<span class="key">${token.value}</span>`;
            case 'icon':
                return this.renderIcon(token.value as 'LMB' | 'RMB' | 'MMB');
        }
    }

    private renderIcon(button: 'LMB' | 'RMB' | 'MMB' | 'LOCK'): TemplateResult {
        const iconPath = {
            LMB: mdiMouseLeftClickOutline,
            RMB: mdiMouseRightClickOutline,
            MMB: mdiMouseScrollWheel,
            LOCK: mdiLockOutline,
        }[button];

        return html`<svg class="mouse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${iconPath}" /></svg>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-hover-hint': HoverHintElement
    }
}
