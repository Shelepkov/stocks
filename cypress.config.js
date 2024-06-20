const { defineConfig } = require("cypress");

module.exports = defineConfig({
    env: {
        "discord": {
            "baseUrl": "https://discord.com",
            "creds": {
                "email": "emmettby@gmail.com",
                "password": "DBPqHNDZjsRx7fUNR0p7"
            }
        },
        stocks: {
            adobestock: {
                baseUrl: "https://stock.adobe.com",
                creds: {
                    email: "Shelepkov.vladislav@outlook.com",
                    password: "eH10EcG8CX4RYYDmS7f8"
                }
            },
            shutterstock: {
                baseUrl: "https://contributor-accounts.shutterstock.com",
                creds: {
                    email: "Shelepkov.vladislav@outlook.com",
                    password: "eH10EcG8CX4RYYDmS7f8"
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
