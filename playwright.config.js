require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 600000,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    reporter: [['list'], ['html']],
    env: {
        discord: {
            baseUrl: process.env.DISCORD_BASE_URL,
            chatUrl: process.env.DISCORD_CHAT_URL,
            creds: {
                email: process.env.DISCORD_EMAIL,
                password: process.env.DISCORD_PASSWORD
            }
        }
    }
});
