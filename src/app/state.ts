import type {ActiveContextMenu} from '#app/activeContextMenu.ts';
import type {IconPreviewState} from '#app/iconPreviewState.ts';
import type {ImageAssetSelection} from '#app/imageAssetSelection.ts';
import {HoverHint} from '#core/hoverHint.ts';
import {type CornerActions} from '#models/idb/cornerActions.ts';
import {type CornerPosition} from '#models/idb/cornerPosition.ts';
import {createDefaultCornerActions} from '#models/idb/createDefaultCornerActions.ts';
import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';
import {ObservableProperty} from '#utils/observableProperty.ts';
import {ActionInterface} from '../actions/actionInterface.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {StartPanelEntry} from '../models/idb/startPanelEntry.ts';
import type {Card} from '../models/internal/card.ts';
import {CardGroup} from '../models/internal/cardGroup.ts';
import {CardSection} from '../models/internal/cardSection.ts';
import {StartPanel} from '../models/internal/startPanel.ts';

export const activeStartPanel = new ObservableProperty<StartPanel | null>(null);
export const activeRemoteUrl = new ObservableProperty<string | null>(null);
export const activeOverlay = new ObservableProperty<OverlayType | null>(null);
export const activeSubOverlay = new ObservableProperty<OverlayType | null>(null);
export const activeHoverHint = new ObservableProperty<HoverHint | null>(null);
export const activeAction = new ObservableProperty<ActionInterface | null>(null);
export const activeContextMenu = new ObservableProperty<ActiveContextMenu | null>(null);
export const activeIconPreview = new ObservableProperty<IconPreviewState | null>(null);

export const selectedCard = new ObservableProperty<Card | null>(null);
export const selectedSection = new ObservableProperty<CardSection | null>(null);
export const selectedGroup = new ObservableProperty<CardGroup | null>(null);
export const selectedPanelEntry = new ObservableProperty<StartPanelEntry | null>(null);
export const selectedCornerPosition = new ObservableProperty<CornerPosition | null>(null);
export const selectedImageAsset = new ObservableProperty<ImageAssetSelection | null>(null);

export const hoverHintMode = new ObservableProperty<HoverHintModeType>(HoverHintMode.Dark);

export const pastedUrl = new ObservableProperty<string | null>(null);
export const messageOverlayContent = new ObservableProperty<string | null>(null);
export const isDraggingFile = new ObservableProperty<boolean>(false);
export const panelOrderVersion = new ObservableProperty<number>(0);
export const settingsIconStyle = new ObservableProperty<SettingsIconStyle>(SettingsIconStyle.Large);
export const cornerActions = new ObservableProperty<CornerActions>(createDefaultCornerActions());
