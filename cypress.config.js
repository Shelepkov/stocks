const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
    env: {
        discord: {
            baseUrl: process.env.DISCORD_BASE_URL,
            creds: {
                email: process.env.DISCORD_EMAIL,
                password: process.env.DISCORD_PASSWORD
            }
        },
        stocks: {
            adobestock: {
                baseUrl: process.env.ADOBESTOCK_BASE_URL,
                creds: {
                    email: process.env.ADOBESTOCK_EMAIL,
                    password: process.env.ADOBESTOCK_PASSWORD
                }
            },
            shutterstock: {
                baseUrl: process.env.SHUTTERSTOCK_BASE_URL,
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
    },
});
