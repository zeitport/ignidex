import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'http://localhost:3000',
        headless: false,         // headed mode
        trace: 'on', // or: 'on' to always record
        video: 'retain-on-failure', // or: 'on' to always record
        screenshot: 'only-on-failure',
        viewport: { width: 1280, height: 1440 },
        actionTimeout: 30000,
        launchOptions: {
        }
    },
});
