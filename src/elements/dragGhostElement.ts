import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {bookmarkDragDrop} from '#state';

@customElement('cc-drag-ghost')
export class DragGhostElement extends LitElement {
    static styles = css`
        :host {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(1rem, 50%);
        }

        .ghost {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background: var(--background);
            border: 2px solid var(--accent);
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            opacity: 0.9;
            white-space: nowrap;
        }

        .name {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `;

    private dragDrop = bookmarkDragDrop.watch(this);

    render() {
        const dragState = this.dragDrop.value;

        if (!dragState) {
            return html``;
        }

        const {draggedCard, cursorX, cursorY} = dragState;

        return html`
            <div class="ghost" style="left: ${cursorX}px; top: ${cursorY}px;">
                <cc-card-icon .card=${draggedCard}></cc-card-icon>
                <span class="name">${draggedCard.name ?? ''}</span>
            </div>
        `;
    }

    updated() {
        const dragState = this.dragDrop.value;
        if (dragState) {
            this.style.left = `${dragState.cursorX}px`;
            this.style.top = `${dragState.cursorY}px`;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-drag-ghost': DragGhostElement
    }
}
