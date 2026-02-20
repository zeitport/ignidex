import type {ImageAssetSelection} from './imageAssetSelection.ts';
import {HoverHint} from '#app/hoverHint.ts';
import {BookmarkOnClickAction, type BookmarkOnClickActionType} from '#models/idb/bookmarkOnClickAction.ts';
import {type CornerActions} from '#models/idb/cornerActions.ts';
import {type CornerPosition} from '#models/idb/cornerPosition.ts';
import {createDefaultCornerActions} from '#models/idb/createDefaultCornerActions.ts';
import {HoverHintMode, type HoverHintModeType} from '#models/idb/hoverHintMode.ts';
import {SettingsIconStyle} from '#models/idb/settingsIconStyle.ts';
import {StartPanelEntry} from '#models/idb/startPanelEntry.ts';
import {UserStateEntry} from '#models/idb/userStateEntry.ts';
import type {Card} from '#models/internal/card.ts';
import {CardGroup} from '#models/internal/cardGroup.ts';
import {CardSection} from '#models/internal/cardSection.ts';
import {StartPanel} from '#models/internal/startPanel.ts';
import {ObservableProperty} from '#utils/observableProperty.ts';
import {ActionInterface} from '../actions/actionInterface.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import type {ActiveContextMenu} from './activeContextMenu.ts';
import type {ActiveIconPreview} from './activeIconPreview.ts';
import type {CardDragDropState} from './cardDragDropState.ts';

export const userState = new ObservableProperty<UserStateEntry>(new UserStateEntry());

export const activeStartPanel = new ObservableProperty<StartPanel | null>(null);
export const activeRemoteUrl = new ObservableProperty<string | null>(null);
export const activeOverlay = new ObservableProperty<OverlayType | null>(null);
export const activeSubOverlay = new ObservableProperty<OverlayType | null>(null);
export const activeHoverHint = new ObservableProperty<HoverHint | null>(null);
export const activeAction = new ObservableProperty<ActionInterface | null>(null);
export const activeContextMenu = new ObservableProperty<ActiveContextMenu | null>(null);
export const activeIconPreview = new ObservableProperty<ActiveIconPreview | null>(null);

export const selectedCard = new ObservableProperty<Card | null>(null);
export const selectedSection = new ObservableProperty<CardSection | null>(null);
export const selectedGroup = new ObservableProperty<CardGroup | null>(null);

export const selectedPanelEntry = new ObservableProperty<StartPanelEntry | null>(null);
export const selectedCornerPosition = new ObservableProperty<CornerPosition | null>(null);
export const selectedImageAsset = new ObservableProperty<ImageAssetSelection | null>(null);

export const diceRollResult = new ObservableProperty<number | null>(null);

export const hoverHintMode = new ObservableProperty<HoverHintModeType>(HoverHintMode.Dark);

export const pastedUrl = new ObservableProperty<string | null>(null);
export const cardToMove = new ObservableProperty<Card | null>(null);
export const groupToMove = new ObservableProperty<CardGroup | null>(null);
export const cardCopy = new ObservableProperty<Card | null>(null);

export const hoveredCard = new ObservableProperty<Card | null>(null);
export const cardDragDrop = new ObservableProperty<CardDragDropState | null>(null);
export const messageOverlayContent = new ObservableProperty<string | null>(null);
export const isDraggingFile = new ObservableProperty<boolean>(false);
export const panelOrderVersion = new ObservableProperty<number>(0);
export const settingsIconStyle = new ObservableProperty<SettingsIconStyle>(SettingsIconStyle.Large);
export const cornerActions = new ObservableProperty<CornerActions>(createDefaultCornerActions());
export const bookmarkOnClickAction = new ObservableProperty<BookmarkOnClickActionType>(BookmarkOnClickAction.open);
export const activeSettingsPanelId = new ObservableProperty<string | null>(null);
