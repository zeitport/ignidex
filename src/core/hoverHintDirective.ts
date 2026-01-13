import {directive, Directive, PartInfo, PartType} from 'lit/directive.js';
import {HoverHint} from './hoverHint.ts';

class HoverHintDirective extends Directive {
    private el?: HTMLElement;
    private hint?: HoverHint;
    private onEnter = () => HoverHint.show(this.hint!);

    // SWITCH: The next line will hide the hover-hint on mouse leave
    private onLeave = () => HoverHint.clear();

    constructor(partInfo: PartInfo) {
        super(partInfo);

        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('hoverHint can only be used on elements');
        }
    }

    render(_hint: HoverHint) {
        return;
    }

    update(part: any, [hint]: [HoverHint]) {
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
        this.el?.removeEventListener('mouseenter', this.onEnter);
        this.el?.removeEventListener('mouseleave', this.onLeave);
        this.el = undefined;
    }
}

export const hoverHint = directive(HoverHintDirective);
