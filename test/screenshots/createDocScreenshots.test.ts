import {beforeEach, describe, test} from 'vitest';
import {chromium} from 'playwright';
import {expect} from '@playwright/test';
import {pageScreenshotOptions, testConfig} from '#test/testConfig.ts';

const options = (filename: string) => {
    return {
        ...pageScreenshotOptions,
        path: `./docs/screenshots/${filename}.png`
    };
};

describe('Create screenshots for ./docs', async () => {
    const browser = await chromium.launch(testConfig.launchOptions);
    const page = await browser.newPage();

    describe('Getting Started Screenshots', () => {
        beforeEach(async () => {
            await page.goto(testConfig.appUrl.start);
        });

        test('Getting started overlay', async () => {
            await page.locator('cc-getting-started-overlay').waitFor({ state: 'attached' });

            //await page.getByLabel('feature-2').locator('path').hover();
            //await page.pause();

            await page.screenshot(options('getting-started'));
        });

    });

    describe('Ignidex Panel Screenshots', () => {
        beforeEach(async () => {
            await page.goto(testConfig.appUrl.ignidex);
            await expect(page.getByRole('heading', { name: 'Ignidex' })).toBeVisible();
        });

        test('Ignidex start panel loaded', async () => {
            await expect(page.getByRole('heading', {name: 'Ignidex'})).toBeVisible();
            // await page.pause();
        });

        test('Create screenshot of start panel', async () => {
            await page.screenshot(options('start-panel'));
        });

        test('Create screenshot of UI settings', async () => {
            await page.locator('body').press('F1');
            await page.screenshot(options('settings-ui'));
        });

        test('Create screenshot of bookmark context menu', async () => {
            await page.getByText('README', { exact: true }).click({
                button: 'right'
            });
            await page.screenshot(options('context-menu-bookmark'));
        });
    });
});


