import {activeHoverHint} from '#state';
import type {ElementPart} from 'lit';
import {directive, Directive, PartInfo, PartType} from 'lit/directive.js';
import {HoverHint} from './hoverHint.ts';

/**
 * Use hoverHint on an element to show a hover hint when the element is hovered.
 * Example:
 * <cc-button ${hoverHint('This is a button')}>Click me</cc-button>
 */
class HoverHintDirective extends Directive {
    private el?: HTMLElement;
    private hint?: string | null;
    private onEnter = () => {
        if (this.hint) {
            HoverHint.show(new HoverHint({text: this.hint}));
        }
    };

    // SWITCH: The next line will hide the hover-hint on mouse leave
    private onLeave = () => HoverHint.clear();

    constructor(partInfo: PartInfo) {
        super(partInfo);

        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('hoverHint can only be used on elements');
        }
    }

    render(_hint: string | null | undefined) {
        return;
    }

    update(part: ElementPart, [hint]: [string | null | undefined]) {
        const el = part.element as HTMLElement;

        if (this.el !== el) {
            this.el?.removeEventListener('mouseenter', this.onEnter);
            this.el?.removeEventListener('mouseleave', this.onLeave);

            this.el = el;
            el.addEventListener('mouseenter', this.onEnter);
            el.addEventListener('mouseleave', this.onLeave);
        }

        this.hint = hint;
    }

    disconnected() {
        console.warn('Disconnected');
        this.el?.removeEventListener('mouseenter', this.onEnter);
        this.el?.removeEventListener('mouseleave', this.onLeave);
        this.el = undefined;

        // Clear the active hover hint when the directive is disconnected
        if (activeHoverHint.value === this.hint) {
           HoverHint.clear()
        }
    }
}

export const hoverHint = directive(HoverHintDirective);
