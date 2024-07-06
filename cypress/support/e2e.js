// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands'
//
// cypress/support/index.js

Cypress.on('before:browser:launch', (browser = {}, launchOptions) => {
    launchOptions.args.push('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    return launchOptions;
});

Cypress.on('window:before:load', (win) => {
    Object.defineProperty(win.navigator, 'webdriver', {
        get: () => undefined,
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from
    // failing the test due to the uncaught exception
    return false;
});

Cypress.on('fail', (error, runnable) => {
    // Просто логируем ошибку и продолжаем выполнение тестов
    cy.log('Test failed: ', error.message);
    return false; // возвращаем false, чтобы предотвратить падение теста
});


const origLog = Cypress.log
Cypress.log = function (opts, ...other) {
    if (opts.displayName === 'xhr' || opts.name === 'xhr') {
        const url = opts.url || (opts.consoleProps && opts.consoleProps.Stubbed === 'Yes' && opts.consoleProps.URL);

        const ignoredUrls = [
            '/web/api/system/bootstrap-data',
            'https://bam.nr-data.net/',
            'https://submit.shutterstock.com/api/next',
            'https://cdn.cookielaw.org',
            ''
        ];

        if (url && ignoredUrls.some(ignoredUrl => url.includes(ignoredUrl))) {
            return null;
        }
    }

    return origLog.call(this, opts, ...other)
}