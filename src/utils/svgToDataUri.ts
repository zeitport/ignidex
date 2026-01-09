export function svgToDataUri(svg: string): string {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}
