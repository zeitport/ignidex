import {beforeEach, describe, test} from 'vitest';
import {chromium} from 'playwright';
import {expect} from '@playwright/test';
import {testConfig} from '#test/testConfig.ts';

describe('Corner Buttons', async () => {
    const browser = await chromium.launch(testConfig.launchOptions);
    const page = await browser.newPage();

    beforeEach(async () => {
        await page.goto(testConfig.appUrl.test);
        await expect(page.getByRole('heading', {name: 'Playwright Test'})).toBeVisible();
    });


    test('Opens "Playwright Test" panel', async () => {
        await expect(page.getByRole('heading', {name: 'Playwright Test'})).toBeVisible();
        await page.pause();
    });
});
