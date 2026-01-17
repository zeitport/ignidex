import {describe, expect, test} from 'vitest';
import {chromium} from 'playwright';

const appUrl = 'http://localhost:3000/#ignidex';

describe('Example Playwright', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    test('has title', async () => {
        await page.goto(appUrl);

        const title = await page.title();
        expect(title).toBe('Ignidex');

        await browser.close();
    });
});



