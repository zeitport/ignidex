import type {PageScreenshotOptions} from 'playwright-core';

/**
 * Set `debug` flag to enable/disable debugging mode for playwright tests.
 */
export const debug = true;

export const pageScreenshotOptions: PageScreenshotOptions = {
    type: 'png',
    scale: 'device',
    animations: 'disabled',
    caret: 'hide'
}

export const testConfig = {
    appUrl: {
        start: 'http://localhost:3000',
        test: 'http://localhost:3000?load=/examples/playwright.json',
        ignidex: 'http://localhost:3000?load=/examples/ignidex.json',
    },
    headless: !debug,
    testTimeout: debug ? 0 : 5_000,
    launchOptions: {
        // slowMo: debug ? 500 : 0,
        tracesDir: './test/traces/',
        headless: !debug,
        hookTimeout: debug ? 0 : 10_000,
    },
};

