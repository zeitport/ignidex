import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {radioButtonGroupElementStyle} from './radioButtonGroupElementStyle.ts';
import type {RadioOption} from './radioOption.ts';

@customElement('cc-radio-button-group')
export class RadioButtonGroupElement extends LitElement {
    static styles = radioButtonGroupElementStyle;

    @property({type: Array})
    options: RadioOption[] = [];

    @property({type: String, reflect: true})
    value = '';

    private selectOption(optionValue: string) {
        this.value = optionValue;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {value: optionValue},
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="radio-group" role="radiogroup">
                ${this.options.map(option => html`
                    <div
                        class="radio-option ${this.value === option.value ? 'selected' : ''}"
                        role="radio"
                        aria-label="${option.value}"
                        aria-checked="${this.value === option.value}"
                        data-value="${option.value}"
                        tabindex="0"
                        @click=${() => this.selectOption(option.value)}
                        @keydown=${(event: KeyboardEvent) => (event.key === ' ' || event.key === 'Enter') && this.selectOption(option.value)}
                    >
                        ${when(option.iconPath, path => this.renderIcon(path))}
                        ${option.label}
                    </div>
                `)}
            </div>
        `;
    }

    private renderIcon(iconPath: string) {
        return html`<svg class="radio-icon" viewBox="0 0 24 24"><path d="${iconPath}"></path></svg>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-radio-button-group': RadioButtonGroupElement;
    }
}
