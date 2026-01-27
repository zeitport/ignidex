export function mdiPathToSvg(iconPath: string) {
    const svg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${iconPath}"></path></svg>`

    return svg;
}
