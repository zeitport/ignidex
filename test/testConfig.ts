/**
 * Set `debug` flag to enable/disable debugging mode for playwright tests.
 */
export const debug = true;

export const testConfig = {
    appUrl: 'http://localhost:3000/#ignidex',
    headless: !debug,
    testTimeout: debug ? 0 : 5_000,
    launchOptions: {
        headless: !debug
    }
};

