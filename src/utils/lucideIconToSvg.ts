import type {IconNode} from 'lucide';

export function lucideIconToSvg(iconNode: IconNode): string {
    const pathElements = iconNode
        .map(([tag, attrs]) => {
            const attrString = Object.entries(attrs)
                .map(([key, value]) => `${key}="${String(value)}"`)
                .join(' ');
            return `<${tag} ${attrString}/>`;
        })
        .join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathElements}</svg>`;

    return svg;
}
