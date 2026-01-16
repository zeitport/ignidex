import {setCornerIconType} from '#app/cornerAction/setCornerIconType.ts';
import {mdiCancel, mdiCog, mdiExport, mdiGithub, mdiSwapHorizontal} from '@mdi/js';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {activeOverlay, cornerActions, selectedCornerPosition} from '#state';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';
import {UserStateStore} from '#core/idb/userStateStore.ts';
import {inject} from '#inject';
import type {ListItem} from '#elements';
import '../overlayElement.ts';
import '../dialogButton.ts';
import '../listElement.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';

interface CornerActionItem {
    id: CornerActionType;
    label: string;
    icon: string | null;
}

const cornerActionItems: CornerActionItem[] = [
    {id: CornerActionType.Off, label: 'Off (no icon)', icon: mdiCancel},
    {id: CornerActionType.SwitchPanel, label: 'Switch Panel', icon: mdiSwapHorizontal},
    {id: CornerActionType.Home, label: 'Home (GitHub page)', icon: mdiGithub},
    {id: CornerActionType.Settings, label: 'Settings', icon: mdiCog},
    {id: CornerActionType.Export, label: 'Export (JSON)', icon: mdiExport},
];

const positionLabels: Record<string, string> = {
    [CornerPosition.TopLeft]: 'Top Left',
    [CornerPosition.TopRight]: 'Top Right',
    [CornerPosition.BottomLeft]: 'Bottom Left',
    [CornerPosition.BottomRight]: 'Bottom Right',
};

@customElement('cc-select-corner-action-overlay')
export class SelectCornerActionOverlay extends LitElement {
    static styles = switchPanelOverlayStyle;

    private userStateStore = inject(UserStateStore);

    @property({type: Boolean})
    isOpen = false;

    constructor() {
        super();
        cornerActions.watch(this);
        selectedCornerPosition.watch(this);
    }

    render() {
        const position = selectedCornerPosition.value;
        const positionLabel = position ? positionLabels[position] : '';

        const items: ListItem[] = cornerActionItems.map(option => ({
            id: option.id,
            label: option.label,
            icon: option.icon ?? undefined
        }));

        return html`
            <cc-overlay ?isOpen=${this.isOpen} @close=${this.handleClose}>
                <div slot="header">
                    <h2>Select Corner Action</h2>
                    <div class="info-text">Position: ${positionLabel}</div>
                </div>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail.id as CornerActionType)}></cc-list>

                <cc-dialog-button slot="footer" @click=${this.handleClose}>Cancel</cc-dialog-button>
            </cc-overlay>
        `;
    }

    private handleSelect = async (iconType: CornerActionType) => {
        const position = selectedCornerPosition.value;
        if (!position) return;

        const actions = cornerActions.value;
        const newActions = setCornerIconType(actions, position, iconType);

        cornerActions.value = newActions;

        const state = await this.userStateStore.getOrCreate();
        state.cornerActions = newActions;
        await this.userStateStore.set(state);

        this.handleClose();
    }

    private handleClose = () => {
        activeOverlay.value = null;
        selectedCornerPosition.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-corner-action-overlay': SelectCornerActionOverlay;
    }
}
