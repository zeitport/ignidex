import type {BBox} from '#test/playwright/bbox.ts';
import {afterAll, beforeEach, describe, test} from 'vitest';
import {chromium} from 'playwright';
import {expect} from '@playwright/test';
import {testConfig} from '#test/testConfig.ts';

const iconGroupId = 'ZmejesoOPF';
const bookmarkId1 = 'XKxOGicntL';
const bookmarkId3 = 'wsQyZUunTw';

describe('Drag Drop', async () => {
    const browser = await chromium.launch(testConfig.launchOptions);
    const context = await browser.newContext({});
    const page = await context.newPage();

    beforeEach(async () => {
        await page.goto(testConfig.appUrl.test);
        await expect(page.getByRole('heading', {name: 'Playwright Test'})).toBeVisible();
    });

    afterAll(async () => {
        await context.close();
        await browser.close();
    });

    test('Drag last bookmark and drop on top', async () => {
        await expect(page.getByRole('heading', {name: 'Playwright Test'})).toBeVisible();

        const sourceLocator = page.locator(`#${bookmarkId3}`);
        const targetLocator = page.locator(`#${bookmarkId1}`);

        const sourceBox: BBox = await sourceLocator.boundingBox() as BBox;
        const targetBox: BBox = await targetLocator.boundingBox() as BBox;

        expect(sourceBox).toBeDefined();
        expect(targetBox).toBeDefined();

        await moveMouseToBox(sourceBox);

        await page.mouse.down();
        await page.waitForTimeout(500);

        await moveMouseToBox(targetBox, {dy: -16});

        await page.mouse.up();
        await page.waitForTimeout(500);

        const bookmarkIds = await page.locator(`#${iconGroupId} .bookmark-item`).evaluateAll(
            (elements) => elements.map(el => el.id)
        );

        expect(bookmarkIds.indexOf(bookmarkId3)).toBe(0);
        expect(bookmarkIds.indexOf(bookmarkId1)).toBe(1);
    });

    async function moveMouseToBox(box: BBox, options: Partial<{dy: number, steps: number}> = {}) {
        const dy = options.dy ?? 0;
        const steps = options.steps ?? 100;

        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2 + dy;
        await page.mouse.move(cx, cy, {steps});
    }
});
