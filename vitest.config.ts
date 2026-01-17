import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        browser: {
            // shared provider options between all instances
            provider: playwright({
                launchOptions: {
                    slowMo: 50,
                    channel: 'chrome-beta',
                },
                actionTimeout: 5_000,
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
