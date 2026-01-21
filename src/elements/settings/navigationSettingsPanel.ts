import {BookmarkOnClickAction, type BookmarkOnClickActionType} from '#models/idb/bookmarkOnClickAction.ts';
import {html, LitElement, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import type {CustomEventWithValue} from '../customEvents/customEventWithValue.ts';
import {UserStateStore} from '#core/idb/userStateStore.ts';
import {inject} from '#inject';
import {bookmarkOnClickAction} from '#state';

@customElement('cc-navigation-settings-panel')
export class NavigationSettingsPanel extends LitElement {
    private userStateStore = inject(UserStateStore);

    @state()
    private selectedBookmarkOnClickAction: BookmarkOnClickActionType = BookmarkOnClickAction.open;

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        void this.loadUserState();
    }

    async loadUserState() {
        const state = await this.userStateStore.getOrCreate();
        this.selectedBookmarkOnClickAction = state.bookmarkOnClickAction;
    }

    render() {
        return html`
            <cc-settings-header>Navigation Settings</cc-settings-header>

            <cc-settings-section>
                <span slot="label">Bookmark on Click</span>
                <span slot="description">Choose what happens when you click on a bookmark.</span>
                <cc-radio-button-group
                    aria-label="Bookmark on Click Action"
                    .options=${[
                        {label: 'Open', value: BookmarkOnClickAction.open},
                        {label: 'Open in new tab', value: BookmarkOnClickAction.openInNewTab}
                    ]}
                    .value=${this.selectedBookmarkOnClickAction}
                    @change=${(event: CustomEventWithValue<BookmarkOnClickActionType>) => this.selectBookmarkOnClickAction(event.detail.value)}
                ></cc-radio-button-group>
            </cc-settings-section>
        `;
    }

    private async selectBookmarkOnClickAction(action: BookmarkOnClickActionType) {
        this.selectedBookmarkOnClickAction = action;
        const state = await this.userStateStore.getOrCreate();
        state.bookmarkOnClickAction = action;
        await this.userStateStore.set(state);
        bookmarkOnClickAction.value = action;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-navigation-settings-panel': NavigationSettingsPanel;
    }
}
