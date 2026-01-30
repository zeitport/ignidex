import {beforeEach, describe, test} from 'vitest';
import {chromium} from 'playwright';
import {expect} from '@playwright/test';
import {testConfig} from '#test/testConfig.ts';

describe('Corner Buttons', async () => {
    const browser = await chromium.launch(testConfig.launchOptions);
    const page = await browser.newPage();

    beforeEach(async () => {
        await page.goto(testConfig.appUrl.test);
        await expect(page.getByRole('heading', { name: 'Playwright Test' })).toBeVisible();
    });

    test('Opens "Playwright Test" panel', async () => {
        await expect(page.getByRole('heading', {name: 'Playwright Test'})).toBeVisible();
        // await page.pause();
    });

    test('Configure top left corner button to "open settings" panel', async () => {
        await page.locator('body').press('F1');
        await page.getByText('UI', { exact: true }).click();
        await page.getByRole('radio', { name: 'topLeft' }).click();
        await expect(page.getByRole('listitem', { name: 'Settings' })).toBeVisible();

        await page.getByRole('listitem', { name: 'Settings' }).click();

        // Wait until the "select corner action" overlay is closed.
        await page.locator('cc-select-corner-action-overlay').waitFor({ state: 'detached' });
        await page.getByRole('button', { name: 'Cancel' }).click();

        await page.locator('#corner-button-topLeft').click();
        await expect(page.getByRole('dialog', {name: 'Settings'})).toBeVisible();
    });
});
