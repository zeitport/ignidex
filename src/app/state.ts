import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {ObservableProperty} from '#utils/observableProperty.ts';
import {HoverHint} from '#core/hoverHint.ts';
import type {Card} from '../models/internal/card.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {StartPanel} from '../models/internal/startPanel.ts';
import {CardSection} from '../models/internal/cardSection.ts';
import {CardGroup} from '../models/internal/cardGroup.ts';
import {StartPanelEntry} from '../models/idb/startPanelEntry.ts';
import {ActionInterface} from '../actions/actionInterface.ts';
import type {ContextMenuItem} from '../elements/contextMenuItem.ts';

export interface ActiveContextMenu {
    items: ContextMenuItem[];
    x: number;
    y: number;
}

export const activeStartPanel = new ObservableProperty<StartPanel | null>(null);
export const activeRemoteUrl = new ObservableProperty<string | null>(null);
export const activeOverlay = new ObservableProperty<OverlayType | null>(null);
export const activeHoverHint = new ObservableProperty<HoverHint | null>(null);
export const activeAction = new ObservableProperty<ActionInterface | null>(null);
export const activeContextMenu = new ObservableProperty<ActiveContextMenu | null>(null);

export const selectedCard = new ObservableProperty<Card | null>(null);
export const selectedSection = new ObservableProperty<CardSection | null>(null);
export const selectedGroup = new ObservableProperty<CardGroup | null>(null);
export const selectedPanelEntry = new ObservableProperty<StartPanelEntry | null>(null);

export const pastedUrl = new ObservableProperty<string | null>(null);
export const messageOverlayContent = new ObservableProperty<string | null>(null);
export const isDraggingFile = new ObservableProperty<boolean>(false);
export const panelOrderVersion = new ObservableProperty<number>(0);
export const hoverHintMode = new ObservableProperty<HoverHintModeType>(HoverHintMode.Dark);

export interface IconPreviewState {
    dataUri: string;
    source: string;
}
export const activeIconPreview = new ObservableProperty<IconPreviewState | null>(null);
