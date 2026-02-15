import {LitElement, html, type PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {IconResolver} from '#app/iconResolver.ts';
import {inject} from '#inject';
import {Card} from '../models/internal/card.ts';
import {IconStyle} from '#models/internal/iconStyle.ts';
import {cardIconElementStyle} from './cardIconElementStyle.ts';

@customElement('cc-card-icon')
export class CardIconElement extends LitElement {
    static styles = cardIconElementStyle;

    @property({type: Card})
    card!: Card;

    @property({type: String})
    color = 'currentColor';

    private iconResolver: IconResolver = inject(IconResolver);

    @state()
    iconDataUri: string | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.resolveIcon();
    }

    protected willUpdate(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('card')) {
            this.resolveIcon();
        }
    }

    private async resolveIcon() {
        const result = await this.iconResolver.resolve(this.card);

        if (!result.dataUri) {
            console.warn('Icon resolving failed.', {result})
        }

        this.iconDataUri = result.dataUri;
    }

    render() {
        if (!this.iconDataUri) {
            return html``
        }

        const style = this.card?.iconStyle ?? IconStyle.mask;

        if (style === IconStyle.none) {
            return html`
                <img class="original-icon" src="${this.iconDataUri}" aria-hidden="true" alt="">
            `;
        }

        const cssClass = style === IconStyle.maskAccent ? 'mono-icon accent' : 'mono-icon';

        return html`
            <div class="${cssClass}" aria-hidden="true" style="--mask-url: url('${this.iconDataUri}')"></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-card-icon': CardIconElement
    }
}

