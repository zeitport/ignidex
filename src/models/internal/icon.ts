import {lucideIconToSvg} from '#utils/lucideIconToSvg.ts';
import {mdiPathToSvg} from '#utils/mdiPathToSvg.ts';
import {mdiImageBrokenVariant} from '@mdi/js';
import type {IconNode} from 'lucide';

export class Icon {
    readonly type: 'svg' | 'dataUri';
    readonly svg: string | null;
    readonly dataUri: string | null;

    constructor(init: Partial<Icon>) {
        this.svg = init.svg ?? null;
        this.dataUri = init.dataUri ?? null;

        if (init.svg) {
            this.type = 'svg';
        } else if (init.dataUri) {
            this.type = 'dataUri';
        } else {
            throw new Error('Unknown icon type');
        }
    }

    static fromMdiIcon(iconPath: string): Icon {
        return new Icon({
            svg: mdiPathToSvg(iconPath)
        });
    }

    static fromLucideIcon(iconNode: IconNode): Icon {
        return new Icon({
            svg: lucideIconToSvg(iconNode)
        });
    }

    static fromDataUri(dataUri: string | null | undefined): Icon {
        if (dataUri) {
            return new Icon({dataUri});
        } else {
            return Icon.brokenIcon();
        }
    }

    static brokenIcon() {
        return new Icon({
            svg: mdiPathToSvg(mdiImageBrokenVariant)
        });
    }
}
