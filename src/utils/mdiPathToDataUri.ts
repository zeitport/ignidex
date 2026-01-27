import {mdiPathToSvg} from '#utils/mdiPathToSvg.ts';

export function mdiPathToDataUri(path: string): string {
    return `data:image/svg+xml;utf8,${encodeURIComponent(mdiPathToSvg(path))}`;
}
