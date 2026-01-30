import type {BBox} from '#test/playwright/bbox.ts';
import {showMouseCursor} from './showMouseCursor.ts';
import {chromium} from 'playwright';
import {testConfig} from '#test/testConfig.ts';

const bookmarkId1 = 'XKxOGicntL';
const bookmarkId3 = 'wsQyZUunTw';

const browser = await chromium.launch(testConfig.launchOptions);
const context = await browser.newContext({
    recordVideo: {
        dir: './videos/',
        size: {width: 1280, height: 720}
    }
});
const page = await context.newPage();

await showMouseCursor(page);
await page.goto(testConfig.appUrl.test);

const sourceLocator = page.locator(`#${bookmarkId3}`);
const targetLocator = page.locator(`#${bookmarkId1}`);

const sourceBox: BBox = await sourceLocator.boundingBox() as BBox;
const targetBox: BBox = await targetLocator.boundingBox() as BBox;

await moveMouseToBox(sourceBox);
await page.waitForTimeout(1000);

await page.mouse.down();
await page.waitForTimeout(1000);

await moveMouseToBox(targetBox, {dy: -16});
await page.waitForTimeout(1000);

await page.mouse.up();
await page.waitForTimeout(1000);

await context.close();
await browser.close()

async function moveMouseToBox(box: BBox, options: Partial<{ dy: number, steps: number }> = {}) {
    const dy = options.dy ?? 0;
    const steps = options.steps ?? 100;

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2 + dy;
    await page.mouse.move(cx, cy, {steps});
}
