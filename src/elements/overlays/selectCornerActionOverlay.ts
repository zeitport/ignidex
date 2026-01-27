import {setCornerIconType} from '#app/cornerAction/setCornerIconType.ts';
import {Icon} from '#models/internal/icon.ts';
import {mdiCancel, mdiCog, mdiExport, mdiGithub, mdiSwapHorizontal} from '@mdi/js';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {cornerActions, selectedCornerPosition} from '#state';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';
import {UserStateStore} from '#core/idb/userStateStore.ts';
import {inject} from '#inject';
import type {ListItem} from '#elements';
import {Coffee} from 'lucide';
import {CloseOverlayAction} from '../../actions/closeOverlayAction.ts';
import {switchPanelOverlayStyle} from './switchPanelOverlayStyle.ts';

interface CornerActionItem {
    id: CornerActionType;
    label: string;
    icon: Icon;
}

const cornerActionItems: CornerActionItem[] = [
    {id: CornerActionType.Off, label: 'Off (no icon)', icon: Icon.fromMdiIcon(mdiCancel)},
    {id: CornerActionType.SwitchPanel, label: 'Switch Panel', icon: Icon.fromMdiIcon(mdiSwapHorizontal)},
    {id: CornerActionType.Home, label: 'Home (GitHub page)', icon: Icon.fromMdiIcon(mdiGithub)},
    {id: CornerActionType.Settings, label: 'Settings', icon: Icon.fromMdiIcon(mdiCog)},
    {id: CornerActionType.Export, label: 'Export (JSON)', icon: Icon.fromMdiIcon(mdiExport)},
    {id: CornerActionType.Coffee, label: 'Coffee', icon: Icon.fromLucideIcon(Coffee)},
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
            <cc-overlay @close=${this.handleClose}>
                <div slot="header">
                    <h2>Select Corner Action</h2>
                    <div class="info-text">Position: ${positionLabel}</div>
                </div>

                <cc-list .items=${items} @selected=${(event: CustomEvent<ListItem>) => this.handleSelect(event.detail.id as CornerActionType)}></cc-list>
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
        inject(CloseOverlayAction).run();
    }

    private handleClose = () => {
        selectedCornerPosition.value = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-select-corner-action-overlay': SelectCornerActionOverlay;
    }
}
