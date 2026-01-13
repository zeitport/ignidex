import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {radioButtonElementStyle} from './radioButtonElementStyle.ts';

export interface RadioOption {
    label: string;
    value: string;
}

@customElement('cc-radio-button')
export class RadioButtonElement extends LitElement {
    static styles = radioButtonElementStyle;

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
                        aria-checked="${this.value === option.value}"
                        tabindex="0"
                        @click=${() => this.selectOption(option.value)}
                        @keydown=${(event: KeyboardEvent) => (event.key === ' ' || event.key === 'Enter') && this.selectOption(option.value)}
                    >
                        ${option.label}
                    </div>
                `)}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-radio-button': RadioButtonElement;
    }
}
