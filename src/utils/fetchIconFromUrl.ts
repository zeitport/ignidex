import {svgToDataUri} from '#utils/svgToDataUri.ts';

export async function fetchIconFromUrl(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;

        const contentType = response.headers.get('content-type') ?? '';
        if (!contentType.includes('svg')) return null;

        const svgContent = await response.text();
        if (svgContent.includes('<svg')) {
            return svgToDataUri(svgContent);
        }
        return null;
    } catch {
        return null;
    }
}
