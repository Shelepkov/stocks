const {defineConfig} = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
    env: {
        discord: {
            baseUrl: process.env.DISCORD_BASE_URL,
            chatUrl: process.env.DISCORD_CHAT_URL,
            creds: {
                email: process.env.DISCORD_EMAIL,
                password: process.env.DISCORD_PASSWORD
            }
        },
        stocks: {
            adobestock: {
                name: 'adobestock', // 'name' is a custom property, it can be anything, like 'adobestock
                baseUrl: process.env.ADOBESTOCK_BASE_URL,
                loginUrl: process.env.ADOBESTOCK_LOGIN_URL,
                creds: {
                    email: process.env.ADOBESTOCK_EMAIL,
                    password: process.env.ADOBESTOCK_PASSWORD
                }
            },
            shutterstock: {
                name: 'shutterstock', // 'name' is a custom property, it can be anything, like 'shutterstock
                baseUrl: process.env.SHUTTERSTOCK_BASE_URL,
                loginUrl: process.env.SHUTTERSTOCK_LOGIN_URL,
                creds: {
                    email: process.env.SHUTTERSTOCK_EMAIL,
                    password: process.env.SHUTTERSTOCK_PASSWORD
                }
            }
        }
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        experimentalWebKitSupport: true,
        video: false,
        screenshotOnRunFailure: false,
        reporter: 'spec',
        reporterOptions: {
            toConsole: false
        }
    },
});
