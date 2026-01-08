import {ObservableProperty} from '#utils/observableProperty.ts';
import type {Card} from '../model/internal/card.ts';
import {OverlayType} from '../elements/overlays/overlayType.ts';
import {StartPanel} from '../model/internal/startPanel.ts';
import {CardSection} from '../model/internal/cardSection.ts';
import {CardGroup} from '../model/internal/cardGroup.ts';
import {ActionInterface} from '../actions/actionInterface.ts';

export const activeStartPanel = new ObservableProperty<StartPanel | null>(null);
export const activeOverlay = new ObservableProperty<OverlayType | null>(null);
export const selectedCard = new ObservableProperty<Card | null>(null);
export const selectedSection = new ObservableProperty<CardSection | null>(null);
export const selectedGroup = new ObservableProperty<CardGroup | null>(null);
export const activeAction = new ObservableProperty<ActionInterface | null>(null);
export const pastedUrl = new ObservableProperty<string | null>(null);
