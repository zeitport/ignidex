import {describe, expect, test} from 'vitest';
import {chromium} from 'playwright';
import {testConfig} from '../testConfig';

describe('Example Playwright', async () => {
    const browser = await chromium.launch(testConfig.launchOptions);
    const page = await browser.newPage();

    test('has title', async () => {
        await page.goto(testConfig.appUrl);

        const title = await page.title();
        expect(title).toBe('Ignidex');

        // await browser.close();
        await page.pause();
    });
});
