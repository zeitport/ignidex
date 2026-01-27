import {getCornerActionFromPosition} from '#app/cornerAction/getCornerActionFromPosition.ts';
import {Icon} from '#models/internal/icon.ts';
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {hoverHint} from '#core/hoverHintDirective.ts';
import {i18n} from '#i18n';
import {cornerActions} from '#state';
import {CornerActionType} from '#models/idb/cornerActionType.ts';
import {CornerPosition} from '#models/idb/cornerPosition.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';
import {when} from 'lit/directives/when.js';
import type {ActionInterface} from '../../actions/actionInterface.ts';
import {OpenSettingsAction} from '../../actions/openSettingsAction.ts';
import {OpenSettingsPanelAction} from '../../actions/openSettingsPanelAction.ts';
import {OpenAppHomeAction} from '../../actions/openAppHomeAction.ts';
import {SwitchPanelAction} from '../../actions/switchPanelAction.ts';
import {ExportToJsonAction} from '../../actions/exportToJsonAction.ts';
import {cornerActionElementStyle} from './cornerActionElementStyle.ts';
import {cornerActionIconSvgMap} from './cornerActionIconSvgMap.ts';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('cc-corner-action')
export class CornerActionElement extends LitElement {
    @property({type: String})
    position: CornerPosition = CornerPosition.BottomLeft;

    @property({type: Icon})
    icon: Icon | null = null;

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

        const icon = this.icon ?? cornerActionIconSvgMap[iconType] ?? Icon.brokenIcon();
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
                ${when(icon.svg, svg => unsafeHTML(svg))}
                ${when(icon.dataUri, uri => html`<img src="${uri}" alt="${hint}" />`)}
            </button>
        `;
    }

    private handleClick(cornerAction: CornerActionType) {
        const actionMap: Map<CornerActionType, ActionInterface> = new Map([
            [CornerActionType.Settings, new OpenSettingsAction()],
            [CornerActionType.Home, new OpenAppHomeAction()],
            [CornerActionType.SwitchPanel, new SwitchPanelAction()],
            [CornerActionType.Export, new ExportToJsonAction()],
            [CornerActionType.Coffee, new OpenSettingsPanelAction('coffee')],
        ]);

        actionMap.get(cornerAction)?.run();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-corner-action': CornerActionElement
    }
}
