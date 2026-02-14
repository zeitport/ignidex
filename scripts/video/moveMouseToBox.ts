import type {Locator} from '@playwright/test';
import type {BBox} from './bbox';
import type {Page} from 'playwright-core';

export async function moveMouseToBox(page: Page, box: BBox, options: Partial<{dx: number, dy: number, steps: number }> = {}) {
    const dy = options.dy ?? 0;
    const dx = options.dx ?? 0;
    const steps = options.steps ?? 100;

    const cx = box.x + box.width / 2 + dx;
    const cy = box.y + box.height / 2 + dy;
    await page.mouse.move(cx, cy, {steps});
}

export async function moveMouseToLocator(page: Page, locator: Locator, options: Partial<{dx: number, dy: number, steps: number }> = {}) {
    await moveMouseToBox(page, await locator.boundingBox() as BBox, options);
}
