export function updateSettingsUrlParameter(panelId: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set('setting', panelId);
    history.pushState({setting: panelId}, '', url.toString());
}

export function removeSettingsUrlParameter(): void {
    const url = new URL(window.location.href);
    if (url.searchParams.has('setting')) {
        url.searchParams.delete('setting');
        const newUrl = url.searchParams.toString()
            ? `${url.pathname}?${url.searchParams.toString()}${url.hash}`
            : `${url.pathname}${url.hash}`;
        history.pushState({}, '', newUrl);
    }
}

export function getSettingsUrlParameter(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('setting');
}
