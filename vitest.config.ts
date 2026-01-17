import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import {testConfig} from './test/testConfig';

export default defineConfig({
    test: {
        testTimeout: testConfig.testTimeout,
        browser: {
            // shared provider options between all instances
            provider: playwright({
                launchOptions: {
                    slowMo: 50,
                    channel: 'chrome-beta',
                    headless: testConfig.headless,
                },
                actionTimeout: testConfig.testTimeout,
            }),
            instances: [
                {
                    browser: 'chromium',
                    headless: false,
                },
                // {
                //     browser: 'firefox',
                //     // overriding options only for a single instance
                //     // this will NOT merge options with the parent one
                //     provider: playwright({
                //         launchOptions: {
                //             firefoxUserPrefs: {
                //                 'browser.startup.homepage': 'https://example.com',
                //             },
                //         },
                //     })
                // }
            ],
        },
    },
})
