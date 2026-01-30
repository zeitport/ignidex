import type {Page} from '@playwright/test';

export async function showMouseCursor(page: Page) {
    await page.addInitScript(() => {
        window.addEventListener('DOMContentLoaded', () => {
            const cursor = document.createElement('div');
            cursor.id = 'playwright-mouse';
            cursor.style.position = 'fixed';
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.borderRadius = '50%';
            cursor.style.background = 'red';
            cursor.style.pointerEvents = 'none';
            cursor.style.zIndex = '999999';
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });
    });
}
