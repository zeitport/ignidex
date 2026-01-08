import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {IconResolver} from '../core/iconResolver.ts';
import {inject} from '#inject';
import {Card} from '../model/internal/card.ts';
import {cardIconElementStyle} from './cardIconElementStyle.ts';

@customElement('cc-card-icon')
export class CardIconElement extends LitElement {
    static styles = cardIconElementStyle;

    @property({type: Card})
    card!: Card;

    @property({type: String})
    size = '1rem';

    @property({type: String})
    color = 'currentColor';

    private iconResolver: IconResolver = inject(IconResolver);


    @state()
    iconDataUri: string | null = null;

    async connectedCallback() {
        super.connectedCallback();
        const result = await this.iconResolver.resolve(this.card);

        if (!result.dataUri) {
            console.warn('Icon resolving failed.', {result})
        }

        this.iconDataUri = result.dataUri;
        console.log(`Connected: ${this.iconDataUri}`);
    }

    render() {
        if (!this.iconDataUri) {
            return html``
        }

        const size = this.size ?? '1rem';

        return html`
            <div class="mono-icon" aria-hidden="true" style="--icon-size:${size}; --mask-url: url('${this.iconDataUri}')"></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-card-icon': CardIconElement
    }
}

