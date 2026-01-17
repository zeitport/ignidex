import {getCornerActionFromPosition} from '#app/cornerAction/getCornerActionFromPosition.ts';
import {mdiCog, mdiExport, mdiGithub, mdiSwapHorizontal} from '@mdi/js';
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {i18n} from '#i18n';
import {cornerActions} from '#state';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';
import type {ActionInterface} from '../../actions/actionInterface.ts';
import {OpenSettingsAction} from '../../actions/openSettingsAction.ts';
import {OpenAppHomeAction} from '../../actions/openAppHomeAction.ts';
import {SwitchPanelAction} from '../../actions/switchPanelAction.ts';
import {ExportToJsonAction} from '../../actions/exportToJsonAction.ts';
import {cornerActionElementStyle} from './cornerActionElementStyle.ts';

const iconPathMap: Record<CornerActionType, string | null> = {
    [CornerActionType.Off]: null,
    [CornerActionType.Settings]: mdiCog,
    [CornerActionType.Home]: mdiGithub,
    [CornerActionType.SwitchPanel]: mdiSwapHorizontal,
    [CornerActionType.Export]: mdiExport,
};

@customElement('cc-corner-action')
export class CornerActionElement extends LitElement {
    @property({type: String})
    position: CornerPosition = CornerPosition.BottomLeft;

    @property({type: String})
    iconPath: string | null = null;

    @property({type: String})
    iconAssetId: string | null = null;

    constructor() {
        super();
        cornerActions.watch(this);
    }

    static styles = cornerActionElementStyle;

    render() {
        console.log('Rendering corner icon with actions:', cornerActions);
        const actions = cornerActions.value;

        if (actions.size === SettingsIconStyle.Off) {
            return html``;
        }

        const iconType = getCornerActionFromPosition(actions, this.position);

        if (iconType === CornerActionType.Off) {
            return html``;
        }

        const iconPath = this.iconPath ?? iconPathMap[iconType];
        if (!iconPath) {
            return html``;
        }

        const hint = i18n.token.cornerActionType[iconType] ?? '';

        return html`
            <button
                type="button"
                class="corner-button"
                data-size="${actions.size}"
                id="corner-button-${this.position}"
                ${hoverHint(hint)}
                @click=${() => this.handleClick(iconType)}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="${iconPath}"></path>
                </svg>
            </button>
        `;
    }

    private handleClick(cornerAction: CornerActionType) {
        const actionMap: Map<CornerActionType, ActionInterface> = new Map([
            [CornerActionType.Settings, new OpenSettingsAction()],
            [CornerActionType.Home, new OpenAppHomeAction()],
            [CornerActionType.SwitchPanel, new SwitchPanelAction()],
            [CornerActionType.Export, new ExportToJsonAction()],
        ]);

        actionMap.get(cornerAction)?.run();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-corner-action': CornerActionElement
    }
}
